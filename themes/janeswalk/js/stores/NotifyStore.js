/**
 * Notify Store
 *
 * The notifications. Essentially a log to emit events.
 */

// Requires
import {ActionTypes} from '../constants/JWConstants.js';
import {register} from '../dispatcher/AppDispatcher';
import 'Store' from './Store.js';

// The notifications
const _log = [];

function receiveLogEntry(message, component, level) {
  _log.push({
    time: Date.now(),
    message: message,
    level: level
  });
}

const NotifyStore = Object.assign({}, Store, {
  getLog() {
    return _log;
  },

  // Register our dispatch token as a static method
  dispatchToken: register(function(payload) {
    // Go through the various actions
    switch(payload.type) {
      // Route actions
      case ActionTypes.LOG_INFO:
        receiveLogEntry(payload.message, payload.component || 'caw', 'info');
      NotifyStore.emitChange();
      break;
      case ActionTypes.LOG_WARN:
        receiveLogEntry(payload.message, payload.component || 'caw', 'warn');
      NotifyStore.emitChange();
      break;
      case ActionTypes.LOG_ERROR:
        receiveLogEntry(payload.message, payload.component || 'caw', 'error');
      NotifyStore.emitChange();
      break;
      default:
        // do nothing
    }
  });
});

export default NotifyStore;
