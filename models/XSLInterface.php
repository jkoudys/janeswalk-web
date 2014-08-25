<?php
/**
 * Methods for applying XSLT to a model
 */
namespace JanesWalk\Models;

use \DOMNode;
use \DOMDocument;

interface XSLInterface
{
    /**
     * Get the DOMDocument for the XSLT
     *
     * @return DOMDocument
     */
    public function getXSLDocument();

    /**
     * Initialize the DOMDocument for this model.
     *
     * @param DOMDocument $doc The DOMDocument to initialize against
     * @return DOMDocument Our newly initialized doc
     */
    public function setXSLDocument(DOMDocument &$doc = null);
}
