/**
 * Voice
 *
 * Advocates for the Walk; promoters for this Walk.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Col } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import TextArea from '../TextArea';

const colStyle = {
  md: { span: 12 },
  style: { marginBottom: '5px' },
};

const Voice = ({ member: { name, bio, twitter, facebook, website }, handler }) => ce(Card, {
  title: ce('strong', {}, t`Community Voice`),
  extra: ce(Icon, { type: 'minus-circle-o', onClick: handler.remove }),
},
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Bio` },
    ce(TextArea, { onChange: handler('bio'), value: bio, rows: 4, maxLength: 140 })
  ),
  ce(Form.Item, { label: t`Contact` },
    ce(Input.Group, {},
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: 'http://',
          placeholder: t`website url`,
          onChange: handler('website'),
          value: website,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-twitter' }),
          placeholder: t`twitter`,
          onChange: handler('twitter'),
          value: twitter,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-facebook' }),
          placeholder: t`facebook`,
          onChange: handler('facebook'),
          value: facebook,
        }),
      )
    )
  )
);

export default Voice;
