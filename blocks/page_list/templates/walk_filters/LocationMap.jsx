/**
 * The map of upcoming walks for a whole city
 */
/* global React ReactDOM google $ JanesWalk */
import InfoWindow from './InfoWindow.jsx';

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
    const leaders = team.filter(member => isWalkLeader(member))
    .map(member => `${member['name-first']} ${member['name-last']}`);

    // Best-effort grab of the time
    try {
      // Show all dates joined together
      date = (
        <h6>
          <i className="fa fa-calendar" /> {dtfDate.format(startTime * 1000)}
        </h6>
      );
    } catch (e) {
      // Just log this, but don't die
      console.error('Failed to parse walk time.');
    }

    // Setup infowindow
    ReactDOM.render(
      <InfoWindow
        key={`${title}:${startTime}`}
        {...{ title, date, leaders, url, shortDescription }}
      />,
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
      map: {
        markers: stops = [],
        route = [],
      } = {},
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
      // Grab either the first stop or route point
      const [{ lat, lng } = {}] = stops.concat(route);
      if (lat && lng) {
        // We must build a marker
        markers.set(id, buildNewMarker({ lat, lng, team, title, gmap, startTime: slot[0], url, shortDescription }));
      }
    }
  }

  return markers;
}

export default class LocationMap extends React.Component {
  constructor(...args) {
    super(...args);

    Object.assign(this, {
      state: { map: null, markers: {} },
    });
  }

  componentDidMount() {
    const { zoomlevel, latlng: [lat, lng] } = this.props;
    loadGoogle();
    const locationLatLng = new google.maps.LatLng(lat, lng);

    // Setup map
    const map = new google.maps.Map(ReactDOM.findDOMNode(this), {
      center: locationLatLng,
      zoom: zoomlevel || 10,
      backgroundColor: '#d7f0fa',
      scrollwheel: false,
    });

    // Add our markers to the empty map
    const newMarkers = addNewMarkersToMap(new Map(), this.props.outings, map);
    this.setState({ map, markers: newMarkers });
  }

  componentWillReceiveProps(props) {
    const newMarkers = addNewMarkersToMap(this.state.markers, props.outings, this.state.map);
    this.setState({ markers: newMarkers });
  }

  render() {
    return (
      <div className="cityMap" style={{ width: '100%', height: '70vh' }} />
    );
  }
}
