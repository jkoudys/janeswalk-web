'use strict';

var Helper = require('../functions/helpers.jsx');
var WalkStopTable = require('./map/WalkStopTable.jsx');
var WalkInfoWindow = require('./map/WalkInfoWindow.jsx');
var InstagramConnect = require('./map/InstagramConnect.jsx');
var SoundCloudConnect = require('./map/SoundCloudConnect.jsx');
var TwitterConnect = require('./map/TwitterConnect.jsx');
var ConnectFilters = require('./map/ConnectFilters.jsx');

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
      // The 'mode' we're in: 'addPoint', 'addRoute'
      mode: {},
      map: null,
      markers: new google.maps.MVCArray,
      route: null,
      infowindow: new google.maps.InfoWindow,
      // The collection of search terms boxes
      filters: []
    };
  },

  componentDidMount: function() {
    var _this = this,
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
  
    // Map won't size properly on a hidden tab, so refresh on tab shown
    // FIXME: this $() selector is unbecoming of a React app
    $('a[href="#route"]').on('shown.bs.tab', function(e) {
      this.boundMapByWalk();
    }.bind(this));

    this.setState({map: map}, this.refreshGMap);
  },

  // Build a google map from our serialized map state
  refreshGMap: function() {
    var valueLink = this.props.valueLink;
    var _this = this;
    var markers = new google.maps.MVCArray;
    var route = null;
    if (this.state.route) {
      this.state.route.setMap(null);
    }
    this.state.markers.forEach(function(marker) {
      marker.setMap(null);
    });

    // Draw the route
    if (valueLink.value) {
      valueLink.value.markers.forEach(function(marker) {
        var latlng;
        // Set to the markers latlng if available, otherwise place at center
        if (marker.lat && marker.lng) {
          latlng = new google.maps.LatLng(marker.lat, marker.lng);
        } else {
          latlng = this.state.map.center;
        }

        markers.push(
          this.buildMarker({
            latlng: latlng,
            title: marker.title,
            description: marker.description,
            media: marker.media
          })
        );
      }.bind(this));

      route = this.buildRoute(valueLink.value.route);
    } else {
      route = this.buildRoute([]);
    }

    // Set marker/route adding
    google.maps.event.addListener(this.state.map, 'click', function(ev) {
      _this.state.infowindow.setMap(null);
      if (_this.state.mode.addRoute) {
        route.setPath(route.getPath().push(ev.latLng));
        _this.setState({route: route});
      }
    });

    this.setState({markers: markers, route: route});
  },

  // Make the map fit the markers in this walk
  boundMapByWalk: function() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    google.maps.event.trigger(this.state.map, 'resize');
    if (this.state.markers.getLength()) {
      for (var i = 0, len = this.state.markers.getLength(); i < len; i++) {
        bounds.extend(this.state.markers.getAt(i).getPosition());
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
  // @param google.maps.LatLng latlng The position to add
  // @param Object title {title, description}
  buildMarker: function(options) {
    options = options || {};
    var _this = this;
    var latlng = options.latlng;
    var title = options.title || '';
    var description = options.description || '';
    var media = options.media || null;
    var marker;
    var map = this.state.map;
    var gMarkerOptions = {
      animation: google.maps.Animation.DROP,
      draggable: true,
      style: 'stop',
      map: map,
      icon: this.stopMarker
    };

    // If we passed in a position
    if (latlng instanceof google.maps.LatLng) {
      gMarkerOptions.position = latlng;
    } else {
      gMarkerOptions.position = this.state.map.center;
    }

    // Set to an empty title/description object.
    // Google maps has a limited amount of marker data we 
    gMarkerOptions.title = JSON.stringify({
      title: title,
      description: description,
      media: media
    });

    marker = new google.maps.Marker(gMarkerOptions);
    
    google.maps.event.addListener(marker, 'click', function(ev) {
      _this.showInfoWindow(this)
    });

    google.maps.event.addListener(marker, 'drag', function(ev) {
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

    // Center the marker and display its info window
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
      editable: true,
      map: map
    });

    // Remove vertices when right-clicked
    google.maps.event.addListener(poly, 'rightclick', function(ev) {
      // Check if we clicked a vertex
      if (ev.vertex !== undefined) {
         poly.setPath(poly.getPath().removeAt(ev.vertex));
      }
    });

    // Hide the infowindow if we click outside it
    google.maps.event.addListener(poly, 'mousedown', function(ev) {
      this.state.infowindow.setMap(null);
    }.bind(this));

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
    markers.removeAt(markers.indexOf(marker));

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
      markers.insertAt(markers.getArray().indexOf(referenceMarker), marker);
    } else {
      markers.push(marker);
    }
    this.setState({markers: markers});
  },

  // Button Actions
  toggleAddPoint: function() {
    var markers = this.state.markers;
    var marker = this.buildMarker();
    markers.push(marker);
    this.setState({markers: markers, mode: {}}, function() {
      this.showInfoWindow(marker);
    }.bind(this)); 

    this.state.infowindow.setMap(null);
  },

  toggleAddRoute: function() {
    this.setState({
      mode: {
        addRoute: !this.state.mode.addRoute
      }
    });
    this.state.infowindow.setMap(null);
  },

  clearRoute: function() {
    this.state.infowindow.setMap(null);
    this.state.route.setPath([]);
    this.setState({mode: {}});
  },

  // Build a version of state appropriate for persistence
  getStateSimple: function() {
    var markers = this.state.markers.getArray().map(function(marker) {
      var titleObj = JSON.parse(marker.title);
      return {
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        title: titleObj.title,
        description: titleObj.description,
        media: titleObj.media,
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

  // Manage the filters for loading data from external APIs
  handleRemoveFilter: function(i) {
    var filters = this.state.filters.slice();
    filters.splice(i, 1);
    this.setState({filters: filters});
  },

  // Update the _text_ of a filter
  handleChangeFilter: function(i, val) {
    var filters = this.state.filters.slice();
    filters[i].value = val;
    this.setState({filters: filters});
  },

  // Push a new filter to our box, usually done by the buttons
  handleAddFilter: function(filter) {
    var filters = this.state.filters.slice();
    filters.push(filter);
    this.setState({filters: filters});
  },

  render: function() {
    var walkStops;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    // Standard properties the filter buttons need
    var filterProps = {
      valueLink: this.props.valueLink,
      refreshGMap: this.refreshGMap,
      boundMapByWalk: this.boundMapByWalk,
      addFilter: this.handleAddFilter,
      city: this.props.city
    };

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
            ref="addPoint"
            className={(this.state.mode.addPoint) ? 'active' : ''}
            onClick={this.toggleAddPoint}>
            <i className="fa fa-map-marker" />{ t('Add Stop') }
          </button>
          <button
            ref="addRoute"
            className={(this.state.mode.addRoute) ? 'active' : ''}
            onClick={this.toggleAddRoute}>
            <i className="fa fa-arrows" />{ t('Add Route') }
          </button>
          <button ref="clearroute" onClick={this.clearRoute}>
            <i className="fa fa-eraser" />{ t('Clear Route') }
          </button>
          <TwitterConnect {...filterProps} />
          <InstagramConnect {...filterProps} />
          <SoundCloudConnect {...filterProps} />
        </div>
        <ConnectFilters filters={this.state.filters} changeFilter={this.handleChangeFilter} remove={this.handleRemoveFilter} />
        <div className="map-notifications" />
        <div id="map-canvas" ref="gmap" />
        {walkStops}
        <hr />
      </div>
    );
  }
});        

module.exports = MapBuilder;
