<?php
defined('C5_EXECUTE') or die("Access Denied.");
$js = Loader::helper('json');
$pl = new PageList();
$pl->filterByCollectionTypeHandle('city');
$pages = $pl->get();
echo "Loading city coordinates.. \n";
foreach($pages as $page) {
  if(!(trim($page->getAttribute('coordinates'))) || trim($page->getAttribute('coordinates')) === ',' ) {
    $parent = Page::getByID($page->getCollectionParentID());
    $city = "{$page->getCollectionName()}, {$parent->getCollectionName()}";
    $cityLocation = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=".urlencode($city)."&sensor=false&key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM");
    $responseObj = $js->decode($cityLocation);
    if( $responseObj->status != 'ZERO_RESULTS' ) {
      echo "$city: {$responseObj->results[0]->geometry->location->lat},{$responseObj->results[0]->geometry->location->lng}\n";
      $page->setAttribute('latlng', $responseObj->results[0]->geometry->location->lat . "," . $responseObj->results[0]->geometry->location->lng );
    }
    else {
      echo "Could not lookup coordinates for: $city\n";
    } 
  }
  var_dump($responseObj);
  break;
}

exit;
?>
