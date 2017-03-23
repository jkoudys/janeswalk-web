/**
 * Filters, lists, maps, the whole shebang
 * TODO: this could seriously use some fluxing.
 */
import { createElement as ce, Component } from 'react';
import { render } from 'react-dom';
import t from 'es2015-i18n-tag';
import { thirdRecentDateRange } from 'janeswalk/utils/recentdates';
import { printElement } from 'janeswalk/utils/print';
import { Set as iSet } from 'immutable';

// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

import WalkCards from './WalkCards';
import WalkList from './WalkList';
import LocationMap from './LocationMap';
import Filter from './Filter';
import FilterList from './FilterList';

/**
 * Apply filters and date range to walks
 */
const filters = {
  theme: ({ themes }, selected) => themes[selected],
  ward: ({ wards }, selected) => (wards === selected),
  theme: ({ accessibles }, selected) => accessibles[selected],
  initiative: ({ initiatives }, selected) => initiatives.includes(selected),

  city({ cityID }, selected) {
    return +cityID === +selected;
  },

  dateRange({ slots: [[nextInSeconds] = []] = [] }, [start, end]) {
    const time = nextInSeconds && nextInSeconds * 1000;

    // Exclude walks with no time set, if searching on time
    if (!time) return false;

    return start <= nextInSeconds || nextInSeconds <= end;
  },

  typeahead({ title = '', longDescription = '', shortDescription = '', team }, q = '') {
    // Don't filter out until minimum length query reached
    if (q.length < 3) return true;

    const teamNames = team.reduce((a, { name }) => `${a} ${name}`, '');

    return `${title} ${longDescription} ${shortDescription} ${teamNames}`.match(new RegExp(q, 'i'));
  },
};

export default class WalkFilter extends Component {
  state = {
    dateRange: [],
    typeahead: '',
  };

  // Toggle whether or not the filters were showing
  handleToggleFilters = () => this.setState({ displayFilters: !this.state.displayFilters });

  // Send the list of walks to the printer
  printList = () => printElement(ce(WalkList, { outings: this.state.filterMatches }));

  // Set our date range filter
  handleStartDate = (from) => {
    const { dateRange: [, to] } = this.state;
    this.setState({ dateRange: [from, to] });
  };

  handleEndDate = (to) => {
    const { dateRange: [from] } = this.state;
    this.setState({ dateRange: [from, to] });
  };

  disabledStartDate = (startValue) => {
    const [, endValue] = this.state.dateRange;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const [startValue] = this.state.dateRange;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  // Typeahead search in the walks
  handleTypeahead = ({ target: { value: typeahead } }) => this.setState({ typeahead });

  render() {
    const {
      displayFilters,
      dateRange,
      typeahead,
    } = this.state;

    const {
      city: { latlng: [lat, lng] = [] } = CityStore.getCity() || {},
    } = this.props;

    const {
      disabledStartDate,
      disabledEndDate,
      handleStartDate,
      handleEndDate,
      setFilter,
    } = this;

    let locationMapSection;
// FIXME
    const filterMatches = [];

    // See if this city has a location set
    if (lat && lng) {
      locationMapSection = (
        ce('section', { className: 'tab-pane', id: 'jw-map' },
          ce(LocationMap, { outings: filterMatches, coordinates: [lng, lat] }),
        )
      );
    }

    return (
      ce('section', { className: 'ccm-block-page-list-walk-filters' },
        ce('div', { className: 'walk-filters' },
          ce('a', { className: 'filter-header', onClick: this.handleToggleFilters },
            ce('i', { className: displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right' }, 'Filters'),
          ),
          ce('a', { className: 'print-button', onClick: this.printList },
            ce('i', { className: 'fa fa-print' }, 'Print List'),
          ),
          displayFilters ? ce(FilterList, {
            disabledStartDate,
            disabledEndDate,
            dateRange,
            filters: Object.entries(filters),
            handleStartDate,
            handleEndDate,
            setFilter,
          }) : null,
        ),
        ce('div', { className: 'walk-typeahead' },
          ce('input', {
            type: 'text',
            value: typeahead,
            placeholder: t`Search in Walks below`,
            onChange: this.handleTypeahead,
          }),
        ),
        ce('div', { className: 'walks-area' },
          ce(WalkCards, { outings: filterMatches }),
          locationMapSection,
        )
      )
    );
  }
}
