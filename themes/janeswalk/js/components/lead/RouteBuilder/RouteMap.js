/**
 * RouteMap
 *
 * Show and draw your route.
 */
/* global google */

import { createElement as ce, Component } from 'react';

export default class RouteMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Render the gmap
    // Calling this 'mapDiv' to align with google maps api reference
    const { mapDiv } = this;
    const { city } = this.props;

    // The div renders after this step, so we need to defer the gmaps render
    setTimeout(() => {
      const gmap = new google.maps.Map(mapDiv, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
        center: new google.maps.LatLng(city.latlng[0], city.latlng[1]),
        scrollwheel: false,
        rotateControl: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE],
        },
      });
      this.setState({
        gmap,
      });
    }, 0);
  }

  render() {
    return (
      ce('div', {
        ref: mapDiv => Object.assign(this, { mapDiv }),
        className: 'Lead__RouteMap',
        style: {
          width: '100%',
          height: `${window.innerHeight * 0.6}px`,
        },
      }),
    );
  }
}
