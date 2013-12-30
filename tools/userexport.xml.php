<?php
defined('C5_EXECUTE') or die("Access Denied.");
$nh = Loader::helper('navigation');
Loader::model('user_list');

/* Set up the KML XML */
// Creates the Document.
$dom = new DOMDocument('1.0', 'UTF-8');

$dnode = $dom->createElement('Users');
$docNode = $dom->appendChild($dnode);

foreach((new UserList())->get(3000) as $user) {
  $ui = UserInfo::getByID($user->getUserID());
  $node = $dom->createElement('User');
  $userNode = $docNode->appendChild($node);

  $node = $dom->createElement('email');
  $cdata = $node->ownerDocument->createCDATASection($user->getUserEmail());
  $node->appendChild($cdata);
  $userNode->appendChild($node);

  $node = $dom->createElement('first_name');
  $cdata = $node->ownerDocument->createCDATASection($user->getAttribute('first_name'));
  $node->appendChild($cdata);
  $userNode->appendChild($node);

  $node = $dom->createElement('website');
  $cdata = $node->ownerDocument->createCDATASection($user->getAttribute('website'));
  $node->appendChild($cdata);
  $userNode->appendChild($node);

  $node = $dom->createElement('bio');
  $cdata = $node->ownerDocument->createCDATASection($user->getAttribute('bio'));
  $node->appendChild($cdata);
  $userNode->appendChild($node);

  $node = $dom->createElement('raw_pass');
  $cdata = $node->ownerDocument->createCDATASection($user->getUserPassword());
  $node->appendChild($cdata);
  $userNode->appendChild($node); 

}

$xmlOutput = $dom->saveXML();
header('Content-type: application/xml');
echo $xmlOutput;
exit;
?>
