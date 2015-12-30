import DashboardStore from './DashboardStore';

import WalkLeader from './WalkLeader.jsx';

export default class WalkLeaders extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      //TODO: can just be generic filter (Post-PR)
      filterByDate: props.filterByDate || 'all', // 'past' 'future' 'all'
      sortBy: props.sortBy || null, //'alpha', 'walks', ''
      activeLeaders: DashboardStore.getWalkLeadersAndVolunteers().walkLeaders || [],
    };
  }

  //TODO: Duplicate in CityWalks, perhaps create a Utility for these (Post-PR)
  filterLeaders(filterByDate = 'all') { //TODO: We should have a common filter and list Component (Post-PR)
    //run filters
    //run sort
    //update activeLeaders array this.setState
    //const {activeLeaders} = this.state;
    const {walkLeaders} = DashboardStore.getWalkLeadersAndVolunteers();

    if (!filterByDate.length || filterByDate === 'all') this.setState({activeLeaders: walkLeaders});
    else {
        const activeLeaders = walkLeaders.filter(leader => {
        const currentDate = Date.now();
        if (filterByDate === 'past') {
          return leader.walks.reduce((p, walk) => {
            if(p) return p;
            return walk.time.slots[0][0] * 1000 <= currentDate; //TODO: refactor into a function repeated below (Post-PR)
          }, false);
        }
        if (filterByDate === 'future') {
          return leader.walks.reduce((p, walk) => {
            if(p) return p;
            return walk.time.slots[0][0] * 1000 >= currentDate;
          }, false);
        }
        return true; //filterByDate === 'all'
      });

      this.setState({activeLeaders, filterByDate}); //TODD: you can remove updatedLeaders, and just use activeLeaders reduce code
    }
  }

  sortLeaders(sortBy = '') {
    const {activeLeaders} = this.state;
    const {walkLeaders} = DashboardStore.getWalkLeadersAndVolunteers();

    if (this.state.sortBy && sortBy === this.state.sortBy) {
      this.setState({activeLeaders: walkLeaders.slice(), sortBy: null});
      return;
    }

    if (sortBy === 'alphabetical') {
      activeLeaders.sort((pLeader, cLeader)=>{
        return pLeader.firstName > cLeader.firstName;
      });
    } else { //'totalWalks'
      //run sort, setstate
      activeLeaders.sort((pLeader, cLeader)=>{
        return pLeader.walks.length < cLeader.walks.length;
      });
    }

    this.setState({activeLeaders, sortBy});
  }

  //TODO: Logic for dateFilter, only one allowed to be pressed (Post-PR)

  render() {

    const {activeLeaders} = this.state;
    const {name} = DashboardStore.getCityData();

    const WalkLeaders = activeLeaders.map(wL => (<WalkLeader {...wL}/> ));

    //TODO: Show button is active for onClick (Post-PR)
    return (<section>
      <h2>{name} Walk Leaders and Volunteers</h2>
      <h3>Show walk leaders and volunteers with...</h3>
      <button onClick={() => this.filterLeaders('past')}>Past Walks</button>
      <button onClick={() => this.filterLeaders('future')}>Upcoming Walks</button>
      <button onClick={() => this.filterLeaders()}>All Walks</button><br/>
      <button onClick={() => this.sortLeaders('alphabetical')}>Sort Alphabetically by First Name</button>
      <button onClick={() => this.sortLeaders('totalWalks')}>Sort by Most Walks</button>
      {WalkLeaders}
    </section>);
  };
}

WalkLeaders.PropTypes = {
  //TODO:
};

export default WalkLeaders;