exports.CAWMapBuilder = React.createClass({
  getDefaultProps: function () {
    return {
      // Map config startup defaults
      initialZoom: 15,
      mapCenterLat: 43.663161,
      mapCenterLng: -79.410828,
    };
  },

  // State for this component should only track the map editor, since we
  // won't be persisting that. The map's
  getInitialState: function() {
    var valueLink = this.props.valueLink;
     
    return {
      // The 'mode' we're in: adding markers, route, etc
      editMode: false,
      map: null,
      markers: [],
      poly: [],
      point: [],
      infowindow: new google.maps.InfoWindow()
    };
  },

  componentDidMount: function () {
    var valueLink = this.props.valueLink,
        mapNode = this.refs.gmap.getDOMNode(),
        mapOptions = {
          // TODO: find if gmaps will geocode and init map at your location by default
          // center: this.mapCenterLatLng(),
          zoom: this.props.initialZoom,
          scrollwheel: false,
          rotateControl: true,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
          }
        },
        map = new google.maps.Map(mapNode, mapOptions),
        markers = valueLink.value.markers.map(function(marker) {
          return this.buildMarker(marker);
        }.bind(this)),
        poly = new google.maps.Polyline({
          strokeColor: '#F16725',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          editable: false,
          map: map
        });

    // The map won't size properly if it starts on a hidden tab, so refresh on tab shown
    // FIXME: this $() selector is unbecoming of a React app
    $('a[href="#route"]').on('shown.bs.tab', function(e) {
      var map = this.state.map;
      var x = map.getZoom(),
      c = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setZoom(x);
      map.setCenter(c);
    }.bind(this));

    this.setState({map: map});
  },

  mapCenterLatLng: function() {
    var props = this.props;

    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },

  componentDidUpdate: function() {
    var map = this.state.map;

    map.panTo(this.mapCenterLatLng());
  },

  // Map parameters
  stopMarker: {
    url: CCM_BASE_URL + 'marker.png',
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
  buildMarker: function(markObj) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(markObj.lat, markObj.lng),
      animation: google.maps.Animation.DROP,
      draggable: true,
      title: markObj.title,
      style: 'stop',
      map: this.state.map,
      icon: this.stopMarker
    });
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
    return (
      <div className="tab-pane" id="route">
        <div className="page-header" data-section="route">
          <h1>{ t('Share Your Route') }</h1>
        </div>
        <div className="alert alert-info">{ t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') }</div>
        <div id="route-help-panel">
          <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#route-menu" href="#route-menu"><h2 className="lead">{ t('Need help building your route?') }</h2></a>
          <div id="route-menu" className="collapse" style={{height: 0}}>
            <div className="col-md4">
              <h4>1. { t('Set a Meeting Place') }</h4>
              <ol>
                <li>{ t('Click "Meeting Place" to add a pinpoint on the map') }</li>
                <li>{ t('Click and drag it into position') }</li>
                <li>{ t('Fill out the form fields and press Save Meeting Place') }</li>
              </ol>
            </div>
            <div className="col-md-4">
              <h4>2. { t('Add Stops') }</h4>
              <ol>
                <li>{ t('Click "Add Stop" to add a stop on the map') }</li>
                <li>{ t('Click and drag it into position') }</li>
                <li>{ t('Fill out the form fields and press Save Stop') }</li>
                <li>{ t('Repeat to add more stops') }</li>
              </ol>
            </div>
            <div className="col-md-4">
              <h4>3. { t('Add Route') }</h4>
              <ol>
                <li>{ t('Click Add Route') }</li>
                <li>{ t('A point will appear on your meeting place, now click on each of the stops that flow to connect them.') }</li>
                <li>{ t('Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.') }</li>
                <li>{ t('Click Save Route') }</li></ol>
              <ul>
                <li>{ t('If you want to delete your route to start over, click ') }<a href="" className="clear-route">{ t('Clear Route') }</a>. { t('Your Stops will not be deleted') }</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="map-control-bar">
          <button ref="addmeetingplace"><i className="fa fa-flag" />{ t('Set a Meeting Place') }</button>
          <button ref="addpoint"><i className="fa fa-map-marker" />{ t('Add Stop') }</button>
          <button red="addroute"><i className="fa fa-arrows" />{ t('Add Route') }</button>
          <button ref="clearroute"><i className="fa fa-eraser" />{ t('Clear Route') }</button>
        </div>
        <div className="map-notifications" />
        <div id="map-canvas" ref="gmap" />

        <h3>{ t('Walk Stops') }</h3>

        <table id="route-stops" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>{ t('Title') }</th>
              <th>{ t('Description') }</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.markers.map(function(marker, i) {
              return (
                <tr>
                  <td>{marker.title}</td>
                  <td>{marker.description}</td>
                  <td><a class="delete-stop" onClick={this.editMarker.bind(this, i)}>Edit</a></td>
                </tr>
                );
            })}
            <tr>
              <td colSpan="3"><p>{ t('You haven\'t set any stops yet.') }</p></td>
            </tr>
          </tbody>
        </table>

        <hr />
        <a href="#time-and-date" className="btn btn-primary btn-large section-save" data-toggle="tab">{ t('Next') }</a>
        <br />
        <br />
      </div>
    );
  }
});
