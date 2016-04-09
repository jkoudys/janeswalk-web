/**
 * The map of upcoming walks for a whole city
 */
/* global React google $ */
import InfoWindow from './InfoWindow.jsx';

// Helper to see if a member is a walk leader
function isWalkLeader(member) {
  // Check if their role contains leader, or their type does
  return (member.role && member.role.indexOf('leader') > -1) ||
    (member.type && member.type.indexOf('leader') > -1);
}

// Date formatter
let dtfDate;
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

const _infoNode = document.createElement('div');

/**
 * Loop through the first set of markers, and see which in the update need to be
 * displayed.
 *
 * @param object markers The currently rendered markers
 * @param array outings The walk outings we want to render markers for
 * @param google.maps.Map map The google map to render to
 * @return object updated set of markers
 */
function addNewMarkersToMap(markers, outings, map) {
  // TODO: see how to move these consts out of the function, since
  // they need to be here so google can load first
  // Basic info window
  const infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });

  // Simple map marker icon
  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 7,
    strokeWeight: 1,
    strokeColor: '#f16725',
    fillOpacity: 0.7,
    fillColor: '#f16725',
  };

  // Clean out the markers before we put them back in
  Object.keys(markers).forEach(k => markers[k].setMap(null));

  // Grab starting point of each walk
  for (const { walk, slot } of outings) {
    if (markers[walk.id]) {
      // We already have this marker built, so simply add it to the map
      markers[walk.id].setMap(map);
    } else {
      // We must build a marker
      let marker;
      let latlng;
      // Walk location is meeting place coords
      if (walk.map && Array.isArray(walk.map.markers) && walk.map.markers.length > 0) {
        latlng = new google.maps.LatLng(walk.map.markers[0].lat, walk.map.markers[0].lng);
      } else if (walk.map && Array.isArray(walk.map.route) && walk.map.route.length > 0) {
        latlng = new google.maps.LatLng(walk.map.route[0].lat, walk.map.route[0].lng);
      }

      // Add the marker
      marker = new google.maps.Marker({
        position: latlng,
        title: walk.title,
        icon,
        map,
      });

      markers[walk.id] = marker;

      google.maps.event.addListener(marker, 'click', () => {
        let leaders;
        let date;

        // Build the team list of walk leaders
        if (Array.isArray(walk.team)) {
          leaders = walk.team.filter(member => isWalkLeader(member))
          .map(member => `${member['name-first']} ${member['name-last']}`);
        }

        // Best-effort grab of the time
        try {
          // Show all dates joined together
          date = (
            <h6>
              <i className="fa fa-calendar" /> {dtfDate.format(slot[0] * 1000)}
            </h6>
          );
        } catch (e) {
          // Just log this, but don't die
          console.error('Failed to parse walk time.');
        }

        // Setup infowindow
        React.render(
          <InfoWindow
            key={walk.id}
            {...walk}
            {...{ date, leaders }}
          />,
          _infoNode
        );

        // Center the marker and display its info window
        infoWindow.setMap(map);
        map.panTo(marker.getPosition());
        infoWindow.setContent(_infoNode);
        infoWindow.open(map, marker);
      });
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
    const { zoomlevel, latlng } = this.props;
    const locationLatLng = new google.maps.LatLng(latlng[0], latlng[1]);

    // Setup map
    const map = new google.maps.Map(React.findDOMNode(this), {
      center: locationLatLng,
      zoom: zoomlevel || 10,
      backgroundColor: '#d7f0fa',
      scrollwheel: false,
    });

    // Play nice with bootstrap tabs
    $('a[href="#jw-map"]').on('shown.bs.tab', () => {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(locationLatLng);
    });

    // Add our markers to the empty map
    const newMarkers = addNewMarkersToMap({}, this.props.outings, map);
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
