(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */

// Page Views
var PageViews = {
  PageView: require('./views/Page.jsx'),
  CityPageView: require('./views/pages/City.jsx'),
  HomePageView: require('./views/pages/Home.jsx'),
  ProfilePageView: require('./views/pages/Profile.jsx'),
  WalkPageView: require('./views/pages/Walk.jsx')
};
var ReactViews = {
  CreateWalkView: require('./views/CreateWalk.jsx')
};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var pageViewName =
    document.body.getAttribute('data-pageViewName') ||
    'PageView';
  var ReactView = ReactViews[pageViewName];

  try {
    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render(
            React.createElement(ReactView, {
              locale: JanesWalk.locale, 
              data: JanesWalk.walk.data, 
              city: JanesWalk.city, 
              user: JanesWalk.user, 
              url: JanesWalk.walk.url, 
              valt: JanesWalk.form.valt}
            ),
            document.getElementById('createwalk')
          );
          break;
      }
    } else {
      // FIXME: I'm not in-love with such a heavy jQuery reliance
      new PageViews[pageViewName]($(document.body));
    }
  } catch(e) {
    console.error('Error instantiating page view ' + pageViewName + ': ' + e.stack);
  }

  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener('keyup', function(ev) {
      /* Don't capture inputs going into a form */
      if(ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch(
          String(
            ev.key ||
            (ev.keyCode && String.fromCharCode(ev.keyCode)) ||
            ev.char)
            .toUpperCase()
        ){
          case "M":
            if (toolbar.style.display === 'block' || !toolbar.style.display) {
              toolbar.style.display = 'none';
            } else {
              toolbar.style.display = 'block';
            }
            break;
          default:
            break;
        }
      }
    });
  }
});

},{"./views/CreateWalk.jsx":3,"./views/Page.jsx":5,"./views/pages/City.jsx":18,"./views/pages/Home.jsx":19,"./views/pages/Profile.jsx":20,"./views/pages/Walk.jsx":21}],2:[function(require,module,exports){
/* jshint ignore:start */
// Shims, polyfills, etc.
// dataset
Function.prototype.bind||(Function.prototype.bind=function(e){"use strict";if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),function(){"use strict";var e=Object.prototype,t=e.__defineGetter__,n=e.__defineSetter__,r=e.__lookupGetter__,i=e.__lookupSetter__,s=e.hasOwnProperty;t&&n&&r&&i&&(Object.defineProperty||(Object.defineProperty=function(e,o,u){if(arguments.length<3)throw new TypeError("Arguments not optional");o+="";if(s.call(u,"value")){!r.call(e,o)&&!i.call(e,o)&&(e[o]=u.value);if(s.call(u,"get")||s.call(u,"set"))throw new TypeError("Cannot specify an accessor and a value")}if(!(u.writable&&u.enumerable&&u.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return u.get&&t.call(e,o,u.get),u.set&&n.call(e,o,u.set),e}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(e,t){if(arguments.length<2)throw new TypeError("Arguments not optional.");t+="";var n={configurable:!0,enumerable:!0,writable:!0},o=r.call(e,t),u=i.call(e,t);return s.call(e,t)?!o&&!u?(n.value=e[t],n):(delete n.writable,n.get=n.set=undefined,o&&(n.get=o),u&&(n.set=u),n):n}),Object.defineProperties||(Object.defineProperties=function(e,t){var n;for(n in t)s.call(t,n)&&Object.defineProperty(e,n,t[n])}))}();if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(Element.prototype,"dataset")||!Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var e,t=this,n,r,i,s,o,u=this.attributes,a=u.length,f=function(e){return e.charAt(1).toUpperCase()},l=function(){return this},c=function(e,t){return typeof t!="undefined"?this.setAttribute(e,t):this.removeAttribute(e)};try{(({})).__defineGetter__("test",function(){}),n={}}catch(h){n=document.createElement("div")}for(e=0;e<a;e++){o=u[e];if(o&&o.name&&/^data-\w[\w\-]*$/.test(o.name)){r=o.value,i=o.name,s=i.substr(5).replace(/-./g,f);try{Object.defineProperty(n,s,{enumerable:this.enumerable,get:l.bind(r||""),set:c.bind(t,i)})}catch(p){n[s]=r}}}return n}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}};

// Object.assign, useful for merging objects
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");

      var to = Object(target);

      var hasPendingException = false;
      var pendingException;

      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null)
          continue;

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          try {
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable)
              to[nextKey] = nextSource[nextKey];
          } catch (e) {
            if (!hasPendingException) {
              hasPendingException = true;
              pendingException = e;
            }
          }
        }

        if (hasPendingException)
          throw pendingException;
      }
      return to;
    }
  });
}
/* jshint ignore:end */

},{}],3:[function(require,module,exports){
'use strict';
// Create a Walk
// 
// Form for creating new walks. Includes a map builder, team builder, scheduler
//

// Load create-a-walk View components
var CAWImageUpload = require('./elements/CAWImageUpload.jsx');
var CAWThemeSelect = require('./elements/CAWThemeSelect.jsx');
var CAWMapBuilder = require('./elements/CAWMapBuilder.jsx');
var CAWDateSelect = require('./elements/CAWDateSelect.jsx');
var CAWWardSelect = require('./elements/CAWWardSelect.jsx');
var CAWAccessibleSelect = require('./elements/CAWAccessibleSelect.jsx');
var CAWTeamBuilder = require('./elements/CAWTeamBuilder.jsx');

// Libs
var I18nTranslate = require('./functions/translate.js');
var Helper = require('./functions/helpers.jsx');

var CreateWalk = React.createClass({displayName: 'CreateWalk',
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    var data = this.props.data;
    // TODO: move this into its own model js
    var walk = {
      title: '',
      shortdescription: '',
      longdescription: '',
      'accessible-info': '',
      'accessible-transit': '',
      'accessible-parking': '',
      'accessible-find': '',
      gmap: {
        markers: [],
        route: []
      },
      team: [{
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
      time: {type: '', slots: []},
      thumbnails: [],
      wards: '',
      checkboxes: {},
      notifications: []
    };

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
      data.team = data.team || []
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
      Object.assign(walk, data);
    }
    return walk;
  },

  saveWalk: function(options, cb) {
    // TODO: separate the notifications logic
    /* Send in the updated walk to save, but keep working */
    var notifications = this.state.notifications.slice();
    var removeNotice = function() {
      var notifications = this.state.notifications.slice();
      this.setState({notifications: notifications.slice(1)});
    }.bind(this);

    var defaultOptions = {
      messageTimeout: 1200
    };
    options = options || {};
    
    notifications.push({type: 'info', name: 'Saving walk'});

    // Build a simplified map from the Google objects
    this.setState({
      gmap: this.refs.mapBuilder.getStateSimple(),
      notifications: notifications
    }, function() {
      $.ajax({
        url: this.props.url,
        type: options.publish ? 'PUT' : 'POST',
        data: {json: JSON.stringify(this.state)},
        dataType: 'json',
        success: function(data) {
          var notifications = this.state.notifications.slice();
          notifications.push({type: 'success', name: 'Walk saved'});
          this.setState({notifications: notifications});
          setTimeout(removeNotice, 1200);
          if (cb && cb instanceof Function) {
            cb();
          }
        }.bind(this),
        error: function(xhr, status, err) {
          var notifications = this.state.notifications.slice();
          notifications.push({type: 'danger', name: 'Walk failed to save', message: 'Keep this window open and contact Jane\'s Walk for assistance'});
          this.setState({notifications: notifications});
          setTimeout(removeNotice, 6000);
          console.error(this.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this));
    setTimeout(removeNotice, 1200);
  },

  handleNext: function() {
    // Bootstrap's managing the tabs, so trigger a jQuery click on the next
    var next = $('#progress-panel > .nav > li.active + li > a');
    if (next) {
      this.saveWalk();
      window.scrollTo(0, 0);
      next.trigger('click');
    }
  },
 
  handleSave: function() {
    this.saveWalk();
  },

  handlePublish: function() {
    this.saveWalk({publish: true}, function() {
      console.log('Walk published');
    });
  },
 
  handlePreview: function(e) {
    var _this = this;
    this.saveWalk({}, function() {
      _this.setState({preview: true});
    });
  },

  componentWillMount: function() {
    var locale = this.props.locale;
    var _this = this;

    // Start loading the translations file as early as possible
    if (locale.translation) {
      $.ajax({
        url: locale.translation,
        dataType: 'json',
        success: function(data) {
          try {
            _this.state.i18n.constructor(data.translations['']);
            _this.setState({});
          } catch (e) {
            console.error('Failed to load i18n translations JSON: ' + e.stack);
          }
        }
      });
    }

    this.setState({i18n: new I18nTranslate()});
  },

  render: function() {
    var i18n = this.state.i18n;
    var t = i18n.translate.bind(i18n);
    var t2 = i18n.translatePlural.bind(i18n);

    return (
      React.createElement("main", {id: "create-walk"}, 
        React.createElement("section", null, 
          React.createElement("nav", {id: "progress-panel"}, 
            React.createElement("ul", {className: "nav nav-tabs"}, 
              React.createElement("li", {className: "active"}, React.createElement("a", {'data-toggle': "tab", className: "description", href: "#description"}, React.createElement("i", {className: "fa fa-list-ol"}),  t('Describe Your Walk') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "route", href: "#route"}, React.createElement("i", {className: "fa fa-map-marker"}),  t('Share Your Route') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "time-and-date", href: "#time-and-date"}, React.createElement("i", {className: "fa fa-calendar"}),  t('Set the Time & Date') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "accessibility", href: "#accessibility"}, React.createElement("i", {className: "fa fa-flag"}),  t('Make it Accessible') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "team", href: "#team"}, React.createElement("i", {className: "fa fa-users"}),  t('Build Your Team') ))
            ), 
            React.createElement("section", {id: "button-group"}, 
              React.createElement("button", {className: "btn btn-info btn-preview", id: "preview-walk", title: "Preview what you have so far.", onClick: this.handlePreview},  t('Preview Walk') ), 
              React.createElement("button", {className: "btn btn-info btn-submit", id: "btn-submit", title: "Publishing will make your visible to all."},  t('Publish Walk') ), 
              React.createElement("button", {className: "btn btn-info save", title: "Save", id: "btn-save", onClick: this.handleSave},  t('Save') )
            )
          ), 
          React.createElement("div", {id: "main-panel", role: "main"}, 
            React.createElement("div", {className: "tab-content"}, 
              React.createElement("div", {className: "tab-pane active", id: "description"}, 
                React.createElement("div", {className: "walk-submit lead clearfix"}, 
                  React.createElement("div", {className: "col-md-4"}, 
                    React.createElement("img", {id: "convo-marker", src: CCM_THEME_PATH + '/img/jw-intro-graphic.svg', alt: "Jane's Walks are walking conversations."})
                  ), 
                  React.createElement("div", {className: "col-md-8"}, 
                    React.createElement("h1", null,  t('Hey there, %s!', this.props.user.firstName) ), 
                    React.createElement("p", null,  t('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.') )
                  )
                ), 
                React.createElement("div", {className: "page-header", 'data-section': "description"}, 
                  React.createElement("h1", null,  t('Describe Your Walk') )
                ), 
                React.createElement("form", null, 
                  React.createElement("fieldset", null, 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "title"},  t('Walk Title') ), 
                      React.createElement("div", {className: "alert alert-info"},  t('Something short and memorable.') ), 
                      React.createElement("input", {type: "text", valueLink: this.linkState('title')})
                    )
                  )
                ), 
                React.createElement(CAWImageUpload, {i18n: i18n, valueLink: this.linkState('thumbnails'), valt: this.props.valt}), 
                React.createElement("form", null, 
                  React.createElement("hr", null), 
                  React.createElement("fieldset", null, 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "shortdescription"},  t('Your Walk in a Nutshell') ), 
                      React.createElement("div", {className: "alert alert-info"},  t('Build intrigue! This is what people see when browsing our walk listings.') ), 
                      React.createElement("textarea", {id: "shortdescription", name: "shortdescription", rows: "6", maxLength: "140", valueLink: this.linkState('shortdescription'), required: true})
                    ), 
                    React.createElement("hr", null), 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "longdescription", id: "longwalkdescription"},  t('Walk Description') ), 
                      React.createElement("div", {className: "alert alert-info"}, 
                        t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')
                      ), 
                      React.createElement("textarea", {id: "longdescription", name: "longdescription", rows: "14", valueLink: this.linkState('longdescription')})
                    )
                  ), 
                  React.createElement(CAWThemeSelect, {i18n: i18n, valueLink: this.linkState('checkboxes')}), 
                  React.createElement(CAWWardSelect, {i18n: i18n, wards: this.props.city.wards, valueLink: this.linkState('wards')}), 
                  React.createElement("hr", null)
                )
              ), 
              React.createElement(CAWMapBuilder, {ref: "mapBuilder", i18n: i18n, valueLink: this.linkState('gmap'), city: this.props.city}), 
              React.createElement(CAWDateSelect, {i18n: i18n, valueLink: this.linkState('time')}), 
              React.createElement("div", {className: "tab-pane", id: "accessibility"}, 
                React.createElement("div", {className: "page-header", 'data-section': "accessibility"}, 
                  React.createElement("h1", null,  t('Make it Accessible') )
                ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement(CAWAccessibleSelect, {i18n: i18n, valueLink: this.linkState('checkboxes')})
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", null,  t('What else do people need to know about the accessibility of this walk?'), " (",  t('Optional'), ")"), 
                    React.createElement("textarea", {name: "accessible-info", rows: "3", maxLength: "140", valueLink: this.linkState('accessible-info')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", {id: "transit"},  t('How can someone get to the meeting spot by public transit?'), " (",  t('Optional'), ")"), 
                    React.createElement("div", {className: "alert alert-info"}, 
                       t('Nearest subway stop, closest bus or streetcar lines, etc.')
                    ), 
                    React.createElement("textarea", {rows: "3", name: "accessible-transit", valueLink: this.linkState('accessible-transit')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", null,  t('Where are the nearest places to park?'), " (",  t('Optional'), ")"), 
                    React.createElement("textarea", {rows: "3", name: "accessible-parking", valueLink: this.linkState('accessible-parking')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", {className: "required-legend"},  t('How will people find you?') ), 
                    React.createElement("div", {className: "alert alert-info"}, 
                       t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')
                    ), 
                    React.createElement("textarea", {rows: "3", name: "accessible-find", valueLink: this.linkState('accessible-find')})
                  )
                ), 
                React.createElement("hr", null), 
                React.createElement("br", null)
              ), 
              React.createElement(CAWTeamBuilder, {i18n: i18n, valueLink: this.linkState('team')})
            ), 
            React.createElement("button", {type: "button", onClick: this.handleNext, className: "btn"}, "Next")
          ), 
          React.createElement("aside", {id: "tips-panel", role: "complementary"}, 
            React.createElement("div", {className: "popover right", id: "city-organizer", style: {display: 'block'}}, 
              React.createElement("h3", {className: "popover-title", 'data-toggle': "collapse", 'data-target': "#popover-content"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Contact City Organizer for help') ), 
              React.createElement("div", {className: "popover-content collapse in", id: "popover-content"}, 
                React.createElement("div", {className: "u-avatar", style: {backgroundImage: 'url(' + this.props.city.cityOrganizer.photo + ')'}}), 
                React.createElement("p", null, 
                   t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', this.props.city.cityOrganizer.firstName, this.props.city.name), " ", React.createElement("strong", null, React.createElement("a", {href: 'mailto:' + this.props.city.cityOrganizer.email},  t('email me'), "!")))
              )
            )
          )
        ), 
        React.createElement("dialog", {id: "publish-warning"}, 
          React.createElement("header", null, 
            React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
            React.createElement("h3", null,  t('Okay, You\'re Ready to Publish') )
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("p", null,  t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.') )
          ), 
          React.createElement("footer", null, 
            React.createElement("div", {className: "pull-left"}, 
              React.createElement("a", {href: "", className: "walkthrough close", 'data-dismiss': "modal"}, " ",  t('Bring me back to edit') )
            ), 
            React.createElement("a", {href: 'XXXprofile URL'}, 
              React.createElement("button", {className: "btn btn-primary walkthrough", 'data-step': "publish-confirmation"},  t('Publish') )
            )
          )
        ), 
        React.createElement("dialog", {id: "publish-confirmation"}, 
          React.createElement("header", null, 
            React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
            React.createElement("h3", null, "Your Walk Has Been Published!")
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("p", null, "Congratulations! Your walk is now available for all to peruse."), 
            React.createElement("h2", {className: "lead"}, t('Don\'t forget to share your walk!')), 
            React.createElement("label", null, "Your Walk Web Address:"), 
            React.createElement("input", {type: "text", className: "clone js-url-field", value: this.props.url, readOnly: true}), 
            React.createElement("hr", null), 
            React.createElement("button", {className: "btn facebook"}, React.createElement("i", {className: "fa fa-facebook-sign"}), " Share on Facebook"), 
            React.createElement("button", {className: "btn twitter"}, React.createElement("i", {className: "fa fa-twitter-sign"}), " Share on Twitter")
          ), 
          React.createElement("footer", null, 
            React.createElement("button", {className: "btn btn-primary walkthrough"}, "Close")
          )
        ), 
        this.state.preview ?
          React.createElement("dialog", {id: "preview-modal"}, 
            React.createElement("div", null, 
              React.createElement("article", null, 
                React.createElement("header", null, 
                  React.createElement("button", {type: "button", className: "close", 'aria-hidden': "true", onClick: function(){this.setState({preview: false})}.bind(this)}, "×"), 
                  React.createElement("h3", null,  t('Preview of your Walk') )
                ), 
                React.createElement("div", {className: "modal-body"}, 
                  React.createElement("iframe", {src: this.props.url, frameBorder: "0"})
                )
              )
            )
          )
          : null, 
          React.createElement("aside", {id: "notifications"}, 
            this.state.notifications.map(function(notification) {
              return (
                React.createElement("div", {key: notification.message, className: 'alert alert-' + notification.type}, 
                  React.createElement("strong", null, notification.name || '', ": "), 
                  notification.message || ''
                )
                );
            })
        )
      )
    );
  }
});

module.exports = CreateWalk;

/*
example json:
{"title":"The Beltline and Beyond: The Midtown Trail Loop","shortdescription":"Imagine a 16km off road trail in the heart of Toronto's Midtown. Bring your bike to ride it all!","longdescription":"<span>Did\nyou know that you can cycle a loop that is almost entirely off road right in\nthe middle of Toronto? The trail and ravine systems consisting of the Kay\nGardner Beltline Trail, Park Reservation Trail, David Balfour Park, Yellow\nCreek, Nordheimer Ravine and Cedarvale Park together form a 16 kilometer loop\nseparated by only 1 km of city side streets. These trails story some of\nToronto\u2019s most important urban history, as well as reveal our rich natural\nhistory and watersheds.&nbsp; We'll also be\nriding on top of three of Toronto's 'lost rivers'. Join us as we ride and\nexplore this unique Toronto treasure.<\/span>","accessible-info":"Accessibility and conditions: This is a cycling, not a walking tour - approximately 16km of mostly light riding and one quite steep hill. You do need a bicycle in reasonable shape. Although the ride is almost entirely on trails, they are generally smooth and rideable by most bikes. The most challenging part will be the hill leading out of the Yellow Creek trail up to Avoca. The section between Avoca and Russell Hill Road is the only section on city side streets, and riders are expected to follow the rules of the road. Participants can decide to complete only a limited part of the loop. If you only wish to do half the ride, that's OK too.","accessible-transit":"Ben Nobleman Park is across the road from Eglinton West Subway Station","accessible-parking":"Nearby on street parking though due to the LRT construction, parking is extremely limited.","gmap":{"markers":{"0":{"title":"Ben Nobleman Parkette","description":"The huge picnic table in the middle of the park.","style":"meeting","lat":43.6983887613,"lng":-79.4351971008},"1":{"title":"The missing link","description":"What's preventing the east and west sections connecting.","questions":"","style":"stop","lat":43.7022773798,"lng":-79.4381117538},"2":{"title":"The Beltline","description":"Where the beltline starts, and how it started.","questions":"","style":"stop","lat":43.7027834146,"lng":-79.4365668015},"3":{"title":"Yonge Street","description":"About what we do and why Yonge is so key.","questions":"","style":"stop","lat":43.6956768652,"lng":-79.396036821},"4":{"title":"Entering the Carolinian Forest","description":"We enter some more rugged terrain","questions":"","style":"stop","lat":43.6947866633,"lng":-79.3805872971},"5":{"title":"Park Drive Reservation trail","description":"What they were thinking of 60 years ago.","questions":"","style":"stop","lat":43.6786308037,"lng":-79.3706309372},"6":{"title":"Poplar Plains Road","description":"Toronto's first bike lane! ","questions":"","style":"stop","lat":43.6838883716,"lng":-79.4029891068},"7":{"title":"Nordheimer Ravine","description":"How a river was buried","questions":"","style":"stop","lat":43.682255979,"lng":-79.4093405777},"8":{"title":"Cedarvale ","description":"The ravine with everything","questions":"","style":"stop","lat":43.6868305028,"lng":-79.4163786942},"9":{"title":"Underground rivers","description":"Our first of 3 underground rivers. ","questions":"","style":"stop","lat":43.7026068983,"lng":-79.4181990341}},"route":{"0":{"lat":43.6986241931,"lng":-79.4352058321,"title":"#undefined"},"1":{"lat":43.698593166,"lng":-79.4362572581,"title":"#undefined"},"2":{"lat":43.6987483014,"lng":-79.4368580729,"title":"#undefined"},"3":{"lat":43.7018198988,"lng":-79.4377378374,"title":"#undefined"},"4":{"lat":43.7028282172,"lng":-79.4382742792,"title":"#undefined"},"5":{"lat":43.7030919285,"lng":-79.4369868189,"title":"#undefined"},"6":{"lat":43.7027351424,"lng":-79.436654225,"title":"#undefined"},"7":{"lat":43.7047982673,"lng":-79.4265369326,"title":"#undefined"},"8":{"lat":43.7044880275,"lng":-79.4233397394,"title":"#undefined"},"9":{"lat":43.7037744698,"lng":-79.4209364802,"title":"#undefined"},"10":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"11":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"12":{"lat":43.6981277575,"lng":-79.4061521441,"title":"#undefined"},"13":{"lat":43.695598975,"lng":-79.3970540911,"title":"#undefined"},"14":{"lat":43.6957075752,"lng":-79.3958524615,"title":"#undefined"},"15":{"lat":43.6975382349,"lng":-79.3865183741,"title":"#undefined"},"16":{"lat":43.6973830964,"lng":-79.3864325434,"title":"#undefined"},"17":{"lat":43.6973986103,"lng":-79.3858746439,"title":"#undefined"},"18":{"lat":43.6970728183,"lng":-79.3845013529,"title":"#undefined"},"19":{"lat":43.6965763698,"lng":-79.3837288767,"title":"#undefined"},"20":{"lat":43.6970573043,"lng":-79.3829349428,"title":"#undefined"},"21":{"lat":43.6961419741,"lng":-79.3806604296,"title":"#undefined"},"22":{"lat":43.6958316895,"lng":-79.3811324984,"title":"#undefined"},"23":{"lat":43.6954748602,"lng":-79.3812183291,"title":"#undefined"},"24":{"lat":43.6951490577,"lng":-79.3807462603,"title":"#undefined"},"25":{"lat":43.6947922243,"lng":-79.3807462603,"title":"#undefined"},"26":{"lat":43.6946681079,"lng":-79.3804887682,"title":"#undefined"},"27":{"lat":43.694699137,"lng":-79.3801454455,"title":"#undefined"},"28":{"lat":43.6930700857,"lng":-79.3762401491,"title":"#undefined"},"29":{"lat":43.6929304507,"lng":-79.375532046,"title":"#undefined"},"30":{"lat":43.6908979485,"lng":-79.3714980036,"title":"#undefined"},"31":{"lat":43.6906496992,"lng":-79.3708757311,"title":"#undefined"},"32":{"lat":43.6896722078,"lng":-79.3686226755,"title":"#undefined"},"33":{"lat":43.6883843773,"lng":-79.3676570803,"title":"#undefined"},"34":{"lat":43.6866775713,"lng":-79.367871657,"title":"#undefined"},"35":{"lat":43.68462934,"lng":-79.3670562655,"title":"#undefined"},"36":{"lat":43.6837448549,"lng":-79.3670562655,"title":"#undefined"},"37":{"lat":43.683046568,"lng":-79.3673995882,"title":"#undefined"},"38":{"lat":43.6814792721,"lng":-79.3687728792,"title":"#undefined"},"39":{"lat":43.6802688572,"lng":-79.3687943369,"title":"#undefined"},"40":{"lat":43.6791670481,"lng":-79.3690303713,"title":"#undefined"},"41":{"lat":43.6788566757,"lng":-79.3701247126,"title":"#undefined"},"42":{"lat":43.6786083766,"lng":-79.3705753237,"title":"#undefined"},"43":{"lat":43.6789963434,"lng":-79.3714980036,"title":"#undefined"},"44":{"lat":43.6793687893,"lng":-79.3741587549,"title":"#undefined"},"45":{"lat":43.6793687893,"lng":-79.3747810274,"title":"#undefined"},"46":{"lat":43.6799740089,"lng":-79.3761328608,"title":"#undefined"},"47":{"lat":43.6799119354,"lng":-79.378407374,"title":"#undefined"},"48":{"lat":43.6799584905,"lng":-79.3800596148,"title":"#undefined"},"49":{"lat":43.680206784,"lng":-79.3812397867,"title":"#undefined"},"50":{"lat":43.6807344043,"lng":-79.3820337206,"title":"#undefined"},"51":{"lat":43.6805481859,"lng":-79.3826559931,"title":"#undefined"},"52":{"lat":43.6822706841,"lng":-79.3835357577,"title":"#undefined"},"53":{"lat":43.6831086382,"lng":-79.3840292841,"title":"#undefined"},"54":{"lat":43.6839776154,"lng":-79.3846086413,"title":"#undefined"},"55":{"lat":43.6844741681,"lng":-79.3850592524,"title":"#undefined"},"56":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"57":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"58":{"lat":43.6849335,"lng":-79.3855001405,"title":"#undefined"},"59":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"60":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"61":{"lat":43.685290392,"lng":-79.3853928521,"title":"#undefined"},"62":{"lat":43.6857326248,"lng":-79.3852319196,"title":"#undefined"},"63":{"lat":43.6857248664,"lng":-79.3856181577,"title":"#undefined"},"64":{"lat":43.6862524381,"lng":-79.3856718019,"title":"#undefined"},"65":{"lat":43.6866946638,"lng":-79.3858220056,"title":"#undefined"},"66":{"lat":43.6870049957,"lng":-79.3861116841,"title":"#undefined"},"67":{"lat":43.6872222271,"lng":-79.3864120916,"title":"#undefined"},"68":{"lat":43.6874394577,"lng":-79.3868734315,"title":"#undefined"},"69":{"lat":43.6879825306,"lng":-79.3877102807,"title":"#undefined"},"70":{"lat":43.6882230328,"lng":-79.388675876,"title":"#undefined"},"71":{"lat":43.6872687766,"lng":-79.388278909,"title":"#undefined"},"72":{"lat":43.6862524381,"lng":-79.3932678178,"title":"#undefined"},"73":{"lat":43.685880035,"lng":-79.3932785466,"title":"#undefined"},"74":{"lat":43.684398158,"lng":-79.4004668668,"title":"#undefined"},"75":{"lat":43.6842585028,"lng":-79.4005741552,"title":"#undefined"},"76":{"lat":43.6837929831,"lng":-79.4029023126,"title":"#undefined"},"77":{"lat":43.6842429855,"lng":-79.4031490758,"title":"#undefined"},"78":{"lat":43.6837309135,"lng":-79.4054665044,"title":"#undefined"},"79":{"lat":43.6827921034,"lng":-79.4051124528,"title":"#undefined"},"80":{"lat":43.6824817497,"lng":-79.4066788629,"title":"#undefined"},"81":{"lat":43.6816437868,"lng":-79.4060673192,"title":"#undefined"},"82":{"lat":43.6813101501,"lng":-79.4037820771,"title":"#undefined"},"83":{"lat":43.6812325599,"lng":-79.403395839,"title":"#undefined"},"84":{"lat":43.6808678847,"lng":-79.4030310586,"title":"#undefined"},"85":{"lat":43.6807592576,"lng":-79.4034494832,"title":"#undefined"},"86":{"lat":43.680704944,"lng":-79.4037391618,"title":"#undefined"},"87":{"lat":43.6803402656,"lng":-79.4037713483,"title":"#undefined"},"88":{"lat":43.6806661486,"lng":-79.4048549607,"title":"#undefined"},"89":{"lat":43.6807670167,"lng":-79.4053163007,"title":"#undefined"},"90":{"lat":43.6809609935,"lng":-79.4069041684,"title":"#undefined"},"91":{"lat":43.6812868731,"lng":-79.4076122716,"title":"#undefined"},"92":{"lat":43.6815351611,"lng":-79.408041425,"title":"#undefined"},"93":{"lat":43.6816825816,"lng":-79.4084062055,"title":"#undefined"},"94":{"lat":43.68220243,"lng":-79.4090070203,"title":"#undefined"},"95":{"lat":43.6822955367,"lng":-79.4099726155,"title":"#undefined"},"96":{"lat":43.6824196788,"lng":-79.4109489396,"title":"#undefined"},"97":{"lat":43.6825050263,"lng":-79.4114102796,"title":"#undefined"},"98":{"lat":43.6826058914,"lng":-79.4115926698,"title":"#undefined"},"99":{"lat":43.682675721,"lng":-79.4118608907,"title":"#undefined"},"100":{"lat":43.6827377916,"lng":-79.4122685865,"title":"#undefined"},"101":{"lat":43.68300935,"lng":-79.4128050283,"title":"#undefined"},"102":{"lat":43.6831490081,"lng":-79.4135024026,"title":"#undefined"},"103":{"lat":43.6834438409,"lng":-79.4142319635,"title":"#undefined"},"104":{"lat":43.6836300503,"lng":-79.4149722531,"title":"#undefined"},"105":{"lat":43.6834826346,"lng":-79.4157983735,"title":"#undefined"},"106":{"lat":43.6837386722,"lng":-79.4161524251,"title":"#undefined"},"107":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"108":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"109":{"lat":43.6846541917,"lng":-79.4160665944,"title":"#undefined"},"110":{"lat":43.6854843542,"lng":-79.4165386632,"title":"#undefined"},"111":{"lat":43.685336943,"lng":-79.417203851,"title":"#undefined"},"112":{"lat":43.6856472819,"lng":-79.4173969701,"title":"#undefined"},"113":{"lat":43.6858722766,"lng":-79.4166352227,"title":"#undefined"},"114":{"lat":43.6860041696,"lng":-79.4166674092,"title":"#undefined"},"115":{"lat":43.6865860473,"lng":-79.416227527,"title":"#undefined"},"116":{"lat":43.6872920513,"lng":-79.4166352227,"title":"#undefined"},"117":{"lat":43.6878118511,"lng":-79.4168283418,"title":"#undefined"},"118":{"lat":43.6882385491,"lng":-79.4168283418,"title":"#undefined"},"119":{"lat":43.6885876633,"lng":-79.4169034436,"title":"#undefined"},"120":{"lat":43.6888436792,"lng":-79.4172253087,"title":"#undefined"},"121":{"lat":43.6889290175,"lng":-79.4175257161,"title":"#undefined"},"122":{"lat":43.6889367756,"lng":-79.4179226831,"title":"#undefined"},"123":{"lat":43.6895418986,"lng":-79.4185664132,"title":"#undefined"},"124":{"lat":43.6899375527,"lng":-79.419628568,"title":"#undefined"},"125":{"lat":43.6898987632,"lng":-79.4198967889,"title":"#undefined"},"126":{"lat":43.6898987632,"lng":-79.4201864675,"title":"#undefined"},"127":{"lat":43.6903952669,"lng":-79.4208623841,"title":"#undefined"},"128":{"lat":43.6902556257,"lng":-79.4218065217,"title":"#undefined"},"129":{"lat":43.69024011,"lng":-79.4220962003,"title":"#undefined"},"130":{"lat":43.6903797513,"lng":-79.4224073365,"title":"#undefined"},"131":{"lat":43.6905814548,"lng":-79.4235124066,"title":"#undefined"},"132":{"lat":43.6908684932,"lng":-79.4237913564,"title":"#undefined"},"133":{"lat":43.6908995243,"lng":-79.4242956117,"title":"#undefined"},"134":{"lat":43.691008133,"lng":-79.4247569516,"title":"#undefined"},"135":{"lat":43.6909383132,"lng":-79.4259156659,"title":"#undefined"},"136":{"lat":43.690977102,"lng":-79.4263340905,"title":"#undefined"},"137":{"lat":43.6911322571,"lng":-79.4271923974,"title":"#undefined"},"138":{"lat":43.6911555303,"lng":-79.4283081964,"title":"#undefined"},"139":{"lat":43.6919002687,"lng":-79.4297780469,"title":"#undefined"},"140":{"lat":43.6921097247,"lng":-79.4298102334,"title":"#undefined"},"141":{"lat":43.6922183313,"lng":-79.4300140813,"title":"#undefined"},"142":{"lat":43.6924200286,"lng":-79.4304217771,"title":"#undefined"},"143":{"lat":43.6926527554,"lng":-79.4307650998,"title":"#undefined"},"144":{"lat":43.692776876,"lng":-79.4311942533,"title":"#undefined"},"145":{"lat":43.69389395,"lng":-79.4329323247,"title":"#undefined"},"146":{"lat":43.6944292073,"lng":-79.4330181554,"title":"#undefined"},"147":{"lat":43.6949877314,"lng":-79.433962293,"title":"#undefined"},"148":{"lat":43.6953678352,"lng":-79.434616752,"title":"#undefined"},"149":{"lat":43.6956703651,"lng":-79.4347669557,"title":"#undefined"},"150":{"lat":43.6971597205,"lng":-79.4353248551,"title":"#undefined"},"151":{"lat":43.6980983058,"lng":-79.4356896356,"title":"#undefined"}}},"team":[{"user_id":"176","type":"you","name-first":"Burns","name-last":"Wattie","role":"walk-leader","primary":"on","bio":"Burns is a midtowner who loves to cycle, run, cook and walk  - or run \u2013 the dog. He volunteers with Cycle Toronto, active in his local ward group (Cycle Toronto Midtown)  and the Yonge Street Working group.","twitter":"@homecookexplore","facebook":"","website":"","email":"burns.wattie@gmail.com","phone":false}],"time":{"type":"set","slots":{"0":{"date":"May 3, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-03 13:00:00","eb_end":"2014-05-03 15:30:00"},"1":{"date":"May 4, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-04 13:00:00","eb_end":"2014-05-04 15:30:00"}}},"thumbnail_id":"316","thumbnail_url":null,"wards":"Ward 22 St. Paul\\'s","checkboxes":{"theme-nature-naturelover":true,"theme-urban-moversandshakers":true,"theme-civic-activist":true,"accessible-familyfriendly":true,"accessible-dogs":true,"accessible-steephills":true,"accessible-bicyclesonly":true}}
*/

},{"./elements/CAWAccessibleSelect.jsx":7,"./elements/CAWDateSelect.jsx":8,"./elements/CAWImageUpload.jsx":9,"./elements/CAWMapBuilder.jsx":10,"./elements/CAWTeamBuilder.jsx":11,"./elements/CAWThemeSelect.jsx":12,"./elements/CAWWardSelect.jsx":13,"./functions/helpers.jsx":15,"./functions/translate.js":17}],4:[function(require,module,exports){
'use strict';
/**
* The dialogue to share on facebook
* 
* @public
* @param  Object shareObj
* @return void
*/
var FacebookShareDialog = function(shareObj) {
  this._shareObj = shareObj;
  this._shareObj.method = 'feed';
};
Object.defineProperties(FacebookShareDialog.prototype, {
  /**
   * _shareObj
   * 
   * @protected
   * @var       Object (default: null)
   */
  _shareObj: {value: null, writable: true},

  /**
   * show
   * 
   * @public
   * @param  Function failed
   * @param  Function successful
   * @return void
   */
  show: {
    value: function(failed, successful) {
      var _this = this;
      FB.ui(
        this._shareObj,
        function(response) {
          if (response !== undefined) {
            if (response === null) {
              if (failed) failed();
            } else {
              if (successful) successful();
            }
          }
        }
      );
    }
  }
});

module.exports = FacebookShareDialog;


},{}],5:[function(require,module,exports){
'use strict';
var View = require('./View.jsx');

/**
 * Basic View info for a regular ol' page
 * 
 * @param  jQuery element
 * @return void
 */
var PageView = function(element) {
  View.call(this, element);
  this._addNavEvents();
  this._addOverlayCloseEvent();
};
PageView.prototype = Object.create(View.prototype, {
  /**
   * _addOverlayCloseEvent
   * 
   * @protected
   * @return    void
   */
  _addOverlayCloseEvent: {
    value: function() {
      var _this = this;
      this._element.find('.o-background').click(
        function(event) {
        _this._element.find('.overlay').hide();
      }
      );
      this._element.find('a.closeModalCta').click(
        function(event) {
        event.preventDefault();
        _this._element.find('.overlay').hide();
      }
      );
    }
  },

  /**
   * _addNavEvents
   * 
   * @protected
   * @return    void
   */
  _addNavEvents: {
    value: function() {
      this._element.find('a.search-open').click(
        function() {
        $('html, body').animate(
          {
          scrollTop: 0
        },
        300
        );
        $('body > header').addClass('dropped');
      }
      );
      this._element.find('a.search-close').click(
        function() {
        $('body > header').removeClass('dropped');
      }
      );
    }
  },

  /**
   * _makeGaCall
   * 
   * @protected
   * @param     Array call
   * @return    void
   */
  _makeGaCall: {
    value: function(call) {
      _gaq.push(call);
    }
  },

  /**
   * trackCustomVar
   * 
   * @see    http://www.sitepoint.com/google-analytics-custom-variables/
   * @see    http://online-behavior.com/analytics/custom-variables-segmentation
   * @public
   * @param  String index
   * @param  String name
   * @param  String value
   * @param  String scope (optional)
   * @return void
   */
  trackCustomVar: {
    value: function(index, name, value, scope) {
      var call = ['_setCustomVar', index, name, value, scope];
      this._makeGaCall(call);
    }
  },

  /**
   * trackEvent
   * 
   * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
   * @public
   * @param  String category The name you supply for the group of objects you want to track.
   * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
   * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
   * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
   * @param  Boolean override (optional)
   * @return void
   */
  trackEvent: {
    value: function(category, action, optLabel, optValue, override) {
      var call = ['_trackEvent'];
      if (category !== undefined) {
        call.push(category);
      }
      if (action !== undefined) {
        call.push(action);
      }
      if (optLabel !== undefined) {
        call.push(optLabel);
      }
      if (optValue !== undefined) {
        call.push(optValue);
      }
      this._makeGaCall(call, override);
    }
  },

  /**
   * trackView
   * 
   * @public
   * @param  String path
   * @return void
   */
  trackView: {
    value: function(path) {
      var call = ['_trackPageview', path];
      this._makeGaCall(call);
    }
  }
});

module.exports = PageView;

},{"./View.jsx":6}],6:[function(require,module,exports){
'use strict';
require('../shims.js');

/**
* View constructor
* 
* @public
* @param  jQuery element
* @return void
*/
var View = function(element) {
  this._element = element;
};
Object.defineProperties(View.prototype, {
  /**
   * _element
   * 
   * @protected
   * @var       jQuery (default: null)
   */
  _element: {value: null, writable: true, configurable: true},

  /**
   * getElement
   * 
   * @public
   * @return HTMLFormElement
   */
  getElement: {
    value: function() {
      return this._element;
    }
  }
});

module.exports = View;


},{"../shims.js":2}],7:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var AccessibleSelect = React.createClass({
  displayName: 'AccessibleSelect',
  mixins: [mixins.linkedParentState],

  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("fieldset", null, 
        React.createElement("legend", {className: "required-legend"},  t('How accessible is this walk?') ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-6"}, 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-familyfriendly')}),  t('Family friendly') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-wheelchair')}),  t('Wheelchair accessible') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-dogs')}),  t('Dogs welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-strollers')}),  t('Strollers welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicycles')}),  t('Bicycles welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-steephills')}),  t('Steep hills') )
          ), 
          React.createElement("div", {className: "col-md-6"}, 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-uneven')}),  t('Wear sensible shoes (uneven terrain)') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-busy')}),  t('Busy sidewalks') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicyclesonly')}),  t('Bicycles only') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-lowlight')}),  t('Low light or nighttime') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-seniors')}),  t('Senior Friendly') )
          )
        )
      )
    );
  }
});

