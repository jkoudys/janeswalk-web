import {dateFormatted, startTimeIndex} from 'janeswalk/utils/ItineraryUtils';

const AddToItinerary = ({itinerary, time, walk, onAdd, onRemove}) => {
  let addButtons = [];

  if (itinerary && time && time.slots) {
    if (itinerary.walks.has(walk)) {
      //retrieve start times for walk
      let startTimes = itinerary.walks.get(walk);

      addButtons = time.slots.map(t => {
        if (startTimeIndex(startTimes, t) == -1) {
          return (<h4>
            {dateFormatted(t[0])}
            <button className="addItinerary" onClick={() => onAdd(itinerary, t)}/>
          </h4>)
        } else {
          return (<h4>
            {dateFormatted(t[0])}
            <button className="removeItinerary" onClick={() => onRemove(itinerary, t)}/>
          </h4>)
        }
      });
    } else {
      if (time && time.slots[0]) {
        addButtons = time.slots.map(t => (<h4>
          {dateFormatted(t[0])}
          <button className="addItinerary" onClick={() => onAdd(itinerary, t)} />
        </h4>));
      }
    }
  }
  return (<section>
    {addButtons}
  </section>)
};

export default AddToItinerary;