<?php
use Concrete\Core\Legacy\PageList;
use Concrete\Core\Legacy\ImageHelper;
use Concrete\Core\Legacy\NavigationHelper;
use Concrete\Core\Legacy\ThemeHelper;
use Concrete\Core\Legacy\CollectionAttributeKey;
use Qaribou\Collection\ImmArray;
use JanesWalk\Models\PageTypes\Walk;

class PageListBlockController extends Concrete5_Controller_Block_PageList
{
    public function getPageList(): PageList
    {
        $db = Loader::db();
        $bID = $this->bID;
        if ($this->bID) {
            $q = 'select num, cParentID, cThis, orderBy, ctID, displayAliases, rss, filterUser, filterUserBlackList from btPageList where bID = \'' . $bID . '\'';
            $r = $db->query($q);
            if ($r) {
                $row = $r->fetchRow();
            }
        } else {
            $row = array_intersect_key(
                $this,
                array_flip(['num', 'cParentID', 'cThis', 'orderBy', 'ctID', 'rss', 'displayAliases', 'filterUser', 'filterUserBlackList'])
            );
        }

        $pl = new PageList();
        $pl->setNameSpace('b' . $this->bID);

        $pl = $this->applyOrder($pl, $row['orderBy']);
        $pl = $this->applyFilterUser($pl, explode(',', $row['filterUser']), (bool) $row['filterUserBlackList']);

        $num = (int) $row['num'];

        $pl->setItemsPerPage($num);

        $c = Page::getCurrentPage();
        if (is_object($c)) {
            $this->cID = $c->getCollectionID();
        }

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

    protected function applyOrder(PageList $pl, string $orderBy): PageList
    {
        switch ($orderBy) {
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

        return $pl;
    }

    protected function applyFilterUser(PageList $pl, array $users, bool $blacklist = false): PageList
    {
        $compare = $blacklist ? '!=' : '=';

        foreach ($users as $user) {
            $ui = UserInfo::getByEmail($user);
            if ($ui) {
                $pl->filter('p1.uID', $ui->getUserID(), $compare);
            }
        }

        return $pl;
    }

    public function view()
    {
        $c = Page::getCurrentPage();
        parent::view();
        $this->set('im', new ImageHelper());
        $this->set('u', new User());
        $this->set('rssUrl', $showRss ? $controller->getRssUrl($b) : '');
        $this->set('show', $_REQUEST['show']);
        /* Set the page lists which are walk related, as they have json we need */
        switch ($this->block->getBlockFilename()) {
            case 'walkcards':
                $this->set('cards', $this->loadCards());
                break;
            case 'walk_filters':
                $nh = new NavigationHelper();
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
     * @return ImmArray<Page> card data for each card
     */
    public function loadCards(): ImmArray
    {
        return ImmArray::fromArray((array) $this->get('pages'))->map(function (Page $page) {
            return new Walk($page);
        });
    }

    public function save(array $args)
    {
        // Add the 'filter by user' to the saved args
        $args['filterUser'] = (string) $args['filterUser'];
        $args['filterUserBlackList'] = $args['filterUserBlackList'] ? 1 : 0;
        parent::save($args);
    }

}
