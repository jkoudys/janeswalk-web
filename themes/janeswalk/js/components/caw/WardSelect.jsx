/* global React */

import mixins from '../../helpers/mixins.jsx';

// Flux
import { translateTag as t } from 'janeswalk/stores/I18nStore';

export default class WardSelect extends React.Component {
  render() {
    const wards = this.props.wards;
    if (wards && this.props.valueLink) {
      return (
        <fieldset id="wards">
          <legend>{ t`Sub-locality` }</legend>
          <div className="item">
            <div className="alert alert-info">{ t`Choose a specific neighbourhood or area where your walk will take place.` }</div>
            <select id="ward" name="ward" valueLink={this.props.valueLink}>
              <option value="">Choose a region</option>
              {wards.map((e, i) => <option key={i} value={e.value}>{e.value}</option>)}
            </select>
          </div>
        </fieldset>
      );
    }
    return <fieldset id="wards" />;
  }
}
Object.assign(WardSelect.prototype, mixins.linkedParentState);
