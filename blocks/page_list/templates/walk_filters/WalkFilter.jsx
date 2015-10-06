/**
 * Filters, lists, maps, the whole shebang
 */
import WalkCards from './WalkCards.jsx';
import WalkList from './WalkList.jsx';
import CityMap from './CityMap.jsx';

// TODO: replace placeholder translate with real one.
// Not doing this now because we'd need to build multiple translators for blocks vs site
const t = s => s;
const offset = (new Date()).getTimezoneOffset();
const oneDay = 24 * 60 * 60 * 1000;
const today = new Date();
today.setUTCHours(0);
today.setUTCMinutes(0);

export default class WalkFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: props.walks || [],
      city: props.city,
      filters: props.filters || {},
      dateRange: [today.getTime(), null],
      filterMatches: []
    };

    this.handleFilters();
    // Setup event listeners
    JanesWalk.event.on('walks.receive', (walks, props) => {
      this.setState({walks: walks, filters: props.filters}, this.handleFilters);
    });
    JanesWalk.event.on('city.receive', city => this.setState({city: city}));
    JanesWalk.event.on('blogurl.receive', url => this.setState({blog: url}));

    // Load our filtered walks after we've built the filter page
    setTimeout(() => this.setState({
      filterMatches: this.filterWalks(this.state.filters, this.state.dateRange)
    }), 1);
  }

  handleFilters() {
    setTimeout(() => {this.setState({filterMatches: this.state.walks.slice()})}, 1);
  }

  setFilter(filter, val) {
    const filters = this.state.filters;
    filters[filter].selected = val;
    this.setState({filters: filters, filterMatches: this.filterWalks(filters, this.state.dateRange)});
  }

  filterWalks(filters, dr) {
    return this.state.walks.filter(walk => {
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

  setDateRange(from, to) {
    this.setState({dateRange: [from, to], filterMatches: this.filterWalks(this.state.filters, [from, to])});
  }

  render() {
    let TabMap;
    let TabBlog;
    let CityMapSection;

    const Filters = Object.keys(this.state.filters).map(key => {
      const filter = this.state.filters[key];
      return (
        <li key={'filter' + key}>
          <label>{filter.name}</label>
          <select name={key} value={filter.selected} onChange={e => this.setFilter(key, e.target.value)}>
            <option value="">All</option>
            {Object.keys(filter.data).map(k => <option value={k}>{filter.data[k]}</option>)}
          </select>
        </li>
      );
    });

    // See if this city has a location set
    if (this.state.city && this.state.city.latlng.length === 2) {
      TabMap = <li key="tabmap"><a href="#jw-map" data-toggle="tab">Map</a></li>;
      CityMapSection = <section className="tab-pane" id="jw-map">
        <CityMap walks={this.state.filterMatches} city={this.state.city} />
      </section>
    }

    // Blog link, if we have one
    if (this.state.blog) {
      TabBlog = <li key="tb"><a href={this.state.blog}>Blog</a></li>;
    }

    return (
      <section className="ccm-block-page-list-walk-filters">
        <div className="walk-filters">
          <ul className="filters">
            {Filters}
            <li>
              <label>Dates</label>
              <DateRange value={this.dateRange} onChange={this.setDateRange.bind(this)} />
            </li>
          </ul>
          <ul className="nav nav-tabs">
            <li><a href="#jw-cards" data-toggle="tab">All Walks</a></li>
            <li><a href="#jw-list" data-toggle="tab">List</a></li>
            {TabMap}
            {TabBlog}
          </ul>

          <div className="tab-content">
            <section className="tab-pane" id="jw-cards">
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

const df = 'yy-mm-dd';
class DateRange extends React.Component {
  constructor(props) {
    super(props);
    if (Array.isArray(props.value) && props.value.length === 2) {
      this.state = {
        from: $.datepicker.formatDate(df, props.value[0] + offset),
        to: $.datepicker.formatDate(df, props.value[1] + offset)
      };
    } else {
      this.state = {from: '', to: ''};
    }
  }

  componentDidMount() {
    const $to = $(React.findDOMNode(this.refs.to));
    const $from = $(React.findDOMNode(this.refs.from));

    let toTime;
    let fromTime;

    $from.datepicker({
      defaultDate: '+1w',
      changeMonth: true,
      changeYear: true,
      dateFormat: df,
      onClose: selectedDate => {
        fromTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $to.datepicker('option', 'minDate', selectedDate);
        this.setState({from: selectedDate});
        this.props.onChange(fromTime, toTime);
      }
    });

    $to.datepicker({
      defaultDate: '+5w',
      changeMonth: true,
      changeYear: true,
      dateFormat: df,
      onClose: selectedDate => {
        toTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $from.datepicker('option', 'maxDate', selectedDate)
        this.setState({to: selectedDate});
        this.props.onChange(fromTime, toTime);
      }
    });
  }

  render() {
    return (
      <fieldset className="daterange">
        <input type="text" ref="from" placeholder="From" value={this.state.from} />
        <input type="text" ref="to" placeholder="To" value={this.state.to} />
      </fieldset>
    );
  }
}
