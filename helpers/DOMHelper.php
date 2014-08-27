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
// FIXME: Is it possible to use a namespace without making the XSL function call too verbose?
//namespace JanesWalk\Helpers;

// TODO: On 5.7 autoloader upgrades, remove and use autoloading
require_once(DIR_BASE . '/models/DOMInterface.php');
require_once(DIR_BASE . '/models/XSLInterface.php');

// PHP Standard lib
use \DOMDocument;
use \DOMNode;
use \Exception;
// c5 classes
use \XSLTProcessor;
use \View;
// JanesWalk
use \JanesWalk\Models\DOMInterface;
use \JanesWalk\Models\XSLInterface;

class DOMHelper
{
    const XSLT = 'http://www.w3.org/1999/XSL/Transform';

    /**
     * Convenience method for building and appending a DOMNode with escaped contents
     *
     * @param DOMNode $node The element to create underneath
     * @param string $elName The name for our element, e.g. 'Walk' for <Walk>s
     * @param string $value Optional value to load
     * @return DOMNode newly created element
     */
    public function createElement(DOMNode &$node, $elName, $value = null)
    {
        $el = $node->appendChild($node->ownerDocument->createElement($elName));
        if ($value) {
            $el->appendChild($node->ownerDocument->createTextNode($value));
        }
        return $el;
    }

    /**
     * Create an area, and return its element tree. Typically called from XSL
     *
     * @param string $areaName The list of areas to load
     * @param bool $global Indicates if we're loading global areas or local
     * @return DOMNode <Area> element
     */ 
    public static function includeArea($areaName, $global = false)
    {
        // Render and capture the HTML for this area
        $area = new Area($areaName);
        $area->buildXML(Page::getCurrentPage(), null, $global);
        $node = $area->getDOMNode();
        return $node;
    }

    /**
     * Load an 'element'. We're calling it a Fragment, since element is overloaded
     * in XSL. Typically called from XSL
     *
     * @param string $name The element name to load
     * @return DOMNode <Fragment> element
     */
    public static function includeFragment($name)
    {
        try {
            ob_start();
            Loader::element($name);
            $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
            ob_end_clean();

            $tdoc = new DOMDocument;
            $fragment = $tdoc->appendChild($tdoc->createElement('Fragment'));
            self::includeHtml($html, $fragment);
            return $fragment;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Add an XSL file to import
     *
     * @param XSLInterface $xsl The XSL-renderable object
     * @param string $filename The absolute-pathed filename to load
     * @return DOMNode <xsl:import>
     */
    public static function includeXSL(XSLInterface $xsl, $filename)
    {
        $doc = $xsl->getXSLDocument();
        $includes = $doc->getElementsByTagName('include');

        // Setup the element to insert after
        if ($includes->length) {
            $im = $doc->documentElement->insertAfter(
                $doc->createElementNS(self::XSLT, 'xsl:include'),
                $includes->item($includes->length - 1)
            );
        } else {
            $im = $doc->documentElement->insertBefore(
                $doc->createElementNS(self::XSLT, 'xsl:include'),
                $doc->documentElement->firstChild
            );
        }

        $im->setAttribute('href', $filename);

        return $im;
    }

    /**
     * Apply the XSLT rules and echo out the results
     *
     * @param XSLInterface $xsl The XSL-renderable object
     * @param DOMNode $node Optional node to only render
     * @return void
     */
    public static function outputTemplate(XSLInterface $xsl, DOMNode $node = null)
    {
        // Currently only supports XSL against DOM, but could expand to apply to
        // XML string literals.
        if (!is_a($xsl, DOMInterface)) {
            $view = View::getInstance();

            $xsltp = new XSLTProcessor;
            // Allow translation functions to be used in xsl
            // FIXME: a helper's not the best place for this
            $xsltp->registerPHPFunctions([
                't','t2','tc','test', 'DOMHelper::includeArea',
                'DOMHelper::includeFragment', 'ThemeHelper::getIconElement'
            ]);
            $xsltp->setParameter('', 'isEditMode', (bool) false);
            $xsltp->setParameter('', 'isSearching', (bool) $_REQUEST['query']);
            $xsltp->setParameter('', 'isMobile', false); // FIXME
            $xsltp->setParameter('', 'themePath', $view->getThemePath());
            $xsltp->importStyleSheet($xsl->getXSLDocument());

            echo '<!doctype html><html>';
            $xsltp->transformToDoc($xsl->getDOMDocument())->saveHTMLFile('php://output');
            echo '</html>';
        }
    }

    /**
     * Create a DOMNode from parsing the contents of an html string
     *
     * @param string $html The raw HTML
     * @param DOMNode $parent The name of the node to create
     * @return DOMNode
     */
    public static function includeHtml($html, DOMNode $parent)
    {
        // Build a temporary doc to parse the HTML as a DOMDocument
        $tdoc = new DOMDocument('1.0', 'UTF-8');
        $tdoc->preserveWhiteSpace = false;

        // PHP DOM devs suck, and still throw warnings on html5 elements. Turn all XML parsing errors off
        $libxmlErrors = libxml_use_internal_errors(true);
       
        // It's a silly limit on DOMDocument that we need to do this, 
        // but necessary for proper UTF-8 encoding
        $tdoc->loadHTML(
            '<html><head id="head"><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>' .
            $html .
            '</html>',
            LIBXML_HTML_NOIMPLIED
        );
        
        // Then turn the XML error reporting to the previous setting
        libxml_use_internal_errors($libxmlErrors);
        // Go through each created element and move to main doc
        for ($el = $tdoc->getElementById('head')->nextSibling; $el; $el = $next) {
            $next = $el->nextSibling;
            $el = $parent->ownerDocument->importNode($el, true);
            $parent->appendChild($el);
        }

        return $parent;
    }
}

