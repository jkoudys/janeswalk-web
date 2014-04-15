<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  class CityPageTypeController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

      switch ($method) {
        // Publish
        case 'POST':
        // Save
        case 'PUT':
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
      $fh = Loader::helper('file');
      $nh = Loader::helper('navigation');
      $im = Loader::helper('image');
      $u = new User();
      $c = Page::getCurrentPage();
      $pl = new PageList();
      $pl->filterByCollectionTypeHandle('walk');
      $pl->filterByPath($c->getCollectionPath());
      $pl->filterByAttribute('exclude_page_list',false);
      $city_organizer = UserInfo::getByID($c->getCollectionUserID());
      $pagecount = 500;
      $cityData = ['title' => $c->getCollectionName(), 
        'url' => $nh->getCollectionURL($c),
        'background' => ($bg = $c->getAttribute('full_bg')) ? $bg->getURL() : null,
        /* We'll assume each area's first block is the one with the descriptions */
        'short_description' => $c->getBlocks('City Header')[0]->getController()->getContent(),
        'long_description' => $c->getBlocks('City Description')[0]->getController()->getContent(),
        'sponsors' => $c->getBlocks('Sponsors')[0]->getController()->getContent(),
      ]; 
      if($city_organizer->getUserID() > 1) {
        $cityData['city_organizer'] = [
          'photo' => Loader::helper('concrete/avatar')->getImagePath($city_organizer),
          'first_name' => $city_organizer->getAttribute('first_name'),
          'last_name' => $city_organizer->getAttribute('last_name'),
          'email' => $city_organizer->getUserEmail(),
          'facebook' => $city_organizer->getAttribute('facebook'),
          'twitter' => $city_organizer->getAttribute('twitter'),
          'website' => $city_organizer->getAttribute('website'),
          ];
      }
      foreach($pl->get($pagecount) as $key => $page) {
        $scheduled = $page->getAttribute('scheduled');
        $slots = (Array)$scheduled['slots']; 
        $cityData['walks'][$key] = ['url' => $nh->getCollectionURL($page),
          'title' => $page->getCollectionName(),
          'thumb' => ($thumb = $page->getAttribute('thumbnail')) ? $im->getThumbnail($thumb, 340,720)->src : null,
          'schedule' => isset($scheduled['open']) ? 'Open Schedule' : (isset($slots[0]['date']) ? $slots[0]['date'] : null),
          'wards' => $page->getAttribute('walk_wards'),
          'time' => isset($slots[0]['time']) ? $slots[0]['time'] : 'multiple',
          'map' => json_decode($page->getAttribute('gmap')),
          'short_description' => $page->getAttribute('shortdescription')];
        foreach($slots as $slot) {
          $cityData['walks'][$key]['slots'][] = ['date' => $slot['date'], 'time' => $slot['time'] ?: 'multiple'];
        } 
        foreach(json_decode($page->getAttribute('team')) as $memkey=>$mem) {
          $cityData['walks'][$key]['team'] .= ($memkey == 0 ? 'Walk led by ' : ($memkey > 0 ? ', ' : '')) . "{$mem->{'name-first'}} {$mem->{'name-last'}}";
        }
      }
      echo json_encode($cityData);
    }

    public function view() {
      // Set our helpers
      $im = Loader::helper('image');
      $nh = Loader::helper('navigation');
      $dh = Loader::helper('concrete/dashboard');
      $av = Loader::helper('concrete/avatar');
      $this->set('im', $im);
      $this->set('nh', $nh);
      $this->set('dh', $dh);
      $this->set('av', $av);

      // Load + format data
      $c = $this->getCollectionObject();
      $page_owner = UserInfo::getByID($c->getCollectionUserID()) ?: UserInfo::getByID(1); // System page, e.g. page defaults editor
      $avatar = $av->getImagePath($page_owner) ?: false;
      $this->set('pageType', 'city-page');

      $facebook = trim((string) $page_owner->getAttribute('facebook'));
      $twitter = trim((string) $page_owner->getAttribute('twitter'));
      $website = trim((string) $page_owner->getAttribute('website'));

      $blog = new PageList();
      $blog->filterByCollectionTypeHandle('city_blog');
      $blog->filterByParentID($c->getCollectionID());

      $walks = new PageList();
      $walks->filterByParentID($c->getCollectionID());
      $walks->filterByAttribute('exclude_page_list', false);
      $walks->filterByCollectionTypeHandle('walk');
      $this->set('totalWalks',$walks->getTotal());

      // Set our calculated values
      $this->set('fullbg', $c->getAttribute("full_bg"));
      $this->set('show', $_REQUEST['show']);
      $this->set('avatar', $avatar);
      $this->set('page_owner', $page_owner);
      $this->set('profile_path', DIR_REL . '/' . DISPATCHER_FILENAME . "/profile/{$page_owner->getUserId()}");
      $this->set('blog', $blog->get(1)[0]);

      // Put characters to only show contents to the right of
      $this->set('facebook_url', $facebook ? 'http://facebook.com/' . end(preg_split('/\//', $facebook)) : false );
      $this->set('twitter_url', $twitter ? 'http://twitter.com/' . end(preg_split('/[@\/]/', $twitter)) : false );
      $this->set('website_url', $website ? (0 === strpos($website, 'http')) ? $website : ('http://' . $website) : false);
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
