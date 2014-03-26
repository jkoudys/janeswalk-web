<?php 
defined('C5_EXECUTE') or die("Access Denied.");
class ProfileController extends Concrete5_Controller_Profile {
  public function view($userID = 0) {
    parent::view($userID);
    Loader::model('page_list'); 
    $nh = Loader::helper('navigation');
    $u = new User();
    $ui = UserInfo::getByID($u->getUserID());
    $profile = $this->get('profile');

    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByUserID($u->getUserID());
    $pl->filterByAttribute('exclude_page_list',false);
    $this->set('publicWalks', $pl->get());

    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByUserID($u->getUserID());
    $pl->filterByAttribute('exclude_page_list',true);
    $this->set('inProgressWalks', $pl->get());

    $cities = new PageList();
    $cities->filterByCollectionTypeHandle('city');
    $cities->sortByName();
    $this->set('cities', $cities->get());

    $isProfileOwner = $u->getUserID() == $profile->getUserID();
    $isCityOrganizer = in_array('City Organizers', $profile->getUserObject()->getUserGroups());
    if($isCityOrganizer && $isProfileOwner) {
      $pl = new PageList();
      $pl->filterByCollectionTypeHandle('city');
      $pl->ignoreAliases();
      $pl->filterByUserID($u->getUserID());
      $cityWalks = [];
      foreach($pl->get() as $city) {
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByParentID($city->getCollectionID());
        $pl->filterByAttribute('exclude_page_list',false);
        $walks = $pl->get();
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByParentID($city->getCollectionID());
        $pl->filterByAttribute('exclude_page_list',true);
        $cityWalks[] = ['city' => $city, 'walks' => $walks, 'inprogress' => $pl->get()];
      }
      $this->set('cityWalks', $cityWalks);
    }

    $this->set('isProfileOwner', $isProfileOwner);
    $this->set('isCityOrganizer', $isCityOrganizer);
    $this->set('nh',$nh);
    $this->set('u',$u);
    $this->set('home_city', $ui->getAttribute('home_city'));
    $this->set('newWalkForm', Page::getByPath('/walk/form'));
  }
}
