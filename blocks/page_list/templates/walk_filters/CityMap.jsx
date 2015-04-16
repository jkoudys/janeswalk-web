/**
 * The map of upcoming walks for a whole city
 */
'use strict';

// Helper to see if a member is a walk leader
function isWalkLeader(member) {
  // Check if their role contains leader, or their type does
  return (member.role && member.role.indexOf('leader') > -1) ||
    (member.type && member.type.indexOf('leader') > -1);
}

function CityMap() {
  this.state = {map: null};
}

CityMap.prototype = Object.create(React.Component.prototype, {
  constructor: {value: CityMap},

  componentDidMount: {
    value: function() {
      var walks = this.props.walks;
      var infoNode = document.createElement('div');
      var cityLatLng = new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]);

      // Setup map
      var map = new google.maps.Map(React.findDOMNode(this), {
        center: cityLatLng,
        zoom: 8,
        backgroundColor: '#d7f0fa'
      });
 
      var infoWindow = new google.maps.InfoWindow({maxWidth: 300});

      // Grab starting point of each walk
      walks.forEach(function(walk) {
        var latlng;
        var marker;
        var startTime = (walk.time.slots.length > 0) && walk.time.slots[0][0] * 1000;
        var leaders;
        var icon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeWeight: 1,
          strokeColor: '#f16725',
          fillOpacity: 0.7,
          fillColor: '#f16725'
        };

        // Check that it starts at latest 2 days ago
        if (walk.time.slots.length > 0 &&
            startTime > (Date.now() - 2 * 24 * 60 * 60 * 1000)) {
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

          google.maps.event.addListener(marker, 'click', function() {
            var date = new Date(startTime);
            var date;
            var leaders = [];

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
              var dtfDate = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});
              date = <h6><i className="fa fa-calendar" /> {dtfDate.format(startTime)}</h6>;
            } catch(e) {}

            // Setup infowindow
            React.render(
              <span>
                <h4 style={{marginBottom: '0.1em'}}>{walk.title}</h4>
                {date}
                <h6>Led by: {leaders.join(', ')}</h6>
                <p>{walk.shortDescription} <a href={walk.url}>Read More</a></p>
              </span>,
              infoNode
            );

            // Center the marker and display its info window
            infoWindow.setMap(map);
            map.panTo(marker.getPosition());
            infoWindow.setContent(infoNode);
            infoWindow.open(map, marker);
          });
        }
      });

      // Play nice with bootstrap tabs
      $('a[href="#jw-map"]').on('shown.bs.tab', function(e) {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(cityLatLng);
      });
    }
  },

  render: {
    value: function() {
      return (
        <div className="cityMap" style={{width: '100%', height: '600px'}} />
      );
    }
  }
});

module.exports = CityMap;
