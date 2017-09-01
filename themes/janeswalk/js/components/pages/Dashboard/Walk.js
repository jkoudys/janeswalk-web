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
      const status = await unpublish(this.props.walkId);
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
      walkId,
      team: [{ name: ledBy, email: leaderEmail } = {}] = [],
      url,
      published,
      canEdit = false,
    } = this.props;
    const { unpublished } = this.state;
    const now = Date.now();

    return (
      ce('li', {},
        ce('div', { className: (start * 1000 > now) ? 'walk' : 'walk pastWalk' },
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
          canEdit ? ce('a', { className: 'option', href: `/walk/form/${walkId}` }, 'Edit') : null,
          (published && canEdit && !unpublished) ?
            ce('a', { onClick: this.handleUnpublish, className: 'option' }, 'Unpublish') :
            null,
          (start * 1000 > Date.now()) ?
            ce('p', {}, ce('strong', {}, t`Share on`, ': ',
              ce('a', { href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, target: '_blank' },
                 ce('i', { className: 'fa fa-facebook-square' }),
              ),
            )) : null,
        ),
      )
    );
  }
}

Walk.propTypes = {
  title: PropTypes.string,
  start: PropTypes.number,
  meeting: PropTypes.string,
  walkId: PropTypes.string.isRequired,
};

export default Walk;
