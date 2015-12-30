import DashboardStore from './DashboardStore';

import DashboardHeader from './DashboardHeader.jsx';
import DashboardMenu from './DashboardMenu.jsx';
import CityWalks from './CityWalks.jsx';
import WalkLeaders from './WalkLeaders.jsx';
import MyWalks from './MyWalks.jsx';
import ImpactReport from './ImpactReport.jsx'; //TODO: Data for ImpactReport (Post-PR)
import DashboardSummary from './DashboardSummary.jsx';
import DashboardResources from './DashboardResources.jsx';
import DashboardTemplate from './DashboardTemplate.jsx';
import MyBlogPosts from './MyBlogPosts.jsx';

import {dashboard} from './DashboardStaticData';
import './view.less';

const DashboardPage = () => {
  return (
    <section>
      <DashboardSummary {...DashboardStore.getWalkLeadersAndVolunteers()} {...DashboardStore.getCityData()}/>
      <DashboardResources {...DashboardStore.getResources()}/>
    </section>
  );
};

const Dashboard = () => (
  <Router>
    <Route path="/" component={DashboardTemplate}>
      <IndexRoute component={DashboardPage}/>
      <Route path="cityWalks" component={CityWalks}/>
      <Route path="myWalks" component={MyWalks}/>
      <Route path="walkLeaders" component={WalkLeaders}/>
      <Route path="resources" component={DashboardResources}/>
      <Route path="posts" component={MyBlogPosts}/>
      <Route path="impact" component={ImpactReport}/>
    </Route>
  </Router>
);

export default Dashboard;