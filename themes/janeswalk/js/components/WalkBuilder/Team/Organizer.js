/**
 * Organizer
 *
 * The person or group that's putting things together outside the Walk date.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Col } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const colStyle = {
  md: { span: 12 },
  style: { marginBottom: '5px' },
};

const Organizer = ({ member: { name, institution, email, website }, handler }) => ce(Card, {
  title: ce('strong', {}, t`Walk Organizer`),
  extra: ce(Icon, { type: 'minus-circle-o', onClick: handler.remove }),
},
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Institution` },
    ce(Input, { onChange: handler('institution'), value: institution })
  ),
  ce(Form.Item, { label: t`Contact` },
    ce(Input.Group, {},
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-envelope' }),
          placeholder: t`email address`,
          onChange: handler('email'),
          value: email,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: 'http://',
          placeholder: t`website url`,
          onChange: handler('website'),
          value: website,
        }),
      )
    )
  )
);

export default Organizer;
