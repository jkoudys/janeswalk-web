import React, { createElement as ce } from 'react';
// TODO*: Refactoring Components, WalksFilter is not doing much

const Filter = ({ name, handle, toggleFilter, removeFilter, options, filters }) => {
  let ActiveFilters;

  if (Object.keys(filters).includes(handle)) {
    ActiveFilters = Object.keys(filters[handle]).map(fh =>
      <button key={handle} className={filters[fh] ? 'activeFilter' : 'inActiveFilter'}>
        <span className="buttonToggle" onClick={() => toggleFilter(fh)}> {name} </span>
        <span className="buttonClose" onClick={() => removeFilter(fh)}> × </span>
      </button>
    );
  }

  return (
    <li>
      <label></label>
      <select value="Select" onChange={e => toggleFilter(e.target.value)}>
        <option value="">{name}</option>
        {Object.keys(options).map((h, i) => <option key={i} value={h}>{options[h]}</option>)}
      </select>
      <section>
      {ActiveFilters}
      </section>
    </li>
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
