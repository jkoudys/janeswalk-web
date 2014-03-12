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
      'urban-suburbanexplorer' => "<img src='{$themePath}/images/icons-explorer.png' />",
      'urban-architecturalenthusiast' => "<i class='icon-building'></i>",
      'urban-moversandshakers' => "<i class='icon-rocket'></i>",
      'culture-historybuff' => "<img src='{$themePath}/images/icons-historian.png' />",
      'culture-artist' => "<img src='{$themePath}/images/icons-artist.png' />",
      'culture-aesthete' => "<i class='icon-picture'></i>",
      'culture-bookworm' => "<i class='icon-book'></i>",
      'culture-foodie' => "<img src='{$themePath}/images/icons-foodie.png' />",
      'culture-nightowl' => "<i class='icon-moon'></i>",
      'culture-techie' => "<i class='icon-gears'></i>",
      'culture-writer' => "<i class='icon-edit'></i>",
      'civic-activist' => "<img src='{$themePath}/images/icons-activist.png' />",
      'civic-truecitizen' => "<i class='icon-flag-alt'></i>",
      'civic-goodneighbour' => "<img src='{$themePath}/images/icon-goodneighbour.png' />",
      ];
    $this->attributeNameMap = [
      'nature-naturelover' => 'The Nature Lover',
      'nature-greenthumb' => 'The Green Thumb',
      'nature-petlover' => 'The Pet Lover',
      'urban-suburbanexplorer' => 'The Suburban Explorer',
      'urban-architecturalenthusiast' => 'The Architectural Enthusiast',
      'urban-moversandshakers' => 'The Movers & Shakers (Transportation)',
      'culture-historybuff' => 'The History Buff',
      'culture-artist' => 'The Artist',
      'culture-aesthete' => 'The Aesthete',
      'culture-bookworm' => 'The Bookworm',
      'culture-foodie' => 'The Foodie',
      'culture-nightowl' => 'The Night Owl',
      'culture-techie' => 'The Techie',
      'culture-writer' => 'The Writer',
      'civic-activist' => 'The Activist',
      'civic-truecitizen' => 'The True Citizen',
      'civic-goodneighbour' => 'The Good Neighbour',
      // Accessibility
      'familyfriendly' => 'Family friendly',
      'wheelchair' => 'Wheelchair accessible',
      'dogs' => 'Dogs welcome',
      'strollers' => 'Strollers welcome',
      'bicycles' => 'Bicycles welcome',
      'steephills' => 'Steep hills',
      'uneven' => 'Wear sensible shoes (uneven terrain)',
      'busy' => 'Busy sidewalks',
      'bicyclesonly' => 'Bicycles only',
    ];
  }

  public function getAll() {
    return $this->attributeIconMap;
  }
  public function getName($handle) {
    return $this->attributeNameMap[(string)$handle];
  }
  public function getIcon($handle) {
    return $this->attributeIconMap[(string)$handle];
  }
}

