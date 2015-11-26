import { dateFormatted } from './Itinerary-Utils';
import React from 'react';

export default ({walk,remove}) => {
  return (
    <div>
      <div id="walkDetails">
        <h4>{walk.title}</h4>
        <h4>{dateFormatted(walk.time.slots[0][0])}</h4>
      </div>

      <div id="removeWalk">
        <button onClick={remove.bind(null,walk.id)}> remove </button>
      </div>

    </div>
  );
};