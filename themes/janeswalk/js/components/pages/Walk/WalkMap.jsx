//TODO: WalkMap.jsx already exists, review and re-use
/**
 * The walk stop marker theme
 * TODO: generalize for import
 */
const stopMarker = {
  url: CCM_THEME_PATH + '/images/marker.png',
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  labelOrigin: new google.maps.Point(11, 17),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44)
};

function boundMapByMarkers(map, markers) {
  // Don't include the route - it can be too expensive to compute.
  const bounds = new google.maps.LatLngBounds;
  google.maps.event.trigger(map, 'resize');
  markers.forEach(marker => bounds.extend(marker.getPosition()));

  // Fitbounds is async, and runs a bounds_changed event
  map.fitBounds(bounds);

  // Make sure we don't zoom in too far, eg a 1 point map
  let boundListener = google.maps.event.addListener(map, 'bounds_changed', () => {
    if (map.getZoom() > 17) {
      map.setZoom(17);
    }
    google.maps.event.removeListener(boundListener);
  });
}

export default class WalkMap extends React.Component {
  constructor(props,...args) {
    super(props,...args);
    this.state = {googleMap: null};
  }

  componentDidMount() {

    //TODO: Create a <GoogleMap/> component to generalize use of google maps
    const {map} = this.props;
    const locationLatLng = new google.maps.LatLng(map.markers[0].lat, map.markers[0].lng);
    const markers = [];

    const mapOptions = {
      center: locationLatLng,
      scrollwheel: false,
      backgroundColor: '#d7f0fa'
    };

    const googleMap = new google.maps.Map(React.findDOMNode(this), mapOptions);
    googleMap.mapTypes.set('map_style', new google.maps.StyledMapType([{
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{
        visibility: "on"
      }, {
        saturation: 37
      }]
    }, {
      featureType: 'landscape',
      stylers: [{
        visibility: 'on'
      }, {
        color: '#eaeaea'
      }]
    }, {
      featureType: 'poi',
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: 'poi.park',
      stylers: [{
        visibility: 'on'
      }, {
        color: '#cadfaa'
      }]
    }, {
      featureType: 'poi.school',
      elementType: 'labels',
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: 'poi.school',
      elementType: 'geometry',
      stylers: [{
        visibility: 'on'
      }, {
        color: '#dadada'
      }]
    }, {
      featureType: 'transit',
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: 'water',
      stylers: [{
        visibility: 'simplified'
      }, {
        color: '#90c2ff'
      }]
    }, {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{
        visibility: 'simplified'
      }, {
        color: '#ffffff'
      }]
    }, {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{
        visibility: 'off'
      }]
    }]));
    googleMap.setMapTypeId('map_style');

    const routePath = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      path: map.route,
      map: googleMap
    });

    map.markers.forEach((m,i) => {
      let locationLatLng = new google.maps.LatLng(m.lat,m.lng);
      let marker = new google.maps.Marker({
        position: locationLatLng,
        style: 'stop',
        icon: stopMarker,
        map: googleMap,
        label: {
          text: (i + 1).toString(),
          fontWeight: '700',
          fontSize: '16px',
          color: '#ffffff'
        }
      });

      google.maps.event.addListener(marker, 'click', () => {
        googleMap.panTo(marker.getPosition());
        // TODO: scroll to list of stops
      });

      markers.push(marker);
    });

    boundMapByMarkers(googleMap, markers);

    this.setState({googleMap});
  }


  render() {
   return (<div className="walkMap" style={{width: '60%', height: '350px'}}/>)
  }
}

WalkMap.PropTypes = {
 map: React.PropTypes.object.isRequired,
};
