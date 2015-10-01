/**
 * Menu to select accessibility requirements
 */

const mixins = require('../../helpers/mixins.jsx');

// Flux
const t = require('../../stores/I18nStore.js').getTranslate();

const options = [
  {id: 'accessible-familyfriendly', name: t('Family friendly')},
  {id: 'accessible-wheelchair', name: t('Wheelchair accessible')},
  {id: 'accessible-dogs', name: t('Dogs welcome')},
  {id: 'accessible-strollers', name: t('Strollers welcome')},
  {id: 'accessible-bicycles', name: t('Bicycles welcome')},
  {id: 'accessible-steephills', name: t('Steep hills')},
  {id: 'accessible-uneven', name: t('Wear sensible shoes (uneven terrain)')},
  {id: 'accessible-busy', name: t('Busy sidewalks')},
  {id: 'accessible-bicyclesonly', name: t('Bicycles only')},
  {id: 'accessible-lowlight', name: t('Low light or nighttime')},
  {id: 'accessible-seniors', name: t('Senior Friendly')}
];

export default class AccessibleSelect extends React.Component {
  render() {
    return (
      <fieldset id="accessibilities">
        <legend className="required-legend">{ t('How accessible is this walk?') }</legend>
        <fieldset>
          {options.map(option => (
            <label className="checkbox">
              <input type="checkbox" checkedLink={this.linkParentState(option.id)} />{option.name}
            </label>
          ))}
        </fieldset>
      </fieldset>
    );
  }
}

Object.assign(AccessibleSelect.prototype, mixins.linkedParentState);
