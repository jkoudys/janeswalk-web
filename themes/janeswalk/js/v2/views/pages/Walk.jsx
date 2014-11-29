var PageView = require('../Page.jsx');

/**
* WalkPageView
* 
* @extends PageView
*/
var WalkPageView = PageView.extend({

  /**
  * init
  * 
  * @public
  * @param  jQuery element
  * @return void
  */
  init: function(element) {
    this._super(element);
    this._addFacebookDialogEvents();
    this._initializeMap();
  },

  /**
  * _addFacebookDialogEvents
  * 
  * @protected
  * @return    void
  */
  _addFacebookDialogEvents: function() {
    var _this = this;
    this._element.find('.facebookShareLink').click(
      function(event) {
        event.preventDefault();
        _this.trackEvent('Walk', 'share.attempted', 'facebook');
        var shareObj = _this._getFacebookDialogObj();
        (new FacebookShareDialog(shareObj)).show(
          _this._facebookShareFailed,
          _this._facebookShareSuccessful
        );
      }
    );
  },

  /**
  * _facebookShareFailed
  * 
  * @protected
  * @return    void
  */
  _facebookShareFailed: function() {
    this.trackEvent('Walk', 'share.failed', 'facebook');
  },

  /**
  * _facebookShareSuccessful
  * 
  * @protected
  * @return    void
  */
  _facebookShareSuccessful: function() {
    this.trackEvent('Walk', 'share.successful', 'facebook');
  },

  /**
  * _getFacebookDialogObj
  * 
  * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
  * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
  * @protected
  * @return    Object
  */
  _getFacebookDialogObj: function() {
    return {
      link: JanesWalk.page.url,
      picture: JanesWalk.page.pictureUrl,
      name: JanesWalk.page.title,
      description: JanesWalk.page.description,
      actions: {
        name: 'View Jane\'s Walks in ' + (JanesWalk.page.city.name),
        link: JanesWalk.page.city.url
      }
    };
  },

  /**
  * _styledMap
  * 
  * @type      StyledMapType
  * @protected
  */
  _styledMap: new google.maps.StyledMapType(
    [{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        { "saturation": -100 }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "saturation": -100 },
        { "lightness": 36 }
      ]
    },{
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "on" },
        { "saturation": 37 }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "saturation": -100 }
      ]
    }],
    {
      name: "Styled Map"
    }),

    /**
    * _initializeMap
    * 
    * @protected
    * @return    void
    */
    _initializeMap: function() {

      var markers = [],
      // FIXME: This searching for a global zoomLevelset is terrible. Replace with proper
      // parameter passing.
      zoomLevel = (typeof zoomLevelset === 'undefined') ? 16 : zoomLevelset,

      // Setup map display options
      mapOptions =  {
        zoom: zoomLevel,
        scrollwheel: false,
        zoomControl: true,
        disableDefaultUI: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      },

      // Load the google map canvas
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions),
      walkPathCoordinates = [],
      mapMarker = '../../../../img/marker.png',

      // Setup basic infobox layout + display functions
      infowindow = new google.maps.InfoWindow({maxWidth: 300}),
      infobox = new InfoBox({
        content: document.getElementById("infobox"),
        maxWidth: 150,
        pixelOffset: new google.maps.Size(-3, -25),
        alignBottom: true,
        boxStyle: {
          background: "#fff",
          width: "280px",
          padding: "10px",
          border: "1px solid #eee",
        },
        closeBoxMargin: "-22px -22px 2px -8px",
        closeBoxURL: "../../../../img/map-close.png",
        infoBoxClearance: new google.maps.Size(20, 20)
      }),
      showInfoBox = function(marker, i, markerContent) {

        return function() {

          for (var e=0; e < markers.length; e++) {
            markers[e].setIcon(defaultMarker);
          }

          map.panTo(marker.getPosition());

          this.setIcon(activeMarker);

          infowindow.setContent(React.renderToStaticMarkup(
            <div>
              <h4>
                {JanesWalk.page.gmap.markers[i].title}
              </h4>
              <p>
                {JanesWalk.page.gmap.markers[i].description}
              </p>
              {markerContent}
            </div>
          ));
          infobox.open(map, marker);

          $('.walk-stop').removeClass('active');
          $('.walk-stops-meta #'+ i ).addClass('active');

          // Scroll to view item in list
          // TODO: make the marker you clicked active

        };
      },

      // Static image objects 
      activeMarker = new google.maps.MarkerImage('../../../../img/marker-active.png'),
      defaultMarker = new google.maps.MarkerImage('../../../../img/marker.png'),

      // Counter/indeces declarations
      walkPath,
      rp,
      index,
      markerContent;

      // Go through each point in the route and build coordinates from that
      for(rp in JanesWalk.page.gmap.route) { 
        walkPathCoordinates.push( new google.maps.LatLng( JanesWalk.page.gmap.route[rp].lat, JanesWalk.page.gmap.route[rp].lng));
      }

      // Draw a line through each of the points
      walkPath = new google.maps.Polyline({
        path: walkPathCoordinates,
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4 
      });

      walkPath.setMap(map);

      // Style Map
      map.mapTypes.set('map_style', this._styledMap);
      map.setMapTypeId('map_style');

      // Place each marker on the map
      for (var i in JanesWalk.page.gmap.markers) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(JanesWalk.page.gmap.markers[i].lat, JanesWalk.page.gmap.markers[i].lng),
          map: map,
          icon: mapMarker,
          id: i
        });

        markers.push(marker);

        markerContent = '';

        if ($('body').hasClass('create-page')) {
          markerContent = <button className="btn pull-right" id="delete-marker"><i className="fa fa-trash" /></button>;
        }

        google.maps.event.addListener(marker, 'click', showInfoBox(marker, i, markerContent));
      }
      $('.walk-stops').show();

      // Map Centering
      var bounds = new google.maps.LatLngBounds();
      for (index in markers) {
        bounds.extend( markers[index].getPosition() );
      }
      for (index in walkPath.getPath().getArray()) {
        bounds.extend(walkPath.getPath().getAt(index));
      }
      if(markers.length > 0) {
        map.fitBounds(bounds);
      }
      // Zoom out a bit from the centered/zoomed setting
      google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
        var oldZoom = map.getZoom();
        map.setZoom(Math.min(16, oldZoom));
      });

      google.maps.event.addDomListener(document.getElementById('map-canvas'), 'touchstart', function(e){
        map.setOptions({panControl: false, draggable: false});
      });

      // Register Custom "dragend" Event

      google.maps.event.addListener(marker, 'dragend', function() {
        // Get the Current position, where the pointer was dropped
        var point = marker.getPosition();
        // Center the map at given point
        map.panTo(point);
        // Update the textbox
        document.getElementById('txt_latlng').value=point.lat()+", "+point.lng();
      });

      // For all marker adding

      function addmarker(latilongi) {

        var markers = {},
        lat = map.getCenter().lat(),
        lng = map.getCenter().lng(),
        latlng = new google.maps.LatLng(lat, lng),
        newMarker = '/images/marker.new.png',
        marker = new google.maps.Marker({
          position: latlng,
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: map,
          icon: newMarker
        }),
        delMarker = function (id) {
          marker = markers[id]; 
          marker.setMap(null);
          marker = null;
        };

        // Events to trigger point deletion

        id = marker.__gm_id;
        markers[id] = marker; 

        google.maps.event.addListener(marker, "rightclick", function (point) { id = this.__gm_id; delMarker(id); });

        var deleteMarkerButton = function() {
          google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
            google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function (point) {
              google.maps.event.trigger(marker, 'rightclick');
            });
          });
        };


        infowindow.setContent(React.renderStaticMarkup(
          <div>
            <input type="text" placeholder="Name of this stop" />
            <br />
            <textarea className="box-sizing" placeholder="Description of this stop" />
            <br/>
            <button className="btn" id="save-marker">Save Stop</button>
            <button className="btn pull-right" id="delete-marker"><i className="fa fa-trash" /></button>
          </div>
        ));
        infowindow.open(map, marker);
        deleteMarkerButton();

        google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
          google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
            infowindow.close(map, marker);
          });
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
          deleteMarkerButton();

          google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
            google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
              infowindow.close(map, marker);
            });
          });

        });

      }

      // Walk map
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
          infowindow.close(map, marker);
        });
      });

      $('.walk-stop').on('click', function() {
        marker = markers[this.id];
        $('.walk-stop').removeClass('active');
        $(this).addClass('active');
        google.maps.event.trigger(marker, 'click');
      });
    }
});

module.exports = WalkPageView;
