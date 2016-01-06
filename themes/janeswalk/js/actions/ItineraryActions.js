import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';

//TODO: API call before dispatch

export default {

  remove(id, list) {
    dispatch({type: ActionTypes.REMOVE_WALK, id, list});
  },

  add(id, list) {
    dispatch({type: ActionTypes.ADD_WALK, id, list});
  },

  updateTitle(title) {
    dispatch({type: ActionTypes.UPDATE_TITLE, title});
  },

  updateDescription(description) {
    dispatch({type: ActionTypes.UPDATE_DESCRIPTION, description});
  },

  viewList(id) {
    dispatch({type: ActionTypes.VIEW_LIST, id});
  },

  createList(id, title) {
    dispatch({type: ActionTypes.CREATE_LIST, id, title});
  },

  walkSelected(id) {
    dispatch({type: ActionTypes.WALK_SELECTED, id});
  },

  addWalkDialog() {
    dispatch({type: ActionTypes.ADD_WALK_DIALOG});
  }

}
