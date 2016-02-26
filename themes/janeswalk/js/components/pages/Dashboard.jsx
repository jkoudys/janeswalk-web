import DashboardHeader from './Dashboard/DashboardHeader.jsx';
import DashboardMenu from './Dashboard/DashboardMenu.jsx';
import DashboardSummary from './Dashboard/DashboardSummary.jsx';

import UserStore from 'janeswalk/stores/UserStore';
import CityStore from 'janeswalk/stores/CityStore';
import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import WalkStore from 'janeswalk/stores/WalkStore';

function getDashData() {
  return {
    walks: WalkStore.getWalks(),
    users: UserStore.getUsers(),
    city: CityStore.getCity()
  };
}

export default class Dashboard extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = getDashData();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
    CityStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
    CityStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getDashData);
  }

  render() {
    const {user} = this.props;
    const {city, walks, users} = this.state;

    return (
      <section className="dashboard">
        <DashboardHeader user={user} />
        <DashboardMenu {...{walks, users, user, city}} />
        <DashboardSummary
          city={city}
          walks={walks}
          year={2015}
          leaders={[1, 2]}
          participants={[5, 6]}
        />
      </section>
    );
  }
}
