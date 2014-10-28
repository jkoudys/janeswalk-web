/* jshint ignore:start */
// Shims, polyfills, etc.
// dataset
Function.prototype.bind||(Function.prototype.bind=function(e){"use strict";if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),function(){"use strict";var e=Object.prototype,t=e.__defineGetter__,n=e.__defineSetter__,r=e.__lookupGetter__,i=e.__lookupSetter__,s=e.hasOwnProperty;t&&n&&r&&i&&(Object.defineProperty||(Object.defineProperty=function(e,o,u){if(arguments.length<3)throw new TypeError("Arguments not optional");o+="";if(s.call(u,"value")){!r.call(e,o)&&!i.call(e,o)&&(e[o]=u.value);if(s.call(u,"get")||s.call(u,"set"))throw new TypeError("Cannot specify an accessor and a value")}if(!(u.writable&&u.enumerable&&u.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return u.get&&t.call(e,o,u.get),u.set&&n.call(e,o,u.set),e}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(e,t){if(arguments.length<2)throw new TypeError("Arguments not optional.");t+="";var n={configurable:!0,enumerable:!0,writable:!0},o=r.call(e,t),u=i.call(e,t);return s.call(e,t)?!o&&!u?(n.value=e[t],n):(delete n.writable,n.get=n.set=undefined,o&&(n.get=o),u&&(n.set=u),n):n}),Object.defineProperties||(Object.defineProperties=function(e,t){var n;for(n in t)s.call(t,n)&&Object.defineProperty(e,n,t[n])}))}();if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(Element.prototype,"dataset")||!Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var e,t=this,n,r,i,s,o,u=this.attributes,a=u.length,f=function(e){return e.charAt(1).toUpperCase()},l=function(){return this},c=function(e,t){return typeof t!="undefined"?this.setAttribute(e,t):this.removeAttribute(e)};try{(({})).__defineGetter__("test",function(){}),n={}}catch(h){n=document.createElement("div")}for(e=0;e<a;e++){o=u[e];if(o&&o.name&&/^data-\w[\w\-]*$/.test(o.name)){r=o.value,i=o.name,s=i.substr(5).replace(/-./g,f);try{Object.defineProperty(n,s,{enumerable:this.enumerable,get:l.bind(r||""),set:c.bind(t,i)})}catch(p){n[s]=r}}}return n}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}};

/* jshint ignore:end */
;
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false,
    fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/; // jshint ignore:line 
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype,
      addPropertyToParent = function(name, fn){
        return function() {
          var tmp = this._super;

          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = _super[name];

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);        
          this._super = tmp;

          return ret;
        };
      };
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        addPropertyToParent(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
;
/**
 * FacebookShareDialog
 * 
 * @extends Class
 */
var FacebookShareDialog = Class.extend({

    /**
     * _shareObj
     * 
     * @protected
     * @var       Object (default: null)
     */
    _shareObj: null,

    /**
     * init
     * 
     * @public
     * @param  Object shareObj
     * @return void
     */
    init: function(shareObj) {
        this._shareObj = shareObj;
        this._shareObj.method = 'feed';
    },

    /**
     * show
     * 
     * @public
     * @param  Function failed
     * @param  Function successful
     * @return void
     */
    show: function(failed, successful) {
        var _this = this;
        FB.ui(
            this._shareObj,
            function(response) {
                if (response !== undefined) {
                    if (response === null) {
                        if (failed) failed();
                    } else {
                        if (successful) successful();
                    }
                }
            }
        );
    }
});
;/**
 * Map Editor
 *
 * To decouple the map editing from the create-a-walk form, all
 * map editing functions should go in here.
 */

function MVCArrayBinder(mvcArray){
  this.array_ = mvcArray;
}
MVCArrayBinder.prototype = new google.maps.MVCObject();
MVCArrayBinder.prototype.get = function(key) {
  if (!isNaN(parseInt(key))){
    return this.array_.getAt(parseInt(key));
  } else {
    this.array_.get(key);
  }
};
MVCArrayBinder.prototype.set = function(key, val) {
  if (!isNaN(parseInt(key))){
    this.array_.setAt(parseInt(key), val);
  } else {
    this.array_.set(key, val);
  }
};

function MapEditor(jwdata) {
  var _this = this,
    // Map Style array for map's appearance
    styles = [
      {
        "featureType": "poi.business",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ],
    mapOptions = {
      zoom: 15,
      scrollwheel: false,
      rotateControl: true,
      center: new google.maps.LatLng(jwdata.city.lat, jwdata.city.lng ),
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
      }
    };

  // Containers for map contents
  this.map = {};
  this.markers = [];
  this.poly = {};
  this.point = [];
  this.userLocation = false;

  // Geocode early, so we don't have to wait for it later
  window.freeGeoIpCallback = function(obj) {
    _this.userLocation = new google.maps.LatLng(obj.latitude, obj.longitude);
  };
  /* Geocode based on IP and center map */
  $.getScript("http://freegeoip.net/json/?callback=freeGeoIpCallback");

  // GMaps display objects
  this.infowindow = new google.maps.InfoWindow();
  this.pathMarker = new google.maps.MarkerImage(
    '/img/path.marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    null, 
    // The origin for this image is 0,0.
    new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(8, 10)
  );
  this.stopMarker = {
    url: '../../../img/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  };

  // Create new map in the DOM.
  this.map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);

  // Set Map style.
  this.map.setOptions({styles: styles});

  // TODO: organize these inits together somewhere
  // Polylines
  this.initPoly();
}

/**
 * Bind functions to dom elements, like the map control buttons.
 * TODO: Remove selectors from function body, and either let the elements
 * be passed in, or break this function up into functions that can be called
 * directly from the event listeners.
 */
MapEditor.prototype.bindDomEvents = function bindDomEvents() {
  var _this = this;

  // Any click on any of the stops will make that marker receive a click.
  // FIXME: describing this old code makes it sound nonsensical. Probably needs
  // a rewrite.
  document.getElementById('route-stops').addEventListener('click', function(event){
    var marker = _this.markers[this.dataset.stop];
    google.maps.event.trigger(marker, 'click');
  });

  // Click event to add stops
  document.getElementById('addpoint').addEventListener('click', function() {
    _this.addmarker();
    google.maps.event.trigger(_this.markers[_this.markers.length-1], 'click');
  });

  // Click event to add meeting place
  document.getElementById('addmeetingplace').addEventListener('click', function() {
    _this.addMeetingPlace();
    google.maps.event.trigger(_this.markers[_this.markers.length-1], 'click');
  });

  // Click event to add stops
  document.querySelector('.clear-route').addEventListener('click', function(event) {
    var x = window.confirm('Do you want to remove your walk route? Your Stops will not be deleted.');
    if (x) {
      _this.clearRoute();
    }
    event.preventDefault();
  });

  // Hook up click controls for map
  document.getElementById('addroute').addEventListener('click', function(){
    if ($(this).hasClass('active')) {
      $(this).html('<i class="icon-map-route"></i> Edit Route').removeClass('btn-primary active');
      $('.map-notifications').html('');
      $('#addpoint').prop('disabled', false);
      $('.disable-alert').css({'zIndex':'-1'});

      google.maps.event.clearListeners(_this.map, 'click');

      for(i=0; i < _this.point.length; i++) {
        _this.point[i].setVisible(false);
        _this.point[i].setDraggable(false);
      }
      for(i=0; i < _this.markers.length; i++) {
        _this.addmarkerListener(_this.markers[i]);
        _this.markers[i].setDraggable(true);
      }
      _this.poly.setEditable(false);
    } else {
      $(this).html('<i class="icon-thumbs-up"></i> Save Route').addClass('btn-primary active');
      $('.map-notifications').html('<div class="alert alert-info">Click on the map to draw your route. Right click to undo a route marker.</div>');
      $('#addpoint').prop('disabled', true);

      $('.disable-alert').css({'zIndex':'5'});

      google.maps.event.addListener(_this.map, 'click', 
        function(event, title, lat, lng) { _this.addlines(event,title,lat,lng); });

        for(i=0; i < _this.point.length; i++) {
          _this.point[i].setVisible(true);
          _this.point[i].setDraggable(true);
        }
        for(i=0; i < _this.markers.length; i++) {
          google.maps.event.removeListener(_this.markers[i].listener);
          _this.markers[i].setDraggable(false);
          _this.markers[i].setClickable(false);
        }
        _this.poly.setEditable(true);
    }

    if (_this.markers.length === 0) {
      return false;
    }

    if (_this.point.length <= 0 ) {

      lat = _this.map.getCenter().lat();
      lng = _this.map.getCenter().lng();
      var latlng = new google.maps.LatLng(lat, lng);

      var markerInfo = _this.markers[0];

      var infowindow = new google.maps.InfoWindow({
        content: 'Click here to start your Route'
      });

      infowindow.open(_this.map, markerInfo);
      google.maps.event.addListenerOnce(_this.map, 'click', function(){
        infowindow.close();
      });
    }
  });
  google.maps.event.addListener(_this.map, 'resize', function(){ _this.centerRoute(); });
};

/**
 * Adds a 'home' button, that centers the map on your current location
 */
MapEditor.prototype.createHomeControl = function createHomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Home</b>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var current = (new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ));
        _this.map.setCenter(current);
      },
      function(error) {
      }
    );
  });
};

