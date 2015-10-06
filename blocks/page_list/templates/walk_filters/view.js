(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CityMapJsx = require('./CityMap.jsx');

var _CityMapJsx2 = _interopRequireDefault(_CityMapJsx);

var _WalkFilterJsx = require('./WalkFilter.jsx');

var _WalkFilterJsx2 = _interopRequireDefault(_WalkFilterJsx);

var _walks = undefined;
var _city = undefined;

JanesWalk.event.on('walks.receive', function (walks, props) {
  _walks = walks;
  React.render(React.createElement(_WalkFilterJsx2['default'], { walks: walks, filters: props.filters, city: _city }), document.getElementById('janeswalk-walk-filters'));
});

JanesWalk.event.on('city.receive', function (city) {
  _city = city;
});

document.addEventListener('DOMContentLoaded', function () {
  // We should have the city in the footer at this point. Eventually this
  // footer city should be completely replaced with events
  JanesWalk.event.emit('city.receive', JanesWalk.city);

  // Setup the walk map
  /*
   React.render(
     <CityMap walks={JanesWalk.walks} city={JanesWalk.city} />,
     document.getElementById('jw-map')
   ); */
});


},{"./CityMap.jsx":2,"./WalkFilter.jsx":5}],2:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isWalkLeader(member) {
  // Check if their role contains leader, or their type does
  return member.role && member.role.indexOf('leader') > -1 || member.type && member.type.indexOf('leader') > -1;
}

// Date formatter
var dtfDate = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });

var CityMap = (function (_React$Component) {
  _inherits(CityMap, _React$Component);

  function CityMap() {
    _classCallCheck(this, CityMap);

    _get(Object.getPrototypeOf(CityMap.prototype), 'constructor', this).call(this);

    this.infoNode = document.createElement('div');
    this.state = { map: null };
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

      var infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });

      // Grab starting point of each walk
      this.props.walks.forEach(function (walk) {
        var latlng = undefined;
        var marker = undefined;
        var startTime = walk.time.slots.length > 0 && walk.time.slots[0][0] * 1000;
        var twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
        var icon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeWeight: 1,
          strokeColor: '#f16725',
          fillOpacity: 0.7,
          fillColor: '#f16725'
        };

        // Check that it starts at latest 2 days ago
        if (walk.time.slots.length > 0 && startTime > twoDaysAgo) {
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
              var upcoming = walk.time.slots.filter(function (slot) {
                // Get all the future walks
                return slot[0] * 1000 > twoDaysAgo;
              });
              date = React.createElement(
                'h6',
                null,
                React.createElement('i', { className: 'fa fa-calendar' }),
                ' ',
                upcoming.map(function (slot) {
                  return dtfDate.format(slot[0] * 1000);
                }).join(', ')
              );
            } catch (e) {
              // Just log this, but don't die
              console.error('Failed to parse walk time.');
            }

            // Setup infowindow
            React.render(React.createElement(InfoWindow, _extends({
              key: walk.id
            }, Object.assign({}, walk, { date: date, leaders: leaders }))), this.infoNode);

            // Center the marker and display its info window
            infoWindow.setMap(map);
            map.panTo(marker.getPosition());
            infoWindow.setContent(this.infoNode);
            infoWindow.open(map, marker);
          });
        }
      });

      // Play nice with bootstrap tabs
      $('a[href="#jw-map"]').on('shown.bs.tab', function (e) {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(cityLatLng);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'cityMap', style: { width: '100%', height: '600px' } });
    }
  }]);

  return CityMap;
})(React.Component);

exports['default'] = CityMap;

var InfoWindow = (function (_React$Component2) {
  _inherits(InfoWindow, _React$Component2);

  function InfoWindow() {
    _classCallCheck(this, InfoWindow);

    _get(Object.getPrototypeOf(InfoWindow.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(InfoWindow, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        React.createElement(
          'h4',
          { style: { marginBottom: '0.1em' } },
          this.props.title
        ),
        this.props.date,
        React.createElement(
          'h6',
          null,
          'Led by: ',
          this.props.leaders.join(', ')
        ),
        React.createElement(
          'p',
          null,
          this.props.shortDescription,
          ' ',
          React.createElement(
            'a',
            { href: this.props.url, target: '_blank' },
            'Read More'
          )
        )
      );
    }
  }]);

  return InfoWindow;
})(React.Component);

