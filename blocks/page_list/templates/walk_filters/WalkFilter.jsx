/**
 * Filters, lists, maps, the whole shebang
 */
import WalkCards from './WalkCards.jsx';
import WalkList from './WalkList.jsx';
import CityMap from './CityMap.jsx';
import DateRange from './DateRange.jsx';

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

const Filter = props => (
  <li>
    <label>{props.name}</label>
    <select name={props.key} value={props.selected} onChange={e => props.setFilter(props.key, e.target.value)}>
      <option value="">All</option>
      {Object.keys(props.data).map(k => <option value={k}>{props.data[k]}</option>)}
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
      city: props.city,
      filters: props.filters || {},
      dateRange: dateRange,
      filterMatches: filterWalks(props.walks, props.filters, dateRange)
    };

    // Setup event listeners
    JanesWalk.event.on('walks.receive', (walks, props) => {
      this.setState({walks: walks, filters: props.filters}, this.handleFilters);
    });
    JanesWalk.event.on('city.receive', city => this.setState({city: city}));
    JanesWalk.event.on('blogurl.receive', url => this.setState({blog: url}));
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
    let TabMap;
    let TabBlog;
    let CityMapSection;

    const Filters = Object.keys(this.state.filters).map(
      key => <Filter key={key} {...this.state.filters[key]} setFilter={(k, v) => this.setFilter(k, v)} />
    );

    // See if this city has a location set
    if (this.state.city && this.state.city.latlng.length === 2) {
      TabMap = <li key="tabmap"><a href="#jw-map" data-toggle="tab">Map</a></li>;
      CityMapSection = <section className="tab-pane" id="jw-map">
        <CityMap walks={this.state.filterMatches} city={this.state.city} />
      </section>
    }

    // Blog link, if we have one
    if (this.state.blog) {
      TabBlog = <li key="tb"><a href={this.state.blog} target="_blank">Blog</a></li>;
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
          <ul className="nav nav-tabs">
            <li><a href="#jw-cards" className="active" data-toggle="tab">All Walks</a></li>
            <li><a href="#jw-list" data-toggle="tab">List</a></li>
            {TabMap}
            {TabBlog}
          </ul>
          <div className="tab-content">
            <section className="tab-pane active" id="jw-cards">
              <WalkCards walks={this.state.filterMatches} />
            </section>
            <section className="tab-pane" id="jw-list">
              <WalkList walks={this.state.filterMatches} />
            </section>
            {CityMapSection}
          </div>
        </div>
      </section>
    );
  }
}
