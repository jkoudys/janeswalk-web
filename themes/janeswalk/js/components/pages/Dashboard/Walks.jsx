import WalkFilters from './WalkFilters.jsx';
import WalksMap from './WalksMap.jsx';

// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk.jsx';

// TODO: Discuss: Not sure on the precedent of this naming: a dashboard (or rather, the profile page) can potentially be shown for other users. The dash store should show the walks for the profile's owner, not necessarily "my" walks.

export default class Walks extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = getWalks(props);
    this.state.currentView = 'list';
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const {currentView, walks, filterByDate, filters} = this.state;
    const {location} = this.props;

    // How we're presenting the walks (map or list)
    let Walks;
    if (currentView === 'list') {
      Walks = walks.map(({map, id, title, time, team, url}) => (
        <Walk
          title={title}
          meeting={map.markers[0].title}
          start={time.slots[0][0]}
          id={id}
          key={id}
          team={team}
          url={url}
        />
      ));
    } else if (currentView === 'map') {
      Walks = <WalksMap walks={walks} />
    }

    // The toggle for the past walks
    let DateToggle;
    if (filterByDate === 'future') {
      DateToggle = (
        <button
          className={filterByDate === 'future' ? 'active' : null}
          onClick={() => this.setState({filterByDate: 'future'})}>
          With Past Walks
        </button>
      );
    } else {
      DateToggle = (
        <button
          className={filterByDate === 'past' ? 'active' : null}
          onClick={() => this.setState({filterByDate: 'past'})}>
          Without Past Walks
        </button>
      );
    }

    //TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
    //TODO: (Post-PR) Create generic button component as part of a filter generic component (iterable buttons)
    return (
      <div className="walks">
        <button
          className={`walksListButton ${currentView === 'list' ? 'active' : null}`}
          onClick={() => this.setState({currentView: 'list'})}>
          List
        </button>
        <button
          className={`walksMapButton ${currentView === 'map' ? 'active' : null}`}
          onClick={() => this.setState({currentView: 'map'})}>
          Map
        </button>
        {DateToggle}
        <a className="btn" href={'exportCity/' + city.id}>
          Export Spreadsheet
        </a>
        <WalkFilters />
        {Walks}
      </div>
    );
  }
}
