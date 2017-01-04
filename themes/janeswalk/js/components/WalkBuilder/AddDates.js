/**
 * AddDates
 *
 * A date builder.
 */
/* global React */
import { createElement as ce } from 'react';
import { Form, DatePicker } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const halfHour = 30 * 60 * 1000;
// Minutes we're allowed to pick
const minutesOff = Array.from({ length: 60 })
.map((e, i) => i + 1)
.filter(e => ![0, 30].includes(e));
const disabledMinutes = () => minutesOff;
const dateOptions = {
  format: 'LL, HH:mm',
  showTime: {
    disabledMinutes,
    format: 'HH:mm',
    hideDisabledOptions: true,
  },
};

const AddDates = ({
  id,
  name,
  title = 'Your walk',
  times = [],
  duration = 60 * 60 * 1000,
  handlers,
}) => {
  // Config the available durations we can choose
  const durations = [
    [2 * halfHour, t`1 Hour`],
    ...Array.from({ length: 5 }).map((_, i) => [(i + 3) * halfHour, t`${0.5 * i + 1.5} Hours`]),
  ];

  return (
    ce('section', { id, className: 'Lead__Option' },
      ce('h1', {}, name),
      ce(Form.Item, {
        label: t`${title} will happen on the following dates`,
      },
        times.map((value, i) => (
          ce('p', { key: `date${i}` },
            ce(DatePicker, { ...dateOptions, value, onChange: handlers.times(value) })
          )
        )),
        ce('p', {},
          ce(DatePicker, { placeholder: t`Add another date`, ...dateOptions, onChange: handlers.times(), value: null })
        )
      ),
      ce(Form.Item, {
        label: t`How long is your walk, approximately?`,
      },
        ce('select', { name: 'duration', value: duration, onChange: handlers.duration },
          durations.map(([value, text]) => ce('option', { key: value, value }, text))
        )
      )
    )
  );
};

export { dateOptions };
export default AddDates;
