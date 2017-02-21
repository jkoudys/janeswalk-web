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

    // How we're presenting the walks (map or list)
    let WalkList;

    if (currentView === 'list') {
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

      WalkList = walkIDs
      .filter(wID => {
        const { time, title } = walks.get(wID);
        // Don't show empty-titled walks
        if (!(title && title.trim())) return false;
        // Always show unset times, or if we're not filtering
        if (!(filterPast && time && time.slots.length) || (time && time.slots[0][0] * 1000 > now)) return true;
        return false;
      })
      .map(id => {
        const {
          title,
          team,
          url,
          published,
          features: [{ properties: { title: meeting } = {} }] = [{}],
          time: { slots } = {},
          attendees,
        } = walks.get(id);
        let start;
        if (slots && slots.length) start = +slots[0][0];
        return ce(Walk, { title, id, key: `walk${id}`, team, url, published, meeting, start, canEdit, attendees });
      });
    } else if (currentView === 'map') {
      WalkList = ce(WalksMap, { walks: user.walks.map(wID => walks.get(wID)), city });
    }

    // The toggle for the past walks
    const DateToggle = (
      ce(Tag.CheckableTag, { checked: filterPast, onClick: this.handleToggleFilterPast },
        filterPast ? t`Without Past Walks` : t`With Past Walks`
      )
    );

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
        DateToggle,
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