module.exports = AccessibleSelect;

},{"../functions/mixins.jsx":16}],8:[function(require,module,exports){
// TODO: Make 'intiatives' build as separate selectors
var DateSelect = React.createClass({displayName: 'DateSelect',
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: use a Date for the end time; duration is for historical purposes
    // but it's a bad design.
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    var defaultTime = '12:00';
    return {
      start: new Date((new Date).toLocaleDateString() + ' ' + defaultTime),
      duration: '1 Hour'
    };
  },
  setDay: function(date) {
    var startDate = this.state.start;

    startDate.setFullYear(date.getFullYear());
    startDate.setMonth(date.getMonth());
    startDate.setDate(date.getDate());

    this.setState({start: startDate});
  },
  /* @param Date time The current time of day
   * @param Int duration Number of minutes the walk lasts
   */
  setTime: function(time, duration) {
    var startDate = this.state.start;

    startDate.setHours(time.getHours());
    startDate.setMinutes(time.getMinutes());

    this.setState({start: startDate});
  },
  linkTime: function() {
    var _this = this;
    return {
      value: _this.state.start.getTime(),
      requestChange: function(value) {
        _this.setState({start: new Date(Number(value))});
      }
    };
  },
  // Push the date we built here to the linked state
  addDate: function() {
    var valueLink = this.props.valueLink;
    var value = valueLink.value || {};
    var slots = (value.slots || []).slice();
    slots.push({
      date: this.state.start.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
      time: this.state.start.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'}),
      duration: this.state.duration
    });

    value.slots = slots;
    valueLink.requestChange(value);
  },
  render: function() {
    var valueLink = this.props.valueLink;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("div", {className: "tab-pane", id: "time-and-date"}, 
        React.createElement("div", {className: "tab-content", id: "walkduration"}, 
          React.createElement("div", {className: "tab-pane hide", id: "time-and-date-select"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Set the Time and Date') )
            ), 
            React.createElement("legend", null,  t('Pick one of the following:') ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("ul", {className: "thumbnails", id: "block-select"}, 
                React.createElement("li", null, 
                  React.createElement("a", {href: "#time-and-date-all", 'data-toggle': "tab"}, 
                    React.createElement("div", {className: "thumbnail"}, 
                      React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-full.png'}), 
                      React.createElement("div", {className: "caption"}, 
                        React.createElement("div", {className: "text-center"}, 
                          React.createElement("h4", null,  t('By Request') )
                        ), 
                        React.createElement("p", null,  t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.') )
                      )
                    )
                  )
                ), 
                React.createElement("li", null, 
                  React.createElement("a", {href: "#time-and-date-set", 'data-toggle': "tab"}, 
                    React.createElement("div", {className: "thumbnail"}, 
                      React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-some.png'}), 
                      React.createElement("div", {className: "caption"}, 
                        React.createElement("div", {className: "text-center"}, 
                          React.createElement("h4", null,  t('Pick Your Date') )
                        ), 
                        React.createElement("p", null,  t('Set specific dates and times that this walk is happening.') )
                      )
                    )
                  )
                )
              )
            )
          ), 
          React.createElement("div", {className: "tab-pane active", id: "time-and-date-set"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Time and Date') ), 
              React.createElement("p", {className: "lead"},  t('Select the date and time your walk is happening.') )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement(DatePicker, {setDay: this.setDay})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "thumbnail"}, 
                  React.createElement("div", {className: "caption"}, 
                    React.createElement("h4", {className: "date-indicate-set"}, 
                      React.createElement("small", null,  t('Date selected'), ":"), 
                      this.state.start.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})
                    ), 
                    React.createElement("hr", null), 
                    React.createElement(TimePicker, {i18n: this.props.i18n, valueLinkDuration: this.linkState('duration'), valueLinkStart: this.linkTime()}), 
                    React.createElement("hr", null), 
                    React.createElement("button", {className: "btn btn-primary", id: "save-date-set", onClick: this.addDate},  t('Add Date') )
                  )
                )
              )
            ), 
            React.createElement("br", null), 
            React.createElement(TimeSetTable, {i18n: this.props.i18n, valueLink: valueLink}), 
            React.createElement("hr", null)
          ), 
          React.createElement("div", {className: "tab-pane hide", id: "time-and-date-all"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Time and Date') ), 
              React.createElement("p", {className: "lead"},  t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.') )
            ), 
            React.createElement("label", {className: "checkbox"}, 
              React.createElement("input", {type: "checkbox", name: "open"}),  t('Leave my availability open. Allow people to contact you to set up a walk.')
            ), 
            React.createElement("br", null), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "date-picker"})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "thumbnail"}, 
                  React.createElement("div", {className: "caption"}, 
                    React.createElement("div", {className: "date-select-group"}, 
                      React.createElement("small", null,  t('Date selected'), ":"), 
                      React.createElement("h4", {className: "date-indicate-all"}), 
                      React.createElement("hr", null)
                    ), 
                    React.createElement("label", {htmlFor: "walk-duration"},  t('Approximate Duration of Walk'), ":"), 
                    React.createElement("select", {name: "duration", id: "walk-duration", defaultValue: "1 Hour, 30 Minutes"}, 
                      React.createElement("option", {value: "30 Minutes"}, "30 Minutes"), 
                      React.createElement("option", {value: "1 Hour"}, "1 Hour"), 
                      React.createElement("option", {value: "1 Hour, 30 Minutes"}, "1 Hour, 30 Minutes"), 
                      React.createElement("option", {value: "2 Hours"}, "2 Hours"), 
                      React.createElement("option", {value: "2 Hours, 30 Minutes"}, "2 Hours, 30 Minutes"), 
                      React.createElement("option", {value: "3 Hours"}, "3 Hours"), 
                      React.createElement("option", {value: "3 Hours, 30 Minutes"}, "3 Hours, 30 Minutes")
                    ), 
                    React.createElement("div", {className: "date-select-group"}, 
                      React.createElement("hr", null), 
                      React.createElement("button", {className: "btn btn-primary", id: "save-date-all", onClick: this.addDate},  t('Add Date') )
                    )
                  )
                )
              )
            ), 
            React.createElement("br", null), 
            React.createElement(TimeOpenTable, null), 
            React.createElement("hr", null), 
            React.createElement("a", {href: "#time-and-date-select", 'data-toggle': "tab", className: "clear-date"},  t('Clear schedule and return to main Time and Date page') ), 
            React.createElement("hr", null)
          )
        )
      )
    );
  }
});

