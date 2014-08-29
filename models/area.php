<?php
defined('C5_EXECUTE') or die("Access Denied.");

use \JanesWalk\Models\DOMInterface;
use \JanesWalk\Models\XSLInterface;

require_once(DIR_BASE . '/controllers/DOMableInterface.php');

class Area extends Concrete5_Model_Area implements DOMInterface, XSLInterface
{
    protected $doc;
    protected $xsl;
    protected $areaEl;

    public function getDOMNode(DOMDocument &$doc = null)
    {
        return $this->areaEl;
    }

    public function getDOMDocument()
    {
        return $this->doc;
    }

    public function initDOM(DOMInterface &$parent = null)
    {
        // Because areas are rendered in pages, we don't want to build on the page's
        // document tree. The XSL will simply inject the DOMNode we return
        if (!$this->doc) {
            $this->doc = new DOMDocument;
            if ($parent) {
                $this->xsl = $parent->getXSLDocument();
            } else {
            }
            $this->areaEl = $this->doc->appendChild($this->doc->createElement('Area'));
            $this->areaEl->setAttribute('name', $this->getAreaHandle());
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
            throw new Exception('DOM Areas XSL must be contained in a parent doc');
        }
    }

    /**
     * Updates the DOMDocument with the XML for this array's blocks
     * @param Page $c
     * @param Block[] $alternateBlockArray optional array of blocks to render instead of default behavior
     * @param bool $global Is this a global area, or not?
     * @return DOMNode Points to this <Area>
     */
    public function buildXML(Page &$c, array $alternateBlockArray = null, $global = false)
    {
        // Collapse the global vs local into this one method
        $this->arIsGlobal = $global;

        if (!intval($c->cID)) {
            //Invalid Collection
            return false;
        }

        //echo 'XXX' . __CLASS__ . '::' . __FUNCTION__ .  spl_object_hash(Page::getCurrentPage()), ' -- ', spl_object_hash($c);
        // Set area's dom to the page
        $this->initDOM();

        if ($this->arIsGlobal) {
            $stack = Stack::getByName($this->arHandle);
        }

        // XXX I don't fully understand this - I don't want multiple areas, since 
        // each area should be part of building the page's DOMDocument
        $ourArea = self::getOrCreate($c, $this->arHandle, $this->arIsGlobal);
        // $ourArea = $this;
        $ourArea->initDOM($this->c);
        if (count($this->customTemplateArray) > 0) {
            $ourArea->customTemplateArray = $this->customTemplateArray;
        }
        if (count($this->attributes) > 0) {
            $ourArea->attributes = $this->attributes;
        }
        if ($this->maximumBlocks > -1) {
            $ourArea->maximumBlocks = $this->maximumBlocks;
        }
        $ap = new Permissions($ourArea);
        if (!$ap->canViewArea()) {
            echo 'Cannot view Area ', __CLASS__, '::', __FUNCTION__, ' handle:', $this->arHandle;
            return false;
        }

        $blocksToDisplay = ($alternateBlockArray) ? $alternateBlockArray : $ourArea->getAreaBlocksArray($c, $ap);
        $this->totalBlocks = $ourArea->getTotalBlocksInArea();
        $u = new User();

        $bv = new BlockView();

        // now, we iterate through these block groups (which are actually arrays of block objects), and display them on the page
        if ($this->showControls && $c->isEditMode() && $ap->canViewAreaControls()) {
            $bv->renderElement('block_area_header', array('a' => $ourArea));        
        }

        $bv->renderElement('block_area_header_view', array('a' => $ourArea));   

        //display layouts tied to this area 
        //Might need to move this to a better position  
        $areaLayouts = $this->getAreaLayouts($c);
        if(is_array($areaLayouts) && count($areaLayouts)){ 
            foreach($areaLayouts as $layout){
                $layout->display($c, $this);  
            }
            if($this->showControls && ($c->isArrangeMode() || $c->isEditMode())) {
                $controlEl = $this->areaEl->appendChild($this->doc->createElement('div'));
                $controlEl->setAttribute(
                    'class',
                    'ccm-layouts-block-arrange-placeholder ccm-block-arrange'
                );
            }
        }

        $blockPositionInArea = 1; //for blockWrapper output

        foreach ($blocksToDisplay as $b) {
            $includeEditStrip = false;

            // Init block's DOM as a child of this Area
            $b->initDOM($this);
            $controller = $b->controller;

            // Check if the block we're rendering can return DOM elements
            if ($controller instanceof \JanesWalk\Controllers\DOMableInterface) {
                // Add the XML for this block to the DOM
                $renderedEl = $controller->renderXML();
            }
            // If this evaluates false, then we either didn't have a DOMable, or
            // it didn't have an XSL template defined
            if (!$renderedEl) {
                // This block doesn't build in the DOM, so grab its HTML instead
                ob_start();
                $bv = new BlockView();
                $bv->setAreaObject($ourArea); 
                if ($this->arIsGlobal && is_object($stack)) {
                    $b->setBlockActionCollectionID($stack->getCollectionID());
                }
                $p = new Permissions($b);

                if ($c->isEditMode() && $this->showControls && $p->canViewEditInterface()) {
                    $includeEditStrip = true;
                }

                if ($p->canViewBlock()) {
                    if (!$c->isEditMode()) {
                        $this->outputBlockWrapper(true, $b, $blockPositionInArea);
                    }
                    if ($includeEditStrip) {
                        $bv->renderElement('block_controls', array(
                            'a' => $ourArea,
                            'b' => $b,
                            'p' => $p
                        ));
                        $bv->renderElement('block_header', array(
                            'a' => $ourArea,
                            'b' => $b,
                            'p' => $p
                        ));
                    }

                    $bv->render($b);
                    if ($includeEditStrip) {
                        $bv->renderElement('block_footer');
                    }
                    if (!$c->isEditMode()) {
                        $this->outputBlockWrapper(false, $b, $blockPositionInArea);
                    }

                }
                $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
                ob_end_clean();
                DOMHelper::includeHTML(
                    $html,
                    $b->getDOMNode()
                );
            }
        }

        $blockPositionInArea++;

        $bv->renderElement('block_area_footer_view', array('a' => $ourArea));   

        if ($this->showControls && $c->isEditMode() && $ap->canViewAreaControls()) {
            $bv->renderElement('block_area_footer', array('a' => $ourArea));        
        }
    }

    /**
	 * displays the Area in the page
	 * ex: $a = new Area('Main'); $a->display($c);
	 * @param Page|Collection $c
	 * @param Block[] $alternateBlockArray optional array of blocks to render instead of default behavior
	 * @return void
	 */
    function display(&$c, $alternateBlockArray = null)
    {
        $this->initDOM();
        parent::display($c, $alternateBlockArray);
    }
}
