<?php
defined('C5_EXECUTE') or die("Access Denied.");
$js = Loader::helper('json');
$pl = new PageList();
$pl->filterByCollectionTypeHandle('city');
$pages = $pl->get();
echo "Loading city coordinates.. ";
foreach($pages as $page) {
if(strcmp(trim($page->getAttribute('coordinates')),"") == 0 || strcmp($page->getAttribute('coordinates'),",") == 0 ) {
  $parent = Page::getByID($page->getCollectionParentID());
  $city = t($page->getCollectionName().", ".$parent->getCollectionName());
  $cityLocation = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=".urlencode($city)."&sensor=false");
  $responseObj = $js->decode($cityLocation);
  if( $responseObj->status != 'ZERO_RESULTS' ) {
    echo $city.": ".$responseObj->results[0]->geometry->location->lat . "," . $responseObj->results[0]->geometry->location->lng;
    $page->setAttribute('latlng', $responseObj->results[0]->geometry->location->lng . "," . $responseObj->results[0]->geometry->location->lat );
  }
  else {
    echo "Could not lookup coordinates for: " . $city;
  } 
}
}

exit;
?>
