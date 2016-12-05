import React from 'react';

const AddWalkToList = ({ lists, walk, list, onAdd, onRemove }) => {
  // selectedWalk comes from where
  const allLists = [];

  for (const otherList of lists) {
    if (list !== otherList) {
      const { id, title, walks } = otherList;
      const walkFound = walks.has(walk);
      let action;

      if (walkFound) {
        action = () => onRemove(otherList);
      } else {
        action = () => onAdd(otherList);
      }

      allLists.push(
        <li key={id}>
          <a onClick={action} className={walkFound ? 'selected' : ''}>{title}</a>
        </li>
      );
    }
  }

  return (
    <div id="addWalk" className="add-walk-to-list">
      <ul>
        {allLists}
      </ul>
    </div>
  );
};

AddWalkToList.propTypes = {
  lists: React.PropTypes.instanceOf(Set),
};

export default AddWalkToList;
