/**
 * Walk store
 *
 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
 * description, and people involved with a walk.
 */

import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

const defaultWalk = require('../constants/defaultWalk.json');

const CHANGE_EVENT = 'change';

// Store singletons
// The Walk objects, keyed by walk ID (ie collection ID)
const _walks = new Map();

// Receive a single walk
function receiveWalk(walk) {
  _walks.set(+walk.id, walk);
}

// Receive an array of walks
function receiveWalks(walks) {
  walks.forEach(w => receiveWalk(w));
}

const WalkStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getWalks() {
    return _walks;
  },

  getWalk(id) {
    return _walks.get(+id);
  },

  // Register our dispatch token as a static method
  dispatchToken: register(function(payload) {
    // Go through the various actions
    switch(payload.type) {
      // Route actions
      case ActionTypes.WALK_RECEIVE:
        receiveWalk(payload.walk);
      break;
      case ActionTypes.WALK_RECEIVE_ALL:
        receiveWalks(payload.walks);
      break;
    }
    WalkStore.emitChange();
  })
});

export default WalkStore;
