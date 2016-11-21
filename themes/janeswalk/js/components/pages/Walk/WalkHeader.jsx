import React from 'react';

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import AddToItinerary from '../../itinerary/AddToItinerary.jsx';

const { createElement: ce } = React;

/**
 * Build a style object for the header
 * @return object A style object for React
 */
function headerBG({ background }, { thumbnails = [] }) {
  // Load the BG
  return (thumbnails[0] && thumbnails[0].url) || background;
}

// Read a map, return the meeting place or null
function getMeetingPlace(map) {
  if (map && map.markers && map.markers.length) {
    return map.markers[0].title;
  }
  return '';
}

function getLeaders(team) {
  const leaders = team.filter(member => (member.role === 'walk-leader' || member.type === 'leader'));
  return leaders.map(leader => `${leader['name-first']} ${leader['name-last']}`.trim()).join(', ');
}

const WalkHeader = ({
  canEdit = false,
  city,
  walk,
  walk: {
    id,
    title,
    map,
    time,
    team = [],
  },
  isFavourite,
  schedule,
  onAdd,
  onRemove,
  onSchedule,
  onUnschedule,
}) => {
  const meetingPlace = getMeetingPlace(map);
  const removeProps = { className: 'removeFavourite', onClick: onRemove };
  const addProps = { className: 'addFavourite', onClick: onAdd };

  const favButton = ce('button', isFavourite ? removeProps : addProps);
  const headImage = (src => (src ? ce('img', { src }) : null))(headerBG(city, walk));

  return (
    ce('section', { className: 'walkHeader' },
      ce('figure', { className: 'coverImage', style: { backgroundColor: '#eaeaea' } },
        headImage,
        ce('ul', { className: 'breadcrumb' },
          ce('li', null,
            ce('a', { href: '/' },
              ce('i', { className: 'fa fa-home' }),
            ),
          ),
          ce('li', null,
            ce('a', { href: city.url }, `${city.name} walks`),
          ),
          ce('li', { className: 'active' }, title),
        ),
      ),
      ce('h1', null, title, ' ', favButton),
      canEdit ? (
        ce('h4', null,
          ce('a', { href: `/walk/form/${id}` },
            ce('i', { className: 'fa fa-pencil-square-o' }), ' ', t`Edit`
          )
        )
      ) : null,
      meetingPlace ? ce('h4', null, meetingPlace) : null,
      team.length ? ce('h4', null, t`Led By ${getLeaders(team)}`) : null,
      ce(AddToItinerary, { time, walk, schedule, onSchedule, onUnschedule }),
    )
  );
};

WalkHeader.propTypes = {
  walk: React.PropTypes.object.isRequired,
  city: React.PropTypes.object.isRequired,
  isFavourite: React.PropTypes.bool,
  onRemove: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  onSchedule: React.PropTypes.func.isRequired,
  onUnschedule: React.PropTypes.func.isRequired,
};

export default WalkHeader;
