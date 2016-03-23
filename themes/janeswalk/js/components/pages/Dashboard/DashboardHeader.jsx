/* global React $ */
import WithLinks from 'janeswalk/components/WithLinks.jsx';

const DashboardHeader = ({ user: { firstName, groups }, announcements }) => (
  <header>
    <h3>{firstName.toUpperCase()} {groups.includes('City Organizers') ? 'Organizer' : 'Walk Leader'} Dashboard</h3>
    <h4>Hi, {`${firstName}!`} </h4>
    <section className="dashboardLatestPost">
      {announcements.filter(({ group }) => groups.includes(group)).slice(0, 3).map(({ title, time, text }) => [
        <h4>{title}</h4>,
        <h5>{$.datepicker.formatDate('M d, yy', new Date(time))}</h5>,
        <WithLinks>{text}</WithLinks>,
      ])}
    </section>
  </header>
);

DashboardHeader.PropTypes = {
  user: React.PropTypes.object.isRequired,
};

export default DashboardHeader;
