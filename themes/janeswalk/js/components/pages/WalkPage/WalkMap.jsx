import React from 'react';
import ReactDOM from 'react-dom';

//TODO: WalkMap.jsx already exists, review and re-use

const InfoWindow = ({title, description}) => (
  <span>
    <h4>{title}</h4>
    <p>{description}</p>
  </span>
);

export default class WalkMap extends React.Component {
  constructor(props,...args) {
    super(props,...args);
    this.state = {googleMap: null};
  }

  componentDidMount() {

    //TODO: Create a <GoogleMap/> component to generalize use of google maps
    const {map} = this.props;
    const locationLatLng = new google.maps.LatLng(map.markers[0].lat,map.markers[0].lng);
    const infoWindow = new google.maps.InfoWindow({maxWidth: 300});
    const _infoNode = document.createElement('div');

    const mapOptions = {
      center: locationLatLng,
      zoom: 13,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',

    };

    const googleMap = new google.maps.Map(ReactDOM.findDOMNode(this),mapOptions);

    let routeCoordinates = [];

    map.markers.forEach((m,i) => {
      routeCoordinates.push({lat:m.lat,lng:m.lng});
      let locationLatLng = new google.maps.LatLng(m.lat,m.lng);
      let marker = new google.maps.Marker({
       position: locationLatLng,
       map: googleMap,
       label: (i+1).toString(),
      });

      google.maps.event.addListener(marker, 'click', ()=>{
        ReactDOM.render(<InfoWindow {...m}/>, _infoNode);

        infoWindow.setMap(googleMap);
        googleMap.panTo(marker.getPosition());
        infoWindow.setContent(_infoNode);
        infoWindow.open(googleMap, marker);
      })
    });

    const routePath = new google.maps.Polyline({
      path: routeCoordinates,
      strokeColor: '#000000',
      geodesic: true,
      strokeOpacity: 0.7,
      strokeWeight: 2
    });

    routePath.setMap(googleMap);

    this.setState({googleMap});
  }

  render() {
   return (<div className="walkMap" style={{width: '60%', height: '350px'}}/>)
  }
}

WalkMap.PropTypes = {
 map: React.PropTypes.object.isRequired,
};