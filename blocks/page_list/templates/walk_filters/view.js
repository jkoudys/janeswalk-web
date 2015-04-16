(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
'use strict';

var CityMap = require('./CityMap.jsx');
var WalkList = require('./WalkList.jsx');

document.addEventListener('DOMContentLoaded', function(){
  // Setup the walk list
  WalkList.addWalkListEvents();

  // Setup the walk map
  React.render(
    React.createElement(CityMap, {walks: JanesWalk.walks, city: JanesWalk.city}),
    document.getElementById('jw-map')
  );
});

},{"./CityMap.jsx":2,"./WalkList.jsx":3}],2:[function(require,module,exports){
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
              date = React.createElement("h6", null, React.createElement("i", {className: "fa fa-calendar"}), " ", dtfDate.format(startTime));
            } catch(e) {}

            // Setup infowindow
            React.render(
              React.createElement("span", null, 
                React.createElement("h4", {style: {marginBottom: '0.1em'}}, walk.title), 
                date, 
                React.createElement("h6", null, "Led by: ", leaders.join(', ')), 
                React.createElement("p", null, walk.shortDescription, " ", React.createElement("a", {href: walk.url}, "Read More"))
              ),
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
        React.createElement("div", {className: "cityMap", style: {width: '100%', height: '600px'}})
      );
    }
  }
});

module.exports = CityMap;

},{}],3:[function(require,module,exports){
/**
 * The list of walks to order
 */
'use strict';

function addWalkListEvents() {
  var walkList = document.querySelector('#jw-list .walklist');
  var sortOptions = walkList.querySelectorAll('thead th');
  var walkElements = walkList.querySelectorAll('tbody tr');
  for (var i = 0, len = sortOptions.length; i < len; i++) {
    sortOptions[i].index = i;
    sortOptions[i].walkElements = walkElements;

    sortOptions[i].onclick = function(ev) {
      var walkList = document.querySelector('#jw-list .walklist');
      var walkBody = walkList.querySelector('tbody');
      var walkElements = this.walkElements;
      var walks = [];
      if (this.classList.contains('sort')) {
        for (var currentWalks = walkBody.querySelectorAll('tr'), i = currentWalks.length - 1; i >= 0; i--) {
          walkBody.appendChild(currentWalks[i]);
        }
        this.classList.toggle('reverse');
      }
      else {
        for (var i = 0, len = walkElements.length; i < len; i++) {
          walks[i] = walkElements[i];
          walks[i].index = this.index;
        }

        walks.sort(function(a,b) {
          var aEl = (a.querySelectorAll('td')[a.index]);
          var bEl = (b.querySelectorAll('td')[b.index]);
          if (aEl.dataset.sort) {
            return parseInt(aEl.dataset.sort) - parseInt(bEl.dataset.sort);
          } else {
            return aEl.textContent.localeCompare(bEl.textContent);
          }
        });
        for (var i = 0, len = walks.length; i < len; i++) {
          walkBody.appendChild(walks[i]);
        }

        // Clear the sort arrows, set to the new one
        for (var i = 0, len = sortOptions.length; i < len; i++) {
          sortOptions[i].classList.remove('sort', 'reverse');
        }
        this.classList.add('sort');
      }
    }
  }

  // Sort by the first column, by default
  sortOptions[0].dispatchEvent(new MouseEvent('click'));
}

module.exports = {addWalkListEvents: addWalkListEvents};


},{}]},{},[1]);
