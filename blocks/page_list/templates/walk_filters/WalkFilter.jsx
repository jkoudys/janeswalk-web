/* global React ReactDOM */
/**
 * Filters, lists, maps, the whole shebang
 * TODO: this could seriously use some fluxing.
 */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import WalkCards from './WalkCards.jsx';
import WalkList from './WalkList.jsx';
import LocationMap from './LocationMap.jsx';
import DateRange from './DateRange.jsx';
import Filter from './Filter.jsx';

// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

// Actually a little before today
const today = new Date();
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
      (filters.city && filters.city.selected && walk.cityID != filters.city.selected) ||
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

export default class WalkFilter extends React.Component {
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
      key => <Filter key={key} setFilter={v => this.setFilter(key, v)} {...filters[key]} />
    );

    // See if this city has a location set
    if (city && city.latlng.length === 2) {
      locationMapSection = (
        <section className="tab-pane" id="jw-map">
          <LocationMap outings={filterMatches} latlng={city.latlng} />
        </section>
      );
    }

    const AllFilters = (
      <section>
        <ul className="filters">
          {Filters}
          <li>
            <label>Dates</label>
            <DateRange value={dateRange} onChange={this.setDateRange} />
          </li>
        </ul>
      </section>
    );

    return (
      <section className="ccm-block-page-list-walk-filters">
        <div className="walk-filters">
          <a className="filter-header" onClick={this.handleToggleFilters}>
            <i className={displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right'} /> Filters
          </a>
          <a className="print-button" onClick={this.printList}>
            <i className="fa fa-print" /> Print List
          </a>
          {displayFilters ? AllFilters : null}
        </div>
        <div className="walk-typeahead">
          <input type="text" onChange={this.handleTypeahead} value={typeahead} placeholder={t`Search in Walks below`} />
        </div>
        <div className="walks-area">
          <WalkCards outings={filterMatches} />
          {locationMapSection}
        </div>
      </section>
    );
  }
}
