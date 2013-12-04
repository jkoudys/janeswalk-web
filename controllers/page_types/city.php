<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  class CityPageTypeController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

      switch ($method) {
        // The 'publish' for an event
        case 'POST':
          exit;
          break;
        // 'save'
        case 'PUT':
          exit;
          break;
        // Retrieve the page's json
        case 'GET':
          if($_GET['format'] == 'json') {
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
    public function rest() {
    }
    public function save() {
    }

    public function getJson() {
      Loader::model('page_list');
      $pl = new PageList();
      $fh = Loader::helper('file');
      $nh = Loader::helper('navigation');
      $im = Loader::helper('image');
      $u = new User();
      $c = Page::getCurrentPage();
      $cityData = ["title" => $c->getCollectionName(), "url" => $nh->getCollectionURL($c)]; 
      $pl->filterByCollectionTypeHandle("walk");
      $pl->filterByPath($c->getCollectionPath());
      $pl->filterByAttribute('exclude_page_list',false);
      $pagecount = 100;
      $cityData["walks"] = array();
      foreach($pl->get($pagecount) as $key => $page) {
        $scheduled = $page->getAttribute('scheduled');
        $slots = (Array)$scheduled['slots']; 
        $cityData["walks"][$key] = ["url" => $nh->getCollectionURL($page),
          "title" => $page->getCollectionName(),
          "team" => "",
          "thumb" => "",
          "schedule" => isset($scheduled["open"]) ? "Open Schedule" : (isset($slots[0]['date']) ? $slots[0]['date'] : null),
          "shortdescription" => $page->getAttribute('shortdescription')];
        
        $thumb = $page->getAttribute("thumbnail"); 
        if( $thumb ) {
          $cityData["walks"][$key]["thumb"] = $im->getThumbnail($thumb,340,720)->src;
        }
        $team = json_decode($page->getAttribute('team'));
        foreach($team as $memkey=>$mem) {
          $cityData["walks"][$key]["team"] .= ($memkey == 0 ? "Walk led by " : ($memkey > 0 ? ", " : "")) . $mem->{'name-first'} . " " . $mem->{'name-last'};
        }
      }
      echo json_encode($cityData);
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
