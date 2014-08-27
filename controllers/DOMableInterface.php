<?php
/**
 * Methods to define a Controller which can render a View as XML
 */
namespace JanesWalk\Controllers;

use \DOMNode;
use \DOMDocument;

interface DOMableInterface
{
    /**
     * Render XML from a template
     *
     * @param string $template The name of the template
     * @param DOMNode $parent The node to build the XML under. If not speficified, use return results
     * @return DOMNode The rendered results
     */
    public function buildXML($template = '');

}
