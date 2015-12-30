
//TODO: WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined (Post-PR)

const InfoWindow = ({title, shortDescription}) => (
  <span>
    <h4>{title}</h4>
    <p>{shortDescription}</p>
  </span>
);

const manageMarkers = (map, markers, activeWalks) => {

  const infoWindow = new google.maps.InfoWindow({maxWidth: 600});
  const _infoNode = document.createElement('div');

  //remove any markers that are not part of active walks
  markers = markers.filter(m => {
    const walkFound = activeWalks.find(w => (w.id === m.walkId));

    if (walkFound) {
      return walkFound;
    }
    else {
      m.setMap(null);
      return false;
    }
  });

  //add additional markers
  activeWalks.forEach(walk => {
    if (walk.map && walk.map.markers) {

      let m = walk.map.markers[0];

      let locationLatLng = new google.maps.LatLng(m.lat,m.lng);

      const walkFound = markers.find(m => (m.walkId === walk.id));

      if (!walkFound) {
        let marker = new google.maps.Marker({
          position: locationLatLng,
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
  constructor(props,...args) {
    super(props,...args);
    this.state = {
      googleMap: null,
      activeWalks: props.activeWalks,
      googleMapMarkers:[],
    };
  }

  componentWillReceiveProps(updatedProps) {
    debugger;

    const {googleMap, googleMapMarkers} = this.state;
    const {activeWalks} = updatedProps;

    //googleMapMarkers = manageMarkers(googleMap, googleMapMarkers, activeWalks);

    debugger;
    this.setState({googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, activeWalks), activeWalks});
  }

  componentDidMount() {

    debugger;

    //TODO: Create a <GoogleMap/> component to generalize use of google maps (Post-PR)
    const {latlng} = this.props;
    let {activeWalks, googleMapMarkers} = this.state;

    debugger;

    const locationLatLng = new google.maps.LatLng(latlng[0],latlng[1]);

    const mapOptions = {
      center: locationLatLng,
      zoom: 11,
      backgroundColor: '#d7f0fa',
    };

    const googleMap = new google.maps.Map(React.findDOMNode(this), mapOptions);

    //googleMapMarkers = manageMarkers(googleMap, googleMapMarkers, activeWalks);

    this.setState({googleMap, googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, activeWalks)});
  }

  render() {
    return (<div className="walkMap" style={{width: '60%', height: '600px'}}/>);
  }
}

WalksMap.PropTypes = {
  //TODO: (PR)
};