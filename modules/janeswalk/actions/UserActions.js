/**
 * User Actions
 *
 */

import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// Load all loop data
export function receive(user, opts = {}) {
  let {current, profile} = opts;
  dispatch({
    type: ActionTypes.USER_RECEIVE,
    user,
    current,
    profile
  });
}

export function receiveAll(users) {
  dispatch({
    type: ActionTypes.USER_RECEIVE_ALL,
    users
  });
}
