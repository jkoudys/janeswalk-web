//TODO: ImpactReport is not set-up
import ImpactReport from './ImpactReport.jsx';

import DashboardSummary from './DashboardSummary.jsx';
import DashboardResources from './DashboardResources.jsx';
import MyBlogPosts from './MyBlogPosts.jsx';
import Walks from './Walks.jsx';
import WalkLeaders from './WalkLeaders.jsx';

const getMenu = () => ({
  menuItems: DashboardStore.getMenuItems(),
});

//TODO*: Refactoring Components, and Sticky Active Menu Item
//TODO*: Show number of each menu item

const Components = {DashboardResources, MyBlogPosts, Walks, WalkLeaders};

const getComponent = ({componentName}) => (Components[componentName]);

export default class DashboardMenu extends React.Component {
  constructor(props, ...args){
    super(props, ...args);
    this.state = getMenu();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DashboardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getMenu);
  }

  render() {
    const {menuItems} = this.state;

    const menu = menuItems.map((item, i) => {
      const Component = item.active ? getComponent(item) : null;
      return (
          <section>
            <li key={i} className={item.active ? 'activeMenuItem' : null } onClick={() => DashboardActions.toggleMenuItems(item.display)}>
              <i className="icon-caret-right"></i>
              {item.display}
            </li>
            {Component ? <Component location={item.link}/> : null }
          </section>);
      }
    );

    //Dashboard Resources is displayed by default if not other menu item is selected
    const displayResources = menuItems.every(a => a.active === false);

    return (
      <section className="dashboardMenu">
        <ul>{menu}</ul>
        { displayResources ? <DashboardResources/> : null }
      </section>
    );
  }

};

export default DashboardMenu;
