/* global React */
// Flux
import { change } from '../../actions/WalkActions.js';
import AccessibleStore from '../../stores/AccessibleStore.js';
import I18nStore from '../../stores/I18nStore.js';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import AccessibleSelect from './AccessibleSelect.jsx';
import TextAreaLimit from '../TextAreaLimit.jsx';

// Link value and change
function link(context, property) {
  return {
    value: context.state[property],
    onChange: e => change(property, e.target.value),
  };
}

class Accessible extends React.Component {
  componentWillMount() {
    I18nStore.addChangeListener(this._onChange.bind(this));
    AccessibleStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    I18nStore.removeChangeListener(this._onChange);
    AccessibleStore.removeChangeListener(this._onChange);
  }

  // Simple trigger to re-render the components
  _onChange() {
    this.setState(AccessibleStore.getDescription());
  }

  // Set the member at that specific index
  render() {
    return (
      <div className="tab-pane" id="accessibility">
        <div className="page-header" data-section="accessibility">
          <h1>{ t`Make it Accessible` }</h1>
        </div>
        <div className="item">
          <AccessibleSelect />
        </div>

        <div className="item">
          <fieldset>
            <legend>{ t`What else do people need to know about the accessibility of this walk?` } ({ t`Optional` })</legend>
            <TextAreaLimit name="accessible-info" rows="3" maxLength="500" {...link(this, 'info')} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend id="transit">{ t`How can someone get to the meeting spot by public transit?` } ({ t`Optional` })</legend>
            <div className="alert alert-info">
              { t`Nearest subway stop, closest bus or streetcar lines, etc.` }
            </div>
            <textarea rows="3" name="accessible-transit" {...link(this, 'transit')} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend>{ t`Where are the nearest places to park?` } ({ t`Optional` })</legend>
            <textarea rows="3" name="accessible-parking" {...link(this, 'parking')} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend className="required-legend" >{ t`How will people find you?` }</legend>
            <div className="alert alert-info">
              { t`Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.` }
            </div>
            <textarea rows="3" name="accessible-find" {...link(this, 'find')} />
          </fieldset>
        </div>
        <hr />
        <br />
      </div>
    );
  }
}

export default Accessible;
