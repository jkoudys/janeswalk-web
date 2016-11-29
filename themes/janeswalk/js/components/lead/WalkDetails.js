/**
 * WalkDetails
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import ImageUploader from './ImageUploader';
import TextArea from './TextArea';
import { createElement as ce } from 'react';
import { Form, Input } from 'antd';

const WalkDetails = ({
  id,
  name,
  order,
  title,
  shortDescription,
  longDescription,
  handleChangeTitle,
  handleChangeShortDescription,
  handleChangeLongDescription,
}) => (
  ce('section', { id },
    ce('h1', {}, name),
    ce(Form.Item, {},
      ce(Input, {
        type: 'text',
        placeholder: t`Walk Title`,
        value: title,
        onChange: handleChangeTitle,
        addonBefore: ce('span', {}, 'T'),
      }),
      t`Something short and memorable`
    ),
    ce(Form.Item, {
      label: t`Header Image` + ` (${t`Optional`})`,
    },
      ce(ImageUploader)
    ),
    ce(Form.Item, {
      label: t`Your walk in a nutshell`,
    },
      ce(TextArea, {
        maxLength: 140,
        rows: 2,
        value: shortDescription,
        onChange: handleChangeShortDescription,
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
          onChange: handleChangeLongDescription,
          addonBefore: ce('i', { className: 'fa fa-align-left' }),
        })
      ),
      ce('p', {}, t`Help jump start the conversation on your Walk, by giving readers an idea of the discussions you'll be having on the Walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the Walk.`)
    )
  )
);

export default WalkDetails;
