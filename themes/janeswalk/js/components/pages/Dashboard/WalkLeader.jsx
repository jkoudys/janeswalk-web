//TODO: Fix dateFormatted sort
import { dateFormatted } from './../itinerary/ItineraryUtils';

//TODO: Common component from <Itinerary/> <Walk/>, List component should be generic with configuration specified (maybe a mixing or factory) (Post-PR)
//TODO: Show volunteers - so static data generated is not correct (confirm with json data provided before proceeding with any changes

const Walk = ({firstName, lastName, walks, email}) => {

  const Walks = walks.map((w, i) => {
    const fullYear = (new Date(w.time.slots[0][0] * 1000)).getFullYear();
    return (<li key={i}><a href={w.url}>{w.title}</a> ({fullYear})</li>);
  });

  return (
    <li>
      <div className="walkLeader">
        <h3>Walk Leader: {`${firstName} ${lastName}`} <span className="walkLeaderEmail"><a href={`mailto:${email}`}>{email}</a></span></h3>
        <ul>
          <h4>
            {Walks}
          </h4>
        </ul>
      </div>
    </li>
  );
};

Walk.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  walks: React.PropTypes.array.isRequired,
  email: React.PropTypes.string.isRequired,
};

export default Walk;