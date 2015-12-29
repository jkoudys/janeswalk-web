import Actions from './ItineraryConstants';
import { dispatch } from './ItineraryDispatcher';


//TODO: API call before dispatch

export default {

  remove(id, list) {
    debugger;
    dispatch({type: Actions.REMOVE_WALK, id, list});
  },

  add(id, list) {
    debugger;
    dispatch({type: Actions.ADD_WALK, id, list});
  },

  updateTitle(title) {
    dispatch({type: Actions.UPDATE_TITLE, title});
  },

  updateDescription(description) {
    dispatch({type: Actions.UPDATE_DESCRIPTION, description});
  },

  viewList(id) {
    dispatch({type: Actions.VIEW_LIST, id});
  },

  createList(id, title) {
    dispatch({type: Actions.CREATE_LIST, id, title});
  },

  walkSelected(id) {
    dispatch({type: Actions.WALK_SELECTED, id});
  },

  addWalkDialog() {
    dispatch({type: Actions.ADD_WALK_DIALOG});
  }

}