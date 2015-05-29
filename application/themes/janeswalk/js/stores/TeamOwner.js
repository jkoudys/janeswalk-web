var User = require('./User.js');

var TeamOwner = function() {
  User.call(this);
};
TeamOwner.prototype = Object.create(User.prototype, {
  type: {
    value: 'you',
    enumerable: true
  },
  role: {
    value: 'walk-leader',
    writable: true,
    enumerable: true
  },
  primary: {
    value: 'on',
    writable: true,
    enumerable: true
  }
});

module.exports = TeamOwner;
