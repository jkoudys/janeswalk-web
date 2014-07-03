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
    $method = $_SERVER['REQUEST_METHOD'];
    $request = split('/', substr(@$_SERVER['PATH_INFO'], 1));
    $cp = new Permissions($this->c);
    $walk = new Walk($this->c);

    switch ($method) {
    case 'POST':
      // The 'publish' for an event
      try {
        //            $cp->canWrite() or throw new Exception('Cannot update walk.');
        $this->setJson($_REQUEST['json'], true);
        $this->setEventBrite('live');
      } catch(Exception $e) {
        Log::addEntry('Walk error on POST: ', $e->getMessage());
        echo 'Error publishing walk: ', $e->getMessage();
        http_response_code(500);
      }
      exit;
      break;
    case 'PUT':
      // 'save'
      try {
        //            $cp->canWrite() or die('Cannot update walk.');
        parse_str(file_get_contents('php://input'),$put_vars);
        $this->setJson($put_vars['json']);
        $this->setEventBrite();
      } catch(Exception $e) {
        Log::addEntry('Walk error on PUT: ', $e->getMessage());
        echo "Error saving walk: ", $e->getMessage();
        http_response_code(500);
      }
      exit;
      break;
    case 'GET':
      // Retrieve the page's json
      //          $cp->canRead() or die('Cannot read walk.');
      if($_REQUEST['format'] == 'json') {
        header('Content-Type: application/json');
        echo $this->getJson();
        exit;
      }
      if($_REQUEST['format'] == 'kml' || 0 === strpos($_SERVER['HTTP_USER_AGENT'],"Kml-Google")) {
        $this->getKml();
        exit;
      }
      break;
    case 'DELETE':
      // 'unpublish' the event (true deletes done through dashboard controller, not walk)
      //          $cp->canWrite() or die('Cannot unpublish walk.');
      $this->c->setAttribute('exclude_page_list',true);
      $this->setEventBriteStatus('draft');
      exit;
      break;
    }
  }
  public function setEventBriteStatus($status='draft') {
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
  public function setEventBrite($status = null) {
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

  public function getJson() {
    return json_encode($this->walk);
  }

  public function setJson($json, $publish = false) {
    /* Set the model by the json envelope */
    $this->walk->setJson($json);

    /* We use 'exclude_page_list' to 'unpublish' walks */
    if($publish) {
      $c->setAttribute('exclude_page_list',false);
      $newCollectionVersion->approve();
    }
  }

  public function getKml() {
    header('Content-type: application/vnd.google-earth.kml+xml');
    $this->walk->kmlSerialize()->save('php://output');
  }

  public function view() {
    parent::view();
    $nh = Loader::helper('navigation');
    $im = Loader::helper('image');
    $c = $this->getCollectionObject();

    // Put the preview image for Facebook/Twitter to pick up
    $thumb && $this->addHeaderItem('<meta property="og:image" content="' . BASE_URL . $im->getThumbnail($thumb,340,720)->src . '" />');
    $this->addHeaderItem('<meta property="og:url" content="' . $nh->getCollectionURL($c)  . '" />');
    $this->addHeaderItem('<meta property="og:title" content="' . addslashes($c->getCollectionName()) . '" />');
    $this->addHeaderItem('<meta property="og:description" content="' . addslashes($c->getAttribute('shortdescription')) . '" />');

    $breadcrumb = '<ul class="breadcrumb visible-desktop visible-tablet">';
    foreach((array)$this->walk->crumbs as $crumb) {
      if ($crumb->getCollectionTypeHandle() !== 'country' ) {
        $breadcrumb .= '<li>';
        $link = $nh->getLinkToCollection($crumb);
        if($crumb->getCollectionID() === 1) {
          $name = '<i class="icon-home"></i>';
        }
        else {
          $name = t($crumb->getCollectionName());
        }
        if($crumb->getCollectionTypeHandle() === 'city') {
          $link .= 'walks';
        }
        $breadcrumb .= '<a href="' . $link . '">' . $name . '</a>';
        $breadcrumb .= '<span class="divider"><i class="icon-angle-right"></i></span></li>';
      }
    }
    $breadcrumb .= '<li class="active">' . $c->getCollectionName() . '</li></ul>';
    $this->set('breadcrumb', $breadcrumb);

    /* Helpers to use in the view */
    $this->set('nh', $nh);
    $this->set('im', $im);
    $this->set('dh', Loader::helper('concrete/dashboard'));
    $this->set('th', Loader::helper('theme'));
    $this->set('av', Loader::helper('concrete/avatar'));
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

  public function isPut() {
    return $_SERVER['REQUEST_METHOD'] == 'PUT';
  }
  public function isGet() {
    return $_SERVER['REQUEST_METHOD'] == 'GET';
  }
  public function isDelete() {
    return $_SERVER['REQUEST_METHOD'] == 'DELETE';
  }
}
