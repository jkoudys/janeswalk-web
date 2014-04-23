<?php 
defined('C5_EXECUTE') or die("Access Denied.");
class ProfileController extends Concrete5_Controller_Profile {
  public function view($userID = 0) {
    parent::view($userID);
    Loader::model('page_list'); 
    $nh = Loader::helper('navigation');
    $u = new User();
    $ui = UserInfo::getByID($u->getUserID());
    $profile = $this->get('profile');

    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByUserID($u->getUserID());
    $pl->filterByAttribute('exclude_page_list',false);
    $this->set('publicWalks', $pl->get());

    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByUserID($u->getUserID());
    $pl->filterByAttribute('exclude_page_list',true);
    $this->set('inProgressWalks', $pl->get());

    $cities = new PageList();
    $cities->filterByCollectionTypeHandle('city');
    $cities->sortByName();
    $this->set('cities', $cities->get());

    $isProfileOwner = $u->getUserID() == $profile->getUserID();
    $isCityOrganizer = in_array('City Organizers', $profile->getUserObject()->getUserGroups());
    if($isCityOrganizer && $isProfileOwner) {
      $pl = new PageList();
      $pl->filterByCollectionTypeHandle('city');
      $pl->ignoreAliases();
      $pl->filterByUserID($u->getUserID());
      $cityWalks = [];
      foreach($pl->get() as $city) {
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByParentID($city->getCollectionID());
        $pl->filterByAttribute('exclude_page_list',false);
        $walks = $pl->get();
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByParentID($city->getCollectionID());
        $pl->filterByAttribute('exclude_page_list',true);
        $cityWalks[] = ['city' => $city, 'walks' => $walks, 'inprogress' => $pl->get()];
      }
      $this->set('cityWalks', $cityWalks);
    }

    $this->set('isProfileOwner', $isProfileOwner);
    $this->set('isCityOrganizer', $isCityOrganizer);
    $this->set('nh',$nh);
    $this->set('u',$u);
    $this->set('home_city', $ui->getAttribute('home_city'));
    $this->set('newWalkForm', Page::getByPath('/walk/form'));

    /**
     * New dashboard variables
     * 
     */

    // Whether or not the logged in user is viewing their own "profile"
    $userIsViewingSelf = true;
    $this->set('userIsViewingSelf', $userIsViewingSelf);

    // Remaining variables/logic only needed for "self viewing"
    if ($userIsViewingSelf === true) {

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
        $userHasSetName = true;// CHANGE
        $this->set('userHasSetName', $userHasSetName);

        // The home city for the logged in user (false otherwise)
        $userHomeCity = false;// CHANGE
        $this->set('userHomeCity', $userHomeCity);

        // Whether the logged in user has selected their home city
        $this->set('userHasSetHomeCity', $userHomeCity !== false);

        // Whether the logged in user has chosen an avatar/display picture
        $userHasSetPicture = true;// CHANGE
        $this->set('userHasSetPicture', $userHasSetPicture);

        // Whether the logged in user is a city organizer
        $userIsCityOrganizer = true;// CHANGE
        $this->set('userIsCityOrganizer', $userIsCityOrganizer);

        // Whether or not the logged in user has created any walks
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByUserID($u->getUserID());
        $pl->filterByAttribute('exclude_page_list', false);
        $walks = $pl->get();
        $userHasCreatedWalks = count($walks) !== 0;
        $this->set('userHasCreatedWalks', $userHasCreatedWalks);

        // Walk data for walks created by the logged in user; empty array if the
        // user hasn't yet created any
        $userWalkData = array();
        if ($userHasCreatedWalks === true) {
            $userWalkData = array(// CHANGE
                'title' => 'Celluloid and Popcorn: The history of Cinema on Roncesvalles',
                'link' =>'http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/',
                'published' => true
            );
        }
        $this->set('userWalkData', $userWalkData);
      
        // Whether the logged in user has created any blog posts
        $userHasPostedBlogPost = true;// CHANGE
        $this->set('userHasPostedBlogPost', $userHasPostedBlogPost);

        // Blog post data for posts created by the logged in user; empty array
        // if the user hasn't yet created any
        $userBlogPostData = array();
        if ($userHasCreatedWalks === true) {
            $userBlogPostData = array(// CHANGE
                'title' => 'Celluloid and Popcorn: The history of Cinema on Roncesvalles',
                'link' =>'http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/'
            );
        }
        $this->set('userBlogPostData', $userBlogPostData);

        /**
         * User city data
         * 
         */
        if ($userHasSetHomeCity === true) {
      
            // The email address of the city organizer for the logged in user's
            // home city
            $cityOrganizerEmailAddress = 'onassar@gmail.com';// CHANGE
            $this->set('cityOrganizerEmailAddress', $cityOrganizerEmailAddress);

            // Whether the city has a blog page set up for it
            $cityHasBlogSetup = false;// CHANGE
            $this->set('cityHasBlogSetup', $cityHasBlogSetup);

            // If the user is a city organizer
            if ($userIsCityOrganizer === true) {

                // Whether the city has any walks posted to it
                $cityHasWalks = true;// CHANGE
                $this->set('cityHasWalks', $cityHasWalks);

                // Walk data for walks in the city organizer's city; empty array if
                // the city doesn't have any yet
                $cityWalkData = array();
                if ($cityHasWalks === true) {
                    $cityWalkData = array(// CHANGE
                        'title' => 'Celluloid and Popcorn: The history of Cinema on Roncesvalles',
                        'link' =>'http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/',
                        'published' => true
                    );
                }
                $this->set('cityWalkData', $cityWalkData);

                // Whether the city organizer's city has it's header info set
                $cityHeaderInfoIsEmpty = true;// CHANGE
                $this->set('cityHeaderInfoIsEmpty', $cityHeaderInfoIsEmpty);

                // Whether the city organizer's city has it's short description
                // set
                $cityShortDescriptionIsEmpty = false;// CHANGE
                $this->set('cityShortDescriptionIsEmpty', $cityShortDescriptionIsEmpty);

                // Whether the city organizer's city has it's background photo
                // set
                $cityBackgroundPhotoIsEmpty = false;// CHANGE
                $this->set('cityBackgroundPhotoIsEmpty', $cityBackgroundPhotoIsEmpty);

                /**
                 * Gather all the data
                 * 
                 */
                if ($cityHeaderInfoIsEmpty === false) {
                    $cityHeaderInfo = 'lambda lambda lambda lambda lambda lambda lambda';// CHANGE
                    $this->set('cityHeaderInfo', $cityHeaderInfo);
                }
                if ($cityShortDescriptionIsEmpty === false) {
                    $cityShortDescription = 'Jane’s Walk is a walking conversation led ' .// CHANGE
                      'by volunteers thatcreates a space for citizens to discuss what '.
                      'matters to them while learning more about their city and ...';
                    $this->set('cityShortDescription', $cityShortDescription);
                }
                if ($cityBackgroundPhotoIsEmpty === false) {
                    $cityBackgroundPhoto = 'http://janeswalk.org/files/3213/8152/8704/IMG_6280.jpg';// CHANGE
                    $this->set('cityBackgroundPhoto', $cityBackgroundPhoto);
                }

                // Whether the header, description and photo are set for the
                // city organizer's home city
                $cityHasFullDetails = $cityHeaderInfoIsEmpty === false
                    && $cityShortDescriptionIsEmpty === false
                    && $cityBackgroundPhotoIsEmpty === false;
                $this->set('cityHasFullDetails', $cityHasFullDetails);
            }
        }
      
        // Resources
        $resources = array(
            'showCityOrganizers' => false,
            'showGlobalWalks' => true,
            'showTips' => true,
            'showFiles' => false
        );
        if ($userIsCityOrganizer === true) {
            $resources['showCityOrganizers'] = true;
            $resources['showFiles'] = true;

            // List of basic details for three city organizers that can be
            // recommended to other city organizers
            $cityOrganizerData = array(// CHANGE
                array(
                    'cityName' => 'Toronto',
                    'organizerImagePath' => 'https://graph.facebook.com/oliver.nassar/picture',
                    'organizerName' => 'Oliver Nassar',
                    'organizerEmail' => 'onassar@gmail.com'
                ),
                array(
                    'cityName' => 'Montreal',
                    'organizerImagePath' => 'https://graph.facebook.com/denisepinto/picture',
                    'organizerName' => 'Denise Pinto',
                    'organizerEmail' => 'denise.pinto@janeswalk.net'
                ),
                array(
                    'cityName' => 'Ottawa',
                    'organizerImagePath' => 'https://graph.facebook.com/nadia.halim/picture',
                    'organizerName' => 'Nadia Halim',
                    'organizerEmail' => 'nadia.halim@janeswalk.net'
                )
            );
            $this->set('cityOrganizerData', $cityOrganizerData);
          
            // List of basic data for three walks we want to highlight to city
            // organizers/walk leaders that showcase creative/unique walks
            $featuredWalkData = array(// CHANGE
                array(
                    'walkImagePath' => 'http://janeswalk.org/files/cache/a6b8790016aa8ddec5cb764732491c1e_f149.JPG',
                    'countryName' => 'Germany',
                    'cityName' => 'Berlin',
                    'walkTitle' => 'Walking With Titans',
                    'walkPath' => '#'
                ),
                array(
                    'walkImagePath' => 'http://janeswalk.org/files/cache/1a291ea4c80b712b5a9aed2a1b33534e_f377.jpg',
                    'countryName' => 'Canada',
                    'cityName' => 'Toronto',
                    'walkTitle' => 'Walking With Titans',
                    'walkPath' => '#'
                ),
                array(
                    'walkImagePath' => 'http://janeswalk.org/files/cache/8aee4e3b283250e0935d1553c7c3ac5a_f663.jpg',
                    'countryName' => 'United_States_of_America',
                    'cityName' => 'New York',
                    'walkTitle' => 'Walking With Titans',
                    'walkPath' => '#'
                )
            );
            $this->set('featuredWalkData', $featuredWalkData);
        }
        $this->set('resources', $resources);
    }
  }
}
