/**
 * Volunteer
 *
 * Someone pitching in, e.g. a photographer, crowd-manager, someone bringing tasty snacks, etc.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Button } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const Volunteer = ({ member: { name, role, website }, handler }) => ce(Card, {
  title: ce('strong', {}, ce(Icon, { type: 'pushpin-o' }), ' ', t`Walk Volunteer`),
  extra: ce(Button, { onChange: handler.remove, shape: 'circle' },
    ce(Icon, { type: 'minus-circle-o' })
  ) },
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Role` },
    ce(Input, { onChange: handler('role'), value: role })
  ),
  ce(Form.Item, { label: t`Website` },
    ce(Input, {
      addonBefore: 'http://',
      placeholder: t`website url`,
      onChange: handler('website'),
      value: website,
    })
  )
);

export default Volunteer;
