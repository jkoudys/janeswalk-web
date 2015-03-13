'use strict';

// Text areas with a 'remaining characters' limit
var TextAreaLimit = React.createClass({
  render: function() {
    var i18n = this.props.i18n;
    var t2 = i18n.translatePlural.bind(i18n);
    var remaining = this.props.maxLength - this.props.valueLink.value.length;

    return (
      <div className="text-area-limit">
        <textarea {...this.props} />
        <span>{t2('%s character remaining', '%s characters remaining', remaining)}</span>
      </div>
    );
  }
});

module.exports = TextAreaLimit;
