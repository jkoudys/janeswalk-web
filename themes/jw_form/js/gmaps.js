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

  init: function(map_selector) {

    //
    // Map Style array for styling.
    //

    var styles = [
      {
        "featureType": "poi.business",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ];

    var styledMap = new google.maps.StyledMapType(styles, {
      name: 'Styled Map'
    });

    // Map Options.
    var mapOptions = {
      zoom: 15,
      scrollwheel: false,
      rotateControl: true,
      center: new google.maps.LatLng(43.65495633091365, -79.38892364501953),
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
      }
    };

    // Create new map in the DOM.
    this.map = new google.maps.Map(document.querySelector(map_selector), mapOptions);

    /* Geocode based on IP and center map */
    $.getJSON("http://freegeoip.net/json", function(geocode) {
      this.map.setCenter(new google.maps.LatLng(geocode.latitude, geocode.longitude));
    });

    //
    // Set Map style.
    //

    this.map.setOptions({styles: styles});

    //
    // Add marker for stops
    //
    var infowindow = new google.maps.InfoWindow();

    function deleteMarkerButton(marker) {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function () {
          marker.setMap(null);

          for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i] === marker) {
              this.markers.splice(i, 1);
            }
          }
          this.updateChart();

        });
      });
    }

    function saveMarkerButton (marker) {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function () {
          for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i] === marker) {
              this.markers.splice(i, 1);
            }
          }

          marker.title = $('.marker-title').val();
          marker.description = $('.marker-description').val();
          marker.questions = $('.marker-questions').val();
          this.markers.push(marker);
          this.updateChart();

          setTimeout(function(){
            infowindow.close(this.map,marker);
          },500);

        });
      });
    }

    $('#route-stops').on('click','a',function(event){
      marker = this.markers[$(this).data('stop')];
      google.maps.event.trigger(marker, 'click');
    });

    //
    // Polylines
    //

    this.initPoly();

    google.maps.event.addListener(this.poly, "dragend", this.pathSet);
    google.maps.event.addListener(this.poly.getPath(), "insert_at", this.pathSet);
    google.maps.event.addListener(this.poly.getPath(), "remove_at", this.pathSet);
    google.maps.event.addListener(this.poly.getPath(), "set_at", this.pathSet);

    // Click event to add stops
    $('#addpoint').on('click', function() {
      this.addmarker();
      google.maps.event.trigger(this.markers[this.markers.length-1], 'click');
    });

    // Click event to add meeting place

    $('#addmeetingplace').on('click', function() {
      addmeetingplace();
      google.maps.event.trigger(this.markers[this.markers.length-1], 'click');
    });

    // Click event to add polylines

    var addLinesListener = google.maps.event.addListener(this.map, 'click', this.addlines);
    google.maps.event.clearListeners(this.map, 'click');

    // Click event to add stops

    $('.clear-route').on('click', function(event) {
      var x = window.confirm('Do you want to remove your walk route? Your Stops will not be deleted.');
      if (x) {
        clearRoute();
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    });

    // Hook up click controls for map

    $('#addroute').on('click', function(){

      if ($(this).hasClass('active')) {
        $(this).html('<i class="icon-map-route"></i> Edit Route').removeClass('btn-primary active');
        $('.map-notifications').html('');
        $('#addpoint').prop('disabled', false);
        $('.disable-alert').css({'zIndex':'-1'});

        google.maps.event.clearListeners(map, 'click');

        for(i=0; i < this.point.length; i++) {
          this.point[i].setVisible(false);
          this.point[i].setDraggable(false);
        }
        for(i=0; i < this.markers.length; i++) {
          this.addmarkerListener(this.markers[i]);
          this.markers[i].setDraggable(true);
        }
        this.poly.setEditable(false);
      } else {
        $(this).html('<i class="icon-thumbs-up"></i> Save Route').addClass('btn-primary active');
        $('.map-notifications').html('<div class="alert alert-info">Click on the map to draw your route. Right click to undo a route marker.</div>');
        $('#addpoint').prop('disabled', true);

        $('.disable-alert').css({'zIndex':'5'});

        google.maps.event.addListener(this.map, 'click', this.addlines)

        for(i=0; i < this.point.length; i++) {
          this.point[i].setVisible(true);
          this.point[i].setDraggable(true);
        }
        for(i=0; i < this.markers.length; i++) {
          google.maps.event.removeListener(this.markers[i].listener);
          this.markers[i].setDraggable(false);
          this.markers[i].setClickable(false);
        }
        this.poly.setEditable(true);
      }

      if (this.markers.length === 0) {
        return false;
      }

      if (this.point.length <= 0 ) {

        lat = this.map.getCenter().lat();
        lng = this.map.getCenter().lng();
        var latlng = new google.maps.LatLng(lat, lng);

        var markerInfo = this.markers[0];

        var infowindow = new google.maps.InfoWindow({
          content: 'Click here to start your Route'
        });

        infowindow.open(this.map, markerInfo);
        google.maps.event.addListenerOnce(this.map, 'click', function(){
          infowindow.close();
        });
      }
    });
  },

  pathSet: function() {
  debugger;
    var path = this.poly.getPath();
    var len = path.getLength();
    var coordStr = "";
    for (var i=0; i<len; i++) {
      coordStr += path.getAt(i).toUrlValue(6);
    }
    console.log(coordStr);
  },

  addmarkerListener: function(marker) {
    this.map.panBy(0,-20);
    marker.listener = google.maps.event.addListener(marker, 'click', function() { 
      var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Title of this stop'><br><textarea class='marker-description box-sizing' placeholder='Description of this stop'>"+marker.description+"</textarea><br><textarea class='marker-questions box-sizing' placeholder='A few questions for participants'>"+marker.questions+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Stop</button> <button class='btn' id='delete-marker'>Delete</button></div>";
      infowindow.setContent(markerForm);
      infowindow.open(this.map,marker);
      deleteMarkerButton(marker);
      saveMarkerButton(marker);
    });
  },

  // Render Route Table
  updateChart: function() {
    $('#route-stops tbody').empty();
    for (var i = 0; i < this.markers.length; i++) {
      $('#route-stops tbody').append('<tr><td>'+this.markers[i].title+'</td><td>'+this.markers[i].description+'</td><td><a class="delete-stop" href="#map-canvas" data-stop='+i+'>Edit</a></td></tr>');
    }
  },

  addmeetingplace: function(latilongi, title, description, lat, lng) {
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

    var latlng = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: latlng,
      animation: google.maps.Animation.DROP,
      crossOnDrag: true,
      draggable: true,
      title: title,
      description: description,
      style: 'meeting',
      icon: this.stopMarker,
      map: this.map
    });

    var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' placeholder='Name of your meeting place' class='marker-title'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";

    var deleteMarkerButton = function() {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function () {
          marker.setMap(null);

          for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i] === marker) {
              this.markers.splice(i, 1);
            }
          }

          $('#addmeetingplace').prop('disabled', false);
          this.updateChart();
        });
      });
    };

    var saveMarkerButton = function(marker) {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function () {
          for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i] === marker) {
              this.markers.splice(i, 1);
            }
          }

          marker.title = $('.marker-title').val();
          marker.description = $('.marker-description').val();

          this.markers.push(marker);

          $('#addmeetingplace').prop('disabled', true);
          this.updateChart();

          setTimeout(function(){
            infowindow.close(this.map,marker);
          },500);

        });
      });
    };

    if (!lat){
      infowindow.setContent(markerForm);
      infowindow.open(this.map, marker);
    } else {
      this.markers.push(marker);
      $('#addmeetingplace').prop('disabled', true);
    }

    google.maps.event.addListener(marker, 'click', function() {    
      var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Name of your meeting place'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";
      infowindow.setContent(markerForm);
      this.map.panTo(marker.getPosition());
      infowindow.open(this.map,marker);
      deleteMarkerButton(marker);
      saveMarkerButton(marker);
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
    initPoly();
  },

  addlines: function(event, title, lat, lng) {
    var position;
    var visible;
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
      var path = this.poly.getPath();
      path.push(position);
      var len = path.getLength();
      var marker = new google.maps.Marker({
        position: position,
        title: title,
        map: this.map,
        draggable : true,
        icon: this.pathMarker,
        zIndex: 100,
        visible: visible
      });
      marker.bindTo('position', this.poly.binder, (len-1).toString());

      this.point.push(marker);

      // Right Click to remove Poly Point (Only works in sequence)

      google.maps.event.addListener(marker, 'rightclick', function(event) {
        for (var i = 0; i < this.point.length; i++) {
          if (this.point[i] === this) {
            this.point.splice(i, 1);
          }
        }
        marker.setMap(null);
        path.removeAt(len-1);
      });
    }
  }
});

/* TODO: move jQuery events in to form-specific js or init function. This file should just be for the map editor. */
// Alert for when you try to click on disabled make stop button
$('.disable-alert').on('click', function(){
  alert('Please Save Route before you add Stops.');
});

