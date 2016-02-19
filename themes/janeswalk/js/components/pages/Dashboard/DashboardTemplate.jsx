import DashboardHeader from './DashboardHeader.jsx';
import DashboardMenu from './DashboardMenu.jsx';

//TODO: Pass in as properties, rather than loading directly from the store, if it makes sense.
const DashboardTemplate = ( props ) => {
  debugger;
  return (
    <section>
      <DashboardHeader {...DashboardStore.getCityData()} {...DashboardStore.getLatestPost()}/>
      <DashboardMenu style="dashboard-page" {...DashboardStore.getCityData()} {...DashboardStore.getMenuItems()}/>
      {props.children}
    </section>
  );
};

export default DashboardTemplate;
