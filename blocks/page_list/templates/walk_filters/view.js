(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */

'use strict';

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

var _CityMapJsx = require('./CityMap.jsx');

var _CityMapJsx2 = _interopRequireDefault(_CityMapJsx);

var _WalkFilterJsx = require('./WalkFilter.jsx');

var _WalkFilterJsx2 = _interopRequireDefault(_WalkFilterJsx);

var _walks = undefined;
var _city = undefined;

JanesWalk.event.on('walks.receive', function (walks, props) {
  _walks = walks;
  React.render({
    $$typeof: _typeofReactElement,
    type: _WalkFilterJsx2['default'],
    key: null,
    ref: null,
    props: _defaultProps(_WalkFilterJsx2['default'].defaultProps, {
      walks: walks,
      filters: props.filters,
      city: _city
    }),
    _owner: null
  }, document.getElementById('janeswalk-walk-filters'));
});

JanesWalk.event.on('city.receive', function (city) {
  _city = city;
});


},{"./CityMap.jsx":2,"./WalkFilter.jsx":6}],2:[function(require,module,exports){
/**
 * The map of upcoming walks for a whole city
 */

// Helper to see if a member is a walk leader
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isWalkLeader(member) {
  // Check if their role contains leader, or their type does
  return member.role && member.role.indexOf('leader') > -1 || member.type && member.type.indexOf('leader') > -1;
}

// Date formatter
var dtfDate = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
var _infoNode = document.createElement('div');

/**
 * Loop through the first set of markers, and see which in the update need to be
 * displayed.
 *
 * @param object markers The currently rendered markers
 * @param array walks The walks we want to render markers for
 * @param google.maps.Map map The google map to render to
 * @return object updated set of markers
 */
function addNewMarkersToMap(markers, walks, map) {
  // TODO: see how to move these consts out of the function, since
  // they need to be here so google can load first
  // Basic info window
  var infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });

  // Simple map marker icon
  var icon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 7,
    strokeWeight: 1,
    strokeColor: '#f16725',
    fillOpacity: 0.7,
    fillColor: '#f16725'
  };

  // Clean out the markers before we put them back in
  for (var k in markers) {
    markers[k].setMap(null);
  }

  // Grab starting point of each walk
  walks.forEach(function (walk) {
    var latlng = undefined;
    var marker = undefined;

    if (markers[walk.id]) {
      // We already have this marker built, so simply add it to the map
      markers[walk.id].setMap(map);
    } else {
      // We must build a marker
      // Walk location is meeting place coords
      if (Array.isArray(walk.map.markers) && walk.map.markers.length > 0) {
        latlng = new google.maps.LatLng(walk.map.markers[0].lat, walk.map.markers[0].lng);
      } else if (Array.isArray(walk.map.route) && walk.map.route.length > 0) {
        latlng = new google.maps.LatLng(walk.map.route[0].lat, walk.map.route[0].lng);
      }

      // Add the marker
      marker = new google.maps.Marker({
        position: latlng,
        title: walk.title,
        icon: icon,
        map: map
      });

      markers[walk.id] = marker;

      google.maps.event.addListener(marker, 'click', function () {
        var leaders = undefined;
        var date = undefined;

        // Build the team list of walk leaders
        if (Array.isArray(walk.team)) {
          leaders = walk.team.filter(function (member) {
            return isWalkLeader(member);
          }).map(function (member) {
            return member['name-first'] + ' ' + member['name-last'];
          });
        }

        // Best-effort grab of the time
        try {
          // Show all dates joined together
          date = {
            $$typeof: _typeofReactElement,
            type: 'h6',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'i',
                key: null,
                ref: null,
                props: {
                  className: 'fa fa-calendar'
                },
                _owner: null
              }, ' ', walk.time.slots.map(function (slot) {
                return dtfDate.format(slot[0] * 1000);
              }).join(', ')]
            },
            _owner: null
          };
        } catch (e) {
          // Just log this, but don't die
          console.error('Failed to parse walk time.');
        }

        // Setup infowindow
        React.render(React.createElement(InfoWindow, _extends({
          key: walk.id
        }, Object.assign({}, walk, { date: date, leaders: leaders }))), _infoNode);

        // Center the marker and display its info window
        infoWindow.setMap(map);
        map.panTo(marker.getPosition());
        infoWindow.setContent(_infoNode);
        infoWindow.open(map, marker);
      });
    }
  });

  return markers;
}

