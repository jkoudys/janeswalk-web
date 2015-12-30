
//TODO: Need to find or solidify the data source for impact data - some items not covered (in dashboard or impact static data) for below recap (Post PR)
//TODO: Bring in <SingleBarGraph/> (Post PR)
//TODO: Place all data collections items within the Store, remove reduces from below - also summary is not working, so remove this from here (Post PR)
//TODO: total walk leaders: ${impact.walkLeaders.reduce((p,c)=>(p.total + c.total),0)} (Post PR)
//TODO: total walks: ${impact.walks.reduce((p,c)=>(p.total + c.total),0)} (Post PR)
//TODO: Place all .length calls in Store instead. (Post PR)

const DashboardSummary = ({name, walkLeaders, walks, users, impact}) => {
  debugger;
  return (
    <section>
      <h2>Recap</h2>
      <h4>{`${walkLeaders.length} ${name} walk leaders led ${walks.length} walks as a part of Jane's Walk ${(new Date()).getFullYear()} reaching more than ${users.length} participants` }</h4>

      <h4>{`Since ${name} first participated in Jane's Walk in ${impact.walkLeaders[0].year}, 87 walk leaders have led 121 Jane's Walks`}</h4>
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