/**
 * The map of upcoming walks for a whole city
 */
/* global google JanesWalk */
import { createElement as ce, Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow';

// Helper to see if a member is a walk leader
// Check if their role contains leader, or their type does
const isWalkLeader = ({ role, type }) => (role && role.includes('leader')) || (type && type.includes('leader'));

// Date formatter
const dtfDate = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
});

const _infoNode = document.createElement('div');

let _infoWindow;
let _icon;
function loadGoogle() {
  // Simple map marker icon
  _icon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 7,
    strokeWeight: 1,
    strokeColor: '#f16725',
    fillOpacity: 0.7,
    fillColor: '#f16725',
  };

  // Basic info window
  _infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });
}

// Google maps loads async, so load these on our event
JanesWalk.event.on('google.loaded', loadGoogle);

/**
 * Create a new google marker and add to map
 * @param lat float Latitude
 * @param lng float Longitude
 * @param team Array The walk team
 * @param title String The walk title
 * @param google.maps.Map gmap The google map
 */
function buildNewMarker({ lat, lng, team = [], startTime, title, gmap, url, shortDescription }) {
  // Add the marker
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    title,
    icon: _icon,
    map: gmap,
  });

  google.maps.event.addListener(marker, 'click', () => {
    let date;

    // Build the team list of walk leaders
    const leaders = team.filter(member => isWalkLeader(member)).map(({ name = '' }) => name);

    // Best-effort grab of the time
    try {
      // Show all dates joined together
      date = (
        ce('h6', null,
          ce('i', { className: 'fa fa-calendar' }),
          ` ${dtfDate.format(startTime * 1000)}`,
        )
      );
    } catch (e) {
      // Just log this, but don't die
      console.error('Failed to parse walk time.');
    }

    // Setup infowindow
    render(
      ce(InfoWindow, { key: `${title}:${startTime}`, title, date, leaders, url, shortDescription }),
      _infoNode
    );

    // Center the marker and display its info window
    _infoWindow.setMap(gmap);
    gmap.panTo(marker.getPosition());
    _infoWindow.setContent(_infoNode);
    _infoWindow.open(gmap, marker);
  });

  return marker;
}

/**
 * Loop through the first set of markers, and see which in the update need to be
 * displayed.
 *
 * @param Map markers The currently rendered markers
 * @param array outings The walk outings we want to render markers for
 * @param google.maps.Map gmap The google map to render to
 * @return object updated set of markers
 */
function addNewMarkersToMap(markers, outings, gmap) {
  // Clean out the markers before we put them back in
  for (const marker of markers.values()) marker.setMap(null);

  // Grab starting point of each walk
  for (const {
    walk: {
      id,
      features = [],
      team = [],
      title = '',
      url = '',
      shortDescription = '',
    },
    slot,
  } of outings) {
    if (markers.has(id)) {
      // We already have this marker built, so simply add it to the map
      markers.get(id).setMap(gmap);
    } else {
      const points = features.filter(f => f.type === 'Feature' && f.geometry.type === 'Point');
      const { geometry: { coordinates: route = [] } = {} } = features.find(f => f.type === 'Feature' && f.geometry.type === 'LineString') || {};

      // Grab either the first stop or route point
      const [[lng, lat] = []] = [...points.map(m => m.geometry.coordinates), ...route];
      if (lat && lng) {
        // We must build a marker
        markers.set(id, buildNewMarker({ lat, lng, team, title, gmap, startTime: slot[0], url, shortDescription }));
      }
    }
  }

  return markers;
}

export default class LocationMap extends Component {
  state = { map: null, markers: {} };

  componentDidMount() {
    const { zoomlevel: zoom = 12, coordinates: [lng, lat], outings } = this.props;
    loadGoogle();
    const locationLatLng = new google.maps.LatLng(lat, lng);

    // Setup map
    const map = new google.maps.Map(this.mapNode, {
      center: locationLatLng,
      zoom,
      backgroundColor: '#d7f0fa',
      scrollwheel: false,
    });

    // Add our markers to the empty map
    this.setState({ map, markers: addNewMarkersToMap(new Map(), outings, map) });
  }

  componentWillReceiveProps({ outings }) {
    const { markers, map } = this.state;
    this.setState({
      markers: addNewMarkersToMap(markers, outings, map) });
  }

  render() {
    return (
      ce('div', {
        ref: (node) => { this.mapNode = node; },
        className: 'cityMap',
        style: { width: '100%', height: '70vh' },
      })
    );
  }
}
