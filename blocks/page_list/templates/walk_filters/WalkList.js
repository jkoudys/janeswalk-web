/**
 * The list of walks to order
 */
/* global React */
import ListItem from './ListItem';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

/**
 * The walk list
 */
export default ({ outings }) => (
  ce('table', { className: 'walklist table' },
    ce('thead', null,
      ce('tr', null,
        ce('th', null, t`Date`),
        ce('th', null, t`Time`),
        ce('th', null, t`Title`),
        ce('th', null, t`Meeting Place`),
      ),
    ),
    ce('tbody', null,
      outings.map(({ walk, slot }) => ce(ListItem, { key: `walk${walk.id}${slot[0]}`, walk, slot })),
    )
  )
);
