import React from 'react';

export default class AddWalkToListDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      newList: null
    }
  }

  render() {
    const {lists, add, createList, activeWalk, walkDialogOpen, addWalkDialog} = this.props;
    const {newList} = this.state;
    //selectedWalk comes from where

    const allLists = lists.map(list => {

      const {id,title,walks} = list;

      const walkFound = walks.find(walk => walk.id === activeWalk);

      if (walkFound){
        return (
          <li key={id} onClick={(ev) => add(activeWalk,list.id,ev.target.value)}>
            <span className="glyphicon glyphicon-ok">{title}</span>
          </li>
        )
      } else {
        return (
          <li key={id} onClick={(ev) => add(activeWalk,list.id,ev.target.value)}>
            <span>{title}</span>
          </li>
        )
      }
    });

    return(
      <dialog id="addWalk" open={walkDialogOpen}>
        <ul>
          {allLists}
        </ul>

        <input placeholder="create a new list..." value={newList} onChange={ev => {this.setState({newList:ev.target.value})}}></input>

        <button onClick={ev => {createList(activeWalk, newList);this.setState({newList:null})}}>Create</button>
        <button onClick={ev => addWalkDialog()}>Close</button>
      </dialog>
    )
  }
}

AddWalkToListDialog.propTypes = {
    lists: React.PropTypes.array,
    add: React.PropTypes.func,
    createList: React.PropTypes.func,
    walkSelected: React.PropTypes.number,
};