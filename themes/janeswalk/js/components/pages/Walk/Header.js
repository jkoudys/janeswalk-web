import React from 'react';

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import AddToItinerary from '../../itinerary/AddToItinerary.jsx';

const { createElement: ce } = React;

function getLeaders(team) {
  return team
  .filter(({ type }) => type === 'leader')
  .map(({ name }) => name)
  .join(', ');
}

const WalkHeader = ({
  canEdit = false,
  city: {
    url: cityUrl,
    background: cityImg,
    name: cityName,
  },
  walk,
  walk: {
    id,
    title,
    features: [{ props: { title: meetingPlace } = {} } = {}] = [],
    time,
    team = [],
    images: [{ url: headerImg } = {}] = [],
  },
  isFavourite,
  schedule,
  onAdd,
  onRemove,
  onSchedule,
  onUnschedule,
}) => {
  const removeProps = { className: 'removeFavourite', onClick: onRemove };
  const addProps = { className: 'addFavourite', onClick: onAdd };

  const favButton = ce('button', isFavourite ? removeProps : addProps);
  const headImage = ce('img', { src: headerImg || cityImg });

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
            ce('a', { href: cityUrl }, `${cityName} walks`),
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
