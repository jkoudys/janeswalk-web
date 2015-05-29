<?php  defined('C5_EXECUTE') || die('Access Denied.');
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Jane's Walk City Map</title>
    <style>
      html,body { height:100%; width:100%;background:#90c2ff }
      #map_canvas { height:100%; width:100%; background:#90c2ff }
    </style>
  </head>
  <body>
    <div id="map_canvas"></div>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM&sensor=false"></script>
<script>
<?php
$cities = Cache::get('map', 'world') ?: [];
if (empty($cities)) {
    $nh = Loader::helper('navigation');
    $pl = new PageList;
    $pl->filterByCollectionTypeHandle('City');
    foreach ($pl->get() as $page) {
        $parent = Page::getByID($page->getCollectionParentID());
        $pageOwnerID = $page->getCollectionUserID();
        $pageOwner = UserInfo::getByID($pageOwnerID);
        $cityName = t($page->getCollectionName());
        $countryName = t($parent->getCollectionName());

        $latlng = array_map(
            function ($e) {
                return (float) trim($e);
            },
            explode(',', $page->getAttribute('latlng'))
        );

        $info =
            '<a href="' . $nh->getCollectionURL($page) . '" target="_blank">' .
                $cityName . ' Walks' .
            '</a>';

        // If the owner is set
        if ($pageOwnerID > 1) {
            $coName = [
                $pageOwner->getAttribute('first_name'),
                $pageOwner->getAttribute('last_name')
            ];
            $info .= '<br />' . $coName[0] . ', City Organizer';
        } else {
            $coName = [];
        }

        $cities[] = [
            'country' => $countryName,
            'city_organizer' => join(' ', $coName),
            'name' => $cityName . ', ' . $countryName,
            'color' => '#f16725',
            'info' => $info,
            'lat' => $latlng[0],
            'lng' => $latlng[1]
        ];
    }
    Cache::set('map', 'world', $cities, 21600); // Refresh the world map every 6 hours
}
?>
var cities = <?= json_encode($cities) ?>;
var style = new google.maps.StyledMapType(
  [{
    featureType: "landscape",
    stylers: [
      {visibility: "on"},
      {color: "#ffffff"}
    ]
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
    scrollwheel: false,
    zoom: 2,
    minZoom: 2,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    backgroundColor:"#90c2ff"
}
var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
map.mapTypes.set("map_style", style);
map.setMapTypeId("map_style");
function WorldMap()
{
  var _this = this;
  for (var i = 0; i < cities.length; i++) {
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng( cities[i].lat, cities[i].lng ),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.6,
        fillColor: cities[i].color,
        scale: 6,
        strokeWeight:0,
        zIndex: 10
      }
    });
    marker.infowindow = new google.maps.InfoWindow({
      content: cities[i].info
    });

    google.maps.event.addListener(marker, 'click', function () {
      if (_this.infoOpen) { _this.infoOpen.close(); }
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
