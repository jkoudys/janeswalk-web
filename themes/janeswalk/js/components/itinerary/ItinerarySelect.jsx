import {createList} from '../../actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

const ItinerarySelect = ({lists, activeList, onChoose, onCreate}) => {
  const listItems = [];
  lists.forEach(list => listItems.push(
    <li key={list.id}>
      <a className={activeList === list ? 'selected' : ''} onClick={() => onChoose(list)}>
        {list.title} ({list.walks.size})
      </a>
    </li>
  ));

  return (
    <dialog id="itinerary-select" className="static-list">
      <ul>
        {listItems}
      </ul>
      <button onClick={onCreate}>
        <i className="fa fa-plus" /> {t('New List')}
      </button>
    </dialog>
  );
};

export default ItinerarySelect;
