/* global React */

import DashboardHeader from './Dashboard/DashboardHeader.jsx';
import DashboardMenu from './Dashboard/DashboardMenu.jsx';
import DashboardSummary from './Dashboard/DashboardSummary.jsx';

import UserStore from 'janeswalk/stores/UserStore';
import CityStore from 'janeswalk/stores/CityStore';
import WalkStore from 'janeswalk/stores/WalkStore';

function getDashData() {
  return {
    walks: WalkStore.getWalks(),
    users: UserStore.getUsers(),
    city: CityStore.getCity(),
    announcements: [{
      group: 'City Organizers',
      time: 1458763490599,
      title: 'The Walk 21 conference submissions deadline has been extended to Tuesday, March 15.',
      text: 'Walk 21 is an international organization that supports and promotes walking. Their annual conference is in Hong Kong this year, on October 3-7. http://www.walk21.com/',
    }, {
      group: 'City Organizers',
      time: 1458332436642,
      title: 'The 2016 poster and postcard templates are here!',
      text: 'To help you get the word out about your city\'s festival, we\'ve created an all-new set of downloadable templates for posters, postcards, and other promotional materials. Lots of styles and file formats to choose from! http://janeswalk.org/information/resources/posters-and-logos/',
    }, {
      group: 'City Organizers',
      time: 1457900438108,
      title: 'Would you like to be matched with a small group of Jane\'s Walk City Organizers in other cities, and chat with them online every couple of weeks? ',
      text: 'We\'re piloting Jane\'s Walk Coffee Talk, a peer-learning program for COs who\'d like to support and encourage each others\' work -- and meet people doing interesting things in other cities! If you\'d like to learn more, or sign up, email us at nadia.halim@janeswalk.org',
    }, {
      group: 'Walk Leaders',
      time: 1455048397000,
      title: 'New User Dashboard!',
      text: 'Jane\'s Walk Leaders and City Organizers now have a whole new dashboard. We\'re making it easier and simpler to organize your city, and your walks. Look here for more updates soon',
    }],
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
    const { user } = this.props;
    const { city, walks, users, announcements } = this.state;

    return (
      <section className="dashboard">
        <DashboardHeader user={user} announcements={announcements} />
        <DashboardMenu {...{ walks, users, user, city }} />
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
