/**
 * Walk Builder
 *
 * Actions for building a new/editing an old Walk.
 */

import { dispatch } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';

// Load the walk builder from the full object
export function receiveWalk(walk) {
  dispatch({ type: AT.WB_RECEIVE_WALK, walk });
}

export function setTitle(value) {
  dispatch({ type: AT.WB_SET_TITLE, value });
}

export function setLongDescription(value) {
  dispatch({ type: AT.WB_SET_LONG_DESCRIPTION, value });
}

export function setShortDescription(value) {
  dispatch({ type: AT.WB_SET_SHORT_DESCRIPTION, value });
}
