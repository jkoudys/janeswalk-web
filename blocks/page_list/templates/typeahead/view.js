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
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Fold accent-characters into their accentless character
	 * @param     String str
	 * @return    String
	 */
	function convertAccents(str) {
	  return str.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function (str, a, c, e, i, n, o, s, u, y, ae) {
	    if (a) return 'a';else if (c) return 'c';else if (e) return 'e';else if (i) return 'i';else if (n) return 'n';else if (o) return 'o';else if (s) return 's';else if (u) return 'u';else if (y) return 'y';else if (ae) return 'ae';
	  });
	}

	/**
	 * Detect if one string contains another, accent-folded
	 * @param string a haystack
	 * @param string b needle
	 */
	var strContains = function strContains(a, b) {
	  return convertAccents(a.toLowerCase()).indexOf(convertAccents(b.toLowerCase())) > -1;
	};

	// Mobile should stick to standard form elements, so it can style its widget
	// TODO: ReactRouter this
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	var City = function City(_ref) {
	  var id = _ref.id;
	  var name = _ref.name;
	  var url = _ref.url;
	  return React.createElement(
	    'li',
	    { key: 'city' + id },
	    React.createElement(
	      'a',
	      { href: url },
	      name
	    )
	  );
	};

	var Country = function Country(_ref2) {
	  var id = _ref2.id;
	  var name = _ref2.name;
	  var url = _ref2.url;
	  var cities = _ref2.cities;
	  return React.createElement(
	    'li',
	    { key: 'country' + id, className: 'country' },
	    React.createElement(
	      'a',
	      { href: url },
	      name
	    ),
	    React.createElement(
	      'ul',
	      { className: 'cities' },
	      cities.map(function (city) {
	        return React.createElement(City, _extends({ key: 'city' + city.id }, city));
	      })
	    )
	  );
	};

	var PageListTypeahead = (function (_React$Component) {
	  _inherits(PageListTypeahead, _React$Component);

	  function PageListTypeahead(props) {
	    _classCallCheck(this, PageListTypeahead);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PageListTypeahead).call(this, props));

	    _this.state = {
	      q: '',
	      matched: props.countries
	    };
	    return _this;
	  }

	  /**
	   * Called when typing in the input
	   * @param ReactEvent ev
	   */

	  _createClass(PageListTypeahead, [{
	    key: 'handleInput',
	    value: function handleInput(q) {
	      var countries = [];

	      // Loop through all countries and build a list of cities which match
	      this.props.countries.forEach(function (country) {
	        var cities = [];
	        country.cities.forEach(function (city) {
	          if (!q || strContains(city.name, q)) {
	            cities.push(city);
	          }
	        });
	        // Avoid including countries which have no matching cities
	        if (cities.length) {
	          countries.push(Object.assign({}, country, { cities: cities }));
	        }
	      });

	      this.setState({ q: q, matched: countries });
	    }

	    /**
	     * Form action links the top selected city
	     * @param ReactEvent ev
	     */

	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(ev) {
	      var firstCountry = this.state.matched[0];
	      var firstCity = undefined;

	      // If there's a matching city, that's the URL we go to
	      if (firstCountry) {
	        firstCity = firstCountry.cities[0];
	        if (firstCity) {
	          this.setState({ q: firstCity.name }, function () {
	            return ev.target.action = firstCity.url;
	          });
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _state = this.state;
	      var q = _state.q;
	      var matched = _state.matched;

	      var homeCity = React.createElement('h3', null);

	      if (this.props.user && this.props.user.city) {
	        homeCity = React.createElement(
	          'h3',
	          null,
	          'See walks in ',
	          React.createElement(
	            'a',
	            { href: this.props.user.city.url },
	            this.props.user.city.name
	          ),
	          ', or:'
	        );
	      }

	      return React.createElement(
	        'div',
	        { className: 'ccm-page-list-typeahead' },
	        homeCity,
	        React.createElement(
	          'form',
	          { onSubmit: function onSubmit(ev) {
	              return _this2.handleSubmit(ev);
	            } },
	          React.createElement(
	            'fieldset',
	            { className: 'search' },
	            React.createElement('input', { type: 'text', name: 'selected_option', className: 'typeahead', placeholder: 'Start typing a city', autoComplete: 'off', value: this.state.q, onChange: function onChange(ev) {
	                return _this2.handleInput(ev.target.value);
	              } }),
	            React.createElement(
	              'button',
	              { type: 'submit' },
	              'Go'
	            ),
	            React.createElement(
	              'ul',
	              null,
	              matched.map(function (country) {
	                return React.createElement(Country, country);
	              }),
	              matched.length === 0 ? React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '/city-organizer-onboarding' },
	                  'Add ' + q + ' to Jane\'s Walk'
	                )
	              ) : null
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return PageListTypeahead;
	})(React.Component);

	// Alternate render of these same cities as a select, primarily for mobile

	var CityOption = function CityOption(_ref3) {
	  var id = _ref3.id;
	  var name = _ref3.name;
	  var url = _ref3.url;
	  return React.createElement(
	    'option',
	    { value: url, key: 'city' + id },
	    name
	  );
	};

	var CountryOption = function CountryOption(_ref4) {
	  var id = _ref4.id;
	  var name = _ref4.name;
	  var url = _ref4.url;
	  var cities = _ref4.cities;
	  return React.createElement(
	    'optgroup',
	    { key: 'country' + id, className: 'country', label: name },
	    cities.map(function (city) {
	      return React.createElement(CityOption, city);
	    })
	  );
	};

	var PageListSelect = (function (_React$Component2) {
	  _inherits(PageListSelect, _React$Component2);

	  function PageListSelect(props) {
	    _classCallCheck(this, PageListSelect);

	    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PageListSelect).call(this, props));

	    _this3.state = {
	      selected: null,
	      countries: props.countries.sort(function (a, b) {
	        return a.name.localeCompare(b.name);
	      })
	    };
	    return _this3;
	  }

	  _createClass(PageListSelect, [{
	    key: 'handleChange',
	    value: function handleChange(ev) {
	      this.setState({ selected: ev.target.value }, function () {
	        React.findDOMNode(this.refs.form).submit();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var homeCity = React.createElement('h3', null);

	      if (this.props.user && this.props.user.city) {
	        homeCity = React.createElement(
	          'h3',
	          null,
	          'See walks in ',
	          React.createElement(
	            'a',
	            { href: this.props.user.city.url },
	            this.props.user.city.name
	          ),
	          ', or:'
	        );
	      }

	      return React.createElement(
	        'div',
	        { className: 'ccm-page-list-typeahead' },
	        homeCity,
	        React.createElement(
	          'form',
	          { ref: 'form', onSubmit: this.handleSubmit, action: this.state.selected },
	          React.createElement(
	            'fieldset',
	            { className: 'search' },
	            React.createElement(
	              'select',
	              { value: this.state.selected, onChange: this.handleChange },
	              React.createElement(
	                'option',
	                { value: '', disabled: true, selected: true },
	                'Choose your city'
	              ),
	              this.state.countries.map(this.renderCountry)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return PageListSelect;
	})(React.Component);

	// TODO: get browserify-shim working and `React = require('react');`

	document.addEventListener('DOMContentLoaded', function () {
	  // TODO: use ReactRouter for loading either, not c5 blocks directly
	  if (isMobile) {
	    React.render(React.createElement(PageListSelect, { countries: JanesWalk.countries, user: JanesWalk.user }), document.getElementById('ccm-jw-page-list-typeahead'));
	  } else {
	    React.render(React.createElement(PageListTypeahead, { countries: JanesWalk.countries, user: JanesWalk.user }), document.getElementById('ccm-jw-page-list-typeahead'));
	  }
	});

/***/ }
/******/ ]);