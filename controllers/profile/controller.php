<?php
/**
 * Profile Controller
 *
 * The user profile page, with that user's personal and city information.
 */
use \JanesWalk\Models\PageTypes\Walk;

Loader::model('page_types/Walk');
class ProfileController extends Concrete5_Controller_Profile
{
    /**
     * Call model data needed by view
     *
     * @param int $userID The user ID of who we're viewing
     * @return null
     */
    public function view($userID = 0)
    {
        // Load helpers
        Loader::model('page_list');
        $nh = Loader::helper('navigation');
        $ah = Loader::helper('concrete/avatar');
        $th = Loader::helper('text');
        $ih = Loader::helper('image');

        // Set helpers for view
        // Set the page view first
        $this->set('bodyData', ['pageViewName' => 'ProfilePageView']);
        parent::view($userID);

        // Load the current user
        $u = new User;
        $ui = UserInfo::getByID($u->getUserID());
        $profile = $this->get('profile');

        // Basic flags identifying the type of user
        // Whether or not the logged in user is viewing their own "profile"
        $userIsViewingSelf = ($u->getUserID() === $profile->getUserID());
        // User is a CO
        $userIsCityOrganizer = in_array('City Organizers', $profile->getUserObject()->getUserGroups());

        /**
         * New dashboard variables
         *
         */
        // Remaining variables/logic only needed for "self viewing"
        if ($userIsViewingSelf) {

            /**
             * Helper
             *
             */

            $html = Loader::helper('html');
            $this->addHeaderItem($html->javascript('swfobject.js'));

            /**
             * User data
             *
             */

            // Whether the logged in user has set their first and last name
            $this->set(
                'userHasSetName',
                (bool) trim(
                    $ui->getAttribute('first_name') . ' ' . $ui->getAttribute('last_name')
                )
            );

            // The home city for the logged in user (false otherwise)
            $userHomeCity = $ui->getAttribute('home_city');
            $this->set('userHomeCity', $userHomeCity);

            // Whether the logged in user has chosen an avatar/display picture
            $this->set('userPicture', $ah->getImagePath($ui));

            // Walks owned by user
            $pl = new PageList;
            $pl->filterByCollectionTypeHandle('walk');
            $pl->filterByUserID($u->getUserID());
            // Include the names of draft walks, not last published
            $pl->displayUnapprovedPages();
            $this->set('userWalks', $pl->get());

            // Whether the logged in user has created any blog posts
            $pl = new PageList;
            $pl->filterByCollectionTypeHandle(['walk_blog_entry', 'city_blog_entry']);
            $pl->filterByUserID($u->getUserID());
            $this->set('userBlogPosts', $pl->get());

            /**
             * User city data
             *
             */
            if ($userHomeCity) {
                // Set the city
                $city = $ui->getAttribute('home_city');

                // Load organizer user for this city
                $cityOrganizer = UserInfo::getByID($userHomeCity->getCollectionUserID());

                if ($cityOrganizer) {
                    // The email address of the city organizer for the logged in user's
                    // home city
                    $cityOrganizerEmailAddress = $cityOrganizer->getUserEmail();
                    $this->set('cityOrganizerEmailAddress', $cityOrganizerEmailAddress);
                }

                // Whether the city has a blog page set up for it
                $pl = new PageList;
                $pl->filterByCollectionTypeHandle('blog');
                $pl->filterByParentID($userHomeCity->getCollectionID());

                $cityHasBlogSetup = (bool) $pl->getTotal();
                $this->set('cityHasBlogSetup', $cityHasBlogSetup);

                // List of basic data for three walks we want to highlight to city
                // organizers/walk leaders that showcase creative/unique walks
                $pl = new PageList();
                $pl->filterByCollectionTypeHandle('walk');
                $pl->filter(false, 'p1.uID !=' . $u->getUserID());
                $pl->filterByAttribute('exclude_page_list', false);
                $pl->sortBy('RAND()');

                // Load this list of featured walks
                $featuredWalkData = array_map(
                    function ($page) use ($nh, $ih) {
                        $_city = Page::getByID($page->getCollectionParentID());
                        $_country = Page::getByID($_city->getCollectionParentID());
                        $_thumb = $page->getAttribute('thumbnail');
                        $countryName = $_country->getCollectionName();
                        if ($countryName === 'United States') {
                            $countryName = 'United States of America';
                        }
                        $countryName = str_replace(' ', '_', $countryName);
                        $walkImage = $_thumb ? $ih->getThumbnail($_thumb, 800, 800)->src : '';

                        return [
                            'walkImagePath' => $walkImage,
                            'countryName' => $countryName,
                            'cityName' => $_city->getCollectionName(),
                            'walkTitle' => $page->getCollectionName(),
                            'walkPath' => $nh->getLinkToCollection($page)
                        ];
                    },
                    (array) $pl->get(3)
                );

                // Whether the city has any walks posted to it
                // Whether the city has a blog page set up for it
                $pl = new PageList();
                $pl->filterByCollectionTypeHandle('walk');
                $pl->filterByParentID($userHomeCity->getCollectionID());
                $pl->filterByAttribute('exclude_page_list', false);
                $cityWalks = $pl->get();

                // Export to view
                $this->set('cityWalks', $cityWalks);
                $this->set('city', $city);

                // If the user is a city organizer
                if ($userIsCityOrganizer === true) {
                    // Whether the city organizer's city has its header info set
                    $cityHeaderInfo = $userHomeCity->getCollectionDescription();
                    $cityHeaderInfoIsEmpty = !trim($cityHeaderInfo);
                    if ($cityHeaderInfoIsEmpty === false) {
                        $cityHeaderInfo = $th->shorten($cityHeaderInfo, 150);
                    }
                    $this->set('cityHeaderInfoIsEmpty', $cityHeaderInfoIsEmpty);
                    $this->set('cityHeaderInfo', $cityHeaderInfo);

                    // Whether the city organizer's city has its short description
                    // set
                    $cityDescription = $userHomeCity->getAttribute('longdescription');
                    $cityDescriptionIsEmpty = !trim($cityDescription);
                    if ($cityDescriptionIsEmpty === false) {
                        $cityDescription = $th->shorten($cityDescription, 150);
                    }
                    $this->set('cityDescriptionIsEmpty', $cityDescriptionIsEmpty);
                    $this->set('cityDescription', $cityDescription);

                    // Whether the city organizer's city has its background photo
                    // set
                    $cityBackgroundPhotoAttribute = $userHomeCity->getAttribute('full_bg');
                    $cityBackgroundPhotoIsEmpty = !($cityBackgroundPhotoAttribute);
                    $this->set('cityBackgroundPhotoIsEmpty', $cityBackgroundPhotoIsEmpty);
                    if (!$cityBackgroundPhotoIsEmpty) {
                        $this->set('cityBackgroundPhoto', $cityBackgroundPhotoAttribute->getURL());
                    }

                    // Whether the header, description and photo are set for the
                    // city organizer's home city
                    $cityHasFullDetails = !($cityHeaderInfoIsEmpty ||
                        $cityDescriptionIsEmpty ||
                        $cityBackgroundPhotoIsEmpty );
                    $this->set('cityHasFullDetails', $cityHasFullDetails);

                    // Load the cities this CO organizes
                    $pl = new PageList;
                    $pl->filterByCollectionTypeHandle('city');
                    $pl->ignoreAliases();
                    $pl->filterByUserID($u->getUserID());
                    $cityUsers = [];
                    foreach ($pl->get() as $city) {
                        // Load the user list for this city
                        $ul = new UserList;
                        $ul->filterByHomeCity($city->getCollectionID());
                        foreach ($ul->get(65535) as $user) {
                            $cityUsers[] = [
                                'id' => $user->getUserID(),
                                    'firstName' => $user->getAttribute('first_name'),
                                    'lastName' => $user->getAttribute('last_name')
                                ];
                        }
                    }
                    // Sort the users -- needed here for multi-city COs
                    usort(
                        $cityUsers,
                        function ($a, $b) {
                            return strcmp(
                                strtoupper($a['first-name']),
                                strtoupper($b['first-name'])
                            );
                        }
                    );
                    $this->set('cityUsers', $cityUsers);

                    // Link to city-editor
                    $this->set('cityComposerURL', View::url('/dashboard/composer/write/-/edit/' . $city->getCollectionID()));
                }
            }

            // Resources
            $resources = [
                'showCityOrganizers' => false,
                'showGlobalWalks' => true,
                'showTips' => true,
                'showFiles' => false
            ];
            if ($userIsCityOrganizer === true) {
                $resources['showCityOrganizers'] = true;
                $resources['showFiles'] = true;

                // List of basic details for three city organizers that can be
                // recommended to other city organizers
                // TODO add an attribute to select 'featured' cities, so we
                // don't simply grab all cities. Expand this out into a
                // smart way to recommend other cities.
                $pl = new PageList;
                $pl->filterByCollectionTypeHandle('city');
                $pl->filter(false, 'p1.uID !=' . $u->getUserID());
                $pl->filterByAttribute('exclude_page_list', false);
                $pl->sortBy('RAND()');

                $recommendedCities = $pl->get(3);

                $cityOrganizerData = array_map(
                    function ($page) use ($ah) {
                        $_co = UserInfo::getByID($page->getCollectionUserID());

                        return [
                            'cityName' => $page->getCollectionName(),
                            'organizerImagePath' => $ah->getImagePath($_co),
                            'organizerName' => trim(
                                $_co->getAttribute('first_name') . ' ' .
                                $_co->getAttribute('last_name')
                            ),
                            'organizerEmail' => $_co->getUserEmail()
                        ];
                    },
                    $pl->get(3)
                );

                $this->set('cityOrganizerData', $cityOrganizerData);
            }
            $this->set('resources', $resources);
        }

        $this->set('nh', $nh);
        $this->set('u', $u);
        $this->set('newWalkForm', Page::getByPath('/walk/form'));
        $this->set('userIsCityOrganizer', $userIsCityOrganizer);
        $this->set('userIsViewingSelf', $userIsViewingSelf);
        // Validation helper for form tokens
        $this->set('valt', Loader::helper('validation/token'));
    }

