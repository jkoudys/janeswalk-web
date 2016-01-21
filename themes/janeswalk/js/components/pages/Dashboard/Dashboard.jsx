import DashboardStore from './DashboardStore';

import DashboardHeader from './DashboardHeader.jsx';
import DashboardMenu from './DashboardMenu.jsx';
import DashboardSummary from './DashboardSummary.jsx';

import './view.less';

const Dashboard = () => (
  <section className="dashboard">
    <DashboardHeader {...DashboardStore.getCityData()} {...DashboardStore.getLatestPost()}/>
    <DashboardMenu style="dashboard-page" {...DashboardStore.getCityData()} {...DashboardStore.getMenuItems()}/>
    <DashboardSummary {...DashboardStore.getRegionSummary()}/>
  </section>
);

export default Dashboard;