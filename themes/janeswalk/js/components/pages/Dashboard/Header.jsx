import { createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import WithLinks from 'janeswalk/components/WithLinks.jsx';

// The datetime format for this component
// FIXME: get the locale from the page
const dtf = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DashboardHeader = ({ user: { firstName, groups }, announcements }) => (
  ce('header', {},
    ce('h3', {},
      firstName.toUpperCase(),
      ' ',
      groups.includes('City Organizers') ? 'Organizer' : 'Walk Leader', ' Dashboard'
    ),
    ce('h4', {}, t`Hi, ${firstName}!`),
    ce('section', { className: 'dashboardLatestPost' },
      announcements.filter(({ group }) => groups.includes(group)).slice(0, 3).map(({ title, time, text }) => (
        ce('span', { key: `announce${title}` },
          ce('h4', {}, title),
          ce('h5', {}, dtf.format(new Date(time))),
          ce(WithLinks, {}, text),
        )
      )),
      announcements ? ce('span', { dangerouslySetInnerHTML: { __html: announcements } }) : null,
    )
  )
);

export default DashboardHeader;
