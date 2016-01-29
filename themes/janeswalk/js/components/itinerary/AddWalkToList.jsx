import {remove, add, createList, walkSelected, viewList, addWalkDialog, updateTitle, updateDescription} from '../../actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

const AddWalkToList = ({lists, activeWalk, activeList}) => {
  //selectedWalk comes from where
  const allLists = lists.filter(({id}) => id != activeList).map(({id, title, walks}) => {
    const walkFound = walks.includes(activeWalk);
    let action;

    if (walkFound) {
      action = () => remove(activeWalk, id);
    } else {
      action = () => add(activeWalk, id);
    }

    return (
      <li key={id}>
        <a onClick={action} className={walkFound ? 'selected' : ''}>{title}</a>
      </li>
    );
  });

  return (
    <div id="addWalk" className="add-walk-to-list">
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
