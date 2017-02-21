import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

const Filter = ({ name, selected, setFilter, data }) => (
  ce('li', null,
    ce('label', null, name),
    ce('select', { value: selected, onChange: ({ target: { value } }) => setFilter(value) },
      ce('option', { value: '' }, t`All`),
      Object.entries(data).map(([value, description]) => ce('option', { key: value, value }, description)),
    ),
  )
);

export default Filter;
