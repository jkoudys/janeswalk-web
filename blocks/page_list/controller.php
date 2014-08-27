<?php
defined('C5_EXECUTE') or die("Access Denied.");

use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Controllers\DOMableInterface;

require_once(DIR_BASE . '/controllers/DOMableInterface.php');

Loader::helper('theme');
Loader::model('page_types/Walk');
class PageListBlockController extends Concrete5_Controller_Block_PageList implements DOMableInterface
{
    // Data for returning in JSON
    protected $pageData = array();

    public function getPageList()
    {
        Loader::model('page_list');
        $db = Loader::db();
        $bID = $this->bID;
        if ($this->bID) {
            $q = "select num, cParentID, cThis, orderBy, ctID, displayAliases, rss from btPageList where bID = '$bID'";
            $r = $db->query($q);
            if ($r) {
                $row = $r->fetchRow();
            }
        } else {
            $row['num'] = $this->num;
            $row['cParentID'] = $this->cParentID;
            $row['cThis'] = $this->cThis;
            $row['orderBy'] = $this->orderBy;
            $row['ctID'] = $this->ctID;
            $row['rss'] = $this->rss;
            $row['displayAliases'] = $this->displayAliases;
        }

        $pl = new PageList;
        $pl->setNameSpace('b' . $this->bID);

        $cArray = array();

        switch ($row['orderBy']) {
        case 'display_asc':
            $pl->sortByDisplayOrder();
            break;
        case 'display_desc':
            $pl->sortByDisplayOrderDescending();
            break;
        case 'chrono_asc':
            $pl->sortByPublicDate();
            break;
        case 'alpha_asc':
            $pl->sortByName();
            break;
        case 'alpha_desc':
            $pl->sortByNameDescending();
            break;
        case 'random':
            $pl->sortBy('RAND()');
            break;
        default:
            $pl->sortByPublicDateDescending();
            break;
        }

        $num = (int) $row['num'];

        $pl->setItemsPerPage($num);

        $c = Page::getCurrentPage();
        if (is_object($c)) {
            $this->cID = $c->getCollectionID();
        }

        Loader::model('attribute/categories/collection');
        if ((int) $this->displayFeaturedOnly === 1) {
            $cak = CollectionAttributeKey::getByHandle('is_featured');
            if (is_object($cak)) {
                $pl->filterByIsFeatured(1);
            }
        }
        if (!$row['displayAliases']) {
            $pl->filterByIsAlias(0);
        }
        $pl->filter('cvName', '', '!=');

        if ($row['ctID']) {
            $pl->filterByCollectionTypeID($row['ctID']);
        }

        $columns = $db->MetaColumns(CollectionAttributeKey::getIndexedSearchTable());
        if (isset($columns['AK_EXCLUDE_PAGE_LIST'])) {
            $pl->filter(false, '(ak_exclude_page_list = 0 or ak_exclude_page_list is null)');
        }

        if ( intval($row['cParentID']) != 0) {
            $cParentID = ($row['cThis']) ? $this->cID : $row['cParentID'];
            if ($this->includeAllDescendents) {
                $pl->filterByPath(Page::getByID($cParentID)->getCollectionPath());
            } else {
                $pl->filterByParentID($cParentID);
            }
        }

        return $pl;
    }


    public function buildXML($template = '')
    {
        $doc = $this->block->getDOMDocument();
        if (!$doc) {
            $doc = new DOMDocument;
            $this->block->initDOM($this->block->getBlockAreaObject());
            $doc = $this->block->getDOMDocument();
        }

        $template = $template ?: $this->block->getBlockFilename();
        switch ($template) {
        case 'walkcards':
            $this->renderCards($this->block);
            DOMHelper::includeXSL($this->block, __DIR__ . '/templates/' . $template . '/view.xsl');
            break;
        case 'walk_filters':
            $this->renderCards($this->block);
            DOMHelper::includeXSL($this->block, __DIR__ . '/templates/' . $template . '/view.xsl');
            break;
        default:
            return null;
        }

        return $this->block;
    }