var CityMap = (function (_React$Component) {
  _inherits(CityMap, _React$Component);

  function CityMap() {
    _classCallCheck(this, CityMap);

    _get(Object.getPrototypeOf(CityMap.prototype), 'constructor', this).call(this);

    this.state = { map: null, markers: {} };
  }

  _createClass(CityMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var cityLatLng = new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]);

      // Setup map
      var map = new google.maps.Map(React.findDOMNode(this), {
        center: cityLatLng,
        zoom: 8,
        backgroundColor: '#d7f0fa'
      });

      // Play nice with bootstrap tabs
      $('a[href="#jw-map"]').on('shown.bs.tab', function (e) {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(cityLatLng);
      });

      // Add our markers to the empty map
      var newMarkers = addNewMarkersToMap({}, this.props.walks, map);
      this.setState({ map: map, markers: newMarkers });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var newMarkers = addNewMarkersToMap(this.state.markers, props.walks, this.state.map);
      this.setState({ markers: newMarkers });
    }
  }, {
    key: 'render',
    value: function render() {
      return {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          className: 'cityMap',
          style: { width: '100%', height: '600px' }
        },
        _owner: null
      };
    }
  }]);

  return CityMap;
})(React.Component);

exports['default'] = CityMap;

var InfoWindow = function InfoWindow(_ref) {
  var title = _ref.title;
  var url = _ref.url;
  var date = _ref.date;
  var shortDescription = _ref.shortDescription;
  var leaders = _ref.leaders;
  return {
    $$typeof: _typeofReactElement,
    type: 'span',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'h4',
        key: null,
        ref: null,
        props: {
          children: title,
          style: { marginBottom: '0.1em' }
        },
        _owner: null
      }, date, {
        $$typeof: _typeofReactElement,
        type: 'h6',
        key: null,
        ref: null,
        props: {
          children: ['Led by: ', leaders.join(', ')]
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'p',
        key: null,
        ref: null,
        props: {
          children: [shortDescription, ' ', {
            $$typeof: _typeofReactElement,
            type: 'a',
            key: null,
            ref: null,
            props: {
              children: 'Read More',
              href: url,
              target: '_blank'
            },
            _owner: null
          }]
        },
        _owner: null
      }]
    },
    _owner: null
  };
};
module.exports = exports['default'];


},{}],3:[function(require,module,exports){
/**
 * Date Range
 * a jQueryUI based React component for picking a to/from date range
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var df = 'yy-mm-dd';
var offset = new Date().getTimezoneOffset();
var oneDay = 24 * 60 * 60 * 1000;

var DateRange = (function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange(props) {
    _classCallCheck(this, DateRange);

    _get(Object.getPrototypeOf(DateRange.prototype), 'constructor', this).call(this, props);
    if (Array.isArray(props.value) && props.value.length === 2) {
      this.state = {
        from: props.value[0] ? $.datepicker.formatDate(df, new Date(props.value[0] + offset)) : '',
        to: props.value[1] ? $.datepicker.formatDate(df, new Date(props.value[1] + offset)) : '',
        fromInt: props.value[0] ? props.value[0] + offset : '',
        toInt: props.value[1] ? props.value[1] + offset : ''
      };
    } else {
      this.state = { from: '', to: '' };
    }
  }

  _createClass(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var $to = $(this.refs.to);
      var $from = $(this.refs.from);

      var toTime = this.state.toInt;
      var fromTime = this.state.fromInt;

      $from.datepicker({
        defaultDate: '+1w',
        changeMonth: true,
        changeYear: true,
        dateFormat: df,
        onSelect: function onSelect(selectedDate) {
          fromTime = $.datepicker.parseDate(df, selectedDate) - offset;
          $to.datepicker('option', 'minDate', selectedDate);
          _this.setState({ from: selectedDate });
          _this.props.onChange(fromTime, toTime);
        }
      });

      $to.datepicker({
        defaultDate: '+5w',
        changeMonth: true,
        changeYear: true,
        dateFormat: df,
        onSelect: function onSelect(selectedDate) {
          toTime = $.datepicker.parseDate(df, selectedDate) - offset;
          $from.datepicker('option', 'maxDate', selectedDate);
          _this.setState({ to: selectedDate });
          _this.props.onChange(fromTime, toTime);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [React.createElement('input', { type: 'text', ref: 'from', placeholder: 'From', defaultValue: this.state.from }), React.createElement('input', { type: 'text', ref: 'to', placeholder: 'To', defaultValue: this.state.to })],
          className: 'daterange'
        },
        _owner: null
      };
    }
  }]);

  return DateRange;
})(React.Component);

exports['default'] = DateRange;
module.exports = exports['default'];


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getThemeName = getThemeName;
exports.getThemeIcon = getThemeIcon;
var icons = {
  'civic-activist': { name: 'Activism', icon: 'bullhorn' },
  'civic-commerce': { name: 'Commerce', icon: 'shopping-cart' },
  'civic-gender': { name: 'Gender', icon: 'unlock-alt' },
  'civic-goodneighbour': { name: 'Community', icon: 'group' },
  'civic-health': { name: 'Health', icon: 'medkit' },
  'civic-international': { name: 'International Issues', icon: 'globe' },
  'civic-military': { name: 'Military', icon: 'fighter-jet' },
  'civic-nativeissues': { name: 'Native Issues', icon: 'sun-o' },
  'civic-religion': { name: 'Religion', icon: 'bell' },
  'civic-truecitizen': { name: 'Citizenry', icon: 'flag-o' },
  'culture-aesthete': { name: 'Design', icon: 'pencil' },
  'culture-artist': { name: 'Art', icon: 'picture-o' },
  'culture-bookworm': { name: 'Literature', icon: 'book' },
  'culture-foodie': { name: 'Food', icon: 'cutlery' },
  'culture-historybuff': { name: 'Heritage', icon: 'archive' },
  'culture-nightowl': { name: 'Night Life', icon: 'glass' },
  'culture-techie': { name: 'Technology', icon: 'gears' },
  'culture-writer': { name: 'Storytelling', icon: 'edit' },
  'nature-greenthumb': { name: 'Gardening', icon: 'leaf' },
  'nature-naturelover': { name: 'Nature', icon: 'bug' },
  'nature-petlover': { name: 'Animals', icon: 'heart' },
  'urban-architecturalenthusiast': { name: 'Architecture', icon: 'building' },
  'urban-film': { name: 'Film', icon: 'video-camera' },
  'urban-moversandshakers': { name: 'Transportation', icon: 'truck' },
  'urban-music': { name: 'Music', icon: 'music' },
  'urban-play': { name: 'Play', icon: 'puzzle-piece' },
  'urban-sports': { name: 'Sports', icon: 'trophy' },
  'urban-suburbanexplorer': { name: 'Suburbs', icon: 'home' },
  'urban-water': { name: 'Water', icon: 'tint' }
};

exports.icons = icons;
/**
 * Helpers, to deal with that 'theme-' prefix from the v1 json
 */

function getThemeName(theme) {
  return (icons[theme.slice(6)] || { name: '' }).name;
}

function getThemeIcon(theme) {
  return 'fa-' + (icons[theme.slice(6)] || { icon: '' }).icon;
}


},{}],5:[function(require,module,exports){
/**
 * The cards showing your walk
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ThemesJs = require('./Themes.js');

var t = function t(s) {
  return s;
};

var dtfDate = undefined;
// Date formatter
if (typeof Intl === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

var WalkCards = (function (_React$Component) {
  _inherits(WalkCards, _React$Component);

  function WalkCards() {
    _classCallCheck(this, WalkCards);

    _get(Object.getPrototypeOf(WalkCards.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WalkCards, [{
    key: 'render',
    value: function render() {
      if (this.props.walks.length === 0) {
        return {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: [{
              $$typeof: _typeofReactElement,
              type: 'h4',
              key: null,
              ref: null,
              props: {
                children: t('Keep looking.')
              },
              _owner: null
            }, {
              $$typeof: _typeofReactElement,
              type: 'p',
              key: null,
              ref: null,
              props: {
                children: t('We couldn\'t find any matching walks.')
              },
              _owner: null
            }],
            className: 'empty'
          },
          _owner: null
        };
      } else {
        return {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: this.props.walks.map(function (walk) {
              return {
                $$typeof: _typeofReactElement,
                type: Card,
                key: null,
                ref: null,
                props: _defaultProps(Card.defaultProps, {
                  walk: walk
                }),
                _owner: null
              };
            })
          },
          _owner: null
        };
      }
    }
  }]);

  return WalkCards;
})(React.Component);

exports['default'] = WalkCards;

var Card = (function (_React$Component2) {
  _inherits(Card, _React$Component2);

  function Card(props) {
    _classCallCheck(this, Card);

    var formatter = undefined;
    var past = undefined;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    _get(Object.getPrototypeOf(Card.prototype), 'constructor', this).call(this, props);

    // Format the start date upfront, since that's expensive
    if (dtfDate) {
      formatter = function (slot) {
        return dtfDate.format(slot[0] * 1000);
      };
    } else {
      formatter = function (slot) {
        var date = new Date(slot[0] * 1000);
        var dateString = date.toUTCString();
        return dateString.slice(0, dateString.indexOf(' GMT'));
      };
    }

    if (props.walk.time.slots.length) {
      past = props.walk.time.slots[0][0] * 1000 < yesterday.getTime();
    }

    this.state = {
      startTimes: props.walk.time.slots.map(formatter),
      past: past
    };
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var Meeting = undefined;
      var LedBy = undefined;
      var Thumb = undefined;
      var Status = undefined;
      var walk = this.props.walk;
      var placeholder = 'placeholder' + walk.id % 3;
      var leaders = walk.team.filter(function (member) {
        return member.role === 'walk-leader' || member.type === 'leader';
      });
      var Tags = Object.keys(walk.checkboxes).filter(function (check) {
        return check.indexOf('theme-') === 0 && walk.checkboxes[check];
      }).map(function (theme) {
        return {
          $$typeof: _typeofReactElement,
          type: 'li',
          key: null,
          ref: null,
          props: {
            children: {
              $$typeof: _typeofReactElement,
              type: 'i',
              key: null,
              ref: null,
              props: {
                className: 'fa ' + (0, _ThemesJs.getThemeIcon)(theme)
              },
              _owner: null
            },
            className: 'tag',
            'data-toggle': 'tooltip',
            'data-theme': theme,
            title: (0, _ThemesJs.getThemeName)(theme)
          },
          _owner: null
        };
      });

      // Build the optional elements
      if (walk.thumbnails.length) {
        Thumb = walk.thumbnails[0].url;
      }

      /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
      if (walk.map.markers && walk.map.markers.length) {
        Meeting = walk.map.markers[0].title || walk.map.markers[0].description;
      }

      if (leaders.length) {
        LedBy = {
          $$typeof: _typeofReactElement,
          type: 'h6',
          key: null,
          ref: null,
          props: {
            children: 'Walk led by ' + leaders.map(function (v) {
              return v['name-first'] + ' ' + v['name-last'];
            }).join(', ')
          },
          _owner: null
        };
      }

      if (this.state.past) {
        Status = {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: 'Ended',
            className: 'statusMessage'
          },
          _owner: null
        };
      }

      return {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'a',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: Status,
                      className: 'walkimage ' + placeholder,
                      style: { backgroundImage: 'url(' + Thumb + ')' }
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'h4',
                        key: null,
                        ref: null,
                        props: {
                          children: (walk.title || '').slice(0, 45)
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'ul',
                        key: null,
                        ref: null,
                        props: {
                          children: [this.state.startTimes.map(function (startTime) {
                            return {
                              $$typeof: _typeofReactElement,
                              type: 'li',
                              key: null,
                              ref: null,
                              props: {
                                children: [{
                                  $$typeof: _typeofReactElement,
                                  type: 'i',
                                  key: null,
                                  ref: null,
                                  props: {
                                    className: 'fa fa-calendar'
                                  },
                                  _owner: null
                                }, ' ', startTime]
                              },
                              _owner: null
                            };
                          }), {
                            $$typeof: _typeofReactElement,
                            type: 'li',
                            key: null,
                            ref: null,
                            props: {
                              children: ['Meet at ', Meeting]
                            },
                            _owner: null
                          }],
                          className: 'when'
                        },
                        _owner: null
                      }, LedBy, {
                        $$typeof: _typeofReactElement,
                        type: 'p',
                        key: null,
                        ref: null,
                        props: {
                          children: (walk.shortDescription || '').slice(0, 140)
                        },
                        _owner: null
                      }],
                      className: 'caption'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'ul',
                    key: null,
                    ref: null,
                    props: {
                      children: Tags,
                      className: 'list-inline tags'
                    },
                    _owner: null
                  }],
                  className: 'thumbnail'
                },
                _owner: null
              },
              href: walk.url
            },
            _owner: null
          },
          className: 'walk'
        },
        _owner: null
      };
    }
  }]);

  return Card;
})(React.Component);

module.exports = exports['default'];


},{"./Themes.js":4}],6:[function(require,module,exports){
/**
 * Filters, lists, maps, the whole shebang
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _WalkCardsJsx = require('./WalkCards.jsx');

var _WalkCardsJsx2 = _interopRequireDefault(_WalkCardsJsx);

var _WalkListJsx = require('./WalkList.jsx');

var _WalkListJsx2 = _interopRequireDefault(_WalkListJsx);

var _CityMapJsx = require('./CityMap.jsx');

var _CityMapJsx2 = _interopRequireDefault(_CityMapJsx);

var _DateRangeJsx = require('./DateRange.jsx');

var _DateRangeJsx2 = _interopRequireDefault(_DateRangeJsx);

// TODO: replace placeholder translate with real one.
// Not doing this now because we'd need to build multiple translators for blocks vs site
var t = function t(s) {
  return s;
};
var today = new Date();
today.setUTCHours(0);
today.setUTCMinutes(0);

/**
 * Apply filters and date range to walks
 */
function filterWalks(walks, filters, dr) {
  return walks.filter(function (walk) {
    var time = undefined;
    if (walk.time.slots.length) {
      time = walk.time.slots[0][0] * 1000;
    }
    // TODO: cleanup and perf test
    if (filters.theme && filters.theme.selected && !walk.checkboxes['theme-' + filters.theme.selected] || filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected || filters.accessibility && filters.accessibility.selected && !walk.checkboxes['accessible-' + filters.accessibility.selected] || filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1 || dr[0] && dr[0] > time || dr[1] && dr[1] < time) {
      return false;
    }
    return true;
  });
}

/**
 * Grab the day the 3rd most recent walk appears on
 */
function thirdRecentDate(walks) {
  if (walks.length) {
    var lastThree = walks.slice(-3);
    // Find the day the walk starts
    if (lastThree[0].time.slots.length) {
      var lastDate = new Date(lastThree[0].time.slots[0][0] * 1000);
      lastDate.setUTCHours(0);
      lastDate.setUTCMinutes(0);
      return lastDate;
    }
  }
  return null;
}

var Filter = function Filter(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'li',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'label',
        key: null,
        ref: null,
        props: {
          children: props.name
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'select',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'option',
            key: null,
            ref: null,
            props: {
              children: 'All',
              value: ''
            },
            _owner: null
          }, Object.keys(props.data).map(function (k) {
            return {
              $$typeof: _typeofReactElement,
              type: 'option',
              key: null,
              ref: null,
              props: {
                children: props.data[k],
                value: k
              },
              _owner: null
            };
          })],
          name: props.key,
          value: props.selected,
          onChange: function (e) {
            return props.setFilter(props.key, e.target.value);
          }
        },
        _owner: null
      }]
    },
    _owner: null
  };
};

