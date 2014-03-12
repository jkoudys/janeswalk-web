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
  private $attributeNameMap;
  private $attributeIconMap;

  public function __construct() {
    $themePath = View::getInstance()->getThemePath();
    $this->attributeIconMap = [
      'nature-naturelover' => "<i class='icon-bug'></i>",
      'nature-greenthumb' => "<i class='icon-leaf'></i>",
      'nature-petlover' => "<i class='icon-heart'></i>",
      'urban-suburbanexplorer' => "<i class='icon-home'></i>",
      'urban-architecturalenthusiast' => "<i class='icon-building'></i>",
      'urban-moversandshakers' => "<i class='icon-rocket'></i>",
      'culture-historybuff' => "<i class='icon-undo'></i>",
      'culture-artist' => "<i class='icon-picture'></i>",
      'culture-aesthete' => "<i class='icon-pencil'></i>",
      'culture-bookworm' => "<i class='icon-book'></i>",
      'culture-foodie' => "<i class='icon-good'></i>",
      'culture-nightowl' => "<i class='icon-glass'></i>",
      'culture-techie' => "<i class='icon-gears'></i>",
      'culture-writer' => "<i class='icon-edit'></i>",
      'civic-activist' => "<i class='icon-bullhorn'></i>",
      'civic-truecitizen' => "<i class='icon-flag-alt'></i>",
      'civic-goodneighbour' => "<i class='icon-group'></i>",


      'urban-sports' => "<i class='icon-trophy'></i>",
      'urban-play' => "<i class='icon-puzzle-piece'></i>",
      'urban-water' => "<i class='icon-puzzle-tint'></i>",
      'urban-film' => "<i class='icon-facetime-video'></i>",
      'urban-music' => "<i class='icon-music'></i>",
      'civic-international' => "<i class='icon-globe'></i>",
      'civic-military' => "<i class='icon-fighter-jet'></i>",
      'civic-commerce' => "<i class='icon-shopping-cart'></i>",
      'civic-religion' => "<i class='icon-bell'></i>",
      'civic-health' => "<i class='icon-medkit'></i>",
      'civic-nativeissues' => "<i class='icon-sun'></i>",
      'civic-gender' => "<i class='icon-unlock-alt'></i>",
    ];
    $this->attributeNameMap = [
      'nature-naturelover' => 'Nature',
      'nature-greenthumb' => 'Gardening',
      'nature-petlover' => 'Animals',
      'urban-suburbanexplorer' => 'Suburbs',
      'urban-architecturalenthusiast' => 'Architecture',
      'urban-moversandshakers' => 'Transportation',
      'culture-historybuff' => 'Heritage',
      'culture-artist' => 'Art',
      'culture-aesthete' => 'Design',/////
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
      'seniors' => 'Senior Friendly',
    ];
  }

  public function getAll() {
    return $this->attributeNameMap;
  }
  public function getName($handle) {
    return $this->attributeNameMap[(string)$handle];
  }
  public function getIcon($handle) {
    return $this->attributeIconMap[(string)$handle];
  }
}

