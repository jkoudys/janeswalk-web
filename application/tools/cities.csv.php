<?php
defined('C5_EXECUTE') or die("Access Denied.");
$pl = new PageList();
$nh = Loader::helper('navigation');
$city = "Toronto, Canada";
$pl->filterByCollectionTypeHandle('City');
$pages = $pl->get();

/* Set up the KML XML */
// Creates the Document.
$dom = new DOMDocument('1.0', 'UTF-8');

// Creates the root KML element and appends it to the root document.
$node = $dom->createElementNS('http://earth.google.com/kml/2.2', 'kml');
$parNode = $dom->appendChild($node);

// Creates a KML Document element and append it to the KML element.
$dnode = $dom->createElement('Document');
$docNode = $parNode->appendChild($dnode);
$nameNode = $dom->createElement('name',"Jane's Walk World");
$docNode->appendChild($nameNode);
// Creates the two Style elements, one for restaurant and one for bar, and append the elements to the Document element.
/*$restStyleNode = $dom->createElement('Style');
$restStyleNode->setAttribute('id', 'jwstyle');
$restIconstyleNode = $dom->createElement('IconStyle');
$restIconstyleNode->setAttribute('id', 'jwIcon');
$restIconNode = $dom->createElement('Icon');
$restHref = $dom->createElement('href', 'http://janeswalk.net/images/orange-dot.png');
$restIconNode->appendChild($restHref);
$restIconstyleNode->appendChild($restIconNode);
$restStyleNode->appendChild($restIconstyleNode);
$docNode->appendChild($restStyleNode);
*/

foreach($pages as $page) {
  $parent = Page::getByID($page->getCollectionParentID());
  $page_owner = UserInfo::getByID($page->getCollectionUserID());
  $city = $page->getCollectionName().", ".$parent->getCollectionName();
  // Creates a Placemark and append it to the Document.

  $node = $dom->createElement('Placemark');
  $placeNode = $docNode->appendChild($node);

  // Create name, and description elements and assigns them the values of the name and address columns from the results.
  $nameNode = $dom->createElement('name');
  $cdata = $nameNode->ownerDocument->createCDATASection($page->getCollectionName());
  $nameNode->appendChild($cdata);
  $placeNode->appendChild($nameNode);
  $descNode = $dom->createElement('description');
  $cdata = $descNode->ownerDocument->createCDATASection("<a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()} Walks</a>".(($page_owner->getUserID() > 1 && $page_owner->getAttribute('first_name')) ? "<br/>{$page_owner->getAttribute('first_name')}, City Organizer" : "" ));
  $descNode->appendChild($cdata);
  $placeNode->appendChild($descNode);
//    $styleUrl = $dom->createElement('styleUrl', '#jwstyle');
//   $placeNode->appendChild($styleUrl);

  // Creates a Point element.
  $pointNode = $dom->createElement('Point');
  $placeNode->appendChild($pointNode);

  // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
  $coorStr = $page->getAttribute('latlng');
  $coorNode = $dom->createElement('coordinates', implode(',',array_reverse(explode(',',$coorStr)))); // Google maps takes lng,lat for some reason
  $pointNode->appendChild($coorNode);
}

$kmlOutput = $dom->saveXML();
header('Content-type: application/vnd.google-earth.kml+xml');
echo $kmlOutput;
exit;
?>