/**
 * Build the map path
 */
MapEditor.prototype.pathSet = function pathSet() {
  var path = this.poly.getPath(),
    len = path.getLength(),
    coordStr = ''; 
  for (var i=0; i < len; i++) {
    coordStr += path.getAt(i).toUrlValue(6);
  }
  console.log(coordStr);
};

/**
 * Add a listener to the marker, so clicking it brings up the box
 */
MapEditor.prototype.addMarkerListener = function addMarkerListener(marker) {
  var _this = this,
    markerForm =
      '<div class="stop-form">' +
        '<input type="text" value="' + marker.title + '" class="marker-title" placeholder="Title of this stop">' +
        '<br>' +
        '<textarea class="marker-description box-sizing" placeholder="Description of this stop">' + marker.description + '</textarea>' +
        '<br>' +
        '<textarea class="marker-questions box-sizing" placeholder="A few questions for participants">' + marker.questions + '</textarea>' +
        '<br>' +
        '<button class="btn btn-primary" id="save-marker">Save Stop</button> ' +
        '<button class="btn" id="delete-marker">Delete</button>' +
      '</div>';
  _this.map.panBy(0,-20);
  marker.listener = google.maps.event.addListener(marker, 'click', function() { 
     _this.infowindow.setContent(markerForm);
    _this.infowindow.open(_this.map,marker);
    _this.deleteMarkerButton(marker);
    _this.saveMarkerButton(marker);
  });
};

/**
 * Render the route table, which lists all the stops
 */
MapEditor.prototype.updateChart = function updateChart() {
  $('#route-stops tbody').empty();
  for (var i = 0; i < this.markers.length; i++) {
    $('#route-stops tbody').append(
      '<tr>' +
        '<td>' + this.markers[i].title + '</td>' +
        '<td>' + this.markers[i].description + '</td>' +
        '<td><a class="delete-stop" href="#map-canvas" data-stop=' + i + '>Edit</a></td>' +
      '</tr>'
    );
  }
};

/* Add content functions
* Functions here create content: add lines, points, etc.
*/

/**
 * Draws a line to each point you've clicked
 */
MapEditor.prototype.addLines = function addLines(event, title, lat, lng) {
  var position,
  visible,
  _this = this;

  if (!lat){
    position = event.latLng;
    visible = true;
  } else {
    position = new google.maps.LatLng(lat, lng);
    visible = false;
  }
  if (!title){
    title = '#' + len;
  }
  if ($('#addroute').hasClass('active') || title) {
    var path = _this.poly.getPath();
    path.push(position);
    var len = path.getLength();
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: _this.map,
      draggable : true,
      icon: _this.pathMarker,
      zIndex: 100,
      visible: visible
    });
    marker.bindTo('position', _this.poly.binder, (len-1).toString());

    _this.point.push(marker);

    // Right Click to remove Poly Point (Only works in sequence)

    google.maps.event.addListener(marker, 'rightclick', function(event) {
      for (var i = 0; i < _this.point.length; i++) {
        if (_this.point[i] === _this) {
          _this.point.splice(i, 1);
        }
      }
      marker.setMap(null);
      path.removeAt(len-1);
    });
  }
};

MapEditor.prototype.addMeetingPlace = function addMeetingPlace(latilongi, title, description, lat, lng) {
  var _this = this; // Set to the editor class, for use in functions
  if (!lat){
    lat = _this.map.getCenter().lat();
  }
  if (!lng){
    lng = _this.map.getCenter().lng();
  }
  if (!title){
    title = '';
  }
  if (!description){
    description = '';
  }

  var latlng = new google.maps.LatLng(lat, lng);

  var marker = new google.maps.Marker({
    position: latlng,
    animation: google.maps.Animation.DROP,
    crossOnDrag: true,
    draggable: true,
    title: title,
    description: description,
    style: 'meeting',
    icon: _this.stopMarker,
    map: _this.map
  });

  var markerForm =
    '<div class="stop-form">' +
      '<input type="text" value="' + marker.title + '" placeholder="Name of your meeting place" class="marker-title">' +
      '<br>' +
      '<textarea class="marker-description box-sizing" placeholder="Describe where you are meeting">' + marker.description + '</textarea>' +
      '<br>' +
      '<button class="btn btn-primary" id="save-marker">Save Meeting Place</button> ' +
      '<button class="btn" id="delete-marker">Delete</button>' +
    '</div>';

  if (!lat){
    _this.infowindow.setContent(markerForm);
    _this.infowindow.open(_this.map, marker);
  } else {
    _this.markers.push(marker);
    $('#addmeetingplace').prop('disabled', true);
  }

  google.maps.event.addListener(marker, 'click', function() {    
    _this.infowindow.setContent(markerForm);
    _this.map.panTo(marker.getPosition());
    _this.infowindow.open(_this.map,marker);
    _this.deleteMarkerButton(marker);
    _this.saveMarkerButton(marker);
  });
};

MapEditor.prototype.addMarker = function addMarker(latilongi, title, description, questions, lat, lng) {

  if (!lat) lat = this.map.getCenter().lat();
  if (!lng) lng = this.map.getCenter().lng();
  if (!title) title = '';
  if (!description) description = '';
  if (!questions) questions = '';

  var latlng = new google.maps.LatLng(lat, lng);

  var marker = new google.maps.Marker({
    position: latlng,
    animation: google.maps.Animation.DROP,
    draggable: true,
    title: title,
    icon: this.stopMarker,
    style: 'stop',
    description: description,
    questions: questions,
    map: this.map
  });

  var markerForm =
    '<div class="stop-form">' +
      '<input type="text" value="' + marker.title + '" placeholder="Title of this stop" class="marker-title">' +
      '<br>' +
      '<textarea class="marker-description box-sizing" placeholder="Description of this stop">' + marker.description + '</textarea>' +
      '<br>' +
      '<button class="btn btn-primary" id="save-marker">Save Stop</button> ' +
      '<button class="btn" id="delete-marker">Delete</button>' +
    '</div>';

  if (!lat){
    infowindow.setContent(markerForm);
    infowindow.open(this.map, marker);
  } else {
    this.markers.push(marker);
  }

  this.addmarkerListener(marker);
  this.updateChart();

};

/**
* Save the marker button
*/
MapEditor.prototype.saveMarkerButton = function saveMarkerButton(marker) {
  var _this = this;
  google.maps.event.addListenerOnce(_this.infowindow, 'domready', function(){ 
    google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function () {
      for (var i = 0; i < _this.markers.length; i++) {
        if (_this.markers[i] === marker) {
          _this.markers.splice(i, 1);
        }
      }

      marker.title = $('.marker-title').val();
      marker.description = $('.marker-description').val();

      _this.markers.push(marker);

      $('#addmeetingplace').prop('disabled', true);
      _this.updateChart();

      setTimeout(function(){
        _this.infowindow.close(_this.map,marker);
      },500);

    });
  });
};

/* Clear / Reset functions
* Functions here remove lines, reset maps, etc.
*/
// Set the basic style of the polylines
MapEditor.prototype.initPoly = function initPoly() {
  var polyOptions = {
    strokeColor: '#F16725',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    editable: false,
    map: this.map
  };
  this.poly = new google.maps.Polyline(polyOptions);
  this.poly.binder = new MVCArrayBinder(this.poly.getPath());
};

MapEditor.prototype.deleteMarkerButton = function deleteMarkerButton(marker) {
  var _this = this;
  google.maps.event.addListenerOnce(_this.infowindow, 'domready', function(){ 
    google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function () {
      marker.setMap(null);

      for (var i = 0; i < _this.markers.length; i++) {
        if (_this.markers[i] === marker) {
          _this.markers.splice(i, 1);
        }
      }

      $('#addmeetingplace').prop('disabled', false);
      _this.updateChart();
    });
  });
};

// Clear out the polylines
MapEditor.prototype.removeLines = function removeLines() {
  this.poly.binder.getAt(marker);
};

// Remove Stops and Path
MapEditor.prototype.clearRoute = function clearRoute(event) {
  this.poly.setMap(null);

  for(var i = 0; i < this.point.length; i++) {
    this.point[i].setMap(null);
  }
  this.point = [];
  this.initPoly();
};

// Center the map on the points that are loaded
MapEditor.prototype.centerRoute = function centerRoute() {
  var _this = this;
  if(_this.point.length) {
    var bounds = new google.maps.LatLngBounds();
    for(i=0; i < _this.point.length; i++) {
      bounds.extend(_this.point[i].position);
    }
    _this.map.setCenter(bounds.getCenter());
  }
  else if(_this.userLocation !== false) {
    _this.map.setCenter(_this.userLocation);
  }
};

;
/**
 * View
 * 
 * @extends Class
 */
var View = Class.extend({

    /**
     * _element
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    _element: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._element = element;
    },

    /**
     * getElement
     * 
     * @public
     * @return HTMLFormElement
     */
    getElement: function() {
        return this._element;
    }
});
;
/**
 * ModalView
 * 
 * @extends View
 */
