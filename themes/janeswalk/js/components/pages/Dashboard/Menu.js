// TODO: ImpactReport is not set-up
// import ImpactReport from './ImpactReport.jsx';
import { createElement as ce, PureComponent } from 'react';
import t from 'es2015-i18n-tag';

import Walks from './Walks';

export default class Menu extends PureComponent {
  constructor(props, ...args) {
    super(props, ...args);

    const menuItems = [
      ['div', t`Lead a Walk`, false, { url: '/walk/form' }],
      [Walks, t`My Walks`, false, { show: 'user' }],
      [Walks, t`Walks in My City`, false, { show: 'city' }],
    ];

    if (props.user.id === props.currentUser.id) {
      menuItems.unshift(['div', t`Edit Profile`, false, { url: '/profile/edit' }]);
    }

    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?, props] tuples
    Object.assign(this, {
      state: {
        menuItems,
      },
    });
  }

  componentWillReceiveProps({ user, currentUser }) {
    if (user.id === currentUser.id) {
      const { menuItems } = this.state;

      this.setState({ menuItems });
    }
  }

  toggleSection(idx) {
    const newItems = this.state.menuItems.slice();
    const [component, title, isOpen, props] = newItems[idx];

    if (component === 'div') {
      window.open(props.url);
    } else {
      newItems[idx][2] = !newItems[idx][2];
      this.setState({ menuItems: newItems });
    }
  }

  render() {
    const { menuItems } = this.state;
    const { walks, city, user, edit, currentUser } = this.props;

    const menu = menuItems.map(([Component, name, open, props], i) => (
      ce('section', { key: `menuSection${i}` },
        ce('li', {
          className: open ? 'activeMenuItem' : '',
          onClick: () => this.toggleSection(i),
        },
          ce('i', { className: 'icon-caret-right' }), ` ${name}`
        ),
        open ? ce(Component, { user, walks, city, edit, currentUser, ...props }) : null
      )
    ));

    return (
      ce('section', { className: 'dashboardMenu' },
        ce('ul', {}, menu)
      )
    );
  }
}
