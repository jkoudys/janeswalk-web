/* global React */

import WalkFilters from './WalkFilters.jsx';
import WalksMap from './WalksMap.jsx';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk.jsx';

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
const _filters = require('../../../json/FilterStubs.json');

export default class Walks extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    Object.assign(this, {
      state: {
        currentView: 'list',
        filters: {},
      },
      handleToggleFilterPast: () => this.setState({ filterPast: !this.state.filterPast }),
    });
  }

  render() {
    const { currentView, filterPast, filters } = this.state;
    const { walks, city, user, show } = this.props;

    // How we're presenting the walks (map or list)
    let WalkList;
    if (currentView === 'list') {
      const now = Date.now();
      // TODO: separate this out into some functions
      const walkIDs = (show === 'city') ? city.walks : user.walks;
      WalkList = walkIDs
      .filter(wID => {
        const { time } = walks.get(wID);
        // Always show unset times, or if we're not filtering
        if (!(filterPast && time && time.slots.length) || (time && time.slots[0][0] * 1000 > now)) return true;
        return false;
      })
      .map(wID => {
        const { map, id, title, time, team, url, published } = walks.get(wID);
        let meeting;
        let start;
        if (map && map.markers.length) {
          meeting = map.markers[0].title;
        }
        if (time && time.slots.length) {
          start = time.slots[0][0];
        }
        return <Walk {...{ title, id, key: id, team, url, published, meeting, start }} />;
      });
    } else if (currentView === 'map') {
      WalkList = <WalksMap walks={user.walks.map(wID => walks.get(wID))} city={city} />;
    }

    // The toggle for the past walks
    const DateToggle = (
        <button
          className={filterPast ? 'active' : null}
          onClick={this.handleToggleFilterPast}
        >
        {filterPast ? t`Without Past Walks` : t`With Past Walks`}
      </button>
    );

    // TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
    return (
      <div className="walks">
        <button
          className={`walksListButton ${currentView === 'list' ? 'active' : null}`}
          onClick={() => this.setState({ currentView: 'list' })}
        >
          List
        </button>
        <button
          className={`walksMapButton ${currentView === 'map' ? 'active' : null}`}
          onClick={() => this.setState({ currentView: 'map' })}
        >
          Map
        </button>
        {DateToggle}
        {city ? (
          <a target="_blank" href={`/profile/exportCity/${city.id}`}>
            <button>{t`Export Spreadsheet`}</button>
          </a>
        ) : null}
        <WalkFilters
          allFilters={_filters}
          filters={filters}
          removeFilter={(filter, option) => this.setState({ filters: removeFilter(filters, filter, option) })}
          toggleFilter={(filter, option) => this.setState({ filters: toggleFilter(filters, filter, option) })}
        />
        {WalkList}
      </div>
    );
  }
}
