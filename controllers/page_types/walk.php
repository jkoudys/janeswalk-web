<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  class WalkPageTypeController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

      switch ($method) {
        case 'PUT':
          $this->newEvent();
          break;
        case 'POST':
          $this->setJson($_POST['json']);
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

    public function newEvent() {
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_POST, 1);
      $data = "https://www.eventbrite.com/xml/event_new?...&title={$c->getCollectionName()}&description={$c->getAttribute("shortdescription")}&start_date=2007-12-31+10:00:00&end_date=2008-01-01+02:00:00&timezone=GMT+01";

      if ($data)
        $url = sprintf("%s?%s", $url, http_build_query($data));

    }

    public function getJson() {
      $c = Page::getCurrentPage();
      $checkboxes = array();
      $walkData = array("title" => $c->getCollectionName(), 
        "shortdescription" => $c->getAttribute("shortdescription"),
        "longdescription" => $c->getAttribute("longdescription"),
        "accessible-info" => $c->getAttribute("accessible_info"),
        "accessible-transit" => $c->getAttribute("accessible_transit"),
        "accessible-parking" => $c->getAttribute("accessible_parking"),
        "accessible-find" => $c->getAttribute("accessible_find"),
        "map" => json_decode($c->getAttribute("gmap")),
        "team" => json_decode($c->getAttribute("team")),
        "time" => $c->getAttribute("scheduled"));

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
