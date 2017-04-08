<?php
use \JanesWalk\Models\PageTypes\Walk as Walk;
use \JanesWalk\Libraries\MirrorWalk\MirrorWalk;
use \JanesWalk\Controllers\JanesWalk as Controller;

use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\ImageHelper;

class WalkPageTypeController extends Controller
{
    /**
     * @type Walk $walk The Walk model
     */
    protected $walk;

    public function on_start()
    {
        $this->walk = new Walk($this->c);

        /* Ideally this should be in a router, not the individual on_start.
         * c5.7 uses symfony2 for routing
         * TODO: wait for 5.7.
         */
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'POST':
                // Directly stream our JSON in.
                $this->update(file_get_contents('php://input'));
                break;
            case 'PUT':
                $this->create(file_get_contents('php://input'));
                break;
            case 'GET':
                $this->show();
                break;
            case 'DELETE':
                $this->destroy();
                break;
        }
    }

    protected static function addMetaTags(array $tags = [], DOMDocument &$doc)
    {
        foreach ($tags as $k => $v) {
            $meta = $doc->appendChild($doc->createElement('meta'));
            $meta->setAttribute('property', $k);
            $meta->setAttribute('content', $v);
        }
    }

    protected static function buildPageMap(Walk $walk): string
    {
        $im = Loader::helper('image');
        $leaders = join(array_map(function ($leader) {
            return trim("{$leader['name-first']} {$leader['name-last']}");
        }, (array) $walk->team), ', ');

        if (count($walk->time['slots'])) {
            $time = $walk->time['slots'][0][0];
        } else {
            $time = time();
        }

        $date = date('F d, Y', $time);

        $thumbnail = $im->getThumbnail($walk->thumbnail, 1024, 1024)->src;

        return <<< EOT
<!--
<PageMap>
    <DataObject type="document">
        <Attribute name="title">{$walk}</Attribute>
        <Attribute name="author">{$leaders}</Attribute>
        <Attribute name="description">{$walk->shortDescription} {$walk->longDescription}</Attribute>
        <Attribute name="date">{$date}</Attribute>
    </DataObject>
    <DataObject type="thumbnail">
        <Attribute name="src" value="{$thumbnail}" />
    </DataObject>
</PageMap>
-->
EOT;
    }

    protected static function buildTwitterSummary(Walk $walk): string
    {
          $im = Loader::helper('image');
          $thumbnail = $im->getThumbnail($walk->thumbnail, 1024, 1024)->src;

          return <<< EOT
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@janeswalk" />
<meta name="twitter:title" content="{$walk}" />
<meta name="twitter:description" content="{$walk->shortDescription}" />
<meta name="twitter:image" content="{$thumbnail}" />
EOT;
    }

    /**
     * Render the page as json only
     */
    public function json()
    {
        header('Content-Type: application/vnd.geo+json');
        header('Content-Disposition: attachment; filename="' . $this->walk . '.geojson"');
        header("Access-Control-Allow-Origin: *");
        echo $this->getJson();
        exit;
    }

    /**
     * Render the KML for this walk's map
     */
    public function kml()
    {
        header('Content-Type: application/vnd.google-earth.kml+xml');
        $this->getKml()->save('php://output');
        exit;
    }

    /**
     * show
     * Render view contents. Fall-through behaviour renders theme as HTML via
     * view(). If 'format' is set, render in requested format.
     * TODO: Replace with symfony routes in 5.7; this should be view logic, not controller
     */
    protected function show()
    {
        if ($_GET['format'] === 'json') {
            // Render JSON
            header('Content-Type: application/json');
            echo $this->getJson();
            exit;
        } elseif ($_GET['format'] === 'kml') {
            // Render KML of map only
            header('Content-Type: application/vnd.google-earth.kml+xml');
            $this->getKml()->save('php://output');
            exit;
        }
    }

    /**
     * create
     * Saves a version of Walk collection, and makes it live
     *
     * @param string $json String-encoded JSON of walk
     */
    protected function create(string $json)
    {
        $nh = new NavigationHelper();
        header('Content-Type: application/json');
        try {
            // Send requests to all walk-mirroring services
            if (false) {
                $mw = new MirrorWalk($this->walk);
                $mw->mirrorStart();
            }

            // Save the walk
            $cID = $this->walk->getPage()->getCollectionID();
            $cvID = $this->setJson(json_decode($json, true), true);

            echo json_encode([
                'cID' => $cID,
                'cvID' => $cvID,
                'url' => $nh->getLinkToCollection(Page::getByID($cID))
            ]);

            // Wait until walk-mirrroring blocking code completes
            if (false) {
                $mw->mirrorEnd();
            }
        } catch (Exception $e) {
            Log::addEntry('Walk error on walk ' . __FUNCTION__ . ': ', $e->getMessage());
            echo json_encode([
                'cID' => $this->walk->getPage()->getCollectionID(),
                'error' => true,
                'action' => __FUNCTION__,
                'msg' => (string) $e->getMessage()
            ]);
            http_response_code(500);
        }
        exit;
    }

    /**
     * update
     * Saves a version of the walk collection, but doesn't approve version
     *
     * @param string $json String-encoded JSON of walk
     */
    protected function update(string $json)
    {
        header('Content-Type: application/json');
        try {
            $cvID = $this->setJson(json_decode($json, true));

            // Set the eventbrite
            // FIXME: switch MirrorWalk to guzzle and call with that
            // $mw = new MirrorWalk($this->walk);
            // $mw->mirrorStart();

            echo json_encode([
                'cID' => $this->walk->getPage()->getCollectionID(),
                'cvID' => $cvID
            ]);

            // $mw->mirrorEnd();
        } catch (Exception $e) {
            Log::addEntry('Walk error on walk ' . __FUNCTION__ . ': ', $e->getMessage());
            echo json_encode([
                'cID' => $this->walk->getPage()->getCollectionID(),
                'error' => true,
                'action' => __FUNCTION__,
                'msg' => (string) $e->getMessage()
            ]);
            http_response_code(500);
        }
        exit;
    }

    /*
     * destroy
     * Simply unpublishes the walk
     */
    protected function destroy()
    {
        header('Content-Type: application/json');

        $cp = new Permissions($this->walk->getPage());
        if ($cp->canEditPageContents()) {
            $this->c->setAttribute('exclude_page_list', true);

            // TODO: Update the MirrorWalk to unpublish
            echo json_encode([
                'id' => $this->walk->getPage()->getCollectionID(),
                'message' => 'Walk set to draft.',
                'error' => false,
            ]);
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Insufficient permissions.',
            ]);
        }
        exit;
    }

    /**
     * getJson
     * TODO: Replace with view logic on 5.7
     * TODO: put similar caching logic to the city page in here. Low priority,
     * as these pages render fast.
     *
     * @return string of walk's json
     */
    protected function getJson(): string
    {
        return json_encode($this->walk);
    }

    /**
     * setJson
     * Creates a new walk page version based on a json string
     *
     * @param $payload array
     * @param $public bool
     * @return int cvID of new collection version
     */
    protected function setJson(array $payload, bool $publish = false): int
    {
        // Check for permissions first
        $cp = new Permissions($this->walk->getPage());
        if (!$cp->canEditPageContents()) {
            Log::addEntry(json_encode($payload), 'Walk permissions ' . ($publish ? 'post' : 'update'));

            echo json_encode([
                'error' => 'You do not have permission to edit this walk.',
                'cID' => $this->c->getCollectionID(),
            ]);

            http_response_code(403);
            die;
        }

        $currentCollectionVersion = $this->walk->getPage()->getVersionObject();
        $newCollectionVersion = $currentCollectionVersion->createNew('Updated via walk form');
        $this->walk->getPage()->loadVersionObject($newCollectionVersion->getVersionID());

        /* Set the model by the json envelope */
        $this->walk->setJson($payload);

        /* We use 'exclude_page_list' to 'unpublish' walks */
        if ($publish) {
            $c = $this->getCollectionObject();
            $c->setAttribute('exclude_page_list', false);
        }

        // We'll "approve" all new versions, because a walk's either live or not
        $newCollectionVersion->approve();

        return (int) $newCollectionVersion->getVersionID();
    }

    /**
     * getKml()
     * TODO: Replace with view logic on 5.7
     *
     * @return DOMDocument of KML map for walk
     */
    protected function getKml(): DOMDocument
    {
        return $this->walk->kmlSerialize();
    }

    public function view()
    {
        parent::view();
        $nh = new NavigationHelper();
        $im = new ImageHelper();
        $c = $this->getCollectionObject();

        // Put the preview image for Facebook/Twitter to pick up
        $doc = new DOMDocument();
        $thumb = $c->getAttribute('thumbnail');
        if ($thumb) {
            self::addMetaTags(
                [
                    'og:image' => (BASE_URL . $im->getThumbnail($thumb, 340, 720)->src)
                ],
                $doc
            );
            $this->set('thumb', $thumb);
        }
        self::addMetaTags(
            [
                'og:url' => $nh->getCollectionURL($c),
                'og:title' => $c->getCollectionName(),
                'og:description' => $c->getAttribute('shortdescription'),
                'Description' => $c->getAttribute('shortdescription'),
            ],
            $doc
        );

        $this->addHeaderItem($doc->saveHTML());
        $this->addHeaderItem(self::buildPageMap($this->walk));
        $this->addHeaderItem(self::buildTwitterSummary($this->walk));
        $this->addHeaderItem('<script type="application/ld+json">' . json_encode($this->ldJson()) . '</script>');
        // Check edit permissions
        $cp = new Permissions($this->walk->getPage());
        $this->set('canEdit', $cp->canEditPageContents());

        /* Helpers to use in the view */
        $this->set('pageDescription', $c->getAttribute('shortDescription'));
        $this->set('im', $im);
        $this->set('th', Loader::helper('theme'));
        $this->set('eid', $c->getAttribute('eventbrite'));
        $this->set('w', $this->walk);

        // Body variables
        $this->bodyData['classes'][] = 'walk-page';
        $this->bodyData['classes'][] = 'active-walk';
        $this->bodyData['pageViewName'] = 'WalkPageView';
        $this->set('bodyData', $this->bodyData);
    }

    /**
     * Controller only action to transfer a walk to a different uid
     *
     * TODO: on 5.7, we have good routing with symfony. Get rid of these c5
     * convention endpoints, e.g. 'transfer', and use all restful routes as above
     */
    public function transfer(string $uid)
    {
        $c = $this->getCollectionObject();
        $p = new Permissions($c);
        if ($p->canWrite()) {
            $c->update(['uID' => $uid]);
            echo json_encode([
                'error' => null,
                'cID' => $c->getCollectionID(),
                'uID' => $uid
            ]);
        } else {
            echo json_encode([
                'error' => 'Cannot transfer walk: insufficient permissions'
            ]);
        }
        // Lazy way to make this a service endpoint
        exit;
    }

    /**
     * Observes the updates of walk pages, to clear its cache
     */
    public function on_page_update(Page $self)
    {
        // Clear out the parent cache entry
        $parent = Page::getByID($self->getCollectionParentID());
        Cache::delete('page_' . $parent->getCollectionTypeHandle(), $parent->getCollectionId());
        // Clear out the parent full-page cache
        $pageCache = PageCache::getLibrary();
        $pageCache->purge($parent);
    }

    public function ldJson()
    {
        $nh = new NavigationHelper();
        $im = Loader::helper('image');

        $leaders = join(array_map(function ($leader) {
            return trim("{$leader['name-first']} {$leader['name-last']}");
        }, (array) $walk->team), ', ');

        if (count($walk->time['slots'])) {
            list($start, $end) = $walk->time['slots'][0];
        } else {
            $start = time();
            $end = time();
        }

        $thumbnail = $im->getThumbnail($walk->thumbnail, 1024, 1024)->src;

        $ld = [
            '@context' => 'http://schema.org',
            '@type' => 'Event',
            'name' => (string) $this->walk,
            'image' => $thumbnail,
            'startDate' => date('c', $start),
            'endDate' => date('c', $end),
            'description' => $this->walk->shortDescription,
            'url' => $nh->getCollectionURL($this->c),
        ];

        list($meeting) = $this->walk->features;
        if ($meeting) {
            list($lng, $lat) = $meeting['geometry']['coordinates'];
            $ld['location'] = [
                '@type' => 'Place',
                'geo' => [
                    '@type' => 'GeoCoordinates',
                    'latitude' => (string) $lng,
                    'longitude' => (string) $lat,
                ],
                'name' => t('Meeting Place'),
                'address' => $meeting['properties']['title'] . ' ' . $meeting['properties']['description'],
            ];
        }

        return $ld;
    }
}
