import {dispatch, register} from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/JWConstants.js';

const CHANGE_EVENT = 'change';

let _user;

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

  getUser() {
    return _user;
  },

  dispatcherIndex: register(function(action) {
    switch (action.type) {
    case ActionTypes.USER_RECEIVE:
      _user = action.user;
      break;
    }

    UserStore.emitChange();
  }),

});

export default UserStore;
