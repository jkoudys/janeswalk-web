/* global React */
/**
 * Filters, lists, maps, the whole shebang
 */
import WalkCards from './WalkCards.jsx';
import WalkList from './WalkList.jsx';
import LocationMap from './LocationMap.jsx';
import DateRange from './DateRange.jsx';
// Flux
import WalkStore from 'janeswalk/stores/WalkStore';
import CityStore from 'janeswalk/stores/CityStore';

// TODO: replace placeholder translate with real one.
// Not doing this now because we'd need to build multiple translators for blocks vs site
const today = new Date();
today.setUTCHours(0);
today.setUTCMinutes(0);

/**
 * Apply filters and date range to walks
 */
const filterWalks = ({ walks, filters, dateRange, city }) => walks.filter(walk => {
  let time;
  if (walk.time.slots.length) {
    time = walk.time.slots[0][0] * 1000;
  }
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
      (dateRange[0] && dateRange[0] > time) || (dateRange[1] && dateRange[1] < time)
   ) {
    return false;
  }
  return true;
});

/**
 * Grab the day the 3rd most recent walk appears on
 */
function thirdRecentDate(walks) {
  if (walks.length) {
    const lastThree = walks.slice(-3);
    // Find the day the walk starts
    if (lastThree[0].time.slots.length) {
      const lastDate = new Date(lastThree[0].time.slots[0][0] * 1000);
      lastDate.setUTCHours(0);
      lastDate.setUTCMinutes(0);
      return lastDate;
    }
  }
  return null;
}

function thirdRecentDateRange(walks) {
  const thirdDate = thirdRecentDate(walks);
  if (thirdDate && thirdDate < today) {
    return [thirdDate.getTime(), null];
  }
  return [today, null];
}

const Filter = ({ name, selected, setFilter, data }) => (
  <li>
    <label>{name}</label>
    <select value={selected} onChange={e => setFilter(e.target.value)}>
      <option value="">All</option>
      {Object.keys(data).map(k => <option value={k}>{data[k]}</option>)}
    </select>
  </li>
);

const getWalkFilterState = ({ filters: filters = {}, dateRange, city: city = CityStore.getCity() }) => {
  const walks = [...WalkStore.getWalks().values()];
  const usefulRange = dateRange || thirdRecentDateRange(walks);

  return {
    walks,
    filters,
    city,
    dateRange: usefulRange,
    filterMatches: filterWalks({ walks, filters, dateRange: usefulRange, city }),
  };
};

export default class WalkFilter extends React.Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: getWalkFilterState(props),
      _onChange: () => {
        this.setState(getWalkFilterState(this.state));
      },
      handleToggleFilters: () => {
        this.setState({ displayFilters: !this.state.displayFilters });
      },
      printList: () => {
        const win = window.open();
        const el = win.document.createElement('div');
        React.render(<WalkList walks={this.state.filterMatches} />, el);
        window.focus();
        win.document.body.appendChild(el);
        win.print();
        win.close();
      },
      setFilter: (filter, val) => {
        const { filters, walks, dateRange, city } = this.state;
        filters[filter].selected = val;
        this.setState({ filters, filterMatches: filterWalks({ walks, filters, dateRange, city }) });
      },
      setDateRange: (from, to) => {
        const { walks, filters, city } = this.state;
        this.setState({
          dateRange: [from, to],
          filterMatches: filterWalks({ walks, filters, dateRange: [from, to], city }),
        });
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

    const { displayFilters, city, filterMatches, dateRange, filters } = this.state;

    const Filters = Object.keys(filters).map(
      key => <Filter key={key} setFilter={v => this.setFilter(key, v)} {...filters[key]} />
    );

    // See if this city has a location set
    if (city && city.latlng.length === 2) {
      locationMapSection = (
        <section className="tab-pane" id="jw-map">
          <LocationMap walks={filterMatches} latlng={city.latlng} />
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
            <i className={displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right'} />Filters
          </a>
          <a className="print-button" onClick={this.printList}>
            <i className="fa fa-print" /> Print List
          </a>
          {displayFilters ? AllFilters : null}
        </div>
        <div className="walks-area">
          <WalkCards walks={filterMatches} />
          {locationMapSection}
        </div>
      </section>
    );
  }
}
