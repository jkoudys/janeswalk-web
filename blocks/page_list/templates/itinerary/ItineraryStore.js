import { dispatch, register } from './ItineraryDispatcher';
import { EventEmitter } from 'events';
import Actions from './ItineraryConstants';
import {lists, walks} from './ItineraryStaticData';

const CHANGE_EVENT = 'change';


let _itinerary = lists[0];
let _favourites = lists[1];
let _currentList = _itinerary;
let _allLists = lists.slice();
let _dialogOpen = false;
let _walkSelected = null;
let _walkDialogOpen = false;

const _removeWalk = (id, listId) => {
  const list = _allLists.find(list => list.id === listId);

  if (!list) {
    console.log('List could not be found');
  } else {

    const walkFound = list.walks.find(walk => walk.id === id);

    if (walkFound) {
      list.walks.splice(list.walks.findIndex(walk => walk.id === id), 1);
    } else {
      console.log('Walk does not exists');
    }
  }
};

const _addWalk = (id, listId) => {
  const list = _allLists.find(list => list.id === listId);

  //TODO: May not be required after API calls
  if (!list) {
    console.log('List could not be found');
  } else {
    const walkFound = list.walks.find(walk => walk.id === id);

    if (!walkFound) {
      const walk = walks.find(walk => walk.id === id);
      if (!walk) {
        console.log('walk not found');
      } else {
        list.walks.unshift(walk);
      }
    } else {
      console.log('Walk already exists, notify the user');
    }
  }
};

const _createList = (title) => {
  const list = _allLists.find(list => list.title === title);

  if (!list) {
    _allLists.push({
      id: _allLists.length + 1,
      title,
      shareUrl: 'janeswalk.org/Harold/' + title,
      description: "View my Jane's Walk Itinerary!",
      walks: [],
    });
  }

  return _allLists[_allLists.length-1]; //Returning list, since after _createList, _addWalk is called, so passing around the list
};

//walks received from API used to update _itinerary
const _updateWalks = (walks) => {
  _currentList.walks = walks.slice();
};

const _updateTitle = (title) => {
  _currentList.title = title;
};

const _updateDescription = (description) => {
  _currentList.description = description;
};

const _getWalks = (id) => {
  if (_currentList.id !== id) {
    const listFound = _allLists.find(list => list.id === id);

    if (listFound) {
      _currentList = listFound;
    } else {
      console.log('list not found, notify user');
    }
  }
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

  getWalks() {
    return _currentList;
  },

  getAllLists() {
    return _allLists;
  },

  getWalkSelected() {
    return _walkSelected;
  },

  getActiveList() {
    return _currentList;
  },

  getWalkDialog() {
    return _walkDialogOpen;
  },

  getDialog() {
    return _dialogOpen;
  },

  getItineraryList() {
    return _itinerary;
  },

  getFavouriteList() {
    return _favourites;
  },

  existsInList(listId,id) {
    const list = _allLists.find(list => list.id === listId);
    return list.walks.find(walk => walk.id === id);
  },

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(action) {
    switch (action.type) {
    case Actions.REMOVE_WALK:
      _removeWalk(action.id, action.list);
      break;
    case Actions.ADD_WALK:
       //TODO: Dialog to open on first add to Itinerary/Favourites
      _addWalk(action.id, action.list);
      break;
    case Actions.UPDATE_TITLE:
      _updateTitle(action.title);
      break;
    case Actions.UPDATE_DESCRIPTION:
      _updateDescription(action.description);
      break;
    case Actions.VIEW_LIST:
      _getWalks(action.id);
      break;
    case Actions.CREATE_LIST:
      let newList = _createList(action.title);
      _addWalk(action.id, newList.id);
      break;
    case Actions.WALK_SELECTED:
      _walkSelected = action.id;
      break;
    case Actions.ADD_WALK_DIALOG:
      _walkDialogOpen = !_walkDialogOpen;
      break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
