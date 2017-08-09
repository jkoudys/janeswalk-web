<?php 
/**
*
* Responsible for geocoding the cities to lookup their lat/lng
 */

class GeocodeCities extends Job {
  public $jNotUninstallable = 0;

  public function getJobName(): string {
    return t("Geocode City Locations");
  }

  public function getJobDescription(): string {
    return t("Runs through all cities and uses a geocoding API to set the latlng attribute of each, based on {City Name}, {Country}");
  }

  public function run(): string {
    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('city');
    $pages = $pl->get();
    $updated = 0;
    $not = 0;

    foreach ($pages as $page) {
      if (!(trim($page->getAttribute('latlng'))) || trim($page->getAttribute('latlng')) === ',' ) {
        $parent = Page::getByID($page->getCollectionParentID());
        $city = "{$page->getCollectionName()}, {$parent->getCollectionName()}";
        $cityLocation = json_decode(file_get_contents(
            'https://maps.google.com/maps/api/geocode/json?address=' .
            urlencode($city) .
            '&sensor=false&key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM'
        ), true);
        if ($cityLocation['status'] === 'OK') {
            $location = $cityLocation[0]['geometry']['location'];
            $page->setAttribute(
                'latlng',
                "{$location['lat']},{$location['lng']}"
            );
            $updated++;
        } else {
          $not++;
        } 
      }
    }
    return t("$updated cities geocoded, $not cities failed lookup.");
  }
}
