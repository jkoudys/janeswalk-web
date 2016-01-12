import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';

//TODO*: Refactoring Components, WalksFilter is not doing much

const Filter = ({name, selected, filterName, toggleFilter, removeFilter, data, key, activeFilters}) => {

  let ActiveFilters;

  if (Object.keys(activeFilters).includes(filterName)) {
    ActiveFilters = activeFilters[filterName].map(({filter, state, display}, i) =>
      <button key={i} className={state ? "activeFilter" : "inActiveFilter"}>
        <span onClick={e => toggleFilter(filter, filterName, e.target.value)}> {display} </span>
        <span className="buttonClose" onClick={e => removeFilter(filter, filterName, e.target.value)}> × </span>
      </button>
    );
  }

  return (
    <li>
      <label></label>
      <select value="Select" onChange={e => toggleFilter(e.target.value, filterName)}>
        <option value="">{name}</option>
        {Object.keys(data).map((k,i) => <option key={i} value={k}>{data[k]}</option>)}
      </select>
      <section>
      {ActiveFilters}
      </section>
    </li>
  );
};

const WalkFilters = ({filters, activeFilters, removeFilter, toggleFilter}) => {

  const Filters = Object.keys(filters).map(
    key => <Filter key={key} filterName={key} {...filters[key]} toggleFilter={toggleFilter} removeFilter={removeFilter} activeFilters={activeFilters}/>
  );

  return (
    <div className="walksFilter">
      {Filters}
    </div>
  );
};

WalkFilters.PropTypes = {
  filters: React.PropTypes.array.isRequired,
  activeFilters: React.PropTypes.array.isRequired,
  removeFilter: React.PropTypes.func.isRequired,
  toggleFilter: React.PropTypes.func.isRequired,
};

Filter.PropTypes = {
  name: React.PropTypes.string.isRequired,
  toggleFilter: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default WalkFilters;