var WalkFilter = (function (_React$Component) {
  _inherits(WalkFilter, _React$Component);

  function WalkFilter(props) {
    var _this = this;

    _classCallCheck(this, WalkFilter);

    var thirdDate = thirdRecentDate(props.walks);
    var dateRange = [today.getTime(), null];
    if (thirdDate && thirdDate < today) {
      dateRange[0] = thirdDate.getTime();
    }

    _get(Object.getPrototypeOf(WalkFilter.prototype), 'constructor', this).call(this, props);
    this.state = {
      walks: props.walks || [],
      city: props.city,
      filters: props.filters || {},
      dateRange: dateRange,
      filterMatches: filterWalks(props.walks, props.filters, dateRange)
    };

    // Setup event listeners
    JanesWalk.event.on('walks.receive', function (walks, props) {
      _this.setState({ walks: walks, filters: props.filters }, _this.handleFilters);
    });
    JanesWalk.event.on('city.receive', function (city) {
      return _this.setState({ city: city });
    });
    JanesWalk.event.on('blogurl.receive', function (url) {
      return _this.setState({ blog: url });
    });
  }

  _createClass(WalkFilter, [{
    key: 'setFilter',
    value: function setFilter(filter, val) {
      var filters = this.state.filters;
      filters[filter].selected = val;
      this.setState({ filters: filters, filterMatches: filterWalks(this.state.walks, filters, this.state.dateRange) });
    }
  }, {
    key: 'setDateRange',
    value: function setDateRange(from, to) {
      this.setState({ dateRange: [from, to], filterMatches: filterWalks(this.state.walks, this.state.filters, [from, to]) });
    }
  }, {
    key: 'printList',
    value: function printList() {
      var win = window.open();
      var el = win.document.createElement('div');
      React.render({
        $$typeof: _typeofReactElement,
        type: _WalkListJsx2['default'],
        key: null,
        ref: null,
        props: _defaultProps(_WalkListJsx2['default'].defaultProps, {
          walks: this.state.filterMatches
        }),
        _owner: null
      }, el);
      window.focus();
      win.document.body.appendChild(el);
      win.print();
      win.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var TabMap = undefined;
      var TabBlog = undefined;
      var CityMapSection = undefined;

      var Filters = Object.keys(this.state.filters).map(function (key) {
        return React.createElement(Filter, _extends({ key: key }, _this2.state.filters[key], { setFilter: function (k, v) {
            return _this2.setFilter(k, v);
          } }));
      });

      // See if this city has a location set
      if (this.state.city && this.state.city.latlng.length === 2) {
        TabMap = {
          $$typeof: _typeofReactElement,
          type: 'li',
          key: 'tabmap',
          ref: null,
          props: {
            children: {
              $$typeof: _typeofReactElement,
              type: 'a',
              key: null,
              ref: null,
              props: {
                children: 'Map',
                href: '#jw-map',
                'data-toggle': 'tab'
              },
              _owner: null
            }
          },
          _owner: null
        };
        CityMapSection = {
          $$typeof: _typeofReactElement,
          type: 'section',
          key: null,
          ref: null,
          props: {
            children: {
              $$typeof: _typeofReactElement,
              type: _CityMapJsx2['default'],
              key: null,
              ref: null,
              props: _defaultProps(_CityMapJsx2['default'].defaultProps, {
                walks: this.state.filterMatches,
                city: this.state.city
              }),
              _owner: null
            },
            className: 'tab-pane',
            id: 'jw-map'
          },
          _owner: null
        };
      }

      // Blog link, if we have one
      if (this.state.blog) {
        TabBlog = {
          $$typeof: _typeofReactElement,
          type: 'li',
          key: 'tb',
          ref: null,
          props: {
            children: {
              $$typeof: _typeofReactElement,
              type: 'a',
              key: null,
              ref: null,
              props: {
                children: 'Blog',
                href: this.state.blog,
                target: '_blank'
              },
              _owner: null
            }
          },
          _owner: null
        };
      }

      return {
        $$typeof: _typeofReactElement,
        type: 'section',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'a',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-print'
                    },
                    _owner: null
                  }, ' Print List'],
                  className: 'print-button',
                  onClick: function () {
                    return _this2.printList();
                  }
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'ul',
                key: null,
                ref: null,
                props: {
                  children: [Filters, {
                    $$typeof: _typeofReactElement,
                    type: 'li',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: 'Dates'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: _DateRangeJsx2['default'],
                        key: null,
                        ref: null,
                        props: _defaultProps(_DateRangeJsx2['default'].defaultProps, {
                          value: this.state.dateRange,
                          onChange: this.setDateRange.bind(this)
                        }),
                        _owner: null
                      }]
                    },
                    _owner: null
                  }],
                  className: 'filters'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'ul',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'li',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'a',
                        key: null,
                        ref: null,
                        props: {
                          children: 'All Walks',
                          href: '#jw-cards',
                          className: 'active',
                          'data-toggle': 'tab'
                        },
                        _owner: null
                      }
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'li',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'a',
                        key: null,
                        ref: null,
                        props: {
                          children: 'List',
                          href: '#jw-list',
                          'data-toggle': 'tab'
                        },
                        _owner: null
                      }
                    },
                    _owner: null
                  }, TabMap, TabBlog],
                  className: 'nav nav-tabs'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'section',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: _WalkCardsJsx2['default'],
                        key: null,
                        ref: null,
                        props: _defaultProps(_WalkCardsJsx2['default'].defaultProps, {
                          walks: this.state.filterMatches
                        }),
                        _owner: null
                      },
                      className: 'tab-pane active',
                      id: 'jw-cards'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'section',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: _WalkListJsx2['default'],
                        key: null,
                        ref: null,
                        props: _defaultProps(_WalkListJsx2['default'].defaultProps, {
                          walks: this.state.filterMatches
                        }),
                        _owner: null
                      },
                      className: 'tab-pane',
                      id: 'jw-list'
                    },
                    _owner: null
                  }, CityMapSection],
                  className: 'tab-content'
                },
                _owner: null
              }],
              className: 'walk-filters'
            },
            _owner: null
          },
          className: 'ccm-block-page-list-walk-filters'
        },
        _owner: null
      };
    }
  }]);

  return WalkFilter;
})(React.Component);

