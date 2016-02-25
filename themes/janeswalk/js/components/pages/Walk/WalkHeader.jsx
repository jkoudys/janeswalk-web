import {dateFormatted, startTimeIndex} from 'janeswalk/utils/ItineraryUtils';
import {add, remove} from 'janeswalk/actions/ItineraryActions';

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
    backgroundImage: bg,
    backgroundSize: 'cover',
    backgroundPosition: '50%'
  };
}

const WalkHeader = ({city, walk, favourites, itinerary}) => {
  const {title, map, time, team, thumbnails} = walk;
  const {url, name} = city;

  //TODO: This is problematic since there are many different type of roles defined, not a finite list
  const walkLeader = team.find(member => member.role === 'walk-leader');

  //addButtons may be many or just one
  let favButton, addButtons;
  //debugger;
  //if (favourites) {
    if (favourites && favourites.walks.has(walk)) {
      favButton = <button className="removeFavourite" onClick={() => remove(favourites, walk)} />;
    } else {
      favButton = <button className="addFavourite" onClick={() => add(favourites, walk)} />;
    }
  //}

  // Only show the add to itinerary if you can

  //TODO: Need to add the concept of time to WalkHeader

  //TODO: If itinerary.walks.has(walk) and time specific!
  if (itinerary) {
    if (itinerary.walks.has(walk)) {
      //retrieve start times for walk
      let startTimes = itinerary.walks.get(walk);

      addButtons = time.slots.map(t => {
        if (startTimeIndex(startTimes, t) == -1) {
          return (<h4>
            {dateFormatted(t[0])}
            <button className="addItinerary" onClick={() => add(itinerary, walk, t)}></button>
          </h4>)
        } else {
          return (<h4>
            {dateFormatted(t[0])}
            <button className="removeItinerary" onClick={() => remove(itinerary, walk, t)}></button>
          </h4>)
        }
      });
    } else {
      if (time && time.slots[0]) {
        addButtons = time.slots.map(t => (<h4> {dateFormatted(t[0])}
          <button className="addItinerary" onClick={() => add(itinerary, walk, t)} />
        </h4>));
      }
    }
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
      <h4>Meeting at {map.markers[0].title}</h4>
      <h4>{walkLeader ? `Led By ${walkLeader['name-first']} ${walkLeader['name-last']} - ` : null}</h4>
      {addButtons}
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
