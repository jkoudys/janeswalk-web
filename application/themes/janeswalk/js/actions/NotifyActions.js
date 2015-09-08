import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../constants/JWConstants.js';

export info(message, component) {
  AppDispatcher.dispatch({
    type: ActionTypes.LOG_INFO,
    message: message,
    component: component
  });
}

export warn(message, component) {
  AppDispatcher.dispatch({
    type: ActionTypes.LOG_WARN,
    message: message,
    component: component
  });
}

export error(message, component) {
  AppDispatcher.dispatch({
    type: ActionTypes.LOG_ERROR,
    message: message,
    component: component
  });
}
