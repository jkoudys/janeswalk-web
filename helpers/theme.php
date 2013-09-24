<?php 
/**
 * @package Helpers
 * @author Joshua Koudys <jkoudys@gmail.com>
 * @copyright  Copyright (c) 2013
 * @license    http://www.concrete5.org/license/     MIT License
 */



defined('C5_EXECUTE') or die("Access Denied.");
class ThemeHelper { 
  public function getName($handle) {
    switch($handle) {
      case "nature-naturelover":
        return "The Nature Lover";
          break;
      case "nature-greenthumb":
        return "The Green Thumb";
          break;
      case "nature-petlover":
        return "The Pet Lover";
          break;
      case "urban-suburbanexplorer":
        return "The Suburban Explorer";
          break;
      case "urban-architecturalenthusiast":
        return "The Architectural Enthusiast";
          break;
      case "urban-moversandshakers":
        return "The Movers & Shakers (Transportation)";
          break;
      case "culture-historybuff":
        return "The History Buff";
          break;
      case "culture-artist":
        return "The Artist";
          break;
      case "culture-aesthete":
        return "The Aesthete";
          break;
      case "culture-bookworm":
        return "The Bookworm";
          break;
      case "culture-foodie":
        return "The Foodie";
          break;
      case "culture-nightowl":
        return "The Night Owl";
          break;
      case "culture-techie":
        return "The Techie";
          break;
      case "culture-writer":
        return "The Writer";
          break;
      case "civic-activist":
        return "The Activist";
          break;
      case "civic-truecitizen":
        return "The True Citizen";
          break;
      case "civic-goodneighbour":
        return "The Good Neighbour";
          break;
      default:
        break;
    }
  }
  
  public function getIcon($handle) {
    $v = View::getInstance();
    switch($handle) {
      case "nature-naturelover":
        return "<i class='icon-bug'></i>";
          break;
      case "nature-greenthumb":
        return "<i class='icon-leaf'></i>";
          break;
      case "nature-petlover":
        return "<i class='icon-heart'></i>";
          break;
      case "urban-suburbanexplorer":
        return '<img src="' .
          $v->getThemePath() . "/images/icons-explorer.png" 
          . '" />';
          break;
      case "urban-architecturalenthusiast":
        return "<i class='icon-building'></i>";
          break;
      case "urban-moversandshakers":
        return "<i class='icon-rocket'></i>";
          break;
      case "culture-historybuff":
        return '<img src="' .
        $v->getThemePath() . "/images/icons-historian.png"
          . '" />';
          break;
      case "culture-artist":
        return '<img src="' .
        $v->getThemePath() . "/images/icons-artist.png"
          . '" />';
          break;
      case "culture-aesthete":
        return "<i class='icon-picture'></i>";
          break;
      case "culture-bookworm":
        return "<i class='icon-book'></i>";
          break;
      case "culture-foodie":
        return '<img src="' .
        $v->getThemePath() . "/images/icons-foodie.png"
          . '" />';
          break;
      case "culture-nightowl":
        return "<i class='icon-moon'></i>";
          break;
      case "culture-techie":
        return "<i class='icon-gears'></i>";
          break;
      case "culture-writer":
        return "<i class='icon-edit'></i>";
          break;
      case "civic-activist":
        return '<img src="' .
        $v->getThemePath() . "/images/icons-activist.png"
          . '" />';
          break;
      case "civic-truecitizen":
        return "<i class='icon-flag-alt'></i>";
          break;
      case "civic-goodneighbour":
        return '<img src="' .
          $v->getThemePath() . "/images/icon-goodneighbour.png"
          . '" />';
          break;
      default:
        break;
    }
  }
}

