import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

const DashboardHeader = ({ user: { firstName, groups }, announcements = '' }) => (
  ce('header', {},
    ce('h3', {},
      firstName.toUpperCase(),
      ' ',
      groups.includes('City Organizers') ? t`Organizer` : t`Walk Leader`, ' ', t`Dashboard`,
    ),
    ce('h4', {}, t`Hi, ${firstName}!`),
    ce('section', { className: 'dashboardLatestPost' },
      announcements ? ce('span', { dangerouslySetInnerHTML: { __html: announcements } }) : null,
    )
  )
);

export default DashboardHeader;
