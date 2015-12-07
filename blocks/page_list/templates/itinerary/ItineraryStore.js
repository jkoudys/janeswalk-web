import { dispatch, register } from './ItineraryDispatcher';
import { EventEmitter } from 'events';
import ItineraryConstants from './ItineraryConstants';
import lists from './ItineraryStaticData';

const CHANGE_EVENT = 'change';

let _itinerary = lists[0]; //_itinerary represents the current list, will refactor to be _currentList
let _allLists = lists.slice();

const _removeWalk = (id) => {
  _itinerary.walks.splice(_itinerary.walks.findIndex(walk => walk.id === id), 1);
};


const _addWalk = (id) => {
  let walkExists = _itinerary.walks.findIndex(walk => walk.id === id);

  if (walkExists === -1) {
    const walkToAdd = _itinerary.walks.find(walk => walk.id === id);
    _itinerary.walks.unshift(walkToAdd);
  } else {
    console.log('Walk already exists, to notify the user');
  }
};

//walks received from API used to update _itinerary
const _updateWalks = (walks) => {
  _itinerary.walks = walks.slice();
};

const _updateTitle = (title) => {
  _itinerary.title = title;
};

const _updateDescription = (description) => {
  _itinerary.description = description;
};

const _getWalks = (id) => {
  if(_itinerary.id !== id){

    let listFound = _allLists.find(list => list.id === id);

    if(listFound){
      _itinerary = listFound;
    } else {
      console.log('list not found, notify user');
    }

  }
};

const ItineraryStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getItinerary(){
    return _itinerary;
  },

  getAllLists(){
    return _allLists;
  }

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(action) {
    switch (action.type) {
      case ItineraryConstants.REMOVE_WALK:
        _removeWalk(action.id);
        break;
      case ItineraryConstants.ADD_WALK:
        _addWalk(action.id);
        break;
      case ItineraryConstants.UPDATE_TITLE:
        _updateTitle(action.title);
        break;
      case ItineraryConstants.UPDATE_DESCRIPTION:
        _updateDescription(action.description);
        break;
      case ItineraryConstants.VIEW_LIST:
        _getWalks(action.id);
        break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
