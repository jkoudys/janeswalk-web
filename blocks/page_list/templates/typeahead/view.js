(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: get browserify-shim working and `React = require('react');`
document.addEventListener('DOMContentLoaded', function() {
  var PageListTypeahead = React.createClass({displayName: 'PageListTypeahead',
    getInitialState: function() {
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
    convertAccents: function(str) {
      return str.replace(
        /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
        function(str,a,c,e,i,n,o,s,u,y,ae) {
          if(a) return 'a';
          else if(c) return 'c';
          else if(e) return 'e';
          else if(i) return 'i';
          else if(n) return 'n';
          else if(o) return 'o';
          else if(s) return 's';
          else if(u) return 'u';
          else if(y) return 'y';
          else if(ae) return 'ae';
        }
      );
    },

    /**
     * Detect if one string contains another, accent-folded
     * @param string a haystack
     * @param string b needle
     */
    strContains: function(a, b) {
      return (
        this.convertAccents(a.toLowerCase()).indexOf(
          this.convertAccents(b.toLowerCase())
        ) > -1
      );
    },

    /**
     * Called when typing in the input
     * @param ReactEvent ev
     */
    handleInput: function(ev) {
      var _this = this;
      var countries = [];
      var q = ev.target.value;

      // Loop through all countries and build a list of cities which match
      this.props.countries.forEach(function(country) {
        var cities = [];
        country.cities.forEach(function(city) {
          if (!q || _this.strContains(city.name, q)) {
            cities.push(city);
          }
        });
        // Avoid including countries which have no matching cities
        if (cities.length) {
          countries.push(Object.assign({}, country, {cities: cities}));
        }
      });

      this.setState({q: q, matched: countries});
    },

    /**
     * Form action links the top selected city
     * @param ReactEvent ev
     */
    handleSubmit: function(ev) {
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

    renderCity: function(city) {
      return (
        React.createElement("li", {key: 'city' + city.id}, 
          React.createElement("a", {href: city.url}, city.name)
        )
      )
    },

    renderCountry: function(country) {
      return (
        React.createElement("li", {key: 'country' + country.id, className: "country"}, 
          React.createElement("a", {href: country.url}, country.name), 
          React.createElement("ul", {className: "cities"}, 
            country.cities.map(this.renderCity)
          )
        )
      );

    },

    render: function() {
      var _this = this;
      var homeCity = React.createElement("h3", null);

      if (this.props.user && this.props.user.city) {
        homeCity = React.createElement("h3", null, "See walks in ", React.createElement("a", {href: this.props.user.city.url}, this.props.user.city.name), ", or:")
      }

      return (
        React.createElement("div", {className: "ccm-page-list-typeahead"}, 
          homeCity, 
          React.createElement("form", {onSubmit: this.handleSubmit}, 
            React.createElement("fieldset", {className: "search"}, 
              React.createElement("input", {type: "text", name: "selected_option", className: "typeahead", placeholder: "Start typing a city", autoComplete: "off", value: this.state.q, onChange: this.handleInput}), 
              React.createElement("button", {type: "submit"}, "Go"), 
              React.createElement("ul", null, 
                this.state.matched.map(this.renderCountry), 
                this.state.matched.length === 0 ?
                  React.createElement("li", null, React.createElement("a", {href: "/city-organizer-onboarding"}, 'Add ' + _this.state.q + ' to Jane\'s Walk')) :
                  null
                
              )
            )
          )
        )
      );
    }
  });

  // Alternate render of these same cities as a select, primarily for mobile
  // TODO: use ReactRouter for loading either, not c5 blocks directly
  var PageListSelect = React.createClass({displayName: 'PageListSelect',
    getInitialState: function() {
      return {
        selected: null,
        countries: this.props.countries.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        })
      };
    },

    handleChange: function(ev) {
      this.setState({selected: ev.target.value}, function() {
        React.findDOMNode(this.refs.form).submit();
      });
    },

    renderCity: function(city) {
      return (
        React.createElement("option", {value: city.url, key: 'city' + city.id}, 
          city.name
        )
      );
    },

    renderCountry: function(country) {
      return (
        React.createElement("optgroup", {key: 'country' + country.id, className: "country", label: country.name}, 
          country.cities.map(this.renderCity)
        )
      );
    },

    render: function() {
      var _this = this;
      var homeCity = React.createElement("h3", null);

      if (this.props.user && this.props.user.city) {
        homeCity = React.createElement("h3", null, "See walks in ", React.createElement("a", {href: this.props.user.city.url}, this.props.user.city.name), ", or:")
      }

      return (
        React.createElement("div", {className: "ccm-page-list-typeahead"}, 
          homeCity, 
          React.createElement("form", {ref: "form", onSubmit: this.handleSubmit, action: this.state.selected}, 
            React.createElement("fieldset", {className: "search"}, 
              React.createElement("select", {value: this.state.selected, onChange: this.handleChange}, 
                React.createElement("option", {value: "", disabled: true, selected: true}, "Choose your city"), 
                this.state.countries.map(this.renderCountry)
              )
            )
          )
        )
      );
    }
  });

  // Mobile should stick to standard form elements, so it can style its widget
  // TODO: ReactRouter this
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    React.render(
      React.createElement(PageListSelect, {countries: JanesWalk.countries, user: JanesWalk.user}),
      document.getElementById('ccm-jw-page-list-typeahead')
    );
  } else {
    React.render(
      React.createElement(PageListTypeahead, {countries: JanesWalk.countries, user: JanesWalk.user}),
      document.getElementById('ccm-jw-page-list-typeahead')
    );
  }
});

},{}]},{},[1]);
