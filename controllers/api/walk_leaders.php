<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  class ApiWalkLeadersController extends Controller {

    public function on_start() {
      $method = $_SERVER['REQUEST_METHOD'];
      $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

      switch ($method) {
        case 'POST':
          exit;
          break;
        case 'PUT':
          parse_str(file_get_contents("php://input"),$put_vars);
          exit;
          break;
        case 'GET':
          echo $this->getLeaders($_REQUEST['q'], $_REQUEST['cityId']);
          exit;
          break;
        case 'DELETE':
          exit;
          break;
      }
    }
    public function getLeaders($searchString, $city) {
      Loader::model('user_list');
      $av = Loader::helper('concrete/avatar');
      $ul = new UserList();
      $ul->filterByKeywords($searchString);
      $ul->filterByGroup('Walk Leaders');
      $ul->filterByIsActive(1);
      $userSet = [];
      foreach($ul->get() as $user) {
        $home_city = $user->getAttribute('home_city');
        $userSet[$user->getUserID()] = [
          'first_name' => $user->getAttribute('first_name'),
          'last_name' => $user->getAttribute('last_name'),
          'city_name' => $home_city ? $home_city->getCollectionName() : null,
          'city_id' => $home_city ? $home_city->getCollectionID() : null,
          'avatar' => $av->getImagePath($user)
        ];
      }
      echo json_encode($userSet);
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
