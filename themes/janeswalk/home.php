<?php
use \JanesWalk\Helpers\DOMHelper;

defined('C5_EXECUTE') or die(_('Access Denied.'));

$dh = Loader::helper('concrete/dashboard');
require_once (DIR_BASE . '/helpers/dom.php');

// FIXME: lots of duplication here, setting vars in the Controller
// then putting them in a domdoc here. Should just do this in the controller
// and override c5's php loading and use xsl instead.

$doc = new DOMDocument('1.0', 'UTF-8');
$doc->appendChild($doc->createElement('jw-header'));
$view = $doc->appendChild($doc->createElement('view'));
if ($dh->canRead) {
    $view->setAttribute('logged-in', 'logged_in');
} 

$headImage = $c->getAttribute('full_bg');
if ($headImage) $view->setAttribute('background-url', $headImage->getURL());

$profile = $view->appendChild($doc->createElement('profile'));
$profile->setAttribute('login', $this->url('/login'));
$profile->setAttribute('register', $this->url('/register'));

foreach (['Intro', 'Map', 'Call to Action', 'Blog Header', 'Blog', 'Twitter'] as $areaName) {
    DomHelper::addArea($areaName, $view, $c);
}

$xsl = new XSLTProcessor;
$xsl->setParameter('', 'isMobile', $isMobile);
$xsl->setParameter('', 'themePath', $this->getThemePath());
$xsl->importStyleSheet(DOMDocument::load(substr(__FILE__, 0, -3) . 'xsl'));

$xsl->transformToDoc($doc)->saveHTMLFile('php://output');