module.exports = exports['default'];


},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
/**
 * The cards showing your walk
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
        return React.createElement(
          'div',
          { className: 'empty' },
          React.createElement(
            'h4',
            null,
            t('Keep looking.')
          ),
          React.createElement(
            'p',
            null,
            t('We couldn\'t find any matching walks.')
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          this.props.walks.map(function (walk) {
            return React.createElement(Card, { walk: walk });
          })
        );
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
        return React.createElement(
          'li',
          { className: 'tag', 'data-toggle': 'tooltip', 'data-theme': theme, title: (0, _ThemesJs.getThemeName)(theme) },
          React.createElement('i', { className: 'fa ' + (0, _ThemesJs.getThemeIcon)(theme) })
        );
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
        LedBy = React.createElement(
          'h6',
          null,
          'Walk led by ' + leaders.map(function (v) {
            return v['name-first'] + ' ' + v['name-last'];
          }).join(', ')
        );
      }

      if (this.state.past) {
        Status = React.createElement(
          'div',
          { className: 'statusMessage' },
          'Ended'
        );
      }

      return React.createElement(
        'div',
        { className: 'walk' },
        React.createElement(
          'a',
          { href: walk.url },
          React.createElement(
            'div',
            { className: 'thumbnail' },
            React.createElement(
              'div',
              { className: 'walkimage ' + placeholder, style: { backgroundImage: 'url(' + Thumb + ')' } },
              Status
            ),
            React.createElement(
              'div',
              { className: 'caption' },
              React.createElement(
                'h4',
                null,
                (walk.title || '').slice(0, 45)
              ),
              React.createElement(
                'ul',
                { className: 'when' },
                this.state.startTimes.map(function (startTime) {
                  return React.createElement(
                    'li',
                    null,
                    React.createElement('i', { className: 'fa fa-calendar' }),
                    ' ',
                    startTime
                  );
                }),
                React.createElement(
                  'li',
                  null,
                  'Meet at ',
                  Meeting
                )
              ),
              LedBy,
              React.createElement(
                'p',
                null,
                (walk.shortDescription || '').slice(0, 140)
              )
            ),
            React.createElement(
              'ul',
              { className: 'list-inline tags' },
              Tags
            )
          )
        )
      );
    }
  }]);

  return Card;
})(React.Component);

module.exports = exports['default'];


},{"./Themes.js":3}],5:[function(require,module,exports){
/**
 * Filters, lists, maps, the whole shebang
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _WalkCardsJsx = require('./WalkCards.jsx');

var _WalkCardsJsx2 = _interopRequireDefault(_WalkCardsJsx);

var _WalkListJsx = require('./WalkList.jsx');

var _WalkListJsx2 = _interopRequireDefault(_WalkListJsx);

var _CityMapJsx = require('./CityMap.jsx');

var _CityMapJsx2 = _interopRequireDefault(_CityMapJsx);

// TODO: replace placeholder translate with real one.
// Not doing this now because we'd need to build multiple translators for blocks vs site
var t = function t(s) {
  return s;
};
var offset = new Date().getTimezoneOffset();

var WalkFilter = (function (_React$Component) {
  _inherits(WalkFilter, _React$Component);

  function WalkFilter(props) {
    var _this = this;

    _classCallCheck(this, WalkFilter);

    _get(Object.getPrototypeOf(WalkFilter.prototype), 'constructor', this).call(this, props);
    this.state = {
      walks: props.walks || [],
      city: props.city,
      filters: props.filters || {},
      filterMatches: props.walks || [],
      dateRange: [null, null]
    };

    this.handleFilters();

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
    key: 'handleFilters',
    value: function handleFilters() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ filterMatches: _this2.state.walks.slice() });
      }, 1);
    }
  }, {
    key: 'setFilter',
    value: function setFilter(filter, val) {
      var filters = this.state.filters;
      filters[filter].selected = val;

      this.setState({
        filters: filters,
        filterMatches: this.state.walks.filter(function (walk) {
          // TODO: cleanup and perf test
          if (filters.theme && filters.theme.selected && !walk.checkboxes['theme-' + filters.theme.selected] || filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected || filters.accessibility && filters.accessibility.selected && !walk.checkboxes['accessible-' + filters.accessibility.selected] || filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1) {
            return false;
          }
          return true;
        })
      });
    }
  }, {
    key: 'setDateRange',
    value: function setDateRange(from, to) {
      this.setState({ dateRange: [from, to] });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var TabMap = undefined;
      var TabBlog = undefined;
      var CityMapSection = undefined;

      var Filters = Object.keys(this.state.filters).map(function (key) {
        var filter = _this3.state.filters[key];
        return React.createElement(
          'li',
          { key: 'filter' + key },
          React.createElement(
            'label',
            null,
            filter.name
          ),
          React.createElement(
            'select',
            { name: key, value: filter.selected, onChange: function (e) {
                return _this3.setFilter(key, e.target.value);
              } },
            React.createElement(
              'option',
              { value: '' },
              'All'
            ),
            Object.keys(filter.data).map(function (k) {
              return React.createElement(
                'option',
                { value: k },
                filter.data[k]
              );
            })
          )
        );
      });

      // See if this city has a location set
      if (this.state.city && this.state.city.latlng.length === 2) {
        TabMap = React.createElement(
          'li',
          { key: 'tabmap' },
          React.createElement(
            'a',
            { href: '#jw-map', 'data-toggle': 'tab' },
            'Map'
          )
        );
        CityMapSection = React.createElement(
          'section',
          { className: 'tab-pane', id: 'jw-map' },
          React.createElement(_CityMapJsx2['default'], { walks: this.state.filterMatches, city: this.state.city })
        );
      }

      // Blog link, if we have one
      if (this.state.blog) {
        TabBlog = React.createElement(
          'li',
          { key: 'tb' },
          React.createElement(
            'a',
            { href: this.state.blog },
            'Blog'
          )
        );
      }

      return React.createElement(
        'section',
        { className: 'ccm-block-page-list-walk-filters' },
        React.createElement(
          'div',
          { className: 'walk-filters' },
          React.createElement(
            'ul',
            { className: 'filters' },
            Filters,
            React.createElement(
              'li',
              null,
              React.createElement(
                'label',
                null,
                'Dates'
              ),
              React.createElement(DateRange, { value: this.dateRange, onChange: this.setDateRange.bind(this) })
            )
          ),
          React.createElement(
            'ul',
            { className: 'nav nav-tabs' },
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#jw-cards', 'data-toggle': 'tab' },
                'All Walks'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#jw-list', 'data-toggle': 'tab' },
                'List'
              )
            ),
            TabMap,
            TabBlog
          ),
          React.createElement(
            'div',
            { className: 'tab-content' },
            React.createElement(
              'section',
              { className: 'tab-pane', id: 'jw-cards' },
              React.createElement(_WalkCardsJsx2['default'], { walks: this.state.filterMatches })
            ),
            React.createElement(
              'section',
              { className: 'tab-pane', id: 'jw-list' },
              React.createElement(_WalkListJsx2['default'], { walks: this.state.filterMatches })
            ),
            CityMapSection
          )
        )
      );
    }
  }]);

  return WalkFilter;
})(React.Component);

exports['default'] = WalkFilter;

var DateRange = (function (_React$Component2) {
  _inherits(DateRange, _React$Component2);

  function DateRange() {
    _classCallCheck(this, DateRange);

    _get(Object.getPrototypeOf(DateRange.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var $to = $(React.findDOMNode(this.refs.to));
      var $from = $(React.findDOMNode(this.refs.from));
      var df = 'yy-mm-dd';

      var toTime = undefined;
      var fromTime = undefined;

      $from.datepicker({
        defaultDate: '+1w',
        changeMonth: true,
        dateFormat: df,
        onClose: function onClose(selectedDate) {
          fromTime = $.datepicker.parseDate(df, selectedDate) - offset;
          $to.datepicker('option', 'minDate', selectedDate);
          _this4.props.onChange(fromTime, toTime);
        }
      });

      $to.datepicker({
        defaultDate: '+5w',
        changeMonth: true,
        dateFormat: df,
        onClose: function onClose(selectedDate) {
          toTime = $.datepicker.parseDate(df, selectedDate) - offset;
          $from.datepicker('option', 'minDate', selectedDate);
          _this4.props.onChange(fromTime, toTime);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'fieldset',
        { className: 'daterange' },
        React.createElement('input', { type: 'text', ref: 'from', placeholder: 'From' }),
        React.createElement('input', { type: 'text', ref: 'to', placeholder: 'To' })
      );
    }
  }]);

  return DateRange;
})(React.Component);

module.exports = exports['default'];


},{"./CityMap.jsx":2,"./WalkCards.jsx":4,"./WalkList.jsx":6}],6:[function(require,module,exports){
/**
 * The list of walks to order
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.addWalkListEvents = addWalkListEvents;

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
      return React.createElement(
        'table',
        { className: 'walklist table' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              t('Date')
            ),
            React.createElement(
              'th',
              null,
              t('Time')
            ),
            React.createElement(
              'th',
              null,
              t('Title')
            ),
            React.createElement(
              'th',
              null,
              t('Meeting Place')
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          walks.map(function (walk) {
            return React.createElement(ListItem, { walk: walk });
          })
        )
      );
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

      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          this.state.startDate
        ),
        React.createElement(
          'td',
          null,
          this.state.startTime
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { href: this.props.walk.url, target: '_blank' },
            this.props.walk.title
          )
        ),
        React.createElement(
          'td',
          null,
          Meeting
        )
      );
    }
  }]);

  return ListItem;
})(React.Component);

function addWalkListEvents() {
  var walkList = document.querySelector('#jw-list .walklist');
  var walkBody = walkList.querySelector('tbody');
  var sortOptions = walkList.querySelectorAll('thead th');
  var walkElements = walkList.querySelectorAll('tbody tr');

  for (var i = 0, len = sortOptions.length; i < len; i++) {
    sortOptions[i].index = i;
    sortOptions[i].walkElements = walkElements;

    sortOptions[i].onclick = function (ev) {
      var walkElements = this.walkElements;
      var walks = [];
      if (this.classList.contains('sort')) {
        for (var currentWalks = walkBody.querySelectorAll('tr'), _i = currentWalks.length - 1; _i >= 0; _i--) {
          walkBody.appendChild(currentWalks[_i]);
        }
        this.classList.toggle('reverse');
      } else {
        for (var _i2 = 0, _len = walkElements.length; _i2 < _len; _i2++) {
          walks.push(walkElements[_i2]);
          walks[_i2].index = this.index;
        }

        walks.sort(function (a, b) {
          var aEl = a.querySelectorAll('td')[a.index];
          var bEl = b.querySelectorAll('td')[b.index];
          if (aEl.dataset.sort) {
            return parseInt(aEl.dataset.sort) - parseInt(bEl.dataset.sort);
          } else {
            return aEl.textContent.localeCompare(bEl.textContent);
          }
        });

        for (var _i3 = 0, _len2 = walks.length; _i3 < _len2; _i3++) {
          walkBody.appendChild(walks[_i3]);
        }

        // Clear the sort arrows, set to the new one
        for (var _i4 = 0, _len3 = sortOptions.length; _i4 < _len3; _i4++) {
          sortOptions[_i4].classList.remove('sort', 'reverse');
        }
        this.classList.add('sort');
      }
    };
  }

  // Sort by the first column, by default
  sortOptions[0].dispatchEvent(new MouseEvent('click'));
}

/*

                */


},{}]},{},[1]);
