// TODO: get browserify-shim working and `React = require('react');`
document.addEventListener('DOMContentLoaded', function() {
  var PageListTypeahead = React.createClass({
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
      var homeCity = <h3 />;
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
              <li key={'city' + city.id}>
                <a href={city.url}>{city.name}</a>
              </li>
            );
          }
        }.bind(this));
        if (cities.length) {
          countries.push(
            <li key={'country' + i} className="country">
              <a href={country.url}>{country.name}</a>
              <ul className="cities">
                {cities}
              </ul>
            </li>
          );
        }
      }

      if (!countries.length) {
        linkTo = CCM_REL + '/information/cities';
        countries.push(
          <li className="country">
            Add <a href={linkTo}>{this.state.q}</a> as a new city?
          </li>
        );
      }

      if (this.state.city.name) {
        homeCity = <h3>See walks in <a href={this.state.city.url}>{this.state.city.name}</a>, or:</h3>
      }

      return (
        <div className="ccm-page-list-typeahead">
          {homeCity}
          <form action={linkTo}>
            <fieldset className="search">
              <input type="text" name="selected_option" className="typeahead" placeholder="Start typing a city" autoComplete="off" valueLink={this.linkState('q')} />
              <button type="submit">Go</button>
              <ul>
                {countries ||
                    <li>
                      <a href="/city-organizer-onboarding">Add {this.state.q} to Jane's Walk</a>
                    </li>}
              </ul>
            </fieldset>
          </form>
        </div>
      );
    }
  });

  React.render(
    <PageListTypeahead countries={JanesWalk.countries} user={JanesWalk.user} />,
    document.getElementById('ccm-jw-page-list-typeahead')
  );
});
