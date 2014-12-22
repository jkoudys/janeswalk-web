'use strict';

var Helper = require('../functions/helpers.jsx');

var MapBuilder = React.createClass({
  getDefaultProps: function () {
    return {
      // Map config startup defaults
      initialZoom: 15,
    };
  },

  // State for this component should only track the map editor
  getInitialState: function() {
    return {
      // The 'mode' we're in: 'addpoint', 'addroute', or false
      editMode: false,
      map: null,
      markers: [],
      route: null,
      infowindow: new google.maps.InfoWindow
    };
  },

  componentDidMount: function() {
    var _this = this,
    valueLink = this.props.valueLink,
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
    markers = this.state.markers,
    route = this.state.route;

    this.setState({map: map}, function() {
      // Draw the route
      if (valueLink.value) {
        markers = valueLink.value.markers.map(function(marker) {
          return this.buildMarker(marker);
        }.bind(this));

        route = this.buildRoute(valueLink.value.route);
      }

      // Set marker/route adding
      google.maps.event.addListener(map, 'click', function(ev) {
        switch (_this.state.editMode) {
          case 'addpoint':
            var markers = _this.state.markers;
            var marker = _this.buildMarker(ev.latLng);
            markers.push(marker);
            _this.setState({markers: markers}, function() {
              _this.showInfoWindow(marker);
            }); 
          break;
        }
      });
      // Map won't size properly on a hidden tab, so refresh on tab shown
      // FIXME: this $() selector is unbecoming of a React app
      $('a[href="#route"]').on('shown.bs.tab', function(e) {
        this.boundMapByWalk();
      }.bind(this));

      this.setState({markers: markers, route: route});
    }.bind(this));
  },

  // Make the map fit the markers in this walk
  boundMapByWalk: function() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    google.maps.event.trigger(this.state.map, 'resize');
    if (this.state.markers.length) {
      for (var i = 0, len = this.state.markers.length; i < len; i++) {
        bounds.extend(this.state.markers[i].getPosition());
      }

      this.state.map.fitBounds(bounds);
    }
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
  buildMarker: function(markObj) {
    var marker;
    var _this = this;
    var position;
    var map = this.state.map;

    // See which type we passed in
    if (markObj instanceof google.maps.LatLng) {
      position = markObj;
    } else {
      position = new google.maps.LatLng(markObj.lat, markObj.lng);
    }
    marker = new google.maps.Marker({
      position: position,
      animation: google.maps.Animation.DROP,
      draggable: true,
      title: JSON.stringify({title: markObj.title, description: markObj.description}),
      style: 'stop',
      map: map,
      icon: this.stopMarker
    });
    
    google.maps.event.addListener(marker, 'click', function(ev) {
      _this.showInfoWindow(this)
    });

    return marker;
  },

  /**
   * Show the info box for editing this marker
   *
   * @param google.maps.Marker marker
   */
  showInfoWindow: function(marker) {
    var _this = this;
    var infoDOM = document.createElement('div');

    React.render(
      <WalkInfoWindow
        marker={marker}
        deleteMarker={this.deleteMarker.bind(this, marker)}
        refresh={this.setState.bind(this, {})}
      />,
      infoDOM
    );
    
    this.state.map.panTo(marker.getPosition());

    this.state.infowindow.setContent(infoDOM);

    this.state.infowindow.open(this.state.map, marker);

  },

  buildRoute: function(routeArray) {
    var map = this.state.map;

    var poly = new google.maps.Polyline({
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

    return poly;
  },

  /**
   * @param google.maps.Marker marker
   */
  deleteMarker: function(marker) {
    var markers = this.state.markers;

    // Clear marker from map
    marker.setMap(null);

    // Remove reference in state
    markers.splice(markers.indexOf(marker), 1);

    this.setState({markers: markers});
  },

  /**
   * Insert a marker before a reference marker. If no reference, insert at end.
   * @param google.maps.Marker marker 
   * @param google.maps.Marker referenceMarker
   */
  insertBefore: function(marker, referenceMarker) {
    var markers = this.state.markers;
    if (referenceMarker) {
      markers.splice(
        markers.indexOf(referenceMarker),
        0,
        markers.splice(markers.indexOf(marker))[0]
      );
    } else {
      markers.push(marker);
    }
    this.setState({markers: markers});
  },

  // Button Actions
  toggleAddPoint: function() {
    this.setState({editMode: 'addpoint'});
  },

  toggleAddRoute: function() {
    this.setState({editMode: 'addroute'});
  },

  clearRoute: function() {
    this.state.route.setPath([]);
    this.setState({editMode: false});
  },

  /*
    // If this marker isn't passed with a title, prompt for info
    if (!markObj.lat) {
      this.state.infowindow.open(this.state.map, marker);
    }

    this.setState({markers: this.state.markers.concat([marker])});
  },
  */

  // Build a version of state appropriate for persistence
  getStateSimple: function() {
    var markers = this.state.markers.map(function(marker) {
      var titleObj = JSON.parse(marker.title);
      return {
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        title: titleObj.title,
        description: titleObj.description,
        style: 'stop'
      };
    });
    var route = [];
    if (this.state.route) {
      route = this.state.route.getPath().getArray().map(function(point) {
        return {
          lat: point.lat(),
          lng: point.lng()
        };
      });
    }

    return {
      markers: markers,
      route: route
    };
  },

  render: function() {
    var walkStops;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    if (this.state.markers && this.state.markers.length) {
      // This 'key' is to force the component to not rebuild
      walkStops = [
        <h3 key={'stops'}>{t('Walk Stops')}</h3>,
        <WalkStopTable
          ref="walkStopTable"
          key={1}
          i18n={this.props.i18n}
          markers={this.state.markers}
          deleteMarker={this.deleteMarker}
          insertBefore={this.insertBefore}
          showInfoWindow={this.showInfoWindow}
        />
      ];
    }
    
    return (
      <div className="tab-pane" id="route">
        <div className="alert alert-error"><strong>Map buttons currently offline.</strong> Sorry for the inconvenience - the buttons to add to your map aren't working. Please check back tomorrow.</div>
        <div className="page-header" data-section="route">
          <h1>{ t('Share Your Route') }</h1>
        </div>
        <div className="alert alert-info">
          { t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') }
        </div>
        <div id="route-help-panel">
          <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#route-menu" href="#route-menu">
            <h2 className="lead">{ t('Need help building your route?') }</h2>
          </a>
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
                { t('If you want to delete your route to start over, click ') }
                <a href="" className="clear-route">{ t('Clear Route') }</a>.
                { t('Your Stops will not be deleted') }
              </p>
            </li>
          </ol>
        </div>
        <div id="map-control-bar">
          <button
            ref="addpoint"
            className={(this.state.editMode === 'addpoint') ? 'active' : ''}
            onClick={this.toggleAddPoint}>
            <i className="fa fa-map-marker" />{ t('Add Stop') }
          </button>
          <button
            ref="addroute"
            className={(this.state.editMode === 'addroute') ? 'active' : ''}
            onClick={this.toggleAddRoute}>
            <i className="fa fa-arrows" />{ t('Add Route') }
          </button>
          <button ref="clearroute" onClick={this.clearRoute}>
            <i className="fa fa-eraser" />{ t('Clear Route') }
          </button>
        </div>
        <div className="map-notifications" />
        <div id="map-canvas" ref="gmap" />
        {walkStops}
        <hr />
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
        this.props.insertBefore(
          this.state.markers[ui.item.data('position')],
          this.state.markers[ui.item.index()]
        );
      }.bind(this)
    });
  },
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      <table ref="routeStops" className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>{ t('Title') }</th>
            <th>{ t('Description') }</th>
            <th><i className="fa fa-trash-o" /></th>
          </tr>
        </thead>
        <tbody>
          {this.props.markers.map(function(marker, i) {
            var titleObj = JSON.parse(marker.title);
            var showInfoWindow = function() {
              this.props.showInfoWindow(marker);
            }.bind(this);
            var deleteMarker = function() {
              this.props.deleteMarker(marker);
            }.bind(this);
            return (
              <tr data-position={i} key={'marker' + i}>
                <td onClick={showInfoWindow}>{titleObj.title}</td>
                <td onClick={showInfoWindow}>{titleObj.description}</td>
                <td>
                  <a className="delete-stop" onClick={deleteMarker}>
                    <i className="fa fa-times-circle-o" />
                  </a>
                </td>
              </tr>
              );
          }.bind(this))}
        </tbody>
      </table>
    );
  }
});

var WalkInfoWindow = React.createClass({
  getInitialState: function() {
    return {
      marker: null
    };
  },
  componentWillMount: function() {
    this.setState({
      marker: this.props.marker
    });
  },
  setMarkerContent: function(ev) {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());
    if (ev.target.classList.contains('marker-title')) {
      markerContent.title = ev.target.value;
    } else if (ev.target.classList.contains('marker-description')) {
      markerContent.description = ev.target.value;
    }
    marker.setTitle(JSON.stringify(markerContent));
    this.setState({marker: marker});
    this.props.refresh();
  },
  render: function() {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());

    return (
      <div className='stop-form'>
        <input
          type='text'
          onChange={this.setMarkerContent}
          value={markerContent.title}
          placeholder='Title of this stop'
          className='marker-title'
        />
        <textarea
          className='marker-description box-sizing'
          onChange={this.setMarkerContent}
          placeholder='Description of this stop'
          value={markerContent.description}
        />
        <a onClick={this.props.deleteMarker}>
          <i className="fa fa-trash-o" />
        </a>
      </div>
    );
  }
});

module.exports = MapBuilder;
