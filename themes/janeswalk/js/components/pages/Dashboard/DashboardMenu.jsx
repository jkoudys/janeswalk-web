
const DashboardMenu = ({name, style}) => {
  //TODO: Are the menu items based on available links for each CO or common?
  const menuItems = [ { display: `${name} Walks`, link: '/cityWalks'},
    { display:'My Walks', link: '/myWalks'},
    { display:'Walk Leaders and Volunteers', link: '/walkLeaders'},
    { display:'My Blog Posts', link: '/posts'},
    //{ display:'Impact Report Builder', link: '/impact'}, //TODO: Complete with Data (Post-PR)
    { display:'Resources', link: 'resources'}
  ];

  const menu = menuItems.map((item,i) => (<li key={i}><Link to={item.link}>{item.display}</Link></li>));

  return (
    <section className={`dashboardMenu ${style}`}>
      <ul>{menu}</ul>
    </section>
  );
};

DashboardMenu.PropTypes = {
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.string.isRequired,
};

export default DashboardMenu;