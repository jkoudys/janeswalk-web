<?php
namespace JanesWalk\Models\PageTypes;

// Default lib classes
use \Exception;
use \RuntimeException;
use \DOMDocument;
use \XSLTProcessor;
use \stdClass;

// c5 classes
use \Loader;
use \Page;
use \File;
use \UserInfo;
use \UserAttributeKey as UAK;

// concrete5
use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\ImageHelper;
use Concrete\Core\Legacy\FileHelper;
use Concrete\Core\Legacy\AvatarHelper;

/**
 * Walk
 *
 * Model containing attribute accessors and logic for Jane's Walk walks
 */
class Walk extends \Model implements \JsonSerializable
{
    /**
     * @type Page $page C5 Page Collection of the Walk
     * @type string $title The title of this walk
     */
    protected $page;
    protected $title;

    /* Basic attributes of a walk */
    public $shortdescription;
    public $longdescription;
    public $accessibleInfo;
    public $accessibleTransit;
    public $accessibleParking;
    public $accessibleFind;
    public $features;
    public $team;
    public $time;
    public $thumbnail;
    public $wards;
    public $themes;
    public $accessibles;

    // Map the object properties to their DB handle
    private $handleMap = [
        'shortDescription' => 'shortdescription',
        'longDescription' => 'longdescription',
        'accessibleInfo' => 'accessible_info',
        'accessibleTransit' => 'accessible_transit',
        'accessibleParking' => 'accessible_parking',
        'accessibleFind' => 'accessible_find',
        'features' => 'gmap',
        'team' => 'team',
        'wards' => 'walk_wards',
    ];

