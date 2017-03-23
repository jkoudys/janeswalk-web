/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
/* global JanesWalk */
import { createElement as ce } from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import locale from 'antd/lib/locale-provider/en_US';

// Fluxxy
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as CityActions from 'janeswalk/actions/CityActions';

import WalkFilter from './components/WalkFilter';

const { event } = JanesWalk;

event.on('walkfilters.load', (location) => render(
  ce(LocaleProvider, { locale },
    ce(WalkFilter, { location }),
  ),
  document.getElementById('janeswalk-walk-filters')
));

console.log('walk filters');

// Listen for updates, add routing
event.on('filters.receive', f => CityActions.receiveFilters(f));
event.on('city.receive', city => CityActions.receive(city));
event.on('walks.receive', walks => WalkActions.receiveAll(walks));
