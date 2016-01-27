
import WalkFilters from './WalkFilters.jsx';
import WalksMap from './WalksMap.jsx';
import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';
//TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk.jsx';

//TODO: Discuss: Not sure on the precedent of this naming: a dashboard (or rather, the profile page) can potentially be shown for other users. The dash store should show the walks for the profile's owner, not necessarily "my" walks.

//Walks is required before activeFilters to reset activeFilters
const getWalks = (props) => ({
  walks: props.walks || DashboardStore.getWalks(props.location),
  activeFilters: props.activeFilters || DashboardStore.getActiveFilters(props.location),
  filterByDate: props.filterByDate || DashboardStore.getDateFilter(props.location),
  filters: props.filterByDate || DashboardStore.getFilters(),
});

export default class Walks extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = getWalks(props);
    this.state.currentView = 'list';
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DashboardStore.addChangeListener( this._onChange );
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener( this._onChange );
  }

  _onChange() {
    this.setState(getWalks(this.props));
  }

  render() {
    const {currentView, walks, filterByDate, filters} = this.state;
    const {location} = this.props;

    const Walks = walks.map(({map, id, title, time, team, url}) =>
      <Walk
        title={title}
        meeting={map.markers[0].title}
        start={time.slots[0][0]}
        id={id}
        key={id}
        team={team}
        url={url}
      />
    );

    //TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
    //TODO: (Post-PR) Create generic button component as part of a filter generic component (iterable buttons)
    return (<div className="walks">
      <button className={`walksListButton ${currentView === 'list' ? 'active' : null}`} onClick={()=>this.setState({currentView: 'list'})}>List</button>
      <button className={`walksMapButton ${currentView === 'map' ? 'active' : null}`} onClick={()=>this.setState({currentView: 'map'})}>Map</button>
      {
        filterByDate === 'all' ?
        <button className = {filterByDate === 'past' ? 'active' : null }onClick={() => DashboardActions.filterByDate('future', location)}>Without Past Walks</button> :
        <button className = {filterByDate === 'future' ? 'active' : null } onClick={()=>DashboardActions.filterByDate('all', location)}>With Past Walks</button>
      }
      <button onClick={() => window.open(DashboardStore.generateCSV())}>Export Spreadsheet</button>
      <WalkFilters
        {...this.state}
        {...this.props}
        filters={filters}
        {...DashboardActions}
      />
      {currentView === 'list' ? Walks : <WalksMap {...this.state} />}
    </div>);
  }
}

Walks.PropTypes = {
  walks: React.PropTypes.array.isRequired,
  activeFilters: React.PropTypes.object.isRequired,
  filterByDate: React.PropTypes.string.isRequired,
};