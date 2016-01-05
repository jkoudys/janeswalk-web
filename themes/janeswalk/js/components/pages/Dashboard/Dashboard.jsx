import DashboardStore from './DashboardStore';

//import CityWalks from './CityWalks.jsx';
import Walks from './Walks.jsx';
import WalkLeaders from './WalkLeaders.jsx';
//TODO: Data for ImpactReport
import ImpactReport from './ImpactReport.jsx';
import DashboardSummary from './DashboardSummary.jsx';
import DashboardResources from './DashboardResources.jsx';
import DashboardTemplate from './DashboardTemplate.jsx';
import MyBlogPosts from './MyBlogPosts.jsx';

import './view.less';

const DashboardPage = () => {
  return (
    <section>
      <DashboardSummary {...DashboardStore.getRegionSummary()}/>
      <DashboardResources {...DashboardStore.getResources()}/>
    </section>
  );
};

const Dashboard = () => (
  <Router>
    <Route path="/" component={DashboardTemplate}>
      <IndexRoute component={DashboardPage}/>
      <Route path="cityWalks" component={Walks}/>
      <Route path="myWalks" component={Walks}/>
      <Route path="walkLeaders" component={WalkLeaders}/>
      <Route path="resources" component={DashboardResources} {...DashboardStore.getResources()}/>
      <Route path="posts" component={MyBlogPosts}/>
      <Route path="impact" component={ImpactReport}/>
    </Route>
  </Router>
);

export default Dashboard;