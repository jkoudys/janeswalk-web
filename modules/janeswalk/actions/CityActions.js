/**
 * City Actions
 *
 */

import { dispatch } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';

// Load all loop data
export function receive(city) {
  dispatch({
    type: AT.CITY_RECEIVE,
    city,
  });
}

export const receiveFilters = (filters) => dispatch({ type: AT.CITY_FILTERS_RECEIVE, filters });
