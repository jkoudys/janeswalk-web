import { Component, PropTypes, createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';

// TODO: (Post PR) Common component from <Itinerary/> <Walk/>
// https://github.com/jkoudys/janeswalk-web/blob/react14/models/page_types/Walk.php

function unpublish(id) {
  return fetch(`/index.php?cID=${id}`, {
    method: 'delete',
    credentials: 'include',
  })
  .then(res => res.json());
}

class Walk extends Component {
  // Unpublish is distinct from 'not published' -- it means we just unpublished it.
  state = { unpublished: false };

  handleUnpublish = async () => {
    try {
      const status = await unpublish(this.props.id);
      console.log(status);
      this.setState({ unpublished: true });
    } catch (error) {
      console.error(`Error unpublishing walk: ${error.message}`);
    }
  };

  render() {
    const {
      title = 'Walk Title',
      start,
      meeting = '{no meeting place}',
      id,
      team: [{ name: ledBy, email: leaderEmail } = {}] = [],
      url,
      published,
      canEdit = false,
    } = this.props;
    const { unpublished } = this.state;

    return (
      ce('li', {},
        ce('div', { className: start * 1000 > Date.now() ? 'walk' : 'walk pastWalk' },
          ce('h3', {},
            (published && !unpublished) ? null : 'DRAFT ',
            ce('a', { href: url }, title || '{untitled}'),
          ),
          ce('h4', {}, dateFormatted(start)),
          ledBy ?
            ce('h4', {},
               t`Led by ${ledBy}`,
               ' ',
               ce('a', { href: `mailto:${leaderEmail}` }, leaderEmail),
            ) : null,
          ce('h4', {}, t`Meeting at ${meeting}`),
          /* TODO: link to a 'promote' feature
           (start * 1000 > Date.now()) ?
            ce('button', {},
              ce('a', { href: '' }, 'Promote')
              ) : null, */
          canEdit ? ce('a', { className: 'option', href: `/walk/form/${id}` }, 'Edit') : null,
          (published && canEdit && !unpublished) ?
            ce('a', { onClick: this.handleUnpublish, className: 'option' }, 'Unpublish') :
            null,
        ),
      )
    );
  }
}

Walk.propTypes = {
  title: PropTypes.string,
  start: PropTypes.number,
  meeting: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Walk;