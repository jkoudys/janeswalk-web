<?php
use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Controllers\Controller;
use \JanesWalk\Libraries\MirrorWalk\MirrorWalk;

Loader::library('Eventbrite');
Loader::controller('/janes_walk');
Loader::model('page_types/Walk');
Loader::library('MirrorWalk/MirrorWalk');

function addMetaTags($tags = [], &$doc) {
    foreach ($tags as $k => $v) {
        $meta = $doc->appendChild($doc->createElement('meta'));
        $meta->setAttribute('property', $k);
        $meta->setAttribute('content', $v);
    }
}

function buildPageMap(Walk $walk) {
    $im = Loader::helper('image');

    $leaders = join( array_map(
        function($leader) {
            return trim("{$leader['name-first']} {$leader['name-last']}");
        },
        $walk->team
    ), ', ');

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

    /**
     * Render the page as json only
     */
    public function json()
    {
        header('Content-Type: application/json');
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
    public function show()
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
    public function create($json)
    {
        $nh = Loader::helper('navigation');
        header('Content-Type: application/json');
        try {
            // Send requests to all walk-mirroring services
            if (false) {
                $mw = new MirrorWalk($this->walk);
                $mw->mirrorStart();
            }

            // Save the walk
            $cID = $this->walk->getPage()->getCollectionID();
            $cvID = $this->setJson($json, true);

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
    public function update($json)
    {
        header('Content-Type: application/json');
        try {
            $cvID = $this->setJson($json);

            // Set the eventbrite
            $mw = new MirrorWalk($this->walk);
            $mw->mirrorStart();

            echo json_encode([
                'cID' => $this->walk->getPage()->getCollectionID(),
                'cvID' => $cvID
            ]);

            $mw->mirrorEnd();
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
    public function destroy()
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
    protected function getJson()
    {
        return json_encode($this->walk);
    }

    /**
     * setJson
     * Creates a new walk page version based on a json string
     *
     * @param $json String
     * @param $public bool
     * @return int cvID of new collection version
     */
    protected function setJson($json, $publish = false)
    {
        // Check for permissions first
        $cp = new Permissions($this->walk->getPage());
        if (!$cp->canEditPageContents()) {
            echo json_encode([
                'error' => 'You do not have permission to edit this walk.',
                'cID' => $this->c->getCollectionID(),
            ]);
            die;
        }

        $currentCollectionVersion = $this->walk->getPage()->getVersionObject();
        $newCollectionVersion = $currentCollectionVersion->createNew('Updated via walk form');
        $this->walk->getPage()->loadVersionObject($newCollectionVersion->getVersionID());

        /* Set the model by the json envelope */
        $this->walk->setJson($json);

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
    protected function getKml()
    {
        return $this->walk->kmlSerialize();
    }

    public function view()
    {
        parent::view();
        $nh = Loader::helper('navigation');
        $im = Loader::helper('image');
        $c = $this->getCollectionObject();

        // Put the preview image for Facebook/Twitter to pick up
        $doc = new DOMDocument();
        $thumb = $c->getAttribute('thumbnail');
        if ($thumb) {
            addMetaTags(
                [
                    'og:image' => (BASE_URL . $im->getThumbnail($thumb, 340, 720)->src)
                ],
                $doc
            );
            $this->set('thumb', $thumb);
        }
        addMetaTags(
            [
                'og:url' => $nh->getCollectionURL($c),
                'og:title' => $c->getCollectionName(),
                'og:description' => $c->getAttribute('shortdescription'),
                'description' => $c->getAttribute('shortdescription'),
            ],
            $doc
        );

        $this->addHeaderItem($doc->saveHTML());
        $this->addHeaderItem(buildPageMap($this->walk));

        // Check edit permissions
        $cp = new Permissions($this->walk->getPage());
        $this->set('canEdit', $cp->canEditPageContents());

        /* Helpers to use in the view */
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
    public function transfer($uid)
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
}
