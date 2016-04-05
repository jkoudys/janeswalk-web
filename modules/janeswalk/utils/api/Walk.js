/**
 * Walk Utils
 *
 * Mapping functions to grab remote or global-defined Walks
 */
/* global JanesWalk */

import WalkActions from 'janeswalk/actions/WalkActions.js';
import WalkStore from 'janeswalk/stores/WalkStore.js';

/**
 * Build a walk object based on input data.
 * Needed for API updates that modify the datastructure, or for loading default
 * vals when unspecified.
 * @param object data
 * @return object
 */

// Convert array-ish objects (e.g. {"0": "foo", "1": "bar"}, but _no_ length) to arrays
const objectToArray = obj => Array.from({ length: Object.keys(obj).length, ...obj });

/**
 * Migrate any walks saved in beta format to the v1 API
 * @param object walk
 * @return object
 */
function migrateToV1(walk) {
  const migratedWalk = Object.assign({}, walk);

  // Convert old {0: marker, 1: marker} indexing to a proper array
  if (migratedWalk.map) {
    // Convert markers
    if (!Array.isArray(migratedWalk.map.markers)) {
      migratedWalk.map.markers = objectToArray(migratedWalk.map.markers);
    }
    // Convert routes
    if (!Array.isArray(migratedWalk.map.route)) {
      migratedWalk.map.route = objectToArray(migratedWalk.map.route);
    }
  }

  // Convert time slots
  if (migratedWalk.time && !Array.isArray(migratedWalk.time.slots)) {
    migratedWalk.time.slots = objectToArray(migratedWalk.time.slots);
  }

  // Turn all 'false' values into empty strings
  for (const i in migratedWalk) {
    if (migratedWalk[i] === false) {
      migratedWalk[i] = '';
    } else if (migratedWalk[i] === null) {
      // Clear out 'nulls' so we instead take their state from defaults
      delete migratedWalk[i];
    }
  }

  return migratedWalk;
}

export function buildWalkObject({ data, user, url }) {
  // Keep these defaults to type, ie don't pre-seed data here, aside from
  // data loaded by passing it in
  const defaultWalk = require('janeswalk/constants/defaultWalk.json');
  const defaultTeam = [{
    type: 'you',
    'name-first': user.firstName,
    'name-last': user.lastName,
    role: 'walk-leader',
    primary: 'on',
    bio: user.bio,
    twitter: user.twitter,
    facebook: user.facebook,
    website: user.website,
    email: user.email,
    phone: '',
  }];
  const walk = { ...defaultWalk, team: defaultTeam, url, ...migrateToV1(data) };

  return walk;
}

// GET a walk from a remote request
function getWalk(url, cb) {
  fetch(url.replace(/(\/+|)$/, '/json'))
  .then(res => res.json)
  .then(data => cb(null, migrateToV1(data)))
  .catch(e => cb(`Failed to load walk ${url}: ${e.message}`));
}

// Load a walk from the JanesWalk global
function getWalkGlobal(cb) {
  // CB for consistency, but should always return right away
  cb(undefined, JanesWalk.walk, JanesWalk.walk.url);
}

// Generic function for sending a walk to the server
export function walkSend({ url, walk, method = 'POST' }, cb) {
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(walk),
  })
  .then(res => res.json())
  .then(data => cb(null, data, url))
  .catch(e => cb(`Error parsing JSON on walk post ${url}: ${e.message}`));
}

export function save(cb) {
  walkSend(WalkStore.getUrl(), WalkStore.getApi(), 'POST', (err, message) => {
    if (err) {
      console.log(err);
    } else {
      cb();
      console.log(message);
    }
  });
}

export function publish(cb) {
  // PUT a walk
  walkSend(WalkStore.getUrl(), WalkStore.getApi(), 'PUT', (err, message) => {
    if (err) {
      console.log(err);
    } else {
      cb();
      console.log(message);
    }
  });
}

export function load(url) {
  const receiver = (err, walk) => {
    if (err) {
      console.log(err);
    } else {
      WalkActions.receive(walk);
    }
  };

  if (url) {
    getWalk(url, receiver);
  } else {
    getWalkGlobal(receiver);
  }
}
