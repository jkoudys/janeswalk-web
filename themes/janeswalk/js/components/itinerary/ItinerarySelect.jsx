import { createList } from 'janeswalk/actions/ItineraryActions';
import t from 'es2015-i18n-tag';
import { createElement as ce } from 'react';

const ItinerarySelect = ({ lists, activeList, onChoose, onCreate }) => {
  const listItems = [];
  lists.forEach(list => listItems.push(
    ce('li', { key: list.id },
      ce('a', { className: activeList === list ? 'selected' : '', onClick: () => onChoose(list) },
        `list.title (${list.walks.size})`,
      ),
    )
  ));

  return (
    ce('dialog', { id: 'itinerary-select', className: 'static-list' },
      ce('ul', {}, listItems),
      ce('button', { onClick: onCreate },
       ce('i', { className: 'fa fa-plus' }), ' ', t`New List`,
      ),
    )
  );
};

export default ItinerarySelect;
