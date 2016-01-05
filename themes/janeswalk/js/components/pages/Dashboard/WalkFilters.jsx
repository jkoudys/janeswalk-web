import DashboardStore from './DashboardStore';
import DashboardActions from '../../../actions/DashboardActions';

const Filter = ({name, selected, addFilter, data, key}) => (
  <li>
    <label>{name}</label>
    <select value="Select One" onChange={e => addFilter(e.target.value)}>
      <option value="">Select One</option>
      {Object.keys(data).map((k,i) => <option key={i} value={k}>{data[k]}</option>)}
    </select>
  </li>
);

const WalkFilters = ({filters, activeFilters, removeFilter, addFilter}) => {

  const Filters = Object.keys(filters).map(key => <Filter key={key} {...filters[key]} addFilter={addFilter}/>);

  const ActiveFilters = activeFilters.map(f => <button onClick={e => removeFilter(f, e.target.value)}>{f}</button>);

  return (
    <div>
      {ActiveFilters}
      {Filters}
    </div>
  );
};

WalkFilters.PropTypes = {
  filters: React.PropTypes.array.isRequired,
  activeFilters: React.PropTypes.array.isRequired,
  removeFilter: React.PropTypes.func.isRequired,
  addFilter: React.PropTypes.func.isRequired,
};

Filter.PropTypes = {
  name: React.PropTypes.string.isRequired,
  addFilter: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default WalkFilters;