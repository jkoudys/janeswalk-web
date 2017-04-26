import { createElement as ce } from 'react';
import { dateFormatted } from 'janeswalk/utils/ItineraryUtils';
import t from 'es2015-i18n-tag';

const AddToItinerary = ({ schedule, time, walk, onSchedule, onUnschedule }) => {
  const timeSet = schedule.get(walk) || new Set();
  let addButtons;

  if (time && time.slots) {
    addButtons = [...time.slots].map(([start, end]) => {
      const date = dateFormatted(start);
      const hours = (end - start) / 3600;
      // FIXME: not all languages have the same pluralisation rules
      const duration = (hours === 1) ? t`${hours} Hour` : t`${hours} Hours`;
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
