import {dispatch} from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

export default {

  filterWalks(filters) {
    dispatch({type: ActionsTypes.FILTER_WALKS, filters});
  },

  removeFilter(filter) {
    dispatch({type: ActionsTypes.REMOVE_WALK_FILTER, filter});
  },

  addFilter(filter) {
    dispatch({type: ActionsTypes.ADD_WALK_FILTER, filter});
  },

  filterByDate(filter) {
    dispatch({type: ActionsTypes.FILTER_WALKS_BY_DATE, filter});
  },

  filterLeadersByDate(filter) {
    dispatch({type: ActionsTypes.FILTER_LEADERS_BY_DATE, filter});
  },

  sortLeaders(sortBy) {
    dispatch({type: Actions.SORT_LEADERS, sortBy});
  },

  toggleMenuItems(item) {
    dispatch({type: Actions.TOGGLE_MENU, item});
  },
}