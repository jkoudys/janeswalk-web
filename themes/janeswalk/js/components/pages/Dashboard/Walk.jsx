/* global React */

import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

// TODO: (Post PR) Common component from <Itinerary/> <Walk/>
// https://github.com/jkoudys/janeswalk-web/blob/react14/models/page_types/Walk.php

class Walk extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, {
      handleUnpublish: () => {
        const path = this.props.url.split('.org')[1];

        fetch(path, { method: 'delete' })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log(`Error unpublishing walk: ${error.message}`));
      },
    });
  }

  render() {
    const {
      title = 'Walk Title',
      start,
      meeting = '{no meeting place}',
      id,
      team,
      url,
      published,
    } = this.props;

    return (
      <li key={id}>
        <div className={start * 1000 > Date.now() ? 'walk' : 'walk pastWalk'}>
          <h3>
            {published ? null : 'DRAFT '}
            <a href={url}>{title || '{untitled}'}</a>
          </h3>
          <h4>{dateFormatted(start)}</h4>
          {team && team.length ? (
            <h4>
              Led by {`${team[0]['name-first']} ${team[0]['name-last']}`} <a href={`mailto:${team[0].email}`}>{team[0].email}</a>
            </h4>
          ) : null}
          <h4>{t`Meeting at ${meeting}`}</h4>
          { start * 1000 > Date.now() ? <button><a href="">Promote</a></button> : null}
          <a className="option" href={`/walk/form/?load=${url.split('.org')[1]}`}>Edit</a>
          {published ? <a onClick={this.handleUnpublish} className="option">Unpublish</a> : null}
        </div>
      </li>
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
