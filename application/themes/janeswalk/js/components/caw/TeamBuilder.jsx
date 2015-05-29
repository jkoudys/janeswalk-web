'use strict';

var mixins = require('../functions/mixins.jsx');

var TeamBuilder = React.createClass({
  displayName: 'TeamBuilder',

  mixins: [mixins.linkedParentState],

  getInitialState: function() {
    // So we know if this is the first loading, or changed after
    return {initialized: false};
  },

  componentDidMount: function() {
    this.setState({initialized: true});
  },

  handleTeamMemberChange: function(propname, memberValue, id) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    value[id][propname] = memberValue;
    valueLink.requestChange(value);
  },

  addMember: function(props) {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push(props);
    valueLink.requestChange(team);
  },

  addLeader: function() {
    this.addMember({type: 'leader', "name-first":'', "name-last":'', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: ''});
  },

  addOrganizer: function() {
    this.addMember({type: 'organizer', "name-first":'', "name-last":'', institution: '', website: ''});
  },

  addCommunityVoice: function() {
    this.addMember({type: 'community', "name-first":'', "name-last":'', bio: '', twitter: '', facebook: '', website: ''});
  },

  addVolunteer: function() {
    this.addMember({type: 'volunteer', "name-first":'', "name-last":'', role: '', website: ''});
  },

  deleteMember: function(i) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value.slice();
    value.splice(i, 1);
    valueLink.requestChange(value);
  },

  // Set the member at that specific index
  render: function() {
    var _this = this;
    // If there's no 'you', create one as the current user
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    // Loop through all the users and render the appropriate user type
    var teamMemberProps = {
      onChange: this.handleTeamMemberChange,
      i18n: this.props.i18n
    };
    var users = value.map(function(user, i) {
      var teamMember = null;
      teamMemberProps.key = i;
      teamMemberProps.index = i;
      teamMemberProps.value = user;
      teamMemberProps.onDelete = _this.deleteMember.bind(_this, i);
      // Use empty strings for unset/false
      user.phone = user.phone || '';
      if (user.type === 'you') {
        teamMember = <TeamOwner {...teamMemberProps} />;
      } else if (user.type === 'leader') {
        teamMember = <TeamLeader {...teamMemberProps} />;
      } else if (user.type === 'organizer') {
        teamMember = <TeamOrganizer {...teamMemberProps} />;
      } else if (user.type === 'community') {
        teamMember = <TeamCommunityVoice {...teamMemberProps} />;
      } else if (user.type === 'volunteer') {
        teamMember = <TeamVolunteer {...teamMemberProps} />;
      }
      return teamMember;
    });

    return (
      <div className="tab-pane" id="team">
        <div className="page-header" data-section="team">
          <h1>{ t('Build Your Team') }</h1>
        </div>
        {users}
        <div className="thumbnail team-member" id="add-member">
          <h2>{ t('Who else is involved with this walk?') }</h2>
          <h3 className="lead">{ t('Click to add team members to your walk') } ({ t('Optional') })</h3>
          <div className="team-set">
            <div className="team-row">
              <section className="new-member" id="new-walkleader" title="Add New Walk Leader" onClick={this.addLeader}>
                <div className="icon"></div>
                <h4 className="title text-center">{ t('Walk Leader') }</h4>
                <p>{ t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.') }</p>
              </section>
              <section className="new-member" id="new-walkorganizer" title="Add New Walk Organizer" onClick={this.addOrganizer}>
                <div className="icon"></div>
                <h4 className="title text-center">{ t('Walk Organizer') }</h4>
                <p>{ t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.') }</p>
              </section>
            </div>
            <div className="team-row">
              <section className="new-member" id="new-communityvoice" title="Add A Community Voice" onClick={this.addCommunityVoice}>
                <div className="icon"></div>
                <h4 className="title text-center">{ t('Community Voice') }</h4>
                <p>{ t('A community member with stories and/or personal experiences to share.') }</p>
              </section>
              <section className="new-member" id="new-othermember" title="Add another helper to your walk" onClick={this.addVolunteer}>
                <div className="icon"></div>
                <h4 className="title text-center">{ t('Volunteers') }</h4>
                <p>{ t('Other people who are helping to make your walk happen.') }</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


var TeamOwner = React.createClass({
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <div className="team-member thumbnail useredited" id="walk-leader-me">
        <fieldset>
          <legend>{ t('You') }</legend>
          <div className="row" id="walkleader">
            <div className="item required">
              <label htmlFor="name">{ t('Name') }</label>
              <input type="text" id="name" placeholder="First" valueLink={this.linkProp('name-first')} />
              <input type="text" id="name" placeholder="Last" valueLink={this.linkProp('name-last')} />
            </div>

            <div className="item required">
              <label htmlFor="role">{ t('Role') }</label>
              <select id="role" valueLink={this.linkProp('role')}>
                <option defaultValue="walk-leader">{ t('Walk Leader') }</option>
                <option defaultValue="co-walk-leader">{ t('Co-Walk Leader') }</option>
                <option defaultValue="walk-organizer">{ t('Walk Organizer') }</option>
              </select>
            </div>
            <div className="item hide" id="primary-walkleader-select">
              <label className="checkbox"><input type="checkbox" className="role-check" checkLink={this.linkProp('primary')} />{ t('Primary Walk Leader') }</label>
            </div>
            <div className="item required">
              <label htmlFor="bio">{ t('Introduce yourself') }</label>
              <div className="alert alert-info">
                { t('We recommend keeping your bio under 60 words')} 
              </div>
              <textarea id="bio" rows="6" valueLink={this.linkProp('bio')} />
            </div>

            <div className="row" id="newwalkleader">
              <div className="col-md-6 required">
                <label htmlFor="you-email"><i className="fa fa-envelope" />&nbsp;{t('Email')}</label>
                <input type="email" id="you-email" placeholder="" valueLink={this.linkProp('email')} />
              </div>

              <div className="col-md-6">
                <label htmlFor="leader-twitter"><i className="fa fa-twitter" /> Twitter</label>
                <div className="input-group">
                  <span className="input-group-addon">@</span>
                  <input className="col-md-12" id="leader-twitter" type="text" placeholder="Username" valueLink={this.linkProp('twitter')} />
                </div>
              </div>
            </div>

            <div className="row" id="newwalkleader">
              <div className="col-md-6">
                <label htmlFor="facebook"><i className="fa fa-facebook-square" />&nbsp;Facebook</label>
                <input type="text" id="facebook" placeholder="" valueLink={this.linkProp('facebook')} />
              </div>
              <div className="col-md-6">
                <label htmlFor="website"><i className="fa fa-link" />&nbsp;{t('Website')}</label>
                <input type="text" id="website" placeholder="" valueLink={this.linkProp('website')} />
              </div>
            </div>
            <hr />
            <div className="private">
              <h4>{ t('We\'ll keep this part private') }</h4>
              <div className="alert alert-info">
                { t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')} 
              </div>
              <div className="row" id="newwalkleader">
                <div className="col-md-6 tel required">
                  <label htmlFor="phone"><i className="fa fa-phone-square" />{ t('Phone Number') }</label>
                  <input type="tel" maxLength="18" id="phone" placeholder="" valueLink={this.linkProp('phone')} />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
});

var TeamLeader = React.createClass({
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <div className="thumbnail team-member walk-leader clearfix" id="walk-leader-new">
        <fieldset>
          <legend>{ t('Walk Leader') }</legend>
          <div id="walkleader">
            <div className="item required">
              <label htmlFor="name">{ t('Name') }</label>
              <div className="item">
                <form className="form-inline">
                  <input type="text" id="name" placeholder="First" valueLink={this.linkProp('name-first')} />
                  <input type="text" id="name" placeholder="Last" valueLink={this.linkProp('name-last')} />
                </form>
              </div>
            </div>
            <div className="item" id="primary-walkleader-select">
              <label className="checkbox"><input type="checkbox" className="role-check" valueLink={this.linkProp('primary')} />{ t('Primary Walk Leader') }</label>
            </div>
            <div className="item required">
              <label htmlFor="bio">{ t('Introduce the walk leader') }</label>
              <div className="alert alert-info">
                { t('We recommend keeping the bio under 60 words')} 
              </div>
              <textarea className="col-md-12" id="bio" rows="6" valueLink={this.linkProp('bio')} />
            </div>
            <div className="row" id="newwalkleader">
              <div className="col-md-6">
                <label htmlFor="prependedInput"><i className="fa fa-twitter" /> Twitter</label>
                <div className="input-prepend">
                  <span className="add-on">@</span>
                  <input id="prependedInput" className="col-md-12" type="text" placeholder="Username" valueLink={this.linkProp('twitter')} />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="facebook"><i className="fa fa-facebook-square" /> Facebook</label>
                <input type="text" id="facebook" placeholder="" valueLink={this.linkProp('facebook')} />
              </div>
            </div>
            <div className="row" id="newwalkleader">
              <div className="col-md-6">
                <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
                <input type="text" id="website" placeholder="" valueLink={this.linkProp('website')} />
              </div>
            </div>
            <hr />
            <h4>{ t('Private') }</h4>
            <div className="alert alert-info">
              { t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.') }
            </div>
            <div className="row" id="newwalkleader">
              <div className="col-md-6 required">
                <label htmlFor="email"><i className="fa fa-envelope" />{ t('Email') }</label>
                <input type="email" id="email" placeholder="Email" valueLink={this.linkProp('email')} />
              </div>
              <div className="col-md-6 tel">
                <label htmlFor="phone"><i className="fa fa-phone-square" />{ t('Phone Number') }</label>
                <input type="tel" maxLength="16" id="phone" placeholder="" valueLink={this.linkProp('phone')} />
              </div>
            </div>
          </div>
        </fieldset>
        <footer>
          <button className="btn remove-team-member" onClick={this.props.onDelete}>{ t('Remove Team Member') }</button>
        </footer>
      </div>
    )
  }
});

var TeamOrganizer = React.createClass({
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <div className="thumbnail team-member walk-organizer" id="walk-organizer-new">
        <fieldset>
          <legend>{ t('Walk Organizer') }</legend>
          <div className="row" id="walkleader">
            <div className="col-md-9">
              <div className="item required">
                <label htmlFor="name">{ t('Name') }</label>
                <form className="form-inline">
                  <input type="text" id="name" placeholder="First" valueLink={this.linkProp('name-first')} />
                  <input type="text" id="name" placeholder="Last" valueLink={this.linkProp('name-last')} />
                </form>
              </div>
              <label htmlFor="affiliation">{ t('Affilated Institution') } ({ t('Optional') })</label>
              <input type="text" id="name" placeholder="e.g. City of Toronto" valueLink={this.linkProp('institution')} />
              <div className="row" id="newwalkleader">
                <div className="col-md-6">
                  <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
                  <input type="text" className="col-md-12" id="website" placeholder="" valueLink={this.linkProp('website')} />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <footer>
          <button className="btn remove-team-member" onClick={this.props.onDelete}>{ t('Remove Team Member') }</button>
        </footer>
      </div>
    )
  }
});

var TeamCommunityVoice = React.createClass({
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <div className="thumbnail team-member community-voice" id="community-voice-new">
        <fieldset>
          <legend id="community-voice">{ t('Community Voice') }</legend>
          <div className="row" id="walkleader">
            <div className="col-md-9">
              <div className="item required">
                <label htmlFor="name">{ t('Name') }</label>
                <form className="form-inline">
                  <input type="text" id="name" placeholder="First" valueLink={this.linkProp('name-first')} />
                  <input type="text" id="name" placeholder="Last" valueLink={this.linkProp('name-last')} />
                </form>
              </div>
              <div className="item">
                <label htmlFor="bio">{ t('Tell everyone about this person') }</label>
                <div className="alert alert-info">
                  { t('We recommend keeping the bio under 60 words')} 
                </div>
                <textarea className="col-md-12" id="bio" rows="6" valueLink={this.linkProp('bio')} />
              </div>
              <div className="row" id="newwalkleader">
                <div className="col-md-6">
                  <label htmlFor="prependedInput"><i className="fa fa-twitter" /> Twitter</label>
                  <div className="input-prepend">
                    <span className="add-on">@</span>
                    <input className="col-md-12" id="prependedInput" type="text" placeholder="Username" valueLink={this.linkProp('twitter')} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="facebook"><i className="fa fa-facebook-square" /> Facebook</label>
                  <input type="text" id="facebook" placeholder="" valueLink={this.linkProp('facebook')} />
                </div>
              </div>
              <div className="row" id="newwalkleader">
                <div className="col-md-6">
                  <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
                  <input type="text" className="col-md-12" id="website" placeholder="" valueLink={this.linkProp('website')} />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <footer>
          <button className="btn remove-team-member" onClick={this.props.onDelete}>{ t('Remove Team Member') }</button>
        </footer>
      </div>
    )
  }
});

var TeamVolunteer = React.createClass({
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <div className="thumbnail team-member othermember" id="othermember-new">
        <fieldset>
          <legend id="othermember">{ t('Volunteers') }</legend>
          <div className="row" id="walkleader">
            <div className="col-md-9">
              <div className="item required">
                <label htmlFor="name">{ t('Name') }</label>
                <form className="form-inline">
                  <input type="text" id="name" placeholder="First" valueLink={this.linkProp('name-first')} />
                  <input type="text" id="name" placeholder="Last" valueLink={this.linkProp('name-last')} />
                </form>
              </div>

              <div className="item required">
                <label htmlFor="role">{ t('Role') }</label>
                <input type="text" id="role" valueLink={this.linkProp('role')} />
              </div>

              <div className="row" id="newwalkleader">
                <div className="col-md-6">
                  <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
                  <input type="text" className="col-md-12" id="website" placeholder="" valueLink={this.linkProp('website')} />
                </div>
              </div>

            </div>
          </div>
        </fieldset>
        <footer>
          <button className="btn remove-team-member" onClick={this.props.onDelete}>{ t('Remove Team Member') }</button>
        </footer>
      </div>
    )
  }
});

module.exports = TeamBuilder;
