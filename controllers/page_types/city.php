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
      $cityData = array("title" => $c->getCollectionName(), "url" => $nh->getCollectionURL($c)); 
      $pl->filterByCollectionTypeHandle("walk");
      $pl->filterByPath($c->getCollectionPath());
      $pl->filterByAttribute('exclude_page_list',false);
      $pagecount = 100;
      $cityData["walks"] = array();
      foreach($pl->get($pagecount) as $page) {
        $walk = array("url" => $nh->getCollectionURL($page));
        $thumb = $page->getAttribute("thumbnail"); 
        if( $thumb ) {
          $walk["thumb"] = $im->getThumbnail($thumb,340,720)->src;
        }
        $walk["title"] = $page->getCollectionName();
        $scheduled = $page->getAttribute('scheduled');
        $slots = (Array)$scheduled['slots']; 
        if($scheduled['open']) {
          $walk["schedule"] = "Open schedule";
        } else if(isset($slots[0]['date'])) {
          $walk["schedule"] = $slots[0]['date'];
        }
        $team = json_decode($page->getAttribute('team'));
        $walk["team"] = "";
        foreach($team as $key=>$mem) {
          $walk["team"] .= ($key == 0 ? "Walk led by " : ($key > 0 ? ", " : "")) . $mem->{'name-first'} . " " . $mem->{'name-last'};
        }
        $walk["shortdescription"] = $page->getAttribute('shortdescription');

        $cityData["walks"][] = $walk;
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
