/* global React ReactDOM JanesWalk */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce, Component } = React;
const { startups, event } = JanesWalk;

/**
 * Fold accent-characters into their accentless character
 * @param     String str
 * @return    String
 */
function convertAccents(str) {
  return str.replace(
    /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
    (str, a, c, e, i, n, o, s, u, y, ae) => {
      if (a) return 'a';
      else if (c) return 'c';
      else if (e) return 'e';
      else if (i) return 'i';
      else if (n) return 'n';
      else if (o) return 'o';
      else if (s) return 's';
      else if (u) return 'u';
      else if (y) return 'y';
      else if (ae) return 'ae';
      return undefined;
    }
  );
}

/**
 * Detect if one string contains another, accent-folded
 * @param string a haystack
 * @param string b needle
 */
const strContains = (a, b) => convertAccents(a.toLowerCase()).indexOf(convertAccents(b.toLowerCase())) > -1;

const City = ({ id, name, url }) => (
  ce('li', { key: `city${id}` },
    ce('a', { href: url }, name),
  )
);

const Country = ({ id, name, url, cities }) => (
  ce('li', { key: `country${id}`, className: 'country' },
    ce('a', { href: url }, name),
    ce('ul', { className: 'cities' },
      cities.map(city => ce(City, { key: `city${city.id}`, ...city })),
    ),
  )
);

class PageListTypeahead extends Component {
  constructor(props) {
    super(props);
    Object.assign(this, {
      state: {
        q: '',
        matched: props.countries,
      },

      /**
       * Called when typing in the input
       * @param ReactEvent ev
       */
      handleInput: ({ target: { value: q } }) => {
        const countries = [];

        // Loop through all countries and build a list of cities which match
        this.props.countries.forEach(country => {
          const cities = country.cities.filter(city => !q || strContains(city.name, q));
          // Avoid including countries which have no matching cities
          if (cities.length) {
            countries.push(Object.assign({}, country, { cities }));
          }
        });

        this.setState({ q, matched: countries });
      },

      /**
       * Form action links the top selected city
       * @param ReactEvent ev
       */
      handleSubmit: (ev) => {
        const firstCountry = this.state.matched[0];
        ev.persist();

        // If there's a matching city, that's the URL we go to
        if (firstCountry) {
          const firstCity = firstCountry.cities[0];
          if (firstCity) {
            this.setState({ q: firstCity.name }, () => { ev.target.action = firstCity.url; });
          }
        }
      },
    });
  }

  render() {
    const { q, matched } = this.state;
    const { user } = this.props;

    let homeCity = ce('h3');

    if (user && user.city) {
      homeCity = ce('h3', null, 'See walks in ', ce('a', { href: user.city.url }, user.city.name));
    }

    return (
      ce('div', { className: 'ccm-page-list-typeahead' },
        ce('form', { onSubmit: this.handleSubmit },
          ce('fieldset', { className: 'search' },
            ce('input', {
              type: 'text',
              name: 'selected_option',
              className: 'typeahead',
              placeholder: t`Find citizen-led walks in your city`,
              autoComplete: 'off',
              value: this.state.q,
              onChange: this.handleInput,
            }),
            ce('button', { type: 'submit' }, 'Go'),
            ce('ul', null,
              matched.map(country => ce(Country, { key: country.id, ...country })),
              matched.length === 0 ?
                ce('li', null,
                  ce('a', { href: '/city-organizer-onboarding' }, t`Add ${q} to Jane's Walk`),
                ) :
                null
            ),
          )
        ),
        homeCity,
      )
    );
  }
}

// TODO: get browserify-shim working and `import React from 'react';`
startups.dom.then(() => {
  const { user } = JanesWalk;
  event.on('countries.receive', countries => ReactDOM.render(
    ce(PageListTypeahead, { countries, user }),
    document.getElementById('ccm-jw-page-list-typeahead')
  ));
});
