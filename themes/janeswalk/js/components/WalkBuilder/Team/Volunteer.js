/**
 * Volunteer
 *
 * Someone pitching in, e.g. a photographer, crowd-manager, someone bringing tasty snacks, etc.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Button } from 'antd';
import t from 'es2015-i18n-tag';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';

const Volunteer = ({ member: { name, role, website }, handler }) => ce(Card, {
  title: ce('strong', {}, ce(Icon, { type: 'pushpin-o' }), ' ', t`Walk Volunteer`),
  extra: ce(Button, { onChange: handler.remove, shape: 'circle' },
    ce(Icon, { type: 'minus-circle-o' })
  ) },
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onKeyPress: kbJump, onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Role` },
    ce(Input, { onKeyPress: kbJump, onChange: handler('role'), value: role })
  ),
  ce(Form.Item, { label: t`Website` },
    ce(Input, {
      addonBefore: 'http://',
      placeholder: t`website url`,
      onKeyPress: kbJump,
      onChange: handler('website'),
      value: website,
    })
  )
);

export default Volunteer;
