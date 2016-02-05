import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';

//TODO*: Refactoring Components, WalksFilter is not doing much

const Filter = ({location, name, filterName, toggleFilter, removeFilter, data, activeFilters}) => {

  let ActiveFilters;

  if (Object.keys(activeFilters).includes(filterName)) {
    ActiveFilters = activeFilters[filterName].map(({filter, state, display}, i) =>
      <button key={i} className={state ? 'activeFilter' : 'inActiveFilter'}>
        <span className="buttonToggle" onClick={e => toggleFilter(filter, filterName, location)}> {display} </span>
        <span className="buttonClose" onClick={e => removeFilter(filter, filterName, location)}> × </span>
      </button>
    );
  }

  return (
    <li>
      <label></label>
      <select value="Select" onChange={e => toggleFilter(e.target.value, filterName, location)}>
        <option value="">{name}</option>
        {Object.keys(data).map((k, i) => <option key={i} value={k}>{data[k]}</option>)}
      </select>
      <section>
      {ActiveFilters}
      </section>
    </li>
  );
};

const WalkFilters = ({filters, activeFilters, removeFilter, toggleFilter, location}) => {

  const Filters = Object.keys(filters).map(
    key => <Filter
      key={key}
      filterName={key}
      {...filters[key]}
      toggleFilter={toggleFilter}
      removeFilter={removeFilter}
      activeFilters={activeFilters}
      location = {location}
    />
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
