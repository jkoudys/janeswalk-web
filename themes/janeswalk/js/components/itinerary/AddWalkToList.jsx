import {remove, add, createList, walkSelected, viewList, addWalkDialog, updateTitle, updateDescription} from '../../actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

const AddWalkToList = ({lists, activeWalk}) => {
  //selectedWalk comes from where
  const allLists = lists.map(({id, title, walks}) => {

    const walkFound = activeWalk && walks.find(walk => walk.id === activeWalk.id);
    let action;
    if (walkFound) {
      action = () => remove(activeWalk.id, id);
    } else {
      action = () => add(activeWalk.id, id, activeWalk);
    }
      return (
        <li key={id}>
          <a onClick={action} className={walkFound ? 'selected' : ''}>{title}</a>
        </li>
      );
  });

  return (
    <div id="addWalk" className="add-walk-to-list">
      <strong>{t('Available in')}: </strong>
      <ul>
        {allLists}
      </ul>
    </div>
  )
};

AddWalkToList.propTypes = {
    lists: React.PropTypes.array
};

AddWalkToList.defaultProps = {
  lists: [],
  activeWalk: {id: 0}
};

export default AddWalkToList;
