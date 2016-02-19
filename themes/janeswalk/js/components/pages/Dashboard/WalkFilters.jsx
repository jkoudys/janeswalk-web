// TODO*: Refactoring Components, WalksFilter is not doing much

const Filter = ({name, handle, toggleFilter, removeFilter, options, allFilters, filters}) => {
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
        {Object.keys(options).map((handle, i) => <option key={i} value={handle}>{options[handle]}</option>)}
      </select>
      <section>
      {ActiveFilters}
      </section>
    </li>
  );
};

const WalkFilters = ({filters, allFilters, removeFilter, toggleFilter}) => {

  const Filters = Object.keys(filters).map(
    key => <Filter
      key={key}
      handle={key}
      options={filters[key].data}
      filters={filters}
      allFilters={allFilters}
      toggleFilter={v => toggleFilter(key, v)}
      removeFilter={v => removeFilter(key, v)}
    />
  );

  return (
    <div className="walksFilter">
      {Filters}
    </div>
  );
};

export default WalkFilters;
