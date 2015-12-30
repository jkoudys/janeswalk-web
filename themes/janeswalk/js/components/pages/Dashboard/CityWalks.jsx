
import Walks from './Walks.jsx';
import DashboardStore from './DashboardStore';

//TODO: Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin (Post PR)

const CityWalks = () => (
  <section>
    <Walks walks={DashboardStore.getCityWalks().walks}/>
  </section>
);

export default CityWalks;

//TODO: Flux (Post PR)
// Page
// Action - JSON API Call
// Result
// Dispatch
// Listener
// Updates to State