/* global React */

const Filter = ({ name, selected, setFilter, data }) => (
  <li>
    <label>{name}</label>
    <select value={selected} onChange={e => setFilter(e.target.value)}>
      <option value="">All</option>
      {Object.keys(data).map(k => <option value={k}>{data[k]}</option>)}
    </select>
  </li>
);

export default Filter;
