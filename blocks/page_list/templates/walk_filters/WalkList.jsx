/**
 * The list of walks to order
 */
/* global React */
import ListItem from './ListItem.jsx';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

/**
 * The walk list
 */
export default ({ outings }) => (
  <table className="walklist table">
    <thead>
      <tr>
        <th>{t`Date`}</th>
        <th>{t`Time`}</th>
        <th>{t`Title`}</th>
        <th>{t`Meeting Place`}</th>
      </tr>
    </thead>
    <tbody>
      {outings.map(({ walk, slot }) => <ListItem key={`walk${walk.id}${slot[0]}`} walk={walk} slot={slot} />)}
    </tbody>
  </table>
);
