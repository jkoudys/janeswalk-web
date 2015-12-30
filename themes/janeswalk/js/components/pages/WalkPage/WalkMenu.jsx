import React from 'react';
import { dateFormatted } from '../../../../../../blocks/page_list/templates/itinerary/itinerary/ItineraryUtils';
import WalkAccessibility from './WalkAccessibility.jsx';
import WalkPublicTransit from './WalkPublicTransit.jsx';
import WalkParking from './WalkParking.jsx';

//TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
//TODO: Make walkMenu sticky - will complete after Dashboard

const WalkMenu = ({walk,filters}) => {

  const {checkboxes, title, map, time, team} = walk;
  const {theme} = filters;
  const walkLeader = team.find(member => member.role === 'walk-leader');

  //TODO Convert below to a Utility to use in multiple places like <Dashboard/> <CityWalksFilter/>
  const tags = Object.keys(checkboxes).filter(item => item.includes('theme'));

  const menuItems = ['About This Walk', 'Walk Route', 'How to find us', 'About the Walk Team'];

  return (
    <section className="walkMenu">
      <header className="walkHeader">
        <h5>{title}</h5>
        <h6>Led By {walkLeader['name-first']} {walkLeader['name-last']} </h6>
        <h6>{dateFormatted(time.slots[0][0])}</h6>
        <h6>Meeting at {map.markers[0].title}</h6>
        <WalkAccessibility {...walk} {...filters} style="walk-menu-navigation"/>
        <WalkPublicTransit {...walk} style="walk-menu-navigation"/>
        <WalkParking {...walk} style="walk-menu-navigation"/>
      </header>
      <section className="menu">
        <ul>
         {menuItems.map((item,i) => <li key={i}><a href={`#${item}`}>{item}</a></li>)}
        </ul>
      </section>
      <section className="tags">
        {tags.map((tag,i) => <span className="tag" key={i}>#{theme.data[tag.split('-').slice(1, 3).join('-')]}</span>)}
      </section>
      <WalkAccessibility {...walk} {...filters} style="walk-menu-navigation"/>
      <WalkPublicTransit {...walk} style="walk-menu-navigation"/>
      <WalkParking {...walk} style="walk-menu-navigation"/>
    </section>
  );
};

WalkMenu.propTypes = {
  walk: React.PropTypes.object.isRequired,
};

export default WalkMenu;