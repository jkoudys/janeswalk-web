import {dispatch, register, waitFor} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {startTimeIndex} from '../utils/ItineraryUtils';

import WalkStore from './WalkStore';

const CHANGE_EVENT = 'change';

// Set<Set> A set of walk sets
const _lists = new Set();

// Map<{walk}:[times]> A map of times set for each walk
const _schedule = new Map();

// Has this store been synced, and is it syncing?
let _lastChange = Date.now();

//TODO: Currently no remove list, just adding lists
//TODO: How to handle cancelled walks and removing from itinerary when no sign-ups

const _removeWalk = (list, walk) => list.walks.delete(walk);

const _addWalk = (list, walk) => list.walks.add(walk);

const _scheduleWalk = (walk, time) => {
  let times = _schedule.get(walk) || new Set();
  times.add(+time);
  _schedule.set(walk, times);
};

const _unscheduleWalk = (walk, time) => {
  let times = _schedule.get(walk) || new Set();
  times.delete(+time);
  _schedule.set(walk, times);
};

const _createList = (title = '', description = '') => {
  const list = {
    title: title,
    walks: new Set(),
    description: description,
    shareUrl: ''
  };

  _lists.add(list);

  // Returning list, since after _createList, _addWalk is called, so passing around the list
  return list;
};

/**
 * Load all the basic itineraries
 *
 * @param itineraries array List of itineraries in serialization-friendly state
 */
const _receiveAll = ({lists, schedule}) => {
  lists.forEach((itinerary, index) => {
    _lists.add(Object.assign({}, itinerary, {
      walks: new Set(itinerary.walks.map(wID => WalkStore.getWalk(+wID)))
    }));
  });

  // Loop through the {123: [14224342342, 2343535345]} object of times arrays
  // Build a set, using the times as a number to key
  Object.keys(schedule).forEach(wID => {
    _schedule.set(WalkStore.getWalk(+wID), new Set(schedule[wID].map(t => +t)));
  });
};

//walks received from API used to update _itinerary
const _updateWalks = (list, walks) => {
  walks.forEach(walk => list.add(walk));
};

const _updateTitle = (list, title) => {
  list.title = title;
};

const _updateDescription = (list, description) => {
  list.description = description;
};

function _hasInList(walk) {
  for (let list of _lists) {
    if (list.walks.has(walk)) return true;
  }
  return false;
}

function _hasInSchedule(walk, time) {
  const times = _schedule.get(walk);
  if (times && times.has(+time)) return true;
  return false;
}

const ItineraryStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLists() {
    return _lists;
  },

  getSchedule() {
    return _schedule;
  },

  getWalks(list) {
    return list.walks;
  },

  getLastChange() {
    return _lastChange;
  },

  hasInList(walk) {
    return _hasInList(walk);
  },

  hasInSchedule(walk, time) {
    return _hasInSchedule(walk, time);
  },

  totalWalks() {
    let count = 0;
    _lists.forEach(list => count += list.walks.size);
    return count;
  },

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(payload) {
    // Any action without a list specified is assumed on the first 'favourites'
    const {list, walk, time} = payload;

    switch (payload.type) {
      case ActionTypes.ITINERARY_REMOVE_WALK:
        _lastChange = Date.now();
        _removeWalk(list, walk);
      break;
      case ActionTypes.ITINERARY_ADD_WALK:
        _lastChange = Date.now();
        _addWalk(list, walk);
      break;
      case ActionTypes.ITINERARY_SCHEDULE_WALK:
        _lastChange = Date.now();
        if (!_hasInList(walk)) {
          let [firstList] = _lists;
          _addWalk(list || firstList, walk);
        }
        _scheduleWalk(walk, time);
      break;
      case ActionTypes.ITINERARY_UNSCHEDULE_WALK:
        _lastChange = Date.now();
        _unscheduleWalk(walk, time);
      break;
      case ActionTypes.ITINERARY_UPDATE_TITLE:
        _lastChange = Date.now();
        _updateTitle(list, payload.title);
      break;
      case ActionTypes.ITINERARY_UPDATE_DESCRIPTION:
        _lastChange = Date.now();
        _updateDescription(list, payload.description);
      break;
      case ActionTypes.ITINERARY_CREATE_LIST:
        _lastChange = Date.now();
        _createList(payload.title, payload.description);
      break;
      case ActionTypes.ITINERARY_RECEIVE_ALL:
        waitFor([WalkStore.dispatchToken]);
        _receiveAll(payload.itineraries);
      break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
