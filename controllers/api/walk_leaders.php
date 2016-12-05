<?php
class ApiWalkLeadersController extends Controller
{
    public function on_start()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $request = split("/", substr(@$_SERVER['PATH_INFO'], 1));

        switch ($method) {
            case 'POST':
                exit;
            break;
            case 'PUT':
                parse_str(file_get_contents("php://input"), $put_vars);
                exit;
            break;
            case 'GET':
                header('Content-Type: application/json');
                echo $this->getLeaders($_REQUEST['q'], $_REQUEST['cityId'], $_REQUEST['limit']);
                exit;
            break;
            case 'DELETE':
                exit;
            break;
        }
    }
    public function getLeaders($searchString, $city, $limit)
    {
        Loader::model('user_list');
        $av = Loader::helper('concrete/avatar');
        $ul = new UserList();
        $ul->filterByKeywords($searchString);
        $ul->filterByGroup('Walk Leaders');
        $ul->filterByIsActive(1);
        $ul->filterByFirstName(null, '!=');
        $ul->filterByFirstName('', '!=');
        $ul->filter('uLastLogin', 0, '!=');
        $ul->sortBy('uLastLogin');
        $userSet = [];
        foreach ($ul->get($limit ?: 5) as $user) {
            $home_city = $user->getAttribute('home_city');
            $userSet[$user->getUserID()] = [
                'user_id' => $user->getUserID(),
                'first_name' => $user->getAttribute('first_name'),
                'last_name' => $user->getAttribute('last_name'),
                'city_name' => $home_city ? $home_city->getCollectionName() : null,
                'city_id' => $home_city ? $home_city->getCollectionID() : null,
                'bio' => $user->getAttribute('bio'),
                'twitter' => $user->getAttribute('twitter'),
                'facebook' => $user->getAttribute('facebook'),
                'website' => $user->getAttribute('website'),
                'avatar' => $av->getImagePath($user)
            ];
        }

        return json_encode($userSet);
    }

    public function isPut()
    {
        return $_SERVER['REQUEST_METHOD'] === 'PUT';
    }

    public function isGet()
    {
        return $_SERVER['REQUEST_METHOD'] === 'GET';
    }

    public function isDelete()
    {
        return $_SERVER['REQUEST_METHOD'] === 'DELETE';
    }
}
