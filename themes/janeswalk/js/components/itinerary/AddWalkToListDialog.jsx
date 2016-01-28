import {remove, add, createList, walkSelected, viewList, addWalkDialog, updateTitle, updateDescription} from '../../actions/ItineraryActions';

const AddWalkToListDialog = ({lists, activeWalk}) => {
  //selectedWalk comes from where
  const allLists = lists.map(({id, title, walks}) => {

    const walkFound = activeWalk && walks.find(walk => walk.id === activeWalk.id);

    if (walkFound) {
      return (
        <li key={id}>
          <a onClick={(ev) => remove(activeWalk.id, id)} className="fa fa-check">{title}</a>
        </li>
      )
    } else {
      return (
        <li key={id}>
          <a onClick={(ev) => add(activeWalk.id, id, activeWalk)}>{title}</a>
        </li>
      )
    }
  });

  return (
    <dialog id="addWalk" className="add-walk-to-list">
      <h5> Add {activeWalk.title} to...</h5>
      <ul>
        {allLists}
      </ul>
      <button onClick={ev => {createList(newList, activeWalk.id, activeWalk); this.setState({newList:null})}}>
        Create
      </button>
      <button onClick={ev => addWalkDialog()}>
        Close
      </button>
    </dialog>
  )
};

AddWalkToListDialog.propTypes = {
    lists: React.PropTypes.array
};

AddWalkToListDialog.defaultProps = {
  activeWalk: {id: 0}
};

export default AddWalkToListDialog;
