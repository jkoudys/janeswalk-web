/**
 * The cards showing your walk
 */
/* global React */

import Card from './Card';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const WalkCards = ({ outings }) => {
  if (outings.length === 0) {
    return (
      ce('div', { className: 'empty' },
        ce('h4', null, t`Keep looking.`),
        ce('p', null, t`We couldn\'t find any matching walks.`),
      )
    );
  }
  return (
    ce('div', { className: 'walkCards' },
      outings.map(({ walk, slot }) => ce(Card, { key: `walk${walk.id}${slot[0]}`, walk, slot })),
    )
  );
};

export default WalkCards;