    // Optimisation cache for the default teams
    static $defaultTeams = [];
    static $stmtTeamMember;

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
            throw new RuntimeException(t('Attempted to instantiate Walk model on a non-walk page type.'));
        }

        $this->page = $page;
        $this->title = $page->getCollectionName();

        $db = Loader::db();

        $stmt = 'akHandle=\'' . implode('\' or akHandle=\'', $this->handleMap) . '\'';

        // Consolodated query; runs way faster than a dozen getAttributes
        // FIXME: prepare this stmt.
        foreach ($db->getAll(
            'select value, ak.akHandle from atDefault atd ' .
            'INNER JOIN CollectionAttributeValues cav ON (atd.avID = cav.avID) ' .
            'INNER JOIN AttributeKeys ak ON (ak.akID = cav.akID AND (' . $stmt . ')) ' .
            'WHERE cav.cID = ? AND cav.cvID = ?',
            [$page->getCollectionID(), $page->getVersionID()]
        ) as $av) {
            // Find which return value we're setting
            $key = array_search($av['akHandle'], $this->handleMap);
            if ($key) {
                $this->{$key} = $av['value'];
            }
        }

        // Decode the JSON fields
        if ($this->team) {
            $this->team = array_map([self, 'mapMigratedTeam'], (array) json_decode($this->team, true));
        } else {
            $this->team = $this->getDefaultTeam();
        }

        $this->features = static::formatAsFeatures((array) json_decode($this->features, true));

        // Load more complex attributes
        $this->time = $page->getAttribute('scheduled');
        $this->thumbnail = $page->getAttribute('thumbnail');

        // Checkboxes need to be mapped from an array
        $checkMap = function (string $attribute) use ($page) {
            $attrList = $page->getAttribute($attribute);
            if ($attrList) {
                return array_map(
                    function ($check) { return (string) $check; },
                    iterator_to_array($attrList)
                );
            }
            return null;
        };
        $this->themes = $checkMap('theme');
        $this->accessibles = $checkMap('accessible');

        $this->published = !($page->getAttribute('exclude_page_list') === '1');
    }

    protected static function getTeamMemberStmt() {
        if (!self::$stmtTeamMember) {
            $db = Loader::db();
            self::$stmtTeamMember = $db->Prepare(<<<EOT
SELECT
    u.uID AS id,
    u.uEmail as email,
    CONCAT_WS(' ', MAX(fn.value), MAX(ln.value)) AS name,
    MAX(fb.value) AS facebook,
    MAX(tw.value) AS twitter,
    MAX(ws.value) AS website,
    MAX(bi.value) AS bio
FROM Users u 
INNER JOIN UserAttributeValues uav ON (uav.uID = u.uID AND u.uID = ?) 
LEFT JOIN atDefault AS fn ON (fn.avID = uav.avID AND uav.akID = ?) 
LEFT JOIN atDefault AS ln ON (ln.avID = uav.avID AND uav.akID = ?) 
LEFT JOIN atDefault AS fb ON (fb.avID = uav.avID AND uav.akID = ?) 
LEFT JOIN atDefault AS tw ON (tw.avID = uav.avID AND uav.akID = ?) 
LEFT JOIN atDefault AS ws ON (ws.avID = uav.avID AND uav.akID = ?) 
LEFT JOIN atDefault AS bi ON (bi.avID = uav.avID AND uav.akID = ?) 
GROUP BY id ORDER BY name LIMIT 1
EOT
        );
        }
        return self::$stmtTeamMember;
    }

    /**
     * Get the default team members for this Walk. Typically used for new Walks.
     */
    protected function getDefaultTeam(): array
    {
        $db = Loader::db();
        $ownerId = $this->page->getCollectionUserID();
        $parentPageId = $this->page->getCollectionParentID();
        $coId = Page::getByID($parentPageId)->getCollectionUserID();
        $cacheKey = "{$ownerId}-{$parentPageId}";
        $stmt = self::getTeamMemberStmt();

        if (array_key_exists($cacheKey, self::$defaultTeams)) {
            return self::$defaultTeams[$cacheKey];
        }

        $handles = [
            UAK::getByHandle('first_name')->akID,
            UAK::getByHandle('last_name')->akID,
            UAK::getByHandle('facebook')->akID,
            UAK::getByHandle('twitter')->akID,
            UAK::getByHandle('website')->akID,
            UAK::getByHandle('bio')->akID,
        ];

        self::$defaultTeams[$cacheKey] = [
            array_merge(
                $db->Execute($stmt, array_merge([$ownerId], $handles))->fetchRow(),
                ['type' => 'leader']
            ),
            array_merge(
                $db->Execute($stmt, array_merge([$coId], $handles))->fetchRow(),
                ['type' => 'organizer']
            ),
        ];

        return self::$defaultTeams[$cacheKey];
    }

    /**
     * Migrate the old name-first name-last and 'you' team members to the new format.
     * To be passed into a mapping function
     */
    protected static function mapMigratedTeam(array $member): array
    {
        // Collapse names
        if (isset($member['name-first'])) {
            $member['name'] = trim($member['name-first'] . ' ' . $member['name-last']);
            unset($member['name-first'], $member['name-last']);
        }

        // Replace 'you' with the actual role
        if (isset($member['type']) && $member['type'] === 'you') {
            if (strpos($member['role'], 'rganizer') === false) {
                $member['type'] = 'leader';
            } else {
                $member['type'] = 'organizer';
            }
            unset($member['role']);
        }
        return $member;
    }

    /**
     * Validate and format as geojson features
     * @return array
     */
    protected static function formatAsFeatures(array $map): array
    {
        // Map the old-style ad-hoc format to a geojson features array
        if (array_key_exists('markers', $map)) {
            $features = array_map(function ($marker) {
                return [
                    'type' => 'Feature',
                    'geometry' => [
                        'type' => 'Point',
                        'coordinates' => [$marker['lng'], $marker['lat']],
                    ],
                    'properties' => [
                        'title' => $marker['title'],
                        'description' => $marker['description'],
                    ],
                ];
            }, $map['markers']);
            if (count($map['route'])) {
                $features[] = [
                    'type' => 'Feature',
                    'geometry' => [
                        'type' => 'LineString',
                        'coordinates' => array_map(function ($point) {
                            return [$point['lng'], $point['lat']];
                        }, $map['route']),
                    ],
                    'properties' => ['title' => 'Walk route'],
                ];
            }
            return $features;
        }

        // Clear out any bad data we may have accumulated
        return array_values(array_filter($map));
    }

    /**
     * Convenience getters, mostly for grabbing model properties from views. If
     * the data takes a non-trivial time to fetch, store as an object property
     * of the same name, so it will be served from that.
     * Apart from caching, there must be no side effects.
     *
     */
    public function __get(string $name)
    {
        /* One big switch for all the get names */
        switch ($name) {
            case 'crumbs':
                // @return Array of Page objects, from highest level parent to walk page
                $this->crumbs = (new NavigationHelper())->getTrailToCollection($this->page);
                krsort($this->crumbs);

                return $this->crumbs;
            break;

            case 'teamPictures':
                // @return Array<Array> of members
                $theme = \PageTheme::getByHandle('janeswalk');
                $this->teamPictures = array_map(
                    function ($mem) use ($theme) {
                        $ui = \UserInfo::getByEmail($mem['email']);
                        if ($ui) {
                           $mem['avatar'] = (new AvatarHelper())->getImagePath($ui);
                        }
                        return $mem;
                    },
                    (array) $this->team
                );

                return $this->teamPictures;
            break;

            case 'walkLeaders':
                // @return Array of team members who are walk leaders
                return array_filter(
                    (array) $this->team,
                    function ($mem) {
                        return $mem['type'] === 'leader';
                    }
                );

            case 'city':
                // @return City of walk's city
                try {
                    $this->city = new City(Page::getByID($this->page->getCollectionParentID()));
                    return $this->city;
                } catch (Exception $e) {
                    return null;
                }

            case 'publishDate':
                foreach ((new \VersionList($this->page))->getVersionListArray() as $cv) {
                    if ($cv->getAttribute('exclude_page_list', $this->page)) {
                        return $lastPublished ?: '';
                    } else {
                        $lastPublished = $cv->getVersionDateCreated();
                    }
                }
                return $lastPublished;

            case 'initiatives':
                // Initiatives
                $this->initiatives = [];
                $initiativeObjects = $this->page->getAttribute('walk_initiatives');
                if ($initiativeObjects !== false) {
                    foreach ($initiativeObjects->getOptions() as $initiative) {
                        $this->initiatives[] = ['id' => $initiative->ID, 'name' => $initiative->value];
                    }
                }

                return $this->initiatives;

            case 'attendees':
                if ($this->attendees === null) {
                    $db = \Loader::db();
                    $this->attendees = array_map(
                        function ($row) {
                            return $row['uEmail'];
                        },
                        $db->GetAll('SELECT u.uEmail FROM UserAttributeValues uav JOIN atDefault ad ON uav.avID = ad.avID and uav.akID = 62 AND JSON_CONTAINS(ad.value->"$.lists[*].walks[*]", "[' . $this->page->getCollectionID() . ']") JOIN Users u ON u.uID = uav.uID;')
                    );
                }
                return $this->attendees;
        }
    }

    /*
     * __toString
     *
     * To be used for easy quick output of the walk's title, e.g. "My walk is called $walk"
     *
     * @return String
     */
    public function __toString(): string
    {
        return $this->title;
    }

    /*
     * setFromFeatures
     *
     * Updates the collection object so attributes match a geojson-
     * schema array.
     *
     * @param  array   $attr : geojson schema of Walk
     * @return boolean Success message for save
     *
     * TODO: this should update its properties first, then implement a save()
     * method to persist the changes (eg pattern of Models in Rails)
     */
    public function setJson(array $attr): bool
    {
        // TODO on 5.7, no more adodb, so rewrite transactions here
        $db = Loader::db();
        $db->StartTrans();
        $ok = true;

        try {
            foreach ($attr as $k => $v) {
                switch($k) {
                case 'title':
                    // Title is special in c5 - page title, not attribute
                    $this->page->update(['cName' => $v]);
                    break;
                case 'shortDescription':
                case 'longDescription':
                case 'accessibleInfo':
                case 'accessibleTransit':
                case 'accessibleFind':
                case 'wards':
                    // Basic attributes
                    $this->page->setAttribute($this->handleMap[$k], $v);
                    break;
                case 'features':
                    $this->page->setAttribute('gmap', json_encode($v));
                    break;
                case 'team':
                    $this->page->setAttribute('team', json_encode($v));
                    break;
                case 'themes':
                case 'accessibles':
                    // The c5 props don't include the 's'
                    // FIXME: rename these to have an s on next migration
                    $this->page->setAttribute(rtrim($k, 's'), $v);
                    break;
                case 'time':
                    $this->page->setAttribute('scheduled', $v);
                    break;
                case 'images':
                    $imgFile = File::getByID($v[0]['id']);
                    if ($imgFile) {
                        $this->page->setAttribute('thumbnail', $imgFile);
                    }
                    break;
                }
            }
        } catch (Exception $e) {
            $db->FailTrans(); // Set transaction to rollback
            (new \Log('error', false))->write(
                __METHOD__ .
                ' failed on page ' . $this->page->title . ': ' . $e
            );
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
    public function jsonSerialize(): array
    {
        $im = new ImageHelper();
        $nh = new NavigationHelper();
        $walkData = [
            'type' => 'FeatureCollection',
            'id' => $this->page->getCollectionID(),
            'title' => $this->title,
            'url' => $nh->getCollectionURL($this->page),
            'shortDescription' => $this->shortDescription,
            'longDescription' => $this->longDescription,
            'accessibleInfo' => $this->accessibleInfo,
            'accessibleTransit' => $this->accessibleTransit,
            'accessibleParking' => $this->accessibleParking,
            'accessibleFind' => $this->accessibleFind,
            'features' => $this->features,
            'team' => $this->team,
            'time' => $this->time,
            'wards' => $this->wards,
            'initiatives' => $this->initiatives,
            'cityID' => (int) $this->page->getCollectionParentID(),
            'themes' => (array) $this->themes,
            'accessibles' => (array) $this->accessibles,
            'mirrors' => [
                'eventbrite' => $this->page->getAttribute('eventbrite') ?: null
            ],
            'published' => $this->published,
        ];
        // Load the thumbnail array
        $walkData['images'] = [];
        if ($this->thumbnail) {
            $walkData['thumbnailId'] = $this->thumbnail->getFileID();
            $walkData['thumbnailUrl'] = $im->getThumbnail($this->thumbnail, 1024, 1024)->src;
            $walkData['images'][] = [
                'id' => $this->thumbnail->getFileID(),
                'url' => $im->getThumbnail($this->thumbnail, 1024, 1024)->src
            ];
        }

        // Clean out the null values
        return array_filter($walkData);
    }

    /*
     * kmlSerialize
     *
     * Not auto-run by anything, but builds google-maps-friendly KML
     *
     * @return DOMDocument
     */
    public function kmlSerialize(): DOMDocument
    {
        $fh = new FileHelper();
        // Creates the Document.
        $doc = new DOMDocument();

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
        if ($coorStr) {
            $map->appendChild($doc->createElement('route', $coorStr));
        }

        $xsltp = new XSLTProcessor;
        $xsltp->importStyleSheet(DOMDocument::load(DIR_BASE . '/elements/templates/kmlmap.xsl'));

        // Apply stylesheet and return
        return $xsltp->transformToDoc($doc);
    }

    /**
     * Returns a page object for this walk. Keeping $page protected as we may want some logic around this later
     *
     * @return Page
     */
    public function getPage(): Page
    {
        return $this->page;
    }

    /**
     * Looks up the timezone for this walk.
     *
     * @return string Time zone abbreviation
     */
    public function getTimezone(): string
    {
        // TODO: Grab the timezone by checking the 'timezone' attribute recursively
        return 'EST';
    }
}
