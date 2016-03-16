/**
 * The cards showing your walk
 */
import Card from './Card.jsx';
import { t } from 'janeswalk/stores/I18nStore';

const WalkCards = ({ walks }) => {
  if (walks.length === 0) {
    return (
      <div className="empty">
        <h4>{t('Keep looking.')}</h4>
        <p>{t('We couldn\'t find any matching walks.')}</p>
      </div>
    );
  }
  return (
    <div className="walkCards">
      {walks.map((walk, i) => <Card key={`walk${i}`} walk={walk} />)}
    </div>
  );
};

export default WalkCards;
