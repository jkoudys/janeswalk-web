/* global React */
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { getThemeName } from 'janeswalk/utils/lookups/Theme';

// TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
// TODO: Make walkMenu sticky - will complete after Dashboard

const menuItems = [
  { display: 'About This Walk', exists: true },
  { display: 'Walk Route', exists: true },
  { display: 'How to find us', exists: true },
  { display: 'Taking Public Transit', exists: false },
  { display: 'Parking Availability', exists: false },
  { display: 'About the Walk Team', exists: true },
];

const WalkMenu = ({ walk: { checkboxes, title, map, time, team, accessibleTransit, accessibleParking } }) => {
  const walkLeader = team.find(member => member.role === 'walk-leader');

  let leaderHead;
  let nextDateHead;
  let meetingPlaceHead;

  if (walkLeader) {
    leaderHead = <h6>Led By {walkLeader['name-first']} {walkLeader['name-last']} </h6>;
  }
  if (time.slots.length) {
    nextDateHead = <h6>{dateFormatted(time.slots[0][0])}</h6>;
  }
  if (map.markers.length) {
    meetingPlaceHead = <h6>Meeting at {map.markers[0].title}</h6>;
  }

  // TODO Convert below to a Utility to use in multiple places like <Dashboard/> <CityWalksFilter/>
  // <WalkPublicTransit {...walk} />
  // <WalkParking {...walk} />
  const tags = Object.keys(checkboxes).filter(item => item.includes('theme'));

  // TODO: <WalkAccessibility {...walk} {...filters} /> temporarily removed (below {meetingPlaceHead})

  // TODO: Improve functionality to be generic for displaying menuItems, and specific react components
  if ((accessibleTransit || []).length > 0) menuItems[3].exists = true;
  if ((accessibleParking || []).length > 0) menuItems[4].exists = true;

  return (
    <section className="walkMenu">
      <header className="walkHeader">
        <h5>{title}</h5>
        {leaderHead}
        {nextDateHead}
        {meetingPlaceHead}
      </header>
      <section className="menu">
        <ul>
          {menuItems.filter(item => item.exists).map((item, i) => (
            <li key={i}>
              <a href={`#${item.display}`}>
                {item.display}
              </a>
            </li>
          ))}
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
