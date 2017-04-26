import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

const Filter = ({ name, selected, onChange, data }) => (
  ce('li', null,
    ce('label', null, name),
    ce('select', { value: selected, onChange: ({ target: { value } }) => onChange(value) },
      ce('option', { value: '' }, t`All`),
      Object.entries(data).map(([value, description]) => ce('option', { key: value, value }, t([description]))),
    ),
  )
);

export default Filter;
