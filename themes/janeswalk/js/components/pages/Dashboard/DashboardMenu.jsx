// TODO: ImpactReport is not set-up
// import ImpactReport from './ImpactReport.jsx';

import DashboardSummary from './DashboardSummary.jsx';
import DashboardResources from './DashboardResources.jsx';
import MyBlogPosts from './MyBlogPosts.jsx';
import Walks from './Walks.jsx';
import WalkLeaders from './WalkLeaders.jsx';

export default class DashboardMenu extends React.Component {
  constructor(props, ...args){
    super(props, ...args);

    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?] tuples
    this.state = {
      menuItems: [
        [DashboardResources, 'Dashboard Resources', true],
        [MyBlogPosts, 'My Blog Posts', false],
        [Walks, 'Walks', false],
        [WalkLeaders, 'Walk Leaders', false]
      ]
    };
  }

  toggleSection(idx) {
    const newItems = this.state.menuItems.slice();
    newItems[idx][2] = !newItems[idx][2];
    this.setState({menuItems: newItems});
  }

  render() {
    const {menuItems} = this.state;

    const menu = menuItems.map(([Component, name, open], i) => (
      <section>
        <li
          key={i}
          className={open ? 'activeMenuItem' : null}
          onClick={() => this.toggleSection(i)}>
          <i className="icon-caret-right" /> {name}
        </li>
        <Component />
      </section>
    ));

    return (
      <section className="dashboardMenu">
        <ul>{menu}</ul>
      </section>
    );
  }
};
