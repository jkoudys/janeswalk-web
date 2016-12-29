import { createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import WithLinks from 'janeswalk/components/WithLinks.jsx';

const DashboardHeader = ({ user: { firstName, groups }, announcements = '' }) => (
  ce('header', {},
    ce('h3', {},
      firstName.toUpperCase(),
      ' ',
      groups.includes('City Organizers') ? 'Organizer' : 'Walk Leader', ' Dashboard'
    ),
    ce('h4', {}, t`Hi, ${firstName}!`),
    ce('section', { className: 'dashboardLatestPost' },
      announcements ? ce('span', { dangerouslySetInnerHTML: { __html: announcements } }) : null,
    )
  )
);

export default DashboardHeader;
