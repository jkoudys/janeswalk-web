<?php
namespace JanesWalk\Models\PageTypes;

// Default lib classes
use \Exception;
use \DOMDocument;
use \XSLTProcessor;
// c5 classes
use \Loader;
use \Page;
use \File;

defined('C5_EXECUTE') || die('Access Denied.');

/**
 * Walk
 *
 * Model containing attribute accessors and logic for Jane's Walk walks
 */
Loader::model('page_types/City');
class Walk extends \Model implements \JsonSerializable
{
    /**
     * @type Page $page C5 Page Collection of the Walk
     * @type string $title The title of this walk
     */
    protected $page, $title;

    /* Basic attributes of a walk */
    public $shortdescription,
           $longdescription,
           $accessibleInfo,
           $accessibleTransit,
           $accessibleParking,
           $accessibleFind,
           $map,
           $team,
           $time,
           $thumbnailID,
           $wards,
           $themes;

    /* Value store for getters */
    private $getCache;

    /*
     * __construct
     *
     * Initialize Walk object, building values based on Page attributes
     *
     * @param Page $page : a Page (Collection) object for a Walk
     */
    public function __construct(Page $page)
    {
        if ($page->getCollectionTypeHandle() !== 'walk') {
            throw new Exception(t('Attempted to instantiate Walk model on a non-walk page type.'));
        }
        $this->getCache = array();

        $this->page = $page;
        $this->title = $page->getCollectionName();

        $db = Loader::db();

        list(
            $this->thumbnailID,
            $this->shortdescription,
            $this->longdescription,
            $this->accessibleInfo,
            $this->accessibleTransit,
            $this->accessibleParking,
            $this->accessibleFind,
            $this->map,
            $this->team,
            $this->wards,
            $this->themes,
            $this->accessible
        ) = array_values($db->getRow('SELECT ak_thumbnail, ak_shortdescription, ak_longdescription, ak_accessible_info, ak_accessible_transit, ak_accessible_parking, ak_accessible_find, ak_gmap, ak_team, ak_walk_wards, ak_theme, ak_accessible FROM CollectionSearchIndexAttributes where cID=?', [$page->getCollectionID()]));
        /* Themes and Accessibility are sets of checkboxes, so a bit more involved to load */
        $loadChecks = function ($attrString) use ($page) {
            $checkboxes = [];
            $av = explode("\n", $attrString);
            foreach ((array) $av as $selectAttribute) {
                if ($selectAttribute) {
                    $checkboxes[(string) $selectAttribute] = true;
                }
            }

            return $checkboxes;
        };

        // Decode the JSON fields
        $this->map = json_decode($this->map, true);
        $this->team = json_decode($this->team, true);

        // Decode \n delimited arrays
        $this->themes = $loadChecks($this->themes);
        $this->accessible = $loadChecks($this->accessible);

        // Load more complex attributes
        $this->time = $page->getAttribute('scheduled');
    }