var DatePicker = React.createClass({displayName: 'DatePicker',
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).datepicker({
      onSelect: function(dateText) {
        this.props.setDay(new Date(dateText));
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "date-picker"})
    );
  }
});

var TimePicker = React.createClass({displayName: 'TimePicker',
  getInitialState: function() {
    return {startTimes: []};
  },

  // Date management is slow, so avoid rebuilding unless needed
  setStartTimes: function(start, step) {
    if (this.state.start !== start) {
      var firstTime = new Date(start + ' 00:00');
      var lastTime = new Date(start + ' 23:30');
      var startTimes = [];
      step = step || 1800000;

      for (var i = 0, time = firstTime; time.getTime() <= lastTime.getTime(); time.setTime(time.getTime() + step), i++) {
        startTimes.push({
          time: time.getTime(),
          string: time.toLocaleString({}, {hour: '2-digit', minute: '2-digit'})
        });
      }

      this.setState({
        start: start,
        startTimes: startTimes
      });
    }
  },

  componentWillUpdate: function() {
    var startDate = new Date(this.props.valueLinkStart.value);
    this.setStartTimes(startDate.toLocaleDateString());
  },

  componentWillMount: function() {
    this.componentWillUpdate();
  },

  render: function() {
    // Count walk times in 30 min increments
    var linkDuration = this.props.valueLinkDuration;
    var linkStart = this.props.valueLinkStart;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("div", {className: "time-picker"}, 
        React.createElement("label", {htmlFor: "walk-time"},  t('Start Time'), ":"), 
        React.createElement("select", {name: "start", id: "walk-start", valueLink: linkStart}, 
          this.state.startTimes.map(function(time, i) {
            return React.createElement("option", {key: i, value: time.time}, time.string);
          })
        ), 
        React.createElement("label", {htmlFor: "walk-time"},  t('Approximate Duration of Walk'), ":"), 
        React.createElement("select", {name: "duration", id: "walk-duration", valueLink: linkDuration}, 
          React.createElement("option", {value: "30 Minutes"}, "30 Minutes"), 
          React.createElement("option", {value: "1 Hour"}, "1 Hour"), 
          React.createElement("option", {value: "1 Hour, 30 Minutes"}, "1 Hour, 30 Minutes"), 
          React.createElement("option", {value: "2 Hours"}, "2 Hours"), 
          React.createElement("option", {value: "2 Hours, 30 Minutes"}, "2 Hours, 30 Minutes"), 
          React.createElement("option", {value: "3 Hours"}, "3 Hours"), 
          React.createElement("option", {value: "3 Hours, 30 Minutes"}, "3 Hours, 30 Minutes")
        )
      )
    );
  }
});

