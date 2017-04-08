/**
 * API methods for the Walk Builder
 * (de)serializing to and from from the Jane's Walk C5
 */

import WalkBuilderStore from '../../stores/WalkBuilderStore';
import { setError } from '../../actions/WalkBuilderActions';

// Simple shallow compare, to get a list of changed props
const getChanged = (ob1, ob2) => Object.entries(ob1).reduce((a, [k, v]) => {
  if (v !== ob2[k]) return a.concat(k);
  return a;
}, []);

/**
 * Poll, and sync when updates stop
 */
export function startPolling(period = 2500) {
  let syncing = false;
  let state = WalkBuilderStore.getWalk();

  setInterval(async () => {
    // If we've changed, and aren't currently syncing, save
    if (!syncing) {
      const newState = WalkBuilderStore.getWalk();
      const changed = getChanged(state, newState);
      state = newState;

      if (changed.length > 0) {
        syncing = true;

        const { error } = await fetch(`/index.php?cID=${state.cID}`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(WalkBuilderStore.getSchema(changed)),
        })
        .then((r) => r.json());

        syncing = false;

        setError(error);
      }
    }
  }, period);
}
