import { register, waitFor } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

import WalkStore from './WalkStore';

// Set<Set> A set of walk sets
const _lists = new Set();

// Map<{walk}:[times]> A map of times set for each walk
const _schedule = new Map();

// Has this store been synced, and is it syncing?
let _lastChange = Date.now();

// TODO: Currently no remove list, just adding lists
// TODO: How to handle cancelled walks and removing from itinerary when no sign-ups

const _scheduleWalk = (walk, time) => {
  const times = _schedule.get(walk) || new Set();
  times.add(+time);
  _schedule.set(walk, times);
};

const _unscheduleWalk = (walk, time) => {
  const times = _schedule.get(walk) || new Set();
  times.delete(+time);
  _schedule.set(walk, times);
};

const _createList = (title = '', description = '') => {
  const list = {
    title,
    description,
    walks: new Set(),
    shareUrl: '',
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
const _receiveAll = ({ lists, schedule }) => {
  lists.forEach((itinerary) => {
    _lists.add({
      ...itinerary,
      walks: new Set(itinerary.walks.map(wID => WalkStore.getWalk(+wID))),
    });
  });

  // Loop through the {123: [14224342342, 2343535345]} object of times arrays
  // Build a set, using the times as a number to key
  for (const [wID, times] of Object.entries(schedule)) {
    _schedule.set(WalkStore.getWalk(+wID), new Set(times.map(t => +t)));
  }
};

function hasInList(walk) {
  for (const list of _lists) {
    if (list.walks.has(walk)) return true;
  }
  return false;
}

const ItineraryStore = {
  ...Store,
  getLists: () => _lists,
  getSchedule: () => _schedule,
  getWalks: (list) => list.walks,
  getLastChange: () => _lastChange,
  hasInList,

  hasInSchedule(walk, time) {
    const times = _schedule.get(walk);
    if (times && times.has(+time)) return true;
    return false;
  },

  totalWalks() {
    return [..._lists].reduce((a, { walks }) => (a + walks.size), 0);
  },

  dispatcherIndex: register({
    [AT.ITINERARY_ADD_WALK]: ({ list, walk }) => list.walks.add(walk),
    [AT.ITINERARY_REMOVE_WALK]: ({ list, walk }) => list.walks.delete(walk),
    [AT.ITINERARY_UNSCHEDULE_WALK]: ({ walk, time }) => _unscheduleWalk(walk, time),
    [AT.ITINERARY_UPDATE_TITLE]: ({ list, title }) => { list.title = title; },
    [AT.ITINERARY_UPDATE_DESCRIPTION]: ({ list, description }) => { list.description = description; },
    [AT.ITINERARY_CREATE_LIST]: ({ title, description }) => _createList(title, description),
    [AT.ITINERARY_SCHEDULE_WALK]: ({ list: [list] = _lists, walk, time }) => {
      if (!hasInList(walk)) {
        list.walks.add(walk);
      }
      _scheduleWalk(walk, time);
    },

    [AT.ITINERARY_RECEIVE_ALL]: ({ itineraries }) => {
      waitFor([WalkStore.dispatchToken]);
      _receiveAll(itineraries);
    },
  }, () => {
    _lastChange = Date.now();
    ItineraryStore.emitChange();
  }),
};

export default ItineraryStore;
