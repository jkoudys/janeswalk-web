/**
 * Create a Walk
 * Form for creating new walks. Includes a map builder, team builder, scheduler
 */
/* global React $ CCM_THEME_PATH */

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
import WalkPreview from './caw/WalkPreview.jsx';
import TabNav from './caw/TabNav.jsx';
import { buildWalkObject } from 'janeswalk/utils/api/Walk';

// Flux
import I18nStore, { translateTag as t } from 'janeswalk/stores/I18nStore';
import NotifyStore from 'janeswalk/stores/NotifyStore';

// TODO: move into store
const _notifications = [];

function addNotice(notice) {
  _notifications.push(notice);
}

function removeNotice() {
  _notifications.shift();
}

export default class CreateWalk extends React.Component {
  constructor(props) {
    super(props);
    const { walk, user, url } = props;

    // Instance props
    Object.assign(this, {
      state: Object.assign({}, buildWalkObject({ walk, user, url })),

      // Simple trigger to re-render the components
      _onChange: () => this.setState({}),

      // Persist our walk server-side
      saveWalk: (options, cb) => {
        /* Send in the updated walk to save, but keep working */

        const defaultOptions = {
          messageTimeout: 1200,
        };

        options = Object.assign({}, defaultOptions, options);

        addNotice({ type: 'info', name: 'Saving walk' });

        // Build a simplified map from the Google objects
        this.setState({
          map: this.refs.mapBuilder.getStateSimple(),
        }, () => {
          // Fetch walk to persist it. PUT is publish, POST is save
          fetch(`/index.php?cID=${this.state.id}`, {
            method: options.publish ? 'PUT' : 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
          })
          .then(res => res.json())
          .then(json => {
            if (json.error) {
              throw Error(json.error);
            } else {
              return json;
            }
          })
          .then(({ url: walkUrl }) => {
            addNotice({ type: 'success', name: 'Walk saved' });
            this.setState(
              { url: (walkUrl || this.state.url) },
              function checkCallback() {
                if (cb && cb instanceof Function) {
                  // The 'this' in each callback should be the <CreateWalk>
                  cb.call(this);
                }
              }
            );
            setTimeout(removeNotice, 1200);
          })
          .catch(({ message }) => {
            addNotice({
              type: 'danger',
              name: 'Walk did not save.',
              message: `Keep this window open and contact tech@janeswalk.net. Details: ${message}`,
            });
            setTimeout(removeNotice, 6000);
            console.error(this.state.url, message);
          });
        });
        setTimeout(removeNotice, 1200);
      },

      // Click the 'next' button
      handleNext: () => {
        // Bootstrap's managing the tabs, so trigger a jQuery click on the next
        const next = $('#progress-panel > .nav > li.active + li > a');
        window.scrollTo(0, 0);
        if (next.length) {
          this.saveWalk();
          next.trigger('click');
        } else {
          // If no 'next' tab, next step is to publish
          $(this.refs.publish).trigger('click');
        }
      },

      // Publish the walk
      handlePublish: () => this.saveWalk({ publish: true }, () => console.log('Walk published')),

      // Preview the walk
      handlePreview: () => this.saveWalk({}, () => this.setState({ preview: true })),
    });
  }

  componentWillMount() {
    I18nStore.addChangeListener(this._onChange);
    NotifyStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    I18nStore.removeChangeListener(this._onChange);
    NotifyStore.removeChangeListener(this._onChange);
  }