var TimeSetTable = React.createClass({displayName: 'TimeSetTable',
  removeSlot: function(i) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var slots = (value.slots || []).slice();

    slots.splice(i, 1);
    value.slots = slots;

    valueLink.requestChange(value);
  },
  render: function() {
    var slots = this.props.valueLink.value.slots || [];
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("table", {className: "table table-bordered table-hover", id: "date-list-all"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null,  t('Date') ), 
            React.createElement("th", null,  t('Start Time') ), 
            React.createElement("th", null)
          )
        ), 
        React.createElement("tbody", null, 
          slots.map(function(e, i) {
            return (
              React.createElement("tr", {key: i}, 
                React.createElement("td", null, e.date), 
                React.createElement("td", null, e.time), 
                React.createElement("td", null, React.createElement("a", {onClick: this.removeSlot.bind(this, i)}, React.createElement("i", {className: "fa fa-times-circle-o"}), " ", t('Remove')))
              )
              )
          }.bind(this))
        )
      )
    );
  }
});

// TODO: Once 'open' walk schedules are implemented on festivals
var TimeOpenTable = React.createClass({displayName: 'TimeOpenTable',
  render: function() {
    return (
      React.createElement("table", null)
    );
  }
});

module.exports = DateSelect;

},{}],9:[function(require,module,exports){
var ImageUpload = React.createClass({
  displayName: 'ImageUpload',

  removeImage: function(i) {
    var thumbnails = this.props.valueLink.value;
    thumbnails.splice(i, 1);
    this.props.valueLink.requestChange(thumbnails);
  },

  handleUpload: function(e) {
    var fd = new FormData();
    var _this = this;
    
    if (e.currentTarget.files) {
      // TODO: Update to support uploading multiple files at once
      // TODO: display a spinner w/ the local file as the BG until
      // it's fully uploaded
      // Load one file
      fd.append('Filedata', e.currentTarget.files[0]);
  
      // Form validation token, generated by concrete5
      fd.append('ccm_token', this.props.valt);

      $.ajax({
        url: CCM_TOOLS_PATH + '/files/importers/quick',
        type: 'POST',
        cache: false,
        data: fd,
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR) {
          var thumbnails = _this.props.valueLink.value;
          thumbnails.push(data);
          _this.props.valueLink.requestChange(thumbnails);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // TODO: display error message
        }
      });
    }
  },

  render: function() {
    var thumbnails = this.props.valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);
    // TODO: include an upload callback that loads the uploaded image locally,
    // instead of the one off the server
    // TODO: Implement server-side support for multiple thumbnails, then 
    // remove limit here
    return (
      React.createElement("form", {className: "upload-image"}, 
        React.createElement("label", {htmlFor: "walkphotos", id: "photo-tip"},  t('Upload a photo that best represents your walk.') ), 
        thumbnails.map(function(thumb, i) {
          // Grab just the name, so local files being uploaded have the same key as the hosted URL
          var filename = (thumb.url || '' + i).replace(/^.*[\\\/]/, '');
          return (
            React.createElement("div", {
              key: filename, 
              className: "thumbnail", 
              style: {backgroundImage: 'url(' + thumb.url + ')'}}, 
              React.createElement("a", {className: "remove", onClick: this.removeImage.bind(this, i)}, React.createElement("i", {className: "fa fa-times-circle"}))
            )
            );
        }, this), 
        (thumbnails.length < 1) ?
        React.createElement("div", {className: "thumbnail fileupload"}, 
          React.createElement("input", {className: "ccm-al-upload-single-file", type: "file", onChange: this.handleUpload}), 
          React.createElement("i", {className: "fa fa-camera-retro fa-5x"}), 
          React.createElement("span", {className: "fileupload-new"},  t('Click to upload an image') )
        ) : null
      )
    );
  }
});

