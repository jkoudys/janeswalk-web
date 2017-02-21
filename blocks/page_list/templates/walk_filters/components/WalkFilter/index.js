/**
 * Filters, lists, maps, the whole shebang
 * TODO: this could seriously use some fluxing.
 */
import { createElement as ce, Component } from 'react';
import { render } from 'react-dom';
import t from 'es2015-i18n-tag';

// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

import WalkCards from './WalkCards';
import WalkList from './WalkList';
import LocationMap from './LocationMap';
import Filter from './Filter';
import FilterList from './FilterList';

import { thirdRecentDateRange } from '../../utils/recentdates';

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

const getWalkFilterState = ({ filters = {}, typeahead, dateRange, city = CityStore.getCity() }) => {
  const outings = WalkStore.getWalkOutings();
  const usefulRange = dateRange || thirdRecentDateRange(outings);

  return {
    outings,
    filters,
    city,
    dateRange: usefulRange,
  };
};

export default class WalkFilter extends Component {
  // FIXME: remove this state-building with props
  constructor(props) {
    super(props);
    this.state = getWalkFilterState(props);
  }

  // Stores are updated
  _onChange = () => {
    this.setState(getWalkFilterState(this.state));
  };

  // Toggle whether or not the filters were showing
  handleToggleFilters = () => {
    this.setState({ displayFilters: !this.state.displayFilters });
  };

  // Send the list of walks to the printer
  printList = () => {
    const win = window.open();
    const el = win.document.createElement('div');
    render(ce(WalkList, { outings: this.state.filterMatches }), el);
    window.focus();
    win.document.body.appendChild(el);
    win.print();
    win.close();
  };

  // Set a filter value
  setFilter = (filter, val) => {
    const { filters, outings, dateRange, typeahead, city } = this.state;
    this.setState({
      filters: {
        ...filters,
        [filter]: {
          ...filters[filter],
          selected: val,
        },
      },
    });
  };

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
  handleTypeahead = ({ target: { value: typeahead } }) => {
    const { filters, outings, dateRange, city } = this.state;
    this.setState({ typeahead  });
  };

  componentWillMount() {
    WalkStore.addChangeListener(this._onChange);
    CityStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    WalkStore.removeChangeListener(this._onChange);
    CityStore.removeChangeListener(this._onChange);
  }

  render() {
    const {
      displayFilters,
      city: { latlng: [lat, lng] = [] } = {},
      filterMatches,
      dateRange,
      filters,
      typeahead,
    } = this.state;
    const {
      disabledStartDate,
      disabledEndDate,
      handleStartDate,
      handleEndDate,
      setFilter,
    } = this;

    let locationMapSection;

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