var ModalView = View.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addCloseEvents();
    },

    /**
     * _addCloseEvents
     * 
     * @protected
     * @return    void
     */
    _addCloseEvents: function() {
        var _this = this;
        this._element.find('.closeModalSource').click(
            function(event) {
                event.preventDefault();
                _this.close();
            }
        );
    }
});
;
/**
 * PageView
 * 
 * @extends View
 */
var PageView = View.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addNavEvents();
        this._addOverlayCloseEvent();
    },

    /**
     * _addOverlayCloseEvent
     * 
     * @protected
     * @return    void
     */
    _addOverlayCloseEvent: function() {
        var _this = this;
        this._element.find('.o-background').click(
            function(event) {
                _this._element.find('.overlay').hide();
            }
        );
        this._element.find('a.closeModalCta').click(
            function(event) {
                event.preventDefault();
                _this._element.find('.overlay').hide();
            }
        );
    },

    /**
     * _addNavEvents
     * 
     * @protected
     * @return    void
     */
    _addNavEvents: function() {
        this._element.find('a.search-open').click(
            function() {
                $('html, body').animate(
                    {
                        scrollTop: 0
                    },
                    300
                );
                $('body > header').addClass('dropped');
            }
        );
        this._element.find('a.search-close').click(
            function() {
                $('body > header').removeClass('dropped');
            }
        );
    },

    /**
     * _makeGaCall
     * 
     * @protected
     * @param     Array call
     * @return    void
     */
    _makeGaCall: function(call) {
        _gaq.push(call);
    },

    /**
     * trackCustomVar
     * 
     * @see    http://www.sitepoint.com/google-analytics-custom-variables/
     * @see    http://online-behavior.com/analytics/custom-variables-segmentation
     * @public
     * @param  String index
     * @param  String name
     * @param  String value
     * @param  String scope (optional)
     * @return void
     */
    trackCustomVar: function(index, name, value, scope) {
        var call = ['_setCustomVar', index, name, value, scope];
        this._makeGaCall(call);
    },

    /**
     * trackEvent
     * 
     * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @public
     * @param  String category The name you supply for the group of objects you want to track.
     * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
     * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
     * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
     * @param  Boolean override (optional)
     * @return void
     */
    trackEvent: function(category, action, optLabel, optValue, override) {
        var call = ['_trackEvent'];
        if (category !== undefined) {
            call.push(category);
        }
        if (action !== undefined) {
            call.push(action);
        }
        if (optLabel !== undefined) {
            call.push(optLabel);
        }
        if (optValue !== undefined) {
            call.push(optValue);
        }
        this._makeGaCall(call, override);
    },

    /**
     * trackView
     * 
     * @public
     * @param  String path
     * @return void
     */
    trackView: function(path) {
        var call = ['_trackPageview', path];
        this._makeGaCall(call);
    }
});
;
/**
 * CityPageView
 * 
 * @extends PageView
 */
var CityPageView = PageView.extend({

    /**
    * _accessibility
    * 
    * @protected
    * @var       String|null (default: null)
    */
    _accessibility: null,

    /**
    * _cards
    * 
    * @protected
    * @var       NodeList|null (default: null)
    */
    _cards: null,

    /**
    * _data
    * 
    * @protected
    * @var       Array|null (default: null)
    */
    _data: null,

    /**
    * _date
    * 
    * @protected
    * @var       Array|null (default: null)
    */
    _date: null,

    /**
    * _initiative
    * 
    * @protected
    * @var       String|null (default: null)
    */
    _initiative: null,

    /**
    * _theme
    * 
    * @protected
    * @var       String|null (default: null)
    */
    _theme: null,

    /**
    * _ward
    * 
    * @protected
    * @var       String|null (default: null)
    */
    _ward: null,

    /**
    * init
    * 
    * @public
    * @param  jQuery element
    * @return void
    */
    init: function(element) {
        this._super(element);
        this._cards = this._element[0].querySelectorAll(".walk");
        this._previewCards();
        this._data = JanesWalk.walks;
        this._resetSelectElements();
        this._addCreateWalkEvent();
        this._addFilterEvents();
        this._setThemeCounts();
        this._captureHash();
        //        this._setupText2DonateInterstitials();
        this._addLinkListeners();
        $('.walks-list .tag').tooltip();
    },

    /**
    * _getFacebookDialogDonateObj
    * 
    * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
    * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
    * @protected
    * @return    Object
    */
    _getFacebookDialogDonateObj: function() {
        return {
            link: 'http://janeswalk.org',
            // picture: 'http://janeswalk.org',
            name: 'Jane\'s Walk'
        };
    },

    /**
    * _previewCards
    * Copy a random set of the full walk list into the preview area.
    * Currently hard-codes a maximum preview size of 9 cards.
    *
    * @protected
    * @return void
    */
    _previewCards: function() {
        var shuffledDeck = Array.prototype.slice.call(this._cards).sort( function() { return 0.5 - Math.random(); } ),
        previewNode = document.querySelector(".ccm-block-page-list-walk-filters .walk-preview");

        for(var i = 0, len = Math.min(shuffledDeck.length, 9); i < len; i++) {
            var card = shuffledDeck[i].cloneNode(true);
            previewNode.appendChild(card);
        }
    },

    /**
    * _addLinkListeners
    * Listen on 'show all' walks
    *
    * @protected
    * @return void
    */
    _addLinkListeners: function() {
        var showAll = document.querySelector("a.see-all");
        if(showAll) {
            showAll.addEventListener("click", function() {
                document.querySelector('.ccm-block-page-list-walk-filters').classList.add('filtering');
                showAll.parentNode.removeChild(showAll);
            });
        }
    },

    /**
    * _setupText2DonateInterstitials
    * 
    * @protected
    * @return    void
    */
    _setupText2DonateInterstitials: function() {
        var enabled = false,
            _this = this,
            isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
            hasSeenDonateInterstitial,
            closeCallback,
            url,
            link;
        // Catfish events
        this._element.find('a.closeCatfishCta').click(
            function(event) {
                event.preventDefault();
                _this._element.find('.catfish').hide();

                // Track the closure
                jQuery.cookie(
                    'hasSeenDonateCatfish',
                    '1',
                    {
                        path: '/',
                        domain: location.host
                    }
                );
            }
        );

        // Canadian city check
        if (enabled && isCanadianCity === true) {

            // Modal
            hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null &&
              typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

            // Hasn't yet been seen
            if (hasSeenDonateInterstitial === false) {
                closeCallback = function() {

                    // Track the closure
                    jQuery.cookie(
                        'hasSeenDonateInterstitial',
                        '1',
                        {
                            path: '/',
                            domain: location.host
                        }
                    );

                    // Open the catfish
                    _this._element.find('.catfish.c-donate').removeClass(
                        'hidden'
                    );
                };
                this._element.find('.overlay.o-donate').show();
                this._element.find('.overlay.o-donate .o-background').click(closeCallback);
                this._element.find('a.closeModalCta').click(closeCallback);

                // Already donated flow
                this._element.find('div.btnWrapper a').click(
                    function(event) {

                        // Track the closure
                        jQuery.cookie(
                            'hasSeenDonateInterstitial',
                            '1',
                            {
                                path: '/',
                                domain: location.host
                            }
                        );

                        // Track the closure
                        jQuery.cookie(
                            'hasSeenDonateCatfish',
                            '1',
                            {
                                path: '/',
                                domain: location.host
                            }
                        );

                        // Shout modal
                        event.preventDefault();
                        _this._element.find('.o-donate').hide();
                        _this._element.find('.o-shout').show();

                        // Twitter button
                        _this._element.find('.o-shout .icon-twitter').click(
                            function(event) {
                                event.preventDefault();
                                url = encodeURIComponent(
                                    'http://janeswalk.org/'
                                );
                                text = encodeURIComponent(
                                    $(this).closest('.option').find('.copy').text().trim()
                                );
                                link = 'https://twitter.com/intent/tweet' +
                                    '?url=' + (url) +
                                    '&via=janeswalk' +
                                    '&text=' + (text);
                                window.open(
                                    link,
                                    'Twitter Share',
                                    'width=640, height=320'
                                );
                            }
                        );

                        // Twitter button
                        _this._element.find('.o-shout .icon-facebook').click(
                            function(event) {
                                event.preventDefault();
                                var shareObj = _this._getFacebookDialogDonateObj();
                                shareObj.description = $(this).closest('.option').find('.copy').text().trim();
                                (new FacebookShareDialog(shareObj)).show();
                            }
                        );
                    }
                );
            } else {

                // Catfish
                hasSeenDonateCatfish = jQuery.cookie('hasSeenDonateCatfish') !== null &&
                  typeof jQuery.cookie('hasSeenDonateCatfish') !== 'undefined';

                // Hasn't yet been seen
                if (hasSeenDonateCatfish === false) {
                    this._element.find('.catfish').removeClass('hidden');
                }
            }
        }
    },

    /**
    * _setThemeCounts
    * 
    * @protected
    * @return    void
    */
    _setThemeCounts: function() {
        var _this = this,
            count,
            fe = Array.prototype.forEach,
            el = this._element[0],
            countFilterMatches = function (option, index) {
                var filterCheck = option.getAttribute('value'),
                    // Default to checking option property in filter
                    compare_fn = this.compare_fn || function compareProperty(f,o) { return f[o]; };
                if (filterCheck !== '*') {
                    count = 0;
                    for(var i in _this._data) {
                        if(compare_fn(_this._data[i][this.filter], filterCheck)) {
                            ++count;
                        }
                    }
                    option.textContent += ' (' + count + ')';
                    if (count === 0) {
                        option.parentElement.removeChild(option);
                    }
                }
            };

        fe.call(el.querySelectorAll('div.filters select[name="theme"] option'), countFilterMatches, {filter:'themes'});
        fe.call(el.querySelectorAll('div.filters select[name="accessibility"] option'), countFilterMatches, {filter:'accessibilities'});
        fe.call(el.querySelectorAll('div.filters select[name="ward"] option'), countFilterMatches, {filter:'wards'});
        fe.call(el.querySelectorAll('div.filters select[name="initiative"] option'), countFilterMatches, {filter:'initiatives'});
        fe.call(el.querySelectorAll('div.filters select[name="date"] option'), countFilterMatches, {filter:'datetimes',
            compare_fn: function compareDate(filter, optionValue) { for(var i = 0; i < filter.length; i++) { return filter[i].date.indexOf(optionValue) !== -1;} } 
        });
    },

    /**
    * _resetSelectElements
    * 
    * @protected
    * @return    void
    */
    _resetSelectElements: function() {
        var _this = this;
        this._element.find('div.filters select').each(
            function(index, element) {
                $(element).val('*');
            }
        );
        this._element.find('.initiatives').addClass('hidden');
        this._element.find('.initiative').addClass('hidden');
        this._element.find('#initiative').change(
            function(event) {
                if ($(this).val() !== '#') {
                    _this._element.find('.initiatives').removeClass('hidden');
                    _this._element.find(
                        '[data-jw-initiative="' + ($(this).val()) + '"]'
                    ).removeClass('hidden');
                }
            }
        );
    },

    /**
    * _addCreateWalkEvent
    * 
    * @protected
    * @return    void
    */
    _addCreateWalkEvent: function() {
        var _this = this,
        $btn = this._element.find('.create-walk');
        $btn.click(
            function(event) {
                event.preventDefault();
                if (_this._element.find('a[href="/index.php/login/logout/"]').length === 0) {
                    _this._element.find('.overlay.o-connect').show();
                } else {
                    location.href = $(this).attr('href');
                }
            }
        );
    },

    /**
    * _captureHash
    * 
    * @protected
    * @return    void
    */
    _captureHash: function() {
        var _this = this;
        if (location.hash !== '') {
            pieces = location.hash.replace('#', '').split('&');
            key = '';
            $(pieces).each(
                function(index, piece) {
                    key = '_' + (piece.split('=')[0]);
                    _this[key] = piece.split('=')[1];
                }
            );
            this._filterCards();
            this._element.find('select[name="ward"]').val(this._ward);
            this._element.find('select[name="theme"]').val(this._theme);
            this._element.find('select[name="accessibility"]').val(this._accessibility);
            this._element.find('select[name="initiative"]').val(this._initiative);
            this._element.find('select[name="date"]').val(this._date);
        }
    },

    /**
    * _setHash
    * 
    * @protected
    * @return    void
    */
    _setHash: function() {
        location.hash = 'ward=' + (this._ward) +
            '&theme=' + (this._theme) +
            '&accessibility=' + (this._accessibility) +
            '&initiative=' + (this._initiative) +
            '&date=' + (this._date);
    },

    /**
    * _filterCards
    * 
    * @protected
    * @return    void
    */
    _filterCards: function() {
        var _this = this,
            showing = 0,
            // Returns 'true' if this thing passes through the filter
            filterMatch = function(filter, dataset) {
                return (filter === "*") || (dataset && dataset[filter]);
            },
            i,
            len;

        // Hide the cards first
        for(i = 0, len = this._cards.length; i < len; i++) {
            this._cards[i].classList.add("hidden");
        }
        this._data.forEach(
            function(data, index) {
                // Check if we should show this card
                if(
                    filterMatch(_this._ward, data.wards) &&
                    filterMatch(_this._theme, data.themes) &&
                    filterMatch(_this._accessibility, data.accessibilities) &&
                    filterMatch(_this._initiative, data.initiatives) &&
                    // See if date in filter dropdown is inside the array of dates
                    (function(f, o) {
                        if(o === "*") return true;
                        for(i = 0; i < f.length; i++) { return f[i].date.indexOf(o) !== -1;} 
                    })(data.datetimes, _this._date)
                ) {
                    ++showing;
                    _this._cards[index].classList.remove("hidden");
                }

            }
        );

        // Empty state
        this._element.find('.empty').addClass('hidden');
        if (showing === 0) {
            this._element.find('.empty').removeClass('hidden');
        }
    },

    /**
    * _addFilterEvents
    * 
    * @protected
    * @return    void
    */
    _addFilterEvents: function() {
        var _this = this;
        this._element.find('div.filters select').change(
            function(event) {
                event.preventDefault();
                _this._ward = '*';
                if (_this._element.find('select[name="ward"]').length > 0) {
                    _this._ward = _this._element.find('select[name="ward"]').val();
                }
                _this._theme = '*';
                if (_this._element.find('select[name="theme"]').length > 0) {
                    _this._theme = _this._element.find('select[name="theme"]').val();
                }
                _this._accessibility = '*';
                if (_this._element.find('select[name="accessibility"]').length > 0) {
                    _this._accessibility = _this._element.find('select[name="accessibility"]').val();
                }
                _this._initiative = '*';
                if (_this._element.find('select[name="initiative"]').length > 0) {
                    _this._initiative = _this._element.find('select[name="initiative"]').val();
                }
                _this._date = '*';
                if (_this._element.find('select[name="date"]').length > 0) {
                    _this._date = _this._element.find('select[name="date"]').val();
                }
                _this._setHash();
                _this._filterCards();
            }
        );
    }
});
;
/**
 * HomePageView
 * 
 * @extends PageView
 */
