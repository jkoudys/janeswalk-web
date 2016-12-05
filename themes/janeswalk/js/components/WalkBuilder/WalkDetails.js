/**
 * WalkDetails
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';
import TextArea from './TextArea';
import { createElement as ce } from 'react';
import { Form, Input, Upload, Icon } from 'antd';

const WalkDetails = ({
  id,
  name,
  order,
  title,
  shortDescription,
  longDescription,
  changeTitle,
  changeShortDescription,
  changeLongDescription,
}) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce(Form.Item, {},
      ce(Input, {
        type: 'text',
        placeholder: t`Walk Title`,
        value: title,
        onChange: changeTitle,
        addonBefore: ce('span', {}, 'T'),
        onKeyPress: kbJump,
      }),
      t`Something short and memorable`
    ),
    ce(Form.Item, {
      label: t`Header Image` + ` (${t`Optional`})`,
    },
      ce(Upload.Dragger, {
        name: 'walkImage',
        multiple: false,
        accept: 'image/*',
        fileList: [],
        onChange: ({ file }) => console.log(`${file.name}: ${file.status}`),
        style: { padding: '15px' },
        className: 'WalkDetails__Upload',
      },
        ce('p', { className: 'ant-upload-drag-icon' }, ce(Icon, { type: 'inbox' })),
        ce('p', { className: 'ant-upload-text' }, t`Click or Drag an Image to Upload.`)
      ),
    ),
    ce(Form.Item, {
      label: t`Your walk in a nutshell`,
    },
      ce(TextArea, {
        maxLength: 140,
        rows: 2,
        value: shortDescription,
        onChange: changeShortDescription,
        onKeyPress: kbJump,
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
      }),
      ce('p', {}, t`Build intrigue! This is what people see when browsing our Walk listings.`)
    ),
    ce(Form.Item, {},
      ce('label', {},
        t`Walk Description`,
        ce(TextArea, {
          maxLength: 300,
          rows: 6,
          value: longDescription,
          onChange: changeLongDescription,
          onKeyPress: kbJump,
          addonBefore: ce('i', { className: 'fa fa-align-left' }),
        })
      ),
      ce('p', {}, t`Help jump start the conversation on your Walk, by giving readers an idea of the discussions you'll be having on the Walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the Walk.`)
    )
  )
);

export default WalkDetails;
