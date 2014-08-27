<?php
use JanesWalk\Models\DOMInterface;
use JanesWalk\Models\XSLInterface;

defined('C5_EXECUTE') or die("Access Denied.");
class Block extends Concrete5_Model_Block implements DOMInterface, XSLInterface
{
    protected $doc;
    protected $xsl;
    protected $blockEl;

    public function getDOMNode(DOMDocument &$doc = null)
    {
        return $this->blockEl;
    }

    public function getDOMDocument()
    {
        return $this->doc;
    }

    public function initDOM(DOMInterface &$parent = null)
    {
        if ($parent) {
            try {
                $this->doc = $parent->getDOMDocument();
                $this->xsl = $parent->getXSLDocument();
                $this->blockEl = $parent->getDOMNode()->appendChild($this->doc->createElement('Block'));
                $this->blockEl->setAttribute('name', 'page_list');
                $this->blockEl->setAttribute('template', $this->getBlockFilename());
            } catch (Exception $e) {
                echo 'Error rendering ' . __FILE__ . '::' . __FUNCTION__ . ' ', $e;
            }
        } else {
            throw new Exception('DOM Blocks must be contained in a parent doc');
        }
    }

    public function getXSLDocument()
    {
        return $this->xsl;
    }

    public function setXSLDocument(DOMDocument &$doc = null)
    {
        if ($doc) {
            $this->xsl = $doc;
        } else {
            throw new Exception('DOM Block XSL must be contained in a parent doc');
        }
    }
}

class BlockRecord extends Concrete5_Model_BlockRecord {}
