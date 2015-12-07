import ItineraryConstants from './ItineraryConstants';
import { dispatch } from './ItineraryDispatcher';


//TODO: API call and dispatch walks returned

export default {

  remove(id) {
    dispatch({type: ItineraryConstants.REMOVE_WALK, id});
  },

  add(id) {
    dispatch({type: ItineraryConstants.ADD_WALK, id});
  },

  updateTitle(title) {
    dispatch({type: ItineraryConstants.UPDATE_TITLE, title});
  },

  updateDescription(description) {
    dispatch({type: ItineraryConstants.UPDATE_DESCRIPTION, description});
  },

  viewList(id){
    dispatch({type: ItineraryConstants.VIEW_LIST, id})
  }

}