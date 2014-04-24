<?php 
defined('C5_EXECUTE') or die("Access Denied.");
class ProfileController extends Concrete5_Controller_Profile {
  public function view($userID = 0) {
    parent::view($userID);
    Loader::model('page_list'); 
    $nh = Loader::helper('navigation');
    $ah = Loader::helper('concrete/avatar');
    $ih = Loader::helper('image');
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

    $userIsViewingSelf = $u->getUserID() == $profile->getUserID();
    $userIsCityOrganizer = in_array('City Organizers', $profile->getUserObject()->getUserGroups());
    if($userIsCityOrganizer && $userIsViewingSelf) {
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

    $this->set('nh',$nh);
    $this->set('u',$u);
    $this->set('newWalkForm', Page::getByPath('/walk/form'));
    $this->set('userIsCityOrganizer', $userIsCityOrganizer);

    /**
     * New dashboard variables
     * 
     */

    // Whether or not the logged in user is viewing their own "profile"
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
        $userHasSetName = (bool) trim("{$ui->getAttribute('first_name')} {$ui->getAttribute('last_name')}");
        $this->set('userHasSetName', $userHasSetName);

        // The home city for the logged in user (false otherwise)
        $userHomeCity = $ui->getAttribute('home_city');
        $this->set('userHomeCity', $userHomeCity ? $userHomeCity->getCollectionName() : false );

        // Whether the logged in user has selected their home city
        $userHasSetHomeCity = (bool) $userHomeCity;
        $this->set('userHasSetHomeCity', $userHasSetHomeCity);

        // Whether the logged in user has chosen an avatar/display picture
        $userPicture = $ah->getImagePath($ui); // relative path to avatar image
        $userHasSetPicture = (bool) $userPicture;
        $this->set('userHasSetPicture', $userHasSetPicture);

        // Whether or not the logged in user has created any walks
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByUserID($u->getUserID());
        $walks = $pl->get();
        $userHasCreatedWalks = count($walks) > 0;
        $this->set('userHasCreatedWalks', $userHasCreatedWalks);
        $this->set('userWalks', $walks);

        // Walk data for walks created by the logged in user; empty array if the
        // user hasn't yet created any
        /* The basics from a page:
         * title: $page->getCollectionName();
         * link: $nh->getLinkToCollection($page);
         * !published: $page->getAttribute('exclude_page_list');
         */
      
        // Whether the logged in user has created any blog posts
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle(array('walk_blog_entry', 'city_blog_entry'));
        $pl->filterByUserID($u->getUserID());
        $blogs = $pl->get();

        $userHasPostedBlogPost = count($blogs) > 0;
        $this->set('userHasPostedBlogPost', $userHasPostedBlogPost);
        $this->set('userBlogPosts', $blogs);

        /**
         * User city data
         * 
         */
        if ($userHasSetHomeCity === true) {
            $cityOrganizer = UserInfo::getByID($userHomeCity->getCollectionUserID());
      
            // The email address of the city organizer for the logged in user's
            // home city
            $cityOrganizerEmailAddress = $cityOrganizer->getUserEmail(); 
            $this->set('cityOrganizerEmailAddress', $cityOrganizerEmailAddress);

            // Whether the city has a blog page set up for it
            $pl = new PageList();
            $pl->filterByCollectionTypeHandle('blog');
            $pl->filterByParentID($userHomeCity->getCollectionID());

            $cityHasBlogSetup = $pl->getTotal();
            $this->set('cityHasBlogSetup', $cityHasBlogSetup);

            // If the user is a city organizer
            if ($userIsCityOrganizer === true) {

                // Whether the city has any walks posted to it
                // Whether the city has a blog page set up for it
                $pl = new PageList();
                $pl->filterByCollectionTypeHandle('walk');
                $pl->filterByParentID($userHomeCity->getCollectionID());
                $pl->filterByAttribute('exclude_page_list', false);

                $cityWalks = $pl->get();
                $this->set('cityWalkData', $cityWalks);
                $cityHasWalks = count($cityWalks) > 0;
                $this->set('cityHasWalks', $cityHasWalks);

                // Whether the city organizer's city has it's header info set
                $cityHeaderInfo = $userHomeCity->getBlocks('City Header')[0]->getController()->getContent();
                $cityHeaderInfoIsEmpty = !trim($cityHeaderInfo);
                $this->set('cityHeaderInfoIsEmpty', $cityHeaderInfoIsEmpty);
                $this->set('cityHeaderInfo', $cityHeaderInfo);

                // Whether the city organizer's city has it's short description
                // set
                $cityDescription = $userHomeCity->getBlocks('City Description')[0]->getController()->getContent();
                $cityDescriptionIsEmpty = !trim($cityDescription);
                $this->set('cityDescriptionIsEmpty', $cityShortDescriptionIsEmpty);
                $this->set('cityDescription', $cityShortDescription);

                // Whether the city organizer's city has it's background photo
                // set
                $cityBackgroundPhotoAttribute = $userHomeCity->getAttribute('full_bg');
                $cityBackgroundPhotoIsEmpty = !($cityBackgroundPhotoAttribute);
                $this->set('cityBackgroundPhotoIsEmpty', $cityBackgroundPhotoIsEmpty);
                if(!$cityBackgroundPhotoIsEmpty) {
                    $this->set('cityBackgroundPhoto', $cityBackgroundPhotoAttribute->getURL());
                }

                // Whether the header, description and photo are set for the
                // city organizer's home city
                $cityHasFullDetails = !($cityHeaderInfoIsEmpty || 
                                        $cityDescriptionIsEmpty ||
                                        $cityBackgroundPhotoIsEmpty );
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
            // TODO add an attribute to select 'featured' cities, so we
            // don't simply grab all cities. Expand this out into a 
            // smart way to recommend other cities.
            $pl = new PageList();
            $pl->filterByCollectionTypeHandle('city');
            $pl->filterByUserID(array('!=', $u->getUserID())); // Don't recommend your own city to you
            $pl->filterByAttribute('exclude_page_list', false);
            $pl->sortBy('RAND()');

            $recommendedCities = $pl->get(3);

            $cityOrganizerData = array_map(
                function($page) use ($ah) {
                    $_co = UserInfo::getByID($page->getCollectionUserID());
                    return array(
                        'cityName' => $page->getCollectionName(),
                        'organizerImagePath' => $ah->getImagePath($_co),
                        'organizerName' => trim("{$_co->getAttribute('first_name')} {$_co->getAttribute('last_name')}"),
                        'organizerEmail' => $_co->getUserEmail()
                    );
                }, $pl->get(3));

            $this->set('cityOrganizerData', $cityOrganizerData);
          
            // List of basic data for three walks we want to highlight to city
            // organizers/walk leaders that showcase creative/unique walks
            $pl = new PageList();
            $pl->filterByCollectionTypeHandle('walk');
            $pl->filterByUserID(array('!=', $u->getUserID())); // Don't recommend your own city to you
            $pl->filterByAttribute('exclude_page_list', false);
            $pl->sortBy('RAND()');

            $featuredWalkData = array_map(
                function($page) use ($nh, $ih){
                    $_city = Page::getByID($page->getCollectionParentID());
                    $_country = Page::getByID($_city->getCollectionParentID());
                    $_thumb = $page->getAttribute('thumbnail');
                    return array(
                        'walkImagePath' => $ih->getThumbnail($_thumb,800,800)->src,
                        'countryName' => $_country->getCollectionName(),
                        'cityName' => $_city->getCollectionName(),
                        'walkTitle' => $page->getCollectionName(),
                        'walkPath' => $nh->getLinkToColection($page)
                    );
                }, $pl->get(3));

            $this->set('featuredWalkData', $featuredWalkData);
        }
        $this->set('resources', $resources);
    }
  }
}
