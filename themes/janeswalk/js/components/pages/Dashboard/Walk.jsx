//TODO: Fix dateFormatted sort
import { dateFormatted } from './../itinerary/ItineraryUtils';

//TODO: Common component from <Itinerary/> <Walk/> (Post PR)

const Walk = ({title, start, meeting, id, team, url}) => {
  //TODO: no consistent definition of "walk-leader", how to grab the 'Led by' data, grabbing first team member (Post PR)
  //TODO: Publish | Edit | Unpublish (PR)
  return (
    <li>
      <div className="walk">
        <h3>{title}</h3>
        <h4>{dateFormatted(start)}</h4>
        <h4>Led by {`${team[0]['name-first']} ${team[0]['name-last']} ${team[0]['email']}`}</h4>
        <h4>Meeting at {meeting}</h4>
        <button><a href="">Promote</a></button>
        <button><a href={`http://janeswalk.org/walk/form/?load=${url.split('.org')[1]}`}>Edit</a></button>
        <button><a href="">Unpublish</a></button>
      </div>
    </li>
  );
};

Walk.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  meeting: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: Date.now(),
};

export default Walk;