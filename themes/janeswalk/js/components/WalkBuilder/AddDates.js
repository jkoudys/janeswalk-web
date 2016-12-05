/**
 * AddDates
 *
 * A date builder.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import DatePicker from './DatePicker';

import { createElement as ce } from 'react';

import { Form } from 'antd';

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
    ce('section', { id, className: 'Lead__Option' },
      ce('h1', {}, name),
      ce(Form.Item, {
        label: t`${title} will happen on`,
      },
        slots.map(slot => ce(DatePicker, { slot }))
      ),
      ce(Form.Item, {
        label: t`How long is your walk, approximately?`,
      },
        ce('select', { name: 'duration' },
          durations.map(([value, text]) => ce('option', { key: value, value }, text))
        )
      )
    )
  );
};

export default AddDates;
