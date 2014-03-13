<?php 
/**
*
* Responsible for geocoding the cities to lookup their lat/lng
*/

defined('C5_EXECUTE') or die("Access Denied.");
class GeocodeCities extends Job {
  public $jNotUninstallable=0;

  public function getJobName() {
    return t("Geocode City Locations");
  }

  public function getJobDescription() {
    return t("Runs through all cities and uses a geocoding API to set the latlng attribute of each, based on {City Name}, {Country}");
  }

  public function run() {
    $js = Loader::helper('json');
    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('city');
    $pages = $pl->get();
    $updated = 0;
    $not = 0;
    echo "Loading city coordinates.. \n";
    foreach($pages as $page) {
      if(!(trim($page->getAttribute('coordinates'))) || trim($page->getAttribute('coordinates')) === ',' ) {
        $parent = Page::getByID($page->getCollectionParentID());
        $city = "{$page->getCollectionName()}, {$parent->getCollectionName()}";
        $cityLocation = file_get_contents("https://maps.google.com/maps/api/geocode/json?address=".urlencode($city)."&sensor=false&key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM");
        $responseObj = $js->decode($cityLocation);
        if( $responseObj->status != 'ZERO_RESULTS' ) {
          $page->setAttribute('latlng', $responseObj->results[0]->geometry->location->lat . "," . $responseObj->results[0]->geometry->location->lng );
          $updated++;
        }
        else {
          $not++;
        } 
      }
    }
    return t("$updated cities geocoded, $not cities not updated");
  }
}
