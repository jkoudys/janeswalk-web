import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { DatePicker } from 'antd';

const FilterList = ({
  disabledStartDate,
  disabledEndDate,
  handleStartDate,
  handleEndDate,
  filters = [],
  dateRange = [],
}) => (
  ce('section', null,
    ce('ul', { className: 'filters' },
      filters.map(([key, v]) => ce(Filter, { key, ...v, (option) => setFilter(key, option) })),
      Filters,
      ce('li', null,
        ce('label', null, 'Dates'),
        ce(DatePicker, {
          disabledDate: disabledStartDate,
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          value: dateRange[0],
          placeholder: t`After`,
          onChange: handleStartDate,
        }),
        ce(DatePicker, {
          disabledDate: disabledEndDate,
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          value: dateRange[1],
          placeholder: t`Before`,
          onChange: handleEndDate,
        }),
      )
    )
  )
);

export default FilterList;
