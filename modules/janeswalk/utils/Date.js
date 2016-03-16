/**
 * Faster date string building via caching
 */
/* global $ */

let dtfDate;
let dtfTime;

// Date formatter
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  dtfTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
} else {
  // Quick and dirty shim for those poor souls on Safari
  dtfDate = {};
  dtfTime = {};
  dtfDate.format = time => $.datepicker.formatDate('M d, yy', new Date(time));
  dtfTime.format = time => {
    const d = new Date(time);
    return `${d.getHours()}:${d.getMinutes()}`;
  };
}

/**
 * Get the epoch time in ms of a Walk
 */
export function getWalkTime({ time }) {
  if (time && time.slots.length) {
    return time.slots[0][0] * 1000;
  }
  return null;
}
