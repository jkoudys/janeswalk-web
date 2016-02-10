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
    return _team;
  },
});

// Register our dispatch token as a static method
ScheduleStore.dispatchToken = AppDispatcher.register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // Route actions
    case ActionTypes.WALK_RECEIVE:
      receiveSchedule(payload.walk.schedule);
      ScheduleStore.emitChange();
    break;
    default:
      // do nothing
  }
});

export default ScheduleStore;
