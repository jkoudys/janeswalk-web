/*
 * Create a Walk
 * Form for creating new walks. Includes a map builder, team builder, scheduler
 */

// Load create-a-walk View components
import ImageUpload from './caw/ImageUpload.jsx';
import ThemeSelect from './caw/ThemeSelect.jsx';
import MapBuilder from './caw/MapBuilder.jsx';
import DateSelect from './caw/DateSelect.jsx';
import WardSelect from './caw/WardSelect.jsx';
import AccessibleSelect from './caw/AccessibleSelect.jsx';
import TeamBuilder from './caw/TeamBuilder.jsx';
import WalkPublish from './caw/WalkPublish.jsx';
import TextAreaLimit from './TextAreaLimit.jsx';

// Flux
import WalkStore from '../stores/WalkStore.js';
import * as WalkUtils from '../utils/WalkUtils.js';
import I18nActions from '../actions/I18nActions.js';
import I18nStore from '../stores/I18nStore.js';
const t = I18nStore.getTranslate();
const t2 = I18nStore.getTranslatePlural();

// Helpers
import Helper from '../helpers/helpers.jsx';

class CreateWalk extends React.Component {
  constructor() {
    super();

    this.state = WalkStore.getWalk();
  }

  handleNext() {
    // Bootstrap's managing the tabs, so trigger a jQuery click on the next
    var next = $('#progress-panel > .nav > li.active + li > a');
    window.scrollTo(0, 0);
    if (next.length) {
      this.handleSave();
      next.trigger('click');
    } else {
      // If no 'next' tab, next step is to publish
      $(this.refs.publish.getDOMNode()).trigger('click');
    }
  }

  handleSave() {
    WalkUtils.save();
  }

  handlePublish() {
    WalkUtils.publish();
  }

  handlePreview() {
    WalkUtils.save(() => this.setState({preview: true}));
  }

  componentWillMount() {
    I18nStore.addChangeListener(this._onChange.bind(this));
    WalkStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    I18nStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
  }

  // Simple trigger to re-render the components
  _onChange() {
    this.setState(WalkStore.getWalk());
  }

