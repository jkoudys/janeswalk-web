/**
 * User store
 *
 * Users on Jane's Walk.
 */

import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

const CHANGE_EVENT = 'change';

// Store singletons
// The users, keyed on uID
const _users = new Map();

// Is this the actively logged in user
let _current;

// Receive a single walk
function receiveUser(user, {current}) {
  _users.set(+user.id, user);

  if (current) {
    _current = user;
  }
}

// Receive an array of walks
function receiveUsers(users) {
  users.forEach(u => receiveUser(u, {}));
}

const UserStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUsers() {
    return _users;
  },

  getCurrent() {
    return _current;
  },

  // Register our dispatch token as a static method
  dispatchToken: register(function(payload) {
    // Go through the various actions
    switch(payload.type) {
      // Route actions
      case ActionTypes.USER_RECEIVE:
        receiveUser(payload.user, {current: payload.current, profile: payload.profile});
      break;
      case ActionTypes.USER_RECEIVE_ALL:
        receiveUsers(payload.users);
      break;
    }
    UserStore.emitChange();
  })
});

export default UserStore;
