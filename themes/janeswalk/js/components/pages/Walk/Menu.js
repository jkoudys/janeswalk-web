import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { getThemeName } from 'janeswalk/utils/lookups/Theme';
import t from 'es2015-i18n-tag';

import { createElement as ce, PropTypes } from 'react';

const WalkMenu = ({
  title = '',
  map = { markers: [], route: [] },
  time = { slots: [] },
  accessibleTransit = [],
  accessibleParking = [],
  leaders,
  themes,
}) => {
  // TODO: these should populate from the children of the main page, like in the CaW
  const menuItems = [
    { display: t`About This Walk`, exists: true },
    { display: t`Walk Route`, exists: true },
    { display: t`How to find us`, exists: true },
    { display: t`Taking Public Transit`, exists: !!accessibleTransit.length },
    { display: t`Parking Availability`, exists: !!accessibleParking.length },
    { display: t`About the Walk Team`, exists: true },
  ];

  let leaderHead;
  let nextDateHead;
  let meetingPlaceHead;

  if (leaders) {
    leaderHead = ce('h6', {}, t`Led by ${leaders.join(', ')}`);
  }
  if (time.slots.length) {
    nextDateHead = ce('h6', {}, dateFormatted(time.slots[0][0]));
  }
  if (map.markers.length) {
    meetingPlaceHead = ce('h6', {}, t`Meeting at ${map.markers[0].title}`);
  }

  // TODO: <WalkAccessibility {...walk} {...filters} /> temporarily removed (below {meetingPlaceHead})

  return (
    ce('section', { className: 'walkMenu' },
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
      ce('section', { className: 'tags' }, themes.map((theme, i) => (
        ce('span', { className: 'tag', key: i }, '#', t([getThemeName(theme) || theme]))
      )))
    )
  );
};

WalkMenu.propTypes = {
  walk: PropTypes.object.isRequired,
};

export default WalkMenu;
