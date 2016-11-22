/* global JanesWalk google CCM_THEME_PATH */

// TODO: WalkMap.jsx already exists, review and re-use
/**
 * The walk stop marker theme
 */
import { createElement as ce, Component } from 'react';
const { startups } = JanesWalk;
const { assign } = Object;

const stopMarker = {
  url: `${CCM_THEME_PATH}/images/marker.png`,
};

startups.googleMaps.then(() => Object.assign(stopMarker, {
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  labelOrigin: new google.maps.Point(11, 17),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44),
}));

function boundMapByMarkers(map, markers) {
  // Don't include the route - it can be too expensive to compute.
  const bounds = new google.maps.LatLngBounds();
  google.maps.event.trigger(map, 'resize');
  markers.forEach(marker => bounds.extend(marker.getPosition()));

  // Fitbounds is async, and runs a bounds_changed event
  map.fitBounds(bounds);

  // Make sure we don't zoom in too far, eg a 1 point map
  const boundListener = google.maps.event.addListener(map, 'bounds_changed', () => {
    if (map.getZoom() > 17) {
      map.setZoom(17);
    }
    google.maps.event.removeListener(boundListener);
  });
}

export default class WalkMap extends Component {
  constructor(props, ...args) {
    super(props, ...args);

    assign(this, {
      state: { googleMap: null },
      saveMapRef: domRoot => assign(this, { domRoot }),
    });
  }

  componentDidMount() {
    const { features } = this.props;
    const markers = features.filter(f => f.type === 'Feature' && f.geometry.type === 'Point');
    const route = features.find(f => f.type === 'Feature' && f.geometry.type === 'LineString');
    const [{ geometry: { coordinates: meetingPlace } }] = markers;
    const locationLatLng = new google.maps.LatLng(meetingPlace[0], meetingPlace[1]);
    const gmarkers = [];

    const mapOptions = {
      center: locationLatLng,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',
    };

    const googleMap = new google.maps.Map(this.domRoot, mapOptions);

    gmarkers.push(...markers.map(({ geometry: { coordinates: [lng, lat] } }, i) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        style: 'stop',
        icon: stopMarker,
        map: googleMap,
        label: {
          text: String.fromCharCode(i + 65),
          fontWeight: '700',
          fontSize: '16px',
          color: '#ffffff',
        },
      });

      google.maps.event.addListener(marker, 'click', () => {
        googleMap.panTo(marker.getPosition());
        // TODO: scroll to list of stops
      });

      return marker;
    }));

    // Draw the line
    const poly = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: false,
      map: googleMap,
    });
    poly.setPath(route.geometry.coordinates.map(([lng, lat]) => new google.maps.LatLng(lat, lng)));

    boundMapByMarkers(googleMap, gmarkers);

    this.setState({ googleMap });
  }


  render() {
    return ce('div', { className: 'walkMap', ref: this.saveMapRef });
  }
}
