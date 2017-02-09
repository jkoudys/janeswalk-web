<?php
use \JanesWalk\Controllers\JanesWalk as Controller;
use \JanesWalk\Models\PageTypes\City;

class CityPageTypeController extends Controller
{
    protected $city;

    public function on_start()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $request = explode('/', substr(@$_SERVER['PATH_INFO'], 1));

        $this->city = new City($this->c);

        // TODO: This is a pseudo-router. On 5.7 upgrade, replace with symfony
        switch ($method) {
            case 'POST':
                // Publish
            case 'PUT':
                // Save
                break;
            case 'GET':
                // Retrieve the page's json
                if ($_GET['format'] === 'json') {
                    echo $this->getJson();
                    exit;
                }
                break;
            case 'DELETE':
                // 'unpublish' the event (true deletes done through dashboard controller, not city)
                $c = Page::getCurrentPage();
                $c->setAttribute('exclude_page_list', true);
                break;
        }
    }

    protected function getJson(): string
    {
        // Encode the model, or return if it's cached already.
        $cached = Cache::get('page_' . $this->c->getCollectionTypeHandle(), $this->c->getCollectionId());
        if ($cached) {
            return $cached;
        } else {
            // The city itself includes the walks for now, so merge in controller
            $json =  json_encode(
                array_merge($this->city->jsonSerialize(), ['walks' => $this->city->getWalks()])
            );
            Cache::set('page_' . $this->c->getCollectionTypeHandle(), $this->c->getCollectionId(), $json);
            return $json;
        }
    }

    /**
     * Render the page as json only
     */
    public function json()
    {
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *");
        echo $this->getJson();
        exit;
    }

    /*
     * view()
     * Main controller for all city pages
     * Set up variables you'll need in the view here.
     */
    public function view()
    {
        parent::view();
        $bg = $this->city->fullbg;
        if ($bg) {
            $this->bodyData['bg'] = $bg->getURL();
        }
        $this->bodyData['classes'][] = 'city-page';
        $this->bodyData['pageViewName'] = 'CityPageView';
        $this->set('bodyData', $this->bodyData);
        $this->set('pageType', 'city-page');
        $this->set('isCityOrganizer', (new User)->getUserID() === $this->city->cityOrganizer->getUserID());
        $this->set('isLoggedIn', (bool) Loader::helper('concrete/dashboard')->canRead());
        $this->set('isCampaignActive', false); // Is the donations campaign running?
        $this->set('canEdit', is_object(ComposerPage::getByID($this->c->getCollectionID())));
        $this->set('city', $this->city);

        // Make JSON available
        $this->addToJanesWalk(['city' => $this->city]);

        // Are there blog entries for this city?
        $blog = new PageList();
        $blog->filterByCollectionTypeHandle('city_blog');
        $blog->filterByParentID($this->c->getCollectionID());
        $this->set('blog', $blog->get(1)[0]);
    }
}
