/**
 * API methods for loading itineraries
 * (de)serializing to and from from the Jane's Walk C5
 */

import ItineraryStore from '../../stores/ItineraryStore';
import { receiveAll } from '../../actions/ItineraryActions';

// Service endpoints
const endpoint = '/profile/itineraries';

/**
 * Serialize as JSON
 * No need to serialize the whole walks list. Just need their IDs
 */
function getJson([...lists], [...schedule]) {
  return JSON.stringify({
    lists: lists.map(list => {
      const walks = [];

      // Denormalize for serializing
      list.walks.forEach(walk => walks.push(+walk.id));

      return Object.assign({}, list, { walks });
    }),
    schedule: schedule.reduce((p, [walk, times]) => {
      p[+walk.id] = [...times];
      return p;
    }, {}),
  });
}

export function post(cb, url = endpoint) {
  fetch(url, {
    method: 'POST',
    body: getJson(ItineraryStore.getLists(), ItineraryStore.getSchedule()),
    credentials: 'include',
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => console.error(`Failed to update itinerary: ${error.message}`));
}


export function get(url = endpoint) {
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
  .then(res => res.json())
  .then(json => receiveAll(json))
  .catch(error => console.error(`Failed to update itinerary: ${error.message}`));
}

/**
 * Poll, and sync when updates stop
 */
export function startPolling(period = 100) {
  let lastSync = ItineraryStore.getLastChange();
  let syncing = false;

  setInterval(() => {
    const lastChange = ItineraryStore.getLastChange();
    // Poll, to see if we've waited a bit since the last thing you changed
    if (Date.now() - lastChange > period * 3) {
      if (lastChange > lastSync && !syncing) {
        syncing = true;
        post(() => {lastSync = Date.now(); syncing = false;});
      }
    }
  }, period);
}
