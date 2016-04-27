/* global React ReactDOM google CCM_THEME_PATH */

// TODO: WalkMap.jsx already exists, review and re-use
/**
 * The walk stop marker theme
 * TODO: generalize for import
 */
const stopMarker = {
  url: `${CCM_THEME_PATH}/images/marker.png`,
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  labelOrigin: new google.maps.Point(11, 17),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44),
};

function boundMapByMarkers(map, markers) {
  // Don't include the route - it can be too expensive to compute.
  const bounds = new google.maps.LatLngBounds;
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

export default class WalkMap extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { googleMap: null };
  }

  componentDidMount() {
    const { map } = this.props;
    const locationLatLng = new google.maps.LatLng(map.markers[0].lat, map.markers[0].lng);
    const markers = [];
    const mapStyles = require('../../../json/MapStyles.json');

    const mapOptions = {
      center: locationLatLng,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',
    };

    const googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
    googleMap.mapTypes.set('map_style', new google.maps.StyledMapType(mapStyles));
    googleMap.setMapTypeId('map_style');

    map.markers.forEach(({ lat, lng }, i) => {
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

      markers.push(marker);
    });

    // Draw the line
    const poly = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: false,
      map: googleMap,
    });
    poly.setPath(map.route.map(({ lat, lng }) => new google.maps.LatLng(lat, lng)));

    boundMapByMarkers(googleMap, markers);

    this.setState({ googleMap });
  }


  render() {
    return <div className="walkMap" />;
  }
}

WalkMap.PropTypes = {
  map: React.PropTypes.object.isRequired,
};
