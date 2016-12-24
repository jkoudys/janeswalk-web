import { createElement as ce, PureComponent } from 'react';
import { Button } from 'antd';
import WalkLeader from './WalkLeader.jsx';

// TODO: finish writing this later. It needs to be a pure-component and 'leaders'
// are an immutable List. Toggles will sort leaders alphabetically or by number of
// walks, and filter out those who have past walks or not.
// Still not sure if this component is in demand.
// Using a state, since stores only needed on one-way data flow. This is a self-contained
// state, analagous to a checkbox.
class WalkLeaders extends PureComponent {
  state = { onlyUpcoming: false, sortBy: 'alpha' };

  handleAlpha: () => this.setState({ sortBy: 'alpha' });
  handleCount: () => this.setState({ sortBy: 'total' });
  handleToggleUpcoming: () => this.setState({ onlyUpcoming: !this.state.onlyUpcoming });

  render() {
    const { leaders } = this.props;
    const { onlyUpcoming, sortBy } = this.state;

  ce('section', { className: 'dashboardWalkLeaders' },
    ce(Button, {
      onClick: 
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
    activeLeaders.map((wL, i) => ce(WalkLeader,  { ...wL, key: `leader${i}` }))
  )
);

export default WalkLeaders;
