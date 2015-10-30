// Flux
const i18n = require('../../stores/I18nStore.js');
const t = i18n.getTranslate();
const t2 = i18n.getTranslatePlural();

// Update a field for a team member
function linkMember(field, {value, onChange, index}) {
  return {
    value: value[field],
    onChange: e => onChange(field, e.target.value, index)
  };
}

/* Data models
 * TODO: move to flux stores
 */
const memberTypes = {
  'leader': {"name-first":'', "name-last":'', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: ''},
  'organizer': {"name-first":'', "name-last":'', institution: '', website: ''},
  'community': {"name-first":'', "name-last":'', bio: '', twitter: '', facebook: '', website: ''},
  'volunteer': {"name-first":'', "name-last":'', role: '', website: ''}
};

/**
 * Not a React component, since we use this to build an array of users
 * @return array
 */
const teamMemberList = props => props.map(({value, onChange}) => value.map((user, i) => {
  let teamMember;

  // Use empty strings for unset/false
  user.phone = user.phone || '';

  // TODO: make linking function
  let thisUser = Object.assign({}, teamMemberProps, {
    key: i,
    index: i,
    value: user,
    onChange: () => 1,
    onDelete: () => deleteMember(i, onChange)
  });

  if (user.type === 'you') {
    teamMember = <TeamOwner {...thisUser} />;
  } else if (user.type === 'leader') {
    teamMember = <TeamLeader {...thisUser} />;
  } else if (user.type === 'organizer') {
    teamMember = <TeamOrganizer {...thisUser} />;
  } else if (user.type === 'community') {
    teamMember = <TeamCommunityVoice {...thisUser} />;
  } else if (user.type === 'volunteer') {
    teamMember = <TeamVolunteer {...thisUser} />;
  }

  return teamMember;
}));

function memberChange(team, propname, value, id, onChange) {
  const newTeam = team.slice();
  newTeam[id][propname] = value;
  onChange(newTeam);
}

function addMember(team, member, onChange) {
  const newTeam = team.slice();
  newTeam.push(member);
  onChange(newTeam);
}

function deleteMember(team, i, onChange) {
  const newTeam = team.slice();
  newTeam.splice(i, 1);
  onChange(newTeam);
}

  // Set the member at that specific index
