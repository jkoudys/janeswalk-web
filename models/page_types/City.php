<?php
namespace JanesWalk\Models\PageTypes;

// FIXME: replace with spl autoloader on PSR standard after c5.7 upgrade
require_once(DIR_BASE . '/models/page_types/Walk.php');

// Default lib classes
use \Exception;
// c5 classes
use \Loader;
use \Page;
use \UserInfo;
use \User;
use \PageList;
use \SelectAttributeTypeOptionList;
use JanesWalk\Models\PageTypes\Walk;

defined('C5_EXECUTE') || die('Access Denied.');

/*
 * City
 *
 * Model containing attribute accessors and logic for Jane's Walk cities
 */
class City extends \Model implements \JsonSerializable
{
    /* Page collection object */
    protected $page;
    protected $title;

    /* Basic attributes of a city */
    public $totalWalks;
    public $donateCopy;
    public $fullbg;
    public $avatar;
    public $cityOrganizer;
    public $profile_path;
    public $blog;
    public $facebook;
    public $twitter;
    public $website;
    public $country;
    public $shortDescription;
    public $longDescription;

    /*
     * __construct
     *
     * Initialize City object, building values based on Page attributes
     *
     * @param Page $page : a Page (Collection) object for a City
     */
    public function __construct(Page $page)
    {
        // Set our helpers
        $av = Loader::helper('concrete/avatar');

        if ($page->getCollectionTypeHandle() !== 'city') {
            throw new Exception(t('Attempted to instantiate City model on a non-city page type.'));
        }

        // Always store the $page object to refer to later
        $this->page = $page;

        // The city's name
        $this->title = $page->getCollectionName();

        // Short + long descriptions
        $this->shortDescription = $page->getCollectionDescription();
        $this->longDescription = $page->getAttribute('longdescription');

        // Load + format data
        // Assume $page_owner is the admin if not set
        $page_owner = UserInfo::getByID($page->getCollectionUserID()) ?: UserInfo::getByID(1);

        $this->facebook = trim((string) $page_owner->getAttribute('facebook'));
        $this->twitter = trim((string) $page_owner->getAttribute('twitter'));
        $this->website = trim((string) $page_owner->getAttribute('website'));

        // Set the country Page as parent
        $this->country = Page::getByID($page->getCollectionParentID());

        /* Text to donate campaign */
        $donateCopyOptions = [
            [
                'imagePath' => 'https://d11lsn3axbj16p.cloudfront.net/hd.1397590505-7430110f-eba3.jpg',
                'main' => 'Love Jane\'s Walk?',
                'cta' => 'Text JANE to 45678 to donate $10'
            ]
        ];
        $this->donateCopy = array_rand($donateCopyOptions);

        // Set our calculated values
        $this->fullbg = $page->getAttribute('main_image') ?: $page->getAttribute('full_bg') ?: null;
        $this->avatar = $av->getImagePath($page_owner) ?: null;
        $this->cityOrganizer = $page_owner;
        $this->profile_path = DIR_REL . '/' . DISPATCHER_FILENAME . '/profile/' . $page_owner->getUserId();
    }

    public function __get($name)
    {
        /* One big switch for all the get names */
        switch ($name) {
        case 'blog':
            $blog = new PageList();
            $blog->filterByCollectionTypeHandle('city_blog');
            $blog->filterByParentID($this->page->getCollectionID());
            $this->blog = $blog->get(1)[0];
            return $this->blog;
            break;
        case 'facebook_url':
            return $this->facebook ? 'http://facebook.com/' . end(preg_split('/\//', $this->facebook)) : null;
            break;
        case 'twitter_url':
            return $this->twitter ? 'http://twitter.com/' . end(preg_split('/[@\/]/', $this->twitter)) : null;
            break;
        case 'website_url':
            return $this->website ? 
                (0 === strpos($this->website, 'http')) ?
                    $this->website : ('http://' . $this->website) :
                null;
            break;
        case 'url':
            return Loader::helper('navigation')->getCollectionURL($this->page);
            break;
        case 'totalWalks':
            $walks = new PageList();
            $walks->filterByParentID($page->getCollectionID());
            $walks->filterByAttribute('exclude_page_list', false);
            $walks->filterByCollectionTypeHandle('walk');
            $this->totalWalks = $walks->getTotal;
            return $this->totalWalks;
            break;
        }
    }

    /*
     * __toString
     *
     * To be used for easy quick output of the city's name
     *
     * @return String
     */
    public function __toString()
    {
        return $this->title;
    }

    /*
     * jsonSerialize
     *
     * Run automatically by json_encode()
     *
     * @return Array
     */
    public function jsonSerialize()
    {
        Loader::model('page_list');
        $im = Loader::helper('image');

        // Load the mirror services allowed in this city
        $mirrors = $this->page->getAttribute('mirrors');
        $mirrorOptions = $mirrors ? $mirrors->getOptions() : [];

        // Load our list of wards/boroughs/regions
        $city_wards = $this->page->getAttribute('city_wards');
        // Validate we retrieved this attribute
        if ($city_wards instanceof SelectAttributeTypeOptionList) {
            $wards = $city_wards->getOptions();
        } else {
            $wards = [];
        }

        // Set basic city data
        $cityData = [
            'name' => $this->title,
            'url' => $this->url,
            'background' => $this->full_bg ? $this->full_bg->getURL() : null,
            'shortDescription' => $this->shortDescription,
            'longDescription' => $this->longDescription,
            /* We'll assume Sponsors area's first block is the one with the description */
            'mirrors' =>  array_map(
                function($mirror) {
                    return (string) $mirror;
                },
                $mirrorOptions
            ),
            'latlng' => array_map(
                function($coord) {
                    return (float) $coord;
                },
                split(',', $this->page->getAttribute('latlng'))
            ),
            'wards' => array_map(
                function($ward) {
                    return ['id' => $ward->ID, 'value' => $ward->value];
                },
                $wards
            )
        ];

        // Load the sponsors from the first block
        $sponsorsBlock = $this->page->getBlocks('Sponsors')[0];
        // Don't try and load sponsors if the block is unset
        if ($sponsorsBlock) {
            $cityData['sponsors'] = $sponsorsBlock->getController()->getContent();
        }

        // Load details on CO, only if not the site admin
        $coID = (int) $this->cityOrganizer->getUserID();
        if ($coID > 1) {
            $cityData['cityOrganizer'] = [
                'id' => $coID,
                'photo' => $this->avatar,
                'firstName' => $this->cityOrganizer->getAttribute('first_name'),
                'lastName' => $this->cityOrganizer->getAttribute('last_name'),
                'email' => $this->cityOrganizer->getUserEmail(),
                'facebook' => $this->facebook,
                'twitter' => $this->twitter,
                'website' => $this->website
            ];
        }

        return $cityData;
    }

    /**
     * getWalks
     *
     * Get all the walks for this city
     *
     * @return array
     */
    public function getWalks()
    {
        $pl = new PageList;
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByPath($this->page->getCollectionPath());
        $pl->filterByAttribute('exclude_page_list', false);
        $pagecount = 500;

        return array_map(
            function($page) {
                return new Walk($page);
            },
            $pl->get($pagecount)
        );
    }

    /**
     * getPage()
     * Returns a page object for this city. Keeping $page protected as we may want some logic around this later
     * @return Page
     */
    public function getPage()
    {
        return $this->page;
    }

}
