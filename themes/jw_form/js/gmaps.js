//
// Use bindTo to allow dynamic drag of markers to refresh poly.
//

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
}
MVCArrayBinder.prototype.set = function(key, val) {
  if (!isNaN(parseInt(key))){
    this.array_.setAt(parseInt(key), val);
  } else {
    this.array_.set(key, val);
  }
}

var JaneswalkMapEditor = Class.extend({
  map: {},
  markers: [],
  poly: {},
  point: [],
  userLocation: false,

  infowindow: new google.maps.InfoWindow(),

  pathMarker: new google.maps.MarkerImage('/img/path.marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    null, 
    // The origin for this image is 0,0.
    new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(8, 10)
  ),

  stopMarker: {
    url: '../../../img/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  },

  init: function(element) {
    var _this = this; // Set to the editor class, for use in functions
    this._element = element;

    // Map Style array for styling.
    var styles = [
      {
        "featureType": "poi.business",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ];

    // Geocode early, so we don't have to wait for it later
    window.freeGeoIpCallback = function(obj) {
      _this.userLocation = new google.maps.LatLng(obj.latitude, obj.longitude);
    };
    /* Geocode based on IP and center map */
    $.getScript("http://freegeoip.net/json/?callback=freeGeoIpCallback");

    var styledMap = new google.maps.StyledMapType(styles, {
      name: 'Styled Map'
    });

    // Map Options.
    var mapOptions = {
      zoom: 15,
      scrollwheel: false,
      rotateControl: true,
      center: new google.maps.LatLng(JanesWalk.city.lat, JanesWalk.city.lng ),
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
      }
    };

    // Create new map in the DOM.
    _this.map = new google.maps.Map(document.querySelector(element), mapOptions);

    // Set Map style.
    _this.map.setOptions({styles: styles});

    $('#route-stops').on('click','a',function(event){
      marker = _this.markers[$(this).data('stop')];
      google.maps.event.trigger(marker, 'click');
    });

    // Polylines
    _this.initPoly();

    // Click event to add stops
    $('#addpoint').on('click', function() {
      _this.addmarker();
      google.maps.event.trigger(_this.markers[_this.markers.length-1], 'click');
    });

    // 
    function HomeControl(controlDiv, map) {

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
    }

    // Create button
    var homeControlDiv = document.createElement('div'),
      homeControl = (new HomeControl(homeControlDiv, _this.map));
    homeControlDiv.index = 1;
    _this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

    // Click event to add meeting place
    $('#addmeetingplace').on('click', function() {
      _this.addmeetingplace();
      google.maps.event.trigger(_this.markers[_this.markers.length-1], 'click');
    });

    // Click event to add stops
    $('.clear-route').on('click', function(event) {
      var x = window.confirm('Do you want to remove your walk route? Your Stops will not be deleted.');
      if (x) {
        _this.clearRoute();
      }
      event.preventDefault();
    });

    // Hook up click controls for map
    $('#addroute').on('click', function(){
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
  },

  pathSet: function() {
    var path = this.poly.getPath();
    var len = path.getLength();
    var coordStr = "";
    for (var i=0; i<len; i++) {
      coordStr += path.getAt(i).toUrlValue(6);
    }
    console.log(coordStr);
  },

  addmarkerListener: function(marker) {
    var _this = this;
    _this.map.panBy(0,-20);
    marker.listener = google.maps.event.addListener(marker, 'click', function() { 
      var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Title of this stop'><br><textarea class='marker-description box-sizing' placeholder='Description of this stop'>"+marker.description+"</textarea><br><textarea class='marker-questions box-sizing' placeholder='A few questions for participants'>"+marker.questions+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Stop</button> <button class='btn' id='delete-marker'>Delete</button></div>";
      _this.infowindow.setContent(markerForm);
      _this.infowindow.open(_this.map,marker);
      _this.deleteMarkerButton(marker);
      _this.saveMarkerButton(marker);
    });
  },

  // Render Route Table
  updateChart: function() {
    $('#route-stops tbody').empty();
    for (var i = 0; i < this.markers.length; i++) {
      $('#route-stops tbody').append('<tr><td>'+this.markers[i].title+'</td><td>'+this.markers[i].description+'</td><td><a class="delete-stop" href="#map-canvas" data-stop='+i+'>Edit</a></td></tr>');
    }
  },

  /* Add content functions
  * Functions here create content: add lines, points, etc.
  */
  addlines: function(event, title, lat, lng) {
    var position;
    var visible;
    var _this = this;
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
  },

  addmeetingplace: function(latilongi, title, description, lat, lng) {
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

    var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' placeholder='Name of your meeting place' class='marker-title'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";

    if (!lat){
      _this.infowindow.setContent(markerForm);
      _this.infowindow.open(_this.map, marker);
    } else {
      _this.markers.push(marker);
      $('#addmeetingplace').prop('disabled', true);
    }

    google.maps.event.addListener(marker, 'click', function() {    
      var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Name of your meeting place'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";
      _this.infowindow.setContent(markerForm);
      _this.map.panTo(marker.getPosition());
      _this.infowindow.open(_this.map,marker);
      _this.deleteMarkerButton(marker);
      _this.saveMarkerButton(marker);
    });
  },

  addmarker: function(latilongi, title, description, questions, lat, lng) {

    if (!lat){
      lat = this.map.getCenter().lat();
    }
    if (!lng){
      lng = this.map.getCenter().lng();
    }
    if (!title){
      title = '';
    }
    if (!description){
      description = '';
    }
    if (!questions){
      questions = '';
    }

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

    var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' placeholder='Title of this stop' class='marker-title'><br><textarea class='marker-description box-sizing' placeholder='Description of this stop'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Stop</button> <button class='btn' id='delete-marker'>Delete</button></div>";

    if (!lat){
      infowindow.setContent(markerForm);
      infowindow.open(this.map, marker);
    } else {
      this.markers.push(marker);
    }

    this.addmarkerListener(marker);
    this.updateChart();

  },

  // Save the marker button
  saveMarkerButton: function(marker) {
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
  },


  /* Clear / Reset functions
  * Functions here remove lines, reset maps, etc.
  */
  // Set the basic style of the polylines
  initPoly: function() {
    var polyOptions = {
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: false,
      map: this.map
    }
    this.poly = new google.maps.Polyline(polyOptions);
    this.poly.binder = new MVCArrayBinder(this.poly.getPath());
  },

  deleteMarkerButton: function(marker) {
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
  },

  // Clear out the polylines
  removeLines: function() {
    this.poly.binder.getAt(marker);
  },

  // Remove Stops and Path
  clearRoute: function(event) {
    this.poly.setMap(null);
    for(i=0; i < this.point.length; i++) {
      this.point[i].setMap(null);
    }
    this.point = [];
    this.initPoly();
  },

  // Center the map on the points that are loaded
  centerRoute: function() {
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
  }

});

/* TODO: move jQuery events in to form-specific js or init function. This file should just be for the map editor. */
// Alert for when you try to click on disabled make stop button
$('.disable-alert').on('click', function(){
  alert('Please Save Route before you add Stops.');
});

