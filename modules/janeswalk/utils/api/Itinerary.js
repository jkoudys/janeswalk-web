/**
 * API methods for loading itineraries
 * (de)serializing to and from from the Jane's Walk C5
 */

import ItineraryStore from '../../stores/ItineraryStore';
import {receiveAll, syncEnd} from '../../actions/ItineraryActions';

// Service endpoints
const endpoint = '/profile/itineraries';

/**
 * Serialize as JSON
 * No need to serialize the whole walks list. Just need their IDs
 */
function getJson([...lists]) {
  return JSON.stringify(lists.map(list => {
    const walks = [], times = [];
    const denormal = {};

    // Denormalize for serializing
    list.walks.forEach((timeArr, walk) => {
      walks.push(+walk.id);
      if (timeArr) {
        times.push(timeArr);
      }
    });

    if (times.length) {
      denormal.times = times;
    }
    denormal.walks = walks;

    return Object.assign({}, list, denormal);
  }));
}

export function post(cb, url = endpoint) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onload = function() {
    let data;
    try {
      data = JSON.parse(this.responseText);
      console.log(data);
      cb();
    } catch (e) {
      console.log('Error parsing JSON returned on itinerary' + url);
    }
  };
  xhr.onerror = function() {
    console.log('Failed to update itinerary.');
  };
  xhr.send(getJson(ItineraryStore.getLists()));
}


export function get(url = endpoint) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    let data;
    try {
      data = JSON.parse(this.responseText);
      receiveAll(data);
    } catch (e) {
      cb('Error parsing JSON returned on itinerary' + url);
    }
  };
  xhr.onerror = function() {
    console.log('Failed to update itinerary.');
  };
  xhr.send();
}

/**
 * Poll, and sync when updates stop
 */
export function startPolling(period = 100) {
  let lastSync = ItineraryStore.getLastChange();
  let syncing = false;

  setInterval(() => {
    let lastChange = ItineraryStore.getLastChange();
    // Poll, to see if we've waited a bit since the last thing you changed
    if (Date.now() - lastChange > period * 3) {
      if (lastChange > lastSync && !syncing) {
        syncing = true;
        post(() => {lastSync = Date.now(); syncing = false;});
      }
    }
  }, period);
}
