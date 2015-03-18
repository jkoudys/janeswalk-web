<?php
/**
 * Profile Controller
 *
 * The user profile page, with that user's personal and city information.
 */

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
                $this->set('cityHasWalks', !empty($cityWalks));
                $this->set('city', $city);
                $this->set('featuredWalkData', $featuredWalkData);

                // If the user is a city organizer
                if ($userIsCityOrganizer === true) {
                    // Whether the city organizer's city has its header info set
                    $cityHeaderInfo = $userHomeCity->getBlocks('City Header')[0]->getController()->getContent();
                    $cityHeaderInfoIsEmpty = !trim($cityHeaderInfo);
                    if ($cityHeaderInfoIsEmpty === false) {
                        $cityHeaderInfo = $th->shorten($cityHeaderInfo, 150);
                    }
                    $this->set('cityHeaderInfoIsEmpty', $cityHeaderInfoIsEmpty);
                    $this->set('cityHeaderInfo', $cityHeaderInfo);

                    // Whether the city organizer's city has its short description
                    // set
                    $cityDescription = $userHomeCity->getBlocks('City Description')[0]->getController()->getContent();
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
}
