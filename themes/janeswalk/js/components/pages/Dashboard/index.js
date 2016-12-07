import React, { createElement as ce } from 'react';

import UserStore from 'janeswalk/stores/UserStore';
import CityStore from 'janeswalk/stores/CityStore';
import WalkStore from 'janeswalk/stores/WalkStore';

import Header from './Header.jsx';
import Menu from './Menu.jsx';
import Summary from './Summary.jsx';

const getDashData = () => ({
  walks: WalkStore.getWalks(),
  users: UserStore.getUsers(),
  currentUser: UserStore.getCurrent(),
  city: CityStore.getCity(),
  announcements: require('../../../json/MessageStubs.json'),
});

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
      ce('section', { className: 'dashboard' },
        ce(Header, { user, announcements }),
        ce(Menu, { walks, users, user, city, currentUser, edit }),
        ce(Summary, {
          city,
          walks,
          year: 2015,
          leaders: [1, 2],
          participants: [5, 6],
        })
      )
    );
  }
}
