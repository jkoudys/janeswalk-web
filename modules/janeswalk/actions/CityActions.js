/**
 * City Actions
 *
 */

import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// Load all loop data
export function receive(city) {
  dispatch({
    type: ActionTypes.CITY_RECEIVE,
    city
  });
}