var HomePageView = PageView.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addMapToggleEvents();
        this._addCityLookup();
        this._addBgImage();
        this._addCityDropdownEvent();
        this._addCreateWalkEvent();
    },

    /**
     * _addCreateWalkEvent
     * 
     * @protected
     * @return    void
     */
    _addCreateWalkEvent: function() {
        var _this = this,
            $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
        $btn.click(
            function(event) {
                event.preventDefault();
                if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
                    location.href = $(this).attr('href');
                } else {
                    _this._element.find('.overlay').show();
                }
            }
        );
    },

    /**
     * _addCityDropdownEvent
     * 
     * @protected
     * @return    void
     */
    _addCityDropdownEvent: function() {
        var $select = this._element.find('select.pageListSelect');
        $select.change(
            function(event) {
                location.href = $select.val();
            }
        );
    },

    /**
     * _addBgImage
     * 
     * @protected
     * @return    void
     */
    _addBgImage: function() {
        var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
            $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
            image = document.createElement("img");
        image.onload = function() {
            $backgroundImageBanner.css({
                backgroundImage: 'url(' + (backgroundImageUrl) + ')'
            });
            $backgroundImageBanner.removeClass('faded');
        };
        image.src = backgroundImageUrl;
    },

    /**
     * _addCityCalloutCta
     * 
     * @protected
     * @param     String cityName
     * @param     String cityPath
     * @return    void
     */
    _addCityCalloutCta: function(cityName, cityPath) {
        var $parent = this._element.find('.ccm-page-list-typeahead').first(),
            $wrapper = $('<h3 />'),
            $button = $('<a />');
        $button.attr({
            href: cityPath,
        });
        $button.text(cityName);
        $wrapper.append('See walks in ').append($button).append(', or:');
        $parent.prepend($wrapper);
    },

    /**
     * _addCityButtonCta
     * 
     * @protected
     * @param     String cityName
     * @param     String cityPath
     * @return    void
     */
    _addCityButtonCta: function(cityName, cityPath) {
        var $parent = this._element.find('.calltoaction ul').first(),
            $wrapper = $('<li />'),
            $button = $('<a />');
        $wrapper.attr({
            class: 'cityButtonCta'
        });
        $button.attr({
            class: 'btn btn-primary',
            href: cityPath,
        });
        $wrapper.append($button);
        $button.text('View walks in ' + (cityName));
        $parent.prepend($wrapper);
    },

    /**
     * _addCityLookup
     * 
     * @protected
     * @return    void
     */
    _addCityLookup: function() {
        var _this = this;
        window.freeGeoIpCallback = function(obj) {
            if (typeof obj !== 'undefined') {
                var $cities = _this._element.find(
                        'div.ccm-page-list-typeahead ul li a'
                    ),
                    $city;
                $cities.each(function(index, cityEl) {
                    if ($(cityEl).text() === obj.city) {
                        _this._addCityCalloutCta(obj.city, $(cityEl).attr('href'));
                        _this._addCityButtonCta(obj.city, $(cityEl).attr('href'));
                    }
                });
            }
        };
        if (JanesWalk.user === undefined || JanesWalk.user.city === undefined) {
            $.getScript('http://freegeoip.net/json/?callback=freeGeoIpCallback');
        } else {
            _this._addCityCalloutCta(JanesWalk.user.city.name, JanesWalk.user.city.url);
            _this._addCityButtonCta(JanesWalk.user.city.name, JanesWalk.user.city.url);
        }
    },

    /**
     * _addMapToggleEvents
     * 
     * @protected
     * @return    void
     */
    _addMapToggleEvents: function() {
        var $showButton = this._element.find('.overlap .controls a.showButton'),
            $closeButton = this._element.find('.overlap .controls a.closeButton');
        $showButton.click(
            function() {
                $('.overlap').addClass('fullmap');
                $(this).fadeOut(
                    400,
                    function() {
                        $closeButton.fadeIn();
                    }
                );
                $('html, body').animate(
                    {
                        scrollTop: $(this).offset().top - 100
                    },
                    800
                );
            }
        );
        $closeButton.click(
            function() {
                $('.overlap').removeClass('fullmap');
                $(this).fadeOut(
                    400,
                    function() {
                        $showButton.fadeIn();
                    }
                );
            }
        );
    }
});
;
/**
 * ProfilePageView
 * 
 * @extends PageView
 */