module.exports = ImageUpload;

},{}],10:[function(require,module,exports){
'use strict';

var Helper = require('../functions/helpers.jsx');

var MapBuilder = React.createClass({displayName: 'MapBuilder',
  getDefaultProps: function () {
    return {
      // Map config startup defaults
      initialZoom: 15,
    };
  },

  // State for this component should only track the map editor
  getInitialState: function() {
    return {
      // The 'mode' we're in: 'addpoint', 'addroute', or false
      editMode: false,
      map: null,
      markers: [],
      route: null,
      infowindow: new google.maps.InfoWindow
    };
  },

  componentDidMount: function() {
    var _this = this,
    valueLink = this.props.valueLink,
    mapNode = this.refs.gmap.getDOMNode(),
    mapOptions = {
      center: new google.maps.LatLng(this.props.city.lat, this.props.city.lng),
      zoom: this.props.initialZoom,
      scrollwheel: false,
      rotateControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
      }
    },
    map = new google.maps.Map(mapNode, mapOptions),
    markers = this.state.markers,
    route = this.state.route;

    this.setState({map: map}, function() {
      // Draw the route
      if (valueLink.value) {
        markers = valueLink.value.markers.map(function(marker) {
          return this.buildMarker(marker);
        }.bind(this));

        route = this.buildRoute(valueLink.value.route);
      }

      // Set marker/route adding
      google.maps.event.addListener(map, 'click', function(ev) {
        switch (_this.state.editMode) {
          case 'addpoint':
            var markers = _this.state.markers;
            var marker = _this.buildMarker(ev.latLng);
            markers.push(marker);
            _this.setState({markers: markers}, function() {
              _this.showInfoWindow(marker);
            }); 
          break;
        }
      });
      // Map won't size properly on a hidden tab, so refresh on tab shown
      // FIXME: this $() selector is unbecoming of a React app
      $('a[href="#route"]').on('shown.bs.tab', function(e) {
        this.boundMapByWalk();
      }.bind(this));

      this.setState({markers: markers, route: route});
    }.bind(this));
  },

  // Make the map fit the markers in this walk
  boundMapByWalk: function() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    google.maps.event.trigger(this.state.map, 'resize');
    if (this.state.markers.length) {
      for (var i = 0, len = this.state.markers.length; i < len; i++) {
        bounds.extend(this.state.markers[i].getPosition());
      }

      this.state.map.fitBounds(bounds);
    }
  },

  // Map parameters
  stopMarker: {
    url: CCM_THEME_PATH + '/images/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  },
  
  // Map related functions
  // Build gmaps Marker object from base data
  buildMarker: function(markObj) {
    var marker;
    var _this = this;
    var position;
    var map = this.state.map;

    // See which type we passed in
    if (markObj instanceof google.maps.LatLng) {
      position = markObj;
    } else {
      position = new google.maps.LatLng(markObj.lat, markObj.lng);
    }
    marker = new google.maps.Marker({
      position: position,
      animation: google.maps.Animation.DROP,
      draggable: true,
      title: JSON.stringify({title: markObj.title, description: markObj.description}),
      style: 'stop',
      map: map,
      icon: this.stopMarker
    });
    
    google.maps.event.addListener(marker, 'click', function(ev) {
      _this.showInfoWindow(this)
    });

    return marker;
  },

  /**
   * Show the info box for editing this marker
   *
   * @param google.maps.Marker marker
   */
  showInfoWindow: function(marker) {
    var _this = this;
    var infoDOM = document.createElement('div');

    React.render(
      React.createElement(WalkInfoWindow, {marker: marker, deleteMarker: this.deleteMarker.bind(this, marker), refresh: this.setState.bind(this, {})}),
      infoDOM
    );
    
    this.state.map.panTo(marker.getPosition());

    this.state.infowindow.setContent(infoDOM);

    this.state.infowindow.open(this.state.map, marker);

  },

  buildRoute: function(routeArray) {
    var map = this.state.map;

    var poly = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: false,
      map: map
    });

    if (routeArray.length > 0) {
      poly.setPath(routeArray.map(function(point) {
        return new google.maps.LatLng(point.lat, point.lng);
      }));
    }

    return poly;
  },

  /**
   * @param google.maps.Marker marker
   */
  deleteMarker: function(marker) {
    var markers = this.state.markers;

    // Clear marker from map
    marker.setMap(null);

    // Remove reference in state
    markers.splice(markers.indexOf(marker), 1);

    this.setState({markers: markers});
  },

  changeMarkerOrder: function(from, to) {
    // Remove the marker, then insert into new position
    var markers = this.state.markers.slice();
    markers.splice(to, 0, markers.splice(from, 1)[0]);
    this.setState({markers: markers});
  },

  // Button Actions
  toggleAddPoint: function() {
    this.setState({editMode: 'addpoint'});
  },

  toggleAddRoute: function() {
    this.setState({editMode: 'addroute'});
  },

  clearRoute: function() {
    this.state.route.setPath([]);
    this.setState({editMode: false});
  },

  /*
    // If this marker isn't passed with a title, prompt for info
    if (!markObj.lat) {
      this.state.infowindow.open(this.state.map, marker);
    }

    this.setState({markers: this.state.markers.concat([marker])});
  },
  */

  // Build a version of state appropriate for persistence
  getStateSimple: function() {
    var markers = this.state.markers.map(function(marker) {
      var titleObj = JSON.parse(marker.title);
      return {
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        title: titleObj.title,
        description: titleObj.description,
        style: 'stop'
      };
    });
    var route = [];
    if (this.state.route) {
      route = this.state.route.getPath().getArray().map(function(point) {
        return {
          lat: point.lat(),
          lng: point.lng()
        };
      });
    }

    return {
      markers: markers,
      route: route
    };
  },

  render: function() {
    var walkStops;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    if (this.state.markers && this.state.markers.length) {
      // This 'key' is to force the component to not rebuild
      walkStops = [
        React.createElement("h3", {key: 'stops'}, t('Walk Stops')),
        React.createElement(WalkStopTable, {ref: "walkStopTable", i18n: this.props.i18n, key: 1, markers: this.state.markers, deleteMarker: this.deleteMarker, changeMarkerOrder: this.changeMarkerOrder, showInfoWindow: this.showInfoWindow})
      ];
    }
    
    return (
      React.createElement("div", {className: "tab-pane", id: "route"}, 
        React.createElement("div", {className: "alert alert-error"}, React.createElement("strong", null, "Map buttons currently offline."), " Sorry for the inconvenience - the buttons to add to your map aren't working. Please check back tomorrow."), 
        React.createElement("div", {className: "page-header", 'data-section': "route"}, 
          React.createElement("h1", null,  t('Share Your Route') )
        ), 
        React.createElement("div", {className: "alert alert-info"},  t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') ), 
        React.createElement("div", {id: "route-help-panel"}, 
          React.createElement("a", {className: "accordion-toggle collapsed", 'data-toggle': "collapse", 'data-parent': "#route-menu", href: "#route-menu"}, React.createElement("h2", {className: "lead"},  t('Need help building your route?') )), 
          React.createElement("ol", {id: "route-menu", className: "collapse", style: {height: 0}}, 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Set a Meeting Place') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click "Meeting Place" to add a pinpoint on the map') ), 
                React.createElement("li", null,  t('Click and drag it into position') ), 
                React.createElement("li", null,  t('Fill out the form fields and press Save Meeting Place') )
              )
            ), 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Add Stops') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click "Add Stop" to add a stop on the map') ), 
                React.createElement("li", null,  t('Click and drag it into position') ), 
                React.createElement("li", null,  t('Fill out the form fields and press Save Stop') ), 
                React.createElement("li", null,  t('Repeat to add more stops') )
              )
            ), 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Add Route') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click Add Route') ), 
                React.createElement("li", null,  t('A point will appear on your meeting place, now click on each of the stops that flow to connect them.') ), 
                React.createElement("li", null,  t('Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.') ), 
                React.createElement("li", null,  t('Click Save Route') )
              ), 
              React.createElement("p", null, 
                 t('If you want to delete your route to start over, click '), React.createElement("a", {href: "", className: "clear-route"},  t('Clear Route') ), ". ",  t('Your Stops will not be deleted') 
              )
            )
          )
        ), 
        React.createElement("div", {id: "map-control-bar"}, 
          React.createElement("button", {className: (this.state.editMode === 'addpoint') ? 'active' : '', ref: "addpoint", onClick: this.toggleAddPoint}, React.createElement("i", {className: "fa fa-map-marker"}),  t('Add Stop') ), 
          React.createElement("button", {className: (this.state.editMode === 'addroute') ? 'active' : '', ref: "addroute", onClick: this.toggleAddRoute}, React.createElement("i", {className: "fa fa-arrows"}),  t('Add Route') ), 
          React.createElement("button", {ref: "clearroute", onClick: this.clearRoute}, React.createElement("i", {className: "fa fa-eraser"}),  t('Clear Route') )
        ), 
        React.createElement("div", {className: "map-notifications"}), 
        React.createElement("div", {id: "map-canvas", ref: "gmap"}), 
        walkStops, 
        React.createElement("hr", null), 
        React.createElement("br", null), 
        React.createElement("br", null)
      )
    );
  }
});

var WalkStopTable = React.createClass({displayName: 'WalkStopTable',
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).sortable({
      items: 'tbody tr',
      update: function(event, ui) {
        this.props.changeMarkerOrder(ui.item.data('position'), ui.item.index());
      }.bind(this)
    });
  },
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("table", {ref: "routeStops", className: "table table-bordered table-hover"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null,  t('Title') ), 
            React.createElement("th", null,  t('Description') ), 
            React.createElement("th", null)
          )
        ), 
        React.createElement("tbody", null, 
          this.props.markers.map(function(marker, i) {
            var titleObj = JSON.parse(marker.title);
            var showInfoWindow = this.props.showInfoWindow.bind(this, marker);
            return (
              React.createElement("tr", {'data-position': i, key: 'marker' + i}, 
                React.createElement("td", {onClick: showInfoWindow}, titleObj.title), 
                React.createElement("td", {onClick: showInfoWindow}, titleObj.description), 
                React.createElement("td", null, React.createElement("a", {className: "delete-stop", onClick: this.props.deleteMarker.bind(this, marker)}, React.createElement("i", {className: "fa fa-times-circle-o"})))
              )
              );
          }.bind(this))
        )
      )
    );
  }
});

var WalkInfoWindow = React.createClass({displayName: 'WalkInfoWindow',
  getInitialState: function() {
    return {
      marker: null
    };
  },
  componentWillMount: function() {
    this.setState({
      marker: this.props.marker
    });
  },
  setMarkerContent: function(ev) {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());
    if (ev.target.classList.contains('marker-title')) {
      markerContent.title = ev.target.value;
    } else if (ev.target.classList.contains('marker-description')) {
      markerContent.description = ev.target.value;
    }
    marker.setTitle(JSON.stringify(markerContent));
    this.setState({marker: marker});
    this.props.refresh();
  },
  render: function() {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());

    return (
      React.createElement("div", {className: "stop-form"}, 
        React.createElement("input", {type: "text", onChange: this.setMarkerContent, value: markerContent.title, placeholder: "Title of this stop", className: "marker-title"}), 
        React.createElement("textarea", {className: "marker-description box-sizing", onChange: this.setMarkerContent, placeholder: "Description of this stop", value: markerContent.description}), 
        React.createElement("a", {onClick: this.props.deleteMarker}, React.createElement("i", {className: "fa fa-trash-o"}))
      )
    );
  }
});

module.exports = MapBuilder;

},{"../functions/helpers.jsx":15}],11:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var TeamBuilder = React.createClass({
  displayName: 'TeamBuilder',

  mixins: [mixins.linkedParentState],

  handleTeamMemberChange: function(propname, memberValue, id) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    value[id][propname] = memberValue;
    valueLink.requestChange(value);
  },
  addLeader: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'leader', "name-first":'', "name-last":'', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: ''});
    valueLink.requestChange(team);
  },
  addOrganizer: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'organizer', "name-first":'', "name-last":'', institution: '', website: ''});
    valueLink.requestChange(team);
  },
  addCommunityVoice: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'community', "name-first":'', "name-last":'', bio: '', twitter: '', facebook: '', website: ''});
    valueLink.requestChange(team);
  },
  addVolunteer: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'volunteer', "name-first":'', "name-last":'', role: '', website: ''});
    valueLink.requestChange(team);
  },
  // Set the member at that specific index
  render: function() {
    // If there's no 'you', create one as the current user
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);
    
    // Loop through all the users and render the appropriate user type
    var users = value.map(function(user, i) {
      // Use empty strings for unset/false
      user.phone = user.phone || '';
      if (user.type === 'you') {
        return React.createElement(TeamOwner, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'leader') {
        return React.createElement(TeamLeader, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'organizer') {
        return React.createElement(TeamOrganizer, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'community') {
        return React.createElement(TeamCommunityVoice, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'volunteer') {
        return React.createElement(TeamVolunteer, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      }
    }, this);

    return (
      React.createElement("div", {className: "tab-pane", id: "team"}, 
        React.createElement("div", {className: "page-header", 'data-section': "team"}, 
          React.createElement("h1", null,  t('Build Your Team') )
        ), 
        users, 
        React.createElement("div", {className: "thumbnail team-member", id: "add-member"}, 
          React.createElement("h2", null,  t('Who else is involved with this walk?') ), 
          React.createElement("h3", {className: "lead"},  t('Click to add team members to your walk'), " (",  t('Optional'), ")"), 
          React.createElement("div", {className: "team-set"}, 
            React.createElement("div", {className: "team-row"}, 
              React.createElement("section", {className: "new-member", id: "new-walkleader", title: "Add New Walk Leader", onClick: this.addLeader}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Walk Leader') ), 
                React.createElement("p", null,  t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.') )
              ), 
              React.createElement("section", {className: "new-member", id: "new-walkorganizer", title: "Add New Walk Organizer", onClick: this.addOrganizer}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Walk Organizer') ), 
                React.createElement("p", null,  t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.') )
              )
            ), 
            React.createElement("div", {className: "team-row"}, 
              React.createElement("section", {className: "new-member", id: "new-communityvoice", title: "Add A Community Voice", onClick: this.addCommunityVoice}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Community Voice') ), 
                React.createElement("p", null,  t('A community member with stories and/or personal experiences to share.') )
              ), 
              React.createElement("section", {className: "new-member", id: "new-othermember", title: "Add another helper to your walk", onClick: this.addVolunteer}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Volunteers') ), 
                React.createElement("p", null,  t('Other people who are helping to make your walk happen.') )
              )
            )
          )
        )
      )
    );
  }
});


var TeamOwner = React.createClass({displayName: 'TeamOwner',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "team-member thumbnail useredited", id: "walk-leader-me"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('You') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "name"},  t('Name') ), 
              React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
              React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
            ), 

            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "role"},  t('Role') ), 
              React.createElement("select", {id: "role", valueLink: this.linkProp('role')}, 
                React.createElement("option", {defaultValue: "walk-leader"},  t('Walk Leader') ), 
                React.createElement("option", {defaultValue: "co-walk-leader"},  t('Co-Walk Leader') ), 
                React.createElement("option", {defaultValue: "walk-organizer"},  t('Walk Organizer') )
              )
            ), 
            React.createElement("div", {className: "item hide", id: "primary-walkleader-select"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", checkLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
            ), 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "bio"},  t('Introduce yourself') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We recommend keeping your bio under 60 words')
              ), 
              React.createElement("textarea", {id: "bio", rows: "6", valueLink: this.linkProp('bio')})
            ), 

            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6 required"}, 
                React.createElement("label", {htmlFor: "you-email"}, React.createElement("i", {className: "fa fa-envelope"}), " ", t('Email')), 
                React.createElement("input", {type: "email", id: "you-email", placeholder: "", valueLink: this.linkProp('email')})
              ), 

              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "leader-twitter"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, "@"), 
                  React.createElement("input", {className: "col-md-12", id: "leader-twitter", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                )
              )
            ), 

            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}), " ", t('Website')), 
                React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
              )
            ), 
            React.createElement("hr", null), 
            React.createElement("div", {className: "private"}, 
              React.createElement("h4", null,  t('We\'ll keep this part private') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6 tel required"}, 
                  React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                  React.createElement("input", {type: "tel", maxLength: "18", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
                )
              )
            )
          )
        )
      )
    );
  }
});

