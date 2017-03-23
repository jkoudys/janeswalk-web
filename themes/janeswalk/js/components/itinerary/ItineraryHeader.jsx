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
    (list.shareUrl && false) ?
      ce('h5', { className: 'shareUrl' },
        ce('a', { href: list.shareUrl },
          list.shareUrl,
        ),
      ) : null,
    ce('h4', { className: 'walklistDescription' },
      ce('textarea', {
        required: true,
        value: list.description,
        placeholder: t`Tell people about it! Start typing here to give your list some commentary.`,
        onChange: (ev) => onChangeDescription(ev.target.value),
      }),
    ),
  )
);

ItineraryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ItineraryHeader;
