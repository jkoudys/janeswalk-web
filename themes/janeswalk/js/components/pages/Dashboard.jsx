import React from 'react';
import Dashboard from './Dashboard/Dashboard.jsx';

let _dashboard;

JanesWalks.event.on('profile.receive', function(dashboard){
 _dashboard = dashboard;

 React.render(
     <Dashboard dashboard={dashboard}/>,
     document.getElementById('janeswalk-dashboard-page')
 );
});