exports['default'] = WalkFilter;
module.exports = exports['default'];


},{"./CityMap.jsx":2,"./DateRange.jsx":3,"./WalkCards.jsx":5,"./WalkList.jsx":7}],7:[function(require,module,exports){
/**
 * The list of walks to order
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dtfDate = undefined;
var dtfTime = undefined;

var t = function t(s) {
  return s;
};

// Date formatter
if (typeof Intl === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  dtfTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });
} else {
  // Quick and dirty shim for those poor souls on Safari
  dtfDate = {};
  dtfTime = {};
  dtfDate.format = function (time) {
    return $.datepicker.formatDate('M d, yy', new Date(time));
  };
  dtfTime.format = function (time) {
    var d = new Date(time);
    return d.getHours() + ':' + d.getMinutes();
  };
}

var WalkList = (function (_React$Component) {
  _inherits(WalkList, _React$Component);

  function WalkList() {
    _classCallCheck(this, WalkList);

    _get(Object.getPrototypeOf(WalkList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WalkList, [{
    key: 'render',
    value: function render() {
      var walks = this.props.walks;
      return {
        $$typeof: _typeofReactElement,
        type: 'table',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'thead',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'tr',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Date')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Time')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Title')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Meeting Place')
                    },
                    _owner: null
                  }]
                },
                _owner: null
              }
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'tbody',
            key: null,
            ref: null,
            props: {
              children: walks.map(function (walk) {
                return {
                  $$typeof: _typeofReactElement,
                  type: ListItem,
                  key: null,
                  ref: null,
                  props: _defaultProps(ListItem.defaultProps, {
                    walk: walk
                  }),
                  _owner: null
                };
              })
            },
            _owner: null
          }],
          className: 'walklist table'
        },
        _owner: null
      };
    }
  }]);

  return WalkList;
})(React.Component);

exports['default'] = WalkList;

var ListItem = (function (_React$Component2) {
  _inherits(ListItem, _React$Component2);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var formatter = undefined;
    _get(Object.getPrototypeOf(ListItem.prototype), 'constructor', this).call(this, props);

    if (props.walk.time.slots.length) {
      var time = props.walk.time.slots[0][0] * 1000;

      this.state = {
        startDate: dtfDate.format(time),
        startTime: dtfTime.format(time)
      };
    }
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var Meeting = undefined;
      var walk = this.props.walk;

      /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
      if (walk.map.markers && walk.map.markers.length) {
        Meeting = walk.map.markers[0].title || walk.map.markers[0].description;
      }

      return {
        $$typeof: _typeofReactElement,
        type: 'tr',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'td',
            key: null,
            ref: null,
            props: {
              children: this.state.startDate
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'td',
            key: null,
            ref: null,
            props: {
              children: this.state.startTime
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'td',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'a',
                key: null,
                ref: null,
                props: {
                  children: this.props.walk.title,
                  href: this.props.walk.url,
                  target: '_blank'
                },
                _owner: null
              }
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'td',
            key: null,
            ref: null,
            props: {
              children: Meeting
            },
            _owner: null
          }]
        },
        _owner: null
      };
    }
  }]);

  return ListItem;
})(React.Component);

module.exports = exports['default'];


},{}]},{},[1]);
