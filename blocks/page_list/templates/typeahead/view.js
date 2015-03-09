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
     * _convertAccents
     * 
     * @protected
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

    strContains: function(a, b) {
      return (
        this.convertAccents(a.toLowerCase()).indexOf(
          this.convertAccents(b.toLowerCase())
        ) > -1
      );
    },

    handleInput: function(ev) {
      var _this = this;
      var countries = {}; 

      for (var i in this.props.countries) {
        var country = this.props.countries[i];
        var cities = [];
        country.cities.forEach(function(city) {
          if (!_this.state.q || _this.strContains(city.name, _this.state.q)) {
            cities.push(city);
          }
        });
        if (cities.length) {
          countries[i] = Object.assign({}, country, {cities: cities});
        }
      }

      this.setState({q: ev.target.value, matched: countries});
    },

    handleSubmit: function(ev) {
      var firstCountry = Object.keys(this.state.matched).shift();
      var firstCity;

      if (firstCountry) {
        firstCity = this.state.matched[firstCountry].shift();
        if (firstCity) {
          ev.target.action = firstCity.url;
        }
      }
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
                Object.keys(this.state.matched).map(function(key) {
                  return (
                    React.createElement("li", {key: 'country' + key, className: "country"}, 
                      React.createElement("a", {href: _this.state.matched[key].url}, _this.state.matched[key].name), 
                      React.createElement("ul", {className: "cities"}, 
                        _this.state.matched[key].cities.map(function(city) {
                          return (
                            React.createElement("li", {key: 'city' + city.id}, 
                              React.createElement("a", {href: city.url}, city.name)
                            )
                            )
                        })
                      )
                    )
                    );
                }), 
                Object.keys(this.state.matched).length === 0 ?
                  React.createElement("li", null, React.createElement("a", {href: "/city-organizer-onboarding"}, 'Add ' + _this.state.q + ' to Jane\'s Walk')) :
                  null
                
              )
            )
          )
        )
      );
    }
  });

  React.render(
    React.createElement(PageListTypeahead, {countries: JanesWalk.countries, user: JanesWalk.user}),
    document.getElementById('ccm-jw-page-list-typeahead')
  );
});

},{}]},{},[1]);
