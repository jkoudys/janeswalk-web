import {dispatch} from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../constants/JWConstants.js';

export function info(message, component) {
  dispatch({
    type: ActionTypes.LOG_INFO,
    message: message,
    component: component
  });
}

export function warn(message, type) {
  dispatch({
    type: ActionTypes.LOG_WARN,
    message: message,
    component: component
  });
}

export function error(message, type) {
  dispatch({
    type: ActionTypes.LOG_ERROR,
    message: message,
    component: component
  });
}
