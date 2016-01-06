const connections = [
  {name:'twitter', href:'http://twitter.com/', style:'fa fa-twitter'},
  {name:'facebook',href:'http://facebook.com/', style:'fa fa-facebook'},
  {name:'email',href:'mailto:', style:'fa fa-envelope-o'},
  {name:'website',href:'', style:'fa fa-globe'},
  {name:'phone',href:'', style:'fa fa-phone'},
];

function ConnectionLinks({member}) {
  const availConnects = connections.filter(c => member[c.name]);

  return (
    <div className="btn-toolbar">
      {availConnects.map((c,i) => <a key={i} className="btn" href={c.href + member[c.name]} target="_blank"><i className={c.style} /></a>)}
    </div>
  );
}

const WalkTeam = ({team}) => {
  let teamMembers = team.map((member, i)=> (
    <article key={i}>
      <header>
        <h3>{(`${member['name-first']} ${member['name-last']}`).trim()}, <span className="walkTeamMemberRole">{member['role']}</span></h3>
        <footer>
          <ConnectionLinks member={member} />
        </footer>
      </header>
      <summary dangerouslySetInnerHTML={{__html: member['bio']}}></summary>
    </article>)
  );

  return(
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
