import React from 'react';

export default class AddWalkToListDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      newList: null
    }
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
    const {newList} = this.state;
    //selectedWalk comes from where

    const allLists = lists.map(list => {

      const {id,title,walks} = list;

      const walkFound = walks.find(walk => walk.id === activeWalk);

      if (walkFound){
        //TODO: Issue with onClick, only available for last item in the list
        return (
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

        <input placeholder="Create a new List" value={newList} onChange={ev => {this.setState({newList:ev.target.value})}}></input>

        <button onClick={(ev) => {createList(activeWalk, newList);this.setState({newList:null})}}>Create</button>
        <button onClick={(ev) => document.getElementById('addWalk').close()}>Close</button>
      </dialog>
    )
  }
}