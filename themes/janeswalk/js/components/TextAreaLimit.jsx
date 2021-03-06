// Flux
import {t, t2} from 'janeswalk/stores/I18nStore';

/**
 * Text areas with a 'remaining characters' limit
 */
const TextAreaLimit = props => (
  <div className="text-area-limit">
    <textarea {...props} />
    <span>
      {t2('%s character remaining', '%s characters remaining',
          props.maxLength - props.valueLink.value.length)}
    </span>
  </div>
);

export default TextAreaLimit;
