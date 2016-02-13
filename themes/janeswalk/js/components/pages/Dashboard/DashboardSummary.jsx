import {t, t2} from 'janeswalk/stores/I18nStore';

const DashboardSummary = ({city, year, leaders, walks, participants}) => {
  return (
    <section className="dashboardRecap">
      <h2>Recap</h2>
      <h4>{city.name} {t2('%d walk leader', '%d walk leaders', leaders.length) + t2('led %d walk', 'led %d walks', walks.length) + t('as a part of Jane\'s Walk %d,', year) + ' ' + t2('reaching more than %d participant', 'reaching more than %d participants', participants)}</h4>
      <h4>{t('Since %s first participated in Jane\'s Walk in %s, ', city.name, year) + t2('walk leader', 'walk leaders', leaders.length) + ' ' + t2('have led %d Jane\'s Walk', 'have led %d Jane\'s Walks', walks.length)}.</h4>
    </section>
  );
};

export default DashboardSummary;
