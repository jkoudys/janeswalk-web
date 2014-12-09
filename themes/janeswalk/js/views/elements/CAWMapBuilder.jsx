var t = require('../functions/translate.jsx');
var Helper = require('../functions/helpers.jsx');

var MapBuilder = React.createClass({
  getDefaultProps: function () {
    return {
      // Map config startup defaults
      initialZoom: 15,
      city: {lat: 43.663161, lng: -79.410828}
    };
  },

  // State for this component should only track the map editor, since we
  // won't be persisting that. The map's
  getInitialState: function() {
    return {
      // The 'mode' we're in: 'addmeetingplace', 'addstop', 'addroute', or false
      editMode: false,
      map: null,
      markers: [],
      poly: [],
      point: [],
      infowindow: new google.maps.InfoWindow()
    };
  },

  componentDidMount: function() {
    var valueLink = this.props.valueLink,
      mapNode = this.refs.gmap.getDOMNode(),
      mapOptions = {
        center: new google.maps.LatLng(this.props.city.lat, this.props.city.lng),
        zoom: this.props.initialZoom,
        scrollwheel: false,
        rotateControl: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
        }
      },
      map = new google.maps.Map(mapNode, mapOptions),
      markers;
    
    // Draw the route
    if (valueLink.value) {
      markers = valueLink.value.markers.map(function(marker) {
        return this.buildMarker(marker, map);
      }.bind(this));

      this.buildRoute(valueLink.value.route, map);
      this.setState({markers: markers});
    }

    // The map won't size properly if it starts on a hidden tab, so refresh on tab shown
    // FIXME: this $() selector is unbecoming of a React app
    $('a[href="#route"]').on('shown.bs.tab', function(e) {
      this.boundMapByWalk();
    }.bind(this));

    this.setState({map: map});
  },

  // Make the map fit the markers in this walk
  boundMapByWalk: function() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    for (var i = 0, len = this.state.markers.length; i < len; i++) {
      bounds.extend(this.state.markers[i].getPosition());
    }

    google.maps.event.trigger(this.state.map, 'resize');
    this.state.map.fitBounds(bounds);
  },

  // Map parameters
  stopMarker: {
    url: CCM_THEME_PATH + '/images/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  },
  
  // Map related functions
  // Build gmaps Marker object from base data
  // Object marker {"title":"Ben Nobleman Parkette","description":"The huge picnic table in the middle of the park.","style":"meeting","lat":43.6983887613,"lng":-79.4351971008}
  buildMarker: function(markObj, map) {
    map = map || this.state.map;
    return new google.maps.Marker({
      position: new google.maps.LatLng(markObj.lat, markObj.lng),
      animation: google.maps.Animation.DROP,
      draggable: true,
      title: markObj.title,
      style: 'stop',
      map: map,
      icon: this.stopMarker
    });
  },

  buildRoute: function(routeArray, map) {
    poly = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: false,
      map: map
    });

    if (routeArray.length > 0) {
      poly.setPath(routeArray.map(function(point) {
        return new google.maps.LatLng(point.lat, point.lng);
      }));
    }
  },

  editMarker: function(i) {
    // TODO: edit the marker
  },

  changeMarkerOrder: function(from, to) {
    var valueLink = this.props.valueLink,
        map = valueLink.value,
        markers = map.markers.slice();
    markers.splice(to, 0, markers.splice(from, 1)[0]);
    map.markers = markers;
    valueLink.requestChange(map);
  },

  // Button Actions
  toggleAddMeetingPlace: function() {
    this.setState({editMode: 'addmeetingplace'});
  },
  toggleAddPoint: function() {
    this.setState({editMode: 'addpoint'});
  },
  toggleAddRoute: function() {
    this.setState({editMode: 'addroute'});
  },
  clearRoute: function() {
    this.setState({poly: [], editMode: false});
  },

  /*
    // If this marker isn't passed with a title, prompt for info
    if (!markObj.lat) {
      this.state.infowindow = new google.maps.InfoWindow({
        content: (
          <div class='stop-form'>
            <input type='text' value={marker.title} placeholder='Title of this stop' class='marker-title' />
            <br />
            <textarea class='marker-description box-sizing' placeholder='Description of this stop'>{marker.description}</textarea>
            <br />
            <button class='btn btn-primary' id='save-marker'>Save Stop</button>
            <button class='btn' id='delete-marker'>Delete</button>
          </div>
        )
      });
      this.state.infowindow.open(this.state.map, marker);
    }

    this.setState({markers: this.state.markers.concat([marker])});
  },
  */
  render: function() {
    var walkStops;
    if (this.state.markers.length) {
      // This 'key' is to force the component to not rebuild
      walkStops = [
        <h3 key={0}>{t('Walk Stops')}</h3>,
        <WalkStopTable key={1} markers={this.state.markers} editMarker={this.editMarker} changeMarkerOrder={this.changeMarkerOrder} />
      ];
    }
    
    return (
      <div className="tab-pane" id="route">
        <div className="alert alert-error"><strong>Map buttons currently offline.</strong> Sorry for the inconvenience - the buttons to add to your map aren't working. Please check back tomorrow.</div>
        <div className="page-header" data-section="route">
          <h1>{ t('Share Your Route') }</h1>
        </div>
        <div className="alert alert-info">{ t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') }</div>
        <div id="route-help-panel">
          <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#route-menu" href="#route-menu"><h2 className="lead">{ t('Need help building your route?') }</h2></a>
          <ol id="route-menu" className="collapse" style={{height: 0}}>
            <li>
              <h4>{ t('Set a Meeting Place') }</h4>
              <ol>
                <li>{ t('Click "Meeting Place" to add a pinpoint on the map') }</li>
                <li>{ t('Click and drag it into position') }</li>
                <li>{ t('Fill out the form fields and press Save Meeting Place') }</li>
              </ol>
            </li>
            <li>
              <h4>{ t('Add Stops') }</h4>
              <ol>
                <li>{ t('Click "Add Stop" to add a stop on the map') }</li>
                <li>{ t('Click and drag it into position') }</li>
                <li>{ t('Fill out the form fields and press Save Stop') }</li>
                <li>{ t('Repeat to add more stops') }</li>
              </ol>
            </li>
            <li>
              <h4>{ t('Add Route') }</h4>
              <ol>
                <li>{ t('Click Add Route') }</li>
                <li>{ t('A point will appear on your meeting place, now click on each of the stops that flow to connect them.') }</li>
                <li>{ t('Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.') }</li>
                <li>{ t('Click Save Route') }</li>
              </ol>
              <p>
                { t('If you want to delete your route to start over, click ') }<a href="" className="clear-route">{ t('Clear Route') }</a>. { t('Your Stops will not be deleted') }
              </p>
            </li>
          </ol>
        </div>
        <div id="map-control-bar">
          <button className={(this.state.editMode === 'addmeetingplace') ? 'active' : ''} ref="addmeetingplace" onClick={this.toggleAddMeetingPlace}><i className="fa fa-flag" />{ t('Set a Meeting Place') }</button>
          <button className={(this.state.editMode === 'addpoint') ? 'active' : ''} ref="addpoint" onClick={this.toggleAddPoint}><i className="fa fa-map-marker" />{ t('Add Stop') }</button>
          <button className={(this.state.editMode === 'addroute') ? 'active' : ''} ref="addroute" onClick={this.toggleAddRoute}><i className="fa fa-arrows" />{ t('Add Route') }</button>
          <button ref="clearroute" onClick={this.clearRoute}><i className="fa fa-eraser" />{ t('Clear Route') }</button>
        </div>
        <div className="map-notifications" />
        <div id="map-canvas" ref="gmap" />
        {walkStops}
        <hr />
        <br />
        <br />
      </div>
    );
  }
});

var WalkStopTable = React.createClass({
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).sortable({
      items: 'tbody tr',
      update: function(event, ui) {
        this.props.changeMarkerOrder(ui.item.data('position'), ui.item.index());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <table ref="routeStops" className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>{ t('Title') }</th>
            <th>{ t('Description') }</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.markers.map(function(marker, i) {
            return (
              <tr data-position={i} key={i}>
                <td>{marker.title}</td>
                <td>{marker.description}</td>
                <td><a className="delete-stop" onClick={this.props.editMarker.bind(this, i)}>Edit</a></td>
              </tr>
              );
          }.bind(this))}
        </tbody>
      </table>
    );
  }
});

module.exports = MapBuilder;
