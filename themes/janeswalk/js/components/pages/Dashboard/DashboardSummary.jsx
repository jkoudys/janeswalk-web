
//t2('Walk Leader: ', 'Walk Leaders: ', count($w->walkLeaders));

const DashboardSummary = ({year, walkLeaders, walks, participants, originalYear, totalWalkLeaders, totalWalks, name }) => {
  return (
    <section className="dashboardRecap">
      <h2>Recap</h2>
      <h4>{`${t2(`${name}  ${walkLeaders} walk leader`, `${name} ${walkLeaders} walk leaders`, walkLeaders)} led ${t2('walk', 'walks', walks)} as a part of Jane's Walk ${year}, reaching more than ${t2('participant', 'participants', participants)}` }.</h4>

      <h4>{`Since ${name} first participated in Jane's Walk in ${originalYear}, ${t2('walk leader', 'walk leaders', totalWalkLeaders)} have led ${t2(`${totalWalks} Jane's Walk`, `${totalWalks} Jane's Walks`, totalWalks)}`}.</h4>
    </section>
  );
};

DashboardSummary.PropTypes = {
  name: React.PropTypes.string.isRequired,
  walkLeaders: React.PropTypes.array.isRequired,
  walks: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  impact: React.PropTypes.array.isRequired,
};

export default DashboardSummary;