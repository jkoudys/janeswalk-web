<?php
/**
 * Profile Controller
 *
 * The user profile page, with that user's personal and city information.
 */
use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\AvatarHelper;
use Concrete\Core\Legacy\TextHelper;
use Concrete\Core\Legacy\ImageHelper;
use JanesWalk\Models\PageTypes\Walk;
use JanesWalk\Models\PageTypes\City;
use JanesWalk\Models\Exporters\City as CityExporter;
use JanesWalk\Models\Exporters\Interest as InterestExporter;

class ProfileController extends Concrete5_Controller_Profile
{
    /**
     * Call model data needed by view
     *
     * @param int $userID The user ID of who we're viewing
     * @return null
     */
    public function view(int $userID = null)
    {
        parent::view($userID);

        // Set helpers for view
        $nh = new NavigationHelper();
        $ah = new AvatarHelper();
        $th = new TextHelper();
        $ih = new ImageHelper();

        // The full Walk data we'll need to serialize
        $walkData = [];

        // Set the page view first
        $this->set('bodyData', ['pageViewName' => 'ProfilePageView']);

        // Load the profile's user
        $u = new User($userID);
        $ui = UserInfo::getByID($u->getUserID());

        // Whether the logged in user has created any blog posts
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle(['walk_blog_entry', 'city_blog_entry']);
        $pl->filterByUserID($ui->getUserID());
        $this->set('userBlogPosts', $pl->get());

        // Load the home city
        $cityPage = $ui->getAttribute('home_city');
        if ($cityPage) {
            $cityUsers = self::getUsersInCity($cityPage->getCollectionID());
            $city = new City($cityPage);
            // Build all the walks we need
            $isCO = in_array('City Organizers', $u->getUserGroups());
            foreach ($city->getWalks($isCO) as $w) {
                $walkData[(int) $w->getPage()->cID] = $w;
            }
            $cityWalksArr = array_keys($walkData);
        }

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

        $this->set('nh', $nh);
        $this->set('u', $u);
        $this->set('ui', $ui);
        $this->set('city', $city);
        $this->set('cityUsers', $cityUsers);
        $this->set('cityWalksArr', $cityWalksArr);
        $this->set('walkData', $walkData);
        $this->set('isCO', $isCO);

        // city : all users in city, all walks in a city
        // users: users for city, CO. Each needs their walk ID list. User who you're looking at
        // walks: all the walks owned by the profile user
    }

    private static function getUsersInCity(int $cID): array
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
    public function itineraries(int $userID = null)
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
    public function exportCity(int $cityID = null)
    {
        $exporter = new CityExporter(Page::getByID($cityID));
        $exporter->renderWalkCSV();
    }

    /**
     * Export a CSV of the city's "I'm going!" people
     */
    public function exportInterest(int $cityID = null)
    {
        $exporter = new InterestExporter(Page::getByID($cityID));
        $exporter->renderCSV();
    }

    /**
     * Remove a city organizer who owns a city, and set to the default
     *
     * @param int $cID The city page we're changing the owner for
     */
    public function removeSelfAsCO(int $cID = null)
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
