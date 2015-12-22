// Flux
var t2 = require('../stores/I18nStore.js').getTranslatePlural();

/**
 * Text areas with a 'remaining characters' limit
 */
export default class TextAreaLimit extends React.Component {
  render() {
    const remaining = this.props.maxLength - this.props.valueLink.value.length;

    return (
      <div className="text-area-limit">
        <textarea {...this.props} />
        <span>{t2('%s character remaining', '%s characters remaining', remaining)}</span>
      </div>
    );
  }
}
