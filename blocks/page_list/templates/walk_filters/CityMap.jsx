/**
 * The map of upcoming walks for a whole city
 */

// Helper to see if a member is a walk leader
function isWalkLeader(member) {
  // Check if their role contains leader, or their type does
  return (member.role && member.role.indexOf('leader') > -1) ||
    (member.type && member.type.indexOf('leader') > -1);
}

// Date formatter
const dtfDate = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});
const _infoNode = document.createElement('div');

export default class CityMap extends React.Component {
  constructor() {
    super();

    this.state = {map: null, markers: {}};
  }

  componentDidMount() {
    const cityLatLng = new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]);

    // Setup map
    const map = new google.maps.Map(React.findDOMNode(this), {
      center: cityLatLng,
      zoom: 8,
      backgroundColor: '#d7f0fa'
    });

    // Play nice with bootstrap tabs
    $('a[href="#jw-map"]').on('shown.bs.tab', function(e) {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(cityLatLng);
    });

    this.setState({map: map});
  }

  componentWillReceiveProps(props) {
    const icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      strokeWeight: 1,
      strokeColor: '#f16725',
      fillOpacity: 0.7,
      fillColor: '#f16725'
    };
    const infoWindow = new google.maps.InfoWindow({maxWidth: 300});

    // Clean out the markers before we put them back in
    for (let k in this.state.markers) {
      this.state.markers[k].setMap(null);
    }

    // Grab starting point of each walk
    props.walks.forEach(walk => {
      let latlng;
      let marker;
      const map = this.state.map;

      if (this.state.markers[walk.id]) {
        // We already have this marker built, so simply add it to the map
        this.state.markers[walk.id].setMap(map);
      } else {
        // We must build a marker
        // Walk location is meeting place coords
        if (Array.isArray(walk.map.markers) && walk.map.markers.length > 0) {
          latlng = new google.maps.LatLng(walk.map.markers[0].lat, walk.map.markers[0].lng);
        } else if (Array.isArray(walk.map.route) && walk.map.route.length > 0) {
          latlng = new google.maps.LatLng(walk.map.route[0].lat, walk.map.route[0].lng);
        }

        // Add the marker
        marker = new google.maps.Marker({
          position: latlng,
          title: walk.title,
          icon: icon,
          map: map
        });

        this.state.markers[walk.id] = marker;


        google.maps.event.addListener(marker, 'click', function() {
          let leaders;
          let date;

          // Build the team list of walk leaders
          if (Array.isArray(walk.team)) {
            leaders = walk.team.filter(function(member) {
              return isWalkLeader(member);
            }).map(function(member) {
              return member['name-first'] + ' ' + member['name-last'];
            });
          }

          // Best-effort grab of the time
          try {
            // Show all dates joined together
            var upcoming = walk.time.slots.filter(function(slot) {
              // Get all the future walks
              return (slot[0] * 1000) > twoDaysAgo;
            });
            date = <h6><i className="fa fa-calendar" /> {upcoming.map(slot => dtfDate.format(slot[0] * 1000)).join(', ')}</h6>;
          } catch(e) {
            // Just log this, but don't die
            console.error('Failed to parse walk time.');
          }

          // Setup infowindow
          React.render(
            <InfoWindow
              key={walk.id}
              {...Object.assign({}, walk, {date: date, leaders: leaders})}
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
    });

    this.setState({markers: this.state.markers});
  }

  render() {
    return (
      <div className="cityMap" style={{width: '100%', height: '600px'}} />
    );
  }
}

const InfoWindow = props => (
  <span>
    <h4 style={{marginBottom: '0.1em'}}>{props.title}</h4>
    {props.date}
    <h6>Led by: {this.props.leaders.join(', ')}</h6>
    <p>{props.shortDescription} <a href={props.url} target="_blank">Read More</a></p>
  </span>
);
