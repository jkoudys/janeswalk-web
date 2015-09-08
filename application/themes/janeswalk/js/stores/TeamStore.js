/**
 * Team Store
 *
 * The team! These are the guys who make the walk happen.
 */

// Requires
import {Events, ActionTypes} from '../constants/JWConstants.js';
import 'Store' from './Store.js';

// The team - an ordered set of objects representing the team
let _team = [];

/**
 * Receive the entire team
 * @param array team New team to replace the current one
 */
function receiveTeam(team) {
  _team = team;
}

/**
 * Add a new member to the end of the team
 * @param object member
 */
function receiveMember(member) {
  _team.push(member);
}

const TeamStore = Object.assign({}, Store, {
  getTeam() {
    return _team;
  },
});

// Register our dispatch token as a static method
TeamStore.dispatchToken = AppDispatcher.register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // Route actions
    case ActionTypes.WALK_RECEIVE:
      receiveTeam(payload.walk.team);
      TeamStore.emitChange();
    break;
  }
})

export default TeamStore;
