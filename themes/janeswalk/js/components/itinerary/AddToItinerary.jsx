import { createElement as ce } from 'react';
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { t2 } from 'janeswalk/stores/I18nStore';

const AddToItinerary = ({ schedule, time, walk, onSchedule, onUnschedule }) => {
  const addButtons = [];
  const timeSet = schedule.get(walk) || new Set();

  if (time && time.slots) {
    addButtons.push(...time.slots.map(t => {
      const date = dateFormatted(t[0]);
      const duration = t2('%s Hour', '%s Hours', (t[1] - t[0]) / 3600);
      if (timeSet.has(+t[0])) {
        return ce('h4', {},
          `${date}, ${duration}`,
          ce('button', { className: 'removeItinerary', onClick: () => onUnschedule(+t[0]) }),
        );
      }
      return ce('h4', {},
        `${date}, ${duration}`,
        ce('button', { className: 'addItinerary', onClick: () => onSchedule(+t[0]) }),
      );
    }));
  }
  return ce('section', {}, addButtons);
};

export default AddToItinerary;
