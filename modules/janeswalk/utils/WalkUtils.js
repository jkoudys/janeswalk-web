/**
 * Walk Utils
 *
 * Mapping functions to grab remote or global-defined Walks
 */

import WalkActions from '../actions/WalkActions.js';
import WalkStore from '../stores/WalkStore.js';

/**
 * Build a walk object based on input data.
 * Needed for API updates that modify the datastructure, or for loading default
 * vals when unspecified.
 * @param object data
 * @return object
 */
// TODO: move this into its own model js

/**
 * Migrate any walks saved in beta format to the v1 API
 * @param object walk
 * @return object
 */
function migrateToV1(walk) {
  const migratedWalk = Object.assign({}, walk);

  // Convert old {0: marker, 1: marker} indexing to a proper array
  // Convert markers
  if (migratedWalk.map && !Array.isArray(migratedWalk.map.markers)) {
    migratedWalk.map.markers = Helper.objectToArray(migratedWalk.map.markers);
  }
  // Convert routes
  if (migratedWalk.map && !Array.isArray(migratedWalk.map.route)) {
    migratedWalk.map.route = Helper.objectToArray(migratedWalk.map.route);
  }
  // Convert time slots
  if (migratedWalk.time && !Array.isArray(migratedWalk.time.slots)) {
    migratedWalk.time.slots = Helper.objectToArray(migratedWalk.time.slots);
  }
  // Turn all 'false' values into empty strings
  for (var i in migratedWalk) {
    if (migratedWalk[i] === false) {
      migratedWalk[i] = '';
    } else if (migratedWalk[i] === null) {
      // Clear out 'nulls' so we instead take their state from defaults
      delete migratedWalk[i];
    }
  }

  return migratedWalk;
}

export function buildWalkObject({data, user, url}) {
  // Keep these defaults to type, ie don't pre-seed data here, aside from
  // data loaded by passing it in
  const defaultWalk = require('../constants/defaultWalk.json');
  const defaultTeam = [{
    type: 'you',
    "name-first": user.firstName,
    "name-last": user.lastName,
    role: 'walk-leader',
    primary: 'on',
    bio: user.bio,
    twitter: user.twitter,
    facebook: user.facebook,
    website: user.website,
    email: user.email,
    phone: '' 
  }];
  const walk = {...defaultWalk, team: defaultTeam, url, ...migrateToV1(data)};

  return walk;
}


// GET a walk from a remote request
function getWalk(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url.replace(/(\/+|)$/, '/json'));
  xhr.onload = function() {
    let data;
    try {
      data = JSON.parse(this.responseText);
      cb(null, migrateToV1(data));
    } catch (e) {
      cb('Error parsing JSON returned on walk' + url);
    }
  };
  xhr.onerror = function() {
    cb('Failed to load walk ' + url);
  };
  xhr.send();
}

// Load a walk from the JanesWalk global
function getWalkGlobal(cb) {
  // CB for consistency, but should always return right away
  cb(undefined, JanesWalk.walk, JanesWalk.walk.url);
}

// Generic function for sending a walk to the server
function walkSend(url, walk, method, cb) {
  var xhr = new XMLHttpRequest();
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.open(method, url)
  xhr.onload = function() {
    var response;
    try {
      response = JSON.parse(this.responseText);
      cb(null, response, url);
    } catch (e) {
      cb('Error parsing JSON on walk post' + url);
    }
  };
  xhr.send(JSON.stringify(walk));
}

export function save(cb) {
  NotifyActions.info('Saving walk', 'save');
  walkSend(WalkStore.getUrl(), WalkStore.getApi(), 'POST', function(err, message) {
    if (err) {
      NotifyActions.error('Failed to save walk');
      console.log(err);
    } else {
      NotifyActions.info('Walk saved');
      cb();
      console.log(message);
    }
  });
}

export function publish(cb) {
  NotifyActions.info('Publishing walk', 'save');
  // PUT a walk
  walkSend(WalkStore.getUrl(), WalkStore.getApi(), 'PUT', function(err, message) {
    if (err) {
      NotifyActions.error('Failed to publish walk');
      console.log(err);
    } else {
      NotifyActions.info('Walk published');
      cb();
      console.log(message);
    }
  });
};

export function load(url) {
  var receiver = function(err, walk, url) {
    if (err) {
      NotifyActions.error('Failed to load walk');
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
