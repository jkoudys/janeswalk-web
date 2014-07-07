<?php 
use \JanesWalk\Model\PageType\Walk;
use \JanesWalk\Controller\Controller;

defined('C5_EXECUTE') or die("Access Denied.");
Loader::library('Eventbrite');
Loader::controller('/janes_walk');
Loader::model('page_types/walk');

class WalkPageTypeController extends Controller {

  protected $walk; // Walk model object

  public function on_start() {
    $request = split('/', substr($_SERVER['PATH_INFO'], 1));
    $cp = new Permissions($this->c);
    $this->walk = new Walk($this->c);

    /* Ideally this should be in a router, not the individual on_start.
     * c5.7 uses symfony2 for routing; TODO: either use the c5.6 'Request' class, 
     * or wait for 5.7.
     */
    switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
      $this->create();
      break;
    case 'PUT':
      $this->update();
      break;
    case 'GET':
      $this->show();
      break;
    case 'DELETE':
      $this->destroy();
      break;
    }
  }

  /*
   * show
   * Render view contents. Fall-through behaviour renders theme as HTML via view(). If 'format' is set, render in requested format
   */
  public function show() {
    if($_GET['format'] === 'json') {
      // Render JSON
      header('Content-Type: application/json');
      echo $this->getJson();
      exit;
    } else if($_GET['format'] === 'kml' || 0 === strpos($_SERVER['HTTP_USER_AGENT'],'Kml-Google')) {
      // Render KML of map only
      header('Content-Type: application/vnd.google-earth.kml+xml');
      $this->getKml();
      exit;
    }
  }

  /*
   * create
   * Saves a version of Walk collection, and makes it live
   */
  public function create() {
    try {
        $this->setJson($_REQUEST['json'], true);
        $this->setEventBrite('live');
      } catch(Exception $e) {
        Log::addEntry('Walk error on POST: ', $e->getMessage());
        echo 'Error publishing walk: ', $e->getMessage();
        http_response_code(500);
      }
  }

  /*
   * update
   * Saves a version of the walk collection, but doesn't approve version
   */
  public function update() {
    try {
      parse_str(file_get_contents('php://input'),$put_vars);
      $this->setJson($put_vars['json']);
      $this->setEventBrite();
    } catch(Exception $e) {
      Log::addEntry('Walk error on PUT: ', $e->getMessage());
      echo "Error saving walk: ", $e->getMessage();
      http_response_code(500);
    }
  }

  /*
   * destroy
   * Simply unpublishes the walk
   */
  public function destroy() {
    $this->c->setAttribute('exclude_page_list',true);
    $this->setEventBriteStatus('draft');
    exit;
  }


  protected function setEventBriteStatus($status='draft') {
    if(CONCRETE5_ENV === 'prod') {
      $eid = $this->c->getAttribute("eventbrite");
      if($eid) {
        $eb_client = new Eventbrite( array('app_key'=>EVENTBRITE_APP_KEY, 'user_key'=>EVENTBRITE_USER_KEY) );
        $event_params = array( 'status' => $status, 'id' => $eid );
        try{
          $response = $eb_client->event_update($event_params);
        }catch( Exception $e ){
          // application-specific error handling goes here
          $response = $e->error;
          Log::addEntry('EventBrite Error updating status for cID='.$this->c->getCollectionID().': ' . $e->getMessage());
        }
      }
    }
    else {
      return true;
    }
  }
  protected function setEventBrite($status = null) {
    if(CONCRETE5_ENV === 'prod') {
      $c = $this->c;
      $c = Page::getByID($c->getCollectionID()); // Refresh to fix a c5 quirk; todo: try deleting this after c5.7 update
      $parent = Page::getByID($c->getCollectionParentID());
      $timezone = $parent->getAttribute("timezone");
      $eb_client = new Eventbrite( array('app_key'=>EVENTBRITE_APP_KEY, 'user_key'=>EVENTBRITE_USER_KEY) );
      /* Check if we're making a new event or not */
      $eid = $c->getAttribute("eventbrite");
      $event_params = [ 
        'title' => $c->getCollectionName(),
          'description' => $c->getAttribute("longdescription"),
          'privacy' => '1',
          'start_date' => date('Y-m-d H:i:s', time()),
          'end_date' => date('Y-m-d H:i:s', time() + (365 * 24 * 60 * 60) ),
          'confirmation_page' => 'http://janeswalk.org/donate'
        ];
      if(isset($status)) {
        $event_params['status'] = $status;
      }
      if(isset($timezone)) {
        $event_params['timezone'] = $timezone;
      }

      /* Jane's Walks are always free */
      $ticket_params = [
        'price' => '0.00',
        'min' => '1',
        'max' => '20',
        'quantity_available' => '250',
        'start_date' => date('Y-m-d H:i:s', time()) ];
      /* If it's an 'open' booking, then it's a daily repeating event for the next year */
      $scheduled = $c->getAttribute('scheduled');
      $slots = (Array)$scheduled['slots']; 
      if($scheduled['open']) {
        $event_params['start_date'] = date('Y-m-d', time());
        $event_params['end_date'] = date('Y-m-d', time());
        $event_params['repeats'] = 'yes';
        // Until 'repeats' is working by eb, just assume the next available date is the one that's open to book
      } else if(isset($slots[0]['date'])) { 
        $event_params['start_date'] = $slots[0]['eb_start'];
        $event_params['end_date'] = $slots[0]['eb_end'];
      }

      Log::addEntry('EventBrite event_params: ' . print_r($event_params,true));
      if( empty($eid) ) {
        try{
          $response = $eb_client->event_new($event_params);
          $ticket_params['event_id'] = $response->process->id;
          $c->setAttribute("eventbrite", $response->process->id);
        }catch( Exception $e ){
          // application-specific error handling goes here
          $response = $e->error;
          Log::addEntry("EventBrite Error creating new event for cID={$c->getCollectionID()}: {$e->getMessage()}");
        }
      }
      else {
        try{
          $event_params['id'] = $eid;
          $ticket_params['event_id'] = $eid;
          $response = $eb_client->event_update($event_params);
        }catch( Exception $e ){
          $response = $e->error;
          Log::addEntry("EventBrite Error updating event for cID={$c->getCollectionID()}: {$e->getMessage()}");
        }
      }
      $ticket_params['end_date'] = $event_params['end_date'];
      foreach($slots as $walkDate) {
        $ticket_params['name'] = $walkDate['date'] . ' Walk';
        try {
          $response = $eb_client->ticket_new($ticket_params);
        }catch( Exception $e ){
          $response = $e->error;
          Log::addEntry("EventBrite Error updating ticket for cID={$c->getCollectionID()}: {$e->getMessage()}");
        }
      }
    } else {
      return true;
    }
  }

  protected function getJson() {
    return json_encode($this->walk);
  }

  protected function setJson($json, $publish = false) {
    /* Set the model by the json envelope */
    $this->walk->setJson($json);

    /* We use 'exclude_page_list' to 'unpublish' walks */
    if($publish) {
      $c->setAttribute('exclude_page_list',false);
      $newCollectionVersion->approve();
    }
  }

  protected function getKml() {
    header('Content-type: application/vnd.google-earth.kml+xml');
    $this->walk->kmlSerialize()->save('php://output');
  }

  public function view() {
    parent::view();
    $nh = Loader::helper('navigation');
    $im = Loader::helper('image');
    $c = $this->getCollectionObject();

    // Put the preview image for Facebook/Twitter to pick up
    $doc = new DOMDocument;
    if($thumb) {
      $meta = $doc->appendChild($doc->createElement('meta'));
      $meta->setAttribute('property','og:image');
      $meta->setAttribute('content', BASE_URL . $im->getThumbnail($thumb,340,720)->src);
    }
    $meta = $doc->appendChild($doc->createElement('meta'));
    $meta->setAttribute('property','og:url');
    $meta->setAttribute('content', $nh->getCollectionURL($c));
    $meta = $doc->appendChild($doc->createElement('meta'));
    $meta->setAttribute('property','og:title');
    $meta->setAttribute('content', $c->getCollectionName());
    $meta = $doc->appendChild($doc->createElement('meta'));
    $meta->setAttribute('property','og:description');
    $meta->setAttribute('content', $c->getAttribute('shortdescription'));
    $this->addHeaderItem($doc->saveHTML());

    // Breadcrumb trail to walk
    $bc = $doc->appendChild($doc->createElement('ul'));
    $bc->setAttribute('class', 'breadcrumb visible-desktop visible-tablet');
    foreach((array)$this->walk->crumbs as $crumb) {
      if ($crumb->getCollectionTypeHandle() !== 'country' ) {
        $li = $bc->appendChild($doc->createElement('li'));
        $a = $li->appendChild($doc->createElement('a'));
        $a->setAttribute('href', $nh->getLinkToCollection($crumb));
        if($crumb->getCollectionID() === '1') {
          $a->appendChild($doc->createElement('i'))->setAttribute('class','icon-home');
        }
        else {
          $linkText = $crumb->getCollectionName();
          if($crumb->getCollectionTypeHandle() === 'city') {
            $linkText .= ' walks';
          }
          $a->appendChild($doc->createTextNode(t($linkText)));
        }
        if($k !== count($this->walk->crumbs)) {
          $span = $li->appendChild($doc->createElement('span'));
          $span->setAttribute('class','divider');
          $span->appendChild($doc->createElement('i'))->setAttribute('class','icon-angle-right');
        }
      }
    }
    $li = $bc->appendChild($doc->createElement('li'));
    $li->setAttribute('class','active');
    $li->appendChild($doc->createTextNode($c->getCollectionName()));
    $this->set('breadcrumb', $doc->saveHTML($bc));

    /* Helpers to use in the view */
    $this->set('im', $im);
    $this->set('th', Loader::helper('theme'));
    $this->set('eid', $c->getAttribute('eventbrite'));
    $this->set('w', $this->walk);

    // Setup the page data needed in the script block
    $this->addToJanesWalk([
      'page' => [
        'description' => strip_tags($c->getAttribute('longdescription')),
        'city' => [
          'name' => $this->walk->city->getCollectionName(),
          'url' => $nh->getCollectionURL($this->walk->city),
        ],
        'gmap' => $this->walk->map,
      ]
    ]);
  }
}
