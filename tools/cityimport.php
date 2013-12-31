<?php
defined('C5_EXECUTE') or die("Access Denied.");

// Hard-code the xml we'll update.. it's a one-off migration
$f = File::getByID(63);
$nh = Loader::helper('navigation');

$xml = file_get_contents($f->getApprovedVersion()->getURL());
$doc = new DOMDocument();
$doc->loadXML($xml);
foreach($doc->getElementsByTagName('country') as $country) {
  $countries = new PageList();
  $countries->filterByCollectionTypeHandle('country');
  $countries->filterByName($country->getAttribute('name'));
  $countryPage = $countries->get(1)[0];
  if($countryPage) {
    echo "exists: {$countryPage->getCollectionName()}<br/>";
  }
  else {
    echo "creating: {$country->getAttribute('name')}<br/>";
    $countryPage = Page::getByID(1)->add(CollectionType::getByHandle('country'), ['cName' => $country->getAttribute('name')]);
  }
  foreach($country->getElementsByTagName('city') as $city) {
    $cities = new PageList();
    $cities->filterByCollectionTypeHandle('city');
    $cities->filterByName($city->getAttribute('name'));
    $cityPage = $cities->get(1)[0];
    if($cityPage) {
      $ui = UserInfo::getByEmail($city->getAttribute('owner_email'));
      echo "exists: {$cityPage->getCollectionName()} new owner: ".($ui ? $ui->getUserID() : "")."<br/>";
    }
    else {
      echo "creating: {$city->getAttribute('name')}<br/>";
      $ui = UserInfo::getByEmail($city->getAttribute('owner_email'));
      $cityPage = $countryPage->add(CollectionType::getByHandle('city'), ['cName' => $city->getAttribute('name'), 'uID' => ($ui ? $ui->getUserID() : 1)]);
    }
    $ui && $cityPage->update(['uID' => $ui->getUserID()]);
  }
}
  
/*  foreach($user->childNodes as $attr) {
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
  */

exit;
