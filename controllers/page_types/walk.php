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
          try {
            $this->setJson($_REQUEST['json'], true);
            $this->setEventBrite('live');
          } catch(Exception $e) {
            Log::addEntry('Walk error on POST: '  . $e->getMessage());
            echo "Error publishing walk: " . $e->getMessage();
            http_response_code(500);
          }
          exit;
          break;
        // 'save'
        case 'PUT':
          try {
            parse_str(file_get_contents("php://input"),$put_vars);
            $this->setJson($put_vars['json']);
            $this->setEventBrite();
          } catch(Exception $e) {
            Log::addEntry('Walk error on PUT: '  . $e->getMessage());
            echo "Error saving walk: " . $e->getMessage();
            http_response_code(500);
          }
          exit;
          break;
        // Retrieve the page's json
        case 'GET':
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
        // 'unpublish' the event (true deletes done through dashboard controller, not walk)
        case 'DELETE':
          $c = Page::getCurrentPage();
          $c->setAttribute('exclude_page_list',true);
          $this->setEventBriteStatus('draft');
          exit;
          break;
      }
    }
    public function setEventBriteStatus($status='draft') {
      if(CONCRETE5_ENV === 'prod') {
        $c = Page::getCurrentPage();
        $eid = $c->getAttribute("eventbrite");
        if($eid) {
          $eb_client = new Eventbrite( array('app_key'=>'2ECDDYBC2I72R376TV', 'user_key'=>'136300279154938082283'));
          $event_params = array( 'status' => $status, 'id' => $eid );
          try{
            $response = $eb_client->event_update($event_params);
          }catch( Exception $e ){
            // application-specific error handling goes here
            $response = $e->error;
            Log::addEntry('EventBrite Error updating status for cID='.$c->getCollectionID().': ' . $e->getMessage());
          }
        }
      }
      else {
        return true;
      }
    }
    public function setEventBrite($status = null) {
      if(CONCRETE5_ENV === 'prod') {
        $c = Page::getCurrentPage();
        $c = Page::getByID($c->getCollectionID()); // Refresh to fix a c5 quirk; todo: try deleting this after c5.7 update
        $parent = Page::getByID($c->getCollectionParentID());
        $timezone = $parent->getAttribute("timezone");
        $eb_client = new Eventbrite( array('app_key'=>'2ECDDYBC2I72R376TV', 'user_key'=>'136300279154938082283'));
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
      $fh = Loader::helper('file');
      $im = Loader::helper('image');
      $c = Page::getCurrentPage();
      $thumbnail = $c->getAttribute("thumbnail");
      $walkData = ["title" => $c->getCollectionName(), 
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
        "thumbnail_url" => $thumbnail ? $im->getThumbnail($thumbnail, 340,720)->src : null,
        "eventbrite_id" => $c->getAttribute("eventbrite"),
        "ticket" => $resp ];

        /* Checkboxes */
        foreach(['theme', 'accessible'] as $akHandle) {
          foreach( $c->getAttribute($akHandle) as $av ) {
            $walkData['checkboxes'][$akHandle . "-" . $av] = true;
          }
        }
        return json_encode($walkData);
    }

    public function setJson($json, $publish = false) {
      $postArray = json_decode($json);
      $c = Page::getCurrentPage();
      if( isset($c) ) {
        if( empty($postArray->title) ) {
          throw new Exception("Walk title cannot be empty.");
          return;
        }
        $currentCollectionVersion = $c->getVersionObject();
        $newCollectionVersion = $currentCollectionVersion->createNew('Updated via walk form');
        $c->loadVersionObject($newCollectionVersion->getVersionID());

        $data = array("cName" => $postArray->title);
        $c->update($data);
        $c->setAttribute("shortdescription", $postArray->shortdescription);
        $c->setAttribute("longdescription", $postArray->longdescription);
        $c->setAttribute("accessible_info",$postArray->{'accessible-info'});
        $c->setAttribute("accessible_transit",$postArray->{'accessible-transit'});
        $c->setAttribute("accessible_parking",$postArray->{'accessible-parking'});
        $c->setAttribute("accessible_find", $postArray->{'accessible-find'});
        $c->setAttribute("scheduled", $postArray->time);

        // Don't bother saving completely empty maps, since it's usually done in error
        if(sizeof((array)$postArray->map->markers) + sizeof((array)$postArray->map->route)) {
          $c->setAttribute("gmap", json_encode($postArray->map));
        }
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
          }
        }
        foreach(['theme', 'accessible'] as $akHandle) {
          $c->setAttribute($akHandle, $checkboxes[$akHandle]);
        }
        if($publish) { $c->setAttribute('exclude_page_list',false); $newCollectionVersion->approve(); }
      }
    }

    public function getKml() {
      $fh = Loader::helper('file');
      $c = Page::getCurrentPage();
      $walkMap = json_decode($c->getAttribute("gmap"));
      // Creates the Document.
      $dom = new DOMDocument('1.0', 'UTF-8');

      // Creates the root KML element and appends it to the root document.
      $node = $dom->createElementNS('http://earth.google.com/kml/2.2', 'kml');
      $parNode = $dom->appendChild($node);

      // Creates a KML Document element and append it to the KML element.
      $dnode = $dom->createElement('Document');
      $docNode = $parNode->appendChild($dnode);
      $nameNode = $dom->createElement('name',htmlspecialchars($c->getCollectionName()) . " : Jane's Walk");
      $docNode->appendChild($nameNode);

      $defaultStyleNode = $dom->createElement('Style');
      $defaultStyleNode->setAttribute('id', 'jwstyle');
      $defaultIconstyleNode = $dom->createElement('IconStyle');
      $defaultIconstyleNode->setAttribute('id', 'jwIcon');
      $defaultIconNode = $dom->createElement('Icon');
      $defaultHref = $dom->createElement('href', 'http://janeswalk.net/images/orange-dot.png');
      $defaultIconNode->appendChild($defaultHref);
      $defaultIconstyleNode->appendChild($defaultIconNode);
      $defaultStyleNode->appendChild($defaultIconstyleNode);
      $docNode->appendChild($defaultStyleNode);
 
      foreach($walkMap->markers as $marker) {
        // Creates a Placemark and append it to the Document.
        $node = $dom->createElement('Placemark');
        $placeNode = $docNode->appendChild($node);

        // Create name, and description elements and assigns them the values of the name and address columns from the results.
        $nameNode = $dom->createElement('name');
        $cdata = $nameNode->ownerDocument->createCDATASection(htmlspecialchars($marker->title));
        $nameNode->appendChild($cdata);
        $placeNode->appendChild($nameNode);
        $descNode = $dom->createElement('description');

        $cdata = $descNode->ownerDocument->createCDATASection(htmlspecialchars($marker->description));
        $descNode->appendChild($cdata);
        $placeNode->appendChild($descNode);

        // Creates a Point element.
        $pointNode = $dom->createElement('Point');
        $placeNode->appendChild($pointNode);

        // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
        $coorStr = $marker->lng . "," . $marker->lat;
        $coorNode = $dom->createElement('coordinates', $coorStr);
        $pointNode->appendChild($coorNode);
      }
      $coorStr = '';
      foreach($walkMap->route as $route) {
        // Creates a Placemark and append it to the Document.
        $node = $dom->createElement('Placemark');
        $placeNode = $docNode->appendChild($node);

        // Creates a Point element.
        $pointNode = $dom->createElement('LineString');
        $placeNode->appendChild($pointNode);

        // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
        $coorStr .= "\n{$route->lng}, {$route->lat}, 0";
      }
      if($coorStr) {
        $coorNode = $dom->createElement('coordinates', $coorStr);
        $pointNode->appendChild($coorNode);
      }

      $kmlOutput = $dom->saveXML();
      header('Content-type: application/vnd.google-earth.kml+xml');
      echo $kmlOutput;
    }

    public function view() {
      $nh = Loader::helper('navigation');
      $c = $this->getCollectionObject();

      $crumbs = $nh->getTrailToCollection($c);
      krsort($crumbs);

      $team = json_decode($c->getAttribute('team'), true);
      $theme = PageTheme::getByHandle('janeswalk');
      $team = array_map(function($mem) use ($theme) { 
        if($mem['type'] === 'you') {
          $mem['type'] = ($mem['role'] === 'walk-organizer') ? 'organizer' : 'leader';
        }
        switch($mem['type']) {
        case 'leader':
          $mem['image'] = "{$theme->getThemeURL()}/img/walk-leader.png";
          $mem['title'] = 'Walk Leader';
          break;
        case 'organizer':
          $mem['image'] = "{$theme->getThemeURL()}/img/walk-organizer.png";
          $mem['title'] = 'Walk Organizer';
          break;
        case 'community':
          $mem['image'] = "{$theme->getThemeURL()}/img/community-voice.png";
          $mem['title'] = 'Community Voice';
          break;
        case 'volunteer':
          $mem['image'] = "{$theme->getThemeURL()}/img/volunteers.png";
          $mem['title'] = 'Volunteer';
          break;
        default:
          break;
        }
        if($mem['user_id'] > 0) {
          $av = Loader::helper('concrete/avatar');
          if($avatar = $av->getImagePath(UserInfo::getByID($mem['user_id']))) {
            $mem['avatar'] = $avatar;
          }
        }
        return $mem;
      }, $team);
      $this->set('eid', $c->getAttribute('eventbrite'));
      $this->set('crumbs', $crumbs);
      $this->set('scheduled', $c->getAttribute('scheduled'));
      $this->set('gmap', json_decode($c->getAttribute('gmap')));
      $this->set('team', $team);
      $this->set('walk_leaders', array_filter($team, function($mem) { return strpos($mem['type'], 'leader') !== false; }));
      $this->set('city', Page::getByID($c->getCollectionParentID()));
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
