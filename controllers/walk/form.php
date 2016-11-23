<?php
use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\AvatarHelper;
use Concrete\Core\Legacy\ImageHelper;
use Concrete\Core\Legacy\HtmlHelper;
use Concrete\Core\Legacy\ValidationTokenHelper;

use JanesWalk\Models\PageTypes\Walk;
use JanesWalk\Models\PageTypes\City;
use JanesWalk\Controllers\JanesWalk as Controller;

class WalkFormController extends Controller
{
    /**
     * Find the latest unstarted walk, so you don't need to make a new one.
     * @param $u The user for whom you're finding their walk
     * @return Collection
     */
    protected function getUnstartedWalk(User $u, Page $city)
    {
        // Find all walks for this user, in this city, with no name
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByUserID($u->getUserID());
        $pl->filterByParentID($city->getCollectionID());
        $pl->displayUnapprovedPages();
        $pl->filterByName('', true);
        $pl->filterByAttribute('exclude_page_list', true);

        // Arbitrarily use the first; it's blank anyway.
        $walk = $pl->get(1)[0];

        // If you couldn't find a walk, make a new one in the city
        if (!$walk) {
            $walk = $city->add(CollectionType::getByHandle('walk'), []);
            $walk->setAttribute('exclude_page_list', true);
        }

        return $walk;
    }

    protected function loadViewData(Page $c)
    {
        $nh = new NavigationHelper();
        $av = new AvatarHelper();
        $valt = new ValidationTokenHelper();
        $imgHelper = new ImageHelper();
        $cityPage = Page::getByID($c->getCollectionParentID());
        $u = new User();
        $ui = UserInfo::getByID($u->getUserID());

        $walk_ward = trim((String) $c->getAttribute('walk_wards'));
        $city_wards = $cityPage->getAttribute('city_wards');
        if ($city_wards) {
            $wards = array_map(
                function ($ward) use ($walk_ward) {
                    if ($ward->value == $walk_ward) {
                        $ward->selected = true;
                    }
                    return $ward;
                },
                $city_wards->getOptions()
            );
        } else {
            $wards = null;
        }

        // Set the language based on a trail to the city
        /* Set the city language to the first one matched, recursing from where we are */
        $crumbs = $nh->getTrailToCollection($c);
        $crumbs[] = $c; // Must check the current page first
        foreach ($crumbs as $crumb) {
            if ($lang = (string) $crumb->getAttribute('lang')) {
                Localization::changeLocale($lang);
                break;
            }
        }

        // Load our city
        $latlng = explode(',', $cityPage->getAttribute('latlng'));
        // If you don't have a lat and a lng, final resort is Toronto. It's at least better than being 400km off the coast of Nigeria.
        if (count((array) $latlng) !== 2) {
            $latlng = [43.653226,-79.3831843];
        }

        // Instantiate as models, for JSON serialization
        $city = new City($cityPage);
        $walk = new Walk($c);

        // Build data needed by frontend
        $this->addToJanesWalk([
            'city' => $city,
            'form' => [
                'valt' => $valt->generate('upload')
            ],
            'walk' => [
                'name' => (string) $walk,
                'data' => $walk,
                'url' => $nh->getCollectionURL($c)
            ],
            'locale' => [
                'name' => Localization::activeLocale(),
                'translation' => Localization::getActiveTranslateJsonURL()
            ]
        ]);

        // Set the view name
        $this->bodyData['pageViewName'] = 'CreateWalkView';

        $this->set('u', $u);
        $this->set('ui', $ui);
        $this->set('owner', UserInfo::getByID($c->getCollectionUserID()));
        $this->set('nh', $nh);
        $this->set('av', $av);
        $this->set('load', $load);
        $this->set('c', $c);
        $this->set('city', $city);
        $this->set('country', $city->country);
        $this->set('ui_cityorganizer', $city->city_organizer);
        $this->set('imgHelper', $imgHelper);
        $this->set('wards', $wards);
        $this->set('is_nyc', $is_nyc);
        $this->set('lat', $latlng[0]);
        $this->set('lng', $latlng[1]);
        $this->set('bodyData', $this->bodyData);

        // Load JS we need in the form
        $html = new HtmlHelper();

        // Set default stylesheets for libs
        $this->addHeaderItem($html->css('jquery.ui.css'));
        // Set libs we'll need on the page
        $this->addFooterItem($html->javascript('jquery.ui.js'));
    }

    public function view($cID = null)
    {
        parent::view();

        // If no page is passed to edit, create a new page.
        $load = $_REQUEST['load'];
        if ($cID) {
            $this->loadViewData(Page::getByID($cID));
        } elseif (!empty($load)) {
            $this->loadViewData(Page::getByPath($load));
        } else {
            $nh = new NavigationHelper();
            $u = new User();
            $ui = UserInfo::getByID($u->getUserID());

            // Find the parent page this should go under
            $cityPage = ($parentCID = $_REQUEST['parentCID']) ?
                Page::getByID($parentCID) :
                ($ui->getAttribute('home_city') ?: Page::getByPath('/canada/toronto'));
            $walk = $this->getUnstartedWalk($u, $cityPage);

            // Redirect to this new walk in the form
            header('Location: ' . $nh->getCollectionURL($this->c) . $walk->getCollectionID());
            exit();
        }
    }
}
