import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

// Load the walk
export function receive(walk, url) {
  AppDispatcher.dispatch({
    type: ActionTypes.WALK_RECEIVE,
    walk: walk,
    url: url
  });
}

export function change(property, value) {
  AppDispatcher.dispatch({
    type: ActionTypes.WALK_CHANGE,
    property: property,
    value: value
  });
}
