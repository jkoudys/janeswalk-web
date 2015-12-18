import React from 'react';

//TODO: Define as a path in a common place to share with other components
import { dateFormatted } from '../../../../../../blocks/page_list/templates/itinerary/itinerary/ItineraryUtils';

//TODO: Duplicate of Itinerary <Walk/>

const WalkHeader = ({walk, id, remove, add, existsInItinerary, existsInFavourites, favoriteListId, itineraryListId}) => {

  const favButton = () => {
    if (existsInFavourites) return <button className="removeFavourite" onClick={()=>remove(id,favoriteListId)}> </button>;
    else return <button className="addFavourite" onClick={()=>add(id,favoriteListId)}> </button>;
  };

  const addButton = () => {
    if(existsInItinerary) return <button className="removeItinerary" onClick={()=>remove(id,itineraryListId)}>I'm going</button>;
    else return <button className="addItinerary" onClick={()=>add(id,itineraryListId)}> </button>;
  };

  const addToFavourites = favButton();
  const addToItinerary = addButton();
  const {title, map, time, team} = walk;
  const walkLeader = team.find(member => member.role === 'walk-leader');

  return(
    <section id="walkHeader">
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