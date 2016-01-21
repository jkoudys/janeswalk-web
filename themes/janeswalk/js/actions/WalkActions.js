import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// Load the walk
export function receive(walk, url) {
  dispatch({
    type: ActionTypes.WALK_RECEIVE,
    walk: walk,
    url: url
  });
}

export function change(property, value) {
  dispatch({
    type: ActionTypes.WALK_CHANGE,
    property: property,
    value: value
  });
}
