<?php defined('C5_EXECUTE') or die("Access Denied.");

$navItems = $controller->getNavItems();

$doc = new DOMDocument;
$currentMenu = $doc;
foreach ($navItems as $ni) {

    // Open submenus if we need them
    if ($ni->hasSubmenu) {
        $currentMenu = $currentMenu->appendChild($doc->createElement('submenu'));
    } else {
        $currentMenu = $doc;
    }

    $niEl = $currentMenu->appendChild($doc->createElement('nav-item'));

    $classes = array();
    if ($ni->isCurrent) {
        //class for the page currently being viewed
        $classes[] = 'nav-selected';
    }

    if ($ni->inPath) {
        //class for parent items of the page currently being viewed
        $classes[] = 'nav-path-selected';
    }

    $niEl->setAttribute('class', implode(" ", $classes));
    $niEl->setAttribute('href', $ni->url);
    $niEl->setAttribute('target', $ni->target);
    $niEl->setAttribute('name', $ni->name);
}

//*** Step 2 of 2: Output menu HTML ***/
$xsl = new XSLTProcessor;
$xsl->importStyleSheet(DOMDocument::load(substr(__FILE__, 0, -3) . 'xsl'));
$xsl->transformToDoc($doc)->saveHTMLFile('php://output');

