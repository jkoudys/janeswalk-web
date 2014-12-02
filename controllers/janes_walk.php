<?php
namespace JanesWalk\Controllers;

// FIXME: Move to PSR standards for filename after c5.7 upgrade
use \Loader;
use \User;
use \UserInfo;
use \Localization;

class Controller extends \Controller
{
    protected $pageData = [];
    protected $bodyData = [];

    /**
     * addToJanesWalk
     * Adds array properties to the JSON we make available on the rendered page
     *
     * @param array $properties Array containing one or more, possibly multi-level properties
     */
    public function addToJanesWalk(array $properties)
    {
        $this->pageData = array_merge_recursive($this->pageData, $properties);
    }

    /**
     * view
     * Sets up the basic info we'll need from json and page rendering
     *
     * @return void
     */
    public function view()
    {
        $nh = Loader::helper('navigation');
        $u = new User();
        $c = $this->getCollectionObject();
        $jwData = [
            'page' => [
                'uri' => 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'],
                'title' => $c->getCollectionName()
            ]
        ];
        $this->bodyData = [
            'classes' => [],
            'bg' => null,
            'pageViewName' => 'PageView'
        ];

        if ($u->isLoggedIn()) {
            $ui = UserInfo::getByID( $u->getUserID() );
            $city = $ui->getAttribute('home_city');
            $jwData['user'] = [
                'id' => $ui->getUserID(),
                'firstName' => $ui->getAttribute('first_name'),
                'lastName' => $ui->getAttribute('last_name')
            ];
            $this->bodyData['classes'][] = 'logged_in';
            if ($city) {
                $jwData['user']['city'] = [
                    'id' => $city->getCollectionID(),
                    'name' => $city->getCollectionName(),
                    'uri' => $nh->getCollectionUrl($city)
                ];
            }
        }

        /* Set the city language to the first one matched, recursing from where we are */
        $crumbs = $nh->getTrailToCollection($c);
        $crumbs[] = $c; // Must check the current page first
        foreach ($crumbs as $crumb) {
            $lang = (string) $crumb->getAttribute('lang');
            if ($lang) {
                Localization::changeLocale($lang);
                break;
            }
        }

        $this->set('isMobile', isset($_SERVER['HTTP_USER_AGENT']) && preg_match("/iPhone|Android|iPad|iPod|webOS|CFNetwork/", $_SERVER['HTTP_USER_AGENT']));
        $this->set('nh', $nh);
        $this->addToJanesWalk($jwData);
    }

    // The 'on_before_render' will set up our JanesWalk json in the page
    public function on_before_render()
    {
        $this->addFooterItem('<script type="text/javascript">window.JanesWalk = window.JanesWalk || {}; Object.assign(window.JanesWalk, ' . json_encode($this->pageData) . ');</script>');
    }
}
