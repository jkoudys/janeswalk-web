/* global React */
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { getThemeName } from 'janeswalk/utils/lookups/Theme';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce, PropTypes } = React;
const { assign } = Object;

// TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
// TODO: Make walkMenu sticky - will complete after Dashboard

const menuItems = [
  { display: t`About This Walk`, exists: true },
  { display: t`Walk Route`, exists: true },
  { display: t`How to find us`, exists: true },
  { display: t`Taking Public Transit`, exists: false },
  { display: t`Parking Availability`, exists: false },
  { display: t`About the Walk Team`, exists: true },
];

const WalkMenu = ({
  walk: {
    checkboxes = [],
    title = '',
    map = { markers: [], route: [] },
    time = { slots: [] },
    team = [],
    accessibleTransit = [],
    accessibleParking = [],
  },
}) => {
  const walkLeader = team.find(member => member.role === 'walk-leader');

  let leaderHead;
  let nextDateHead;
  let meetingPlaceHead;

  if (walkLeader) {
    leaderHead = <h6>{t`Led By ${[walkLeader['name-first'], walkLeader['name-last']].join(' ')}`} </h6>;
  }
  if (time.slots.length) {
    nextDateHead = <h6>{dateFormatted(time.slots[0][0])}</h6>;
  }
  if (map.markers.length) {
    meetingPlaceHead = <h6>{t`Meeting at ${map.markers[0].title}`}</h6>;
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
    ce('section', { className: 'walkMenu', ref: domRoot => assign(this, { domRoot }) },
      ce('header', { className: 'walkHeader' },
        ce('h5', {}, title),
        leaderHead,
        nextDateHead,
        meetingPlaceHead,
      ),
      ce('section', { className: 'menu' },
        ce('ul', {}, menuItems.filter(item => item.exists).map((item, i) => (
          ce('li', { key: i },
            ce('a', { href: `#${item.display}` }, item.display)
          )
        )))
      ),
      ce('section', { className: 'tags' }, tags.map((tag, i) => (
        ce('span', { className: 'tag', key: i }, `#${getThemeName(tag)}`)
      )))
    )
  );
};

WalkMenu.propTypes = {
  walk: PropTypes.object.isRequired,
};

export default WalkMenu;
