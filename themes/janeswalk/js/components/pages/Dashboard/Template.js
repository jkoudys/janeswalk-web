import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

import DashboardHeader from './DashboardHeader';
import DashboardMenu from './DashboardMenu';

//TODO: Pass in as properties, rather than loading directly from the store, if it makes sense.
const DashboardTemplate = ({ children }) => (
  ce('section', {},
    ce(DashboardHeader, { ...DashboardStore.getCityData(), ...DashboardStore.getLatestPost() }),
    ce(DashboardMenu, { style: 'dashboard-page', ...DashboardStore.getCityData(), ...DashboardStore.getMenuItems() }),
    children,
  )
);

export default DashboardTemplate;
