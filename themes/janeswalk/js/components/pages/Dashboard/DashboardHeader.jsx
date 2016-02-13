// TODO: link to blog/message system

const DashboardHeader = ({user}) => (
  <header>
    <h3>{user.toUpperCase()} Organizer Dashboard</h3>
    <h4>Hi, {`${user.firstName}!`} </h4>
    <section className="dashboardLatestPost">
      <h4>New User Dashboard!</h4>
      <h5>Feb 9th, 2016</h5>
      <p>Jane's Walk Leaders and City Organizers now have a whole new dashboard. We're making it easier and simpler to organize your city, and your walks. Look here for more updates soon.</p>
    </section>
  </header>
);

DashboardHeader.PropTypes = {
  user: React.PropTypes.object.isRequired
};

export default DashboardHeader;
