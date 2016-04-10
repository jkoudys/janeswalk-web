/* global React */

import Header from './Dashboard/Header.jsx';
import Menu from './Dashboard/Menu.jsx';
import Summary from './Dashboard/Summary.jsx';
// import Resources from './Dashboard/Resources.jsx';

import UserStore from 'janeswalk/stores/UserStore';
import CityStore from 'janeswalk/stores/CityStore';
import WalkStore from 'janeswalk/stores/WalkStore';

function getDashData() {
  return {
    walks: WalkStore.getWalks(),
    users: UserStore.getUsers(),
    currentUser: UserStore.getCurrent(),
    city: CityStore.getCity(),
    announcements: require('../../json/MessageStubs.json'),
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
    const { user, edit } = this.props;
    const { city, walks, users, announcements, currentUser } = this.state;

    return (
      <section className="dashboard">
        <Header user={user} announcements={announcements} />
        <Menu {...{ walks, users, user, city, currentUser, edit }} />
        <Summary
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
