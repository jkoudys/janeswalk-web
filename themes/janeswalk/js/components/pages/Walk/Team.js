import React from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const connections = require('../../../json/ConnectionTypes.json');
const teamTypes = require('../../../json/TeamMembers.json');

function ConnectionLinks({ member }) {
  const availConnects = connections.filter(c => member[c.name]);

  return (
    <div className="btn-toolbar">
      {availConnects.map(({ prefix, match, name, style }, i) => (
        <a key={`connect${name}${i}`} className="btn" href={`${member[name].match(match) ? '' : prefix}${member[name]}`} target="_blank">
          <i className={style} />
        </a>
      ))}
    </div>
  );
}

const WalkTeam = ({ team = [] }) => {
  const teamMembers = team.map((m, i) => (
    <article key={i}>
      <header>
        <h3>
          {(`${m['name-first']} ${m['name-last']}`).trim()}
          <span className="walkTeamMemberRole">{teamTypes.roles[m.role] || m.role}</span>
        </h3>
        <footer>
          <ConnectionLinks member={m} />
        </footer>
      </header>
      <summary dangerouslySetInnerHTML={{ __html: m.bio }} />
    </article>)
  );

  return (
    <section className="walkTeam">
      <a name="About the Walk Team"></a>
      <h2>{t`About the Walk Team`}</h2>
      <section>
       {teamMembers}
      </section>
    </section>
  );
};

export default WalkTeam;
