<?php
namespace JanesWalk\Models\PageTypes;

// Default lib classes
use \Exception;
// c5 classes
use \Loader;
use \Page;
use \UserInfo;
use \User;
use \PageList;

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
    public $city_organizer;
    public $profile_path;
    public $blog;
    public $facebook;
    public $twitter;
    public $website;
    public $country;

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
        $im = Loader::helper('image');
        $nh = Loader::helper('navigation');
        $av = Loader::helper('concrete/avatar');

        if ($page->getCollectionTypeHandle() !== 'city') {
            echo 'XXX' . $page->getCollectionTypeHandle();
//            throw new Exception(t('Attempted to instantiate City model on a non-city page type.'));
        }

        // Always store the $page object to refer to later
        $this->page = $page;
        // The city's name
        $this->title = $page->getCollectionName();

        // Load + format data
        // Assume $page_owner is the admin if not set
        $page_owner = UserInfo::getByID($page->getCollectionUserID()) ?: UserInfo::getByID(1);

        $this->facebook = trim((string) $page_owner->getAttribute('facebook'));
        $this->twitter = trim((string) $page_owner->getAttribute('twitter'));
        $this->website = trim((string) $page_owner->getAttribute('website'));

        $blog = new PageList();
        $blog->filterByCollectionTypeHandle('city_blog');
        $blog->filterByParentID($page->getCollectionID());

        $walks = new PageList();
        $walks->filterByParentID($page->getCollectionID());
        $walks->filterByAttribute('exclude_page_list', false);
        $walks->filterByCollectionTypeHandle('walk');
        $this->totalWalks = $walks->getTotal();

        // Set the country Page as parent
        $this->country = Page::getByID($page->getCollectionParentID());

        /* Text to donate campaign */
        $donateCopyOptions = array(
            array(
                'imagePath' => 'https://d11lsn3axbj16p.cloudfront.net/hd.1397590505-7430110f-eba3.jpg',
                'main' => 'Love Jane\'s Walk?',
                'cta' => 'Text JANE to 45678 to donate $10'
            )
        );
        $this->donateCopy = array_rand($donateCopyOptions);

        // Set our calculated values
        $this->fullbg = ($full_bg_attr = $page->getAttribute('full_bg')) ?: null;
        $this->avatar = $av->getImagePath($page_owner) ?: null;
        $this->city_organizer = $page_owner;
        $this->profile_path = DIR_REL . '/' . DISPATCHER_FILENAME . "/profile/{$page_owner->getUserId()}";
        $this->blog = $blog->get(1)[0];
    }

    public function __get($name)
    {
        /* One big switch for all the get names */
        switch ($name) {
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
        $nh = Loader::helper('navigation');
        $im = Loader::helper('image');
        $u = new User;
        $pl = new PageList;
        $pl->filterByCollectionTypeHandle('walk');
        $pl->filterByPath($this->page->getCollectionPath());
        $pl->filterByAttribute('exclude_page_list',false);
        $pagecount = 500;
        $cityData = array(
            'title' => $this->title,
            'url' => $this->url,
            'background' => $this->full_bg ? $this->full_bg->getURL() : null,
            /* We'll assume each area's first block is the one with the descriptions */
            'short_description' => strip_tags($this->page->getBlocks('City Header')[0]->getController()->getContent()),
            'long_description' => strip_tags($this->page->getBlocks('City Description')[0]->getController()->getContent()),
            'sponsors' => $this->page->getBlocks('Sponsors')[0]->getController()->getContent()
        );
        if ((int) $this->city_organizer->getUserID() > 1) {
            $cityData['city_organizer'] = array(
                'photo' => $this->avatar,
                'first_name' => $this->city_organizer->getAttribute('first_name'),
                'last_name' => $this->city_organizer->getAttribute('last_name'),
                'email' => $this->city_organizer->getUserEmail(),
                'facebook' => $this->facebook,
                'twitter' => $this->twitter,
                'website' => $this->website
            );
        }
        foreach ($pl->get($pagecount) as $key => $page) {
            $scheduled = $page->getAttribute('scheduled');
            $slots = (Array) $scheduled['slots'];
            $cityData['walks'][$key] = array(
                'url' => $nh->getCollectionURL($page),
                'title' => $page->getCollectionName(),
                'thumb' => ($thumb = $page->getAttribute('thumbnail')) ? $im->getThumbnail($thumb, 340,720)->src : null,
                'schedule' => isset($scheduled['open']) ? 'Open Schedule' : (isset($slots[0]['date']) ? $slots[0]['date'] : null),
                'wards' => $page->getAttribute('walk_wards'),
                'time' => isset($slots[0]['time']) ? $slots[0]['time'] : 'multiple',
                'map' => json_decode($page->getAttribute('gmap')),
                'short_description' => $page->getAttribute('shortdescription')
            );
            foreach ($slots as $slot) {
                $cityData['walks'][$key]['slots'][] = ['date' => $slot['date'], 'time' => $slot['time'] ?: 'multiple'];
            }
            foreach (json_decode($page->getAttribute('team')) as $memkey=>$mem) {
                $cityData['walks'][$key]['team'] .= ($memkey == 0 ? 'Walk led by ' : ($memkey > 0 ? ', ' : '')) . "{$mem->{'name-first'}} {$mem->{'name-last'}}";
            }
        }

        return $cityData;
    }

    /*
     * getPage()
     * Returns a page object for this city. Keeping $page protected as we may want some logic around this later
     * @return Page
     */
    public function getPage()
    {
        return $this->page;
    }

}