var ProfilePageView = PageView.extend({

    /**
     * _slideIndexes
     * 
     * @protected
     * @var       Object
     */
    _slideIndexes: {
        blogPost: 0,
        city: 0,
        walk: 0
    },

    /**
     * _currentTab
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _currentTab: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
      try { 
        this._super(element);
        this._showProperStep();
        this._addTabClickEvents();
        this._setupDisplayPictureFlashWidget();
        this._addPictureDeleteEvent();
        this._addPromoteWalkClickEvent();
        this._addPromoteCityClickEvent();
        this._addPromoteBlogPostClickEvent();
        this._setupCityPromoteModalEvents();
        this._setupWalkPromoteModalEvents();
        this._setupBlogPostPromoteModalEvents();
        this._setupPromoteSlideshows();
        this._setupTransferWalkEvents();
      } catch(e) {
        console.log("Error initializing profile: " + e);
      }
    },

    /**
     * _addPictureDeleteEvent
     * 
     * @protected
     * @return    void
     */
    _addPictureDeleteEvent: function() {
        this._element.find('a[href="/index.php/profile/delete/"]').click(
            function(event) {
                event.preventDefault();
                $.ajax({
                    type: 'DELETE',
                    url: $(this).attr('href'),
                    success: function() {
                        location.href = '/index.php/profile/#tab=picture&success=1';
                    }
                });
            }
        );
    },

    /**
     * _addPromoteBlogPostClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteBlogPostClickEvent: function() {
        var _this = this,
            $btn = this._element.find('.column.blogPosts .subactions .promote');
        $btn.click(
            function(event) {
                event.preventDefault();
                var blogPostObj = _this._getBlogPostObjById(
                    $(this).data('blogpostid')
                );
                _this._element.find('.blogPostPromoteOverlay .copy').each(
                    function(index, copy) {
                        var $copy = $(copy);
                        $copy.data('blogpostpath', blogPostObj.path);
                        $copy.find('.objTitle').text(blogPostObj.title);
                    }
                );
                _this._element.find('.blogPostPromoteOverlay').show();
            }
        );
    },

    /**
     * _addPromoteCityClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteCityClickEvent: function() {
        var _this = this,
            $btn = this._element.find('#cityBlock .promoteBtn');
        $btn.click(
            function(event) {
                event.preventDefault();
                _this._element.find('.cityPromoteOverlay').show();
            }
        );
    },

    /**
     * _getBlogPostObjById
     * 
     * @protected
     * @param     Number blogPostId
     * @return    void
     */
    _getBlogPostObjById: function(blogPostId) {
        var $link = this._element.find('[data-blogpostid="' + (blogPostId) + '"]');
        return {
            title: $link.first().data('blogposttitle'),
            path: $link.first().data('blogpostpath')
        };
    },

    /**
     * _getWalkObjById
     * 
     * @protected
     * @param     Number walkId
     * @return    void
     */
    _getWalkObjById: function(walkId) {
        var $link = this._element.find('[data-walkid="' + (walkId) + '"]');
        return {
            title: $link.first().data('walktitle'),
            path: $link.first().data('walkpath')
        };
    },

    /**
     * _addPromoteWalkClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteWalkClickEvent: function() {
        var _this = this,
            $btn = this._element.find(
                '.column.city .subactions .promote,' +
                '.column.walks .subactions .promote'
            );
        $btn.click(
            function(event) {
                event.preventDefault();
                var walkObj = _this._getWalkObjById($(this).data('walkid'));
                _this._element.find('.walkPromoteOverlay .copy').each(
                    function(index, copy) {
                        var $copy = $(copy);
                        $copy.data('walkpath', walkObj.path);
                        $copy.find('.objTitle').text(walkObj.title);
                    }
                );
                _this._element.find('.walkPromoteOverlay').show();
            }
        );
    },

    /**
     * _addTabClickEvents
     * 
     * @protected
     * @return    void
     */
    _addTabClickEvents: function() {

        // Nav tabs
        var _this = this;
        this._element.find('ul.nav-tabs li a').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );

        // Stand alone links
        this._element.find('.tabLink').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );
    },

    /**
     * _setupBlogPostPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupBlogPostPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + ($copy.data('blogpostpath')),
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + ($copy.data('blogpostpath')),
                    'Jane\'s Walk',
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
                    $copy.text().trim()
                );
            }
        );
    },

    /**
     * _setupCityPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupCityPromoteModalEvents: function() {
        var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
            cityName = this._element.find('.cityPromoteOverlay').data('cityname');
        var _this = this;
        this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + (cityPath),
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + (cityPath),
                    'Jane\'s Walk',
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (cityName),
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
    },

    /**
     * _setupTransferWalkEvents
     *
     * @protected
     * @return  void
     */
    _setupTransferWalkEvents: function() {
      var _this = this;
      // Set the requests when clicking the modal links
      this._element.find('#walk-transfer .users a').click(
        function(event) {
          event.preventDefault();
          $.get(
            this.getAttribute('href'),
            function(data) {
              if (data.error) {
                // TODO: alerts are lame. Find a proper area for messaging
                alert(data.error);
              } else {
                // Just refresh the page for now
                window.location = window.location;
              }
            }
          );
        }
      );

      // Set the 'transfer' buttons in the walks columns
      this._element.find('a.transfer').removeClass('hidden').click(
        function(event) {
          event.preventDefault();
          var modal = _this._element.find('#walk-transfer'),
            href = this.getAttribute('href'),
            links = modal.find('.users a');
          for (var i = 0, len = links.length; i < len; i++) {
            links[i].setAttribute('href', href + 'transfer/' + links[i].getAttribute('data-uid'));
          }
          modal.modal();
        }
      );
    },
            

    /**
     * _setupDisplayPictureFlashWidget
     * 
     * @protected
     * @return    void
     */
    _setupDisplayPictureFlashWidget: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
        bgcolor: '#ffffff',
        wmode: 'transparent',
        quality: 'high' 
      },
      flashvars = {
        width: this._element.find('#flashContainer').attr('data-width'),
        height: this._element.find('#flashContainer').attr('data-height'),
        image: this._element.find('#flashContainer').attr('data-imagepath'),
        save: this._element.find('#flashContainer').attr('data-savepath')
      };
      if(typeof swfobject !== "undefined") {
        swfobject.embedSWF(
          this._element.find('#flashContainer').attr('data-flashpath'),
          'flashContainer',
          '500',
          '400',
          '10,0,0,0',
          'includes/expressInstall.swf',
          flashvars,
          params
        );
      }
    },

    /**
     * _showSlide
     * 
     * @protected
     * @param     String slideshowName
     * @return    void
     */
    _showSlide: function(slideshowName) {
        var index = this._slideIndexes[slideshowName],
            $overlay = this._element.find('[data-slideshow="' + (slideshowName) + '"]'),
            $options = $overlay.find('.options .option');
        $options.addClass('hidden');
        $($options[index]).removeClass('hidden');
    },

    /**
     * _setupPromoteSlideshows
     * 
     * @protected
     * @return    void
     */
    _setupPromoteSlideshows: function() {
        var _this = this;
        this._element.find('.promoteOverlay .nav > a.left').click(
            function(event) {
                event.preventDefault();
                var $anchor = $(this),
                    slideshow = $anchor.data('slideshow'),
                    $overlay = $anchor.closest('.promoteOverlay'),
                    numOptions = $overlay.find('.options .option').length,
                    $options = $overlay.find('.options .option');
                if (_this._slideIndexes[slideshow] === 0) {
                    _this._slideIndexes[slideshow] = numOptions - 1;
                } else {
                    --_this._slideIndexes[slideshow];
                }
                _this._showSlide(slideshow);
            }
        );
        this._element.find('.promoteOverlay .nav > a.right').click(
            function(event) {
                event.preventDefault();
                var $anchor = $(this),
                    slideshow = $anchor.data('slideshow'),
                    $overlay = $anchor.closest('.promoteOverlay'),
                    numOptions = $overlay.find('.options .option').length,
                    $options = $overlay.find('.options .option');
                if (_this._slideIndexes[slideshow] === (numOptions - 1)) {
                    _this._slideIndexes[slideshow] = 0;
                } else {
                    ++_this._slideIndexes[slideshow];
                }
                _this._showSlide(slideshow);
                
            }
        );
    },

    /**
     * _setupWalkPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupWalkPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + ($copy.data('walkpath')),
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + ($copy.data('walkpath')),
                    'Jane\'s Walk',
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
                    $copy.text().trim()
                );
            }
        );
    },

    /**
     * _showCurrentTab
     * 
     * @protected
     * @return    void
     */
    _showCurrentTab: function() {
        this._element.find('ul.nav-tabs li.active').removeClass('active');
        this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
        this._element.find('div.content div.block').addClass('hidden');
        this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
        location.hash = 'tab=' + (this._currentTab);
    },

    /**
     * _showEmailShareWindow
     * 
     * @protected
     * @param     String subject
     * @param     String body
     * @return    void
     */
    _showEmailShareWindow: function(subject, body) {
        subject = encodeURIComponent(subject);
        body = encodeURIComponent(body);
        var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
        window.open(link);
    },

    /**
     * _showFacebookShareWindow
     * 
     * @protected
     * @param     String link
     * @param     String title
     * @param     String text
     * @return    void
     */
    _showFacebookShareWindow: function(link, title, text) {
        (new FacebookShareDialog({
            link: link,
            name: title,
            description: text
        })).show();
    },

    /**
     * _showProperStep
     * 
     * @protected
     * @return    void
     */
    _showProperStep: function() {
        if (location.hash !== '') {
            var pieces = location.hash.split('&'),
                hash = {},
                again;
            $(pieces).each(
                function(index, piece) {
                    again = piece.split('=');
                    hash[again[0].replace('#', '')] = again[1];
                }
            );
            this._currentTab = hash.tab;
            this._showCurrentTab();
            if (
                typeof hash.success !== 'undefined' &&
                parseInt(hash.success) === 1
            ) {
                this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
            }
        }
    },

    /**
     * _showTwitterShareWindow
     * 
     * @protected
     * @param     String link
     * @param     String text
     * @return    void
     */
    _showTwitterShareWindow: function(link, text) {
        link = encodeURIComponent(link);
        text = encodeURIComponent(text);
        if (text.length > 130) {
            text = text.substring(0,130) + '...';
        }
        link = 'https://twitter.com/intent/tweet' +
            '?url=' + (link) +
            '&via=janeswalk' +
            '&text=' + (text);
        window.open(
            link,
            'Twitter Share',
            'width=640, height=320'
        );
    }
});
;
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
          markerContent = "<button class='btn pull-right' id='delete-marker'><i class='icon-trash'><i></button>";
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
;// New Session Popover

