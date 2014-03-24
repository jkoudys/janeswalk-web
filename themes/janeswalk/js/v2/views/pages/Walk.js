
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

      markers = new Array();

      if (typeof zoomLevelset != 'undefined') {
        var zoomLevel = zoomLevelset;
      } else {
        var zoomLevel = 16;
      }

      var mapOptions = {
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
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      var walkPathCoordinates = [];
      for(var rp in JanesWalk.page.gmap.route) { 
        walkPathCoordinates.push( new google.maps.LatLng( JanesWalk.page.gmap.route[rp].lat, JanesWalk.page.gmap.route[rp].lng));
      }

      var walkPath = new google.maps.Polyline({
        path: walkPathCoordinates,
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4 
      });

      walkPath.setMap(map);

      // Style Map

      map.mapTypes.set('map_style', this._styledMap);
      map.setMapTypeId('map_style');

      var mapMarker = '../../../../img/marker.png';
      var infowindow = new google.maps.InfoWindow({maxWidth: 300});

      var infobox = new InfoBox({
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
      });

      for (var i in JanesWalk.page.gmap.markers) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(JanesWalk.page.gmap.markers[i].lat, JanesWalk.page.gmap.markers[i].lng),
          map: map,
          icon: mapMarker,
          id: i
        });

        markers.push(marker);

        var markerContent = '';

        if ($('body').hasClass('create-page')) {
          var markerContent = "<button class='btn pull-right' id='delete-marker'><i class='icon-trash'><i></button>";
        }

        var activeMarker = new google.maps.MarkerImage('../../../../img/marker-active.png');
        var defaultMarker = new google.maps.MarkerImage('../../../../img/marker.png');

        google.maps.event.addListener(marker, 'click', (function(marker, i) {

          return function() {

            for (var e=0; e<markers.length; e++) {
              markers[e].setIcon(defaultMarker);
            }

            map.panTo(marker.getPosition());

            this.setIcon(activeMarker);

            infowindow.setContent("<h4>"+ JanesWalk.page.gmap.markers[i].title +"</h4><p>"+ JanesWalk.page.gmap.markers[i].description +"</p>"+ markerContent);
            infobox.setContent("<h4>"+ JanesWalk.page.gmap.markers[i].title +"</h4><p>"+ JanesWalk.page.gmap.markers[i].description +"</p>"+ markerContent);
            infobox.open(map, marker);

            $('.walk-stop').removeClass('active');
            $('.walk-stops-meta #'+ i ).addClass('active');

            // Scroll to view item in list
            var activePos = $('.active');
            $('.walk-stops-meta').mCustomScrollbar("scrollTo",'.active');

          }
        })(marker, i));

      }
      $('.walk-stops').show();

      // Map Centering
      var bounds = new google.maps.LatLngBounds();
      for (var index in markers) { bounds.extend( markers[index].getPosition() ); }
      for (var index in walkPath.getPath().getArray()) { bounds.extend(walkPath.getPath().getAt(index)); }
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

        var markers = {};

        var lat = map.getCenter().lat();
        var lng = map.getCenter().lng();
        var latlng = new google.maps.LatLng(lat, lng);

        var newMarker = '/images/marker.new.png';

        var marker = new google.maps.Marker({
          position: latlng,
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: map,
          icon: newMarker
        });

        // Events to trigger point deletion

        id = marker.__gm_id;
        markers[id] = marker; 

        google.maps.event.addListener(marker, "rightclick", function (point) { id = this.__gm_id; delMarker(id) });

        var delMarker = function (id) {
          marker = markers[id]; 
          marker.setMap(null);
          marker = null;
        }

        var deleteMarkerButton = function() {
          google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
            google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function (point) {
              google.maps.event.trigger(marker, 'rightclick');
            });
          });
        };

        var stopForm = "<input type='text' placeholder='Name of this stop'><br><textarea class='box-sizing' placeholder='Description of this stop'></textarea><br><button class='btn' id='save-marker'>Save Stop</button><button class='btn pull-right' id='delete-marker'><i class='icon-trash'><i></button>";

        infowindow.setContent(stopForm);
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

      };

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
