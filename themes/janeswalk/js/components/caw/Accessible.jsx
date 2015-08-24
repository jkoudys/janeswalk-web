// Flux
import {change} from '../../actions/WalkActions.js';
import AccessibleSelect from './AccessibleSelect.jsx';
import AccessibleStore from '../../stores/AccessibleStore.js';
import I18nStore from '../../stores/I18nStore.js';
const t = I18nStore.getTranslate();
const t2 = I18nStore.getTranslatePlural();

class Accessible extends React.Component {
  constructor(props) {
    super(props);
    this.changeInfo = this.handleChange.bind(this, 'info');
    this.changeTransit = this.handleChange.bind(this, 'transit');
    this.changeParking = this.handleChange.bind(this, 'parking');
    this.changeFind = this.handleChange.bind(this, 'find');
  }

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
    this.setState(AccessibleStore.getWalk());
  }

  handleChange(property, ev) {
    change(property, ev.target.value);
  }

  // Set the member at that specific index
  render() {
    let desc = AccessibleStore.getDescription();

    return (
      <div className="tab-pane" id="accessibility">
        <div className="page-header" data-section='accessibility'>
          <h1>{ t('Make it Accessible') }</h1>
        </div>
        <div className="item">
          <AccessibleSelect />
        </div>

        <div className="item">
          <fieldset>
            <legend>{ t('What else do people need to know about the accessibility of this walk?') } ({ t('Optional') })</legend>
            <TextAreaLimit name="accessible-info" rows="3" maxLength="500" value={desc.info} onChange={this.changeInfo} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend id="transit">{ t('How can someone get to the meeting spot by public transit?') } ({ t('Optional') })</legend>
            <div className="alert alert-info">
              { t('Nearest subway stop, closest bus or streetcar lines, etc.')} 
            </div>
            <textarea rows="3" name="accessible-transit" value={desc.transit} onChange={this.changeTransit} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend>{ t('Where are the nearest places to park?') } ({ t('Optional') })</legend>
            <textarea rows="3" name="accessible-parking" value={desc.parking} onChange={this.changeParking} />
          </fieldset>
        </div>

        <div className="item">
          <fieldset>
            <legend className="required-legend" >{ t('How will people find you?') }</legend>
            <div className="alert alert-info">
              { t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')} 
            </div>
            <textarea rows="3" name="accessible-find"  value={desc.find} onChange={this.changeFind} />
          </fieldset>
        </div>
        <hr />
        <br />
      </div>
    );
  }
}

export default Accessible;
