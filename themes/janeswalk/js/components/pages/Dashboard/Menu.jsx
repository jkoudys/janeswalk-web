/* global React */

// TODO: ImpactReport is not set-up
// import ImpactReport from './ImpactReport.jsx';

import { translateTag as t } from 'janeswalk/stores/I18nStore';

import Walks from './Walks.jsx';
import ProfileDisplay from './ProfileDisplay.jsx';
import ProfileEdit from './ProfileEdit.jsx';

export default class Menu extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?, props] tuples
    Object.assign(this, {
      state: {
        menuItems: [
          //          [props.user.id === props.currentUser.id ? ProfileEdit : ProfileDisplay, t`Profile`, false],
          [Walks, t`My Walks`, false, { show: 'user' }],
          [Walks, t`Walks in My City`, false, { show: 'city' }],
        ],
      },
    });
  }

  componentWillReceiveProps({ user, currentUser }) {
    if (user.id === currentUser.id) {
      const { menuItems } = this.state;

      // TODO: assuming index 0 is the profile is bad.
      //      menuItems[0][0] = ProfileEdit;
      this.setState({ menuItems });
    }
  }

  toggleSection(idx) {
    const newItems = this.state.menuItems.slice();
    newItems[idx][2] = !newItems[idx][2];
    this.setState({ menuItems: newItems });
  }

  render() {
    const { menuItems } = this.state;
    const { walks, city, user } = this.props;

    const menu = menuItems.map(([Component, name, open, props], i) => (
      <section>
        <li
          key={i}
          className={open ? 'activeMenuItem' : null}
          onClick={() => this.toggleSection(i)}
        >
          <i className="icon-caret-right" /> {name}
        </li>
        {open ? <Component {...{ user, walks, city, ...props }} /> : null}
      </section>
    ));

    return (
      <section className="dashboardMenu">
        <ul>{menu}</ul>
      </section>
    );
  }
}
