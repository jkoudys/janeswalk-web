/* global React */
import { t } from 'janeswalk/stores/I18nStore';
import TimeSetRow from './TimeSetRow.jsx';

/**
 * The table with all the times that the walks are scheduled
 */
export default ({ valueLink: { value: slots = [] }, valueLink }) => (
  <table className="table table-bordered table-hover" id="date-list-all">
    <thead>
      <tr>
        <th>{t('Date')}</th>
        <th>{t('Start Time')}</th>
        <th>{t('Duration')}</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {slots.map((slot, i) => <TimeSetRow key={`timerow${i}`} index={i} slot={slot} valueLink={valueLink} />)}
    </tbody>
  </table>
);
