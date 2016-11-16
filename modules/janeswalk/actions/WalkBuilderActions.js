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
