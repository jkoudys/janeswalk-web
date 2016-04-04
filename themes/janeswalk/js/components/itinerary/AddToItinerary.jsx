/* global React */

import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';

const AddToItinerary = ({ schedule, time, walk, onSchedule, onUnschedule }) => {
  const addButtons = [];
  const timeSet = schedule.get(walk) || new Set();

  if (time && time.slots) {
    addButtons.push(...time.slots.map(t => {
      if (timeSet.has(+t[0])) {
        return (
          <h4>
            {dateFormatted(t[0])}
            <button className="removeItinerary" onClick={() => onUnschedule(+t[0])} />
          </h4>
        );
      }
      return (
        <h4>
          {dateFormatted(t[0])}
          <button className="addItinerary" onClick={() => onSchedule(+t[0])} />
        </h4>
      );
    }));
  }
  return (
    <section>
      {addButtons}
    </section>
  );
};

export default AddToItinerary;
