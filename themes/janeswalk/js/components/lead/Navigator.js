/**
 * Navigator
 * The main view of lead a walk content. For -full-screening and making a sticky menu of the current position
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import { createElement as ce, cloneElement as cln, Component } from 'react';
import { Anchor, Row, Col } from 'antd';
import Layout from '../../constants/Layout';

export default class Navigator extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: {
      },
    });
  }

  render() {
    const {
      children,
    } = this.props;

    return (
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
          ce(Col, { ...Layout.Grid[1], justify: 'right' },
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
  }
}
