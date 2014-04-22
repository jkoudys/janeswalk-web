<?php
defined('C5_EXECUTE') or die("Access Denied.");
$pl = new PageList();
$nh = Loader::helper('navigation');
$pl->filterByCollectionTypeHandle('walk');
$pages = $pl->get();

$xmlstr = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Document>
    <name>Jane's Walk Walks</name>
    <Style id="jwstyle">
      <IconStyle id="jwIcon">
        <Icon>
          <href>http://janeswalk.net/images/orange-dot.png</href>
        </Icon>
      </IconStyle>
    </Style>
  </Document>
</kml>
XML;

/* Set up the KML XML */
// Creates the Document.
$doc = new SimpleXMLElement($xmlstr);

foreach($pages as $page) {
  $city = Page::getByID($page->getCollectionParentID());
  $country = Page::getByID($city->getCollectionParentID());
  
  // Creates a Placemark and append it to the Document.
  $placemark = $doc->appendChild('Placemark');

  // Create name, and description elements and assigns them the values of the name and address columns from the results.
  $placemark->appendChild('name', "<a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()}</a>");
  $placemark->appendChild('description', $page->getAttribute('shortdescription'));

  $point = $doc->appendChild('Point');

  // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
  $gmap = json_decode($page->getAttribute('gmap'),true);
  foreach( (array) $gmap['markers'] as $marker) { // To avoid errors on empty/malformed maps
    $point->appendChild('coordinates', "{$marker['lng']}, {$marker['lat']}");
    break; 
  }

}

$kmlOutput = $dom->saveXML();
header('Content-type: application/vnd.google-earth.kml+xml');
echo $kmlOutput;
exit;
?>
