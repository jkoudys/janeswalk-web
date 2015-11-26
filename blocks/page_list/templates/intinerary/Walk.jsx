import { dateFormatted } from './Itinerary-Utils';
import React from 'react';


const Walk = ({title, start, meeting, remove, key}) => {
  return (
    <div>
      <div id="walkDetails">
        <h2>{title}</h2>
        <h4>{dateFormatted(start)}</h4>
        <h4>{meeting}</h4>
      </div>

      <div id="removeWalk">
        <button onClick={remove.bind(null, key)}> remove </button>
      </div>

    </div>
  );
};

Walk.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  meeting: React.PropTypes.string,
  key: React.PropTypes.number.isRequired,
  remove: React.PropTypes.func.isRequired,
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: Date.parse(new Date()),
};

export default Walk;