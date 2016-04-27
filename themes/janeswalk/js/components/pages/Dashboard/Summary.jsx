/* global React */

import { t, t2 } from 'janeswalk/stores/I18nStore';

export default function DashboardSummary({ city = { name: 'your city' }, walks }) {
  let leaderCount = 0;
  let walkCount = 0;
  let year = 2015;
  const leaders = {};

  for (const [, walk] of walks) {
    let teamLeader = walk.team && walk.team[0];
    if (teamLeader) {
      let key = (teamLeader.email || (teamLeader.firstName + teamLeader.lastName));
      leaders[key] = (leaders[key] || 0) + 1;
    }
    if (walk.time) {
      walkCount += walk.time.slots.length;
    }
  }
  leaderCount = Object.keys(leaders).length;

  return (
    <section className="dashboardRecap">
      <h2>Recap</h2>
      <h4>In {city.name}, {t2('%d walk leader', '%d walk leaders', leaderCount) + ' ' + t2('led %d walk', 'led %d walks', walkCount) + ' '+ t('since its first Jane\'s Walk in %d,', year) + '.'}</h4>
    </section>
  );
};
