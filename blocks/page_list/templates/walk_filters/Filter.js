/* global React */
const { createElement: ce } = React;

const Filter = ({ name, selected, setFilter, data }) => (
  ce('li', null,
    ce('label', null, name),
    ce('select', { value: selected, onChange: e => setFilter(e.target.value) },
      ce('option', { value: '' }, 'All'),
      Object.keys(data).map(k => ce('option', { value: k }, data[k])),
    ),
  )
);

export default Filter;
