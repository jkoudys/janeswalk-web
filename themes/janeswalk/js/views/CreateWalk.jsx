'use strict';
// Create a Walk
// 
// Form for creating new walks. Includes a map builder, team builder, scheduler
//

// Load create-a-walk components
var CAWImageUpload = require('./elements/CAWImageUpload.jsx');
var CAWThemeSelect = require('./elements/CAWThemeSelect.jsx');
var CAWMapBuilder = require('./elements/CAWMapBuilder.jsx');
var CAWDateSelect = require('./elements/CAWDateSelect.jsx');
var CAWWardSelect = require('./elements/CAWWardSelect.jsx');
var CAWAccessibleSelect = require('./elements/CAWAccessibleSelect.jsx');
var CAWTeamBuilder = require('./elements/CAWTeamBuilder.jsx');
var I18nTranslate = require('./functions/translate.js');
var Helper = require('./functions/helpers.jsx');

var CreateWalk = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    var data = this.props.data;

    // Convert old {0: marker, 1: marker} indexing to a proper array
    if (data) {
      // Convert markers
      if (data.gmap && !Array.isArray(data.gmap.markers)) {
        data.gmap.markers = Helper.objectToArray(data.gmap.markers);
      }
      // Convert routes
      if (data.gmap && !Array.isArray(data.gmap.route)) {
        data.gmap.route = Helper.objectToArray(data.gmap.route);
      }
      // Convert time slots
      if (data.time && !Array.isArray(data.time.slots)) {
        data.time.slots = Helper.objectToArray(data.time.slots);
      }
      // Turn all 'false' values into empty strings
      for (var i in data) {
        if (data[i] === false) data[i] = '';
      }
      return data;
    } else {
      return {
        title: '',
        shortdescription: '',
        longdescription: '',
        'accessible-info': '',
        'accessible-transit': '',
        'accessible-parking': '',
        'accessible-find': '',
        gmap: {
          markers: [],
          route: []
        },
        team: [{
          user_id: -1,
          type: 'you',
          "name-first": '',
          "name-last": '',
          role: 'walk-leader',
          primary: 'on',
          bio: '',
          twitter: '',
          facebook: '',
          website: '',
          email: '',
          phone: '' 
        }],
        time: {type: '', slots: []},
        thumbnails: [],
        wards: '',
        checkboxes: {}
      };
    }
  },
 
  handleSave: function() {
    console.log(this.state);
    /* Send in the updated walk to save, but keep working */
    // TODO: put 'saving' and 'saved' messages in
    $.ajax({
      url: this.props.uri,
      type: 'PUT',
      data: {json: JSON.stringify(this.state)},
      dataType: 'json',
      success: function(data) {
        console.log('Walk saved');
      },
      error: function(xhr, status, err) {
        console.error(this.url, status, err.toString());
      }
    });
  },
 
  handlePublish: function() {
    // TODO: put 'saving' and 'saved' messages in
    // Publish the walk
    $.ajax({
      url: this.props.uri,
      type: 'POST',
      data: {json: JSON.stringify(this.state)},
      dataType: 'json',
      success: function(data) {
        console.log('Walk published');
      },
      error: function(xhr, status, err) {
        console.error(this.uri, status, err.toString());
      }
    });
  },
 
  handlePreview: function(e) {
    // Save the walk, then load a modal to preview
    $.ajax({
      url: this.props.uri,
      type: 'PUT',
      data: this.state,
      dataType: 'json',
      success: function(data) {
        this.setState({preview: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.uri, status, err.toString());
      }
    });
  },

  componentWillMount: function() {
    // Start loading the translations file as early as possible
    if (this.props.translation) {
      $.ajax({
        url: this.props.translation,
        dataType: 'json',
        success: function(data) {
          this.setState({i18n: new I18nTranslate(data)});
        }.bind(this)
      });
    } else {
      this.setState({i18n: I18nTranslate.noTranslate});
    }
  },

  render: function() {
    // If translations not loaded, use passthrough translation functions
    var i18n = this.state.i18n || I18nTranslate.noTranslate;
    var t = i18n.translate.bind(i18n);

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
              <button className="btn btn-info btn-submit" id="btn-submit" title="Publishing will make your visible to all.">{ t('Publish Walk') }</button>
              <button className="btn btn-info save" title="Save" id="btn-save" onClick={this.handleSave}>{ t('Save') }</button>
            </section>
          </nav>
          <div id="main-panel" role="main">
            <div className="alert alert-error"><strong>Create a Walk is currently offline.</strong> Sorry for the inconvenience</div>
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
                <CAWImageUpload i18n={i18n} valueLink={this.linkState('thumbnails')} valt={this.props.valt} />
                <form>
                  <hr />
                  <fieldset>
                    <div className="item required">
                      <label htmlFor="shortdescription">{ t('Your Walk in a Nutshell') }</label>
                      <div className="alert alert-info">{ t('Build intrigue! This is what people see when browsing our walk listings.') }</div>
                      <textarea id="shortdescription" name="shortdescription" rows="6" maxLength="140" valueLink={this.linkState('shortdescription')} required />
                    </div>
                    <hr />
                    <div className="item required">
                      <label htmlFor="longdescription" id="longwalkdescription">{ t('Walk Description') }</label>
                      <div className="alert alert-info">
                        {t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')} 
                      </div>
                      <textarea id="longdescription" name="longdescription" rows="14" valueLink={this.linkState('longdescription')} />
                    </div>
                  </fieldset>
                  <CAWThemeSelect i18n={i18n} valueLink={this.linkState('checkboxes')} />
                  <CAWWardSelect i18n={i18n} wards={this.props.city.wards} valueLink={this.linkState('wards')} />
                  <hr />
                </form>
              </div>
              <CAWMapBuilder i18n={i18n} valueLink={this.linkState('gmap')} city={this.props.city} />
              <CAWDateSelect i18n={i18n} valueLink={this.linkState('time')} />
              <div className="tab-pane" id="accessibility">
                <div className="page-header" data-section='accessibility'>
                  <h1>{ t('Make it Accessible') }</h1>
                </div>
                <div className="item">
                  <CAWAccessibleSelect i18n={i18n} valueLink={this.linkState('checkboxes')} />
                </div>

                <div className="item">
                  <fieldset>
                    <legend>{ t('What else do people need to know about the accessibility of this walk?') } ({ t('Optional') })</legend>
                    <textarea name="accessible-info" rows="3" maxLength="140" valueLink={this.linkState('accessible-info')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend id="transit">{ t('How can someone get to the meeting spot by public transit?') } ({ t('Optional') })</legend>
                    <div className="alert alert-info">
                      { t('Nearest subway stop, closest bus or streetcar lines, etc.')} 
                    </div>
                    <textarea rows="3" name="accessible-transit" valueLink={this.linkState('accessible-transit')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend>{ t('Where are the nearest places to park?') } ({ t('Optional') })</legend>
                    <textarea rows="3" name="accessible-parking" valueLink={this.linkState('accessible-parking')} />
                  </fieldset>
                </div>

                <div className="item">
                  <fieldset>
                    <legend className="required-legend" >{ t('How will people find you?') }</legend>
                    <div className="alert alert-info">
                      { t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')} 
                    </div>
                    <textarea rows="3" name="accessible-find"  valueLink={this.linkState('accessible-find')} />
                  </fieldset>
                </div>
                <hr />
                <br />
              </div>
              <CAWTeamBuilder i18n={i18n} valueLink={this.linkState('team')} />
            </div>
          </div>
          <aside id="tips-panel" role="complementary">
            <div className="popover right" id="city-organizer" style={{display: 'block'}}>
              <h3 className="popover-title" data-toggle="collapse" data-target="#popover-content"><i className="fa fa-envelope" />{ t('Contact City Organizer for help') }</h3>
              <div className="popover-content collapse in" id="popover-content">
                <div className='u-avatar' style={{backgroundImage: 'url(' + this.props.city.cityOrganizer.photo + ')'}}></div>
                <p>
                  { t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', this.props.city.cityOrganizer.firstName, this.props.city.name) } <strong><a href={'mailto:' + this.props.city.cityOrganizer.email}>{ t('email me') }!</a></strong></p>
              </div>
            </div>
          </aside>
        </section>
        <dialog id="publish-warning">
          <header>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3>{ t('Okay, You\'re Ready to Publish') }</h3>
          </header>
          <div className="modal-body">
            <p>{ t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.') }</p>
          </div>
          <footer>
            <div className="pull-left">
              <a href="" className="walkthrough close" data-dismiss="modal"> { t('Bring me back to edit') }</a>
            </div>
            <a href={'XXXprofile URL'}>
              <button className="btn btn-primary walkthrough" data-step="publish-confirmation">{ t('Publish') }</button>
            </a>
          </footer>
        </dialog>
        <dialog id="publish-confirmation">
          <header>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3>Your Walk Has Been Published!</h3>
          </header>
          <div className="modal-body">
            <p>Congratulations! Your walk is now available for all to peruse.</p>
            <h2 className="lead">{t('Don\'t forget to share your walk!')}</h2>
            <label>Your Walk Web Address:</label>
            <input type="text" className="clone js-url-field" value={this.props.uri} readOnly />
            <hr />
            <button className="btn facebook"><i className="fa fa-facebook-sign" /> Share on Facebook</button>
            <button className="btn twitter"><i className="fa fa-twitter-sign" /> Share on Twitter</button>
          </div>
          <footer>
            <button className="btn btn-primary walkthrough">Close</button>
          </footer>
        </dialog>
        {this.state.preview ?
          <dialog id="preview-modal">
            <div>
              <article>
                <header>
                  <button type="button" className="close" aria-hidden="true" onClick={function(){this.setState({preview: false})}.bind(this)}>&times;</button>
                  <h3>{ t('Preview of your Walk') }</h3>
                </header>
                <div className="modal-body">
                  <iframe src={this.props.uri} frameBorder="0" />
                </div>
              </article>
            </div>
          </dialog>
        : null}
      </main>
    );
  }
});

module.exports = CreateWalk;

/*
example json:
{"title":"The Beltline and Beyond: The Midtown Trail Loop","shortdescription":"Imagine a 16km off road trail in the heart of Toronto's Midtown. Bring your bike to ride it all!","longdescription":"<span>Did\nyou know that you can cycle a loop that is almost entirely off road right in\nthe middle of Toronto? The trail and ravine systems consisting of the Kay\nGardner Beltline Trail, Park Reservation Trail, David Balfour Park, Yellow\nCreek, Nordheimer Ravine and Cedarvale Park together form a 16 kilometer loop\nseparated by only 1 km of city side streets. These trails story some of\nToronto\u2019s most important urban history, as well as reveal our rich natural\nhistory and watersheds.&nbsp; We'll also be\nriding on top of three of Toronto's 'lost rivers'. Join us as we ride and\nexplore this unique Toronto treasure.<\/span>","accessible-info":"Accessibility and conditions: This is a cycling, not a walking tour - approximately 16km of mostly light riding and one quite steep hill. You do need a bicycle in reasonable shape. Although the ride is almost entirely on trails, they are generally smooth and rideable by most bikes. The most challenging part will be the hill leading out of the Yellow Creek trail up to Avoca. The section between Avoca and Russell Hill Road is the only section on city side streets, and riders are expected to follow the rules of the road. Participants can decide to complete only a limited part of the loop. If you only wish to do half the ride, that's OK too.","accessible-transit":"Ben Nobleman Park is across the road from Eglinton West Subway Station","accessible-parking":"Nearby on street parking though due to the LRT construction, parking is extremely limited.","gmap":{"markers":{"0":{"title":"Ben Nobleman Parkette","description":"The huge picnic table in the middle of the park.","style":"meeting","lat":43.6983887613,"lng":-79.4351971008},"1":{"title":"The missing link","description":"What's preventing the east and west sections connecting.","questions":"","style":"stop","lat":43.7022773798,"lng":-79.4381117538},"2":{"title":"The Beltline","description":"Where the beltline starts, and how it started.","questions":"","style":"stop","lat":43.7027834146,"lng":-79.4365668015},"3":{"title":"Yonge Street","description":"About what we do and why Yonge is so key.","questions":"","style":"stop","lat":43.6956768652,"lng":-79.396036821},"4":{"title":"Entering the Carolinian Forest","description":"We enter some more rugged terrain","questions":"","style":"stop","lat":43.6947866633,"lng":-79.3805872971},"5":{"title":"Park Drive Reservation trail","description":"What they were thinking of 60 years ago.","questions":"","style":"stop","lat":43.6786308037,"lng":-79.3706309372},"6":{"title":"Poplar Plains Road","description":"Toronto's first bike lane! ","questions":"","style":"stop","lat":43.6838883716,"lng":-79.4029891068},"7":{"title":"Nordheimer Ravine","description":"How a river was buried","questions":"","style":"stop","lat":43.682255979,"lng":-79.4093405777},"8":{"title":"Cedarvale ","description":"The ravine with everything","questions":"","style":"stop","lat":43.6868305028,"lng":-79.4163786942},"9":{"title":"Underground rivers","description":"Our first of 3 underground rivers. ","questions":"","style":"stop","lat":43.7026068983,"lng":-79.4181990341}},"route":{"0":{"lat":43.6986241931,"lng":-79.4352058321,"title":"#undefined"},"1":{"lat":43.698593166,"lng":-79.4362572581,"title":"#undefined"},"2":{"lat":43.6987483014,"lng":-79.4368580729,"title":"#undefined"},"3":{"lat":43.7018198988,"lng":-79.4377378374,"title":"#undefined"},"4":{"lat":43.7028282172,"lng":-79.4382742792,"title":"#undefined"},"5":{"lat":43.7030919285,"lng":-79.4369868189,"title":"#undefined"},"6":{"lat":43.7027351424,"lng":-79.436654225,"title":"#undefined"},"7":{"lat":43.7047982673,"lng":-79.4265369326,"title":"#undefined"},"8":{"lat":43.7044880275,"lng":-79.4233397394,"title":"#undefined"},"9":{"lat":43.7037744698,"lng":-79.4209364802,"title":"#undefined"},"10":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"11":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"12":{"lat":43.6981277575,"lng":-79.4061521441,"title":"#undefined"},"13":{"lat":43.695598975,"lng":-79.3970540911,"title":"#undefined"},"14":{"lat":43.6957075752,"lng":-79.3958524615,"title":"#undefined"},"15":{"lat":43.6975382349,"lng":-79.3865183741,"title":"#undefined"},"16":{"lat":43.6973830964,"lng":-79.3864325434,"title":"#undefined"},"17":{"lat":43.6973986103,"lng":-79.3858746439,"title":"#undefined"},"18":{"lat":43.6970728183,"lng":-79.3845013529,"title":"#undefined"},"19":{"lat":43.6965763698,"lng":-79.3837288767,"title":"#undefined"},"20":{"lat":43.6970573043,"lng":-79.3829349428,"title":"#undefined"},"21":{"lat":43.6961419741,"lng":-79.3806604296,"title":"#undefined"},"22":{"lat":43.6958316895,"lng":-79.3811324984,"title":"#undefined"},"23":{"lat":43.6954748602,"lng":-79.3812183291,"title":"#undefined"},"24":{"lat":43.6951490577,"lng":-79.3807462603,"title":"#undefined"},"25":{"lat":43.6947922243,"lng":-79.3807462603,"title":"#undefined"},"26":{"lat":43.6946681079,"lng":-79.3804887682,"title":"#undefined"},"27":{"lat":43.694699137,"lng":-79.3801454455,"title":"#undefined"},"28":{"lat":43.6930700857,"lng":-79.3762401491,"title":"#undefined"},"29":{"lat":43.6929304507,"lng":-79.375532046,"title":"#undefined"},"30":{"lat":43.6908979485,"lng":-79.3714980036,"title":"#undefined"},"31":{"lat":43.6906496992,"lng":-79.3708757311,"title":"#undefined"},"32":{"lat":43.6896722078,"lng":-79.3686226755,"title":"#undefined"},"33":{"lat":43.6883843773,"lng":-79.3676570803,"title":"#undefined"},"34":{"lat":43.6866775713,"lng":-79.367871657,"title":"#undefined"},"35":{"lat":43.68462934,"lng":-79.3670562655,"title":"#undefined"},"36":{"lat":43.6837448549,"lng":-79.3670562655,"title":"#undefined"},"37":{"lat":43.683046568,"lng":-79.3673995882,"title":"#undefined"},"38":{"lat":43.6814792721,"lng":-79.3687728792,"title":"#undefined"},"39":{"lat":43.6802688572,"lng":-79.3687943369,"title":"#undefined"},"40":{"lat":43.6791670481,"lng":-79.3690303713,"title":"#undefined"},"41":{"lat":43.6788566757,"lng":-79.3701247126,"title":"#undefined"},"42":{"lat":43.6786083766,"lng":-79.3705753237,"title":"#undefined"},"43":{"lat":43.6789963434,"lng":-79.3714980036,"title":"#undefined"},"44":{"lat":43.6793687893,"lng":-79.3741587549,"title":"#undefined"},"45":{"lat":43.6793687893,"lng":-79.3747810274,"title":"#undefined"},"46":{"lat":43.6799740089,"lng":-79.3761328608,"title":"#undefined"},"47":{"lat":43.6799119354,"lng":-79.378407374,"title":"#undefined"},"48":{"lat":43.6799584905,"lng":-79.3800596148,"title":"#undefined"},"49":{"lat":43.680206784,"lng":-79.3812397867,"title":"#undefined"},"50":{"lat":43.6807344043,"lng":-79.3820337206,"title":"#undefined"},"51":{"lat":43.6805481859,"lng":-79.3826559931,"title":"#undefined"},"52":{"lat":43.6822706841,"lng":-79.3835357577,"title":"#undefined"},"53":{"lat":43.6831086382,"lng":-79.3840292841,"title":"#undefined"},"54":{"lat":43.6839776154,"lng":-79.3846086413,"title":"#undefined"},"55":{"lat":43.6844741681,"lng":-79.3850592524,"title":"#undefined"},"56":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"57":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"58":{"lat":43.6849335,"lng":-79.3855001405,"title":"#undefined"},"59":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"60":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"61":{"lat":43.685290392,"lng":-79.3853928521,"title":"#undefined"},"62":{"lat":43.6857326248,"lng":-79.3852319196,"title":"#undefined"},"63":{"lat":43.6857248664,"lng":-79.3856181577,"title":"#undefined"},"64":{"lat":43.6862524381,"lng":-79.3856718019,"title":"#undefined"},"65":{"lat":43.6866946638,"lng":-79.3858220056,"title":"#undefined"},"66":{"lat":43.6870049957,"lng":-79.3861116841,"title":"#undefined"},"67":{"lat":43.6872222271,"lng":-79.3864120916,"title":"#undefined"},"68":{"lat":43.6874394577,"lng":-79.3868734315,"title":"#undefined"},"69":{"lat":43.6879825306,"lng":-79.3877102807,"title":"#undefined"},"70":{"lat":43.6882230328,"lng":-79.388675876,"title":"#undefined"},"71":{"lat":43.6872687766,"lng":-79.388278909,"title":"#undefined"},"72":{"lat":43.6862524381,"lng":-79.3932678178,"title":"#undefined"},"73":{"lat":43.685880035,"lng":-79.3932785466,"title":"#undefined"},"74":{"lat":43.684398158,"lng":-79.4004668668,"title":"#undefined"},"75":{"lat":43.6842585028,"lng":-79.4005741552,"title":"#undefined"},"76":{"lat":43.6837929831,"lng":-79.4029023126,"title":"#undefined"},"77":{"lat":43.6842429855,"lng":-79.4031490758,"title":"#undefined"},"78":{"lat":43.6837309135,"lng":-79.4054665044,"title":"#undefined"},"79":{"lat":43.6827921034,"lng":-79.4051124528,"title":"#undefined"},"80":{"lat":43.6824817497,"lng":-79.4066788629,"title":"#undefined"},"81":{"lat":43.6816437868,"lng":-79.4060673192,"title":"#undefined"},"82":{"lat":43.6813101501,"lng":-79.4037820771,"title":"#undefined"},"83":{"lat":43.6812325599,"lng":-79.403395839,"title":"#undefined"},"84":{"lat":43.6808678847,"lng":-79.4030310586,"title":"#undefined"},"85":{"lat":43.6807592576,"lng":-79.4034494832,"title":"#undefined"},"86":{"lat":43.680704944,"lng":-79.4037391618,"title":"#undefined"},"87":{"lat":43.6803402656,"lng":-79.4037713483,"title":"#undefined"},"88":{"lat":43.6806661486,"lng":-79.4048549607,"title":"#undefined"},"89":{"lat":43.6807670167,"lng":-79.4053163007,"title":"#undefined"},"90":{"lat":43.6809609935,"lng":-79.4069041684,"title":"#undefined"},"91":{"lat":43.6812868731,"lng":-79.4076122716,"title":"#undefined"},"92":{"lat":43.6815351611,"lng":-79.408041425,"title":"#undefined"},"93":{"lat":43.6816825816,"lng":-79.4084062055,"title":"#undefined"},"94":{"lat":43.68220243,"lng":-79.4090070203,"title":"#undefined"},"95":{"lat":43.6822955367,"lng":-79.4099726155,"title":"#undefined"},"96":{"lat":43.6824196788,"lng":-79.4109489396,"title":"#undefined"},"97":{"lat":43.6825050263,"lng":-79.4114102796,"title":"#undefined"},"98":{"lat":43.6826058914,"lng":-79.4115926698,"title":"#undefined"},"99":{"lat":43.682675721,"lng":-79.4118608907,"title":"#undefined"},"100":{"lat":43.6827377916,"lng":-79.4122685865,"title":"#undefined"},"101":{"lat":43.68300935,"lng":-79.4128050283,"title":"#undefined"},"102":{"lat":43.6831490081,"lng":-79.4135024026,"title":"#undefined"},"103":{"lat":43.6834438409,"lng":-79.4142319635,"title":"#undefined"},"104":{"lat":43.6836300503,"lng":-79.4149722531,"title":"#undefined"},"105":{"lat":43.6834826346,"lng":-79.4157983735,"title":"#undefined"},"106":{"lat":43.6837386722,"lng":-79.4161524251,"title":"#undefined"},"107":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"108":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"109":{"lat":43.6846541917,"lng":-79.4160665944,"title":"#undefined"},"110":{"lat":43.6854843542,"lng":-79.4165386632,"title":"#undefined"},"111":{"lat":43.685336943,"lng":-79.417203851,"title":"#undefined"},"112":{"lat":43.6856472819,"lng":-79.4173969701,"title":"#undefined"},"113":{"lat":43.6858722766,"lng":-79.4166352227,"title":"#undefined"},"114":{"lat":43.6860041696,"lng":-79.4166674092,"title":"#undefined"},"115":{"lat":43.6865860473,"lng":-79.416227527,"title":"#undefined"},"116":{"lat":43.6872920513,"lng":-79.4166352227,"title":"#undefined"},"117":{"lat":43.6878118511,"lng":-79.4168283418,"title":"#undefined"},"118":{"lat":43.6882385491,"lng":-79.4168283418,"title":"#undefined"},"119":{"lat":43.6885876633,"lng":-79.4169034436,"title":"#undefined"},"120":{"lat":43.6888436792,"lng":-79.4172253087,"title":"#undefined"},"121":{"lat":43.6889290175,"lng":-79.4175257161,"title":"#undefined"},"122":{"lat":43.6889367756,"lng":-79.4179226831,"title":"#undefined"},"123":{"lat":43.6895418986,"lng":-79.4185664132,"title":"#undefined"},"124":{"lat":43.6899375527,"lng":-79.419628568,"title":"#undefined"},"125":{"lat":43.6898987632,"lng":-79.4198967889,"title":"#undefined"},"126":{"lat":43.6898987632,"lng":-79.4201864675,"title":"#undefined"},"127":{"lat":43.6903952669,"lng":-79.4208623841,"title":"#undefined"},"128":{"lat":43.6902556257,"lng":-79.4218065217,"title":"#undefined"},"129":{"lat":43.69024011,"lng":-79.4220962003,"title":"#undefined"},"130":{"lat":43.6903797513,"lng":-79.4224073365,"title":"#undefined"},"131":{"lat":43.6905814548,"lng":-79.4235124066,"title":"#undefined"},"132":{"lat":43.6908684932,"lng":-79.4237913564,"title":"#undefined"},"133":{"lat":43.6908995243,"lng":-79.4242956117,"title":"#undefined"},"134":{"lat":43.691008133,"lng":-79.4247569516,"title":"#undefined"},"135":{"lat":43.6909383132,"lng":-79.4259156659,"title":"#undefined"},"136":{"lat":43.690977102,"lng":-79.4263340905,"title":"#undefined"},"137":{"lat":43.6911322571,"lng":-79.4271923974,"title":"#undefined"},"138":{"lat":43.6911555303,"lng":-79.4283081964,"title":"#undefined"},"139":{"lat":43.6919002687,"lng":-79.4297780469,"title":"#undefined"},"140":{"lat":43.6921097247,"lng":-79.4298102334,"title":"#undefined"},"141":{"lat":43.6922183313,"lng":-79.4300140813,"title":"#undefined"},"142":{"lat":43.6924200286,"lng":-79.4304217771,"title":"#undefined"},"143":{"lat":43.6926527554,"lng":-79.4307650998,"title":"#undefined"},"144":{"lat":43.692776876,"lng":-79.4311942533,"title":"#undefined"},"145":{"lat":43.69389395,"lng":-79.4329323247,"title":"#undefined"},"146":{"lat":43.6944292073,"lng":-79.4330181554,"title":"#undefined"},"147":{"lat":43.6949877314,"lng":-79.433962293,"title":"#undefined"},"148":{"lat":43.6953678352,"lng":-79.434616752,"title":"#undefined"},"149":{"lat":43.6956703651,"lng":-79.4347669557,"title":"#undefined"},"150":{"lat":43.6971597205,"lng":-79.4353248551,"title":"#undefined"},"151":{"lat":43.6980983058,"lng":-79.4356896356,"title":"#undefined"}}},"team":[{"user_id":"176","type":"you","name-first":"Burns","name-last":"Wattie","role":"walk-leader","primary":"on","bio":"Burns is a midtowner who loves to cycle, run, cook and walk  - or run \u2013 the dog. He volunteers with Cycle Toronto, active in his local ward group (Cycle Toronto Midtown)  and the Yonge Street Working group.","twitter":"@homecookexplore","facebook":"","website":"","email":"burns.wattie@gmail.com","phone":false}],"time":{"type":"set","slots":{"0":{"date":"May 3, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-03 13:00:00","eb_end":"2014-05-03 15:30:00"},"1":{"date":"May 4, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-04 13:00:00","eb_end":"2014-05-04 15:30:00"}}},"thumbnail_id":"316","thumbnail_url":null,"wards":"Ward 22 St. Paul\\'s","checkboxes":{"theme-nature-naturelover":true,"theme-urban-moversandshakers":true,"theme-civic-activist":true,"accessible-familyfriendly":true,"accessible-dogs":true,"accessible-steephills":true,"accessible-bicyclesonly":true}}
*/