export default ({team, onChange}) => (
  <div className="tab-pane" id="team">
    <div className="page-header" data-section="team">
      <h1>{ t('Build Your Team') }</h1>
    </div>
    {teamMemberList({value: team, onChange: onChange})}
    <div id="add-member">
      <h2>{ t('Who else is involved with this walk?') }</h2>
      <h3 className="lead">{ t('Click to add team members to your walk') } ({ t('Optional') })</h3>
      <div className="team-set">
        <div className="team-row">
          <section className="new-member" id="new-walkleader" title="Add New Walk Leader" onClick={() => addMember(team, memberTypes.leader, onChange)}>
            <div className="icon"></div>
            <h4 className="title text-center">{ t('Walk Leader') }</h4>
            <p>{ t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.') }</p>
          </section>
          <section className="new-member" id="new-walkorganizer" title="Add New Walk Organizer" onClick={() => addMember(team, memberTypes.organizer, onChange)}>
            <div className="icon"></div>
            <h4 className="title text-center">{ t('Walk Organizer') }</h4>
            <p>{ t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.') }</p>
          </section>
        </div>
        <div className="team-row">
          <section className="new-member" id="new-communityvoice" title="Add A Community Voice" onClick={() => addMember(team, memberTypes.community, onChange)}>
            <div className="icon"></div>
            <h4 className="title text-center">{ t('Community Voice') }</h4>
            <p>{ t('A community member with stories and/or personal experiences to share.') }</p>
          </section>
          <section className="new-member" id="new-othermember" title="Add another helper to your walk" onClick={() => addMember(team, memberTypes.volunteer, onChange)}>
            <div className="icon"></div>
            <h4 className="title text-center">{ t('Volunteers') }</h4>
            <p>{ t('Other people who are helping to make your walk happen.') }</p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

const TeamOwner = props => (
  <fieldset className="team-member walk-owner">
    <span><legend>{ t('You') }</legend></span>
    <fieldset className="name item required">
      <label>{ t('Name') }</label>
      <input type="text" placeholder="First" {...linkMember('name-first', props)} />
      <input type="text" placeholder="Last" {...linkMember('name-last', props)} />
    </fieldset>

    <fieldset className="role item required">
      <label>{ t('Role') }</label>
      <select {...linkMember('role', props)}>
        <option defaultValue="walk-leader">{ t('Walk Leader') }</option>
        <option defaultValue="co-walk-leader">{ t('Co-Walk Leader') }</option>
        <option defaultValue="walk-organizer">{ t('Walk Organizer') }</option>
      </select>
    </fieldset>
    <fieldset className="item">
      <label className="checkbox"><input type="checkbox" className="role-check" {...linkMember('primary', props)} />{ t('Primary Walk Leader') }</label>
    </fieldset>
    <fieldset className="item required">
      <label htmlFor="bio">{ t('Introduce yourself') }</label>
      <p className="alert alert-info">
        { t('We recommend keeping your bio under 60 words')} 
      </p>
      <textarea rows="6" {...linkMember('bio', props)} />
    </fieldset>

    <fieldset className="contact">
      <fieldset className="item">
        <label><i className="fa fa-envelope" />&nbsp;{t('Email')}</label>
        <input type="email" placeholder="" {...linkMember('email', props)} />
      </fieldset>

      <fieldset className="item">
        <label htmlFor="leader-twitter"><i className="fa fa-twitter" /> Twitter</label>
        <div className="input-group">
          <span className="input-group-addon">@</span>
          <input className="col-md-12" type="text" placeholder="Username" {...linkMember('twitter', props)} />
        </div>
      </fieldset>
    </fieldset>

    <fieldset className="social">
      <fieldset className="item">
        <label htmlFor="facebook"><i className="fa fa-facebook-square" />&nbsp;Facebook</label>
        <input type="text" placeholder="" {...linkMember('facebook', props)} />
      </fieldset>
      <fieldset className="item">
        <label htmlFor="website"><i className="fa fa-link" />&nbsp;{t('Website')}</label>
        <input type="text" placeholder="" {...linkMember('website', props)} />
      </fieldset>
    </fieldset>
    <hr />
    <section className="private">
      <h4>{ t('We\'ll keep this part private') }</h4>
      <p className="alert alert-info">
        { t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')} 
      </p>
      <fieldset className="tel required">
        <label><i className="fa fa-phone-square" />{ t('Phone Number') }</label>
        <input type="tel" maxLength="18" placeholder="" {...linkMember('phone', props)} />
      </fieldset>
    </section>
  </fieldset>
);

const TeamLeader = props => (
  <fieldset className="team-member walk-leader clearfix">
    <legend>{ t('Walk Leader') }</legend>
    <div>
      <div className="item required">
        <label htmlFor="name">{ t('Name') }</label>
        <div className="item">
          <form className="form-inline">
            <input type="text" placeholder="First" {...linkMember('name-first', props)} />
            <input type="text" placeholder="Last" {...linkMember('name-last', props)} />
          </form>
        </div>
      </div>
      <div className="item">
        <label className="checkbox"><input type="checkbox" className="role-check" {...linkMember('primary', props)} />{ t('Primary Walk Leader') }</label>
      </div>
      <div className="item required">
        <label htmlFor="bio">{ t('Introduce the walk leader') }</label>
        <div className="alert alert-info">
          { t('We recommend keeping the bio under 60 words')} 
        </div>
        <textarea className="col-md-12" rows="6" {...linkMember('bio', props)} />
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="prependedInput"><i className="fa fa-twitter" /> Twitter</label>
          <div className="input-prepend">
            <span className="add-on">@</span>
            <input className="col-md-12" type="text" placeholder="Username" {...linkMember('twitter', props)} />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="facebook"><i className="fa fa-facebook-square" /> Facebook</label>
          <input type="text" placeholder="" {...linkMember('facebook', props)} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
          <input type="text" placeholder="" {...linkMember('website', props)} />
        </div>
      </div>
      <hr />
      <h4>{ t('Private') }</h4>
      <div className="alert alert-info">
        { t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.') }
      </div>
      <div className="row">
        <div className="col-md-6 required">
          <label htmlFor="email"><i className="fa fa-envelope" />{ t('Email') }</label>
          <input type="email" placeholder="Email" {...linkMember('email', props)} />
        </div>
        <div className="col-md-6 tel">
          <label htmlFor="phone"><i className="fa fa-phone-square" />{ t('Phone Number') }</label>
          <input type="tel" maxLength="16" placeholder="" {...linkMember('phone', props)} />
        </div>
      </div>
    </div>
    <footer>
      <button className="btn remove-team-member" onClick={props.onDelete}>{ t('Remove Team Member') }</button>
    </footer>
  </fieldset>
);

const TeamOrganizer = props => (
  <fieldset className="team-member walk-organizer">
    <legend>{ t('Walk Organizer') }</legend>
    <div className="row">
      <div className="col-md-9">
        <div className="item required">
          <label htmlFor="name">{ t('Name') }</label>
          <form className="form-inline">
            <input type="text" placeholder="First" {...linkMember('name-first', props)} />
            <input type="text" placeholder="Last" {...linkMember('name-last', props)} />
          </form>
        </div>
        <label htmlFor="affiliation">{ t('Affilated Institution') } ({ t('Optional') })</label>
        <input type="text" placeholder="e.g. City of Toronto" {...linkMember('institution', props)} />
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
            <input type="text" className="col-md-12" placeholder="" {...linkMember('website', props)} />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button className="btn remove-team-member" onClick={props.onDelete}>{ t('Remove Team Member') }</button>
    </footer>
  </fieldset>
);

const TeamCommunityVoice = props => (
  <fieldset className="team-member community-voice">
    <legend>{ t('Community Voice') }</legend>
    <div className="row">
      <div className="col-md-9">
        <div className="item required">
          <label htmlFor="name">{ t('Name') }</label>
          <form className="form-inline">
            <input type="text" placeholder="First" {...linkMember('name-first', props)} />
            <input type="text" placeholder="Last" {...linkMember('name-last', props)} />
          </form>
        </div>
        <div className="item">
          <label htmlFor="bio">{ t('Tell everyone about this person') }</label>
          <div className="alert alert-info">
            { t('We recommend keeping the bio under 60 words')} 
          </div>
          <textarea className="col-md-12" rows="6" {...linkMember('bio', props)} />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="prependedInput"><i className="fa fa-twitter" /> Twitter</label>
            <div className="input-prepend">
              <span className="add-on">@</span>
              <input className="col-md-12" type="text" placeholder="Username" {...linkMember('twitter', props)} />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="facebook"><i className="fa fa-facebook-square" /> Facebook</label>
            <input type="text" placeholder="" {...linkMember('facebook', props)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
            <input type="text" className="col-md-12" placeholder="" {...linkMember('website', props)} />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button className="btn remove-team-member" onClick={props.onDelete}>{ t('Remove Team Member') }</button>
    </footer>
  </fieldset>
);

const TeamVolunteer = props => (
  <div className="thumbnail team-member othermember">
    <fieldset>
      <legend>{ t('Volunteers') }</legend>
      <div className="row">
        <div className="col-md-9">
          <div className="item required">
            <label htmlFor="name">{ t('Name') }</label>
            <form className="form-inline">
              <input type="text" placeholder="First" {...linkMember('name-first', props)} />
              <input type="text" placeholder="Last" {...linkMember('name-last', props)} />
            </form>
          </div>
          <div className="item required">
            <label htmlFor="role">{ t('Role') }</label>
            <input type="text" {...linkMember('role', props)} />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="website"><i className="fa fa-link" />{ t('Website') }</label>
              <input type="text" className="col-md-12" placeholder="" {...linkMember('website', props)} />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    <footer>
      <button className="btn remove-team-member" onClick={props.onDelete}>{ t('Remove Team Member') }</button>
    </footer>
  </div>
);
