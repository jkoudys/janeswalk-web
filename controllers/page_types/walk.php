<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  Loader::library('Eventbrite');
  class WalkPageTypeController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));
      $c = Page::getCurrentPage();
      $walkName = $c->getCollectionName()

      switch ($method) {
        case 'PUT':
          $this->newEvent();
          break;
        case 'POST':
          $this->setJson($_POST['json']);
          if(!empty($walkName)) { $this->setEventBrite(); }
          exit;
          break;
        case 'GET':
          if($_GET['format'] == 'json') {
            $this->getJson();
            exit;
          }
          break;
        case 'DELETE':
          break;
      }
    }
    public function rest() {
    }
    public function save() {
    }

    public function setEventBrite() {
      $c = Page::getCurrentPage();
      $eb_client = new Eventbrite( array('app_key'=>'2ECDDYBC2I72R376TV', 'user_key'=>'136300279154938082283'));
      /* Check if we're making a new event or not */
      $eid = $c->getAttribute("eventbrite");
      $event_params = array(
          'title' => $c->getCollectionName(),
          'description' => $c->getAttribute("longdescription"),
          'start_date' => date('Y-m-d H:i:s', time()),
          'end_date' => date('Y-m-d H:i:s', time() + (365 * 24 * 60 * 60) )
      );
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
          $response = $eb_client->event_update($event_params);
        }catch( Exception $e ){
          $response = $e->error;
          Log::addEntry('EventBrite Error updating event ' . $eid . ' for cID='.$c->getCollectionID().': ' . $e->getMessage());
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

    public function setJson($json) {
      $postArray = json_decode($json);
      $c = Page::getCurrentPage();
      if( isset($c) ) {
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
