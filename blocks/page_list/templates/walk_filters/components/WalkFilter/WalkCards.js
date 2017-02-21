/**
 * The cards showing your walk
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import Card from './Card';

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
