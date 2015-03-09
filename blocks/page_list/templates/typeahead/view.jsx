// TODO: get browserify-shim working and `React = require('react');`
document.addEventListener('DOMContentLoaded', function() {
  var PageListTypeahead = React.createClass({
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
        firstCity = firstCountry[0].cities[0];
        if (firstCity) {
          ev.target.action = firstCity.url;
        }
      }
    },

    renderCity: function(city) {
      return (
        <li key={'city' + city.id}>
          <a href={city.url}>{city.name}</a>
        </li>
      )
    },

    renderCountry: function(country) {
      return (
        <li key={'country' + country.id} className="country">
          <a href={country.url}>{country.name}</a>
          <ul className="cities">
            {country.cities.map(this.renderCity)}
          </ul>
        </li>
      );

    },

    render: function() {
      var _this = this;
      var homeCity = <h3 />;

      if (this.props.user && this.props.user.city) {
        homeCity = <h3>See walks in <a href={this.props.user.city.url}>{this.props.user.city.name}</a>, or:</h3>
      }

      return (
        <div className="ccm-page-list-typeahead">
          {homeCity}
          <form onSubmit={this.handleSubmit}>
            <fieldset className="search">
              <input type="text" name="selected_option" className="typeahead" placeholder="Start typing a city" autoComplete="off" value={this.state.q} onChange={this.handleInput} />
              <button type="submit">Go</button>
              <ul>
                {this.state.matched.map(this.renderCountry)}
                {this.state.matched.length === 0 ?
                  <li><a href="/city-organizer-onboarding">{'Add ' + _this.state.q + ' to Jane\'s Walk'}</a></li> :
                  null
                }
              </ul>
            </fieldset>
          </form>
        </div>
      );
    }
  });

  // Alternate render of these same cities as a select, primarily for mobile
  // TODO: use ReactRouter for loading either, not c5 blocks directly
  var PageListSelect = React.createClass({
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
      debugger;
        this.refs.form;
      });
    },

    renderCity: function(city) {
      return (
        <option value={city.url} key={'city' + city.id}>
          {city.name}
        </option>
      );
    },

    renderCountry: function(country) {
      return (
        <optgroup key={'country' + country.id} className="country" label={country.name}>
          {country.cities.map(this.renderCity)}
        </optgroup>
      );
    },

    render: function() {
      var _this = this;
      var homeCity = <h3 />;

      if (this.props.user && this.props.user.city) {
        homeCity = <h3>See walks in <a href={this.props.user.city.url}>{this.props.user.city.name}</a>, or:</h3>
      }

      return (
        <div className="ccm-page-list-typeahead">
          {homeCity}
          <form ref="form" onSubmit={this.handleSubmit} action={this.state.selected}>
            <fieldset className="search">
              <select value={this.state.selected} onChange={this.handleChange}>
                <option value="" disabled selected>Choose your city</option>
                {this.state.countries.map(this.renderCountry)}
              </select>
            </fieldset>
          </form>
        </div>
      );
    }
  });

  // Mobile should stick to standard form elements, so it can style its widget
  // TODO: ReactRouter this
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    React.render(
      <PageListSelect countries={JanesWalk.countries} user={JanesWalk.user} />,
      document.getElementById('ccm-jw-page-list-typeahead')
    );
  } else {
    React.render(
      <PageListTypeahead countries={JanesWalk.countries} user={JanesWalk.user} />,
      document.getElementById('ccm-jw-page-list-typeahead')
    );
  }
});
