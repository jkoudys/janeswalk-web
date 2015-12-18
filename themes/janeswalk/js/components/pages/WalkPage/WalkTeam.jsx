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
        { connections.map(c => (member[c.name].length > 0 ? <a href={c.href + member[c.name]} target="_blank" className={c.style}></a> : null))}
      </div>
    );
  };

  const teamMembers = team.map(member => (
    <article>
      <header>
        <h3>{member['name-first']} {member['name-last']}</h3>
        <h4>{member['role']}</h4>
      </header>
      <summary dangerouslySetInnerHTML={{__html: member['bio']}}></summary>
      <footer>
        {generateLinks(member)}
      </footer>
    </article>)
  );

  return(
    <section id="walkTeam">
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
