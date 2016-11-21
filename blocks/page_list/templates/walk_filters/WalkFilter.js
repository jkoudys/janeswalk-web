/* global React ReactDOM */
/**
 * Filters, lists, maps, the whole shebang
 * TODO: this could seriously use some fluxing.
 */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import WalkCards from './WalkCards';
import WalkList from './WalkList';
import LocationMap from './LocationMap';
import DateRange from './DateRange';
import Filter from './Filter';

// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

const { Component, createElement: ce } = React;

// Actually a little before today
const today = new Date();
today.setUTCDate(today.getDate());
today.setUTCHours(0, 0, 0);

/**
 * Apply filters and date range to walks
 */
const filterWalks = ({ outings, filters, dateRange, city, typeahead = '' }) => outings.filter(({ walk, slot }) => {
  // Convert PHP second-epoch to JS milliseconds epoch
  const time = slot[0] * 1000;

  // TODO: cleanup and perf test
  // Filter by checking that the filter doesn't match the walk
  // Note that this would be a lot cleaner using functions, but it's
  // built with a big set of basic boolean operators to speed it up
  // along this likely bottleneck
  if ((filters.theme && filters.theme.selected && !(walk.checkboxes[`theme-${filters.theme.selected}`])) ||
      (filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected) ||
      (filters.accessibility && filters.accessibility.selected && !(walk.checkboxes[`accessible-${filters.accessibility.selected}`])) ||
      (filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1) ||
      (city && +walk.cityID !== +city.id) ||
      (filters.city && filters.city.selected && +walk.cityID !== +filters.city.selected) ||
      (dateRange[0] && dateRange[0] > time) || (dateRange[1] && dateRange[1] < time) ||
      (typeahead.length > 3 && !(walk.title + walk.longDescription + walk.shortDescription + walk.team.map(m => `${m['name-first']} ${m['name-last']}`).join('')).match(new RegExp(typeahead, 'i')))
   ) {
    return false;
  }
  return true;
});

/**
 * Grab the day the 3rd most recent walk appears on
 */
function thirdRecentDate(outings) {
  if (outings.length) {
    const lastThree = outings.slice(-3);
    // Find the day the walk starts
    if (lastThree[0].slot) {
      const lastDate = new Date(lastThree[0].slot[0] * 1000);
      lastDate.setUTCHours(0);
      lastDate.setUTCMinutes(0);
      return lastDate;
    }
  }
  return null;
}

function thirdRecentDateRange(outings) {
  const thirdDate = thirdRecentDate(outings);
  if (thirdDate && thirdDate < today) {
    return [thirdDate.getTime(), null];
  }
  return [today, null];
}

const getWalkFilterState = ({ filters: filters = {}, typeahead, dateRange, city: city = CityStore.getCity() }) => {
  const outings = WalkStore.getWalkOutings();
  const usefulRange = dateRange || thirdRecentDateRange(outings);

  return {
    outings,
    filters,
    city,
    dateRange: usefulRange,
    filterMatches: filterWalks({ outings, filters, dateRange: usefulRange, city, typeahead }),
  };
};

export default class WalkFilter extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: getWalkFilterState(props),

      // Stores are updated
      _onChange: () => {
        this.setState(getWalkFilterState(this.state));
      },

      // Toggle whether or not the filters were showing
      handleToggleFilters: () => {
        this.setState({ displayFilters: !this.state.displayFilters });
      },

      // Send the list of walks to the printer
      printList: () => {
        const win = window.open();
        const el = win.document.createElement('div');
        ReactDOM.render(<WalkList outings={this.state.filterMatches} />, el);
        window.focus();
        win.document.body.appendChild(el);
        win.print();
        win.close();
      },

      // Set a filter value
      setFilter: (filter, val) => {
        const { filters, outings, dateRange, typeahead, city } = this.state;
        if (!filters[filter]) filters[filter] = {};
        Object.assign(filters[filter], { selected: val });
        this.setState({ filters, filterMatches: filterWalks({ outings, filters, dateRange, city, typeahead }) });
      },

      // Set our date range filter
      setDateRange: (from, to) => {
        const { outings, filters, city, typeahead } = this.state;
        this.setState({
          dateRange: [from, to],
          filterMatches: filterWalks({ outings, filters, dateRange: [from, to], city, typeahead }),
        });
      },

      // Typeahead search in the walks
      handleTypeahead: ({ target: { value: typeahead } }) => {
        const { filters, outings, dateRange, city } = this.state;
        this.setState({ typeahead, filterMatches: filterWalks({ filters, outings, dateRange, city, typeahead }) });
      },
    });
  }

  componentWillMount() {
    WalkStore.addChangeListener(this._onChange);
    CityStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    WalkStore.removeChangeListener(this._onChange);
    CityStore.removeChangeListener(this._onChange);
  }

  render() {
    let locationMapSection;

    const { displayFilters, city, filterMatches, dateRange, filters, typeahead } = this.state;

    const Filters = Object.keys(filters).map(
      key => ce(Filter, { key, setFilter: v => this.setFilter(key, v), ...filters[key] })
    );

    // See if this city has a location set
    if (city && city.latlng.length === 2) {
      locationMapSection = (
        ce('section', { className: 'tab-pane', id: 'jw-map' },
          ce(LocationMap, { outings: filterMatches, latlng: city.latlng }),
        )
      );
    }

    const AllFilters = (
      ce('section', null,
        ce('ul', { className: 'filters' },
          Filters,
          ce('li', null,
            ce('label', null, 'Dates'),
            ce(DateRange, { value: dateRange, onChange: this.setDateRange }),
          )
        )
      )
    );

    return (
      ce('section', { className: 'ccm-block-page-list-walk-filters' },
        ce('div', { className: 'walk-filters' },
          ce('a', { className: 'filter-header', onClick: this.handleToggleFilters },
            ce('i', { className: displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right' }, 'Filters'),
          ),
          ce('a', { className: 'print-button', onClick: this.printList },
            ce('i', { className: 'fa fa-print' }, 'Print List'),
          ),
          displayFilters ? AllFilters : null,
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