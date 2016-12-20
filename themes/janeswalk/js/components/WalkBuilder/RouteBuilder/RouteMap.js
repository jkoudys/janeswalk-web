/**
 * RouteMap
 *
 * Show and draw your route.
 */
/* global CCM_THEME_PATH */

import { createElement as ce, PureComponent } from 'react';
import GoogleMap from 'google-map-react';

const StopMarker = () => ce('img', { src: `${CCM_THEME_PATH}/images/marker.png` });

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

export default class RouteMap extends PureComponent {
  constructor(props) {
    super(props);

    Object.assign(this, {
      createMapOptions: (maps) => ({
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
      }),
      afterMapLoaded: ({ map, maps }) => {
        map.setOptions({ scrollwheel: false });
        map.mapTypes.set('map_style', new maps.StyledMapType(mapStyle));
        map.setMapTypeId('map_style');
      },
    });
  }

  render() {
    const { createMapOption, afterMapLoaded } = this;

    return (
      ce(GoogleMap, {
        options: createMapOption,
        onGoogleApiLoaded: afterMapLoaded,
        defaultZoom: 12,
        defaultCenter: this.props.city.latlng,
        onChange: (...args) => console.log(args),
        onClick: (...args) => console.log(args),
        style: {
          width: '100%',
          height: `${window.innerHeight * 0.6}px`,
          position: 'relative',
        },
      },
        ce(StopMarker, { lat: this.props.city.latlng[0], lng: this.props.city.latlng[1] })
      )
    );
  }
}
