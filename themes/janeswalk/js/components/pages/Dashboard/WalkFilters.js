import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
// TODO*: Refactoring Components, WalksFilter is not doing much

const Filter = ({ name, handle, toggleFilter, removeFilter, options, filters }) => {
  let ActiveFilters;

  if (Object.keys(filters).includes(handle)) {
    ActiveFilters = Object.keys(filters[handle]).map(fh =>
      ce('button', { key: handle, className: filters[fh] ? 'activeFilter' : 'inActiveFilter' },
        ce('span', { className: 'buttonToggle', onClick: () => toggleFilter(fh) }, t([name])),
        ce('span', { className: 'buttonClose', onClick: () => removeFilter(fh) }, ' × '),
      )
    );
  }

  return (
    ce('li', {},
      ce('label'),
      ce('select', { value: 'Select', onChange: e => toggleFilter(e.target.value) },
        ce('option', { value: '' }, name),
        Object.entries(options).map(([key, val]) => ce('option', { key, value: key }, t([val]))),
      ),
      ce('section', {}, ActiveFilters),
    )
  );
};

const WalkFilters = ({ filters, allFilters, removeFilter, toggleFilter }) => (
  ce('div', { className: 'walksFilter' }, Object.entries(filters).map(([key, filter]) => (
   ce(Filter, {
     key,
     handle: key,
     options: filter.data,
     filters,
     allFilters,
     toggleFilter: v => toggleFilter(key, v),
     removeFilter: v => removeFilter(key, v),
   })
  )))
);

export default WalkFilters;
