<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  Loader::library('Eventbrite');
  class WalkPageTypeController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

      switch ($method) {
        // The 'publish' for an event
        case 'POST':
          $this->setJson($_POST['json'], true);
          $this->setEventBrite('live');
          break;
        // 'save'
        case 'PUT':
          parse_str(file_get_contents("php://input"),$put_vars);
          $this->setJson($put_vars['json']);
          $this->setEventBrite();
          exit;
          break;
        // Retrieve the page's json
        case 'GET':
          if($_GET['format'] == 'json') {
            $this->getJson();
            exit;
          }
          break;
        // 'unpublish' the event (true deletes done through dashboard controller, not walk)
        case 'DELETE':
          break;
      }
    }
    public function rest() {
    }
    public function save() {
    }

    public function setEventBrite($status = null) {
      $c = Page::getCurrentPage();
      $c = Page::getByID($c->getCollectionID()); // Refresh
      $eb_client = new Eventbrite( array('app_key'=>'2ECDDYBC2I72R376TV', 'user_key'=>'136300279154938082283'));
      /* Check if we're making a new event or not */
      $eid = $c->getAttribute("eventbrite");
      $event_params = array(
          'title' => $c->getCollectionName(),
          'description' => $c->getAttribute("longdescription"),
          'privacy' => '1',
          'start_date' => date('Y-m-d H:i:s', time()),
          'end_date' => date('Y-m-d H:i:s', time() + (365 * 24 * 60 * 60) )
      );
      if(isset($status)) {
        $event_params['status'] = $status;
      }
      /* Jane's Walks are always free */
      $ticket_params = array(
        'price' => '0.00',
        'min' => '1',
        'max' => '20',
        'quantity_available' => '250',
        'start_date' => date('Y-m-d H:i:s', time()) );
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
          Log::addEntry('EventBrite Error creating new event for cID='.$c->getCollectionID().': ' . $e->getMessage());
        }
      }
      else {
        try{
          $event_params['id'] = $eid;
          $ticket_params['event_id'] = $eid;
          $response = $eb_client->event_update($event_params);
        }catch( Exception $e ){
          $response = $e->error;
          Log::addEntry('EventBrite Error updating event ' . $eid . ' for cID='.$c->getCollectionID().': ' . $e->getMessage());
        }
      }
      $ticket_params['end_date'] = $event_params['end_date'];
      foreach($slots as $walkDate) {
        $ticket_params['name'] = $walkDate['date'] . ' Walk';
        try {
          $response = $eb_client->ticket_new($ticket_params);
        }catch( Exception $e ){
          $response = $e->error;
          Log::addEntry('EventBrite Error updating ticket for cID='.$c->getCollectionID().': ' . $e->getMessage());
        }
      }
    }

    public function getJson() {
      $fh = Loader::helper('file');
      $c = Page::getCurrentPage();
      $checkboxes = array();
      $thumbnail = $c->getAttribute("thumbnail");
      $walkData = array("title" => $c->getCollectionName(), 
        "shortdescription" => $c->getAttribute("shortdescription"),
        "longdescription" => $c->getAttribute("longdescription"),
        "accessible-info" => $c->getAttribute("accessible_info"),
        "accessible-transit" => $c->getAttribute("accessible_transit"),
        "accessible-parking" => $c->getAttribute("accessible_parking"),
        "accessible-find" => $c->getAttribute("accessible_find"),
        "map" => json_decode($c->getAttribute("gmap")),
        "team" => json_decode($c->getAttribute("team")),
        "time" => $c->getAttribute("scheduled"),
        "thumbnail_id" => ($thumbnail ? $thumbnail->getFileID() : null),
        "ticket" => $resp );

        /* Checkboxes */
        $walkData['checkboxes'] = array();
        foreach(['theme', 'accessible'] as $akHandle) {
          foreach( $c->getAttribute($akHandle) as $av ) {
            $checkboxes[$akHandle . "-" . $av] = true;
          }
        }
        $walkData['checkboxes'] = $checkboxes;

        echo json_encode($walkData);
    }

    public function setJson($json, $publish = false) {
      $postArray = json_decode($json);
      $c = Page::getCurrentPage();
      if( isset($c) ) {
        $currentCollectionVersion = $c->getVersionObject();
        $newCollectionVersion = $currentCollectionVersion->createNew('Updated via walk form');
        $c->loadVersionObject($newCollectionVersion->getVersionID());

        $data = array("cName" => $postArray->title); $c->update($data);
        $c->setAttribute("shortdescription", $postArray->shortdescription);
        $c->setAttribute("longdescription", $postArray->longdescription);
        $c->setAttribute("accessible_info",$postArray->{'accessible-info'});
        $c->setAttribute("accessible_transit",$postArray->{'accessible-transit'});
        $c->setAttribute("accessible_parking",$postArray->{'accessible-parking'});
        $c->setAttribute("accessible_find", $postArray->{'accessible-find'});
        $c->setAttribute("scheduled", $postArray->time);
        $c->setAttribute("gmap", json_encode($postArray->map));
        $c->setAttribute("team", json_encode($postArray->team));
        if($postArray->thumbnail_id && File::getByID($postArray->thumbnail_id)) {
          $c->setAttribute("thumbnail", File::getByID($postArray->thumbnail_id));
        }

        /* Go through checkboxes */
        $checkboxes = array();
        foreach(['theme', 'accessible'] as $akHandle) {
          $checkboxes[$akHandle] = array();
        }
        foreach($postArray->checkboxes as $key => $checked) {
          $selectAttribute = strtok($key, "-");
          $selectValue = strtok("");
          if($checked) {
            array_push($checkboxes[$selectAttribute], $selectValue);
//          $checkboxes[$selectAttribute][$selectValue] = $checked ? true : false;
          }
        }
        foreach(['theme', 'accessible'] as $akHandle) {
          $c->setAttribute($akHandle, $checkboxes[$akHandle]);
        }
        if($publish) { $newCollectionVersion->approve(); }
      }
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
