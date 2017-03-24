/**
 * Walk store
 *
 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
 * description, and people involved with a walk.
 */

import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import { OrderedMap as iMap, List as iList } from 'immutable';
import Store from './Store';

// Store singletons
// The Walk objects, keyed by walk ID (ie collection ID)
let _walks = iMap();

// Get the "outings", or scheduled dates, for our walks
const getWalkOutings = () => _walks
.reduce((a, walk) => {
  const { time: { slots } = {} } = walk;
  if (slots && slots.length) a.push(
    ...slots.map((slot) => ({
      walk,
      slot,
    }))
  );
  return a;
}, [])
.sort(({ slot: [a], slot: [b] }) => b - a);

const WalkStore = {
  ...Store,
  getWalks: () => _walks,
  getWalk: (id) => _walks.get(+id),
  getWalkOutings,

  // Register our dispatch token as a static method
  dispatchToken: register({
    [AT.WALK_RECEIVE]: ({ walk, walk: id }) => { _walks = _walks.set(+id, walk); },
    [AT.WALK_RECEIVE_ALL]: ({ walks }) => {
      for (const walk of walks) {
        _walks = _walks.set(+walk.id, walk);
      }
    },
  }, () => WalkStore.emitChange()),
};

export default WalkStore;
