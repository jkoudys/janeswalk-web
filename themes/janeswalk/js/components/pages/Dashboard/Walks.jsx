import WalkFilters from './WalkFilters.jsx';
import WalksMap from './WalksMap.jsx';

// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk.jsx';

// TODO: Discuss: Not sure on the precedent of this naming: a dashboard (or rather, the profile page) can potentially be shown for other users. The dash store should show the walks for the profile's owner, not necessarily "my" walks.
function removeFilter(filters, handle, option) {
  const newFilters = Object.assign({}, filters);
  newFilters[handle] = Object.assign({}, filters[handle]);
  delete newFilters[handle][option];

  return newFilters;
}

function toggleFilter(filters, handle, option) {
  const newFilters = Object.assign({}, filters);
  newFilters[handle] = Object.assign({}, filters[handle]);
  newFilters[handle][option] = !newFilters[handle][option];

  return newFilters;
}

// TODO: load only the ones we need from the walk data
const _filters = {"theme":{"name":"Theme","data":{"civic-activist":"Activism","nature-petlover":"Animals","urban-architecturalenthusiast":"Architecture","culture-artist":"Art","civic-truecitizen":"Citizenry","civic-commerce":"Commerce","civic-goodneighbour":"Community","culture-aesthete":"Design","urban-film":"Film","culture-foodie":"Food","nature-greenthumb":"Gardening","civic-gender":"Gender","civic-health":"Health","culture-historybuff":"Heritage","civic-international":"International Issues","culture-bookworm":"Literature","civic-military":"Military","urban-music":"Music","civic-nativeissues":"Native Issues","nature-naturelover":"Nature","culture-nightowl":"Night Life","urban-play":"Play","civic-religion":"Religion","urban-sports":"Sports","culture-writer":"Storytelling","urban-suburbanexplorer":"Suburbs","culture-techie":"Technology","urban-moversandshakers":"Transportation","urban-water":"Water"}},"ward":{"name":"Region","data":{"Ward 1 Etobicoke North":"Ward 1 Etobicoke North","Ward 2 Etobicoke North":"Ward 2 Etobicoke North","Ward 3 Etobicoke Centre":"Ward 3 Etobicoke Centre","Ward 4 Etobicoke Centre":"Ward 4 Etobicoke Centre","Ward 5 Etobicoke-Lakeshore":"Ward 5 Etobicoke-Lakeshore","Ward 6 Etobicoke-Lakeshore":"Ward 6 Etobicoke-Lakeshore","Ward 7 York West":"Ward 7 York West","Ward 8 York West":"Ward 8 York West","Ward 9 York Centre":"Ward 9 York Centre","Ward 10 York Centre":"Ward 10 York Centre","Ward 11 York South-Weston":"Ward 11 York South-Weston","Ward 12 York South-Weston":"Ward 12 York South-Weston","Ward 13 Parkdale-High Park":"Ward 13 Parkdale-High Park","Ward 14 Parkdale-High Park":"Ward 14 Parkdale-High Park","Ward 15 Eglinton-Lawrence":"Ward 15 Eglinton-Lawrence","Ward 16 Eglinton-Lawrence":"Ward 16 Eglinton-Lawrence","Ward 17 Davenport":"Ward 17 Davenport","Ward 18 Davenport":"Ward 18 Davenport","Ward 19 Trinity-Spadina":"Ward 19 Trinity-Spadina","Ward 20 Trinity-Spadina":"Ward 20 Trinity-Spadina","Ward 21 St. Pauls":"Ward 21 St. Pauls","Ward 22 St. Pauls":"Ward 22 St. Pauls","Ward 23 Willowdale":"Ward 23 Willowdale","Ward 24 Willowdale":"Ward 24 Willowdale","Ward 25 Don Valley West":"Ward 25 Don Valley West","Ward 26 Don Valley West":"Ward 26 Don Valley West","Ward 27 Toronto Centre-Rosedale":"Ward 27 Toronto Centre-Rosedale","Ward 28 Toronto Centre-Rosedale":"Ward 28 Toronto Centre-Rosedale","Ward 29 Toronto-Danforth":"Ward 29 Toronto-Danforth","Ward 30 Toronto-Danforth":"Ward 30 Toronto-Danforth","Ward 31 Beaches-East York":"Ward 31 Beaches-East York","Ward 32 Beaches-East York":"Ward 32 Beaches-East York","Ward 33 Don Valley East":"Ward 33 Don Valley East","Ward 34 Don Valley East":"Ward 34 Don Valley East","Ward 35 Scarborough Southwest":"Ward 35 Scarborough Southwest","Ward 36 Scarborough Southwest":"Ward 36 Scarborough Southwest","Ward 37 Scarborough Centre":"Ward 37 Scarborough Centre","Ward 38 Scarborough Centre":"Ward 38 Scarborough Centre","Ward 39 Scarborough-Agincourt":"Ward 39 Scarborough-Agincourt","Ward 40 Scarborough Agincourt":"Ward 40 Scarborough Agincourt","Ward 41 Scarborough-Rouge River":"Ward 41 Scarborough-Rouge River","Ward 42 Scarborough-Rouge River":"Ward 42 Scarborough-Rouge River","Ward 43 Scarborough East":"Ward 43 Scarborough East","Ward 44 Scarborough East":"Ward 44 Scarborough East"}},"accessibility":{"name":"Accessibility","data":{"bicyclesonly":"Bicyiccles only","bicycles":"Bicycles welcome","busy":"Busy sidewalks","dogs":"Dogs welcome","familyfriendly":"Family friendly","lowlight":"Low light or nighttime","seniors":"Senior Friendly","steephills":"Steep hills","strollers":"Strollers welcome","uneven":"Uneven terrain","wheelchair":"Wheelchair accessible"}}};

export default class Walks extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      currentView: 'list',
      filters: {}
    };
  }

  render() {
    const {currentView, filterByDate, filters} = this.state;
    const {walks, city, user, show} = this.props;

    // How we're presenting the walks (map or list)
    let Walks;
    if (currentView === 'list') {
      // TODO: separate this out into some functions
      let walkIDs = (show === 'city') ? city.walks : user.walks;
      Walks = walkIDs.map(wID => {
        let {map, id, title, time, team, url} = walks.get(wID);
        let props = {title, id, key: id, team, url}
        if (map && map.markers.length) {
          props.meeting = map.markers[0].title;
        }
        if (time && time.slots.length) {
          props.start = time.slots[0][0];
        }
        return <Walk {...props} />;
      });
    } else if (currentView === 'map') {
      Walks = <WalksMap walks={user.walks.map(wID => walks.get(wID))} city={city} />
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
        {city ? <a target="_blank" href={'/profile/exportCity/' + city.id}><button>Export Spreadsheet</button></a> : null}
        <WalkFilters
          allFilters={_filters}
          filters={filters}
          removeFilter={(filter, option) => this.setState({filters: removeFilter(filters, filter, option)})}
          toggleFilter={(filter, option) => this.setState({filters: toggleFilter(filters, filter, option)})}
        />
        {Walks}
      </div>
    );
  }
}
