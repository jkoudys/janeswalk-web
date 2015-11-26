import { dateFormatted } from './ItineraryUtils';
import React from 'react';


const Walk = ({title, start, meeting, remove, key}) => (
    <li>
      <div className="walk">
        <h3>{title}</h3>
        <h4>{dateFormatted(start)}</h4>
        <h4>{meeting}</h4>
      </div>

      <div className="remove-walk">
        <button className="remove-button" onClick={remove.bind(null, key)}> remove </button>
      </div>
    </li>
);

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