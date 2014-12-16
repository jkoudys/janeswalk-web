(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: get browserify-shim working and `React = require('react');`
document.addEventListener('DOMContentLoaded', function() {
  var PageListTypeahead = React.createClass({displayName: 'PageListTypeahead',
    mixins: [React.addons.LinkedStateMixin],
    
    getInitialState: function() {
      return {
        q: '',
        city: {
          name: '',
          url: ''
        }
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

    componentWillMount: function() {
      if (this.props.user && this.props.user.city) {
        this.setState({city: this.props.user.city});
      } else {
        // Get geolocation from in-browser cache
        var storedGeo = sessionStorage.getItem('geoip');
        if (storedGeo) {
          this.setState({city: JSON.parse(storedGeo)});
        } else {
          // Geocode as early as we can
          $.ajax({
            url: 'http://freegeoip.net/json/',
            success: function(data) {
              var city = this.state.city;
              city.name = data.city;
              // Loop through loaded cities and find page match
              for (var i in this.props.countries) {
                var country = this.props.countries[i];
                if (this.strContains(country.name, data.country_name)) {
                  this.setState({city: country});
                  country.cities.forEach(function(city) {
                    if (this.strContains(city.name, data.city)) {
                      this.setState({city: city});
                      sessionStorage.setItem('geoip', JSON.stringify(city));
                    }
                  }.bind(this))
                }
              }
            }.bind(this)
          });
        }
      }
    },

    render: function() {
      var countries = [];
      var homeCity = React.createElement("h3", null);
      var linkTo = false;
      for (var i in this.props.countries) {
        var country = this.props.countries[i];
        var cities = [];
        country.cities.forEach(function(city) {
          if ((function(str){
            return !this.state.q ||
              (this.convertAccents(str).toLowerCase().indexOf(
               this.convertAccents(this.state.q.toLowerCase())) > - 1)
          }.bind(this))(city.name)) {
            if (!linkTo) { linkTo = city.url; }
            cities.push(
              React.createElement("li", {key: 'city' + city.id}, 
                React.createElement("a", {href: city.url}, city.name)
              )
            );
          }
        }.bind(this));
        if (cities.length) {
          countries.push(
            React.createElement("li", {key: 'country' + i, className: "country"}, 
              React.createElement("a", {href: country.url}, country.name), 
              React.createElement("ul", {className: "cities"}, 
                cities
              )
            )
          );
        }
      }

      if (!countries.length) {
        linkTo = CCM_REL + '/information/cities';
        countries.push(
          React.createElement("li", {className: "country"}, 
            "Add ", React.createElement("a", {href: linkTo}, this.state.q), " as a new city?"
          )
        );
      }

      if (this.state.city.name) {
        homeCity = React.createElement("h3", null, "See walks in ", React.createElement("a", {href: this.state.city.url}, this.state.city.name), ", or:")
      }

      return (
        React.createElement("div", {className: "ccm-page-list-typeahead"}, 
          homeCity, 
          React.createElement("form", {action: linkTo}, 
            React.createElement("fieldset", {className: "search"}, 
              React.createElement("input", {type: "text", name: "selected_option", className: "typeahead", placeholder: "Start typing a city", autoComplete: "off", valueLink: this.linkState('q')}), 
              React.createElement("button", {type: "submit"}, "Go"), 
              React.createElement("ul", null, 
                countries ||
                    React.createElement("li", null, 
                      React.createElement("a", {href: "/city-organizer-onboarding"}, "Add ", this.state.q, " to Jane's Walk")
                    )
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