var TeamLeader = React.createClass({displayName: 'TeamLeader',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member walk-leader clearfix", id: "walk-leader-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('Walk Leader') ), 
          React.createElement("div", {id: "walkleader"}, 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "name"},  t('Name') ), 
              React.createElement("div", {className: "item"}, 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              )
            ), 
            React.createElement("div", {className: "item", id: "primary-walkleader-select"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", valueLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
            ), 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "bio"},  t('Introduce the walk leader') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We recommend keeping the bio under 60 words')
              ), 
              React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                React.createElement("div", {className: "input-prepend"}, 
                  React.createElement("span", {className: "add-on"}, "@"), 
                  React.createElement("input", {id: "prependedInput", className: "col-md-12", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                )
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
              )
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
              )
            ), 
            React.createElement("hr", null), 
            React.createElement("h4", null,  t('Private') ), 
            React.createElement("div", {className: "alert alert-info"}, 
               t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.') 
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6 required"}, 
                React.createElement("label", {htmlFor: "email"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Email') ), 
                React.createElement("input", {type: "email", id: "email", placeholder: "Email", valueLink: this.linkProp('email')})
              ), 
              React.createElement("div", {className: "col-md-6 tel"}, 
                React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                React.createElement("input", {type: "tel", maxLength: "16", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamOrganizer = React.createClass({displayName: 'TeamOrganizer',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member walk-organizer", id: "walk-organizer-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('Walk Organizer') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 
              React.createElement("label", {htmlFor: "affiliation"},  t('Affilated Institution'), " (",  t('Optional'), ")"), 
              React.createElement("input", {type: "text", id: "name", placeholder: "e.g. City of Toronto", valueLink: this.linkProp('institution')}), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamCommunityVoice = React.createClass({displayName: 'TeamCommunityVoice',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member community-voice", id: "community-voice-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", {id: "community-voice"},  t('Community Voice') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 
              React.createElement("div", {className: "item"}, 
                React.createElement("label", {htmlFor: "bio"},  t('Tell everyone about this person') ), 
                React.createElement("div", {className: "alert alert-info"}, 
                   t('We recommend keeping the bio under 60 words')
                ), 
                React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                  React.createElement("div", {className: "input-prepend"}, 
                    React.createElement("span", {className: "add-on"}, "@"), 
                    React.createElement("input", {className: "col-md-12", id: "prependedInput", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                  )
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                  React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
                )
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamVolunteer = React.createClass({displayName: 'TeamVolunteer',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member othermember", id: "othermember-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", {id: "othermember"},  t('Volunteers') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 

              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "role"},  t('Role') ), 
                React.createElement("input", {type: "text", id: "role", valueLink: this.linkProp('role')})
              ), 

              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )

            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-othermember"},  t('Remove Team Member') )
        )
      )
    )
  }
});

module.exports = TeamBuilder;

},{"../functions/mixins.jsx":16}],12:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var ThemeSelect = React.createClass({displayName: 'ThemeSelect',
  mixins: [mixins.linkedParentState],
  maxChecked: 3,
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    // TODO: Don't select themes for NYC
    return (
      React.createElement("fieldset", {id: "theme-select"}, 
        React.createElement("legend", {className: "required-legend"},  t('Themes') ), 
        React.createElement("div", {className: "alert alert-info"}, 
           t('Pick between %d and %d boxes.', 1, this.maxChecked)
        ), 
        React.createElement("div", {className: "item"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Community') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-activist')}),  t('Activism') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-truecitizen')}),  t('Citizenry') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-goodneighbour')}),  t('Community') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-writer')}),  t('Storytelling') )
          ), 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('City-building') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-architecturalenthusiast')}),  t('Architecture') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-aesthete')}),  t('Design') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-suburbanexplorer')}),  t('Suburbs') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-moversandshakers')}),  t('Transportation') )
          )
        ), 
        React.createElement("div", {className: "item"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Society') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-gender')}),  t('Gender') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-health')}),  t('Health') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-historybuff')}),  t('Heritage') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-nativeissues')}),  t('Native Issues') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-religion')}),  t('Religion') )
          ), 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Expression') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-artist')}),  t('Art') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-film')}),  t('Film') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-bookworm')}),  t('Literature') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-music')}),  t('Music') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-play')}),  t('Play') )
          )
        ), 
        React.createElement("div", {className: "item"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('The Natural World') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-petlover')}),  t('Animals') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-greenthumb')}),  t('Gardening') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-naturelover')}),  t('Nature') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-water')}),  t('Water') )
          ), 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Modernity') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-international')}),  t('International Issues') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-military')}),  t('Military') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-commerce')}),  t('Commerce') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-nightowl')}),  t('Night Life') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-techie')}),  t('Technology') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-sports')}),  t('Sports') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-foodie')}),  t('Food') )
          )
        )
      )
    );
  }
});

module.exports = ThemeSelect;

},{"../functions/mixins.jsx":16}],13:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var WardSelect = React.createClass({displayName: 'WardSelect',
  mixins: [mixins.linkedParentState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    var wards = this.props.wards;
    if (wards && this.props.valueLink) {
      return (
        React.createElement("fieldset", {id: "wards"}, 
          React.createElement("legend", null,  t('Sub-locality') ), 
          React.createElement("div", {className: "item"}, 
            React.createElement("div", {className: "alert alert-info"},  t('Choose a specific neighbourhood or area where your walk will take place.') ), 
            React.createElement("select", {id: "ward", name: "ward", valueLink: this.props.valueLink}, 
              React.createElement("option", {value: ""}, "Choose a region"), 
              wards.map(function(e, i) { return React.createElement("option", {key: i, value: e.value}, e.value); })
            )
          )
        )
      );
    } else {
      return (
        React.createElement("fieldset", {id: "wards"})
      );
    }
  }
});

module.exports = WardSelect;

},{"../functions/mixins.jsx":16}],14:[function(require,module,exports){
/**
 * WalkMap
 * constructor
 *
 * @param object mapData Input data with {route, markers}
 * @param object DOMElement mapCanvas Target to render the map to
 *
 */
var WalkMap = function(mapData, mapCanvas) {
  // Default to #map-canvas
  this.mapCanvas = mapCanvas;

  // Initialize the map on our canvas
  this.map = new google.maps.Map(mapCanvas, this.mapOptions);

  // Load markers and build as google.maps.Marker
  this.markers = this.buildMarkers(this.buildArray(mapData.markers));
  this.route = this.buildRoute(this.buildArray(mapData.route));

  // Style Map
  this.map.mapTypes.set('map_style', this.styledMap);
  this.map.setMapTypeId('map_style');
  // TODO: Replace hard-coded selectors with ReactJS
  document.querySelector('.walk-stops').style.display = 'block';

  // Center our map after first building it
  this.centerMap();

  // Make the text menu with walk stops linked to the map
  this.addWalkStopMenuEvents();
};

Object.defineProperties(WalkMap.prototype, {
  /* @prop Array Markers on the map */
  markers: {
    value: [],
    writable : true
  },

  /* @prop Array Route the map follows */
  route: {
    value: [],
    writable: true
  },

  /* @prop DOMElement Canvas we'll render to */
  mapCanvas: {
    value: null,
    writable: true
  },

  /* @prop DOMElement of the list of stops you can select */
  stopList: {
    value: null,
    writable: true
  },

  // Static map display options
  mapOptions: {
    value: {
      zoom: 16,
      scrollwheel: false,
      zoomControl: true,
      disableDefaultUI: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    }
  },

  /**
   * styledMap
   * The very verbose styling information for this map
   *
   * @type      StyledMapType
   * @protected
   */
  styledMap: {
    value: new google.maps.StyledMapType(
      [{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        { "saturation": -100 }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "saturation": -100 },
        { "lightness": 36 }
      ]
    },{
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "on" },
        { "saturation": 37 }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "saturation": -100 }
      ]
    }],
    {
      name: "Styled Map"
    }),
    writable: false,
    enumerable: true,
    configurable: true
  },

  // Map Markers
  mapMarker: {value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker.png')},
  mapMarkerActive: {value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker-active.png')},

  // google map object
  map: {
    value: null, 
    writable: true
  },

  // Path of the walk
  walkPath: {
    value: {},
    writable: true
  },

  // The information in the window that pops up
  infobox: {
    value: new InfoBox({
      content: document.getElementById('infobox'),
      maxWidth: 150,
      pixelOffset: new google.maps.Size(-3, -25),
      alignBottom: true,
      boxStyle: {
        background: '#fff',
        width: '280px',
        padding: '10px',
        border: '1px solid #eee',
      },
      closeBoxMargin: '-22px -22px 2px -8px',
      closeBoxURL: CCM_THEME_PATH + '/images/map-close.png',
      infoBoxClearance: new google.maps.Size(20, 20)
    })
  },

  // @param Function Pop up the info box
  showInfoBox: {
    value: function(marker, i, markerContent) {
      // Set active icon + menu to active, others inactive
      this.markers.forEach(function(mk) {
        if (mk === marker) {
          marker.setIcon(this.mapMarkerActive);
          this.selectWalkStopMenuItem(i);
        } else {
          mk.setIcon(this.mapMarker);
        }
      }.bind(this));

      this.map.panTo(marker.getPosition());

      // FIXME: is there a smarter way to hold both a name and description in
      // the title? We were using a separate array to store them before, which
      // is even worse, but JSON encoding the title is weird. gmaps won't let 
      // it be anything but a string.
      this.infobox.setContent(React.renderToStaticMarkup(
        React.createElement("span", null, 
          React.createElement("h4", null, 
            JSON.parse(this.markers[i].getTitle()).name
          ), 
          React.createElement("p", null, 
            JSON.parse(this.markers[i].getTitle()).description
          ), 
          markerContent
        )
      ));
      this.infobox.open(this.map, marker);

      [].forEach.call(document.querySelectorAll('.walk-stops'), function(stop) {
        if (stop.dataset.key == i) {
          stop.classList.add('active');
        } else {
          stop.classList.remove('active');
        }
      });
    }
  },

  /**
   * Data-loading methods
   */
  /**
   * The old JSON had objects used in many places where arrays made more sense
   * This method is for backwards-compatibility to ensure old walks still load
   * @param (Array|Object) collection Either an array or a number-mapped object
   */
  buildArray: {
    value: function(collection) {
      // Check if it's already an array, and if not it's an obj
      if (Array.isArray(collection)) {
        return collection.slice();
      } else {
        var newArray = [];
        for (var i in collection) {
          newArray[i] = collection[i];
        }
        return newArray;
      }
    }
  },

  // Build you google markers
  // @param Array markers of [{lat, lng}]
  // @return Array [google.maps.Marker]
  buildMarkers: {
    value: function(markers) {
      return markers.map(function(marker, i) {
        var _this = this;
        var gMarker = new google.maps.Marker({
          position: new google.maps.LatLng(marker.lat, marker.lng),
          map: this.map,
          icon: this.mapMarker,
          title: JSON.stringify({
            name: marker.title,
            description: marker.description
          }),
          id: i
        });

        google.maps.event.addListener(gMarker, 'click', function(ev) {
          _this.showInfoBox(this, i)
        });

        return gMarker;
      }.bind(this));
    }
  },

  // Build your google path
  // @param Array route points [{lat, lng}]
  // @return google.maps.PolyLine
  buildRoute: {
    value: function(route) {
      // Draw the path based on the route
      var walkPath = new google.maps.Polyline({
        path: route.map(function(rp) {
          return new google.maps.LatLng(rp.lat, rp.lng);
        }),
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4 
      });

      walkPath.setMap(this.map);

      return walkPath;
    }
  },

  // Bind click handlers to our markers
  addWalkStopMenuEvents: {
    value: function() {
      var _this = this;
      [].forEach.call(document.querySelectorAll('.walk-stop'), function(stopEl, i) {
        stopEl.addEventListener('click', function() {
          if (this.dataset.key == i) {
            google.maps.event.trigger(_this.markers[i], 'click');
          } 
        });
      });
    }
  },

  /**
   * Map formatting
   */
  // Center the map based on its contents
  centerMap: {
    value: function() {
      var bounds = new google.maps.LatLngBounds();
      var totalPlotted = 0;
      this.markers.forEach(function(marker) {
        bounds.extend(marker.getPosition());
        ++totalPlotted;
      });
      this.route.getPath().getArray().forEach(function(pathMark) {
        bounds.extend(pathMark);
        ++totalPlotted;
      });
      if (totalPlotted) {
        this.map.fitBounds(bounds);
      }
      // Zoom out a bit from the centered/zoomed setting
      google.maps.event.addListenerOnce(this.map, 'zoom_changed', function() {
        var oldZoom = this.map.getZoom();
        this.map.setZoom(Math.min(16, oldZoom));
      }.bind(this));
    }
  },

  selectWalkStopMenuItem: {
    value: function(i) {
      // Set the marker menu active as well
      [].forEach.call(document.querySelectorAll('.walk-stop'), function(stopEl) {
        if (stopEl.dataset.key == i) {
          stopEl.classList.add('active');
          document.querySelector('.walk-stops-meta').scrollTop = stopEl.offsetTop - 10;
        } else {
          stopEl.classList.remove('active');
        }
      });
    }
  },
});

