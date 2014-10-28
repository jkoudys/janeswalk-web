<?php
defined('C5_EXECUTE') or die("Access Denied.");

// FIXME: Don't know why the Loader::model won't find this, but this
// stuff will all change with improved PSR-standard autoloading in
// c5.7.
require_once(DIR_BASE . '/models/page_types/Walk.php');

use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Controllers\Controller;

Loader::controller('/janes_walk');
class WalkFormController extends Controller
{
    public function view()
    {
        parent::view();
        $u = new User();
        $ui = UserInfo::getByID($u->getUserID());
        $nh = Loader::helper('navigation');
        $av = Loader::helper('concrete/avatar');
        $imgHelper = Loader::helper('image');

        /* If no page is passed to edit, create a new page.
         * TODO: change this to either redirect, or detect if you have one in-progress so browser reloads don't make new walks.
         */
        $load = $_REQUEST['load'];
        if (empty($load)) {
            $city = (($parentCID = $_REQUEST['parentCID']) ? Page::getByID($parentCID) : ($ui->getAttribute('home_city') ?: Page::getByPath('/canada/toronto')));
            $newPage = $city->add(CollectionType::getByHandle('walk'),[]);
            $newPage->setAttribute('exclude_page_list',true);
            $c = $newPage;
        } else {
            $c = Page::getByPath($load);
        }
        // Let's load the model for the walk, so we can access its json methods
        $walk = new Walk($c);

        $city || $city = Page::getByID($c->getCollectionParentID());
        $country = Page::getByID($city->getCollectionParentID());
        $ui_cityorganizer = UserInfo::getByID($city->getCollectionUserID());
        $is_nyc = in_array($city->getCollectionID(), [276]);


        $walk_ward = trim((String) $c->getAttribute('walk_wards'));
        $city_wards = $city->getAttribute('city_wards');
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
            $wards = false;
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
        $latlng = explode(',', $city->getAttribute('latlng') );

        // If you don't have a lat and a lng, final resort is Toronto. It's at least better than being 400km off the coast of Nigeria.
        if (count((array) $latlng) !== 2) {
            $latlng = [43.653226,-79.3831843];
        }

        $this->addToJanesWalk(['city' =>
            [
                'name' => $city->getCollectionName(),
                'url' => $nh->getCollectionUrl($city),
                'lat' => $latlng[0],
                'lng' => $latlng[1]
            ]
        ]);

        /* Build array used to pass back walk data as JSON to the frontend */
        $formSettings = array();
        $formSettings['form'] = [
            'timepicker_cfg' => [
                'defaultTime' => '9:00 AM',
                'timeFormat' => 'h:i A'
            ],
            'datepicker_cfg' => [
                'format' => 'dd/mm/yyyy'
            ],
            'data' => $walk
        ];

        // Special case for cities with walk-formatting requirements
        if ($is_nyc) {
            $formSettings['form']['timepicker_cfg']['step'] = 180;
            $formSettings['form']['timepicker_cfg']['disableTimeRanges'] = [ ['12am','8:59am'], ['9:01pm','11:59pm'] ];
        }

        // Make these data available to JS
        $this->addToJanesWalk($formSettings);

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
        $this->set('country', $country);
        $this->set('ui_cityorganizer', $ui_cityorganizer);
        $this->set('imgHelper', $imgHelper);
        $this->set('wards', $wards);
        $this->set('is_nyc', $is_nyc);
        $this->set('lat', $latlng[0]);
        $this->set('lng', $latlng[1]);
        $this->set('bodyData', $this->bodyData);

        // Load JS we need in the form
        $html = Loader::helper('html');
        $this->addHeaderItem($html->javascript('jquery.timepicker.min.js'));
    }
}