  render() {
    // Used to let the map pass a callback
    const linkStateMap = {
      value: this.state.map,
      requestChange: (newVal, cb) => {
        this.setState({ map: newVal }, cb);
      },
    };

    const { user, valt, city } = this.props;
    const { team } = this.state;

    return (
      <main id="create-walk">
        <section>
          <nav id="progress-panel">
            <TabNav />
            <section id="button-group">
              <button
                className="btn btn-info btn-preview"
                id="preview-walk"
                title="Preview what you have so far."
                onClick={this.handlePreview}
              >
                { t`Preview Walk` }
              </button>
              <button
                className="btn btn-info btn-submit"
                id="btn-submit"
                title="Publishing will make your visible to all."
                onClick={() => this.setState({ publish: true })}
                ref="publish"
              >
                { t`Publish Walk` }
              </button>
              <button
                className="btn btn-info save"
                title="Save"
                id="btn-save"
                onClick={this.saveWalk}
              >
                { t`Save` }
              </button>
            </section>
          </nav>
          <div id="main-panel" role="main">
            <div className="tab-content">
              <div className="tab-pane active" id="description">
                <div className="walk-submit lead clearfix">
                  <div className="col-md-4">
                    <img id="convo-marker" src={`${CCM_THEME_PATH}/img/jw-intro-graphic.svg`} alt={t`Jane's Walks are walking conversations.`} />
                  </div>
                  <div className="col-md-8">
                    <h1>{ t`Hey there, ${user.firstName}!` }</h1>
                    <p>{ t`Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there's no need to finish everything at once.` }</p>
                  </div>
                </div>
                <div className="page-header" data-section="description">
                  <h1>{ t`Describe Your Walk` }</h1>
                </div>
                <form>
                  <fieldset>
                    <div className="item required">
                      <label htmlFor="title">{ t`Walk Title` }</label>
                      <div className="alert alert-info">{ t`Something short and memorable.` }</div>
                      <input type="text" valueLink={this.linkState('title')} />
                    </div>
                  </fieldset>
                </form>
                <ImageUpload valueLink={this.linkState('thumbnails')} valt={valt} />
                <form>
                  <hr />
                  <fieldset>
                    <div className="item required">
                      <label htmlFor="shortdescription">{ t`Your Walk in a Nutshell` }</label>
                      <div className="alert alert-info">{ t`Build intrigue! This is what people see when browsing our walk listings.` }</div>
                      <TextAreaLimit id="shortdescription" name="shortdescription" rows="6" maxLength="140" valueLink={this.linkState('shortDescription')} required />
                    </div>
                    <hr />
                    <div className="item required">
                      <label htmlFor="longdescription" id="longwalkdescription">{ t`Walk Description` }</label>
                      <div className="alert alert-info">
                        {t`Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.`}
                      </div>
                      <textarea id="longdescription" name="longdescription" rows="14" valueLink={this.linkState('longDescription')} />
                    </div>
                  </fieldset>
                  <ThemeSelect valueLink={this.linkState('checkboxes')} />
                  {((city.wards || []).length > 0) ? <WardSelect wards={city.wards} valueLink={this.linkState('wards')} /> : null}
                  <hr />
                </form>
              </div>
              <MapBuilder ref="mapBuilder" valueLink={linkStateMap} city={city} />
              <DateSelect valueLink={this.linkState('time')} />
              <div className="tab-pane" id="accessibility">
                <div className="page-header" data-section="accessibility">
                  <h1>{ t`Make it Accessible` }</h1>
                </div>
                <div className="item">
                  <AccessibleSelect valueLink={this.linkState('checkboxes')} />
                </div>

                <div className="item">
                  <fieldset>
                    <legend>{ t`What else do people need to know about the accessibility of this walk?` } ({ t`Optional` })</legend>
                    <TextAreaLimit name="accessible-info" rows="3" maxLength="500" valueLink={this.linkState('accessibleInfo')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend id="transit">{ t`How can someone get to the meeting spot by public transit?` } ({ t`Optional` })</legend>
                    <div className="alert alert-info">
                      { t`Nearest subway stop, closest bus or streetcar lines, etc.`}
                    </div>
                    <textarea rows="3" name="accessible-transit" valueLink={this.linkState('accessibleTransit')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend>{ t`Where are the nearest places to park?` } ({ t`Optional` })</legend>
                    <textarea rows="3" name="accessible-parking" valueLink={this.linkState('accessibleParking')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend className="required-legend" >{ t`How will people find you?` }</legend>
                    <div className="alert alert-info">
                      { t`Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`}
                    </div>
                    <textarea rows="3" name="accessible-find" valueLink={this.linkState('accessibleFind')} />
                  </fieldset>
                </div>
                <hr />
                <br />
              </div>
              <TeamBuilder onChange={team => this.setState({ team })} team={team} />
            </div>
            <button type="button" onClick={this.handleNext} className="btn">Next</button>
          </div>
          <aside id="tips-panel" role="complementary">
            <div className="popover right" id="city-organizer" style={{ display: 'block' }}>
              <h3 className="popover-title" data-toggle="collapse" data-target="#popover-content">
                <i className="fa fa-envelope" /> {t`Contact City Organizer for help`}
              </h3>
              <div className="popover-content collapse in" id="popover-content">
                {city.cityOrganizer.photo ? <div className="u-avatar" style={{ backgroundImage: `url(${city.cityOrganizer.photo})` }} /> : null}
                <p>
                  { t`Hi! I'm ${city.cityOrganizer.firstName}, the City Organizer for Jane's Walk ${city.name}. I'm here to help, so if you have any questions, please ` }
                  <strong>
                    <a href={`mailto:${city.cityOrganizer.email}`}>{ t`email me` }!</a>
                  </strong>
                </p>
              </div>
            </div>
          </aside>
        </section>
        {this.state.publish ?
          <WalkPublish
            url={this.state.url}
            saveWalk={this.saveWalk}
            close={() => this.setState({ publish: false })}
            walk={this.state}
            city={city}
            mirrors={this.state.mirrors}
          /> : null
        }
        {this.state.preview ?
          <WalkPreview
            url={`/index.php?cID=${this.state.id}`}
            close={() => this.setState({ preview: false })}
          /> : null
        }
        <aside id="notifications">
          {_notifications.map(note => (
            <div key={note.message} className={`alert alert-${note.type}`}>
              <strong>{note.name || ''}:&nbsp;</strong>
              {note.message || ''}
            </div>
            ))}
          </aside>
        </main>
    );
  }
}
// Mixins
Object.assign(CreateWalk.prototype, React.addons.LinkedStateMixin);
