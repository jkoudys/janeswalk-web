import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

export default function DashboardSummary({ city = { name: 'your city' }, walks }) {
  const { leaders, walkCount, firstOuting } = walks.reduce(({
    leaders,
    walkCount,
    firstOuting,
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
      firstOuting: first ? Math.min(firstOuting, first) : firstOuting,
    };
  }, { leaders: new Set(), walkCount: 0, firstOuting: Date.now() / 1000 });

  return (
    ce('section', { className: 'dashboardRecap' },
      ce('h2', {}, t`Recap`),
      ce('h4', {}, t`In ${city.name}, ${leaders.size} Walk Leaders led ${walkCount} walks since its first Jane's Walk in ${'' + (new Date(firstOuting * 1000)).getUTCFullYear()}.`),
    )
  );
}
