'use strict';

var mixins = require('../../helpers/mixins.jsx');

// Flux
var i18n = require('../../stores/I18nStore.js');
var t = i18n.getTranslate();

var WardSelect = React.createClass({
  mixins: [mixins.linkedParentState],
  render: function() {
    var wards = this.props.wards;
    if (wards && this.props.valueLink) {
      return (
        <fieldset id="wards">
          <legend>{ t('Sub-locality') }</legend>
          <div className="item">
            <div className="alert alert-info">{ t('Choose a specific neighbourhood or area where your walk will take place.') }</div>
            <select id="ward" name="ward" valueLink={this.props.valueLink}>
              <option value="">Choose a region</option>
              {wards.map(function(e, i) { return <option key={i} value={e.value}>{e.value}</option>; })}
            </select>
          </div>
        </fieldset>
      );
    } else {
      return (
        <fieldset id="wards" />
      );
    }
  }
});

module.exports = WardSelect;
