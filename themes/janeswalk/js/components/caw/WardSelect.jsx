var mixins = require('../../helpers/mixins.jsx');

// Flux
var i18n = require('../../stores/I18nStore.js');
var t = i18n.getTranslate();

export default class WardSelect extends React.Component {
  render() {
    const wards = this.props.wards;
    if (wards && this.props.valueLink) {
      return (
        <fieldset id="wards">
          <legend>{ t('Sub-locality') }</legend>
          <div className="item">
            <div className="alert alert-info">{ t('Choose a specific neighbourhood or area where your walk will take place.') }</div>
            <select id="ward" name="ward" valueLink={this.props.valueLink}>
              <option value="">Choose a region</option>
              {wards.map((e, i) => <option key={i} value={e.value}>{e.value}</option>)}
            </select>
          </div>
        </fieldset>
      );
    } else {
      return <fieldset id="wards" />;
    }
  }
}
Object.assign(WardSelect.prototype, mixins.linkedParentState);
