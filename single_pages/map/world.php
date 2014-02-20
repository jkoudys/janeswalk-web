<?php  defined('C5_EXECUTE') or die("Access Denied."); 
$pl = new PageList();
$nh = Loader::helper('navigation');
$pl->filterByCollectionTypeHandle('City');
$pages = $pl->get();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Jane's Walk City Map</title>
    <style>
      html,body { height:100%; width:100%; }
      #map_canvas { height:100%; width:100%; }
    </style>
  </head>
  <body>
    <div id="map_canvas"></div>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCAN9glhycnT_BKO557Zm2ncVDFPImMxdY&sensor=false"></script>
<script>
<?php

// Hexcodes to pseudorandomly assign to each city
$colors = ['#f16725', '#6badfd', '#666666'];
$cities = [];
foreach($pages as $page) {
  $parent = Page::getByID($page->getCollectionParentID());
  $page_owner = UserInfo::getByID($page->getCollectionUserID());
  $city = t($page->getCollectionName().", ".$parent->getCollectionName());
  $latlng = array_map( function($e) { return (float)trim($e); }, explode(",", $page->getAttribute('latlng')));
  $info = "<a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()} Walks</a>".(($page_owner->getUserID() > 1 && $page_owner->getAttribute('first_name')) ? "<br/>{$page_owner->getAttribute('first_name')}, City Organizer" : false);
  $cities[] = ['country' => $parent->getCollectionName(),
    'city_organizer' => $page_owner->getAttribute('first_name') . ' ' . $page_owner->getAttribute('last_name'),
    'name' => $city,
    'color' => $colors[ord($city) % 3],
    'info' => $info,
    'lat' => $latlng[1],
    'lng' => $latlng[0]];
}
?>

var cities = <?=json_encode($cities)?>;
var style = new google.maps.StyledMapType(
  [{
    featureType: "landscape",
      stylers: [{
        visibility: "on"
      }, {
        color: "#ffffff"
      }]
  }, {
    featureType: "poi",
      stylers: [{
        visibility: "off"
      }]
  }, {
    featureType: "transit",
      stylers: [{
        visibility: "off"
      }]
  }, {
    featureType: "water",
      stylers: [{
        visibility: "simplified"
      }, {
        color: "#90c2ff"
      }]
  }, {
    featureType: "road",
      stylers: [{
        visibility: "off"
      }]
  }, {
    featureType: "administrative",
      stylers: [{
        visibility: "off"
      }]
  }, {
    featureType: "administrative.locality",
      stylers: [{
        visibility: "on"
      }]
  }],
{
  name: "Styled Map"
})
var mapOptions = {
  center: new google.maps.LatLng(20, 15),
    zoom: 2,
    minZoom: 2,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
    },
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map = new google.maps.Map(document.querySelector('#map_canvas'), mapOptions);
map.mapTypes.set("map_style", style);
map.setMapTypeId("map_style");
function WorldMap() {
  var _this = this;
  for(i in cities) {
    var marker = new google.maps.Marker({
      map: map,
        position: new google.maps.LatLng( cities[i].lat, cities[i].lng ),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
          fillOpacity: 0.6,
          fillColor: cities[i].color,
          scale: 10,
          strokeColor: cities[i].color,
          strokeOpacity: 1,
          strokeWeight:1,
          zIndex: 10 
      }
    });
    marker.infowindow = new google.maps.InfoWindow({
      content: cities[i].info
    });

    google.maps.event.addListener(marker, 'click', function() {
      if(_this.infoOpen ) { _this.infoOpen.close(); }
      _this.infoOpen = this.infowindow;
      this.infowindow.open(map,this);
    });
  }
}
WorldMap.prototype.infoOpen = false;

var worldMap = new WorldMap();

</script>
  </body>
</html>
<?php exit; ?>