  render() {
    return (
      <main id="create-walk">
        <section>
          <nav id="progress-panel">
            <ul className="nav nav-tabs">
              <li className="active"><a data-toggle="tab" className="description" href="#description"><i className="fa fa-list-ol" />{ t('Describe Your Walk') }</a></li>
              <li><a data-toggle="tab" className="route" href="#route"><i className="fa fa-map-marker" />{ t('Share Your Route') }</a></li>
              <li><a data-toggle="tab" className="time-and-date" href="#time-and-date"><i className="fa fa-calendar" />{ t('Set the Time & Date') }</a></li>
              <li><a data-toggle="tab" className="accessibility" href="#accessibility"><i className="fa fa-flag" />{ t('Make it Accessible') }</a></li>
              <li><a data-toggle="tab" className="team" href="#team"><i className="fa fa-users" />{ t('Build Your Team') }</a></li>
            </ul>
            <section id="button-group">
              <button className="btn btn-info btn-preview" id="preview-walk" title="Preview what you have so far." onClick={this.handlePreview}>{ t('Preview Walk') }</button>
              <button className="btn btn-info btn-submit" id="btn-submit" title="Publishing will make your visible to all." onClick={function() {this.setState({publish: true})}.bind(this)} ref="publish">{ t('Publish Walk') }</button>
              <button className="btn btn-info save" title="Save" id="btn-save" onClick={this.handleSave}>{ t('Save') }</button>
            </section>
          </nav>
          <div id="main-panel" role="main">
            <div className="tab-content">
              <div className="tab-pane active" id="description">
                <div className="walk-submit lead clearfix">
                  <div className="col-md-4">
                    <img id="convo-marker" src={CCM_THEME_PATH + '/img/jw-intro-graphic.svg'} alt="Jane's Walks are walking conversations." />
                  </div>
                  <div className="col-md-8">
                    <h1>{ t('Hey there, %s!', this.props.user.firstName) }</h1>
                    <p>{ t('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.') }</p>
                  </div>
                </div>
                <div className="page-header" data-section='description'>
                  <h1>{ t('Describe Your Walk') }</h1>
                </div>
                <form>
                  <fieldset>
                    <div className="item required">
                      <label htmlFor="title">{ t('Walk Title') }</label>
                      <div className="alert alert-info">{ t('Something short and memorable.') }</div>
                      <input type="text" valueLink={this.linkState('title')} />
                    </div>
                  </fieldset>
                </form>
                <ImageUpload valueLink={this.linkState('thumbnails')} valt={this.props.valt} />
                <form>
                  <hr />
                  <fieldset>
                    <div className="item required">
                      <label htmlFor="shortdescription">{ t('Your Walk in a Nutshell') }</label>
                      <div className="alert alert-info">{ t('Build intrigue! This is what people see when browsing our walk listings.') }</div>
                      <TextAreaLimit id="shortdescription" name="shortdescription" rows="6" maxLength="140" valueLink={this.linkState('shortDescription')} required />
                    </div>
                    <hr />
                    <div className="item required">
                      <label htmlFor="longdescription" id="longwalkdescription">{ t('Walk Description') }</label>
                      <div className="alert alert-info">
                        {t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')} 
                      </div>
                      <textarea id="longdescription" name="longdescription" rows="14" valueLink={this.linkState('longDescription')} />
                    </div>
                  </fieldset>
                  <ThemeSelect valueLink={this.linkState('checkboxes')} />
                  {((this.props.city.wards || []).length > 0) ? <WardSelect wards={this.props.city.wards} valueLink={this.linkState('wards')} /> : null}
                  <hr />
                </form>
              </div>
              <MapBuilder ref="mapBuilder" city={this.props.city} />
              <DateSelect valueLink={this.linkState('time')} />
              <Accessible />
              <TeamBuilder valueLink={this.linkState('team')} />
            </div>
            <button type="button" onClick={this.handleNext} className="btn">Next</button>
          </div>
          <aside id="tips-panel" role="complementary">
            <div className="popover right" id="city-organizer" style={{display: 'block'}}>
              <h3 className="popover-title" data-toggle="collapse" data-target="#popover-content"><i className="fa fa-envelope" />{ t('Contact City Organizer for help') }</h3>
              <div className="popover-content collapse in" id="popover-content">
                {this.props.city.cityOrganizer.photo ? <div className='u-avatar' style={{backgroundImage: 'url(' + this.props.city.cityOrganizer.photo + ')'}} /> : null}
                <p>
                  { t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', this.props.city.cityOrganizer.firstName, this.props.city.name) } <strong><a href={'mailto:' + this.props.city.cityOrganizer.email}>{ t('email me') }!</a></strong></p>
              </div>
            </div>
          </aside>
        </section>
        {this.state.publish ? <WalkPublish url={this.state.url} saveWalk={this.saveWalk.bind(this)} close={this.setState.bind(this, {publish: false})} city={this.props.city} mirrors={this.state.mirrors} /> : null}
        {this.state.preview ? <WalkPreview url={this.state.url} close={this.setState.bind(this, {preview: false})} /> : null}
        <aside id="notifications">
          {this.state.notifications.map(function(notification) {
            return (
              <div key={notification.message} className={'alert alert-' + notification.type}>
                <strong>{notification.name || ''}:&nbsp;</strong>
                {notification.message || ''}
              </div>
              );
          })}
        </aside>
      </main>
    );
  }
}

class WalkPreview extends React.Component {
  componentDidMount() {
    var _this = this;
    // Bootstrap Modal
    $(this.getDOMNode()).modal();
    // Close the modal when modal closes
    $(this.getDOMNode()).bind('hidden.bs.modal', function() {
      _this.props.close();
    });
  }

  render() {
    return (
      <dialog id="preview-modal">
        <div>
          <article>
            <header>
              <button type="button" className="close" aria-hidden="true" data-dismiss="modal">&times;</button>
              <h3>{ t('Preview of your Walk') }</h3>
            </header>
            <div className="modal-body">
              <iframe src={this.props.url} frameBorder="0" />
            </div>
          </article>
        </div>
      </dialog>
    );
  }
}

export default CreateWalk;
