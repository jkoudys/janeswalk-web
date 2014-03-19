<?php
$importArray = json_decode(file_get_contents('/home/jkoudys/Work/janeswalk_yearround/tools/walkexport.json'), true);
foreach($importArray as $walk) {
  $pl = new PageList();
  $pl->filterByCollectionTypeHandle('country');
  $pl->filterByName($walk['country']);
  $country = $pl->get(1)[0];
  if(!$country) {
    $country = Page::getByID(1)->add(CollectionType::getByHandle('country'), ['cName' => $walk['country']]);
  }

  $pl = new PageList();
  $pl->filterByCollectionTypeHandle('city');
  $pl->filterByName($walk['city']);
  $city = $pl->get(1)[0];
  if(!$city) {
    $city = $country->add(CollectionType::getByHandle('city'), ['cName' => $walk['city']]);
  }
  $ui = UserInfo::getByEmail($walk['owner']);
  if(!$ui) {
    $ui = UserInfo::add(['uName' => $walk['owner'], 'uEmail' => $walk['owner']);
  }

  $walkPage = $city->add(CollectionType::getByHandle('walk'), ['cName' => $walk['title'], 'uID' => $ui->getUserID()]);
  $walkController = Loader::controller($walkPage);
  $walkController->setJson(json_encode($walk), true);
}
