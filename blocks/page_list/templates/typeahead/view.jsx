import {t, t2} from 'janeswalk/stores/I18nStore';

/**
 * Fold accent-characters into their accentless character
 * @param     String str
 * @return    String
 */
function convertAccents(str) {
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
}

/**
 * Detect if one string contains another, accent-folded
 * @param string a haystack
 * @param string b needle
 */
const strContains = (a, b) => convertAccents(a.toLowerCase()).indexOf(convertAccents(b.toLowerCase())) > -1;

// Mobile should stick to standard form elements, so it can style its widget
// TODO: ReactRouter this
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const City = ({id, name, url}) => (
  <li key={'city' + id}>
    <a href={url}>{name}</a>
  </li>
);

const Country = ({id, name, url, cities}) => (
  <li key={'country' + id} className="country">
    <a href={url}>{name}</a>
    <ul className="cities">
      {cities.map(city => <City key={'city' + city.id} {...city} />)}
    </ul>
  </li>
);

class PageListTypeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      matched: props.countries
    };
  }

  /**
   * Called when typing in the input
   * @param ReactEvent ev
   */
  handleInput(q) {
    const countries = [];

    // Loop through all countries and build a list of cities which match
    this.props.countries.forEach(country => {
      const cities = country.cities.filter(city => !q || strContains(city.name, q));
      // Avoid including countries which have no matching cities
      if (cities.length) {
        countries.push(Object.assign({}, country, {cities: cities}));
      }
    });

    this.setState({q: q, matched: countries});
  }

  /**
   * Form action links the top selected city
   * @param ReactEvent ev
   */
  handleSubmit(ev) {
    let firstCountry = this.state.matched[0];
    let firstCity;

    // If there's a matching city, that's the URL we go to
    if (firstCountry) {
      firstCity = firstCountry.cities[0];
      if (firstCity) {
        this.setState({q: firstCity.name}, () => ev.target.action = firstCity.url);
      }
    }
  }

  render() {
    const {q, matched} = this.state;

    let homeCity = <h3 />;

    if (this.props.user && this.props.user.city) {
      homeCity = <h3>See walks in <a href={this.props.user.city.url}>{this.props.user.city.name}</a></h3>
    }

    return (
      <div className="ccm-page-list-typeahead">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <fieldset className="search">
            <input type="text" name="selected_option" className="typeahead" placeholder={t('Find citizen-led walks in your city')} autoComplete="off" value={this.state.q} onChange={ev => this.handleInput(ev.target.value)} />
            <button type="submit">Go</button>
            <ul>
              {matched.map(country => <Country {...country} />)}
              {matched.length === 0 ?
                <li><a href="/city-organizer-onboarding">{'Add ' + q + ' to Jane\'s Walk'}</a></li> :
                null
              }
            </ul>
          </fieldset>
        </form>
        {homeCity}
      </div>
    );
  }
}

// Alternate render of these same cities as a select, primarily for mobile
const CityOption = ({id, name, url}) => (
  <option value={url} key={'city' + id}>
    {name}
  </option>
);

const CountryOption = ({id, name, url, cities}) => (
  <optgroup key={'country' + id} className="country" label={name}>
    {cities.map(city => <CityOption {...city} />)}
  </optgroup>
);

class PageListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      countries: props.countries.sort((a, b) => a.name.localeCompare(b.name))
    };
  }

  handleChange(ev) {
    this.setState({selected: ev.target.value}, () => React.findDOMNode(this.refs.form).submit())
  }

  render() {
    const {user} = this.props;
    const {selected, countries} = this.state;
    let homeCity = <h3 />;

    if (user && user.city) {
      homeCity = <h3>See walks in <a href={user.city.url}>{user.city.name}</a>, or:</h3>
    }

    return (
      <div className="ccm-page-list-typeahead">
        {homeCity}
        <form ref="form" onSubmit={this.handleSubmit} action={selected}>
          <fieldset className="search">
            <select value={selected} onChange={this.handleChange}>
              <option value="" disabled selected>Choose your city</option>
              {countries.map(this.renderCountry)}
            </select>
          </fieldset>
        </form>
      </div>
    );
  }
}

// TODO: get browserify-shim working and `import React from 'react';`
document.addEventListener('DOMContentLoaded', function() {
  // TODO: use ReactRouter for loading either, not c5 blocks directly
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
