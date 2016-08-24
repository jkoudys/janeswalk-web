<?php
use \Qaribou\Collection\ImmArray;
use \JanesWalk\Models\PageTypes\Walk;

class PageListBlockController extends Concrete5_Controller_Block_PageList
{
    public function getPageList()
    {
        Loader::model('page_list');
        $db = Loader::db();
        $bID = $this->bID;
        if ($this->bID) {
            $q = 'select num, cParentID, cThis, orderBy, ctID, displayAliases, rss from btPageList where bID = \'' . $bID . '\'';
            $r = $db->query($q);
            if ($r) {
                $row = $r->fetchRow();
            }
        } else {
            $row = array_intersect_key(
                $this,
                array_flip(['num', 'cParentID', 'cThis', 'orderBy', 'ctID', 'rss', 'displayAliases'])
            );
        }

        $pl = new PageList();
        $pl->setNameSpace('b' . $this->bID);

        $cArray = [];

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

        if (intval($row['cParentID']) != 0) {
            $cParentID = ($row['cThis']) ? $this->cID : $row['cParentID'];
            if ($this->includeAllDescendents) {
                $pl->filterByPath(Page::getByID($cParentID)->getCollectionPath());
            } else {
                $pl->filterByParentID($cParentID);
            }
        }

        return $pl;
    }

    public function view()
    {
        $c = Page::getCurrentPage();
        parent::view();
        $this->set('im', Loader::helper('image'));
        $this->set('u', new User());
        $this->set('rssUrl', $showRss ? $controller->getRssUrl($b) : '');
        $this->set('show', $_REQUEST['show']);
        /* Set the page lists which are walk related, as they have json we need */
        switch ($this->block->getBlockFilename()) {
            case 'walkcards':
                $this->set('cards', $this->loadCards());
                break;
            case 'walk_filters':
                Loader::helper('theme');
                $nh = Loader::helper('navigation');
                $cards = $this->loadCards();
                $cities = [];

                // See what cities we have to show
                foreach ($cards as $walk) {
                    if (!isset($cities[$walk->getPage()->getCollectionParentID()])) {
                        $parent = Page::getByID($walk->getPage()->getCollectionParentID());
                        $cities[$parent->getCollectionID()] = $parent->getCollectionName();
                    }
                }
                asort($cities);

                // Set up walk filters
                // Wards
                $wards = [];
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

                // Initiatives
                $initiatives = [];
                if (strpos($c->getCollectionPath(), 'burlington') !== false) {
                    $initAttr = $c->getAttribute('walk_initiatives');
                    if ($initAttr) {
                        foreach ($c->getAttribute('walk_initiatives') as $initiative) {
                            $initiatives[$initiative->ID] = $initiative->value;
                        }
                        unset($initiative);
                    }
                }

                // Ward semantics
                $wardName = 'Region';
                if ($c->getCollectionName() === 'Toronto') {
                    $wardName = 'Ward';
                }

                /* Set variables needed for rendering show all walks */
                $this->set('cards', $cards);
                $this->set('wardName', $wardName);
                $this->set('initiatives', $initiatives);
                $this->set('accessibilities', $accessibilities);
                $this->set('themes', $themes);
                $this->set('wards', $wards);
                $this->set('cities', $cities);
                break;
        }
    }

    /*
     * loadCards
     * Loop through and load all the cards
     *
     * @return Array<Page> card data for each card
     */
    public function loadCards()
    {
        return array_map(
            function ($page) {
                return new Walk($page);
            },
            (array) $this->get('pages')
        );
    }
}
