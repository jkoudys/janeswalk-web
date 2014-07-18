<?php
defined('C5_EXECUTE') or die("Access Denied.");
$pl = new PageList();
$nh = Loader::helper('navigation');
$pl->filterByCollectionTypeHandle('walk');
$pages = $pl->get();

$walks = array();
foreach ($pages as $page) {
  // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
  $gmap = json_decode($page->getAttribute('gmap'),true);
  $coordinates = false;
  $name = $page->getCollectionName();
  if (!($name && isset($gmap['markers']))) { continue; } // Don't bother if there's no coordinates or name; blank walk
  $city = Page::getByID($page->getCollectionParentID());
  $country = Page::getByID($city->getCollectionParentID());
  // Since we're generating csv, set keys here to enforce ordering
  $walk = array(
    'id' => $page->getCollectionID(),
    'map_id' => $page->getCollectionID(),
    'title' => '"' . htmlspecialchars($name) . '"',
    'description' => '"' . htmlspecialchars($page->getAttribute('shortdescription') . '<br />' . "<a target=\"__blank\" href='{$nh->getCollectionURL($page)}'>Go to walk &gt;</a>" ) . '"',
    'link' => $nh->getCollectionURL($page),
    'icon' => '',
    'lat' => '',
    'lng' => ''
  );
  foreach ( (array) $gmap['markers'] as $marker) { // To avoid errors on empty/malformed maps
    $walk['lat'] = $marker['lat'];
    $walk['lng'] = $marker['lng'];
    break;
  }
  $walks[] = $walk;
}

header('Content-type: text/csv');
if (count($walks)) {
  // Display the csv header
  echo join(',', array_keys($walks[0])), PHP_EOL;
  foreach ($walks as $walk) {
    echo join(',', $walk), PHP_EOL;
  }
}
exit;
