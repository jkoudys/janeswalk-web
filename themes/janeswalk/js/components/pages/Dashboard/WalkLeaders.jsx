import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';

import WalkLeader from './WalkLeader.jsx';

const getWalkLeaders = (props) => ({
  filterByDate: props.filterByDate || DashboardStore.getDateFilter(props.location), // 'past' 'future' 'all'
  sortBy: props.sortBy || DashboardStore.getSortBy(props.location), //'alpha', 'walks', ''
  activeLeaders: props.activeLeaders || DashboardStore.getWalkLeadersAndVolunteers(props.location),
});

export default class WalkLeaders extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = getWalkLeaders(props);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DashboardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getWalkLeaders(this.props));
  }

  render() {

    const {activeLeaders, filterByDate, sortBy} = this.state;
    const {location} = this.props;
    const {name} = DashboardStore.getCityData();
    const {filterLeadersByDate, sortLeaders} = DashboardActions;

    const WalkLeaders = activeLeaders.map((wL,i) => (<WalkLeader {...wL} key={i}/> ));
    //TODO: (Post-PR) Create generic button component as part of a filter generic component (iterable buttons)
    return (<section className="dashboardWalkLeaders">
      <button className={`buttonAllWalks ${filterByDate === 'all' ? 'active' : null}`} onClick={() => filterLeadersByDate('all', location)}>All Walks</button>
      <button className={`buttonUpcomingWalks ${filterByDate === 'future' ? 'active' : null}`} onClick={() => filterLeadersByDate('future', location)}>Upcoming Walks Only</button>
      <button className={`buttonPastWalks ${filterByDate === 'past' ? 'active' : null}`} onClick={() => filterLeadersByDate('past', location)}>Past Walks Only</button><br/>
      <button className={`buttonSortAlphabetically ${sortBy === 'alpha' ? 'active' : null}`} onClick={() => sortLeaders('alpha', location)}>Sort Alphabetically by First Name</button>
      <button className={`buttonSortByMostWalks ${sortBy === 'count' ? 'active' : null}`} onClick={() => sortLeaders('count', location)}>Sort by Most Walks</button>
      {WalkLeaders}
    </section>);
  };
}

WalkLeaders.PropTypes = {
  filterByDate: React.PropTypes.string.isRequired,
  sortBy: React.PropTypes.string.isRequired,
  activeLeaders: React.PropTypes.array.isRequired,
};

export default WalkLeaders;