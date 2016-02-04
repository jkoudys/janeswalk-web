import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// Load the walk
export function receive(walk) {
  dispatch({
    type: ActionTypes.WALK_RECEIVE,
    walk: walk
  });
}

export function receiveAll(walks) {
  dispatch({
    type: ActionTypes.WALK_RECEIVE_ALL,
    walks: walks
  });
}
