import { createElement as ce, Component } from 'react';
import t from 'es2015-i18n-tag';
import { Tag, Button } from 'antd';
import WalkFilters from './WalkFilters';
import WalksMap from './WalksMap';

// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk';

const removeFilter = (filters, handle, option) => ({
  ...filters,
  [handle]: { ...filters[handle], [option]: undefined },
});

const toggleFilter = (filters, handle, option) => ({
  ...filters,
  [handle]: { ...filters[handle], [option]: !filters[handle][option] },
});

// TODO: load only the ones we need from the walk data
const allFilters = require('../../../json/FilterStubs.json');

export default class Walks extends Component {
  state = {
    currentView: 'list',
    filters: {},
  };

  handleToggleFilterPast = () => this.setState({ filterPast: !this.state.filterPast });

  render() {
    const { currentView, filterPast, filters } = this.state;
    const { walks, city, user, show, currentUser } = this.props;
    const { handleToggleFilterPast } = this;

    // How we're presenting the walks (map or list)
    let WalkList;

    const now = Date.now();
    let walkIDs = [];
    let canEdit = false;
    if (show === 'city') {
      walkIDs = city.walks;
      // If this is a CO, who can edit
      canEdit = currentUser.groups.includes('City Organizers');
    } else {
      walkIDs = user.walks;
      // Walk owner
      canEdit = user.id === currentUser.id;
    }

    const filteredWalks = walkIDs
    .map(id => walks.get(id))
    .filter(({ time, title }) => {
      // Don't show empty-titled walks
      if (!(title && title.trim())) return false;
      // Always show unset times, or if we're not filtering
      if (!(filterPast && time && time.slots.length) || (time && time.slots[0][0] * 1000 > now)) return true;
      return false;
    });

    if (currentView === 'list') {
      WalkList = filteredWalks.map(({
        attendees,
        features: [{ properties: { title: meeting } = {} }] = [{}],
        id: walkId,
        published,
        team,
        time: { slots: [[start] = []] = [] } = {},
        title,
        url,
      }) => ce(Walk, {
        attendees,
        canEdit,
        key: `walk${walkId}`,
        meeting,
        published,
        start,
        team,
        title,
        url,
        walkId,
      }));
    } else if (currentView === 'map') {
      WalkList = ce(WalksMap, { walks: filteredWalks, city });
    }

//      WalkList = ce(WalksMap, { walks: user.walks.map(wID => walks.get(wID)), city });
    // TODO: Place buttons in WalksFilterOptions (should be a generic FilterOptions)
    return (
      ce('div', { className: 'walks' },
        ce(Tag.CheckableTag, {
          className: 'walksListButton',
          checked: currentView === 'list',
          onChange: () => this.setState({ currentView: 'list' }),
        }, t`List`),
        ce(Tag.CheckableTag, {
          className: 'walksMapButton',
          checked: currentView === 'map',
          onChange: () => this.setState({ currentView: 'map' }),
        }, t`Map`),
        ce(Tag.CheckableTag, { checked: filterPast, onChange: handleToggleFilterPast },
          filterPast ? t`Without Past Walks` : t`With Past Walks`
        ),
        city ? ce('a', { target: '_blank', href: `/profile/exportCity/${city.id}` },
          ce(Button, {}, t`Export Spreadsheet`)
        ) : null,
        ce(WalkFilters, {
          allFilters,
          filters,
          removeFilter: (filter, option) => this.setState({ filters: removeFilter(filters, filter, option) }),
          toggleFilter: (filter, option) => this.setState({ filters: toggleFilter(filters, filter, option) }),
        }),
        WalkList
      )
    );
  }
}
