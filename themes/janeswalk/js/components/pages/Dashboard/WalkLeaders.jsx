import WalkLeader from './WalkLeader.jsx';

export default class WalkLeaders extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    const {activeLeaders, filterByDate, sortBy} = this.state;
    const {location} = this.props;

    const WalkLeaders = activeLeaders.map((wL,i) => <WalkLeader {...wL} key={i} />);

    return (
      <section className="dashboardWalkLeaders">
        <button
          className={`buttonAllWalks ${filterByDate === 'all' ? 'active' : null}`}
          onClick={() => filterLeadersByDate('all', location)}>
          All Walks
        </button>
        <button
          className={`buttonUpcomingWalks ${filterByDate === 'future' ? 'active' : null}`}
          onClick={() => filterLeadersByDate('future', location)}>
          Upcoming Walks Only
        </button>
        <button
          className={`buttonPastWalks ${filterByDate === 'past' ? 'active' : null}`}
          onClick={() => filterLeadersByDate('past', location)}>
          Past Walks Only
        </button>
        <br/>
        <button
          className={`buttonSortAlphabetically ${sortBy === 'alpha' ? 'active' : null}`}
          onClick={() => sortLeaders('alpha', location)}>
          Sort Alphabetically by First Name
        </button>
        <button
          className={`buttonSortByMostWalks ${sortBy === 'count' ? 'active' : null}`}
          onClick={() => sortLeaders('count', location)}>
          Sort by Most Walks
        </button>
        {WalkLeaders}
      </section>
    );
  };
}

export default WalkLeaders;
