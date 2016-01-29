import {remove, add, createList, walkSelected, viewList, addWalkDialog, updateTitle, updateDescription} from '../../actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

const ItinerarySelect = ({lists}) => (
  <dialog id="itinerary-select" className="static-list">
    <ul>
      {lists.map(({id, title, walks}) => <li key={id}><a onClick={() => viewList(title)}>{title} ({walks.length})</a></li>)}
    </ul>
    <button onClick={ev => createList('')}>
      {t('New List')}
    </button>
  </dialog>
);

export default ItinerarySelect;
