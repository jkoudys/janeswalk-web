/**
 * WalkDetails
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global CCM_TOOLS_PATH */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Input, Upload, Icon, Select, message } from 'antd';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';
import TextArea from './TextArea';

const { Option } = Select;

const MAXSIZE = 8;
function beforeUpload(file) {
  const isSmallEnough = file.size / 1024 / 1024 < MAXSIZE;
  if (!isSmallEnough) {
    message.error(t`Image must smaller than ${MAXSIZE}MB.`);
  }
}

const WalkDetails = ({
  id,
  name,
  title = '',
  shortDescription = '',
  longDescription = '',
  images,
  handlers,
  ward,
  wards = [],
  valt,
}) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce(Form.Item, {},
      ce(Input, {
        type: 'text',
        placeholder: t`Walk Title`,
        addonBefore: ce('span', {}, 'T'),
        onKeyPress: kbJump,
        value: title,
        onChange: handlers.title,
      }),
      t`Something short and memorable`
    ),
    ce(Form.Item, {
      label: t`Header Image` + ` (${t`Optional`})`,
    },
      ce(Upload.Dragger, {
        name: 'Filedata',
        action: `${CCM_TOOLS_PATH}/files/importers/quick`,
        data: {
          ccm_token: valt,
        },
        accept: 'image/*',
        listType: 'picture',
        fileList: [...images],
        onChange: handlers.images,
        onRemove: handlers.images.remove,
        style: { padding: '15px' },
        beforeUpload,
        className: 'WalkDetails__Upload',
      },
        ce('p', { className: 'ant-upload-drag-icon' }, ce(Icon, { type: 'inbox' })),
        ce('p', { className: 'ant-upload-text' }, images.size ?
           t`Drag or click here to replace your Walk's image.` :
           t`Drag your Walk's preview image here, or click to upload.`),
      ),
      t`We recommend wider images, around 600 pixels wide, over taller ones. They will look better at the top of your Walk page.`
    ),
    ce(Form.Item, {
      label: t`Your walk in a nutshell`,
    },
      ce(TextArea, {
        maxLength: 140,
        rows: 2,
        onKeyPress: kbJump,
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        value: shortDescription,
        onChange: handlers.shortDescription,
      }),
      ce('p', {}, t`Build intrigue! This is what people see when browsing our Walk listings.`),
      ce('p', {}, t`Hit enter to go to next field, or shift+enter to add a line break.`)
    ),
    ce(Form.Item, {},
      ce('label', {},
        t`Walk Description`,
        ce(Input, {
          type: 'textarea',
          rows: 6,
          onKeyPress: kbJump,
          addonBefore: ce('i', { className: 'fa fa-align-left' }),
          value: longDescription,
          onChange: handlers.longDescription,
        })
      ),
      ce('p', {}, t`What is this Walk about? What questions and issues will you be exploring? Jump-start the discussion by getting people thinking about how they can contribute to your Walking Conversation.`)
    ),
    wards.length ? ce(Form.Item, {},
      ce('label', {},
        t`Region`,
        ce(Select, { value: ward, onChange: handlers.ward },
          wards.map(({ value }) => ce(Option, {
            key: value,
            value,
          }, value)),
        ),
      ),
    ) : null,
  )
);

export default WalkDetails;
