(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: get browserify-shim working and `React = require('react');`
'use strict';

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

document.addEventListener('DOMContentLoaded', function () {
  var PageListTypeahead = React.createClass({
    displayName: 'PageListTypeahead',

    getInitialState: function getInitialState() {
      return {
        q: '',
        matched: this.props.countries
      };
    },

    /**
     * Fold accent-characters into their accentless character
     * @param     String str
     * @return    String
     */
    convertAccents: function convertAccents(str) {
      return str.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function (str, a, c, e, i, n, o, s, u, y, ae) {
        if (a) return 'a';else if (c) return 'c';else if (e) return 'e';else if (i) return 'i';else if (n) return 'n';else if (o) return 'o';else if (s) return 's';else if (u) return 'u';else if (y) return 'y';else if (ae) return 'ae';
      });
    },

    /**
     * Detect if one string contains another, accent-folded
     * @param string a haystack
     * @param string b needle
     */
    strContains: function strContains(a, b) {
      return this.convertAccents(a.toLowerCase()).indexOf(this.convertAccents(b.toLowerCase())) > -1;
    },

    /**
     * Called when typing in the input
     * @param ReactEvent ev
     */
    handleInput: function handleInput(ev) {
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
    },

    /**
     * Form action links the top selected city
     * @param ReactEvent ev
     */
    handleSubmit: function handleSubmit(ev) {
      var firstCountry = this.state.matched[0];
      var firstCity;

      // If there's a matching city, that's the URL we go to
      if (firstCountry) {
        firstCity = firstCountry.cities[0];
        if (firstCity) {
          ev.target.action = firstCity.url;
        }
      }
    },

    renderCity: function renderCity(city) {
      return {
        $$typeof: _typeofReactElement,
        type: 'li',
        key: 'city' + city.id,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'a',
            key: null,
            ref: null,
            props: {
              children: city.name,
              href: city.url
            },
            _owner: null
          }
        },
        _owner: null
      };
    },

    renderCountry: function renderCountry(country) {
      return {
        $$typeof: _typeofReactElement,
        type: 'li',
        key: 'country' + country.id,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'a',
            key: null,
            ref: null,
            props: {
              children: country.name,
              href: country.url
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'ul',
            key: null,
            ref: null,
            props: {
              children: country.cities.map(this.renderCity),
              className: 'cities'
            },
            _owner: null
          }],
          className: 'country'
        },
        _owner: null
      };
    },

    render: function render() {
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
                      children: [this.state.matched.map(this.renderCountry), this.state.matched.length === 0 ? {
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
  });

  // Alternate render of these same cities as a select, primarily for mobile
  // TODO: use ReactRouter for loading either, not c5 blocks directly
  var PageListSelect = React.createClass({
    displayName: 'PageListSelect',

    getInitialState: function getInitialState() {
      return {
        selected: null,
        countries: this.props.countries.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
      };
    },

    handleChange: function handleChange(ev) {
      this.setState({ selected: ev.target.value }, function () {
        React.findDOMNode(this.refs.form).submit();
      });
    },

    renderCity: function renderCity(city) {
      return {
        $$typeof: _typeofReactElement,
        type: 'option',
        key: 'city' + city.id,
        ref: null,
        props: {
          children: city.name,
          value: city.url
        },
        _owner: null
      };
    },

    renderCountry: function renderCountry(country) {
      return {
        $$typeof: _typeofReactElement,
        type: 'optgroup',
        key: 'country' + country.id,
        ref: null,
        props: {
          children: country.cities.map(this.renderCity),
          className: 'country',
          label: country.name
        },
        _owner: null
      };
    },

    render: function render() {
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
  });

  // Mobile should stick to standard form elements, so it can style its widget
  // TODO: ReactRouter this
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