module.exports = WalkMap;

},{}],15:[function(require,module,exports){
/* 
 * Helpers for building React pages with
 *
 * Try to only put things in here after exhausting all possible other options,
 * and review this file periodically to see what can be removed as new features
 * are added to React.
 */

// Render a JSX fragment into a <span> wrapper. Helpful when an API takes a Node
// as the input, e.g. Google Maps
exports.renderAsNode = function(reactElement) {
  var returnEl = document.createElement('span');
  React.render(returnEl, reactElement);
  return returnEl;
};

// Not a generalized Object => Array, rather a convertor to change
// {0: 'a', 1: 'b', 2: 'c'} into ['a','b','c']. Use only to convert
// obsolete encodings of walks into proper arrays
exports.objectToArray = function(obj) {
  var destination = [];

  // Assign numeric index in object as array index
  for (var i in obj) {
    destination[i] = obj[i];
  }

  // Needed to remove any empty elements, e.g. if input obj counts from 1 not 0
  return destination.filter(function(n) { return n !== undefined; });
};


},{}],16:[function(require,module,exports){
// Link this component's state to the linkState() parent
module.exports.linkedParentState = {
  linkParentState: function(propname) {
    var valueLink = this.props.valueLink;
    var parentState = valueLink.value;

    return {
      value: parentState[propname],
      requestChange: function(value) {
        parentState[propname] = value;
        valueLink.requestChange(parentState);
      }
    };
  }
};

// Link this component's state to the linkState() parent
module.exports.linkedTeamMemberState = {
  linkProp: function(propname) {
    var onChange = this.props.onChange;
    var key = this._currentElement.key;
    return {
      value: this.props.value[propname],
      requestChange: function(value) {
        onChange(propname, value, key);
      }
    };
  },
};



},{}],17:[function(require,module,exports){
/**
 * i18n translation class
 *
 * @param object translations A map of i18next-format translations
 */

// sprintf tokenizer
function sprintf(str) {
  var args = Array.prototype.slice.call(arguments);
  return args.shift().replace(/%(s|d)/g, function(){
    return args.shift();
  });
}

function I18nTranslator(translations) {
  if (translations) {
    this.translations = translations;
  }
}
// Prototype methods
Object.defineProperties(I18nTranslator.prototype, {
  // The big translations map
  translations: {
    value: {},
    writable: true,
    enumerable: true
  },

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate: {
    value: function(str) {
      var translated = Array.prototype.slice.call(arguments);
      translated[0] = (this.translations[str] || [str])[0];
      return sprintf.apply(this, translated);
    }
  },

  /**
   * Plural translations
   * Different languages make different numbers plural (eg is 0 plural or not)
   * Translations should provide conjugation only, and make no assumptions about
   * the nature of the data.
   *
   * @param string singular
   * @param string plural
   * @param int count
   * @return string
   * @example t2('%d ox', '%d oxen', numberOfOxen)
   */
  translatePlural: {
    value: function(singular, plural, count) {
      // The key for the plural is not the plural value, but singular_plural
      var translated = Array.prototype.slice.call(arguments);
      // TODO Use the plural rules for the language, not just English
      var isPlural = (count !== 1) ? 1 : 0;
      translated[0] = (this.translations[singular + '_' + plural] ||
                       [singular, plural])[isPlural];
      return sprintf.apply(this, translated);
    }
  },

  /**
  * Translate with context
  * Some words mean different things based on context, so
  * use tc to give context.
  * 
  * @param string context
  * @param string str Sprintf-formatted string
  * @return string
  * @example tc('make or manufacture', 'produce'); tc('food', 'produce');
  */
  translateContext: {
    value: function(context, str) {
      // Grab the values to apply to the string
      var args = Array.prototype.slice.call(arguments, 2);
      // i18n lib makes context keys simply an underscore between them
      var key = context + '_' + str;
      sprintf.apply(this, [context, args]);
    }
  }
});

module.exports = I18nTranslator;

},{}],18:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * CityPageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var CityPageView = function(element) {
  PageView.call(this, element);
  this._cards = this._element[0].querySelectorAll(".walk");
  this._previewCards();
  this._data = JanesWalk.walks;
  this._resetSelectElements();
  this._addCreateWalkEvent();
  this._addFilterEvents();
  this._setThemeCounts();
  this._captureHash();
  //        this._setupText2DonateInterstitials();
  this._addLinkListeners();
  $('.walks-list .tag').tooltip();
};
CityPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _accessibility
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _accessibility: {value: null, writable: true},

  /**
   * _cards
   * 
   * @protected
   * @var       NodeList|null (default: null)
   */
  _cards: {value: null, writable: true},

  /**
   * _data
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _data: {value: null, writable: true},

  /**
   * _date
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _date: {value: null, writable: true},

  /**
   * _initiative
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _initiative: {value: null, writable: true},

  /**
   * _theme
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _theme: {value: null, writable: true},

  /**
   * _ward
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _ward: {value: null, writable: true},

  /**
   * _getFacebookDialogDonateObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogDonateObj: {
    value: function() {
      return {
        link: 'http://janeswalk.org',
        // picture: 'http://janeswalk.org',
        name: 'Jane\'s Walk'
      };
    }
  },

  /**
   * _previewCards
   * Copy a random set of the full walk list into the preview area.
   * Currently hard-codes a maximum preview size of 9 cards.
   *
   * @protected
   * @return void
   */
  _previewCards: {
    value: function() {
      var shuffledDeck = Array.prototype.slice.call(this._cards).sort( function() { return 0.5 - Math.random(); } ),
      previewNode = document.querySelector(".ccm-block-page-list-walk-filters .walk-preview");

      for(var i = 0, len = Math.min(shuffledDeck.length, 9); i < len; i++) {
        var card = shuffledDeck[i].cloneNode(true);
        previewNode.appendChild(card);
      }
    }
  },

  /**
   * _addLinkListeners
   * Listen on 'show all' walks
   *
   * @protected
   * @return void
   */
  _addLinkListeners: {
    value: function() {
      var _this = this;
      var showAll = document.querySelector("a.see-all");
      var fullMode = function() {
        if (showAll) {
          document.querySelector('.ccm-block-page-list-walk-filters').classList.add('filtering');
          showAll.parentNode.removeChild(showAll);
        }
        showAll = document.querySelector('a.see-all');
      }
      if(showAll) {
        showAll.addEventListener("click", fullMode);
      }
      var toolTips = document.querySelectorAll('.walk .tags > li');
      Array.prototype.forEach.call(toolTips, function(tooltip) {
        tooltip.addEventListener('click', function(event) {
          event.preventDefault();
          fullMode();
          _this._theme = this.dataset.theme;
          _this._filterCards();
        });
      });
    }
  },

  /**
   * _setupText2DonateInterstitials
   * 
   * @protected
   * @return    void
   */
  _setupText2DonateInterstitials: {
    value: function() {
      var enabled = false,
      _this = this,
      isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
      hasSeenDonateInterstitial,
      closeCallback,
      url,
      link;
      // Catfish events
      this._element.find('a.closeCatfishCta').click(function(event) {
        event.preventDefault();
        _this._element.find('.catfish').hide();

        // Track the closure
        jQuery.cookie(
          'hasSeenDonateCatfish',
          '1',
          {
            path: '/',
            domain: location.host
          }
        );
      });

      // Canadian city check
      if (enabled && isCanadianCity === true) {

        // Modal
        hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null &&
          typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

        // Hasn't yet been seen
        if (hasSeenDonateInterstitial === false) {
          closeCallback = function() {

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateInterstitial',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Open the catfish
            _this._element.find('.catfish.c-donate').removeClass(
              'hidden'
            );
          };
          this._element.find('.overlay.o-donate').show();
          this._element.find('.overlay.o-donate .o-background').click(closeCallback);
          this._element.find('a.closeModalCta').click(closeCallback);

          // Already donated flow
          this._element.find('div.btnWrapper a').click(
            function(event) {

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateInterstitial',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateCatfish',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Shout modal
            event.preventDefault();
            _this._element.find('.o-donate').hide();
            _this._element.find('.o-shout').show();

            // Twitter button
            _this._element.find('.o-shout .icon-twitter').click(function(event) {
              event.preventDefault();
              url = encodeURIComponent(
                'http://janeswalk.org/'
              );
              text = encodeURIComponent(
                $(this).closest('.option').find('.copy').text().trim()
              );
              link = 'https://twitter.com/intent/tweet' +
              '?url=' + (url) +
                '&via=janeswalk' +
                '&text=' + (text);
              window.open(
                link,
                'Twitter Share',
                'width=640, height=320'
              );
            });

            // Twitter button
            _this._element.find('.o-shout .icon-facebook').click(function(event) {
              event.preventDefault();
              var shareObj = _this._getFacebookDialogDonateObj();
              shareObj.description = $(this).closest('.option').find('.copy').text().trim();
              (new FacebookShareDialog(shareObj)).show();
            });
          }
          );
        } else {

          // Catfish
          hasSeenDonateCatfish = jQuery.cookie('hasSeenDonateCatfish') !== null &&
            typeof jQuery.cookie('hasSeenDonateCatfish') !== 'undefined';

          // Hasn't yet been seen
          if (hasSeenDonateCatfish === false) {
            this._element.find('.catfish').removeClass('hidden');
          }
        }
      }
    }
  },

  /**
   * _setThemeCounts
   * 
   * @protected
   * @return    void
   */
  _setThemeCounts: {
    value: function() {
      var _this = this,
      count,
      forEach = Function.prototype.call.bind(Array.prototype.forEach),
      el = this._element[0],
      countFilterMatches = function (option, index) {
        var filterCheck = option.getAttribute('value'),
        // Default to checking option property in filter
        compare_fn = this.compare_fn || function compareProperty(f,o) { return f[o]; };
        if (filterCheck !== '*') {
          count = 0;
          for(var i in _this._data) {
            if(compare_fn(_this._data[i][this.filter], filterCheck)) {
              ++count;
            }
          }
          option.textContent += ' (' + count + ')';
          if (count === 0) {
            option.parentElement.removeChild(option);
          }
        }
      };

      forEach(el.querySelectorAll('div.filters select[name="theme"] option'), countFilterMatches, {filter:'themes'});
      forEach(el.querySelectorAll('div.filters select[name="accessibility"] option'), countFilterMatches, {filter:'accessibilities'});
      forEach(el.querySelectorAll('div.filters select[name="ward"] option'), countFilterMatches, {filter:'wards'});
      forEach(el.querySelectorAll('div.filters select[name="initiative"] option'), countFilterMatches, {filter:'initiatives'});
      forEach(el.querySelectorAll('div.filters select[name="date"] option'), countFilterMatches, {
        filter:'datetimes',
        compare_fn: function compareDate(filter, optionValue) {
          for (var i = 0; i < filter.length; i++) {
            return filter[i].date.indexOf(optionValue) !== -1;
          } 
        } 
      });
    }
  },

  /**
   * _resetSelectElements
   * 
   * @protected
   * @return    void
   */
  _resetSelectElements: {
    value: function() {
      var _this = this;
      this._element.find('div.filters select').each(function(index, element) {
        $(element).val('*');
      });
      this._element.find('.initiatives').addClass('hidden');
      this._element.find('.initiative').addClass('hidden');
      this._element.find('#initiative').change(function(event) {
        if ($(this).val() !== '#') {
          _this._element.find('.initiatives').removeClass('hidden');
          _this._element.find(
            '[data-jw-initiative="' + ($(this).val()) + '"]'
          ).removeClass('hidden');
        }
      });
    }
  },

  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.create-walk');
      $btn.click(function(event) {
        event.preventDefault();
        if (_this._element.find('a[href="/index.php/login/logout/"]').length === 0) {
          _this._element.find('.overlay.o-connect').show();
        } else {
          location.href = $(this).attr('href');
        }
      });
    }
  },

  /**
   * _captureHash
   * 
   * @protected
   * @return    void
   */
  _captureHash: {
    value: function() {
      var _this = this;
      if (location.hash !== '') {
        var pieces = location.hash.replace('#', '').split('&');
        var key = '';
        $(pieces).each(function(index, piece) {
          key = '_' + (piece.split('=')[0]);
          _this[key] = piece.split('=')[1];
        });
        this._filterCards();
        this._element.find('select[name="ward"]').val(this._ward);
        this._element.find('select[name="theme"]').val(this._theme);
        this._element.find('select[name="accessibility"]').val(this._accessibility);
        this._element.find('select[name="initiative"]').val(this._initiative);
        this._element.find('select[name="date"]').val(this._date);
      }
    }
  },

  /**
   * _setHash
   * 
   * @protected
   * @return    void
   */
  _setHash: {
    value: function() {
      location.hash = 'ward=' + (this._ward) +
        '&theme=' + (this._theme) +
        '&accessibility=' + (this._accessibility) +
        '&initiative=' + (this._initiative) +
        '&date=' + (this._date);
    }
  },

  /**
   * _filterCards
   * 
   * @protected
   * @return    void
   */
  _filterCards: {
    value: function() {
      var _this = this,
      showing = 0,
      // Returns 'true' if this thing passes through the filter
      filterMatch = function(filter, dataset) {
        return (filter === '*') || (dataset && dataset[filter]);
      },
      filterDate = function(dateList, date) {
        if (date === '*') {
          return true;
        }
        for (var i = 0; i < dateList.length; i++) {
          if (dateList[i].date.indexOf(date) > -1) {
            return true;
          }
        }
        return false;
      };

      // Hide the cards first
      for (var i = 0, len = this._cards.length; i < len; i++) {
        this._cards[i].classList.add('hidden');
      }

      // Go through all the cards
      this._data.forEach(function(data, index) {
        // Check if we should show this card
        if(filterMatch(_this._ward, data.wards) &&
          filterMatch(_this._theme, data.themes) &&
          filterMatch(_this._accessibility, data.accessibilities) &&
          filterMatch(_this._initiative, data.initiatives) &&
          // See if date in filter dropdown is inside the array of dates
          filterDate(data.datetimes, _this._date)) {
          ++showing;
          _this._cards[index].classList.remove("hidden");
        }
      });

      // Empty state
      this._element.find('.empty').addClass('hidden');
      if (showing === 0) {
        this._element.find('.empty').removeClass('hidden');
      }
    }
  },

  /**
   * _addFilterEvents
   * 
   * @protected
   * @return    void
   */
  _addFilterEvents: {
    value: function() {
      var _this = this;
      this._element.find('div.filters select').change(function(event) {
        event.preventDefault();
        _this._ward = '*';
        if (_this._element.find('select[name="ward"]').length > 0) {
          _this._ward = _this._element.find('select[name="ward"]').val();
        }
        _this._theme = '*';
        if (_this._element.find('select[name="theme"]').length > 0) {
          _this._theme = _this._element.find('select[name="theme"]').val();
        }
        _this._accessibility = '*';
        if (_this._element.find('select[name="accessibility"]').length > 0) {
          _this._accessibility = _this._element.find('select[name="accessibility"]').val();
        }
        _this._initiative = '*';
        if (_this._element.find('select[name="initiative"]').length > 0) {
          _this._initiative = _this._element.find('select[name="initiative"]').val();
        }
        _this._date = '*';
        if (_this._element.find('select[name="date"]').length > 0) {
          _this._date = _this._element.find('select[name="date"]').val();
        }
        _this._setHash();
        _this._filterCards();
      });
    }
  }
});

