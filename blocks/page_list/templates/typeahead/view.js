(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Fold accent-characters into their accentless character
 * @param     String str
 * @return    String
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  return {
    $$typeof: _typeofReactElement,
    type: 'li',
    key: 'city' + id,
    ref: null,
    props: {
      children: {
        $$typeof: _typeofReactElement,
        type: 'a',
        key: null,
        ref: null,
        props: {
          children: name,
          href: url
        },
        _owner: null
      }
    },
    _owner: null
  };
};

var Country = function Country(_ref2) {
  var id = _ref2.id;
  var name = _ref2.name;
  var url = _ref2.url;
  var cities = _ref2.cities;
  return {
    $$typeof: _typeofReactElement,
    type: 'li',
    key: 'country' + id,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'a',
        key: null,
        ref: null,
        props: {
          children: name,
          href: url
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'ul',
        key: null,
        ref: null,
        props: {
          children: cities.map(function (city) {
            return React.createElement(City, _extends({ key: 'city' + city.id }, city));
          }),
          className: 'cities'
        },
        _owner: null
      }],
      className: 'country'
    },
    _owner: null
  };
};

var PageListTypeahead = (function (_React$Component) {
  _inherits(PageListTypeahead, _React$Component);

  function PageListTypeahead(props) {
    _classCallCheck(this, PageListTypeahead);

    _get(Object.getPrototypeOf(PageListTypeahead.prototype), 'constructor', this).call(this, props);
    this.state = {
      q: '',
      matched: props.countries
    };
  }

  // Alternate render of these same cities as a select, primarily for mobile

  /**
   * Called when typing in the input
   * @param ReactEvent ev
   */

  _createClass(PageListTypeahead, [{
    key: 'handleInput',
    value: function handleInput(ev) {
      var _this = this;
      var countries = [];
      var q = ev.target.value;

      // Loop through all countries and build a list of cities which match
      this.props.countries.forEach(function (country) {
        var cities = [];
        country.cities.forEach(function (city) {
          if (!q || _this.strContains(city.name, q)) {
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
      var firstCity;

      // If there's a matching city, that's the URL we go to
      if (firstCountry) {
        firstCity = firstCountry.cities[0];
        if (firstCity) {
          ev.target.action = firstCity.url;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;
      var homeCity = {
        $$typeof: _typeofReactElement,
        type: 'h3',
        key: null,
        ref: null,
        props: {},
        _owner: null
      };

      if (this.props.user && this.props.user.city) {
        homeCity = {
          $$typeof: _typeofReactElement,
          type: 'h3',
          key: null,
          ref: null,
          props: {
            children: ['See walks in ', {
              $$typeof: _typeofReactElement,
              type: 'a',
              key: null,
              ref: null,
              props: {
                children: this.props.user.city.name,
                href: this.props.user.city.url
              },
              _owner: null
            }, ', or:']
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
          children: [homeCity, {
            $$typeof: _typeofReactElement,
            type: 'form',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'fieldset',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'input',
                    key: null,
                    ref: null,
                    props: {
                      type: 'text',
                      name: 'selected_option',
                      className: 'typeahead',
                      placeholder: 'Start typing a city',
                      autoComplete: 'off',
                      value: this.state.q,
                      onChange: this.handleInput
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'button',
                    key: null,
                    ref: null,
                    props: {
                      children: 'Go',
                      type: 'submit'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'ul',
                    key: null,
                    ref: null,
                    props: {
                      children: [this.state.matched.map(function (country) {
                        return React.createElement(Country, country);
                      }), this.state.matched.length === 0 ? {
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
                              children: 'Add ' + _this.state.q + ' to Jane\'s Walk',
                              href: '/city-organizer-onboarding'
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      } : null]
                    },
                    _owner: null
                  }],
                  className: 'search'
                },
                _owner: null
              },
              onSubmit: this.handleSubmit
            },
            _owner: null
          }],
          className: 'ccm-page-list-typeahead'
        },
        _owner: null
      };
    }
  }]);

  return PageListTypeahead;
})(React.Component);

var CityOption = function CityOption(_ref3) {
  var id = _ref3.id;
  var name = _ref3.name;
  var url = _ref3.url;
  return {
    $$typeof: _typeofReactElement,
    type: 'option',
    key: 'city' + id,
    ref: null,
    props: {
      children: name,
      value: url
    },
    _owner: null
  };
};

var CountryOption = function CountryOption(_ref4) {
  var id = _ref4.id;
  var name = _ref4.name;
  var url = _ref4.url;
  var cities = _ref4.cities;
  return {
    $$typeof: _typeofReactElement,
    type: 'optgroup',
    key: 'country' + id,
    ref: null,
    props: {
      children: cities.map(function (city) {
        return React.createElement(CityOption, city);
      }),
      className: 'country',
      label: name
    },
    _owner: null
  };
};

var PageListSelect = (function (_React$Component2) {
  _inherits(PageListSelect, _React$Component2);

  function PageListSelect(props) {
    _classCallCheck(this, PageListSelect);

    _get(Object.getPrototypeOf(PageListSelect.prototype), 'constructor', this).call(this, props);
    this.state = {
      selected: null,
      countries: props.countries.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      })
    };
  }

  // TODO: get browserify-shim working and `React = require('react');`

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
      var homeCity = {
        $$typeof: _typeofReactElement,
        type: 'h3',
        key: null,
        ref: null,
        props: {},
        _owner: null
      };

      if (this.props.user && this.props.user.city) {
        homeCity = {
          $$typeof: _typeofReactElement,
          type: 'h3',
          key: null,
          ref: null,
          props: {
            children: ['See walks in ', {
              $$typeof: _typeofReactElement,
              type: 'a',
              key: null,
              ref: null,
              props: {
                children: this.props.user.city.name,
                href: this.props.user.city.url
              },
              _owner: null
            }, ', or:']
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
          children: [homeCity, React.createElement(
            'form',
            { ref: 'form', onSubmit: this.handleSubmit, action: this.state.selected },
            {
              $$typeof: _typeofReactElement,
              type: 'fieldset',
              key: null,
              ref: null,
              props: {
                children: {
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
                        children: 'Choose your city',
                        value: '',
                        disabled: true,
                        selected: true
                      },
                      _owner: null
                    }, this.state.countries.map(this.renderCountry)],
                    value: this.state.selected,
                    onChange: this.handleChange
                  },
                  _owner: null
                },
                className: 'search'
              },
              _owner: null
            }
          )],
          className: 'ccm-page-list-typeahead'
        },
        _owner: null
      };
    }
  }]);

  return PageListSelect;
})(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  // TODO: use ReactRouter for loading either, not c5 blocks directly
  if (isMobile) {
    React.render({
      $$typeof: _typeofReactElement,
      type: PageListSelect,
      key: null,
      ref: null,
      props: _defaultProps(PageListSelect.defaultProps, {
        countries: JanesWalk.countries,
        user: JanesWalk.user
      }),
      _owner: null
    }, document.getElementById('ccm-jw-page-list-typeahead'));
  } else {
    React.render({
      $$typeof: _typeofReactElement,
      type: PageListTypeahead,
      key: null,
      ref: null,
      props: _defaultProps(PageListTypeahead.defaultProps, {
        countries: JanesWalk.countries,
        user: JanesWalk.user
      }),
      _owner: null
    }, document.getElementById('ccm-jw-page-list-typeahead'));
  }
});


},{}]},{},[1]);
