<?php
defined('C5_EXECUTE') or die("Access Denied.");

// Hard-code the xml we'll update.. it's a one-off migration
$f = File::getByID(62);
$nh = Loader::helper('navigation');
Loader::model('user_list');

$xml = file_get_contents($f->getApprovedVersion()->getURL());
$doc = new DOMDocument();
$doc->loadXML($xml);
foreach($doc->getElementsByTagName('User') as $user) {
  $newUser = [];
  $soauth = null;
  foreach($user->childNodes as $attr) {
    if($attr->nodeName == 'social_login') {
      foreach($attr->childNodes as $social) {
        $newUser['oauth_auths'][$social->nodeName] = $social->nodeValue;
      }
    }
    else {
      $newUser[$attr->nodeName] = $attr->nodeValue;
    }
  }
  if(UserInfo::getByEmail($newUser['email'])) {
    echo "User {$newUser['email']} exists.\n";
  } else {
    echo "Creating {$newUser['email']}.\n";
    $ui = UserInfo::add(
      ['uName' => $newUser['email'],
      'uEmail' => $newUser['email'],
      'uPassword' => $newUser['raw_pass'],
      'uIsValidated' => 1], [UserInfo::ADD_OPTIONS_NOHASH]);
    $ui->setAttribute('first_name', $newUser['first_name']);
    $ui->setAttribute('website', $newUser['website']);
    $ui->setAttribute('bio', $newUser['bio']);
    $ui->setAttribute('oauth_auths', [$newUser['oauth_auths']]);
  }
}

/*
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
*/
exit;
?>
