export default class AddWalkToListDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      newList: null
    }
  }

  render() {
    const {lists, remove, add, createList, activeWalk, walkDialogOpen, addWalkDialog, viewList} = this.props;
    const {newList} = this.state;
    //selectedWalk comes from where

    if (walkDialogOpen) {

      const allLists = lists.map(list => {

        const {id, title, walks} = list;

        const walkFound = walks.find(walk => walk.id === activeWalk.id);

        if (walkFound){
          return (
            <li key={id} onClick={(ev) => remove(activeWalk.id, list.id)}>
              <span className="fa fa-check">{title}</span>
            </li>
          )
        } else {
          return (
            <li key={id} onClick={(ev) => add(activeWalk.id, list.id, activeWalk)}>
              <span>{title}</span>
            </li>
          )
        }
      });

      return(
        <dialog id="addWalk" className="add-walk-to-list">
          <h5> Add {activeWalk.title} to...</h5>
          <ul>
            {allLists}
          </ul>

          <input placeholder="create a new list..." value={newList} onChange={ev => {this.setState({newList:ev.target.value})}}></input>

          <button onClick={ev => {createList(newList, activeWalk.id, activeWalk); this.setState({newList:null})}}>Create</button>
          <button onClick={ev => addWalkDialog()}>Close</button>
        </dialog>
      )
    } else {

      const allLists = lists.map(list => {

        const {id, title, walks} = list;

        return (
          <li key={id} onClick={(ev) => viewList(title)}>
            <span>{title}</span>
          </li>
        )
      });

      return(
        <dialog id="addWalk" className="static-list">
          <ul>
            {allLists}
          </ul>
          <input placeholder="create a new list..." value={newList} onChange={ev => {this.setState({newList:ev.target.value})}}></input>
          <button onClick={ev => {createList(newList); this.setState({newList:null})}}>Create</button>
        </dialog>
      )
    }

  }
}

AddWalkToListDialog.propTypes = {
    lists: React.PropTypes.array,
    add: React.PropTypes.func,
    createList: React.PropTypes.func,
    walkSelected: React.PropTypes.number,
};
