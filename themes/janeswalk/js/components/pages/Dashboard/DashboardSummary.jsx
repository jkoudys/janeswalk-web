import {t, t2} from 'janeswalk/stores/I18nStore';

const DashboardSummary = ({city, walks}) => {
  let leaderCount = 0, walkCount = 0, year = 2015;
  const leaders = {};
  for (let [id, walk] of walks) {
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

DashboardSummary.defaultProps = {
  city: {name: 'your city'}
};

export default DashboardSummary;
