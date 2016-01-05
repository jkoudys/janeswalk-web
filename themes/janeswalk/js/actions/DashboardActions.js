//import Actions from './DashboardConstants';
//import { dispatch } from './DashboardDispatcher';

import {dispatch} from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

export default {

  filterWalks(filters) {
    dispatch({type: Actions.FILTER_WALKS, filters});
  },

  removeFilter(filter) {
    dispatch({type: Actions.REMOVE_WALK_FILTER, filter});
  },

  addFilter(filter) {
    dispatch({type: Actions.ADD_WALK_FILTER, filter});
  },

  filterByDate(filter) {
    dispatch({type: Actions.FILTER_WALKS_BY_DATE, filter});
  },

  filterLeadersByDate(filter) {
    dispatch({type: Actions.FILTER_LEADERS_BY_DATE, filter});
  },

  sortLeaders(sortBy) {
    dispatch({type: Actions.SORT_LEADERS, sortBy});
  },
}