import AddToItinerary from '../../itinerary/AddToItinerary.jsx';

// TODO: Duplicate of Itinerary <Walk/>

/**
 * Build a style object for the header
 * @return object A style object for React
 */
function headerBG(city, walk) {
  // Load the BG
  const thumb = (walk.thumbnails[0] && walk.thumbnails[0].url) || city.background;
  let bg;
  if (thumb) {
    bg = 'url(' + thumb + ')';
  } else {
    bg = '#eaeaea';
  }

  return {
    backgroundImage: bg,
    backgroundSize: 'cover',
    backgroundPosition: '50%'
  };
}

// Read a map, return the meeting place or null
function getMeetingPlace(map) {
  if (map && map.markers && map.markers.length) {
    return map.markers[0].title;
  }
}

import WalkStore from 'janeswalk/stores/WalkStore';

const WalkHeader = ({city, walk, favourites, itinerary, onAdd, onRemove}) => {
  const {title, map, time, team, thumbnails} = walk;
  const {url, name} = city;

  //TODO: This is problematic since there are many different type of roles defined, not a finite list
  const walkLeader = team.find(member => member.role === 'walk-leader');

  let meetingPlace = getMeetingPlace(map);

  let favButton;

  if (favourites && favourites.walks.has(walk)) {
    favButton = <button className="removeFavourite" onClick={() => onRemove(favourites)} />;
  } else {
    favButton = <button className="addFavourite" onClick={() => onAdd(favourites)} />;
  }

  return(
    <section className="walkHeader">
      <section className="coverImage" style={headerBG(city, walk)}>
        <ul className="breadcrumb">
          <li><a href="/"><i className="fa fa-home" /></a></li>
          <li><a href={url}>{`${name} walks`}</a></li>
          <li className="active">{title}</li>
        </ul>
      </section>
      <h1>{title} {favButton}</h1>
      {meetingPlace ? <h4>{meetingPlace}</h4> : null}
      <h4>{walkLeader ? `Led By ${walkLeader['name-first']} ${walkLeader['name-last']} - ` : null}</h4>
      <AddToItinerary
        itinerary={itinerary}
        time={time}
        walk={walk}
        onAdd={onAdd}
        onRemove={onRemove}/>
    </section>
  );
};

WalkHeader.propTypes = {
  walk: React.PropTypes.object.isRequired,
  remove: React.PropTypes.func.isRequired,
  add: React.PropTypes.func.isRequired,
};

WalkHeader.defaultProps = {
  remove: null,
  add: null,
};

export default WalkHeader;
