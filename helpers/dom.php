<?php 
/**
 * @package Helpers
 * @author Joshua Koudys <jkoudys@gmail.com>
 * @copyright  Copyright (c) 2014
 * @license    http://www.concrete5.org/license/     MIT License
 * 
 * A helper for using the extremely strict, but also extremely valid HTML-making,
 * DOMDocument and XSLTProcessor, used for templating.
 */
namespace JanesWalk\Helpers;

class DomHelper
{ 
    /**
     * Fetches an area's HTML as a node
     *
     * @param string $name The area name to get
     * @param Collection $c The page to render blocks for
     * @return DOMNode
     */ 
    public static function addArea($name, $node, $c = null)
    {
        $doc = $node->ownerDocument;

        // Load the collection, if not explicitly set
        if (!$c) {
            $c = \Page::getCurrentPage();
        }

        // Render and capture the HTML for this area
        ob_start();
        (new \Area($name))->display($c);
        $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
        ob_end_clean();

        // Build a temporary doc to parse the HTML as a DOMDocument
        $tdoc = new \DOMDocument('1.0', 'UTF-8');
        $tdoc->loadHTML('<html><head id="head"><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>' . $html . '</html>', LIBXML_HTML_NOIMPLIED);

        // Create an <area>
        $area = $node->appendChild($doc->createElement('area'));
        $area->setAttribute('name', $name);

        $ar = $doc->importNode($tdoc->getElementById('head')->nextSibling, true);
        $area->appendChild($ar);

        return $ar;
    }
}

