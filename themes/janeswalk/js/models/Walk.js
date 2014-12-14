/**
 * Walk model
 * @param Object data Walk data, typically loaded from PHP-built JSON
 * @return this
 */
var Walk = function(data) {
  // Old data had a different layout, so conver it here.
  // Convert old {0: marker, 1: marker} indexing to a proper array
  if (data) {
    // Convert markers
    if (data.gmap && !Array.isArray(data.gmap.markers)) {
      data.gmap.markers = Helper.objectToArray(data.gmap.markers);
    }
    // Convert routes
    if (data.gmap && !Array.isArray(data.gmap.route)) {
      data.gmap.route = Helper.objectToArray(data.gmap.route);
    }
    // Convert time slots
    if (data.time && !Array.isArray(data.time.slots)) {
      data.time.slots = Helper.objectToArray(data.time.slots);
    }
    // Turn all 'false' values into empty strings
    for (var i in data) {
      if (data[i] === false) data[i] = '';
    }

    // Init the leader as creator, if none set
    if (data.team.length === 0) {
      var user = this.props.user;
      data.team = [{
        user_id: user.id,
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
    return data;
  }
}
Object.defineProperties(Walk.prototype, {
  title: {
    value: '',
    writable: true,
    enumerable: true
  },
  shortdescription: {
    value: '',
    writable: true,
    enumerable: true
  },
  longdescription: {
    value: '',
    writable: true,
    enumerable: true
  },
  'accessible-info': {
    value: '',
    writable: true,
    enumerable: true
  },
  'accessible-transit': {
    value: '',
    writable: true,
    enumerable: true
  },
  'accessible-parking': {
    value: '',
    writable: true,
    enumerable: true
  },
  'accessible-find': '',
  gmap: {
    value: {
      markers: [],
      route: []
    },
    writable: true,
    enumerable: true
  },
  team: {
    value: [{
      user_id: -1,
      type: 'you',
      "name-first": '',
      "name-last": '',
      role: 'walk-leader',
      primary: 'on',
      bio: '',
      twitter: '',
      facebook: '',
      website: '',
      email: '',
      phone: '' 
    }],
    writable: true,
    enumerable: true
  },
  time: {
    value: {type: '', slots: []},
    writable: true,
    enumerable: true
  },
  thumbnails: {
    value: [],
    writable: true,
    enumerable: true
  },
  wards: {
    value: '',
    writable: true,
    enumerable: true
  },
  checkboxes: {
    value: {}
    writable: true,
    enumerable: true
  }
});
