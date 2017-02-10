import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

export default ({ edit: { valt, action, fields } }) => (
  ce('div', { className: 'profileEdit' },
    ce('form', { method: 'post', action, id: 'profile-edit-form', encType: 'multipart/form-data' },
      ce('input', { type: 'hidden', name: 'ccm_token', value: valt }),
      ce('fieldset', { dangerouslySetInnerHTML: { __html: fields.join('') } }),
      ce('input', {
        type: 'submit',
        className: 'btn ccm-input-submit',
        id: 'save',
        name: 'save',
        value: t`Save`,
      }),
    ),
  )
);
