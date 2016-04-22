/* global React ReactDOM google */
// TODO: (Post-PR) WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined
const dashMapStyle = require('../../../json/dashMapStyle.json');

const InfoWindow = ({ url, title, shortDescription }) => (
  <span>
    <h4>
      <a href={url}>{title}</a>
    </h4>
    <p>{shortDescription}</p>
  </span>
);

const manageMarkers = (map, markers, walks) => {
  const infoWindow = new google.maps.InfoWindow({ maxWidth: 600 });
  const _infoNode = document.createElement('div');

  // Remove any markers that are not part of active walks
  markers = markers.filter(m => {
    const walkFound = walks.find(w => (w.id === m.walkId));
    if (walkFound) return walkFound;

    m.setMap(null);
    return false;
  });

  // Add additional markers
  walks.forEach(({
    id,
    title,
    shortDescription,
    url,
    map: {
      markers: [
        { lat, lng },
      ] = [],
    } = {},
  }) => {
    if (lat && lng) {
      const walkFound = markers.find(({ walkId }) => (walkId === id));

      if (!walkFound) {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          style: 'stop',
          map,
          walkId: id,
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', () => {
          ReactDOM.render(<InfoWindow {...{ title, shortDescription, url }} />, _infoNode);

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
      googleMapMarkers: [],
    };
  }

  componentDidMount() {
    const { city, walks } = this.props;
    const { googleMapMarkers } = this.state;
    const [lat, lng] = city.latlng;

    const mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 12,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',
    };

    const googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

    googleMap.mapTypes.set('map_style', new google.maps.StyledMapType(dashMapStyle));
    googleMap.setMapTypeId('map_style');

    this.setState({
      googleMap,
      googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks),
    });
  }

  // You cannot use this.setState() in componentWillUpdate
  componentWillReceiveProps(updatedProps) {
    const { googleMap, googleMapMarkers } = this.state;
    const { walks } = updatedProps;

    this.setState({ googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks), walks });
  }

  render() {
    return <div className="walkMap" style={{ width: '100%', height: '600px' }} />;
  }
}

WalksMap.PropTypes = {
  walks: React.PropTypes.array.isRequired,
};
