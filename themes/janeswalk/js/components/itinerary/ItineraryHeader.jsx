import t from 'es2015-i18n-tag';
import { PropTypes, createElement as ce } from 'react';

const ItineraryHeader = ({ list, onChangeTitle, onChangeDescription }) => (
  ce('header', { className: 'itineraryHeader' },
    ce('h2', {},
      ce('input', {
        type: 'text',
        required: true,
        value: list.title,
        placeholder: t`My Itinerary's Title`,
        onChange: (ev) => onChangeTitle(ev.target.value),
      }),
    ),
  )
);

ItineraryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ItineraryHeader;
