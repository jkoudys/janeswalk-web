import DashboardStore from '../../stores/DashboardStore';

import DashboardHeader from './Dashboard/DashboardHeader.jsx';
import DashboardMenu from './Dashboard/DashboardMenu.jsx';
import DashboardSummary from './Dashboard/DashboardSummary.jsx';

export default class Dashboard extends React.Component {
  render() {
    return (
      <section className="dashboard">
        <DashboardHeader {...DashboardStore.getCityData()} {...DashboardStore.getLatestPost()}/>
        <DashboardMenu style="dashboard-page" {...DashboardStore.getCityData()} {...DashboardStore.getMenuItems()}/>
        <DashboardSummary {...DashboardStore.getRegionSummary()}/>
      </section>
    );
  }
}
