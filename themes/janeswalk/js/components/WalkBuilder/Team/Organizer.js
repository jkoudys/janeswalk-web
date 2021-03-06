/**
 * Organizer
 *
 * The person or group that's putting things together outside the Walk date.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Col } from 'antd';
import t from 'es2015-i18n-tag';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';

const colStyle = {
  md: { span: 12 },
  style: { marginBottom: '5px' },
};

const Organizer = ({ member: { name, email, website }, handler }) => ce(Card, {
  title: ce('strong', {}, ce('i', { className: 'fa fa-handshake-o' }), ' ', t`Organizer`),
  extra: ce(Icon, { type: 'minus-circle-o', onClick: handler.remove }),
},
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onKeyPress: kbJump, onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Contact` },
    ce(Input.Group, {},
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-envelope' }),
          placeholder: t`email address`,
          onKeyPress: kbJump,
          onChange: handler('email'),
          value: email,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: 'http://',
          placeholder: t`website url`,
          onKeyPress: kbJump,
          onChange: handler('website'),
          value: website,
        }),
      )
    )
  )
);

export default Organizer;
