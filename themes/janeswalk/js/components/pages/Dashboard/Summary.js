import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

export default function DashboardSummary({ city = { name: 'your city', publishDate: Math.min(Date.now() / 1000) }, walks }) {
  const { leaders, walkCount } = walks.reduce(({
    leaders,
    walkCount,
  }, {
    team = [],
    time: { slots = [], slots: [[first] = []] = [] } = {},
  }) => {
    for (const { email, type } of team) {
      if (type === 'leader') leaders.add(email);
    }

    walkCount += slots.length;

    return {
      leaders,
      walkCount,
    };
  }, { leaders: new Set(), walkCount: 0 });

  return (
    ce('section', { className: 'dashboardRecap' },
      ce('h2', {}, t`Recap`),
      ce('h4', {}, t`In ${city.name}, ${leaders.size} Walk Leaders led ${walkCount} walks since its first Jane's Walk in ${'' + (new Date(city.publishDate * 1000)).getUTCFullYear()}.`),
    )
  );
}
