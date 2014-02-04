var map;
var markers = [];
var poly;
var point = [];

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

function initPoly() {
  var polyOptions = {
    strokeColor: '#F16725',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    editable: false,
    map: map
  }
  poly = new google.maps.Polyline(polyOptions);
  poly.binder = new MVCArrayBinder(poly.getPath());
};

function gMapinitialize() {

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

  //
  // Map Options.
  //
  
  var mapOptions = {
    zoom: 15,
    scrollwheel: false,
    rotateControl: true,
    center: new google.maps.LatLng(43.65495633091365, -79.38892364501953),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
    }
  };

  //
  // Create new map in the DOM.
  //

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //
  // Set Map style.
  //

  map.setOptions({styles: styles});

  // 
  // Marker Icon
  //


  var stopMarker = {
    url: '../../../img/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  };

  //
  // Add marker for stops
  //
  var infowindow = new google.maps.InfoWindow();
  
  window.addmarker = function(latilongi, title, description, questions, lat, lng) {

    if (!lat){
      lat = map.getCenter().lat();
    }
    if (!lng){
      lng = map.getCenter().lng();
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
        icon: stopMarker,
        style: 'stop',
        description: description,
        questions: questions,
        map: map
    });

    var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' placeholder='Title of this stop' class='marker-title'><br><textarea class='marker-description box-sizing' placeholder='Description of this stop'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Stop</button> <button class='btn' id='delete-marker'>Delete</button></div>";

    if (!lat){
      infowindow.setContent(markerForm);
      infowindow.open(map, marker);
    } else {
      markers.push(marker);
    }

    addmarkerListener(marker);
    updateChart();

  }

  function deleteMarkerButton(marker) {
    google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
      google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function () {
        marker.setMap(null);
        
        for (var i = 0; i < markers.length; i++) {
          if (markers[i] === marker) {
            markers.splice(i, 1);
          }
        }
        updateChart();

      });
    });
  }

  function saveMarkerButton (marker) {
    google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
      google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function () {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i] === marker) {
            markers.splice(i, 1);
          }
        }

        marker.title = $('.marker-title').val();
        marker.description = $('.marker-description').val();
        marker.questions = $('.marker-questions').val();
        markers.push(marker);
        updateChart();

        setTimeout(function(){
          infowindow.close(map,marker);
        },500);

      });
    });
  }

  function addmarkerListener(marker) {
    map.panBy(0,-20);
    marker.listener = google.maps.event.addListener(marker, 'click', function() { 
      var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Title of this stop'><br><textarea class='marker-description box-sizing' placeholder='Description of this stop'>"+marker.description+"</textarea><br><textarea class='marker-questions box-sizing' placeholder='A few questions for participants'>"+marker.questions+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Stop</button> <button class='btn' id='delete-marker'>Delete</button></div>";
      infowindow.setContent(markerForm);
      infowindow.open(map,marker);
      deleteMarkerButton(marker);
      saveMarkerButton(marker);
    });
  }

  window.addmeetingplace = function(latilongi, title, description, lat, lng) {

    if (!lat){
      lat = map.getCenter().lat();
    }
    if (!lng){
      lng = map.getCenter().lng();
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
        icon: stopMarker,
        map: map
    });

    var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' placeholder='Name of your meeting place' class='marker-title'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";

    var deleteMarkerButton = function() {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function () {
          marker.setMap(null);
          
          for (var i = 0; i < markers.length; i++) {
            if (markers[i] === marker) {
              markers.splice(i, 1);
            }
          }

          $('#addmeetingplace').prop('disabled', false);

          updateChart();

        });
      });
    };

    var saveMarkerButton = function(marker) {
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function () {
          for (var i = 0; i < markers.length; i++) {
            if (markers[i] === marker) {
              markers.splice(i, 1);
            }
          }

          marker.title = $('.marker-title').val();
          marker.description = $('.marker-description').val();

          markers.push(marker);

          $('#addmeetingplace').prop('disabled', true);
          updateChart();

          setTimeout(function(){
            infowindow.close(map,marker);
          },500);

        });
      });
    };

    if (!lat){
      infowindow.setContent(markerForm);
      infowindow.open(map, marker);
    } else {
      markers.push(marker);
      $('#addmeetingplace').prop('disabled', true);
    }

    google.maps.event.addListener(marker, 'click', function() {    
        var markerForm = "<div class='stop-form'><input type='text' value='"+marker.title+"' class='marker-title' placeholder='Name of your meeting place'><br><textarea class='marker-description box-sizing' placeholder='Describe where you are meeting'>"+marker.description+"</textarea><br><button class='btn btn-primary' id='save-marker'>Save Meeting Place</button> <button class='btn' id='delete-marker'>Delete</button></div>";
        infowindow.setContent(markerForm);
        map.panTo(marker.getPosition());
        infowindow.open(map,marker);
        deleteMarkerButton(marker);
        saveMarkerButton(marker);
      });
  }


  //
  // Render Route Table
  //
  function updateChart() {
    $('#route-stops tbody').empty();
    for (var i = 0; i < markers.length; i++) {
      $('#route-stops tbody').append('<tr><td>'+markers[i].title+'</td><td>'+markers[i].description+'</td><td><a class="delete-stop" href="#map-canvas" data-stop='+i+'>Edit</a></td></tr>');
    }
  }

  $('#route-stops').on('click','a',function(event){
    marker = markers[$(this).data('stop')];
    google.maps.event.trigger(marker, 'click');
  });

  //
  // Polylines
  //

  initPoly();

  google.maps.event.addListener(poly, "dragend", pathSet);
  google.maps.event.addListener(poly.getPath(), "insert_at", pathSet);
  google.maps.event.addListener(poly.getPath(), "remove_at", pathSet);
  google.maps.event.addListener(poly.getPath(), "set_at", pathSet);

  function pathSet() {
    var path = poly.getPath();
    var len = path.getLength();
    var coordStr = "";
    for (var i=0; i<len; i++) {
      coordStr += path.getAt(i).toUrlValue(6);
    }
    console.log(coordStr);
  }

  // Click event to add stops

  $('#addpoint').on('click', function() {
    addmarker();
    google.maps.event.trigger(markers[markers.length-1], 'click');
  });

  // Click event to add meeting place

  $('#addmeetingplace').on('click', function() {
    addmeetingplace();
    google.maps.event.trigger(markers[markers.length-1], 'click');
  });

  // Click event to add polylines

  var addLinesListener = google.maps.event.addListener(map, 'click', addlines);
  google.maps.event.clearListeners(map, 'click');

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

      for(i=0; i < point.length; i++) {
        point[i].setVisible(false);
        point[i].setDraggable(false);
      }
      for(i=0; i < markers.length; i++) {
        addmarkerListener(markers[i]);
        markers[i].setDraggable(true);
      }
      poly.setEditable(false);
    } else {
      $(this).html('<i class="icon-thumbs-up"></i> Save Route').addClass('btn-primary active');
      $('.map-notifications').html('<div class="alert alert-info">Click on the map to draw your route. Right click to undo a route marker.</div>');
      $('#addpoint').prop('disabled', true);

      $('.disable-alert').css({'zIndex':'5'});

      google.maps.event.addListener(map, 'click', addlines)

      for(i=0; i < point.length; i++) {
        point[i].setVisible(true);
        point[i].setDraggable(true);
      }
      for(i=0; i < markers.length; i++) {
        google.maps.event.removeListener(markers[i].listener);
        markers[i].setDraggable(false);
        markers[i].setClickable(false);
      }
      poly.setEditable(true);
    }

    if (markers.length === 0) {
      return false;
    }

    if (point.length <= 0 ) {

      lat = map.getCenter().lat();
      lng = map.getCenter().lng();
      var latlng = new google.maps.LatLng(lat, lng);

      var markerInfo = markers[0];

      var infowindow = new google.maps.InfoWindow({
        content: 'Click here to start your Route'
      });
      
      infowindow.open(map, markerInfo);
      google.maps.event.addListenerOnce(map, 'click', function(){
        infowindow.close();
      });
    }


  });

  $(document).trigger('gmapinit');

  window.gMapInit = true;
}

