<?php
use \JanesWalk\Controllers\Controller;
use \JanesWalk\Models\PageTypes\City;
defined('C5_EXECUTE') || die("Access Denied.");

Loader::model('page_types/City');
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

  /**
   * view()
   * Main controller for all city pages
   * Set up variables you'll need in the view here.
   */
  public function view()
  {
      $c = $this->c;
      $city = $this->city;

      parent::view();

      // Setup flags for saying what access the viewer has
      $isCityOrganizer = (new User)->getUserID() === $this->city->city_organizer->getUserID();
      $canEdit = is_object(ComposerPage::getByID($this->c->getCollectionID()));

      $doc = $c->domInit();
      
      // City name
      $c->domCreateElement('City', (string) $city);

      // Build our city organizer info
      $co = $c->domCreateElement('CityOrganizer');
      $co->setAttribute('href', $city->profile_path);
      $co->setAttribute(
          'name',
          $city->city_organizer->getAttribute('first_name') .
          ' ' .
          $city->city_organizer->getAttribute('last_name')
      );

      $co->setAttribute('email', $city->city_organizer->getUserEmail());
      $e = $co->appendChild($doc->createElement('Edit'));
      $e->setAttribute('href', View::url('/profile/edit'));

      $contactMethods = [];
      if ($city->facebook) $contactMethods[] = ['facebook', $city->facebook_url];
      if ($city->twitter) $contactMethods[] = ['twitter', $city->twitter_url];
      if ($city->website) $contactMethods[] = ['website', $city->website_url];
      
      foreach ($contactMethods as $cm) {
          $e = $co->appendChild($doc->createElement('ContactMethod'));
          $e->setAttribute('name', $cm[0]);
          $e->setAttribute('href', $cm[1]);
      }

      // Edit in composer
      if ($canEdit) {
          $e = $c->domCreateElement('Edit');
          $e->setAttribute('href', View::url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()));
      }

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
