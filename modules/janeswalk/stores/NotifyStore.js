/**
 * Notify Store
 *
 * The notifications. Essentially a log to emit events.
 */

// Requires
import {register2} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';


// The notifications
const _log = [];

function receiveLogEntry(message, component, level) {
  _log.push({
    time: Date.now(),
    message: message,
    level: level
  });
}

const NotifyStore = Object.assign({}, EventEmitter.prototype, changeMethods {
  getLog: () => _log,
  getLogFrom: (from) => _log.filter(entry => entry.time >= from),

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.LOG_INFO]: ({message, component}) => {
      receiveLogEntry(payload.message, payload.component || 'caw', 'info');
    },
    [AT.LOG_WARN]: ({message, component}) => {
      receiveLogEntry(message, component || 'caw', 'warn');
    },
    [AT.LOG_ERROR]: ({message, component}) => {
      receiveLogEntry(message, component || 'caw', 'error');
    },
    [AT.LOG_EMPTY]: () => _log.splice(0),
  }, () => NotifyStore.emitChange())
});

export default NotifyStore;
