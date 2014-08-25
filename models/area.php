<?php
defined('C5_EXECUTE') or die("Access Denied.");

use \JanesWalk\Models\DOMInterface;
use \JanesWalk\Models\XSLInterface;

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
        if ($parent) {
            $this->doc = $parent->getDOMDocument();
            $this->blockEl = $this->doc->appendChild($this->doc->createElement('Area'));
            $this->blockEl->setAttribute('name', $this->getAreaHandle());
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

    /**
     * Updates the DOMDocument with the XML for this array's blocks
     * @param Page $c
     * @param Block[] $alternateBlockArray optional array of blocks to render instead of default behavior
     * @return DOMNode Points to this <Area>
     */
    public function buildXML(Page &$c, array $alternateBlockArray = null)
    {
        if (!intval($c->cID)) {
            //Invalid Collection
            return false;
        }

        // Set area's dom to the page
        $this->initDOM($c);

        if ($this->arIsGlobal) {
            $stack = Stack::getByName($this->arHandle);
        }               
        $currentPage = Page::getCurrentPage();
        $ourArea = self::getOrCreate($c, $this->arHandle, $this->arIsGlobal);
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
            return false;
        }

        $blocksToDisplay = ($alternateBlockArray) ? $alternateBlockArray : $ourArea->getAreaBlocksArray($c, $ap);
        $this->totalBlocks = $ourArea->getTotalBlocksInArea();
        $u = new User();

        $bv = new BlockView();

        // Start capturing the HTML. TODO: Directly return XML
        ob_start();
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
                $layout->display($c,$this);  
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
            $bv = new BlockView();
            $bv->setAreaObject($ourArea); 

            // this is useful for rendering areas from one page
            // onto the next and including interactive elements
            if ($currentPage->getCollectionID() != $c->getCollectionID()) {
                $b->setBlockActionCollectionID($c->getCollectionID());
            }
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
        }

        $blockPositionInArea++;

        $bv->renderElement('block_area_footer_view', array('a' => $ourArea));   

        if ($this->showControls && $c->isEditMode() && $ap->canViewAreaControls()) {
            $bv->renderElement('block_area_footer', array('a' => $ourArea));        
        }

        $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
        ob_end_clean();
        DOMHelper::includeHTML(
            mb_convert_encoding(ob_get_contents(), 'UTF-8'),
            $this->areaEl
        );
    }
}
