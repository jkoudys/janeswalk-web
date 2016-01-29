import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {lists, walks} from '../components/itinerary/ItineraryStaticData';

const CHANGE_EVENT = 'change';

//TODO: for stubbed data, assumed first list is Itinerary, second list is fav
let _itinerary = lists[0];
let _favourites = lists[1];
let _currentList = _itinerary;
let _allLists = lists.slice();
let _dialogOpen = false;
let _walkSelected = null;
let _walkDialogOpen = false;

//TODO: _removeWalk, _addWalk, should receive updated list
//TODO: _createList, _updateTitle, _updateDescription, should receive updated list
//TODO: Need to retrieve all lists either via JW Events, or async call on component mount
//TODO: Currently no remove list, just adding lists

const _removeWalk = (id, listId) => {
  const list = _allLists.find(list => list.id === listId);

  if (!list) {
    console.log('List could not be found');
  } else {
    const walkFound = list.walks.includes(id);

    if (walkFound) {
      list.walks.splice(list.walks.indexOf(id), 1);
    } else {
      console.log('Walk does not exists in list');
    }
  }
};

const _addWalk = (id, listId) => {
  const list = _allLists.find(list => list.id === listId);

  //TODO: May not be required after API calls
  if (!list) {
    console.log('List could not be found');
  } else {
    const walkFound = list.walks.includes(id);

    if (!walkFound) {
      list.walks.unshift(id);
    } else {
      console.log('Walk already exists, notify the user');
    }
  }
};

const _createList = (title) => {

  if (!title.length) return;

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

  //Returning list, since after _createList, _addWalk is called, so passing around the list
  return _allLists[_allLists.length - 1];
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

const _getWalks = (title) => {
  if (_currentList.title !== title) {
    const listFound = _allLists.find(list => list.title === title);

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
    if (list) {
      return list.walks.find(walk => walk === id);
    }
  },

  getWalks() {
    return walks;
  },

  //TODO: use _updateWalks to receive walks from server via API call
  dispatcherIndex: register(function(action) {
    switch (action.type) {
    case ActionTypes.ITINERARY_REMOVE_WALK:
      _removeWalk(action.id, action.listId);
      break;
    case ActionTypes.ITINERARY_ADD_WALK:
       //TODO: Dialog to open on first add to Itinerary/Favourites
      _addWalk(action.id, action.listId);
      break;
    case ActionTypes.ITINERARY_UPDATE_TITLE:
      _updateTitle(action.title);
      break;
    case ActionTypes.ITINERARY_UPDATE_DESCRIPTION:
      _updateDescription(action.description);
      break;
    case ActionTypes.ITINERARY_VIEW_LIST:
      _getWalks(action.title);
      break;
    case ActionTypes.ITINERARY_CREATE_LIST:
      let newList = _createList(action.title);
      if(action.walk && newList) _addWalk(action.id, newList.id, action.walk);
      break;
      case ActionTypes.ITINERARY_WALK_SELECTED:
      // TODO: Refactor further based on functionality.
      if (_walkSelected && _walkSelected.id === action.id) {
        _walkDialogOpen = !_walkDialogOpen;
        _walkSelected = null;
      } else {
        if(!_walkSelected) _walkDialogOpen = !_walkDialogOpen;
        _walkSelected = _currentList.walks.find(w => w.id === action.id);
      }
      break;
    case ActionTypes.ITINERARY_ADD_WALK_DIALOG:
      // TODO: Refactor based on functionality.
      _walkSelected = null;
      _walkDialogOpen = !_walkDialogOpen;
      break;
    }

    ItineraryStore.emitChange();
  }),

});

export default ItineraryStore;
