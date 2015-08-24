import Helper from '../../helpers/helpers.jsx';
import WalkStopTable from './map/WalkStopTable.jsx';
import WalkInfoWindow from './map/WalkInfoWindow.jsx';
import InstagramConnect from './map/InstagramConnect.jsx';
import SoundCloudConnect from './map/SoundCloudConnect.jsx';
import TwitterConnect from './map/TwitterConnect.jsx';
import ConnectFilters from './map/ConnectFilters.jsx';

// Flux
import I18nStore from '../../stores/I18nStore.js';
const t = I18nStore.getTranslate();

// Map parameters
const _stopMarker = {
  url: CCM_THEME_PATH + '/images/marker.png',
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44)
};

// Constructor
class MapBuilder extends React.Component {
  constructor() {
    super();
    // State for this component should only track the map editor
    this.state = {
      // The 'mode' we're in: 'addPoint', 'addRoute'
      mode: {},
      map: null,
      markers: new google.maps.MVCArray,
      route: null,
      infowindow: new google.maps.InfoWindow,
      // The collection of search terms boxes
      filters: []
    };
  }

  componentDidMount() {
    var _this = this,
    mapNode = this.refs.gmap.getDOMNode(),
    mapOptions = {
      center: new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]),
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
      _this.boundMapByWalk();
    });

    this.setState({map: map}, this.refreshGMap);
  }

  // Build a google map from our serialized map state
  refreshGMap() {
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

        markers.push(this.buildMarker({
          latlng: latlng,
          title: marker.title,
          description: marker.description,
          media: marker.media
        }));
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
  }

  // Make the map fit the markers in this walk
  boundMapByWalk() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    google.maps.event.trigger(this.state.map, 'resize');
    if (this.state.markers.getLength()) {
      for (var i = 0, len = this.state.markers.getLength(); i < len; i++) {
        bounds.extend(this.state.markers.getAt(i).getPosition());
      }

      this.state.map.fitBounds(bounds);
    }
  }

  // Map related functions
  // Build gmaps Marker object from base data
  // @param google.maps.LatLng latlng The position to add
  // @param Object title {title, description}
  buildMarker(options) {
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
      icon: _stopMarker
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
  }

  /**
   * Show the info box for editing this marker
   *
   * @param google.maps.Marker marker
   */
  showInfoWindow(marker) {
    var _this = this;
    var infoDOM = document.createElement('div');

    React.render(
      <WalkInfoWindow
        marker={marker}
        deleteMarker={this.deleteMarker.bind(this, marker)}
        refresh={this.syncState.bind(this)}
      />,
      infoDOM
    );

    // Center the marker and display its info window
    this.state.map.panTo(marker.getPosition());
    this.state.infowindow.setContent(infoDOM);
    this.state.infowindow.open(this.state.map, marker);
  }

  buildRoute(routeArray) {
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
  }

  /**
   * @param google.maps.Marker marker
   */
  deleteMarker(marker) {
    var markers = this.state.markers;

    // Clear marker from map
    marker.setMap(null);

    // Remove reference in state
    markers.removeAt(markers.indexOf(marker));

    this.setState({markers: markers});
  }

  /**
   * Reorder the marker at index to a new position, pushing up those after
   * @param int from
   * @param int to
   */
  moveBefore(from, to) {
    var markers = this.state.markers;
    var fMarker = markers.getAt(from);
    markers.removeAt(from);
    markers.insertAt(to, fMarker);

    this.setState({markers: markers}, this.syncState);
  }

  // Button Actions
  toggleAddPoint() {
    var markers = this.state.markers;
    var marker = this.buildMarker();
    markers.push(marker);
    this.setState({markers: markers, mode: {}}, function() {
      this.syncState();
      this.showInfoWindow(marker);
    }.bind(this)); 

    this.state.infowindow.setMap(null);
  }

  toggleAddRoute() {
    this.setState({
      mode: {
        addRoute: !this.state.mode.addRoute
      }
    });
    this.state.infowindow.setMap(null);
  }

  clearRoute() {
    this.state.infowindow.setMap(null);
    this.state.route.setPath([]);
    this.setState({mode: {}});
  }

  // Build a version of state appropriate for persistence
  getStateSimple() {
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
  }

  // Sync what's on the gmap to what's stored in our state
  syncState() {
    this.props.valueLink.requestChange(this.getStateSimple());
  }

  // Manage the filters for loading data from external APIs
  handleRemoveFilter(i) {
    var filters = this.state.filters.slice();
    filters.splice(i, 1);
    this.setState({filters: filters});
  }

  // Update the _text_ of a filter
  handleChangeFilter(i, val) {
    var filters = this.state.filters.slice();
    filters[i].value = val;
    this.setState({filters: filters});
  }

  // Push a new filter to our box, usually done by the buttons
  handleAddFilter(filter) {
    var filters = this.state.filters.slice();
    filters.push(filter);
    this.setState({filters: filters});
  }

  render() {
    var walkStops;

    // Standard properties the filter buttons need
    var filterProps = {
      valueLink: this.props.valueLink,
      refreshGMap: this.refreshGMap.bind(this),
      boundMapByWalk: this.boundMapByWalk.bind(this),
      addFilter: this.handleAddFilter.bind(this),
      city: this.props.city
    };

    if (this.state.markers && this.state.markers.length) {
      // This 'key' is to force the component to not rebuild
      walkStops = [
        <h3 key={'stops'}>{t('Walk Stops')}</h3>,
        <WalkStopTable
          ref="walkStopTable"
          key={1}
          markers={this.state.markers}
          deleteMarker={this.deleteMarker.bind(this)}
          moveBefore={this.moveBefore.bind(this)}
          showInfoWindow={this.showInfoWindow.bind(this)}
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
        <div id="map-control-bar">
          <button
            ref="addPoint"
            className={(this.state.mode.addPoint) ? 'active' : ''}
            onClick={this.toggleAddPoint.bind(this)}>
            <i className="fa fa-map-marker" />{ t('Add Stop') }
          </button>
          <button
            ref="addRoute"
            className={(this.state.mode.addRoute) ? 'active' : ''}
            onClick={this.toggleAddRoute.bind(this)}>
            <i className="fa fa-arrows" />{ t('Add Route') }
          </button>
          <button ref="clearroute" onClick={this.clearRoute.bind(this)}>
            <i className="fa fa-eraser" />{ t('Clear Route') }
          </button>
          <TwitterConnect {...filterProps} />
          <InstagramConnect {...filterProps} />
          <SoundCloudConnect {...filterProps} />
        </div>
        <ConnectFilters filters={this.state.filters} changeFilter={this.handleChangeFilter.bind(this)} remove={this.handleRemoveFilter.bind(this)} />
        <div className="map-notifications" />
        <div id="map-canvas" ref="gmap" />
        {walkStops}
        <hr />
      </div>
    );
  }
}

// Static properties
Object.assign(MapBuilder, {
  defaultProps: {
    initialZoom: 15
  }
});

export default MapBuilder;
