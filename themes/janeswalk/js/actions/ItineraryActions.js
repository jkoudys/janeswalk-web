import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';

//TODO: API call before dispatch

export default {

  remove(id, list) {
    dispatch({type: ActionTypes.ITINERARY_REMOVE_WALK, id, list});
  },

  add(id, list) {
    dispatch({type: ActionTypes.ITINERARY_ADD_WALK, id, list});
  },

  updateTitle(title) {
    dispatch({type: ActionTypes.ITINERARY_UPDATE_TITLE, title});
  },

  updateDescription(description) {
    dispatch({type: ActionTypes.ITINERARY_UPDATE_DESCRIPTION, description});
  },

  viewList(id) {
    dispatch({type: ActionTypes.ITINERARY_VIEW_LIST, id});
  },

  createList(id, title) {
    dispatch({type: ActionTypes.ITINERARY_CREATE_LIST, id, title});
  },

  walkSelected(id) {
    dispatch({type: ActionTypes.ITINERARY_WALK_SELECTED, id});
  },

  addWalkDialog() {
    dispatch({type: ActionTypes.ITINERARY_ADD_WALK_DIALOG});
  }

}
