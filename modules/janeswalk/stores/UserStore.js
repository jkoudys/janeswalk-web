/**
 * User store
 *
 * Users on Jane's Walk.
 */

import {dispatch, register, register2} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';

// Store singletons
// The users, keyed on uID
const _users = new Map();

// Is this the actively logged in user
let _current;

function receiveUser({user, current, profile}) {
  _users.set(+user.id, user);

  if (current) {
    _current = user;
  }
}

const UserStore = Object.assign({}, EventEmitter.prototype, changeMethods, {
  getUsers: () => _users,
  getCurrent: () => _current,

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.USER_RECEIVE]: receiveUser,
    [AT.USER_RECEIVE_ALL]: ({users}) => users.forEach(user => receiveUser({user}))
  }, () => UserStore.emitChange())
});

export default UserStore;
