/* global React */
import { t, t2 } from 'janeswalk/stores/I18nStore';

// TODO: shim
let dtfDate;
let dtfDuration;
if (typeof Intl === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  dtfDuration = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
}

// Remove a slot of the time set table
function removeSlot(i, { value, value: { slots = [] }, requestChange }) {
  const removedSlots = slots.slice();
  removedSlots.splice(i, 1);
  requestChange(Object.assign({}, value, { slots: removedSlots }));
}

export default ({ slot, index, valueLink }) => {
  const handleClick = () => removeSlot(index, valueLink);

  const start = (new Date(slot[0] * 1000));
  const duration = (new Date((slot[1] - slot[0]) * 1000));

  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  const durationFmt = [];

  if (hours) {
    durationFmt.push(t2('%d Hour', '%d Hours', hours));
  }

  if (minutes) {
    durationFmt.push(t2('%d Minute', '%d Minutes', minutes));
  }

  return (
    <tr>
      <td>{dtfDate.format(start)}</td>
      <td>{dtfDuration.format(start)}</td>
      <td>{durationFmt.join(', ')}</td>
      <td>
        <a onClick={handleClick}>
          <i className="fa fa-times-circle-o" />&nbsp;{t('Remove')}
        </a>
      </td>
    </tr>
  );
};
