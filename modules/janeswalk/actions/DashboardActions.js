import {dispatch} from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

export default {

  removeFilter(filter, filterName, location) {
    dispatch({type: ActionTypes.REMOVE_WALK_FILTER, filter, filterName, location});
  },

  toggleFilter(filter, filterName, location) {
    dispatch({type: ActionTypes.TOGGLE_WALK_FILTER, filter, filterName, location});
  },

  filterByDate(filter, location) {
    dispatch({type: ActionTypes.FILTER_WALKS_BY_DATE, filter, location});
  },

  filterLeadersByDate(filter, location) {
    dispatch({type: ActionTypes.FILTER_LEADERS_BY_DATE, filter, location});
  },

  sortLeaders(sortSelected, location) {
    dispatch({type: ActionTypes.SORT_LEADERS, sortSelected, location});
  },

  toggleMenuItems(item) {
    dispatch({type: ActionTypes.TOGGLE_MENU, item});
  },
}