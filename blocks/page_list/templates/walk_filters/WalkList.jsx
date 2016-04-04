/**
 * The list of walks to order
 */
/* global $ */
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
      {walks.map(walk => <ListItem walk={walk} />)}
    </tbody>
  </table>
);
