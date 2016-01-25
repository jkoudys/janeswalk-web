import DashboardStore from './DashboardStore';

//TODO: (Post-PR) WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined

const InfoWindow = ({url, title, shortDescription}) => (
  <span>
    <h4><a href={url}>{title}</a></h4>
    <p>{shortDescription}</p>
  </span>
);

const manageMarkers = (map, markers, walks) => {

  const infoWindow = new google.maps.InfoWindow({maxWidth: 600});
  const _infoNode = document.createElement('div');

  //remove any markers that are not part of active walks
  markers = markers.filter(m => {
    const walkFound = walks.find(w => (w.id === m.walkId));

    if (walkFound) {
      return walkFound;
    }
    else {
      m.setMap(null);
      return false;
    }
  });

  //add additional markers
  walks.forEach(walk => {
    if (walk.map && walk.map.markers) {

      let m = walk.map.markers[0];

      let locationLatLng = new google.maps.LatLng(m.lat,m.lng);

      const walkFound = markers.find(m => (m.walkId === walk.id));

      if (!walkFound) {
        let marker = new google.maps.Marker({
          position: locationLatLng,
          style: 'stop',
          map: map,
          walkId: walk.id,
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', ()=>{
          React.render(<InfoWindow {...walk}/>, _infoNode);

          infoWindow.setMap(map);
          map.panTo(marker.getPosition());
          infoWindow.setContent(_infoNode);
          infoWindow.open(map, marker);
        });
      }
    }
  });

  return markers;
};

export default class WalksMap extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      googleMap: null,
      walks: props.walks,
      googleMapMarkers: [],
    };
  }
  //You cannot use this.setState() in componentWillUpdate
  componentWillReceiveProps(updatedProps) {
    const {googleMap, googleMapMarkers} = this.state;
    const {walks} = updatedProps;

    this.setState({googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks), walks});
  }

  componentDidMount() {

    //TODO: (Post-PR) Create a <GoogleMap/> component to generalize use of google maps
    const {latlng} = DashboardStore.getCityData();
    let {walks, googleMapMarkers} = this.state;

    const locationLatLng = new google.maps.LatLng(latlng[0], latlng[1]);

    //TODO: Place configuration and constants in a single file

    const mapOptions = {
      center: locationLatLng,
      zoom: 12,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',
    };

    const googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

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

    this.setState({googleMap, googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks)});
  }

  render() {
    return (<div className="walkMap" style={{width: '100%', height: '600px'}}/>);
  }
}

WalksMap.PropTypes = {
  walks: React.PropTypes.array.isRequired,
};