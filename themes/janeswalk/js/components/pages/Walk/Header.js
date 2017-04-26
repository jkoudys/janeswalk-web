import { PropTypes, createElement as ce } from 'react';

import t from 'es2015-i18n-tag';
import AddToItinerary from '../../itinerary/AddToItinerary.jsx';

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
    time,
    images: [{ url: headerImg } = {}] = [],
  },
  title,
  leaders,
  meetingPlace,
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
            ce('a', { href: cityUrl }, t`${cityName} walks`),
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
      leaders ? ce('h4', null, t`Led by ${leaders.join(', ')}`) : null,
      ce(AddToItinerary, { time, walk, schedule, onSchedule, onUnschedule }),
    )
  );
};

WalkHeader.propTypes = {
  walk: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  isFavourite: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onSchedule: PropTypes.func.isRequired,
  onUnschedule: PropTypes.func.isRequired,
};

export default WalkHeader;
