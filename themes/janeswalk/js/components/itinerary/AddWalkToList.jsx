import { PropTypes, createElement as ce } from 'react';

const AddWalkToList = ({ lists, walk, list, onAdd, onRemove }) => {
  // selectedWalk comes from where
  const allLists = [...lists].reduce((a, otherList) => {
    if (list !== otherList) {
      const { id, title, walks } = otherList;
      const walkFound = walks.has(walk);
      const onClick = walkFound ? () => onRemove(otherList) : () => onAdd(otherList);

      return a.concat(
        ce('li', { key: id },
          ce('a', { onClick, className: walkFound ? 'selected' : '' }, title),
        )
      );
    }
    return a;
  }, []);

  return (
    ce('div', { id: 'addWalk', className: 'add-walk-to-list' },
      ce('ul', {}, allLists),
    )
  );
};

AddWalkToList.propTypes = {
  lists: PropTypes.instanceOf(Set),
};

export default AddWalkToList;