module.exports = CityPageView;

},{"../Page.jsx":5}],19:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * HomePageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var HomePageView = function(element) {
  PageView.call(this, element);
  this._addMapToggleEvents();
  this._addBgImage();
  this._addCityDropdownEvent();
  this._addCreateWalkEvent();
};
HomePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {value: function() {
    var _this = this,
    $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
    $btn.click(function(event) {
      event.preventDefault();
      if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
        location.href = $(this).attr('href');
      } else {
        _this._element.find('.overlay').show();
      }
    });
  }},

  /**
   * _addCityDropdownEvent
   * 
   * @protected
   * @return    void
   */
  _addCityDropdownEvent: {value: function() {
    var $select = this._element.find('select.pageListSelect');
    $select.change(function(event) {
      location.href = $select.val();
    });
  }},

  /**
   * _addBgImage
   * 
   * @protected
   * @return    void
   */
  _addBgImage: {value: function() {
    var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
    $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
    image = document.createElement("img");
    image.onload = function() {
      $backgroundImageBanner.css({
        backgroundImage: 'url(' + (backgroundImageUrl) + ')'
      });
      $backgroundImageBanner.removeClass('faded');
    };
    image.src = backgroundImageUrl;
  }},

  /**
   * _addCityButtonCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityButtonCta: {value: function(cityName, cityPath) {
    React.render(
      this._element.find('.calltoaction ul').first(),
      React.createElement("li", {className: "cityButtonCta"}, 
        React.createElement("a", {href: cityPath, className: "btn btn-primary"}, 
          "View walks in ", cityName
        )
      )
    );
  }},

  /**
   * _addMapToggleEvents
   * 
   * @protected
   * @return    void
   */
  _addMapToggleEvents: {value: function() {
    var $showButton = this._element.find('.overlap .controls a.showButton'),
    $closeButton = this._element.find('.overlap .controls a.closeButton');
    $showButton.click(
      function() {
        $('.overlap').addClass('fullmap');
        $(this).fadeOut(
          400,
          function() {
            $closeButton.fadeIn();
          }
        );
        $('html, body').animate(
          {
            scrollTop: $(this).offset().top - 100
          },
          800
        );
      }
    );
    $closeButton.click(function() {
      $('.overlap').removeClass('fullmap');
      $(this).fadeOut(
        400,
        function() {
          $showButton.fadeIn();
        }
      );
    });
  }}
});

module.exports = HomePageView;

},{"../Page.jsx":5}],20:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * ProfilePageView
 * 
 * @extends PageView
 *
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var ProfilePageView = function(element) {
  try { 
    PageView.call(this, element);
    this._showProperStep();
    this._addTabClickEvents();
    this._setupDisplayPictureFlashWidget();
    this._addPictureDeleteEvent();
    this._addPromoteWalkClickEvent();
    this._addPromoteCityClickEvent();
    this._addPromoteBlogPostClickEvent();
    this._setupCityPromoteModalEvents();
    this._setupWalkPromoteModalEvents();
    this._setupBlogPostPromoteModalEvents();
    this._setupPromoteSlideshows();
    this._setupTransferWalkEvents();
  } catch(e) {
    console.error("Error initializing profile: " + e.stack);
  }
};

ProfilePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _slideIndexes
   * 
   * @protected
   * @var       Object
   */
  _slideIndexes: {
    value: {blogPost: 0, city: 0, walk: 0 },
    writable: true
  },

  /**
   * _currentTab
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _currentTab: {
    value: null,
    writable: true
  },

  /**
   * _addPictureDeleteEvent
   * 
   * @protected
   * @return    void
   */
  _addPictureDeleteEvent: {
    value: function() {
      this._element.find('a[href="/index.php/profile/delete/"]').click(function(event) {
        event.preventDefault();
        $.ajax({
          type: 'DELETE',
          url: $(this).attr('href'),
          success: function() {
            location.href = '/index.php/profile/#tab=picture&success=1';
          }
        });
      });
    }
  },

  /**
   * _addPromoteBlogPostClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteBlogPostClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.column.blogPosts .subactions .promote');
      $btn.click(function(event) {
        event.preventDefault();
        var blogPostObj = _this._getBlogPostObjById(
          $(this).data('blogpostid')
        );
        _this._element.find('.blogPostPromoteOverlay .copy').each(
          function(index, copy) {
          var $copy = $(copy);
          $copy.data('blogpostpath', blogPostObj.path);
          $copy.find('.objTitle').text(blogPostObj.title);
        }
        );
        _this._element.find('.blogPostPromoteOverlay').show();
      });
    }
  },

  /**
   * _addPromoteCityClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteCityClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('#cityBlock .promoteBtn');
      $btn.click(function(event) {
        event.preventDefault();
        _this._element.find('.cityPromoteOverlay').show();
      });
    }
  },

  /**
   * _getBlogPostObjById
   * 
   * @protected
   * @param     Number blogPostId
   * @return    void
   */
  _getBlogPostObjById: {
    value: function(blogPostId) {
      var $link = this._element.find('[data-blogpostid="' + (blogPostId) + '"]');
      return {
        title: $link.first().data('blogposttitle'),
        path: $link.first().data('blogpostpath')
      };
    }
  },

  /**
   * _getWalkObjById
   * 
   * @protected
   * @param     Number walkId
   * @return    void
   */
  _getWalkObjById: {
    value: function(walkId) {
      var $link = this._element.find('[data-walkid="' + (walkId) + '"]');
      return {
        title: $link.first().data('walktitle'),
        path: $link.first().data('walkpath')
      };
    }
  },

  /**
   * _addPromoteWalkClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteWalkClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find(
        '.column.city .subactions .promote,' +
        '.column.walks .subactions .promote'
      );
      $btn.click(function(event) {
        event.preventDefault();
        var walkObj = _this._getWalkObjById($(this).data('walkid'));
        _this._element.find('.walkPromoteOverlay .copy').each(function(index, copy) {
          var $copy = $(copy);
          $copy.data('walkpath', walkObj.path);
          $copy.find('.objTitle').text(walkObj.title);
        });
        _this._element.find('.walkPromoteOverlay').show();
      });
    }
  },

  /**
   * _addTabClickEvents
   * 
   * @protected
   * @return    void
   */
  _addTabClickEvents: {
    value: function() {
      // Nav tabs
      var _this = this;
      this._element.find('ul.nav-tabs li a').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });

      // Stand alone links
      this._element.find('.tabLink').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });
    }
  },

  /**
   * _setupBlogPostPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupBlogPostPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _setupCityPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupCityPromoteModalEvents: {
    value: function() {
      var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
      cityName = this._element.find('.cityPromoteOverlay').data('cityname');
      var _this = this;
      this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + (cityPath),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + (cityPath),
          'Jane\'s Walk',
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (cityName),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
    }
  },

  /**
   * _setupTransferWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupTransferWalkEvents: {
    value: function() {
      var _this = this;
      // Set the requests when clicking the modal links
      this._element.find('#walk-transfer .users a').click(function(event) {
        event.preventDefault();
        $.get(
          this.getAttribute('href'),
          function(data) {
            if (data.error) {
              // TODO: alerts are lame. Find a proper area for messaging
              alert(data.error);
            } else {
              // Just refresh the page for now
              window.location = window.location;
            }
          }
        );
      });

      // Set the 'transfer' buttons in the walks columns
      this._element.find('a.transfer').removeClass('hidden').click(function(event) {
        event.preventDefault();
        var modal = _this._element.find('#walk-transfer'),
        href = this.getAttribute('href'),
        links = modal.find('.users a');
        for (var i = 0, len = links.length; i < len; i++) {
          links[i].setAttribute('href', href + 'transfer/' + links[i].getAttribute('data-uid'));
        }
        modal.modal();
      });
    }
  },


  /**
   * _setupDisplayPictureFlashWidget
   * 
   * @protected
   * @return    void
   */
  _setupDisplayPictureFlashWidget: {
    value: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
        bgcolor: '#ffffff',
        wmode: 'transparent',
        quality: 'high' 
      },
      flashvars = {
        width: this._element.find('#flashContainer').attr('data-width'),
        height: this._element.find('#flashContainer').attr('data-height'),
        image: this._element.find('#flashContainer').attr('data-imagepath'),
        save: this._element.find('#flashContainer').attr('data-savepath')
      };
      if(typeof swfobject !== "undefined") {
        swfobject.embedSWF(
          this._element.find('#flashContainer').attr('data-flashpath'),
          'flashContainer',
          '500',
          '400',
          '10,0,0,0',
          'includes/expressInstall.swf',
          flashvars,
          params
        );
      }
    }
  },

  /**
   * _showSlide
   * 
   * @protected
   * @param     String slideshowName
   * @return    void
   */
  _showSlide: {
    value: function(slideshowName) {
      var index = this._slideIndexes[slideshowName],
      $overlay = this._element.find('[data-slideshow="' + (slideshowName) + '"]'),
      $options = $overlay.find('.options .option');
      $options.addClass('hidden');
      $($options[index]).removeClass('hidden');
    }
  },

  /**
   * _setupPromoteSlideshows
   * 
   * @protected
   * @return    void
   */
  _setupPromoteSlideshows: {
    value: function() {
      var _this = this;
      this._element.find('.promoteOverlay .nav > a.left').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === 0) {
          _this._slideIndexes[slideshow] = numOptions - 1;
        } else {
          --_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);
      });
      this._element.find('.promoteOverlay .nav > a.right').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === (numOptions - 1)) {
          _this._slideIndexes[slideshow] = 0;
        } else {
          ++_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);

      });
    }
  },

  /**
   * _setupWalkPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupWalkPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _showCurrentTab
   * 
   * @protected
   * @return    void
   */
  _showCurrentTab: {
    value: function() {
      this._element.find('ul.nav-tabs li.active').removeClass('active');
      this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
      this._element.find('div.content div.block').addClass('hidden');
      this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
      location.hash = 'tab=' + (this._currentTab);
    }
  },

  /**
   * _showEmailShareWindow
   * 
   * @protected
   * @param     String subject
   * @param     String body
   * @return    void
   */
  _showEmailShareWindow: {
    value: function(subject, body) {
      subject = encodeURIComponent(subject);
      body = encodeURIComponent(body);
      var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
      window.open(link);
    }
  },

  /**
   * _showFacebookShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String title
   * @param     String text
   * @return    void
   */
  _showFacebookShareWindow: {
    value: function(link, title, text) {
      (new FacebookShareDialog({
        link: link,
        name: title,
        description: text
      })).show();
    }
  },

  /**
   * _showProperStep
   * 
   * @protected
   * @return    void
   */
  _showProperStep: {
    value: function() {
      if (location.hash !== '') {
        var pieces = location.hash.split('&'),
        hash = {},
        again;
        $(pieces).each(
          function(index, piece) {
          again = piece.split('=');
          hash[again[0].replace('#', '')] = again[1];
        }
        );
        this._currentTab = hash.tab;
        this._showCurrentTab();
        if (
          typeof hash.success !== 'undefined' &&
            parseInt(hash.success) === 1
        ) {
          this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
        }
      }
    }
  },

  /**
   * _showTwitterShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String text
   * @return    void
   */
  _showTwitterShareWindow: {
    value: function(link, text) {
      link = encodeURIComponent(link);
      text = encodeURIComponent(text);
      if (text.length > 130) {
        text = text.substring(0,130) + '...';
      }
      link = 'https://twitter.com/intent/tweet' +
      '?url=' + (link) +
        '&via=janeswalk' +
        '&text=' + (text);
      window.open(
        link,
        'Twitter Share',
        'width=640, height=320'
      );
    }
  }
});

module.exports = ProfilePageView;

},{"../Page.jsx":5}],21:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');
var FacebookShareDialog = require('../FacebookShareDialog.jsx');
var WalkMap = require('../elements/WalkMap.jsx');

/**
 * WalkPageView
 * 
 * @extends PageView
 * 
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var WalkPageView = function(element) {
  PageView.call(this, element);
  
  var mapCanvas = document.getElementById('map-canvas');

  this._addFacebookDialogEvents();

  // Check if there's a map to init first
  if (mapCanvas) {
    new WalkMap(JanesWalk.page.gmap, mapCanvas);
  }
};
WalkPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addFacebookDialogEvents
   * 
   * @protected
   * @return    void
   */
  _addFacebookDialogEvents: {
    value: function() {
      var _this = this;
      this._element.find('.facebookShareLink').click(function(event) {
        event.preventDefault();
        _this.trackEvent('Walk', 'share.attempted', 'facebook');
        var shareObj = _this._getFacebookDialogObj();
        (new FacebookShareDialog(shareObj)).show(
          _this._facebookShareFailed,
          _this._facebookShareSuccessful
        );
      });
    }
  },

  /**
   * _facebookShareFailed
   * 
   * @protected
   * @return    void
   */
  _facebookShareFailed: {
    value: function() {
      this.trackEvent('Walk', 'share.failed', 'facebook');
    }
  },

  /**
   * _facebookShareSuccessful
   * 
   * @protected
   * @return    void
   */
  _facebookShareSuccessful: {
    value: function() {
      this.trackEvent('Walk', 'share.successful', 'facebook');
    }
  },

  /**
   * _getFacebookDialogObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogObj: {
    value: function() {
      return {
        link: JanesWalk.page.url,
        picture: JanesWalk.page.pictureUrl,
        name: JanesWalk.page.title,
        description: JanesWalk.page.description,
        actions: {
          name: 'View Jane\'s Walks in ' + (JanesWalk.page.city.name),
          link: JanesWalk.page.city.url
        }
      };
    }
  },

});

module.exports = WalkPageView;

},{"../FacebookShareDialog.jsx":4,"../Page.jsx":5,"../elements/WalkMap.jsx":14}]},{},[1]);
