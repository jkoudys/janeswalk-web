import { createElement as ce } from 'react';
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import { t2 } from 'janeswalk/stores/I18nStore';

const AddToItinerary = ({ schedule, time, walk, onSchedule, onUnschedule }) => {
  const timeSet = schedule.get(walk) || new Set();
  let addButtons;

  if (time && time.slots) {
    addButtons = [...time.slots].map(([start, end]) => {
      const date = dateFormatted(start);
      const duration = t2('%s Hour', '%s Hours', (end - start) / 3600);
      if (timeSet.has(+start)) {
        return ce('h4', { key: `active${start}` },
          `${date}, ${duration}`,
          ce('button', { className: 'removeItinerary', onClick: () => onUnschedule(+start) }),
        );
      }
      return ce('h4', { key: `inactive${start}` },
        `${date}, ${duration}`,
        ce('button', { className: 'addItinerary', onClick: () => onSchedule(+start) }),
      );
    });
  }
  return ce('section', {}, addButtons);
};

export default AddToItinerary;
