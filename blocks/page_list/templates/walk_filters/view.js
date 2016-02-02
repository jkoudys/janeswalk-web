/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _LocationMap = __webpack_require__(2);

	var _LocationMap2 = _interopRequireDefault(_LocationMap);

	var _WalkFilter = __webpack_require__(3);

	var _WalkFilter2 = _interopRequireDefault(_WalkFilter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A set of walk filters, to filter on properties. Also includes
	 * the tabs, like 'list' and 'map/
	 */

	var _walks = undefined;
	var _location = undefined;

	JanesWalk.event.on('walks.receive', function (walks, props) {
	  _walks = walks;
	  React.render(React.createElement(_WalkFilter2.default, { walks: walks, filters: props.filters, location: _location }), document.getElementById('janeswalk-walk-filters'));
	});

	JanesWalk.event.on('city.receive', function (city) {
	  return _location = city;
	});
	JanesWalk.event.on('country.receive', function (country) {
	  return _location = country;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The map of upcoming walks for a whole city
	 */

	// Helper to see if a member is a walk leader
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
	      if (walk.map && Array.isArray(walk.map.markers) && walk.map.markers.length > 0) {
	        latlng = new google.maps.LatLng(walk.map.markers[0].lat, walk.map.markers[0].lng);
	      } else if (walk.map && Array.isArray(walk.map.route) && walk.map.route.length > 0) {
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
	          date = React.createElement(
	            'h6',
	            null,
	            React.createElement('i', { className: 'fa fa-calendar' }),
	            ' ',
	            walk.time.slots.map(function (slot) {
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

	var CityMap = function (_React$Component) {
	  _inherits(CityMap, _React$Component);

	  function CityMap() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, CityMap);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CityMap)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.state = { map: null, markers: {} };
	    return _this;
	  }

	  _createClass(CityMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props$location = this.props.location;
	      var zoomlevel = _props$location.zoomlevel;
	      var latlng = _props$location.latlng;

	      var locationLatLng = new google.maps.LatLng(latlng[0], latlng[1]);

	      // Setup map
	      var map = new google.maps.Map(React.findDOMNode(this), {
	        center: locationLatLng,
	        zoom: zoomlevel || 10,
	        backgroundColor: '#d7f0fa',
	        scrollwheel: false
	      });

	      // Play nice with bootstrap tabs
	      $('a[href="#jw-map"]').on('shown.bs.tab', function (e) {
	        google.maps.event.trigger(map, 'resize');
	        map.setCenter(locationLatLng);
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
	      return React.createElement('div', { className: 'cityMap', style: { width: '100%', height: '600px' } });
	    }
	  }]);

	  return CityMap;
	}(React.Component);

	exports.default = CityMap;

	var InfoWindow = function InfoWindow(_ref) {
	  var title = _ref.title;
	  var url = _ref.url;
	  var date = _ref.date;
	  var shortDescription = _ref.shortDescription;
	  var leaders = _ref.leaders;
	  return React.createElement(
	    'span',
	    null,
	    React.createElement(
	      'h4',
	      { style: { marginBottom: '0.1em' } },
	      title
	    ),
	    date,
	    React.createElement(
	      'h6',
	      null,
	      'Led by: ',
	      leaders.join(', ')
	    ),
	    React.createElement(
	      'p',
	      null,
	      shortDescription,
	      ' ',
	      React.createElement(
	        'a',
	        { href: url, target: '_blank' },
	        'Read More'
	      )
	    )
	  );
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WalkCards = __webpack_require__(4);

	var _WalkCards2 = _interopRequireDefault(_WalkCards);

	var _WalkList = __webpack_require__(6);

	var _WalkList2 = _interopRequireDefault(_WalkList);

	var _LocationMap = __webpack_require__(2);

	var _LocationMap2 = _interopRequireDefault(_LocationMap);

	var _DateRange = __webpack_require__(7);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _Tabs = __webpack_require__(8);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Filters, lists, maps, the whole shebang
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
	    // Filter by checking that the filter doesn't match the walk
	    // Note that this would be a lot cleaner using functions, but it's
	    // built with a big set of basic boolean operators to speed it up
	    // along this likely bottleneck
	    if (filters.theme && filters.theme.selected && !walk.checkboxes['theme-' + filters.theme.selected] || filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected || filters.accessibility && filters.accessibility.selected && !walk.checkboxes['accessible-' + filters.accessibility.selected] || filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1 || filters.city && filters.city.selected && walk.cityID != filters.city.selected || dr[0] && dr[0] > time || dr[1] && dr[1] < time) {
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

	//"cityID":258,

	var Filter = function Filter(_ref) {
	  var name = _ref.name;
	  var selected = _ref.selected;
	  var setFilter = _ref.setFilter;
	  var data = _ref.data;
	  return React.createElement(
	    'li',
	    null,
	    React.createElement(
	      'label',
	      null,
	      name
	    ),
	    React.createElement(
	      'select',
	      { value: selected, onChange: function onChange(e) {
	          return setFilter(e.target.value);
	        } },
	      React.createElement(
	        'option',
	        { value: '' },
	        'All'
	      ),
	      Object.keys(data).map(function (k) {
	        return React.createElement(
	          'option',
	          { value: k },
	          data[k]
	        );
	      })
	    )
	  );
	};

	var WalkFilter = function (_React$Component) {
	  _inherits(WalkFilter, _React$Component);

	  function WalkFilter(props) {
	    _classCallCheck(this, WalkFilter);

	    var thirdDate = thirdRecentDate(props.walks);
	    var dateRange = [today.getTime(), null];
	    if (thirdDate && thirdDate < today) {
	      dateRange[0] = thirdDate.getTime();
	    }

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkFilter).call(this, props));

	    _this.state = {
	      walks: props.walks || [],
	      location: props.location,
	      filters: props.filters || {},
	      dateRange: dateRange,
	      filterMatches: filterWalks(props.walks, props.filters, dateRange)
	    };

	    // Setup event listeners
	    JanesWalk.event.on('walks.receive', function (walks, props) {
	      _this.setState({ walks: walks, filters: props.filters }, _this.handleFilters);
	    });

	    JanesWalk.event.on('city.receive', function (city) {
	      return _this.setState({ location: city });
	    });
	    JanesWalk.event.on('blog.receive', function (blog) {
	      return _this.setState({ blog: blog });
	    });
	    JanesWalk.event.on('country.receive', function (country) {
	      return _this.setState({ location: country });
	    });
	    return _this;
	  }

	  _createClass(WalkFilter, [{
	    key: 'setFilter',
	    value: function setFilter(filter, val) {
	      var _state = this.state;
	      var filters = _state.filters;
	      var walks = _state.walks;
	      var dateRange = _state.dateRange;

	      filters[filter].selected = val;
	      this.setState({ filters: filters, filterMatches: filterWalks(walks, filters, dateRange) });
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
	      React.render(React.createElement(_WalkList2.default, { walks: this.state.filterMatches }), el);
	      window.focus();
	      win.document.body.appendChild(el);
	      win.print();
	      win.close();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var locationMapSection = undefined;

	      var displayFilters = this.state.displayFilters;

	      var Filters = Object.keys(this.state.filters).map(function (key) {
	        return React.createElement(Filter, _extends({ key: key }, _this2.state.filters[key], { setFilter: function setFilter(v) {
	            return _this2.setFilter(key, v);
	          } }));
	      });

	      // See if this city has a location set
	      if (this.state.location && this.state.location.latlng.length === 2) {
	        locationMapSection = React.createElement(
	          'section',
	          { className: 'tab-pane', id: 'jw-map' },
	          React.createElement(_LocationMap2.default, { walks: this.state.filterMatches, location: this.state.location })
	        );
	      }

	      var AllFilters = React.createElement(
	        'section',
	        null,
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
	            React.createElement(_DateRange2.default, { value: this.state.dateRange, onChange: this.setDateRange.bind(this) })
	          )
	        )
	      );

	      return React.createElement(
	        'section',
	        { className: 'ccm-block-page-list-walk-filters' },
	        React.createElement(
	          'div',
	          { className: 'walk-filters' },
	          React.createElement(
	            'a',
	            { className: 'filter-header', onClick: function onClick() {
	                _this2.setState({ displayFilters: !displayFilters });
	              } },
	            React.createElement('i', { className: displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right' }),
	            'Filters'
	          ),
	          React.createElement(
	            'a',
	            { className: 'print-button', onClick: function onClick() {
	                return _this2.printList();
	              } },
	            React.createElement('i', { className: 'fa fa-print' }),
	            ' Print List'
	          ),
	          displayFilters ? AllFilters : null
	        ),
	        React.createElement(
	          'div',
	          { className: 'walks-area' },
	          React.createElement(_WalkCards2.default, { walks: this.state.filterMatches }),
	          locationMapSection
	        )
	      );
	    }
	  }]);

	  return WalkFilter;
	}(React.Component);

	exports.default = WalkFilter;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * The cards showing your walk
	                                                                                                                                                                                                                                                   */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Theme = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var t = function t(s) {
	  return s;
	};

	var dtfDate = undefined;
	// Date formatter
	if ((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object') {
	  dtfDate = new Intl.DateTimeFormat('en-US', {
	    year: 'numeric',
	    month: 'long',
	    day: 'numeric',
	    hour: 'numeric',
	    minute: '2-digit',
	    timeZone: 'UTC'
	  });
	}

	var WalkCards = function (_React$Component) {
	  _inherits(WalkCards, _React$Component);

	  function WalkCards() {
	    _classCallCheck(this, WalkCards);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(WalkCards).apply(this, arguments));
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
	          { className: 'walkCards' },
	          this.props.walks.map(function (walk) {
	            return React.createElement(Card, { walk: walk });
	          })
	        );
	      }
	    }
	  }]);

	  return WalkCards;
	}(React.Component);

	exports.default = WalkCards;

	var Card = function (_React$Component2) {
	  _inherits(Card, _React$Component2);

	  function Card(props) {
	    _classCallCheck(this, Card);

	    var formatter = undefined;
	    var past = undefined;
	    var yesterday = new Date();
	    yesterday.setDate(yesterday.getDate() - 1);

	    // Format the start date upfront, since that's expensive

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Card).call(this, props));

	    if (dtfDate) {
	      formatter = function formatter(slot) {
	        return dtfDate.format(slot[0] * 1000);
	      };
	    } else {
	      formatter = function formatter(slot) {
	        var date = new Date(slot[0] * 1000);
	        var dateString = date.toUTCString();
	        return dateString.slice(0, dateString.indexOf(' GMT'));
	      };
	    }

	    if (props.walk.time.slots.length) {
	      past = props.walk.time.slots[0][0] * 1000 < yesterday.getTime();
	    }

	    _this2.state = {
	      startTimes: props.walk.time.slots.map(formatter),
	      past: past
	    };
	    return _this2;
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
	          { className: 'tag', 'data-toggle': 'tooltip', 'data-theme': theme, title: (0, _Theme.getThemeName)(theme) },
	          React.createElement('i', { className: 'fa ' + (0, _Theme.getThemeIcon)(theme) })
	        );
	      });

	      // Build the optional elements
	      if (walk.thumbnails.length) {
	        Thumb = walk.thumbnails[0].url;
	      }

	      /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
	      if (walk.map && walk.map.markers && walk.map.markers.length) {
	        Meeting = walk.map.markers[0].title || walk.map.markers[0].description;
	      }

	      if (leaders.length) {
	        LedBy = React.createElement(
	          'span',
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
	        { className: 'walk-card' },
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
	                'p',
	                null,
	                (walk.shortDescription || '').slice(0, 140)
	              )
	            ),
	            React.createElement(
	              'ul',
	              { className: 'when' },
	              this.state.startTimes.map(function (startTime) {
	                return React.createElement(
	                  'li',
	                  null,
	                  startTime
	                );
	              }),
	              React.createElement(
	                'li',
	                null,
	                'Meet at ',
	                Meeting
	              ),
	              React.createElement(
	                'li',
	                null,
	                LedBy
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
	}(React.Component);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getThemeName = getThemeName;
	exports.getThemeIcon = getThemeIcon;
	var icons = exports.icons = {
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

	/**
	 * Helpers, to deal with that 'theme-' prefix from the v1 json
	 */
	function getThemeName(theme) {
	  return (icons[theme.slice(6)] || { name: '' }).name;
	}

	function getThemeIcon(theme) {
	  return 'fa-' + (icons[theme.slice(6)] || { icon: '' }).icon;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The list of walks to order
	 */

	var dtfDate = undefined;
	var dtfTime = undefined;

	var t = function t(s) {
	  return s;
	};

	// Date formatter
	if ((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object') {
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

	/**
	 * The walk list
	 */

	exports.default = function (_ref) {
	  var walks = _ref.walks;
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
	};

	var ListItem = function (_React$Component) {
	  _inherits(ListItem, _React$Component);

	  function ListItem(props) {
	    _classCallCheck(this, ListItem);

	    var formatter = undefined;

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).call(this, props));

	    if (props.walk.time.slots.length) {
	      var time = props.walk.time.slots[0][0] * 1000;

	      _this.state = {
	        startDate: dtfDate.format(time),
	        startTime: dtfTime.format(time)
	      };
	    }
	    return _this;
	  }

	  _createClass(ListItem, [{
	    key: 'render',
	    value: function render() {
	      var Meeting = undefined;
	      var walk = this.props.walk;

	      /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
	      if (walk.map && walk.map.markers && walk.map.markers.length) {
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
	}(React.Component);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Date Range
	 * a jQueryUI based React component for picking a to/from date range
	 */

	var df = 'yy-mm-dd';
	var offset = new Date().getTimezoneOffset();
	var oneDay = 24 * 60 * 60 * 1000;

	var DateRange = function (_React$Component) {
	  _inherits(DateRange, _React$Component);

	  function DateRange(props) {
	    _classCallCheck(this, DateRange);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateRange).call(this, props));

	    if (Array.isArray(props.value) && props.value.length === 2) {
	      _this.state = {
	        from: props.value[0] ? $.datepicker.formatDate(df, new Date(props.value[0] + offset)) : '',
	        to: props.value[1] ? $.datepicker.formatDate(df, new Date(props.value[1] + offset)) : '',
	        fromInt: props.value[0] ? props.value[0] + offset : '',
	        toInt: props.value[1] ? props.value[1] + offset : ''
	      };
	    } else {
	      _this.state = { from: '', to: '' };
	    }
	    return _this;
	  }

	  _createClass(DateRange, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

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
	          _this2.setState({ from: selectedDate });
	          _this2.props.onChange(fromTime, toTime);
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
	          _this2.setState({ to: selectedDate });
	          _this2.props.onChange(fromTime, toTime);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'fieldset',
	        { className: 'daterange' },
	        React.createElement('input', { type: 'text', ref: 'from', placeholder: 'From', defaultValue: this.state.from }),
	        React.createElement('input', { type: 'text', ref: 'to', placeholder: 'To', defaultValue: this.state.to })
	      );
	    }
	  }]);

	  return DateRange;
	}(React.Component);

	exports.default = DateRange;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var blog = _ref.blog;
	  var location = _ref.location;

	  var tabBlog = undefined;
	  var tabMap = undefined;

	  if (blog) {
	    tabBlog = React.createElement(
	      "li",
	      { key: "tb" },
	      React.createElement(
	        "a",
	        { href: blog.url, target: "_blank" },
	        "Blog"
	      )
	    );
	  }

	  if (location && location.latlng.length === 2) {
	    tabMap = React.createElement(
	      "li",
	      { key: "maptab" },
	      React.createElement(
	        "a",
	        { href: "#jw-map", "data-toggle": "tab" },
	        "Map"
	      )
	    );
	  }

	  return React.createElement(
	    "ul",
	    { className: "nav nav-tabs" },
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { href: "#jw-cards", className: "active", "data-toggle": "tab" },
	        "All Walks"
	      )
	    ),
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { href: "#jw-list", "data-toggle": "tab" },
	        "List"
	      )
	    ),
	    tabMap,
	    tabBlog
	  );
	};

/***/ }
/******/ ]);