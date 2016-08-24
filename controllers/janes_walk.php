<?php
namespace JanesWalk\Controllers;

// TODO: Move to PSR standards for filename after c5.7 upgrade
use \Loader;
use \User;
use \UserInfo;
use \Localization;
use \JanesWalk\Models\PageTypes\Walk;

class JanesWalk extends \Controller
{
    // @var array Builds client-side data eg for JS
    protected $pageData = [];
    // @var array Body-formatting data eg for CSS
    protected $bodyData = [];

    /**
     * Adds array properties to the JSON we make available on the rendered page
     *
     * @param array $properties One or more, possibly multi-level properties
     * @deprecated In favour of JanesWalk.event methods
     *
     * @return null
     */
    public function addToJanesWalk(array $properties)
    {
        $this->pageData = array_replace_recursive($this->pageData, $properties);
    }

    /**
     * Sets up the basic info we'll need from json and page rendering
     *
     * @return null
     */
    public function view()
    {
        $nh = Loader::helper('navigation');
        $u = new User();
        $c = $this->getCollectionObject();
        $this->bodyData = [
            'classes' => [],
            'bg' => null,
            'pageViewName' => 'PageView'
        ];

        // TODO: skip this and just use the user Locale, if explicitly set
        // Set the city language to first matched, recursively
        $crumbs = $nh->getTrailToCollection($c);
        // Must check the current page first
        array_unshift($crumbs, $c);
        foreach ($crumbs as $crumb) {
            $lang = (string) $crumb->getAttribute('lang');
            if ($lang) {
                Localization::changeLocale($lang);
                break;
            }
        }

        // Base data we want access to client-side
        $jwData = [
            'page' => [
                'url' =>
                'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'],
                'title' => $c->getCollectionName(),
            ]
        ];
        if ($u->isLoggedIn()) {
            $ui = UserInfo::getByID($u->getUserID());
            $city = $ui->getAttribute('home_city');
            $jwData['user'] = [
                'id' => $ui->getUserID(),
                'firstName' => $ui->getAttribute('first_name'),
                'lastName' => $ui->getAttribute('last_name'),
                'bio' => $ui->getAttribute('bio'),
                'facebook' => $ui->getAttribute('facebook'),
                'twitter' => $ui->getAttribute('twitter'),
                'website' => $ui->getAttribute('website'),
                'email' => $ui->getUserEmail()
            ];
            $this->bodyData['classes'][] = 'logged_in';
            if ($city) {
                $jwData['user']['city'] = [
                    'id' => $city->getCollectionID(),
                    'name' => $city->getCollectionName(),
                    'url' => $nh->getCollectionUrl($city)
                ];
            }
        }

        // Grab localization info
        $jwData['locale'] = [
            'name' => Localization::activeLocale(),
            'translation' => Localization::getActiveTranslateJsonURL()
        ];

        $this->set(
            'isMobile',
            isset($_SERVER['HTTP_USER_AGENT']) &&
            preg_match(
                "/iPhone|Android|iPad|iPod|webOS|CFNetwork/",
                $_SERVER['HTTP_USER_AGENT']
            )
        );
        $this->set('nh', $nh);
        $this->addToJanesWalk($jwData);
    }

    /**
     * Setup the JSON for the client-side
     * @return null
     */
    public function on_before_render()
    {
        $this->addFooterItem(
            '<script type="text/javascript">' .
            'window.JanesWalk = Object.assign({}, window.JanesWalk, ' .
            json_encode($this->pageData) . ');' .
            '</script>'
        );
    }
}
