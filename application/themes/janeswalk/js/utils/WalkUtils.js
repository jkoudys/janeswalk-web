/**
 * Walk Utils
 *
 * Mapping functions to grab remote or global-defined Walks
 */

import WalkActions from '../actions/WalkActions.js';
import WalkStore from '../stores/WalkStore.js';

/**
 * Migrate any walks saved in beta format to the v1 API
 * @param object walk
 * @return object
 */
function migrateToV1(walk) {
  // Convert old {0: marker, 1: marker} indexing to a proper array
  // Convert markers
  if (walk.map && !Array.isArray(walk.map.markers)) {
    walk.map.markers = Helper.objectToArray(walk.map.markers);
  }
  // Convert routes
  if (walk.map && !Array.isArray(walk.map.route)) {
    walk.map.route = Helper.objectToArray(walk.map.route);
  }
  // Convert time slots
  if (walk.time && !Array.isArray(walk.time.slots)) {
    walk.time.slots = Helper.objectToArray(walk.time.slots);
  }
  // Turn all 'false' values into empty strings
  for (var i in walk) {
    if (walk[i] === false) {
      walk[i] = '';
    } else if (walk[i] === null) {
      // Clear out 'nulls' so we instead take their state from defaults
      delete walk[i];
    }
  }

  // Init the leader as creator, if none set
  walk.team = walk.team || []
  if (walk.team.length === 0) {
    var user = this.props.user;
    walk.team = [{
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
  }

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
