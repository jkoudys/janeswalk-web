/**
 * Walk store
 *
 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
 * description, and people involved with a walk.
 */

import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

// Store singletons
// The Walk objects, keyed by walk ID (ie collection ID)
const _walks = new Map();

// Receive a single walk
function receiveWalk(walk) {
  _walks.set(+walk.id, walk);
}

// Receive an array of walks
function receiveWalks(walks) {
  for (const walk of walks) {
    receiveWalk(walk);
  }
}

// Get the "outings", or scheduled dates, for our walks
function getWalkOutings() {
  return [..._walks.values()].reduce((arr, walk) => {
    if (walk.time && walk.time.slots) {
      for (const slot of walk.time.slots) {
        arr.push({ walk, slot });
      }
    }
    return arr;
  }, [])
  .sort((a, b) => a.slot[0] - b.slot[0]);
}

const WalkStore = {
  ...Store,
  getWalks: () => _walks,
  getWalk: (id) => _walks.get(+id),
  getWalkOutings,

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.WALK_RECEIVE]: ({ walk }) => receiveWalk(walk),
    [AT.WALK_RECEIVE_ALL]: ({ walks }) => receiveWalks(walks),
  }, () => WalkStore.emitChange()),
};

export default WalkStore;
