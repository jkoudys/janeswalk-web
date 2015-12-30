import React from 'react';

const WalkTeam = ({team}) => {
  let generateLinks = (member) => {
    const connections = [
      {name:'twitter', href:'http://twitter.com/', style:'fa fa-twitter'},
      {name:'facebook',href:'http://facebook.com/', style:'fa fa-facebook'},
      {name:'email',href:'mailto:', style:'fa fa-envelope-o'},
      {name:'website',href:'', style:'fa fa-globe'},
      {name:'phone',href:'', style:'fa fa-phone'},
    ];

    return (
      <div>
        { connections.map((c,i) => (member[c.name].length > 0 ? <a key={i} href={c.href + member[c.name]} target="_blank" className={c.style}></a> : null))}
      </div>
    );
  };

  let teamMembers = team.map((member, i)=> (
    <article key={i}>
      <header>
        <h3>{member['name-first']} {member['name-last']}, <span className="walkTeamMemberRole">{member['role']}</span></h3>
        <footer>
          {generateLinks(member)}
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