    public function view()
    {
        $c = Page::getCurrentPage();
        parent::view();

        /* Set the page lists which are walk related, as they have json we need */
        // TODO: when xsl available, we should return the domdoc, not the rendered html
        $doc = new DOMDocument;
        $area = $this->block->getBlockAreaObject();

        //      echo 'XXX' . __CLASS__ . '::' . __FUNCTION__ .  spl_object_hash(Page::getCurrentPage());
        // Set the DOM of the block under its area
        $this->block->initDOM($area); 
        $blockName = $this->block->getBlockFilename();
        switch ($blockName) {
        case 'walkcards':
            $xsl = DOMDocument::load(__DIR__ . '/templates/' . $blockName . '/view.xsl');
            $this->renderCards($block);
            break;
        case 'walk_filters':
            // Load our stylesheet
            $xsl = DOMDocument::load(__DIR__ . '/templates/' . $blockName . '/view.xsl');
            // Add all our walk cards below this block
            $this->renderCards($block);

            /* Load the lat/lng for the city we're displaying */
            /* Note: this must change if this block is used on a non-city page, to instead use cParentID */
            $latlng = explode(',', $c->getAttribute('latlng'));
            if (count($latlng) === 2) {
                $map = $block->appendChild($doc->createElement('Map'));
                $map->setAttribute('lat', $latlng[0]);
                $map->setAttribute('lng', $latlng[1]);
            }

            // Render out the HTML for the walk filters
            $xslt->importStylesheet($xsl);
            $xslt->transformToDoc($doc)->saveHTMLFile('php://output');
        default:
            break;
        }

        // Set walk-filter specific filtering data
        if ($this->block->getBlockFilename() === 'walk_filters') {
            // Set up walk filters
            // Wards
            $wards = array();
            $wardObjects = $c->getAttribute('city_wards');
            if ($wardObjects !== false) {
                foreach ($wardObjects->getOptions() as $ward) {
                    $val = $ward->value;
                    $wards[] = $val;
                }
            }
            natcasesort($wards);

            // Themes
            $themes = ThemeHelper::getAll('themes');
            asort($themes);

            // Accessibility
            $accessibilities = ThemeHelper::getAll('accessibilities');
            asort($accessibilities);

            // Intiatives
            if ($c->getCollectionName() === 'Toronto') {
                $initiatives = array();
                $ak = CollectionAttributeKey::getByHandle('walk_initiatives');
                $satc = new SelectAttributeTypeController(AttributeType::getByHandle('select'));
                if ($ak) {
                    $satc->setAttributeKey($ak);
                    foreach ($satc->getOptions() as $option) {
                        $initiatives[] = $option->value;
                    }
                }
            }

            // Ward semantics
            $wardName = 'Region';
            if ($c->getCollectionName() === 'Toronto') {
                $wardName = 'Ward';
            }

            // Dates
            $dates = array('May 1, 2014', 'May 2, 2014', 'May 3, 2014', 'May 4, 2014');

            /* Set variables needed for rendering show all walks */
            $this->set('wardName', $wardName);
            $this->set('initiatives', $initiatives);
            $this->set('accessibilities', $accessibilities);
            $this->set('wards', $wards);
        }
    }

    /* renderCards()
     *
     * Renders a DOMDocument containing the walk cards XML tree.
     *
     * DOMNode $parent the node to add our <Walk> elements under
     * return: DOMDocument
     */
    public function renderCards(DOMNode &$parent)
    {
        $nh = Loader::helper('navigation');
        $im = Loader::helper('image');

        // Grab the doc we're inserting into
        $doc = $parent->ownerDocument;

        // Loop over the walks
        foreach ((array) $this->get('pages') as $page) {
            $walk = new Walk($page);

            $w = $parent->appendChild($doc->createElement('Walk'));
            $w->setAttribute('href', $nh->getLinkToCollection($page));
            $w->setAttribute('cid', $page->getCollectionID());

            if($walk->thumbnail) {
                $w->setAttribute('src', $im->getThumbnail($walk->thumbnail, 340,720)->src);
            }

            $w->appendChild($doc->createElement('Title'))->
                appendChild($doc->createTextNode((string) $walk));

            $w->appendChild($doc->createElement('ShortDescription'))->
                appendChild($doc->createTextNode($walk->shortdescription));

            foreach ($walk->datetimes as $slot) {
                $dt = $w->appendChild($doc->createElement('dateTime'));
                $dt->setAttribute('date', $slot['date']);
                $dt->setAttribute('time', $slot['time']);
            }

            /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
            if ($walk->meetingPlace) {
                $w->appendChild($doc->createElement('MeetingPlace'))->
                    appendChild($doc->createTextNode(
                        Loader::helper('text')->shortText($walk->meetingPlace['title'] ?: $walk->meetingPlace['description'])
                    ));
            }

            foreach ((array) $walk->walkLeaders as $walkLeader) {
                $w->appendChild($doc->createElement('Leader'))->
                    appendChild($doc->createTextNode(trim($walkLeader['name-first'] . ' ' . $walkLeader['name-last'])));
            }

            foreach ($walk->themes as $theme => $set) {
                $w->appendChild($doc->createElement('Theme'))->setAttribute('name', $theme);
            }
        }

        return $doc;
    }

    // The 'on_before_render' will set up our JanesWalk json in the page
    public function on_before_render()
    {
        if ($this->block) {
            switch ($this->block->getBlockFilename()) {
            case 'walkcards':
            case 'walk_filters':
                $this->addFooterItem('<script type="text/javascript">JanesWalk = JanesWalk || {}; JanesWalk.walks = ' . json_encode($this->pageData) . '</script>');
                break;
            default:
                break;
            }
        }
    }
}
