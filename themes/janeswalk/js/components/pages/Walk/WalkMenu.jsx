import {dateFormatted} from '../../../utils/ItineraryUtils';
import WalkAccessibility from './WalkAccessibility.jsx';
import WalkPublicTransit from './WalkPublicTransit.jsx';
import WalkParking from './WalkParking.jsx';

import {getThemeName} from 'janeswalk/utils/lookups/Theme';

//TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
//TODO: Make walkMenu sticky - will complete after Dashboard

const menuItems = ['About This Walk', 'Walk Route', 'How to find us', 'Taking Public Transit', 'Parking Availability', 'About the Walk Team'];

const WalkMenu = ({walk, filters}) => {

  const {checkboxes, title, map, time, team} = walk;
  let theme = {data: {}};
  if (filters) {
    theme = filters.theme;
  }
  const walkLeader = team.find(member => member.role === 'walk-leader');
  let leaderHead, nextDateHead, meetingPlaceHead;
  if (walkLeader) {
    leaderHead = <h6>Led By {walkLeader['name-first']} {walkLeader['name-last']} </h6>;
  }
  if (time.slots.length) {
    nextDateHead = <h6>{dateFormatted(time.slots[0][0])}</h6>;
  }
  if (map.markers.length) {
    meetingPlaceHead = <h6>Meeting at {map.markers[0].title}</h6>;
  }

  //TODO Convert below to a Utility to use in multiple places like <Dashboard/> <CityWalksFilter/>
  //<WalkPublicTransit {...walk} />
  //<WalkParking {...walk} />
  const tags = Object.keys(checkboxes).filter(item => item.includes('theme'));

  return (
    <section className="walkMenu">
      <header className="walkHeader">
        <h5>{title}</h5>
        {leaderHead}
        {nextDateHead}
        {meetingPlaceHead}
        <WalkAccessibility {...walk} {...filters} />
      </header>
      <section className="menu">
        <ul>
         {menuItems.map((item,i) => <li key={i}><a href={`#${item}`}>{item}</a></li>)}
        </ul>
      </section>
      <section className="tags">
        {tags.map((tag, i) => <span className="tag" key={i}>#{getThemeName(tag)}</span>)}
      </section>
    </section>
  );
};

WalkMenu.propTypes = {
  walk: React.PropTypes.object.isRequired,
};

export default WalkMenu;
