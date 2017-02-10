import { Component, createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

import UserStore from 'janeswalk/stores/UserStore';
import CityStore from 'janeswalk/stores/CityStore';
import WalkStore from 'janeswalk/stores/WalkStore';
import AreaStore from 'janeswalk/stores/AreaStore';

import Header from './Header';
import Menu from './Menu';
import Summary from './Summary';

const getDashData = () => ({
  walks: WalkStore.getWalks(),
  users: UserStore.getUsers(),
  currentUser: UserStore.getCurrent(),
  city: CityStore.getCity(),
  announcements: AreaStore.getArea('Announcements COs only'),
});

export default class Dashboard extends Component {
  state = getDashData();

  _onChange = () => this.setState(getDashData);

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
    AreaStore.addChangeListener(this._onChange);
    CityStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
    CityStore.removeChangeListener(this._onChange);
    AreaStore.removeChangeListener(this._onChange);
  }

  render() {
    const { user, edit } = this.props;
    const { city, walks, users, announcements, currentUser } = this.state;

    return (
      ce('section', { className: 'dashboard' },
        ce(Header, { user, announcements }),
        ce(Menu, { walks, users, user, city, currentUser, edit }),
        ce(Summary, {
          city,
          walks,
          year: 2016,
          leaders: [1, 2],
          participants: [5, 6],
        })
      )
    );
  }
}
