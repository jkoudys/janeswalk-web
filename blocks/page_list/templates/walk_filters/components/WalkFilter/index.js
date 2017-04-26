/**
 * Filters, lists, maps, the whole shebang
 * TODO: this could seriously use some fluxing.
 */
import { createElement as ce, Component } from 'react';
import t from 'es2015-i18n-tag';
import { thirdRecentDateRange } from 'janeswalk/utils/recentdates';
import { printElement } from 'janeswalk/utils/print';
import { Set as iSet } from 'immutable';
import moment from 'moment';

// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

import WalkCards from './WalkCards';
import WalkList from './WalkList';
import LocationMap from './LocationMap';
import FilterList from './FilterList';

/**
 * Apply filters and date range to walks
 */
const filterMethods = {
  theme: ({ themes = [] }, selected) => themes.includes(selected),
  ward: ({ wards = [] }, selected) => wards.includes(selected),
  accessibility: ({ accessibles = [] }, selected) => accessibles.includes(selected),
  initiative: ({ initiatives = [] }, selected) => initiatives.includes(selected),

  city({ cityID }, selected) {
    return +cityID === +selected;
  },

  dateRange([nextInSeconds], [start, end]) {
    const time = nextInSeconds && nextInSeconds * 1000;
    const afterStart = !start || start <= time;
    const beforeEnd = !end || time <= end;

    return afterStart && beforeEnd;
  },

  typeahead({ title = '', longDescription = '', shortDescription = '', team = [] }, q = '') {
    // Don't filter out until minimum length query reached
    if (q.length < 3) return true;

    const teamNames = team.reduce((a, { name }) => (a + name), '');

    return `${title} ${longDescription} ${shortDescription} ${teamNames}`.match(new RegExp(q, 'i'));
  },
};

const buildState = () => ({
  city: CityStore.getCity(),
  filters: CityStore.getFilters(),
  outings: WalkStore.getWalkOutings(),
});

export default class WalkFilter extends Component {
  state = {
    ...buildState(),
    // Start date at 3 days ago
    dateRange: [moment.utc().subtract(3, 'days')],
    typeahead: '',
    selectedFilters: {},
    displayFilters: true,
  };

  componentWillMount() {
    CityStore.addChangeListener(this.onChange);
    WalkStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    this.setState({ menuOptions: this.menuOptions });
  }

  componentWillUnmount() {
    CityStore.removeChangeListener(this.onChange);
    WalkStore.removeChangeListener(this.onChange);
  }

  onChange = () => this.setState(buildState);

  // Toggle whether or not the filters were showing
  handleToggleFilters = () => this.setState({ displayFilters: !this.state.displayFilters });

  // Send the list of walks to the printer
  printList = () => printElement(ce(WalkList, { outings: this.getFiltered() }));

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

  setFilter = (key, option) => this.setState({
    selectedFilters: {
      ...this.state.selectedFilters,
      [key]: option,
    },
  });

  getFiltered = () => {
    const { outings = [], selectedFilters, dateRange, typeahead } = this.state;
    // Only apply filters that are set
    const appliedFilters = Object.entries(selectedFilters).filter(([, v]) => v);

    return outings.filter(({ walk, slot }) => {
      for (const [k, selected] of appliedFilters) {
        if (!filterMethods[k](walk, selected)) return false;
      }
      if (!filterMethods.dateRange(slot, dateRange)) return false;
      if (!filterMethods.typeahead(walk, typeahead)) return false;

      return true;
    });
  };

  render() {
    const {
      displayFilters,
      dateRange,
      typeahead,
      city: { latlng: [lat, lng] = [] } = {},
      filters = {},
      outings,
    } = this.state;

    const {
      disabledStartDate,
      disabledEndDate,
      handleStartDate,
      handleEndDate,
      setFilter,
    } = this;

    let locationMapSection;
    const filterMatches = this.getFiltered(outings);

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
            ce('i', { className: `fa fa-chevron-${displayFilters ? 'down' : 'right'}` }, t`Filters`),
          ),
          ce('a', { className: 'print-button', onClick: this.printList },
            ce('i', { className: 'fa fa-print' }, t`Print List`),
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
