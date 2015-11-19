/**
 * Filters, lists, maps, the whole shebang
 */
import WalkCards from './WalkCards.jsx';
import WalkList from './WalkList.jsx';
import LocationMap from './CityMap.jsx'; //TODO: Change name of CityMap
import DateRange from './DateRange.jsx';
import Tabs from './Tab.jsx';

// TODO: replace placeholder translate with real one.
// Not doing this now because we'd need to build multiple translators for blocks vs site
const t = s => s;
const today = new Date();
today.setUTCHours(0);
today.setUTCMinutes(0);

/**
 * Apply filters and date range to walks
 */
function filterWalks(walks, filters, dr) {
  return walks.filter(walk => {
    let time;
    if (walk.time.slots.length) {
      time = walk.time.slots[0][0] * 1000;
    }
    // TODO: cleanup and perf test
    if ((filters.theme && filters.theme.selected && !(walk.checkboxes['theme-' + filters.theme.selected])) ||
        (filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected) ||
        (filters.accessibility && filters.accessibility.selected && !(walk.checkboxes['accessible-' + filters.accessibility.selected])) ||
        (filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1) ||
        (dr[0] && dr[0] > time) || (dr[1] && dr[1] < time)
       )
     {
       return false;
     }
     return true;
  });
}

/**
 * Grab the day the 3rd most recent walk appears on
 */
function thirdRecentDate(walks) {
  if (walks.length) {
    let lastThree = walks.slice(-3);
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

const Filter = ({name, key, selected, setFilter, data}) => (
  <li>
    <label>{name}</label>
    <select name={key} value={selected} onChange={e => setFilter(key, e.target.value)}>
      <option value="">All</option>
      {Object.keys(data).map(k => <option value={k}>{data[k]}</option>)}
    </select>
  </li>
);

export default class WalkFilter extends React.Component {
  constructor(props) {
    const thirdDate = thirdRecentDate(props.walks);
    const dateRange = [today.getTime(), null];
    if (thirdDate && thirdDate < today) {
      dateRange[0] = thirdDate.getTime();
    }

    super(props);
    this.state = {
      walks: props.walks || [],
      location: props.location,
      filters: props.filters || {},
      dateRange: dateRange,
      filterMatches: filterWalks(props.walks, props.filters, dateRange)
    };

    // Setup event listeners
    JanesWalk.event.on('walks.receive', (walks, props) => {
      this.setState({walks: walks, filters: props.filters}, this.handleFilters);
    });
    JanesWalk.event.on('city.receive', city => this.setState({location: city}));
    JanesWalk.event.on('blog.receive', blog => this.setState({blog: blog}));
    JanesWalk.event.on('country.receive', country => this.setState({location: country}));
  }

  setFilter(filter, val) {
    const filters = this.state.filters;
    filters[filter].selected = val;
    this.setState({filters: filters, filterMatches: filterWalks(this.state.walks, filters, this.state.dateRange)});
  }

  setDateRange(from, to) {
    this.setState({dateRange: [from, to], filterMatches: filterWalks(this.state.walks, this.state.filters, [from, to])});
  }

  printList() {
    const win = window.open();
    const el = win.document.createElement('div');
    React.render(<WalkList walks={this.state.filterMatches} />, el);
    window.focus();
    win.document.body.appendChild(el);
    win.print();
    win.close();
  }

  render() {
    let locationMapSection;

    const Filters = Object.keys(this.state.filters).map(
      key => <Filter key={key} {...this.state.filters[key]} setFilter={(k, v) => this.setFilter(k, v)} />
    );

    // See if this city has a location set
    if (this.state.location && this.state.location.latlng.length === 2) {
      locationMapSection = <section className="tab-pane" id="jw-map">
        <LocationMap walks={this.state.filterMatches} city={this.state.location} />
      </section>
    }

    return (
      <section className="ccm-block-page-list-walk-filters">
        <div className="walk-filters">
          <a className="print-button" onClick={() => this.printList()}><i className="fa fa-print" /> Print List</a>
          <ul className="filters">
            {Filters}
            <li>
              <label>Dates</label>
              <DateRange value={this.state.dateRange} onChange={this.setDateRange.bind(this)} />
            </li>
          </ul>
          <div>
            <Tabs blog={this.state.blog} location={this.state.location}/>
          </div>
          <div className="tab-content">
            <section className="tab-pane active" id="jw-cards">
              <WalkCards walks={this.state.filterMatches} />
            </section>
            <section className="tab-pane" id="jw-list">
              <WalkList walks={this.state.filterMatches} />
            </section>
            {locationMapSection}
          </div>
        </div>
      </section>
    );
  }
}
