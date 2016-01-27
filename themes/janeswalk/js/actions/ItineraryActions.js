import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';

//TODO: API call before dispatch

export default {

  remove(id, listId) {
    dispatch({type: ActionTypes.ITINERARY_REMOVE_WALK, id, listId});
  },

  add(id, listId, walk, switchToList) {
    dispatch({type: ActionTypes.ITINERARY_ADD_WALK, id, listId, walk, switchToList});
  },

  updateTitle(title) {
    dispatch({type: ActionTypes.ITINERARY_UPDATE_TITLE, title});
  },

  updateDescription(description) {
    dispatch({type: ActionTypes.ITINERARY_UPDATE_DESCRIPTION, description});
  },

  viewList(title) {
    dispatch({type: ActionTypes.ITINERARY_VIEW_LIST, title});
  },

  createList(title, id, walk) {
    dispatch({type: ActionTypes.ITINERARY_CREATE_LIST, id, title, walk});
  },

  walkSelected(id) {
    dispatch({type: ActionTypes.ITINERARY_WALK_SELECTED, id});
  },

  addWalkDialog() {
    dispatch({type: ActionTypes.ITINERARY_ADD_WALK_DIALOG});
  }

}
