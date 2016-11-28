/**
 * AddDates
 *
 * A date builder.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import DatePicker from './DatePicker';
import FieldSet from './FieldSet';

import { createElement as ce } from 'react';

const halfHour = 30 * 60 * 1000;

const AddDates = ({
  id,
  name,
  order,
  title = 'Your walk',
  slots = [],
  length = 60 * 60 * 1000,
  handleRemoveSlot,
  handleAddSlot,
  handleUpdateSlot,
}) => {
  // Config the available durations we can choose
  const durations = [
    [2 * halfHour, t`1 Hour`],
    ...Array.from({ length: 5 }).map((_, i) => [(i + 3) * halfHour, t`${0.5 * i + 1} Hours`]),
  ];

  return (
    ce('section', { id },
      ce('h1', {}, name),
      ce(FieldSet, {},
        ce('p', {}, t`${title} will happen on`),
        slots.map(slot => ce(DatePicker, { slot }))
        ),
      ce(FieldSet, {},
        ce('legend', {}, t`How long is your walk, approximately?`),
        ce('select', { name: 'duration' },
          durations.map(([value, text]) => ce('option', { key: value, value }, text))
        )
      )
    )
  );
};

export default AddDates;
