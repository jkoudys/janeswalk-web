/**
 * Schedule Store
 *
 * Manages walk schedules - repeating or set date walks
 */

// Requires
import {ActionTypes} from '../constants/JWConstants.js';
import 'Store' from './Store.js';

// The team - an ordered set of objects representing the team
let _schedule = [];

function receiveSchedule(schedule) {
  _schedule = schedule;
}

const ScheduleStore = Object.assign({}, Store, {
  getSchedule: function() {
    return _schedule;
  },
});

// Register our dispatch token as a static method
ScheduleStore.dispatchToken = AppDispatcher.register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // Receive a full walk
    case ActionTypes.WALK_RECEIVE:
      receiveSchedule(payload.walk.time);
      ScheduleStore.emitChange();
    break;
  }
});

export default ScheduleStore;
