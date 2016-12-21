/**
 * Voice
 *
 * Advocates for the Walk; promoters for this Walk.
 */
import { createElement as ce } from 'react';
import { Form, Card, Icon, Input, Col } from 'antd';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import TextArea from '../TextArea';

const colStyle = {
  md: { span: 12 },
  style: { marginBottom: '5px' },
};

const Voice = ({ member: { name, bio, twitter, facebook, website }, handler }) => ce(Card, {
  title: ce('strong', {}, ce('i', { className: 'fa fa-comment-o' }), ' ', t`Community Voice`),
  extra: ce(Icon, { type: 'minus-circle-o', onClick: handler.remove }),
},
  ce(Form.Item, { label: t`Name` },
    ce(Input, { onKeyPress: kbJump, onChange: handler('name'), value: name })
  ),
  ce(Form.Item, { label: t`Bio` },
    ce(TextArea, { onKeyPress: kbJump, onChange: handler('bio'), value: bio, rows: 4, maxLength: 140 })
  ),
  ce(Form.Item, { label: t`Contact` },
    ce(Input.Group, {},
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: 'http://',
          placeholder: t`website url`,
          onKeyPress: kbJump,
          onChange: handler('website'),
          value: website,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-twitter' }),
          placeholder: t`twitter`,
          onKeyPress: kbJump,
          onChange: handler('twitter'),
          value: twitter,
        }),
      ),
      ce(Col, { ...colStyle },
        ce(Input, {
          addonBefore: ce('i', { className: 'fa fa-facebook' }),
          placeholder: t`facebook`,
          onKeyPress: kbJump,
          onChange: handler('facebook'),
          value: facebook,
        }),
      )
    )
  )
);

export default Voice;
