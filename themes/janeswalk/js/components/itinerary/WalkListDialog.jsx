

const WalkListDialog = ({lists, viewList}) => (
  <dialog id="addWalk" className="static-list">
    <ul>
      {lists.map(({id, title, walks}) => <li key={id}><a onClick={() => viewList(title)}>{title}</a></li>)}
    </ul>
    <input
      placeholder="create a new list..."
      value={newList}
      onChange={ev => {this.setState({newList:ev.target.value})}}
    />
    <button onClick={ev => {createList(newList); this.setState({newList:null})}}>Create</button>
  </dialog>
);

export default WalkListDialog;