    public function __get($name)
    {
        /* One big switch for all the get names */
        switch ($name) {
        case 'crumbs':
            // @return Array of Page objects, from highest level parent to walk page
            $this->crumbs = Loader::helper('navigation')->getTrailToCollection($this->page);
            krsort($this->crumbs);

            return $this->crumbs;
            break;
        case 'teamPictures':
            // @return Array<Array> of members
            $theme = \PageTheme::getByHandle('janeswalk');
            $this->teamPictures = array_map(function ($mem) use ($theme) {
                if ($mem['type'] === 'you') {
                    $mem['type'] = ($mem['role'] === 'walk-organizer') ?
                        'organizer' : 'leader';
                }
                switch ($mem['type']) {
                case 'leader':
                    $mem['image'] = $theme->getThemeURL() . '/img/walk-leader.png';
                    $mem['title'] = 'Walk Leader';
                    break;
                case 'organizer':
                    $mem['image'] = $theme->getThemeURL() . '/img/walk-organizer.png';
                    $mem['title'] = 'Walk Organizer';
                    break;
                case 'community':
                    $mem['image'] = $theme->getThemeURL() . '/img/community-voice.png';
                    $mem['title'] = 'Community Voice';
                    break;
                case 'volunteer':
                    $mem['image'] = $theme->getThemeURL() . '/img/volunteers.png';
                    $mem['title'] = 'Volunteer';
                    break;
                default:
                    break;
                }
                if ($mem['user_id'] > 0) {
                    if ($avatar = Loader::helper('concrete/avatar')->getImagePath(\UserInfo::getByID($mem['user_id']))) {
                        $mem['avatar'] = $avatar;
                    }
                }

                return $mem;
            }, (array) $this->team);

            return $this->teamPictures;
            break;
        case 'walkLeaders':
            // @return Array of team members who are walk leaders
            return array_filter(
                (array) $this->team,
                function ($mem) {
                    return (strpos($mem['role'], 'leader') !== false) || ($mem['type'] === 'leader');
                }
            );
            break;
        case 'city':
            // @return City of walk's city
            return $this->getCache['city'] ?: ($this->getCache['city'] = new City(Page::getByID($this->page->getCollectionParentID())));
            break;
        case 'meetingPlace':
            // @return Array<title, description> for first stop on walking route
            foreach ((array) $this->map['markers'] as $marker) {
                $this->meetingPlace = ['title' => $marker['title'], 'description' => $marker['description']];

                return $this->meetingPlace;
            }
            break;
        case 'initiatives':
            // Initiatives
            $this->initiatives = [];
            $initiativeObjects = $this->page->getAttribute('walk_initiatives');
            if ($initiativeObjects !== false) {
                foreach ($initiativeObjects->getOptions() as $initiative) {
                    $val = $initiative->value;
                    $this->initiatives[] = $val;
                }
            }
            sort($this->initiatives);

            return $this->initiatives;
            break;
        case 'datetimes':
            // Date + time pairings
            $scheduled = $this->page->getAttribute('scheduled');
            $this->datetimes = [];

            foreach ((array) $scheduled['slots'] as $s) {
                $this->datetimes[] = [
                    'date' => $s['date'],
                    'time' => $s['time'],
                    'timestamp' => strtotime($s['date'] . ' ' . $s['time'])
                ];
            }

            return $this->datetimes;
            break;
        }
    }

    public function __set($name, $value)
    {
        switch ($name) {
        case 'city':
            // When setting a walk's city, this implies moving that walk Page to a new parent
            if ($value instanceof Page && $value->getCollectionTypeHandle() === 'city') {
                return $this->page->move($value);
            } else {
                throw new Exception(t('Attempted to move a page of type Walk to a non-City page'));
            }
            break;
        }

        // Always finish by running parent method, else only defined properties can be set
        parent::__set($name,$value);
    }

    /*
     * __toString
     *
     * To be used for easy quick output of the walk's title, e.g. "My walk is called $walk"
     *
     * @return String
     */
    public function __toString()
    {
        return $this->title;
    }

