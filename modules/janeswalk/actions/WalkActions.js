import { dispatch } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';

// Load the walk
export function receive(walk) {
  dispatch({ type: AT.WALK_RECEIVE, walk });
}

export function receiveAll(walks) {
  dispatch({ type: AT.WALK_RECEIVE_ALL, walks });
}
