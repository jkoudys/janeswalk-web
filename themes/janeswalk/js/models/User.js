var User = function(data) {
}
Object.defineProperties(User.prototype, {
  id: {
    value: -1, 
    writable: true,
    enumerable: true
  },
  firstName: {
    value: '',
    writable: true,
    enumerable: true
  },
  lastName: {
    value: '',
    writable: true,
    enumerable: true
  },
  email: {
    value: '',
    writable: true,
    enumerable: true
  },
  phone: {
    value: '',
    writable: true,
    enumerable: true
  },
  twitter: {
    value: '',
    writable: true,
    enumerable: true
  },
  facebook: {
    value: '',
    writable: true,
    enumerable: true
  },
  website: {
    value: '',
    writable: true,
    enumerable: true
  },

  // Virtual Attributes -- do not persist
  fullName: {
    get: function() {
      return (this.firstName + ' ' + this.lastName).trim();
    }
  },

  facebookUrl: {
    get: function() {
      return 'http://www.facebook.com/' + this.facebook;
    }
  },

  twitterUrl: {
    get: function() {
      return 'http://www.twitter.com/' + this.twitter;
    }
  },

  twitterHandle: {
    get: function() {
      return '@' + this.twitter;
    }
  },

  // Class methods
  setTwitter: {
    value: function(val) {
      val = val.trim();
      if (val[0] === '@') {
        val = val.slice(1);
      }
      this.twitter = val;
      return this.twitter;
    }
  }

});

/**
 * The mappings of old legacy properties. oldName: 'newName'
 */
User.legacyProperties = {
  'name-first': 'firstName',
  'name-last': 'lastName',
  'user_id': 'id'
};

/**
 * Convert a user formatted with the fairly ad-hoc data structure of the
 * original CAW to a more consistent model-based approach
 * @param Object data The old-formated data
 * @return Object Data formatted for compatibility with new model
 */
User.convertFromLegacy = function(data) {
  for (var i in data) {
    if (User.legacyProperties[i]) {
      data[User.legacyProperties[i]] = data[i];
      delete data[i];
    }
  }
  return data;
};

module.exports = User;

// [{"user_id":"1","type":"you","name-first":"Denises","name-last":"Pinto","role":"walk-leader","primary":"on","bio":"Denise is the Global Director of Jane's Walk and a Steering Committee member for Walk Toronto. She has nearly a decade of experience with charrette facilitation for a variety of clients across the private and not-for-profit sectors. She is adept at extracting insight through open dialogue, connecting disconnected ideas, prompting empathic and personal visions of city life and tackling wicked problems worth solving. Denise has exhibited widely and participated in a host of place-making activities including, most recently, The Transportation Expo at Evergreen Brickworks. She is the Chair of the Editorial Board for Ground Magazine (the quarterly publication of the Ontario Association of Landscape Architects) where she also frequently contributes. In 2012, she won a Medal of Excellence at the Royal Architectural Institute of Canada's Urban Design Awards for a project on urban agriculture.","twitter":"@denisepinto","facebook":"denisepinto","website":"www.denisepinto.com","email":"admin@janeswalk.net","phone":""},{"user_id":"-1","type":"volunteer","name-first":"David","name-last":"Mair","role":"Volunteer","website":"","phone":""}]
