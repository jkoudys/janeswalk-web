/**
 * RouteMap
 *
 * Show and draw your route.
 */
/* global CCM_THEME_PATH */

import { createElement as ce, PureComponent } from 'react';
import GoogleMap from 'google-map-react';

import StopMarker from './StopMarker';

const mapStyle = [{
  featureType: 'transit',
  stylers: [{
    visibility: 'off',
  }],
}, {
  featureType: 'water',
  stylers: [{
    visibility: 'simplified',
  }, {
    color: '#d7f0fa',
  }],
}, {
  featureType: 'road',
  elementType: 'geometry',
  stylers: [{
    visibility: 'simplified',
  }, {
    color: '#ffffff',
  }],
}];

const createMapOptions = (maps) => ({
  backgroundColor: '#d7f0fa',
  mapTypeControl: false,
  mapTypeId: maps.MapTypeId.TERRAIN,
  rotateControl: true,
  scaleControl: true,
  scrollwheel: false,
  zoomControl: true,
  mapTypeControlOptions: {
    mapTypeIds: [maps.MapTypeId.ROADMAP, maps.MapTypeId.SATELLITE],
  },
});

export default class RouteMap extends PureComponent {
  afterMapLoaded = ({ map, maps }) => {
    map.setOptions({ scrollwheel: false });
    map.mapTypes.set('map_style', new maps.StyledMapType(mapStyle));
    map.setMapTypeId('map_style');
    this.googleMap = map;
  };

  render() {
    const { afterMapLoaded } = this;
    const { city, points, route, onClick } = this.props;

    return (
      ce(GoogleMap, {
        options: createMapOptions,
        onGoogleApiLoaded: afterMapLoaded,
        defaultZoom: 12,
        defaultCenter: city.latlng,
        onClick,
        style: {
          width: '100%',
          height: window.innerHeight * 0.6,
          position: 'relative',
        },
      },
        points.map(({ geometry: { coordinates: [lng, lat] } }, idx) => (
          ce(StopMarker, { lat, lng, key: `marker${lng}${lat}`, idx })
        ))
      )
    );
  }
}