    /**
     * Export a CSV of the city's walks
     */
    public function exportCity($cityID = null)
    {
        $exporter = new CityExporter($cityID);
        $exporter->getWalkCSV();
    }

    /**
     * Remove a city organizer who owns a city, and set to the default
     *
     * @param int $cID The city page we're changing the owner for
     */
    public function removeSelfAsCO($cID = null)
    {
        // The active user
        $u = new User();

        // The default user account
        $uJWalk = User::getByUserID(175);

        // The city page we're removing
        $city = Page::getByID($cID);

        // Build the response upfront, to simplify control flow
        $response = ['error' => false];

        try {
            if ($city) {
                // Forgo standard permissions, and simply allow them to remove the CO if
                // they're removing themselves. Admins will do this through the dashboard
                if ($city->getCollectionUserID() === $u->getUserID()) {
                    // Set to the default account
                    $city->update(['uID' => $uJWalk->getUserID()]);
                    // Success message
                    $response = ['error' => false, 'cID' => $city->getCollectionID(), 'uID' => $uJWalk->getUserID()];
                } else {
                    throw new RuntimeException('Attempt to modify owner of page not owned by user');
                }

            } else {
                throw new RuntimeException('Invalid city ID');
            }
        } catch (Exception $e) {
            http_response_code(500);
            $response = ['error' => true, 'msg' => $e->getMessage(), 'code' => $e->getCode()];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    /**
     * Get or set itineraries and favourites lists
     */
    public function walkList(array $options = ['scheduled', 'categorized'])
    {

    }
}

class CityExporter
{
    protected $city;
    protected $cityID;

    protected static function getColumn($col, $walk)
    {
        switch($col) {
        case 'Name':
            return (string) $walk;
        case 'Status':
            return $walk->published ? 'live' : 'draft';
        case 'Date':
            if ($walk->time['slots']) {
                return date('Y-m-d', $walk->time['slots'][0][0]);
            } else return '';
        case 'Start':
            if ($walk->time['slots']) {
                return date('H:i', $walk->time['slots'][0][0]);
            } else return '';
        case 'End':
            if ($walk->time['slots']) {
                return date('H:i', $walk->time['slots'][0][1]);
            } else return '';
        case 'Meeting Place':
            return $walk->meetingPlace['title'];
        case 'Walk Owner Name':
            $owner = UserInfo::getByID($walk->getPage()->getCollectionUserID());
            $name = trim($owner->getAttribute('first_name') . ' ' . $owner->getAttribute('last_name')) ?: $owner->getUserName();
            return $name;
        case 'Walk Owner email':
            $owner = UserInfo::getByID($walk->getPage()->getCollectionUserID());
            return $owner->getUserEmail();
        case 'URL':
            $nh = Loader::helper('navigation');
            return $nh->getCollectionURL($walk->getPage());
        default:
            return '';
        }
    }

    public function __construct($cityID)
    {
        $this->cityID = $cityID;
        $this->city = Page::getByID($cityID);
    }

    public function getWalkCSV()
    {
        $columns = ['Name','Status','Date', 'Start', 'End','Meeting Place','Walk Owner Name','Walk Owner email','URL'];
        // Check that you have edit permissions on city
        if ((new Permissions($this->city))->canWrite()) {
            // Set header so it d/l's as a CSV file
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment;filename=' . preg_replace("/[^A-Za-z0-9 ]/", '', $this->city->getCollectionName()) . ' Walks.csv');
            echo join(',', $columns);
            // Load basic data for all the walks
            $walks = new PageList();
            $walks->filterByParentID($this->cityID);
            $walks->filterByCollectionTypeHandle('walk');
            $walks->displayUnapprovedPages();

            // An 'outing' is one scheduled walk date
            $outings = [];
            foreach ($walks->get() as $page) {
                $walk = new Walk($page);

                // If no time set, put it in as-is
                if (count($walk->time['slots'])) {
                    foreach ((array) $walk->time['slots'] as $slot) {
                        $dateWalk = clone $walk;
                        $dateWalk->time['slots'] = [$slot];
                        $outings[] = $dateWalk;
                    }
                } else {
                    $outings[] = $walk;
                }
            }
            usort($outings, function($a, $b) {
                $ta = $a->time['slots'][0][0];
                $tb = $b->time['slots'][0][0];
                return $ta - $tb;
            });

            foreach ($outings as $outing) {
                echo PHP_EOL;
                foreach ($columns as $column) {
                    echo '"', addslashes(str_replace(["\n", "\r"], '', self::getColumn($column, $outing))), '",';
                }
            }
            exit;
        } else {
            throw new RuntimeException('Attempted to export city walks without sufficient permissions.');
        }
    }
}
