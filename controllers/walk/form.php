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
    if(empty($load)) {
      $city = (($parentCID = $_REQUEST['parentCID']) ? Page::getByID($parentCID) : ($ui->getAttribute('home_city') ?: Page::getByPath('/canada/toronto')));
      $newPage = $city->add(CollectionType::getByHandle('walk'),[]);  
      $newPage->setAttribute('exclude_page_list',true);
      $c = $newPage;
    }
    else {
      $c = Page::getByPath($load);
    }
    // Let's load the controller for the walk, so we can access its json methods
    Loader::controller($c);
    $walkController = new WalkPageTypeController();
    $walkController->setCollectionObject($c);

    !$city && $city = Page::getByID($c->getCollectionParentID());
    $country = Page::getByID($city->getCollectionParentID());
    $ui_cityorganizer = UserInfo::getByID($city->getCollectionUserID());
    $is_nyc = in_array($city->getCollectionID(), [276]);

    $latlng = explode(',', $city->getAttribute('latlng') );
    // If you don't have a lat and a lng, final resort is Toronto. It's at least better than being 400km off the coast of Nigeria.
    if(sizeof((array)$latlng) != 2) {
      $latlng = [43.653226,-79.3831843];
    }

    $walk_ward = trim((String)$c->getAttribute('walk_wards'));
    $city_wards = $city->getAttribute('city_wards');
    if( $city_wards ) {
      $wards = array_map(function($ward) use ($walk_ward) { if($ward->value == $walk_ward) { $ward->selected = true; } return $ward; },
        $city_wards->getOptions() );
    } else {
      $wards = false; 
    }

    // Set the language. Hard-code for certain pilot cities for now.
    // TODO: build a 'language' hierarchy', that checks the user's preferences, then the walk, the city, the country, then picks the first matching language. May need a 'language helper' here
    switch($city->getCollectionName()) {
    case 'Córdoba':
    case 'Sevilla':
      Localization::changeLocale('es_ES');
      break;
    case 'Vienna':
      Localization::changeLocale('de_DE');
      break;
    default:
      break;
    }
    $this->set('u', $u);
    $this->set('ui', $ui);
    $this->set('owner', UserInfo::getByID($c->getCollectionUserID()));
    $this->set('nh', $nh);
    $this->set('av', $av);
    $this->set('load', $load);
    $this->set('c', $c);
    $this->set('walkController', $walkController);
    $this->set('city', $city);
    $this->set('country', $country);
    $this->set('ui_cityorganizer', $ui_cityorganizer);
    $this->set('imgHelper', $imgHelper);
    $this->set('wards', $wards);
    $this->set('is_nyc', $is_nyc);
    $this->set('lat', $latlng[0]);
    $this->set('lng', $latlng[1]);
  }
}
