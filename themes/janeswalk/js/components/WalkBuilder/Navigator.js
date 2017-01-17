/**
 * Navigator
 * The main view of lead a walk content. For -full-screening and making a sticky menu of the current position
 */
import { createElement as ce, cloneElement as cln } from 'react';
import t from 'es2015-i18n-tag';

import { Anchor, Row, Col } from 'antd';
import Layout from '../../constants/Layout';

export default ({ children }) => (
  ce('section', { className: 'Navigator' },
    ce('nav', {},
      ce('ul', { className: 'Navigator__pageoptions' },
      )
    ),
    ce(Row, { type: 'flex', justify: 'center', align: 'top', gutter: 15 },
      ce(Col, Layout.Grid[0],
        children.map((child, i) => {
          const id = `menuOptions${i}`;
          return cln(child, { key: id, id, name: `${i + 1}. ${child.props.name}` });
        })
      ),
      ce(Col, { ...Layout.Grid[1], style: { paddingTop: '70px' } },
        ce(Anchor, { offsetTop: Layout.Nav.height + Layout.Nav.pad },
          children.map(({ props: { name: title } }, i) => {
            const href = `#menuOptions${i}`;
            return ce(Anchor.Link, { key: `anchor${href}`, href, title });
          }),
          ce(Anchor.Link, { key: 'anchor#finish', href: '#finish', title: t`Finish` })
        )
      )
    )
  )
);
