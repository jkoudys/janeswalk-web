import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

export default function DashboardSummary({ city = { name: 'your city' }, walks }) {
  let leaderCount = 0;
  let walkCount = 0;
  const year = 2015;
  const leaders = {};

  for (const [, walk] of walks) {
    const teamLeader = walk.team && walk.team[0];
    if (teamLeader) {
      const key = (teamLeader.email || (teamLeader.firstName + teamLeader.lastName));
      leaders[key] = (leaders[key] || 0) + 1;
    }
    if (walk.time) {
      walkCount += walk.time.slots.length;
    }
  }
  leaderCount = Object.keys(leaders).length;

  return (
    ce('section', { className: 'dashboardRecap' },
      ce('h2', {}, t`Recap`),
      ce('h4', {}, t`In ${city.name}, ${leaderCount} Walk Leaders led ${walkCount} walks since its first Jane's Walk in ${year}.`),
    )
  );
}