    /*
     * setJson
     *
     * Updates the collection object so attributes match JSON envelope
     * Used for create a walk form, services that update walks, etc.
     *
     * @param  String  $json : json of walk details
     * @return boolean Success message for save
     *
     * TODO: this should update its properties first, then implement a save()
     * method to persist the changes (eg pattern of Models in Rails)
     */
    public function setJson($json)
    {
        $postArray = json_decode($json, true);
        $db = Loader::db(); // TODO on 5.7, no more adodb, so rewrite transactions here
        $db->StartTrans();
        $ok = true;
        try {
            if (empty($postArray['title'])) {
                throw new Exception('Walk title cannot be empty.');
            }

            $this->page->update(['cName' => $postArray['title']]);
            $this->page->setAttribute('shortdescription', $postArray['shortdescription']);
            $this->page->setAttribute('longdescription', $postArray['longdescription']);
            $this->page->setAttribute('accessible_info',$postArray['accessible-info']);
            $this->page->setAttribute('accessible_transit',$postArray['accessible-transit']);
            $this->page->setAttribute('accessible_parking',$postArray['accessible-parking']);
            $this->page->setAttribute('accessible_find', $postArray['accessible-find']);
            $this->page->setAttribute('walk_wards', $postArray['wards']);
            $this->page->setAttribute('scheduled', (array) $postArray['time']);

            $this->page->setAttribute('gmap', json_encode($postArray['gmap']));
            $this->page->setAttribute('team', json_encode($postArray['team']));
            
            if (count($postArray['thumbnails']) && File::getByID($postArray['thumbnails'][0]['id'])) {
                $this->page->setAttribute(
                    'thumbnail',
                    File::getByID($postArray['thumbnails'][0]['id'])
                );
            }

            /* Go through checkboxes */
            $checkboxes = array('theme' => [], 'accessible' => []);
            foreach ($postArray['checkboxes'] as $key => $checked) {
                $selectAttribute = strtok($key, '-');
                $selectValue = strtok('');
                if ($checked) {
                    $checkboxes[$selectAttribute][] = $selectValue;
                }
            }
            foreach (['theme', 'accessible'] as $akHandle) {
                $this->page->setAttribute($akHandle, $checkboxes[$akHandle]);
            }
        } catch (Exception $e) {
            $db->FailTrans(); // Set transaction to rollback
            (new \Log('error', false))->write(__CLASS__ . '::' . __FUNCTION__ .
                ' failed on page ' . $this->page->title . ': ' . $e);
            $ok = false;
        } 
        
        $db->CompleteTrans();

        return $ok;
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
        $im = Loader::helper('image');
        $walkData = array(
            'title' => $this->title,
            'shortdescription' => $this->shortdescription,
            'longdescription' => $this->longdescription,
            'accessible-info' => $this->accessibleInfo,
            'accessible-transit' => $this->accessibleTransit,
            'accessible-parking' => $this->accessibleParking,
            'gmap' => $this->map,
            'team' => $this->team,
            'time' => $this->time,
            'thumbnail_id' => $this->thumbnail,
            'thumbnail_url' => $this->thumbnail ? $im->getThumbnail(File::getByID($this->thumbnail), 340,720)->src : null,
            'wards' => $this->wards
        );
        // Load the thumbnail array
        $walkData['thumbnails'] = [];
        if ($this->thumbnail) {
            $walkData['thumbnails'][] = [
                'id' => $this->thumbnail->getFileID(),
                'url' => $im->getThumbnail($this->thumbnail, 340,720)->src
            ];
        }

        // Callback, in case we define more checkbox groups
        // Map their key names here to ones the service-consumers understand
        $checkboxes = [];
        $mapKeyNames = function ($v, $k, $akHandle) use (&$checkboxes) {
            $checkboxes["{$akHandle}-{$k}"] = $v;
        };
        array_walk($this->themes, $mapKeyNames, 'theme');
        array_walk($this->accessible, $mapKeyNames, 'accessible');
        $walkData['checkboxes'] = $checkboxes;

        return $walkData;
    }

    /*
     * kmlSerialize
     *
     * Not auto-run by anything, but builds google-maps-friendly KML
     *
     * @return DOMDocument
     */
    public function kmlSerialize()
    {
        $fh = Loader::helper('file');
        // Creates the Document.
        $doc = new DOMDocument;

        $map = $doc->appendChild($doc->createElement('map'));
        $map->appendChild($doc->createElement('name', (string) $this));

        // Set the map markers -- "meeting place" and "stop"s
        foreach ($this->map['markers'] as $k => $marker) {
            $m = $map->appendChild($doc->createElement('marker'));
            $m->setAttribute('name', $marker['title']);
            $m->setAttribute('description', $marker['description']);
            $m->setAttribute('lat', $marker['lat']);
            $m->setAttribute('lng', $marker['lng']);
        }
        
        $coorStr = '';
        foreach ($this->map['route'] as $route) {
            // Creates a coordinates element and gives it the value of the lng and lat columns from the results.
            $coorStr .= PHP_EOL . $route['lng'] . ', ' . $route['lat'] . ', 0';
        }
        if ($coorStr) $map->appendChild($doc->createElement('route', $coorStr));

        $xsltp = new XSLTProcessor;
        $xsltp->importStyleSheet(DOMDocument::load(DIR_BASE . '/elements/templates/kmlmap.xsl'));

        // Apply stylesheet and return
        return $xsltp->transformToDoc($doc);
    }

    /**
     * getPage()
     * Returns a page object for this walk. Keeping $page protected as we may want some logic around this later
     * @return Page
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * getTimezone()
     * Looks up the timezone for this walk.
     * @return string Time zone abbreviation
     */
    public function getTimezone()
    {
        // TODO: Grab the timezone by checking the 'timezone' attribute recursively
        return 'EST';
    }
}
