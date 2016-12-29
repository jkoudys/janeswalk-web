/* global google */
import { render } from 'react-dom';
import { createElement as ce, Component } from 'react';

// TODO: (Post-PR) WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined
const dashMapStyle = require('../../../json/dashMapStyle.json');

const InfoWindow = ({ url, title, shortDescription }) => (
  ce('span', {},
    ce('h4', {},
      ce('a', { href: url }, title)
    ),
    ce('p', {}, shortDescription)
  )
);

const manageMarkers = (map, markers, walks) => {
  const infoWindow = new google.maps.InfoWindow({ maxWidth: 600 });
  const _infoNode = document.createElement('div');

  // Remove any markers that are not part of active walks
  markers = markers.filter(m => {
    if (walks.find(w => (w.id === m.walkId))) return true;
    m.setMap(null);
    return false;
  });

  // Add additional markers
  walks.forEach(({
    id,
    title,
    shortDescription,
    url,
    features: [{ geometry: [lng, lat] } = {}] = [],
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
          render(ce(InfoWindow, { title, shortDescription, url }), _infoNode);

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

export default class WalksMap extends Component {
  state = {
    googleMap: null,
    googleMapMarkers: [],
  };

  setMapRef = (ref) => { this.mapDiv = ref; };

  componentDidMount() {
    const { city, walks } = this.props;
    const { googleMapMarkers } = this.state;
    const [lat, lng] = city.latlng;

    const googleMap = new google.maps.Map(this.mapDiv, {
      center: new google.maps.LatLng(lat, lng),
      zoom: 12,
      scrollwheel: false,
      backgroundColor: '#d7f0fa',
    });

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
    return ce('div', { ref: this.setMapRef, className: 'walkMap', style: { width: '100%', height: '600px' } });
  }
}
