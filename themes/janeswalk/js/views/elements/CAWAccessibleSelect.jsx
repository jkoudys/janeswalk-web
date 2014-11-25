var mixins = require('../functions/mixins.jsx');
var t = require('../functions/translate.jsx');

var AccessibleSelect = React.createClass({
  displayName: 'AccessibleSelect',
  mixins: [mixins.linkedParentState],

  render: function() {
    return (
      <fieldset>
        <legend className="required-legend">{ t('How accessible is this walk?') }</legend>
        <div className="row">
          <div className="col-md-6">
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-familyfriendly')} />{ t('Family friendly') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-wheelchair')} />{ t('Wheelchair accessible') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-dogs')} />{ t('Dogs welcome') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-strollers')} />{ t('Strollers welcome') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-bicycles')} />{ t('Bicycles welcome') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-steephills')} />{ t('Steep hills') }</label>
          </div>
          <div className="col-md-6">
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-uneven')} />{ t('Wear sensible shoes (uneven terrain)') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-busy')} />{ t('Busy sidewalks') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-bicyclesonly')} />{ t('Bicycles only') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-lowlight')} />{ t('Low light or nighttime') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('accessible-seniors')} />{ t('Senior Friendly') }</label>
          </div>
        </div>
      </fieldset>
    );
  }
});

module.exports = AccessibleSelect;
