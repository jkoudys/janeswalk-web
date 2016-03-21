/**
 * User store
 *
 * Users on Jane's Walk.
 */

import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

// Store singletons
// The users, keyed on uID
const _users = new Map();

// Is this the actively logged in user
let _current;

function receiveUser({ user, current }) {
  _users.set(+user.id, user);

  if (current) {
    _current = user;
  }
}

const UserStore = Object.assign({}, Store, {
  getUsers: () => _users,
  getCurrent: () => _current,

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.USER_RECEIVE]: receiveUser,
    [AT.USER_RECEIVE_ALL]: ({ users }) => users.forEach(user => receiveUser({ user })),
  }, () => UserStore.emitChange()),
});

export default UserStore;