$.paramsURL = function(param_name){
  var value = new RegExp('[\\?&]' + param_name + '=([^&#]*)').exec(window.location.href);
  if (value !== null) {
    return value[1];
  }
};

// Time Convert
function timeConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

var dateSelected = [];
window.jwMap = {}; // Not ideal, but keep for now until I can localize this.

// Typeahead team members
$.fn.teamTypeahead = function() {
  this.autocomplete({
    name: 'team-member',
    remote: { url: '/api/walk_leaders?q=%QUERY', rateLimitWait: 100 },
    valueKey: 'first_name',
    template: function(datum) {
      return "<div class='datum'>" + (datum.avatar ? "<div style='background:url(" + datum.avatar + ")'></div>  " : "") + datum.first_name + " " + datum.last_name + (datum.city_name ? ", " + datum.city_name : "") + "</div>";
    },
  }).on('typeahead:selected', function (object, datum) {
    var teamMember = $(this).parents(".team-member").first();
    $('input[name=user_id\\[\\]]', teamMember).val(datum.user_id);
    if(!datum.last_name) {
      var twoNames = teamMember.first_name.split(' ');
      $('input[name=name-first\\[\\]]', teamMember).val(twoNames[0]);
      $('input[name=name-last\\[\\]]', teamMember).val(twoNames[1]);
    } else {
      $('input[name=name-first\\[\\]]', teamMember).val(datum.first_name);
      $('input[name=name-last\\[\\]]', teamMember).val(datum.last_name);
    }
    if(datum.facebook)
      $('#facebook', teamMember).val(datum.facebook);
    if(datum.twitter)
      $('input[name=twitter\\[\\]]', teamMember).val(datum.twitter);
    if(datum.website)
      $('input[name=website\\[\\]]', teamMember).val(datum.website);
    if(datum.bio)
      $('textarea[name=bio\\[\\]]', teamMember).text(datum.bio);
  });
};

