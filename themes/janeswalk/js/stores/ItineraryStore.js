import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

import WalkStore from './WalkStore';

const CHANGE_EVENT = 'change';

// TODO: init empty and receive from event
const _lists = new Set();

//TODO: _removeWalk, _addWalk, should receive updated list
//TODO: _createList, _updateTitle, _updateDescription, should receive updated list
//TODO: Need to retrieve all lists either via JW Events, or async call on component mount
//TODO: Currently no remove list, just adding lists

const _removeWalk = (list, walk) => list.walks.delete(walk);
const _addWalk = (list, walk) => list.walks.add(walk);

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
 * @param itineraries array List of itineraries in serlizable-friendly state
 */
const _receiveAll = (itineraries) => {
  // Itinerary has a list of walk IDs, so load the actual walks from there.
  itineraries.forEach(itinerary => _lists.add(Object.assign({}, itinerary, {
    walks: new Set(itinerary.walks.map(w => WalkStore.getWalk(+w)))
  })));
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

const ItineraryStore = Object.assign(EventEmitter.prototype, {
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

  getItineraryList() {
    // Top of the lists is the itinerary
    for (let list of _lists.values()) {
      return list;
    }
  },

  getFavouriteList() {
    let i = 0;
    // Second list is the itinerary
    for (let list of _lists.values()) {
      if (i === 1) return list;
      i++;
    }
  },

  getWalks(list) {
    return list.walks;
  },

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(payload) {
    const {list, walk} = payload;
    switch (payload.type) {
    case ActionTypes.ITINERARY_REMOVE_WALK:
      _removeWalk(list, walk);
      break;
    case ActionTypes.ITINERARY_ADD_WALK:
       //TODO: Dialog to open on first add to Itinerary/Favourites
      _addWalk(list, walk);
      break;
    case ActionTypes.ITINERARY_UPDATE_TITLE:
      _updateTitle(list, payload.title);
      break;
    case ActionTypes.ITINERARY_UPDATE_DESCRIPTION:
      _updateDescription(list, payload.description);
      break;
    case ActionTypes.ITINERARY_CREATE_LIST:
      _createList(payload.title, payload.description);
      break;
    case ActionTypes.ITINERARY_RECEIVE_ALL:
      _receiveAll(payload.itineraries);
      break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