// Alert for when you try to click on disabled make stop button

$('.disable-alert').on('click', function(){
  alert('Please Save Route before you add Stops.');
});

//
// Add marker for stops
//

var pathMarker = new google.maps.MarkerImage('/img/path.marker.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        null, 
        // The origin for this image is 0,0.
        new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        new google.maps.Point(8, 10)
    );

function removeLines() {
  poly.binder.getAt(marker);
}

window.addlines = function(event, title, lat, lng) {
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
    var path = poly.getPath();
    path.push(position);
    var len = path.getLength();
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: map,
      draggable : true,
      icon: pathMarker,
      zIndex: 100,
      visible: visible
    });
    marker.bindTo('position', poly.binder, (len-1).toString());
    
    point.push(marker);

    // Right Click to remove Poly Point (Only works in sequence)

    google.maps.event.addListener(marker, 'rightclick', function(event) {
      for (var i = 0; i < point.length; i++) {
        if (point[i] === this) {
          point.splice(i, 1);
        }
      }
      marker.setMap(null);
      path.removeAt(len-1);
    });
  }
};

//
// Remove Stops and Path
//

function clearRoute(event) {
  poly.setMap(null);
  for(i=0; i < point.length; i++) {
    point[i].setMap(null);
  }
  initPoly();
}

//
// Set DOM listener on page load.
//

if ($('#map-canvas').length > 0) {
  var initCallback = function() {
    gMapinitialize();
    $(this).unbind('click', initCallback);
  };
  $('.route').bind('click', initCallback);
}


$('a[href="#route"][data-toggle="tab"]').on('shown', function(e) {
  lastCenter=map.getCenter(); 
  google.maps.event.trigger(map, 'resize');
  map.setCenter(lastCenter);
  tipLoader();
  // google.maps.event.addDomListener(window, 'load', gMapinitialize);
});
