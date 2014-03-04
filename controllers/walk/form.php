<?php 
defined('C5_EXECUTE') or die("Access Denied.");
class WalkFormController extends Controller {
  public function view() {
    $u = new User(); 
    $ui = UserInfo::getByID($u->getUserID());
    $nh = Loader::helper('navigation');
    $av = Loader::helper('concrete/avatar');
    $imgHelper = Loader::helper('image'); 

    /* If no page is passed to edit, create a new page.
     * TODO: change this to either redirect, or detect if you have one in-progress so browser reloads don't make new walks.
     */
    $load = $_REQUEST['load'];
    $c = Page::getByPath($load);
    if(empty($load)) {
      $city = (($parentCID = $_REQUEST['parentCID']) ? Page::getByID($parentCID) : ($ui->getAttribute('home_city') ?: Page::getByPath("/canada/toronto")));
      $newPage = $city->add(CollectionType::getByHandle("walk"),[]);  
      $newPage->setAttribute('exclude_page_list',true);
      $c = $newPage;
    }
    !$city && $city = Page::getByID($c->getCollectionParentID());
    $country = Page::getByID($city->getCollectionParentID());
    $ui_cityorganizer = UserInfo::getByID($city->getCollectionUserID());
    $is_nyc = in_array($city->getCollectionID(), [276]);

    $latlng = explode(',', $city->getAttribute('latlng') );

    $this->set('u', $u);
    $this->set('ui', $ui);
    $this->set('nh', $nh);
    $this->set('av', $av);
    $this->set('load', $load);
    $this->set('c', $c);
    $this->set('city', $city);
    $this->set('country', $country);
    $this->set('ui_cityorganizer', $ui_cityorganizer);
    $this->set('imgHelper', $imgHelper);
    $this->set('is_nyc', $is_nyc);
    $this->set('lat', $latlng[0]);
    $this->set('lng', $latlng[1]);
  }
}
