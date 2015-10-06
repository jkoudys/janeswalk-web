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

export default class WalkFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walks: props.walks || [],
      city: props.city,
      filters: props.filters || {},
      filterMatches: props.walks || [],
      dateRange: [null, null]
    };

    this.handleFilters();

    // Setup event listeners
    JanesWalk.event.on('walks.receive', (walks, props) => {
      this.setState({walks: walks, filters: props.filters}, this.handleFilters);
    });
    JanesWalk.event.on('city.receive', city => this.setState({city: city}));
    JanesWalk.event.on('blogurl.receive', url => this.setState({blog: url}));
  }

  handleFilters() {
    setTimeout(() => {this.setState({filterMatches: this.state.walks.slice()})}, 1);
  }

  setFilter(filter, val) {
    const filters = this.state.filters;
    filters[filter].selected = val;

    this.setState({
      filters: filters,
      filterMatches: this.state.walks.filter(walk => {
        // TODO: cleanup and perf test
        if ((filters.theme && filters.theme.selected && !(walk.checkboxes['theme-' + filters.theme.selected])) ||
            (filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected) ||
            (filters.accessibility && filters.accessibility.selected && !(walk.checkboxes['accessible-' + filters.accessibility.selected])) ||
            (filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1)
           )
         {
           return false;
         }
         return true;
      })
    });
  }

  setDateRange(from, to) {
    this.setState({dateRange: [from, to]});
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

class DateRange extends React.Component {
  componentDidMount() {
    const $to = $(React.findDOMNode(this.refs.to));
    const $from = $(React.findDOMNode(this.refs.from));
    const df = 'yy-mm-dd';

    let toTime;
    let fromTime;

    $from.datepicker({
      defaultDate: '+1w',
      changeMonth: true,
      dateFormat: df,
      onClose: selectedDate => {
        fromTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $to.datepicker('option', 'minDate', selectedDate);
        this.props.onChange(fromTime, toTime);
      }
    });

    $to.datepicker({
      defaultDate: '+5w',
      changeMonth: true,
      dateFormat: df,
      onClose: selectedDate => {
        toTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $from.datepicker('option', 'minDate', selectedDate)
        this.props.onChange(fromTime, toTime);
      }
    });
  }

  render() {
    return (
      <fieldset className="daterange">
        <input type="text" ref="from" placeholder="From" />
        <input type="text" ref="to" placeholder="To" />
      </fieldset>
    );
  }
}
