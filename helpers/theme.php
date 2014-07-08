<?php 
/**
 * @package Helpers
 * @author Joshua Koudys <jkoudys@gmail.com>
 * @copyright  Copyright (c) 2013
 * @license    http://www.concrete5.org/license/     MIT License
 * Not quite true to its name, this helper is for modelling 'select' type attribute options, including theme and accessible
 */

defined('C5_EXECUTE') or die("Access Denied.");
class ThemeHelper { 
  private static $attributeIconMap = array(
    'nature-naturelover' => "bug",
    'nature-greenthumb' => "leaf",
    'nature-petlover' => "heart",
    'urban-suburbanexplorer' => "home",
    'urban-architecturalenthusiast' => "building",
    'urban-moversandshakers' => "truck",
    'culture-historybuff' => "archive",
    'culture-artist' => "picture",
    'culture-aesthete' => "pencil",
    'culture-bookworm' => "book",
    'culture-foodie' => "food",
    'culture-nightowl' => "glass",
    'culture-techie' => "gears",
    'culture-writer' => "edit",
    'civic-activist' => "bullhorn",
    'civic-truecitizen' => "flag-alt",
    'civic-goodneighbour' => "group",

    'urban-sports' => "trophy",
    'urban-play' => "puzzle-piece",
    'urban-water' => "tint",
    'urban-film' => "facetime-video",
    'urban-music' => "music",
    'civic-international' => "globe",
    'civic-military' => "fighter-jet",
    'civic-commerce' => "shopping-cart",
    'civic-religion' => "bell",
    'civic-health' => "medkit",
    'civic-nativeissues' => "sun",
    'civic-gender' => "unlock-alt"
  );

  private static $attributeNameMap = array(
    'nature-naturelover' => 'Nature',
    'nature-greenthumb' => 'Gardening',
    'nature-petlover' => 'Animals',
    'urban-suburbanexplorer' => 'Suburbs',
    'urban-architecturalenthusiast' => 'Architecture',
    'urban-moversandshakers' => 'Transportation',
    'culture-historybuff' => 'Heritage',
    'culture-artist' => 'Art',
    'culture-aesthete' => 'Design',
    'culture-bookworm' => 'Literature',
    'culture-foodie' => 'Food',
    'culture-nightowl' => 'Night Life',
    'culture-techie' => 'Technology',
    'culture-writer' => 'Storytelling',
    'civic-activist' => 'Activism',
    'civic-truecitizen' => 'Citizenry',
    'civic-goodneighbour' => 'Community',

    // 
    'urban-sports' => 'Sports',
    'urban-play' => 'Play',
    'urban-film' => 'Film',
    'urban-water' => 'Water',
    'urban-music' => 'Music',
    'civic-international' => 'International Issues',
    'civic-military' => 'Military',
    'civic-commerce' => 'Commerce',
    'civic-religion' => 'Religion',
    'civic-health' => 'Health',
    'civic-nativeissues' => 'Native Issues',
    'civic-gender' => 'Gender',

    // Accessibility
    'familyfriendly' => 'Family friendly',
    'wheelchair' => 'Wheelchair accessible',
    'dogs' => 'Dogs welcome',
    'strollers' => 'Strollers welcome',
    'bicycles' => 'Bicycles welcome',
    'steephills' => 'Steep hills',
    'uneven' => 'Uneven terrain',
    'busy' => 'Busy sidewalks',
    'bicyclesonly' => 'Bicycles only',
    'lowlight' => 'Low light or nighttime',// Does this work?
    'seniors' => 'Senior Friendly'
  );

  public static function getAll($type = 'all') {
    if ($type === 'all') {
      return self::$attributeNameMap;
    }
    if ($type === 'themes') {
      $themes = array();
      foreach (self::$attributeNameMap as $key => $theme) {
        if (preg_match('/\-/', $key)) {
          $themes[$key] = $theme;
        }
      }
      return $themes;
    }
    if ($type === 'accessibilities') {
      $accessibilities = array();
      foreach (self::$attributeNameMap as $key => $accessibility) {
        if (!preg_match('/\-/', $key)) {
          $accessibilities[$key] = $accessibility;
        }
      }
      return $accessibilities;
    }
  }

  /**
   * Looks up the list of options from the DB
   * This is the only place where themes are 'categorized', which is purely for presentation in the walk create form
   *
   * @param string $type Which type of tag to return (e.g. theme, accessible)
   * @return array
   */ 
  public function getSelectOptions($type = 'all') {
    $options = array(); 
    $satc = new SelectAttributeTypeController(AttributeType::getByHandle('select'));

    if($type === 'all' || $type === 'theme') {
      $satc->setAttributeKey(CollectionAttributeKey::getByHandle('theme'));
      $themeAK = CollectionAttributeKey::getByHandle('theme');
      foreach ($satc->getOptions() as $v) {
        $category = $this->getCategory($v->value);
        $options['theme'][$category][] = [
          'handle' => $v->value,
          'name' => self::getName($v->value),
        ];
      }
    }
    if($type === 'all' || $type === 'accessibile') {
      $satc->setAttributeKey(CollectionAttributeKey::getByHandle('accessible'));
      foreach ($satc->getOptions() as $v) {
        $options['accessible'][] = ['handle' => $v->value, 'name' => self::getName($v->value)];
      }
    }
    return $options;
  }

  public static function getName($handle) {
    return self::$attributeNameMap[(string)$handle] ?: (string)$handle;
  }
  public static function getIcon($handle) {
    return '<i class="icon-' . self::getIconName($handle) . '"></i>';
  }

  /*
   * getIconElement
   * Returns a DOM element of the icon
   *
   * @param DOMDocument $doc the document this element will be used in
   * @return DOMNode
   *
   */
  public static function getIconElement($handle, DOMDocument $doc) {
    $i = $doc->createElement('i');
    $i->setAttribute('class', 'icon-' . self::getIconName($handle));
    return $i;
  }

  public static function getIconName($handle) {
    return self::$attributeIconMap[(string)$handle];
  }
}



