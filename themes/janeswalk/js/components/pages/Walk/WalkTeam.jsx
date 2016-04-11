/* global React */

const connections = require('../../../json/ConnectionTypes.json');
const teamTypes = require('../../../json/TeamMembers.json');

function ConnectionLinks({ member }) {
  const availConnects = connections.filter(c => member[c.name]);

  return (
    <div className="btn-toolbar">
      {availConnects.map(({ href, name, style }, i) => (
        <a key={i} className="btn" href={`${href.match(/\/\//) ? '' : '//'}${href}${member[name]}`} target="_blank">
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
          {(`${m['name-first']} ${m['name-last']}`).trim()}, <span className="walkTeamMemberRole">{teamTypes.roles[m.role] || m.role}</span>
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
      <h2>About the Walk Team</h2>
      <section>
       {teamMembers}
      </section>
    </section>
  );
};

WalkTeam.propTypes = {
  member: React.PropTypes.array.isRequired,
};

export default WalkTeam;
