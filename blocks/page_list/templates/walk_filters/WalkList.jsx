/**
 * The list of walks to order
 */
/* global React */
import ListItem from './ListItem.jsx';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

/**
 * The walk list
 */
export default ({ walks }) => (
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
      {walks.map((walk, i) => <ListItem key={`walk${i}`} walk={walk} />)}
    </tbody>
  </table>
);
