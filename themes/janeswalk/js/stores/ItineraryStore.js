import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

import WalkStore from './WalkStore';

const CHANGE_EVENT = 'change';

const _lists = new Set();

// Has this store been synced, and is it syncing?
let _lastChange = Date.now();

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
    let [list] = _lists;
    return list;
  },

  getFavouriteList() {
    let [itinerary, favourites] = _lists;
    return favourites;
  },

  getWalks(list) {
    return list.walks;
  },

  getLastChange() {
    return _lastChange;
  },

  totalWalks() {
    let count = 0;
    _lists.forEach(list => count += list.walks.size);
    return count;
  },

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(payload) {
    const {list, walk} = payload;
    switch (payload.type) {
      case ActionTypes.ITINERARY_REMOVE_WALK:
        _lastChange = Date.now();
        _removeWalk(list, walk);
      break;
      case ActionTypes.ITINERARY_ADD_WALK:
        _lastChange = Date.now();
        //TODO: Dialog to open on first add to Itinerary/Favourites
        _addWalk(list, walk);
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
        _receiveAll(payload.itineraries);
      break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
