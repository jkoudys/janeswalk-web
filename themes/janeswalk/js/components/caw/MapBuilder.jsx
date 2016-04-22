/* global React ReactDOM google $ CCM_THEME_PATH */

import WalkStopTable from './map/WalkStopTable.jsx';
import WalkInfoWindow from './map/WalkInfoWindow.jsx';
import InstagramConnect from './map/InstagramConnect.jsx';
import SoundCloudConnect from './map/SoundCloudConnect.jsx';
import TwitterConnect from './map/TwitterConnect.jsx';
import ConnectFilters from './map/ConnectFilters.jsx';

// Flux
import { translateTag as t } from 'janeswalk/stores/I18nStore';

// Map parameters
const stopMarker = {
  url: `${CCM_THEME_PATH}/images/marker.png`,
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44),
};

export default class MapBuilder extends React.Component {
  constructor(props) {
    super(props);

    // State for this component should only track the map editor
    Object.assign(this, {
      state: {
        // The 'mode' we're in: 'addPoint', 'addRoute'
        mode: {},
        map: null,
        markers: new google.maps.MVCArray(),
        route: null,
        infowindow: new google.maps.InfoWindow(),
        // The collection of search terms boxes
        filters: [],
      },

      // Build a google map from our serialized map state
      refreshGMap: () => {
        const valueLink = this.props.valueLink;
        const markers = new google.maps.MVCArray;
        let route = null;

        if (this.state.route) {
          this.state.route.setMap(null);
        }

        this.state.markers.forEach(marker => marker.setMap(null));

        // Draw the route
        if (valueLink.value) {
          for (const marker of valueLink.value.markers) {
            let latlng;
            // Set to the markers latlng if available, otherwise place at center
            if (marker.lat && marker.lng) {
              latlng = new google.maps.LatLng(marker.lat, marker.lng);
            } else {
              latlng = this.state.map.center;
            }

            markers.push(
              this.buildMarker({
                latlng,
                title: marker.title,
                description: marker.description,
                media: marker.media,
              })
            );
          }

          route = this.buildRoute(valueLink.value.route);
        } else {
          route = this.buildRoute([]);
        }

        // Set marker/route adding
        google.maps.event.addListener(this.state.map, 'click', ev => {
          this.state.infowindow.setMap(null);
          if (this.state.mode.addRoute) {
            route.setPath(route.getPath().push(ev.latLng));
            this.setState({ route });
          }
        });

        this.setState({ markers, route });
      },
      /**
       * Make the map fit the markers in this walk
       */
      boundMapByWalk: () => {
        const { map, markers } = this.state;

        // Don't include the route - it can be too expensive to compute.
        const bounds = new google.maps.LatLngBounds;
        google.maps.event.trigger(map, 'resize');
        if (this.state.markers.getLength()) {
          for (let i = 0, len = markers.getLength(); i < len; i++) {
            bounds.extend(markers.getAt(i).getPosition());
          }

          map.fitBounds(bounds);
        }
      },


      buildRoute: (routeArray) => {
        const poly = new google.maps.Polyline({
          strokeColor: '#F16725',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          editable: true,
          map: this.state.map,
        });

        // Remove vertices when right-clicked
        google.maps.event.addListener(poly, 'rightclick', ev => {
          // Check if we clicked a vertex
          if (ev.vertex !== undefined) {
            poly.setPath(poly.getPath().removeAt(ev.vertex));
          }
        });

        // Hide the infowindow if we click outside it
        google.maps.event.addListener(poly, 'mousedown', () => this.state.infowindow.setMap(null));

        if (routeArray.length > 0) {
          poly.setPath(routeArray.map(point => new google.maps.LatLng(point.lat, point.lng)));
        }

        return poly;
      },

      /**
       * @param google.maps.Marker marker
       */
      deleteMarker: (marker) => {
        const markers = this.state.markers;

        // Clear marker from map
        marker.setMap(null);

        // Remove reference in state
        markers.removeAt(markers.indexOf(marker));

        this.setState({ markers });
      },

      /**
       * Reorder the marker at index to a new position, pushing up those after
       * @param int from
       * @param int to
       */
      moveBefore: (from, to) => {
        const markers = this.state.markers;
        const fMarker = markers.getAt(from);
        markers.removeAt(from);
        markers.insertAt(to, fMarker);

        this.setState({ markers }, this.syncState);
      },

      // Button Actions
      toggleAddPoint: () => {
        const markers = this.state.markers;
        const marker = this.buildMarker();
        markers.push(marker);

        this.setState({ markers, mode: {} }, () => {
          this.syncState();
          this.showInfoWindow(marker);
        });

        this.state.infowindow.setMap(null);
      },

      toggleAddRoute: () => {
        this.setState({
          mode: {
            addRoute: !this.state.mode.addRoute,
          },
        }, () => this.state.infowindow.setMap(null));
      },

      clearRoute: () => {
        this.state.infowindow.setMap(null);
        this.state.route.setPath([]);
        this.setState({ mode: {} });
      },

      // Build a version of state appropriate for persistence
      getStateSimple: () => {
        const markers = this.state.markers.getArray().map(marker => {
          const titleObj = JSON.parse(marker.title);
          return {
            lat: marker.position.lat(),
            lng: marker.position.lng(),
            title: titleObj.title,
            description: titleObj.description,
            media: titleObj.media,
            style: 'stop',
          };
        });
        let route = [];

        if (this.state.route) {
          route = this.state.route.getPath().getArray().map(point => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
        }

        return { markers, route };
      },

      // Sync what's on the gmap to what's stored in our state
      syncState: () => this.props.valueLink.requestChange(this.getStateSimple()),

      // Manage the filters for loading data from external APIs
      handleRemoveFilter: (i) => {
        const filters = this.state.filters.slice();
        filters.splice(i, 1);
        this.setState({ filters });
      },

      // Update the _text_ of a filter
      handleChangeFilter: (i, val) => {
        const filters = this.state.filters.slice();
        filters[i].value = val;
        this.setState({ filters });
      },

      // Push a new filter to our box, usually done by the buttons
      handleAddFilter: (filter) => {
        const filters = this.state.filters.slice();
        filters.push(filter);
        this.setState({ filters });
      },

      /**
       * Show the info box for editing this marker
       *
       * @param google.maps.Marker marker
       */
      showInfoWindow: (marker) => {
        const { map, infowindow } = this.state;
        const infoDOM = document.createElement('div');
        const handleDelete = () => this.deleteMarker(marker);

        ReactDOM.render(
          <WalkInfoWindow
            marker={marker}
            deleteMarker={handleDelete}
            refresh={this.syncState}
          />,
          infoDOM
        );

        // Center the marker and display its info window
        map.panTo(marker.getPosition());
        infowindow.setContent(infoDOM);
        infowindow.open(map, marker);
      },
    });
  }

  componentDidMount() {
    const map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.gmap), {
      center: new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]),
      zoom: this.props.initialZoom,
      scrollwheel: false,
      rotateControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE],
      },
    });

    // Map won't size properly on a hidden tab, so refresh on tab shown
    $('a[href="#route"]').on('shown.bs.tab', this.boundMapByWalk);

    this.setState({ map }, this.refreshGMap);
  }

  // Map related functions
  // Build gmaps Marker object from base data
  // @param google.maps.LatLng latlng The position to add
  // @param Object title {title, description}
  buildMarker(userOptions) {
    const { map } = this.state;
    const gMarkerOptions = {
      animation: google.maps.Animation.DROP,
      draggable: true,
      style: 'stop',
      map,
      icon: stopMarker,
    };
    let marker;

    // Assign default options
    const options = Object.assign({}, {
      latlng: null,
      title: '',
      description: '',
      media: null,
    }, userOptions);

    // If we passed in a position
    if (options.latlng instanceof google.maps.LatLng) {
      gMarkerOptions.position = options.latlng;
    } else {
      gMarkerOptions.position = this.state.map.center;
    }

    // Set to an empty title/description object.
    // Google maps has a limited amount of marker data
    gMarkerOptions.title = JSON.stringify({
      title: options.title,
      description: options.description,
      media: options.media,
    });

    marker = new google.maps.Marker(gMarkerOptions);

    google.maps.event.addListener(marker, 'click', () => this.showInfoWindow(marker));

    google.maps.event.addListener(marker, 'drag', () => {});

    return marker;
  }

  render() {
    let walkStops;

    // Standard properties the filter buttons need
    const filterProps = {
      valueLink: this.props.valueLink,
      refreshGMap: this.refreshGMap,
      boundMapByWalk: this.boundMapByWalk,
      addFilter: this.handleAddFilter,
      city: this.props.city,
    };

    if (this.state.markers && this.state.markers.length) {
      walkStops = [
        <h3 key={'stops'}>{t`Walk Stops`}</h3>,
        <WalkStopTable
          ref="walkStopTable"
          key={1}
          markers={this.state.markers}
          deleteMarker={this.deleteMarker}
          moveBefore={this.moveBefore}
          showInfoWindow={this.showInfoWindow}
        />,
      ];
    }

    return (
      <div className="tab-pane" id="route" ref="route">
        <div className="page-header" data-section="route">
          <h1>{ t`Share Your Route` }</h1>
        </div>
        <div className="alert alert-info">
          {t`Make sure to use 'Add Stop' at least once to indicate the meeting place. This is how people will find you on the day of your walk.`}
        </div>
        <div id="map-control-bar">
          <button
            ref="addPoint"
            className={(this.state.mode.addPoint) ? 'active' : ''}
            onClick={this.toggleAddPoint}
          >
            <i className="fa fa-map-marker" />{ t`Add Stop` }
          </button>
          <button
            ref="addRoute"
            className={(this.state.mode.addRoute) ? 'active' : ''}
            onClick={this.toggleAddRoute}
          >
            <i className="fa fa-arrows" />{ t`Add Route` }
          </button>
          <button ref="clearroute" onClick={this.clearRoute}>
            <i className="fa fa-eraser" />{ t`Clear Route` }
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
}

// Static properties
Object.assign(MapBuilder, {
  defaultProps: {
    initialZoom: 15,
  },
});
