/* global React */

import mixins from '../../helpers/mixins.jsx';

// Flux
import { translateTag as t } from 'janeswalk/stores/I18nStore';

export default class ThemeSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      maxChecked: 3,
      totalChecked: 0
    };
  }

  render() {
    const checkboxes = this.props.valueLink.value;
    let totalChecked = 0;

    for (const i in checkboxes) {
      if (checkboxes[i] && i.substring(0, 6) === 'theme-') {
        totalChecked++;
      }
    }

    // TODO: Don't select themes for NYC
    return (
      <fieldset id="theme-select">
        <legend className="required-legend">{ t`Themes` }</legend>
        <div className="alert alert-info">
          { t`Pick between ${1} and ${this.state.maxChecked} boxes.` }
        </div>
        {this.props.themeCategories.map(category => (
          <fieldset key={category.name}>
            <legend>{category.name}</legend>
            {category.themes.map(theme => {
              // Don't let a checkbox be checked if it pushes over limit
              const disabled = (totalChecked >= this.state.maxChecked) && !checkboxes[theme.id];
              return (
                <label key={theme.id} className="checkbox">
                  <input type="checkbox" disabled={disabled} checkedLink={this.linkParentState(theme.id)} />
                  {theme.name}
                </label>
                );
            })}
          </fieldset>
          ))};
      </fieldset>
    );
  }
}
Object.assign(ThemeSelect.prototype, mixins.linkedParentState);
ThemeSelect.defaultProps = require('../../json/Themes.json');
