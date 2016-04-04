/* global React */

import AddToItinerary from '../../itinerary/AddToItinerary.jsx';

// TODO: Duplicate of Itinerary <Walk />

/**
 * Build a style object for the header
 * @return object A style object for React
 */
function headerBG({ background }, { thumbnails = [] }) {
  // Load the BG
  const thumb = (thumbnails[0] && thumbnails[0].url) || background;
  let bg;
  if (thumb) {
    bg = `url(${thumb})`;
  } else {
    bg = '#eaeaea';
  }

  return {
    backgroundImage: bg,
    backgroundSize: 'cover',
    backgroundPosition: '50%',
  };
}

// Read a map, return the meeting place or null
function getMeetingPlace(map) {
  if (map && map.markers && map.markers.length) {
    return map.markers[0].title;
  }
  return '';
}

const WalkHeader = ({
  city,
  walk,
  walk: {
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
  // TODO: This is problematic since there are many different type of roles defined, not a finite list
  const walkLeader = team.find(member => member.role === 'walk-leader');
  const meetingPlace = getMeetingPlace(map);

  let favButton;
  if (isFavourite) {
    favButton = <button className="removeFavourite" onClick={onRemove} />;
  } else {
    favButton = <button className="addFavourite" onClick={onAdd} />;
  }

  return (
    <section className="walkHeader">
      <section className="coverImage" style={headerBG(city, walk)}>
        <ul className="breadcrumb">
          <li>
            <a href="/">
              <i className="fa fa-home" />
            </a>
          </li>
          <li>
            <a href={city.url}>
              {`${city.name} walks`}
            </a>
          </li>
          <li className="active">
            {title}
          </li>
        </ul>
      </section>
      <h1>{title} {favButton}</h1>
      {meetingPlace ? <h4>{meetingPlace}</h4> : null}
      {walkLeader ? <h4>{`Led By ${walkLeader['name-first']} ${walkLeader['name-last']} -`}</h4> : null}
      <AddToItinerary {...{ time, walk, schedule, onSchedule, onUnschedule }} />
    </section>
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
