<?php
/**
 * Profile Controller
 *
 * The user profile page, with that user's personal and city information.
 */
use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Models\PageTypes\City;

Loader::model('page_list');
Loader::model('page_types/City');
Loader::model('page_types/Walk');
class ProfileController extends Concrete5_Controller_Profile
{
    /**
     * Call model data needed by view
     *
     * @param int $userID The user ID of who we're viewing
     * @return null
     */
    public function view($userID = null)
    {
        parent::view($userID);

        // Set helpers for view
        $nh = Loader::helper('navigation');
        $ah = Loader::helper('concrete/avatar');
        $th = Loader::helper('text');
        $ih = Loader::helper('image');

        // The full Walk data we'll need to serialize
        $walkData = [];

        // Set the page view first
        $this->set('bodyData', ['pageViewName' => 'ProfilePageView']);

        // Load the profile's user
        $u = new User($userID);
        $ui = UserInfo::getByID($u->getUserID());

        // Whether the logged in user has created any blog posts
        $pl = new PageList;
        $pl->filterByCollectionTypeHandle(['walk_blog_entry', 'city_blog_entry']);
        $pl->filterByUserID($ui->getUserID());
        $this->set('userBlogPosts', $pl->get());

        // Load the home city
        $cityPage = $ui->getAttribute('home_city');
        $cityUsers = self::getUsersInCity($cityPage->getCollectionID());

        $city = new City($cityPage);

        // Build all the walks we need
        var_dump($city->getWalks(true));
        foreach ($city->getWalks(true) as $w) {
            $walkData[(int) $w->getPage()->cID] = $w;
        }
        $cityWalksArr = array_keys($walkData);

        // Walks owned by user
        $pl = new PageList;
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByUserID($u->getUserID());
        // Include the names of draft walks, not last published
        $pl->displayUnapprovedPages();

        $userWalksArr = [];
        foreach ($pl->get() as $p) {
            if (!array_key_exists($p->cID, $walkData)) {
                $w = new Walk($p);
                $walkData[(int) $p->cID] = $w;
            }
            $userWalksArr[] = (int) $p->cID;
        }

        $this->set('userWalksArr', $userWalksArr);

        $this->set('u', $u);
        $this->set('ui', $ui);
        $this->set('city', $city);
        $this->set('cityUsers', $cityUsers);
        $this->set('cityWalksArr', $cityWalksArr);
        $this->set('walkData', $walkData);

        $this->set('nh', $nh);

        // city : all users in city, all walks in a city
        // users: users for city, CO. Each needs their walk ID list. User who you're looking at
        // walks: all the walks owned by the profile user
    }

    private static function getUsersInCity($cID)
    {
        $cityUsers = [];

        // Load the user list for this city
        $ul = new UserList();
        $ul->filterByHomeCity($cID);
        foreach ($ul->get(0xFFFF) as $user) {
            $cityUsers[] = [
                'id' => $user->getUserID(),
                'firstName' => $user->getAttribute('first_name'),
                'lastName' => $user->getAttribute('last_name')
            ];
        }

        // Sort the users by name
        usort(
            $cityUsers,
            function ($a, $b) {
                return strcmp(
                    strtoupper($a['firstName']),
                    strtoupper($b['firstName'])
                );
            }
        );

        return $cityUsers;
    }

    /**
     * Itineraries service endpoint
     */
    public function itineraries($userID = null)
    {
        $u = new User();
        $ui = UserInfo::getByID($userID ?: $u->getUserID());

        /**
         * c5.7 uses symfony2 for routing
         * TODO: wait for 5.7.
         */
        header('Content-Type: application/json');
        switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $payload = file_get_contents('php://input');
            // Validate our user permissions
            $ui->setAttribute('itineraries', $payload);
            echo '{"saved": true}';
            break;
        case 'GET':
            $itinerariesJson = $ui->getAttribute('itineraries');
            echo $itinerariesJson ?: '[]';
            break;
        }
        exit;
    }

    /**
     * Export a CSV of the city's walks
     */
    public function exportCity($cityID = null)
    {
        $exporter = new CityExporter($cityID);
        $exporter->renderWalkCSV();
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
        case 'Walk Date':
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
        case 'Published Date':
            return $walk->publishDate;
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

    public function renderWalkCSV()
    {
        $columns = ['Name','Status','Walk Date', 'Published Date', 'Start', 'End','Meeting Place','Walk Owner Name','Walk Owner email','URL'];
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
