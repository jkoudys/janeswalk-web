import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

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
