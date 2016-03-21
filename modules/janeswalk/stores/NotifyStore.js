/**
 * Notify Store
 *
 * The notifications. Essentially a log to emit events.
 */

// Requires
import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

// The notifications
const _log = [];

function receiveLogEntry(message, component, level) {
  _log.push({
    time: Date.now(),
    message,
    level,
  });
}

const NotifyStore = Object.assign({}, Store, {
  getLog: () => _log,
  getLogFrom: (from) => _log.filter(entry => entry.time >= from),

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.LOG_INFO]: ({ message, component = 'caw' }) => {
      receiveLogEntry(message, component, 'info');
    },
    [AT.LOG_WARN]: ({ message, component }) => {
      receiveLogEntry(message, component || 'caw', 'warn');
    },
    [AT.LOG_ERROR]: ({ message, component }) => {
      receiveLogEntry(message, component || 'caw', 'error');
    },
    [AT.LOG_EMPTY]: () => _log.splice(0),
  }, () => NotifyStore.emitChange()),
});

export default NotifyStore;
