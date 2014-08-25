<?php
/**
 * Methods for buildind an XML representation of a model
 */
namespace JanesWalk\Models;

use \DOMNode;
use \DOMDocument;

interface DOMInterface
{
    /**
     * Builds a DOMNode representing the model, e.g. <Walk>
     *
     * @param DOMDocument $doc The DOMDocument to add this node to. Build a
     *                         new document if one is not set.
     * @return DOMNode
     */
    public function getDOMNode(DOMDocument &$doc = null);

    /**
     * Get the DOMDocument. No side-effects should occur here.
     *
     * @return DOMDocument
     */
    public function getDOMDocument();

    /**
     * Initialize the DOMDocument for this model. Includes setup of root element,
     * and will either init a new DOMDocument if none set, or append the model
     * element to the existing one you've passed in.
     *
     * @param DOMDocument $doc The DOMDocument to initialize against
     *
     * @return DOMDocument Our newly initialized doc
     */
    public function initDOM(DOMInterface &$parent = null);
}
