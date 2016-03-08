/**
 * Walk store
 *
 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
 * description, and people involved with a walk.
 */

import {dispatch, register2} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';

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

const WalkStore = Object.assign({}, EventEmitter.prototype, changeMethods, {
  getWalks: () => _walks,
  getWalk: (id) => _walks.get(+id),

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.WALK_RECEIVE]: ({walk}) => receiveWalk(walk),
    [AT.WALK_RECEIVE_ALL]: ({walks}) => receiveWalks(walks)
  }, () => WalkStore.emitChange())
});

export default WalkStore;
