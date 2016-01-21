import {dateFormatted} from '../../../utils/ItineraryUtils';
import Hello from 'janeswalk';

//TODO: Duplicate of Itinerary <Walk/>
//TODO: Issue with Favourite being removed on first attempt (works fine for Itinerary)

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
    background: bg,
    backgroundSize: 'cover',
    backgroundPosition: '50%'
  };
}

const WalkHeader = ({city, walk, id, remove, add, existsInItinerary, existsInFavourites, favoriteListId, itineraryListId}) => {
  const favButton = () => {
    if (existsInFavourites) return <button className="removeFavourite" onClick={()=>remove(id,favoriteListId)}> </button>;
    else return <button className="addFavourite" onClick={()=>add(id,favoriteListId)}> </button>;
  };

  const addButton = () => {
    if (existsInItinerary) return <button className="removeItinerary" onClick={()=>remove(id,itineraryListId)}></button>;
    else return <button className="addItinerary" onClick={()=>add(id,itineraryListId)}></button>;
  };

  const addToFavourites = favButton();
  const addToItinerary = addButton();
  const {title, map, time, team, thumbnails} = walk;
  const {url, name} = city;
  const walkLeader = team.find(member => member.role === 'walk-leader');

  return(
    <section className="walkHeader">
    <section className="coverImage" style={headerBG(city, walk)}>
      <ul className="breadcrumb">
        <li><a href="/"><i className="fa fa-home"></i></a></li>
        <li><a href={url}>{`${name} walks`}</a></li>
        <li className="active">{title}</li>
      </ul>
    </section>
      <h1>{title}{addToFavourites}</h1>
      <h4>Led By {walkLeader['name-first']} {walkLeader['name-last']} - {dateFormatted(time.slots[0][0])}{addToItinerary}</h4>
      <h4>Meeting at {map.markers[0].title}</h4>
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
