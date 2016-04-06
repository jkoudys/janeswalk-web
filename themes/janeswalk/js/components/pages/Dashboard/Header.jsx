/* global React $ */
import WithLinks from 'janeswalk/components/WithLinks.jsx';

import AreaStore from 'janeswalk/stores/AreaStore';

const getState = () => ({
  announcements: AreaStore.getArea('Announcements COs only'),
});

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: getState(),
      _onChange: () => this.setState(getState()),
    });
  }

  componentWillMount() {
    AreaStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AreaStore.removeChangeListener(this._onChange);
  }

  render() {
    const { user: { firstName, groups }, announcements } = this.props;

    return (
      <header>
        <h3>{firstName.toUpperCase()} {groups.includes('City Organizers') ? 'Organizer' : 'Walk Leader'} Dashboard</h3>
        <h4>Hi, {`${firstName}!`} </h4>
        <section className="dashboardLatestPost">
          {announcements.filter(({ group }) => groups.includes(group)).slice(0, 3).map(({ title, time, text }) => [
            <h4>{title}</h4>,
            <h5>{$.datepicker.formatDate('M d, yy', new Date(time))}</h5>,
            <WithLinks>{text}</WithLinks>,
          ])}
          {this.state.announcements ? <span dangerouslySetInnerHTML={{ __html: this.state.announcements }} /> : null}
        </section>
      </header>
    );
  }
}

DashboardHeader.PropTypes = {
  user: React.PropTypes.object.isRequired,
};

export default DashboardHeader;
