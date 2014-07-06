<?php 
defined('C5_EXECUTE') or die("Access Denied.");

Loader::helper('theme');
class PageListBlockController extends Concrete5_Controller_Block_PageList {
  // Data for returning in JSON
  protected $pageData = array();

  public function getPageList() {
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

    switch($row['orderBy']) {
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

  public function view() {
    parent::view();
    $this->set('im', Loader::helper('image'));
    $this->set('u', new User());
    $this->set('rssUrl', $showRss ? $controller->getRssUrl($b) : '');
    $this->set('show', $_REQUEST['show']);
    /* Set the page lists which are walk related, as they have json we need */
    switch($this->block->getBlockFilename()) {
    case 'walkcards':
      $this->set('cards', $this->loadCards());
      break;
    case 'walk_filters':
      $cards = $this->loadCards();
      $this->set('cards', $cards);

      foreach($cards as $walk) {
        foreach(array_slice($walk['datetimes'], 1) as $dt) {
          $walk['datetimes'][0] = $dt;
          $cards[] = $walk;
        }
      }
      usort($cards, function($b,$a) {
        if($a['datetimes'][0] && $b['datetimes'][0]) {
          return $a['datetimes'][0]['timestamp'] - $b['datetimes'][0]['timestamp'];
        } else {
          if($a['datetimes'][0]) {
            return -1;
          } else if($b['datetimes'][0]) {
            return 1;
          }
          return 0;
        }
      } );

      /* Load the lat/lng for the city we're displaying */ 
      /* Note: this must change if this block is used on a non-city page, to instead use cParentID */
      $latlng = explode(',',Page::getCurrentPage()->getAttribute('latlng'));
      if(count($latlng) === 2) {
        $this->set('lat', $latlng[0]);
        $this->set('lng', $latlng[1]);
      }

      $this->set('walksByDate', $cards);
    default:
      break;
    }

    // Set walk-filter specific filtering data
    if($this->block->getBlockFilename() === 'walk_filters') {
      // Set up walk filters
      // Wards
      $wards = array();
      $wardObjects = $this->c->getAttribute('city_wards');
      if ($wardObjects !== false) {
        foreach ($wardObjects->getOptions() as $ward) {
          $val = $ward->value;
          $wards[] = $val;
        }
      }
      natcasesort($wards);

      // Themes
      $themeHelper = Loader::helper('theme');
      $themes = $themeHelper->getAll('tags');
      sort($themes);

      // Accessibility
      $accessibilities = $themeHelper->getAll('accessibilities');
      sort($accessibilities);

      // Intiatives
      if ($this->c->getCollectionName() === 'Toronto') {
        $initiatives = array();
        $ak = CollectionAttributeKey::getByHandle('walk_initiatives');
        $satc = new SelectAttributeTypeController(AttributeType::getByHandle('select'));
        if($ak) {
          $satc->setAttributeKey($ak);
          foreach($satc->getOptions() as $option) {
            $initiatives[] = $option->value;
          }
        }
      }

      // Ward semantics
      $wardName = 'Region';
      if ($this->c->getCollectionName() === 'Toronto') {
        $wardName = 'Ward';
      }

      // Dates
      $dates = array('May 1, 2014', 'May 2, 2014', 'May 3, 2014', 'May 4, 2014');

      /* Set variables needed for rendering show all walks */
      $this->set('dates', $dates);
      $this->set('wardName', $wardName);
      $this->set('initiatives', $initiatives);
      $this->set('accessibilities', $accessibilities);
      $this->set('themes', $themes);
      $this->set('wards', $wards);
    }
  }

  /* renderCards()
   *
   * Renders an HTML string of a walk card. site5 isn't making installing xhp easy,
   * so post-festival, update this to return an XHP and move to rackspace/amazon
   *
   * array $cards - Contents formatted by loadCards.
   * return: DOMDocument 
   */
  public function renderCards(Array $cards = array()) {
    $nh = Loader::helper('navigation');
    
    // A bit of a hack, but way cleaner than the URL parameter passing that was happening before.
    // The 'show all walks' only appears if you have more than 9 walks, so this tells us we must
    // be showing all walks.
    $cardSize = 'span' . (sizeof($cards) > 9 ? 3 : 4);

    // Using DOMDocument, mostly for sanity of HTML and security
    $doc = new DOMDocument;
    // Loop over the walks
    foreach((array) $cards as $key => $card) {
      extract($card);
      $div = $doc->appendChild($doc->createElement('div'));
      $div->setAttribute('class', $cardSize . ' walk');

      $a = $div->appendChild($doc->createElement('a'));
      $a->setAttribute('href', $nh->getLinkToCollection($page));

      $thumbnail = $a->appendChild($doc->createElement('div'));
      $thumbnail->setAttribute('class', 'thumbnail');

      $image = $thumbnail->appendChild($doc->createElement('div'));
      $image->setAttribute('class', 'walkimage ' . $placeholder);
      if($cardBg)
        $image->setAttribute('style', 'background-image:url(' . $cardBg . ')');

      $caption = $thumbnail->appendChild($doc->createElement('div'));
      $caption->setAttribute('class', 'caption');

      $caption->appendChild($doc->createElement('h4'))->appendChild($doc->createTextNode( Loader::helper('text')->shortText($page->getCollectionName(), 45)));

      $ul = $caption->appendChild($doc->createElement('ul'));
      $ul->setAttribute('class', 'when');

      foreach($when as $slot) {
        $li = $ul->appendChild($doc->createElement('li'));
        $li->appendChild($doc->createElement('i'))->setAttribute('class', 'icon-calendar');
        $li->appendChild($doc->createTextNode(' ' . $slot));
      }

      if($meeting_place) {
        $meetingText = Loader::helper('text')->shortText($meeting_place['title'] ?: $meeting_place['description']);
        $ul->appendChild($doc->createElement('li'))->appendChild($doc->createTextNode(t('Meet at') . ': ' . $meetingText));
      }
      if($leaders) {
        $caption->appendChild($doc->createElement('h6'))->appendChild($doc->createTextNode(t('Walk led by') . ' ' . Loader::helper('text')->shortText($leaders)));
      }
      $caption->appendChild($doc->createElement('p'))->appendChild($doc->createTextNode(Loader::helper('text')->shortText($page->getAttribute('shortdescription'), 115)));

      $tags = $thumbnail->appendChild($doc->createElement('ul'));
      $tags->setAttribute('class', 'inline tags');
      
      foreach($page->getAttribute('theme') as $theme) {
        $li = $tags->appendChild($doc->createElement('li'));
        $li->appendChild(ThemeHelper::getIconElement($theme, $doc));
        $li->setAttribute('class', 'tag');
        $li->setAttribute('data-toggle', 'tooltip');
        $li->setAttribute('title', ThemeHelper::getName($theme));
      }
    }
    return $doc;
  }

  /* getCardData()
   * Loads models needed for a walk card in the view
   * @input Page $page Extracts the walk data from this
   * @returns: array
   * ex. from view: extract($controller->getCardData());
   */
  public function getCardData($page) {
    $cardData['page'] = $page;

    $cardData['title'] = $page->getCollectionName();

    foreach(json_decode($page->getAttribute('team'),true) as $mem) {
      if($mem['role'] === 'walk-leader' || $mem['type'] === 'leader') {
        $fullName = trim($mem['name-first'] . ' ' . $mem['name-last']);
        if($fullName) {
          $cardData['leaders'] .= ($cardData['leaders'] ? ', ' : '') . $fullName;
        }
      }
    }
      
    // Wards
    $cardData['wards'] = (array) $page->getAttribute('walk_wards');

    // Themes
    $themes = array();
    foreach($page->getAttribute('theme') as $theme) {
      $themes[] = ThemeHelper::getName($theme);
    }
    $cardData['themes'] = $themes;

    // Accessibilities
    $accessibilities = array();
    foreach($page->getAttribute('accessible') as $accessibility) {
      $accessibilities[] = ThemeHelper::getName($accessibility);
    }
    $cardData['accessibilities'] = $accessibilities;

    // Initiatives
    $initiatives = array();
    $initiativeObjects = $page->getAttribute('walk_initiatives');
    if ($initiativeObjects !== false) {
      foreach ($initiativeObjects->getOptions() as $initiative) {
        $val = $initiative->value;
        $initiatives[] = $val;
      }
    }
    sort($initiatives);
    $cardData['initiatives'] = $initiatives;

    // Dates
    $scheduled = $page->getAttribute('scheduled');

    foreach((array) $scheduled['slots'] as $s) {
      $cardData['datetimes'][] = array('date' => $s['date'], 'time' => $s['time'], 'timestamp' => strtotime("{$s['date']} {$s['time']}"));
    }

    $cardData['when'] = array();
    if($scheduled['open']) {
      $cardData['when'][] = 'Open schedule';
    } else {
      foreach((array) $cardData['datetimes'] as $s) {
        $cardData['when'][] = "{$s['time']}, {$s['date']}";
      }
    }

    // Thumbnail
    $thumb = $page->getAttribute('thumbnail');
    $cardData['cardBg'] = $thumb ? $this->get('im')->getThumbnail($thumb,380,720)->src : null;
    $cardData['placeholder'] = 'placeholder' . $page->getCollectionID() % 3;

    // Meeting place
    $gmap = json_decode($page->getAttribute('gmap'),true);
    $cardData['meeting_place'] = null;
    foreach( (array) $gmap['markers'] as $marker) { // To avoid errors on empty/malformed maps
      $cardData['meeting_place'] = array('title' => $marker['title'], 'description' => $marker['description']);
      break; 
    }

    return $cardData;
  }

  /*
   * loadCards
   * Loop through and load all the cards
   */
  public function loadCards() {
    $cards = array();
    foreach((array) $this->get('pages') as $page) {
      $cards[] = $this->getCardData($page);
      $this->pageData[] = array(
        'wards' => $cd['wards'],
        'themes' => $cd['themes'],
        'accessibilities' => $cd['accessibilities'],
        'initiatives' => $cd['initiatives'],
        'datetimes' => $cd['datetimes']
      );
    }

    return $cards;
  }

  // The 'on_before_render' will set up our JanesWalk json in the page
  public function on_before_render() {
    if($this->block) {
      switch($this->block->getBlockFilename()) {
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
