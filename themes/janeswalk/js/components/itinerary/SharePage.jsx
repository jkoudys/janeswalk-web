//TODO: ItineraryStore is temp to fill walks
import ItineraryStore from './ItineraryStore';

// TODO: need to have equivalent view.jsx, like below

//import React from 'react';
//import SharePage from './SharePage.jsx.jsx';
//
//let _sharePage;
//
//JanesWalk.event.on('sharePage.receive', function(sharePage) {
//  _sharePage = sharePage;
//
//  React.render(
//    <SharePage sharePage={sharePage}/>,
//    document.getElementById('janeswalk-share-page')
//  );
//});

import Walk from './Walk.jsx';
import './view.less';

const getSharePage = () => ({
  walks: ItineraryStore.getItineraryList().walks,
  description: ItineraryStore.getItineraryList().description,
  title: ItineraryStore.getItineraryList().title,
  userName: 'Herald',
  userImage: 'http://placehold.it/150x150',
});

export default class SharePage extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = props.sharePage || getSharePage();

  }

  render() {
    const {walks, description, title, userImage, userName} = this.state;
    debugger;

    const ShareWalks = walks.map(({map, id, title, time, url}) =>
      <Walk
        title={title}
        meeting={map.markers[0].title}
        start={time.slots[0][0]}
        id={id}
        key={id}
        url={url}
      />
    );

    return (
      <section id="share-walks">
        <h1>{`${userName} ${title}`} </h1>
        <h3>{description}</h3>
        <img src={userImage}></img>
        {ShareWalks}
      </section>
    );
  };
};

// TODO: propTypes