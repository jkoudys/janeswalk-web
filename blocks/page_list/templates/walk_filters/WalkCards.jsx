/**
 * The cards showing your walk
 */
import Card from './Card.jsx';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkCards = ({ outings }) => {
  if (outings.length === 0) {
    return (
      <div className="empty">
        <h4>{t`Keep looking.`}</h4>
        <p>{t`We couldn\'t find any matching walks.`}</p>
      </div>
    );
  }
  return (
    <div className="walkCards">
      {outings.map(({ walk, slot }) => <Card key={`walk${walk.id}${slot[0]}`} walk={walk} slot={slot} />)}
    </div>
  );
};

export default WalkCards;