window.Janeswalk = {
  initialize: function() {
    // Append html
    if ($('body').hasClass('index')) {
      $('html').addClass('index-bg');
    }

    // Date Picker

    var defaultDate = JanesWalk.form.datepicker_cfg.defaultDate;

    // Defaults
    JanesWalk.form.datepicker_cfg.beforeShowDay =
      function (date) {
        var date_utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        var dateFormatted = date.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        if ($.inArray(dateFormatted, dateSelected) != -1) {
          return [
            true, // disabled
            'selected' // classes
          ];
        }
        return [true, ''];
      };
    JanesWalk.form.datepicker_cfg.minDate = new Date();
    JanesWalk.form.datepicker_cfg.maxDate = new Date("May 23, 2020");
    JanesWalk.form.datepicker_cfg.defaultDate = new Date();



    // Note: $.datepicker.formatDate( "MM d, yy", defaultDate); also works.
    // Avoid including whole libs for one-offs, e.g. moment()
    $('.date-indicate-all, .date-indicate-set').
      html(defaultDate.toLocaleString('en-US', {year: "numeric", month: "long", day: "numeric"})).
      attr('data-dateselected', defaultDate);

    $('.date-picker').datepicker(JanesWalk.form.datepicker_cfg).on('changeDate', function(e){
      $('#walk-time').timepicker('remove');
      dateObject = moment(e.date).format('MMMM D, YYYY');
      dateObjectFormatted = moment(e.date).format('YYYY-MM-DD');
      $('.date-indicate-all, .date-indicate-set').html(dateObject).attr('data-dateselected',dateObjectFormatted);
      // Special-case any dates that are set
      // TODO: move to a consistent datetimepicker, or at least not bootstrap datepicker + jquery timepicker
      if (JanesWalk.form[dateObjectFormatted] !== undefined) {
        $('#walk-time').timepicker(JanesWalk.form[dateObjectFormatted].timepicker_cfg);
      } else if (typeof JanesWalk.form.timepicker_cfg !== 'undefined') {
        $('#walk-time').timepicker(JanesWalk.form.timepicker_cfg);
      }
    });

    $('#save-date-set').on('click', function(){
      var selectedDate = $('.date-indicate-set').text();
      var selectedTime = timeConvert($('#walk-time').val());
      var selectedDuration = $('#time-and-date-set #walk-duration').val();
      addDateSet(selectedDate, selectedDuration, selectedTime);
    });

    $('#save-date-all').on('click', function(){
      var selectedDate = $('.date-indicate-all').text();
      var selectedDuration = $('#time-and-date-all #walk-duration').val();
      var selectedDateFormatted = $('.date-indicate-all').attr('data-dateselected');
      addDateAll(selectedDate, selectedDuration, selectedDateFormatted);
      
      // Disable date in calendar widget
      dateSelected.push(selectedDateFormatted);

    });

    // Clear on switch over
    $('.clear-date').on('click', function(){
      dateSelected = [];
      $('#block-select li').removeClass('active');
      $('#date-list-all tbody, #date-list-set tbody').html('');
      $('.date-picker').datepicker('update');
    });

    $('#date-list-all tbody, #date-list-set tbody').on('click', '#remove-date', function(event){
      $(this).parentsUntil('tbody').remove();
      for (var i = 0; i < dateSelected.length; i++) {
        if (dateSelected[i] === $(this).data('datedelete')) {
          dateSelected.splice(i);
        }
      }
      return false;
    });

    // Only allow duration set 
    // $('[type="checkbox"][name="open"]').on('click', function(){
    //   if ($(this).)
    // });

    $('[type="checkbox"][name="open"]').change(function(){
      if ($(this).prop('checked') === true) {
        console.log('adad');
        $('#time-and-date-all .date-select-group').hide();
        $('#time-and-date-all .date-picker').css({'opacity':'0.25'});
      } else {
        $('#time-and-date-all .date-select-group').show();
        $('#time-and-date-all .date-picker').css({'opacity':'1'});
      }
    });


    // Form validation & Walkthrough
    // This only works in description for now

    $('.section-save').on('click', function(event){

      var invalidFields = $(this).parentsUntil('.main-panel').find('*:invalid').length;
      var themeSelect = $(this).parentsUntil('.main-panel').find('#theme-select input:checked').length;

      // Validation is limited to Description for now.

      if ($('.page-header').data('section') === 'description') { 

        if (invalidFields === 0 && themeSelect !== 0) {
          // When the form validates
          $('#progress-panel').find('.active a .status').remove();
          $('#theme-select .alert').removeClass('alert-error').addClass('alert-info');
          $('#progress-panel .active a i.warning').remove();
          $('#progress-panel').find('.active a').removeClass('error');
          $('#progress-panel').find('.active a').append(' <i class="icon-check-sign complete status"></i>').addClass('complete');

          // $('#progress-panel li.active').next().addClass('active');

          // var url = $(this).data('next')+'.html';
          // $.pjax({url:url,container:'#main-panel',fragment:'#main-panel'});

          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');

          event.preventDefault();
        } else if (themeSelect === 0) {
          $('#progress-panel').find('.active a .status').remove();
          $('#progress-panel .active a i.complete').remove();
          $('#progress-panel').find('.active a').removeClass('complete');
         // $('#progress-panel').find('.active a').append(' <i class="icon-warning-sign warning status"></i>').addClass('error');
          $('#theme-select .alert').removeClass('alert-info').addClass('alert-error');
          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');
          event.preventDefault();
        } else {
          $('#progress-panel').find('.active a .status').remove();
          $('#progress-panel .active a i.complete').remove();
          $('#progress-panel').find('.active a').removeClass('complete');
         // $('#progress-panel').find('.active a').append(' <i class="icon-warning-sign warning status"></i>').addClass('error');
          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');
        }
      }
    });

    // Adding New Team Members 
    $('#add-member').on('click', 'section', function(){
      var newTarget = $(this).data('new');
      addMember(newTarget, function(){
        $('body').animate({ scrollTop: $('.new').last().offset().top-80 }, 1000);
      });
    });

    $('footer').on('click', '.remove-team-member, .remove-othermember', function() {
      $(this).parentsUntil('#walk-members').remove();
    });

    // Primary Walk Leader expose
    $('#role').change(function(){
      if ($(this).val() == "co-walk-leader") {
        $('#primary-walkleader-select').removeClass('hide');
      } else {
        $('#primary-walkleader-select').addClass('hide');
      }
    });

    // Notifications
    // Previewing Button
    $('#preview-walk').on('click', function(){
      $('#preview-modal').find('iframe').prop('src', previewUrl);
      $('#preview-modal').modal('show');
    });

    // Publish Walk Button
    $('#btn-submit').on('click', function(){
      $('#publish-warning').modal();
    });

    // Theme selection limiting
    $('#theme-select input[type=checkbox]').on('click', function(){
      if ($('#theme-select input[type=checkbox]:checked').length > 2) {
        $("#theme-select input[type=checkbox]:not(:checked)").prop('disabled', true);
      } else {
        $("#theme-select input[type=checkbox]:not(:checked)").prop('disabled', false);
      }
    });

    // Adding Resource
    $('#add-resource').on('click', function(event){
      var obj = addResource();
      // $('body').animate({ scrollTop: $('.new').last().offset().top-80 }, 1000);
      return false;
    });

    $('footer').on('click', '.remove-resourceitem', function() {
      $(this).parentsUntil('#resource-list').remove();
      return false;
    });


    // New Session Populate
    var walkTitle = $.paramsURL('title');
    var walkDescription = $.paramsURL('description');
    if (walkTitle) {
      $('#title').val(unescape(walkTitle));      
    }
    if (walkDescription) {
      $('#shortdescription').html(unescape(walkDescription));
    }

    // Time Picker
    $('#walk-time').timepicker(JanesWalk.form.timepicker_cfg);
    $('#walk-time').timepicker('setTime', JanesWalk.form.timepicker_cfg.defaultTime); // workaround for timepicker bug

    // Save Handler
    // Populate data if available
    // This data could be in the dom, or the url to the data could be in the dom as a js var, this example (/form.html?load=/js/sample.json) loads it from a url param
    var newPage = false;
    var dataUrl = $(".pagejson").data("url");
    var previewUrl = $(".pagejson").data("url");
    dataUrl += (dataUrl.indexOf("?") >= 0 ? "&" : "?") + "format=json";

    var notify_success = function() {
      $('body').append('<div class="alert alert-success" id="save-notify">Walk Saved</div>');
      setTimeout( function() {
        $('#save-notify').fadeOut('slow', function(){
          $(this).remove();
          });
        },2000);
    };
    var notify_error = function(error) {
      $('body').append('<div class="alert alert-error" id="save-notify">' + error.responseText + '</div>');
      setTimeout( function() {
        $('#save-notify').fadeOut('slow', function(){
          $(this).remove();
          });
        },2000);
    };

    $('.save, .btn-preview, .section-save').on('click', function(e){
      // Run validation first?
      $.ajax({
        type: "PUT",
        url: dataUrl,
        data: {json: JSON.stringify( JaneswalkData.build() )},
        success: notify_success,
        error: notify_error
        });
    });
    $('.btn-submit').click(function(e){
      $.ajax({
        type: "POST",
        url: dataUrl,
        data: {json: JSON.stringify( JaneswalkData.build() )},
        success: function() { console.log("Published Walk"); }
        });
      });
    if(JanesWalk.form.data) {
      JaneswalkData.fill(JanesWalk.form.data);
      console.log("Loaded data locally");
    } else if (dataUrl){
      console.log("Remote fetching data");
      // $('.progress-spinner').spin(spinProperties); TODO: replace with standard fontawesome spinner
      $.getJSON(dataUrl, function(data){
        JaneswalkData.fill(data);
      })
      .fail(function(){
        console.log("server error");
      })
      .always(function(){
      });
    }
  }
};

function addMember(newTarget, callback){
  var obj = $('#'+newTarget).clone(true,true).appendTo('#walk-members').addClass('new useredited').show();
  $("#name",obj).teamTypeahead();
  if (callback){
    callback();
  }
  return obj;
}

function addDateSet(selectedDate, selectedDuration, selectedTime){
  var inputs = '<input type="hidden" name="date-date[]" value="'+selectedDate+'">'+
  '     <input type="hidden" name="date-time[]" value="'+selectedTime+'">'+
  '     <input type="hidden" name="date-duration[]" value="'+selectedDuration+'">';
  var dateRow = '<tr><td>'+inputs+'<strong>'+selectedDate+'</strong></td><td>'+selectedTime+'</td><td><a href="#" id="remove-date"><i class="icon-remove"></i> Remove</a></td></tr>';
  $('#date-list-set tbody').append(dateRow);
}

function addDateAll(selectedDate, selectedDuration, selectedDateFormatted){
  var inputs = '<input type="hidden" name="date-date[]" value="'+selectedDate+'">'+
  '     <input type="hidden" name="date-duration[]" value="'+selectedDuration+'">';
  var dateRow = '<tr><td>'+inputs+'<strong>'+selectedDate+'</strong></td><td>'+selectedDuration+'</td><td><a href="#" id="remove-date" data-datedelete="'+selectedDateFormatted+'"><i class="icon-remove"></i> Remove</a></td></tr>';
  $('#date-list-all tbody').append(dateRow);
}

function addResource(){
  var obj = $('.resource-item-new.hide').clone(true,true).appendTo('#resource-list').addClass('new').removeClass('hide');
  return obj;
}

var globalThumbId;

