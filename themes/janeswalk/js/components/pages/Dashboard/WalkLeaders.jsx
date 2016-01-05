import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';

import WalkLeader from './WalkLeader.jsx';

const getWalkLeaders = (props) => ({
  filterByDate: props.filterByDate || DashboardStore.getDateFilter(), // 'past' 'future' 'all'
  sortBy: props.sortBy || DashboardStore.getSortBy(), //'alpha', 'walks', ''
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

    const {activeLeaders} = this.state;
    const {name} = DashboardStore.getCityData();
    const {filterLeadersByDate, sortLeaders} = DashboardActions;

    const WalkLeaders = activeLeaders.map((wL,i) => (<WalkLeader {...wL} key={i}/> ));

    //TODO: Show button is active for onClick
    return (<section>
      <h2>{name} Walk Leaders and Volunteers</h2>
      <h3>Show walk leaders and volunteers with...</h3>
      <button onClick={() => filterLeadersByDate('past')}>Past Walks</button>
      <button onClick={() => filterLeadersByDate('future')}>Upcoming Walks</button>
      <button onClick={() => filterLeadersByDate('all')}>All Walks</button><br/>
      <button onClick={() => sortLeaders('alpha')}>Sort Alphabetically by First Name</button>
      <button onClick={() => sortLeaders('count')}>Sort by Most Walks</button>
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