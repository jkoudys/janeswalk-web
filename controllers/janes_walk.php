<?php

defined('C5_EXECUTE') or die("Access Denied.");
class JanesWalkController extends Controller {
  protected $pageData = array();

  /*
   * addToJanesWalk
   *
   * @param array $properties Array containing one or more, possibly multi-level properties
   */
  public function addToJanesWalk($properties) {
    $this->pageData = array_merge_recursive($this->pageData, $properties);
  }

  /*
   * view
   * Sets up the basic info we'll need from json
   *
   * void
   */
  public function view() {
    $nh = Loader::helper('navigation');
    $u = new User();
    $c = $this->getCollectionObject();
    $jwData = [
      'page' => [
        'url' => 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'],
        'title' => $c->getCollectionName() ]
      ];

    if($u->isLoggedIn()) {
      $ui = UserInfo::getByID( $u->getUserID() );
      $city = $ui->getAttribute('home_city');
      $jwData['user'] = [
          'firstName' => $ui->getAttribute('first_name'),
          'lastName' => $ui->getAttribute('last_name') ];
      if($city) {
        $jwData['user']['city'] = [
          'name' => $city->getCollectionName(),
          'url' => $nh->getCollectionUrl($city) ];
      }
    }

    /* Set the city language to the first one matched, recursing from where we are */
    $crumbs = $nh->getTrailToCollection($c);
    $crumbs[] = $c; // Must check the current page first
    foreach($crumbs as $crumb) {
      if($lang = (string) $crumb->getAttribute('lang')) { 
        Localization::changeLocale($lang);
        break;
      }
    }

    $this->set('isMobile', isset($_SERVER['HTTP_USER_AGENT']) && preg_match("/iPhone|Android|iPad|iPod|webOS|CFNetwork/", $_SERVER['HTTP_USER_AGENT']));
    $this->addToJanesWalk($jwData);
  }
  
  // The 'on_before_render' will set up our JanesWalk json in the page
  public function on_before_render() {
    $this->addFooterItem('<script type="text/javascript">JanesWalk = ' . json_encode($this->pageData) . '</script>');
  }
}
