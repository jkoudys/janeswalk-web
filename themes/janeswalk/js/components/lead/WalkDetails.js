/**
 * WalkDetails
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import ImageUploader from './ImageUploader';
import FieldSet from './FieldSet';
import { createElement as ce } from 'react';

const WalkDetails = ({ order, title, shortDescription, longDescription, handleChangeTitle }) => (
  ce('section', {},
    ce('h1', {}, `${order}. `, t`Describe Your Walk`),
    ce(FieldSet, {},
      ce('input', { type: 'text', placeholder: t`Walk Title`, value: title, onChange: handleChangeTitle }),
      t`Something short and memorable`
    ),
    ce(FieldSet, {},
      ce(ImageUploader)
    )
  )
);

export default WalkDetails;
