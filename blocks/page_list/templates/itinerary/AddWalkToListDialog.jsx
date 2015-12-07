export default class AddWalkToListDialog extends React.component {
  constructor(...args) {
    super(...args);
  }

  propTypes() {
    return {
      lists: React.PropTypes.array,
      add: React.PropTypes.func,
      createList: React.PropTypes.func,
      walkSelected: React.PropTypes.number,
    }
  }

  render() {
    const {lists, add, createList, activeWalk} = this.props;
    //selectedWalk comes from where

    const allLists = lists.map(list => {

      const {id,title,walks} = list;

      const walkFound = walks.find(walk => walk.id === activeWalk);

      if(walkFound){
        return ( //FIX: Issue with onClick, only available for last item in the list
          <li onClick={(ev) => add(activeWalk,list,ev.target.value)} key={id}>
            <span className="glyphicon glyphicon-ok">{title}</span>
          </li>
        )
      } else {
        return (
          <li key={id}>
            <span>{title}</span>
          </li>
        )
      }
    });

    return(
      <dialog id="addWalk">
        <ul>
          {allLists}
        </ul>

        <input ref="list" placeholder="Create a new List"></input>

        <button onClick={(ev) => createList(walkSelected.id, this.refs.list.value)}>Create</button>
        <button onClick={(ev) => document.getElementById('addWalk').close()}>Close</button>
      </dialog>
    )
  }
}