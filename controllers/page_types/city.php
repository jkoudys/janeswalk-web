<?php
use \JanesWalk\Controller\Controller;
use \JanesWalk\Model\PageType\City;
defined('C5_EXECUTE') || die("Access Denied.");

Loader::model('page_types/city');
Loader::controller('/janes_walk');
class CityPageTypeController extends Controller
{
  protected $city;

  public function on_start()
  {
    $method = $_SERVER['REQUEST_METHOD'];
    $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

    $this->city = new City($this->c);

    switch ($method) {
      // Publish
    case 'POST':
      // Save
    case 'PUT':
      break;
      // Retrieve the page's json
    case 'GET':
      if ($_GET['format'] === 'json') {
        $this->getJson();
        exit;
      }
      break;
      // 'unpublish' the event (true deletes done through dashboard controller, not city)
    case 'DELETE':
      $c = Page::getCurrentPage();
      $c->setAttribute('exclude_page_list',true);
      break;
    }
  }

  public function getJson()
  {
    echo json_encode($this->city);
  }

  /*
   * view()
   * Main controller for all city pages
   * Set up variables you'll need in the view here.
   */
  public function view()
  {
    parent::view();
    $this->set('pageType', 'city-page');
    $this->set('isCityOrganizer', (new User)->getUserID() === $this->city->city_organizer->getUserID());
    $this->set('isLoggedIn', (bool) Loader::helper('concrete/dashboard')->canRead());
    $this->set('isCampaignActive', false); // Is the donations campaign running?
    $this->set('canEdit', is_object(ComposerPage::getByID($this->c->getCollectionID())));
    $this->set('city', $this->city);
  }

  /*
   * walks()
   * Called when you hit city/path/walks
   * Used for the 'show all walks', as this is very separate from the main city
   * logic. 'Edit' mode will expand both city areas and the areas shown in here,
   * so you can edit either mode at the same time.
   */
  public function walks()
  {
    $this->view();
    $this->set('show', 'all');
  }
}
