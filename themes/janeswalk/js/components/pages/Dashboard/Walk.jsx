/* global React */
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { Component, createElement: ce } = React;

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
      team,
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
          (team && team.length) ?
            ce('h4', {},
               'Led by ',
               `${team[0]['name-first']} ${team[0]['name-last']}`,
               ' ',
               ce('a', { href: `mailto:${team[0].email}` }, team[0].email),
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
  title: React.PropTypes.string,
  start: React.PropTypes.number,
  meeting: React.PropTypes.string,
  id: React.PropTypes.string.isRequired,
};

export default Walk;