// Data
var JaneswalkData = {
  description: ['title','shortdescription', 'longdescription'],
  accessible: ['accessible-info', 'accessible-transit', 'accessible-parking', 'accessible-find'],
  data: {},
  build: function() {
    this.dataSet= {};
    var self = this,
      name,
      value,
      file,
      desc;

    // Description
    $.each(this.description, function(key, value){
      self.dataSet[value] = $('[name="'+value+'"]').val();
    });

    // Theme checkboxes
    self.dataSet.checkboxes = {};
    $('[type="checkbox"][name^="theme-"]').each(function(){
      name = $(this).attr('name');
      value = $(this).prop('checked');
      self.dataSet.checkboxes[name] = value;
    });

    // Resources
    self.dataSet.resources = {};
    $('.resource-item, .resource-item-new').not('.hide').each(function(key, value){
      file = $(this).find('[name="resource-file[]"]').val();
      title = $(this).find('[name="resource-title[]"]').val();
      desc = $(this).find('[name="resource-description[]"]').val();
      self.dataSet.resources[key] = {file: file, title: title, description: desc};
    });

    // Wards
    self.dataSet.wards = $("#ward").val();

    // Map
    self.dataSet.map = {};
    self.dataSet.map.markers = {};
    $.each(jwMap.markers, function(key, val){
      self.dataSet.map.markers[key] = {
        title: val.title,
        description: val.description,
        questions: val.questions,
        style: val.style,
        lat: val.getPosition().lat(),
        lng: val.getPosition().lng()
      };
    });
    self.dataSet.map.route = {};
    $.each(jwMap.point, function(key, val){
      self.dataSet.map.route[key] = {
        lat: val.getPosition().lat(),
        lng: val.getPosition().lng(),
        title: val.title
      };
    });

    // Time - get type, and then get list of slots
    self.dataSet.time = {};
    self.dataSet.time.slots = {};
    if ($('#time-and-date-all').hasClass('active')){
      self.dataSet.time.type = 'all';
      self.dataSet.time.open = $('[type="checkbox"][name="open"]').prop('checked');
      $('#date-list-all tbody tr').each(function(key, value){
        self.dataSet.time.slots[key] = {date: $(this).find('[name="date-date[]"]').val(), duration: $(this).find('[name="date-duration[]"]').val()};
      });
    } else if ($('#time-and-date-set').hasClass('active')){
      self.dataSet.time.type = 'set';
      $('#date-list-set tbody tr').each(function(key, value){
        self.dataSet.time.slots[key] = {date: $(this).find('[name="date-date[]"]').val(), time: $(this).find('[name="date-time[]"]').val(), duration: $(this).find('[name="date-duration[]"]').val()};
      });
    } else {
      self.dataSet.time.type = false;
    }

    // Accessible
    $.each(this.accessible, function(key, value){
      self.dataSet[value] = $('[name="'+value+'"]').val();
    });

    // Accessible checkboxes
    $('[type="checkbox"][name^="accessible-"]').each(function(){
      name = $(this).attr('name');
      value = $(this).prop('checked');
      self.dataSet.checkboxes[name] = value;
    });

    // Team
    self.dataSet.team = {};
    var member;
    $('.team-member.useredited').each(function(key, val){
      var phone1 = $(this).find('[name="phone-1[]"]').val(),
        phone2 = $(this).find('[name="phone-2[]"]').val(),
        phone3 = $(this).find('[name="phone-2[]"]').val();

      member = {
        'user_id': $(this).find('[name="user_id[]"]').val(),
        'type': $(this).find('[name="type[]"]').val(),
        'profile-photo': $(this).find('[name="profile-photo[]"]').val(),
        'name-first': $(this).find('[name="name-first[]"]').val(),
        'name-last': $(this).find('[name="name-last[]"]').val(),
        'role': $(this).find('[name="role[]"]').val(),
        'primary': $(this).find('[name="primary[]"]').val(),
        'bio': $(this).find('[name="bio[]"]').val(),
        'twitter': $(this).find('[name="twitter[]"]').val(),
        'facebook': $(this).find('[name="facebook[]"]').val(),
        'website': $(this).find('[name="website[]"]').val(),
        'email': $(this).find('[name="email[]"]').val(),
        'institution': $(this).find('[name="institution[]"]').val()
      };

      if (phone1 !== undefined && phone2 !== undefined && phone3 !== undefined){
        member.phone = $(this).find('[name="phone-1[]"]').val()+'-'+$(this).find('[name="phone-2[]"]').val()+'-'+$(this).find('[name="phone-3[]"]').val();
      } else {
        member.phone = false;
      }

      self.dataSet.team[key] = member;
    });

    self.dataSet.thumbnail_id = globalThumbId;

    console.log(this.dataSet);
    console.log(JSON.stringify(this.dataSet));
    return this.dataSet;
  },

  fill: function(data){
    this.data = data;
    // Standard fields
    for(var key in data) {
      var obj = $('[name="'+key+'"]');
      if (obj.length > 0){
        if (obj.is('textarea')){
          obj.html(data[key]);
          if (key === 'longdescription'){
            // $('#longdescription').data("wysihtml5").editor.setValue(data[key]);
          }
        } else {
          obj.val(data[key]);
        }
      }
      else if(key === 'thumbnail_id' && data[key]) {
        var thumbLoad = $("iframe.walkphotos");
        var ifUrl = thumbLoad.attr('src');
        ifUrl = ifUrl.substring(0, ifUrl.indexOf("tools")) + "tools/files/importers/quick?fID=" + data[key];
        globalThumbId = data[key];
        thumbLoad.attr('src',ifUrl);
      }
    }

    // Checkboxes
    if (typeof(data.checkboxes) !== "undefined"){
      $.each(data.checkboxes, function(key, val){
        var obj = $('[name="'+key+'"]');
        if (obj.length > 0){
          obj.prop('checked', val);
        }
      });
    }

    // Resources
    if (typeof(data.resources) !== "undefined"){
      $.each(data.resources, function(key, val){
        var newObj = addResource();
        $.each(val, function(key, val){
          if (key != 'file'){
            newObj.find('[name="resource-'+key+'[]"]').val(val);
          } else {
            // format file box if file already exists
          }
        });
      });
    }

    // Time and Date
    if (typeof(data.time.type) != "undefined" && data.time.type !== false){

      if (data.time.type == 'all'){
        $('a[href="#time-and-date-all"]').tab('show');
      } else {
        $('a[href="#time-and-date-set"]').tab('show');
      }
      
      $.each(data.time.slots, function(key, val){
        if (data.time.type == 'all'){
          addDateAll(val.date, val.duration, val.time);
        } else {
          addDateSet(val.date, val.duration, val.time);
        }
      });
    }

    // Team
    if (typeof(data.team) !== "undefined"){
      $.each(data.team, function(key, member){
        var newTarget,
        obj;
        // you, leader, organizer, community, volunteer
        if (member.type === 'you'){
          obj = $('#walk-leader-me');
        } else if (member.type === 'leader'){
          newTarget = 'walk-leader-new';
          obj = addMember(newTarget);
        } else if (member.type === 'organizer'){
          newTarget = 'walk-organizer-new';
          obj = addMember(newTarget);
        } else if (member.type === 'community'){
          newTarget = 'community-voice-new';
          obj = addMember(newTarget);
        } else if (member.type === 'volunteer'){
          newTarget = 'othermember-new';
          obj = addMember(newTarget);
        }
        JaneswalkData.teamPopulate(member, obj);
      });
    }
  },

  mapPopulate: function(jwMap) {
    if (this.data.map && typeof(this.data.map) !== "undefined"){
      if (this.data.map.markers && typeof(this.data.map.markers) !== "undefined"){
        $.each(this.data.map.markers, function(key, marker){
          if(marker.lat && marker.lng) {
            if (marker.style == 'meeting'){
              jwMap.addmeetingplace(null, marker.title, marker.description, marker.lat, marker.lng);
            } else {
              jwMap.addmarker(null, marker.title, marker.description, marker.questions, marker.lat, marker.lng);
            }
          }
        });
      }
      if (this.data.map && typeof(this.data.map.route) !== "undefined"){
        $.each(this.data.map.route, function(key, point){
          jwMap.addlines(null, point.title, point.lat, point.lng);
        });
      }
      jwMap.centerRoute();
    }
  },

  teamPopulate: function(data, target){
    $.each(data, function(key, val){
      var obj = $(target).find('[name="'+key+'[]"]');
      if (obj.length > 0 && (obj.is("input") && (obj.attr("type") === "text" || obj.attr("type") == "email")) || obj.is("textarea") || obj.is("select")){
        obj.val(val).change();
      } else if (obj.length > 0 && obj.is("input") && obj.attr("type") == "checkbox"){
        obj.prop("checked", val);
      }

      if (key == "phone" && val !== false){
        $(target).find('[name="phone[]"]').val(val);
      }
    });
  }
};

// On page load
document.addEventListener("DOMContentLoaded", function() {
  if (document.body.dataset.pageviewname === 'CreateWalkView') {
    // TODO: Update MCE version after c5.7 upgrade
    // Put special code to init separately if a tab isn't shown here.
    // On old tinyMCE, it's 100x100px otherwise.
    $('.tab-pane').attr('style', 'display:block;z-index:-99999;');
    tinyMCE.init({
      mode: 'textareas',
      theme: 'advanced',
      theme_advanced_toolbar_location: 'top',
      theme_advanced_toolbar_align: 'left',
      theme_advanced_buttons1: 'bold,italic,underline,separator,bullist,numlist',
      theme_advanced_buttons2: '',
      theme_advanced_buttons3: '',
      oninit: function() { $('.tab-pane').attr('style', ''); }
    });

    // Set DOM listener on page load.
    if ($('#map-canvas').length > 0) {
      jwMap = new MapEditor(JanesWalk);
      JaneswalkData.mapPopulate(jwMap);
    }

    // Scroll top on tab change 
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
      $('body').scrollTop(0);
      $('.walk-submit').addClass('hide');
    });

    $('a[href="#route"][data-toggle="tab"]').on('shown.bs.tab', function(e) {
      google.maps.event.trigger(jwMap.map, 'resize');
      jwMap.centerRoute();
    });

    Janeswalk.initialize();
  }
});

;/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
document.addEventListener('DOMContentLoaded', function() {
  var pageViewName = document.body.getAttribute('data-pageViewName');

  if (pageViewName) {
    // The pageViewName class gets loaded from the globally-defined class
    // This is a PHP-ish approach to OO, and classes themselves (not their
      // objects) are the only things that should be declared globally.
      try {
        // FIXME: I'm not in-love with such a heavy jQuery reliance
        new window[pageViewName]($(document.body))
      } catch(e) {
        console.log('Error instantiating page view ' + pageViewName + ': ' + e);
      }
  } else {
    console.log('No page view defined.');
  }

  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener("keyup", function(ev) {
      /* Don't capture inputs going into a form */
      if(ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch(String(ev.key || (ev.keyCode && String.fromCharCode(ev.keyCode)) || ev.char).toUpperCase()) {
          case "M":
            if (toolbar.style) {
              if (toolbar.style.zIndex == 99999) {
                toolbar.style.zIndex = -1;
              } else {
                toolbar.style.zIndex = 99999;
              }
            }
            break;
          default:
            break;
        }
      }
    });
  }

});
