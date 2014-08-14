<?php
defined('C5_EXECUTE') || die('Access Denied.');

use \DOMDocument;
use \GlobalArea;
use \Area;

class Page extends Concrete5_Model_Page
{
    protected $doc;
    protected $xsl;
    protected $pageEl;

    const XSLT = 'http://www.w3.org/1999/XSL/Transform';

    public function domInit()
    {
        $dh = Loader::helper('concrete/dashboard');

        $this->doc = new DOMDocument('1.0', 'UTF-8');
        $this->xsl =  DOMDocument::load(DIR_BASE . '/elements/templates/base.xsl');

        $this->doc->preserveWhiteSpace = false;

        // Load profile menu options
        $u = new User();
        $ui = UserInfo::getByID($u->getUserID());

        /* Build menu options depending if currently logged in or not */
        if ($u->isRegistered()) {
            $profileMenu = '<li><a href="' . (View::url('/profile')) . '" class="">' . ($ui->getAttribute('first_name') ? : $u->getUserName()) . '</a></li>'
                . '<li><a href="' . (View::url('/login', 'logout')) . '" class="">' . t('Logout') . '</a></li>';
        } else {
            $profileMenu = '<li><a href="' . (View::url('/register')) . '" class="">' . tc('Register on a website', 'Join') . '</a></li>'
                . '<li><a href="' . (View::url('/login')) . '" class="">' . t('Log in') . '</a></li>';
        }


        // Site-wide flag for if you're logged in or not
        $this->pageEl = $this->doc->appendChild($this->doc->createElement('page'));
        if ($dh->canRead) {
            $this->pageEl->setAttribute('logged-in', 'logged_in');
        } 
        $headImage = $this->getAttribute('full_bg');
        if ($headImage) $this->pageEl->setAttribute('background-url', $headImage->getURL());

        $te = $this->xsl->documentElement->insertBefore(
            $this->xsl->createElementNS(self::XSLT, 'xsl:template'),
            $this->xsl->documentElement->firstChild
        );
        $te->setAttribute('match', 'page');
        $te->appendChild($this->xsl->createElementNS(self::XSLT, 'xsl:apply-imports'));

        // Load sitewide links
        $donate = $this->pageEl->appendChild(
            $this->doc->createElement(
                'donate',
                t('Donate')
            )
        );
        $donate->setAttribute(
            'href',
            Loader::helper('navigation')->getLinkToCollection(Page::getByPath('/donate'))
        );

        // Basic info on profile
        $profile = $this->pageEl->appendChild($this->doc->createElement('profile'));
//        $profile->setAttribute('login', $this->url('/login'));
//        $profile->setAttribute('register', $this->url('/register'));
    }

    public function domAddToBody(DOMElement $el)
    {
    }

    /**
     * Load list of areas into the body
     *
     * @param array $areaNames The list of areas to load
     * @param bool $global Indicates if we're loading global areas or local
     * @return bool Success
     */ 
    public function domLoadAreas(array $areaNames, $global = false)
    {
        try {
            foreach ($areaNames as $name) {
                // Render and capture the HTML for this area
                ob_start();
                if ($global) {
                    (new GlobalArea($name))->display($this);
                } else {
                    (new Area($name))->display($this);
                }
                $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
                ob_end_clean();
                // Create an <area>
                $area = $this->pageEl->appendChild($this->doc->createElement('area'));
                $area->setAttribute('name', $name);
                
                $this->domAddHtml($html, $area);
            }
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

    // TODO: this is very similar to domLoadAreas - see what can be a new function
    public function domLoadFragments(array $fragmentNames)
    {
        try {
            foreach ($fragmentNames as $name) {
                ob_start();
                Loader::element($name);
                $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
                ob_end_clean();
                $element = $this->pageEl->appendChild($this->doc->createElement('fragment'));
                $element->setAttribute('name', $name);

                $this->domAddHtml($html, $element);
            }
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

    public function domIncludeXsl($filename)
    {
        $im = $this->xsl->documentElement->insertBefore(
            $this->xsl->createElementNS(self::XSLT, 'xsl:import'),
            $this->xsl->documentElement->firstChild
        );
        $im->setAttribute('href', $filename);
    }

    public function domRenderTemplate()
    {
        $view = View::getInstance();

        // FIXME: This has side-effects, but theoretically you should be able to call
        // domRenderTemplate() multiple times with the same result.
        // Load global areas
        $this->domLoadAreas(
            ['Left Header', 'Dropdown', 'Footer'],
            true
        );

        // Load the basic header + footer
        $this->domLoadFragments(['header_required', 'footer_required']);

//        echo $this->doc->saveXML();
        $xsl = new XSLTProcessor;
        // Allow translation functions to be used in xsl
        $xsl->registerPHPFunctions(['t','t2','tc']);
        $xsl->setParameter('', 'isEditMode', (bool) $this->isEditMode());
        $xsl->setParameter('', 'isSearching', (bool) $_REQUEST['query']);
        $xsl->setParameter('', 'isMobile', false); // FIXME
        $xsl->setParameter('', 'themePath', $view->getThemePath());
        $xsl->importStyleSheet($this->xsl);

        echo '<!doctype html><html>';
        $xsl->transformToDoc($this->doc)->saveHTMLFile('php://output');
        echo '</html>';
    }

    protected function domAddHtml($html, DOMElement $parent)
    {
        // If no $parent explicity set, add to the main body
        if (!$parent) $parent = &$this->pageEl;

        // Build a temporary doc to parse the HTML as a DOMDocument
        $tdoc = new DOMDocument('1.0', 'UTF-8');
        $tdoc->preserveWhiteSpace = false;

        // It's a silly limit on DOMDocument that we need to do this, 
        // but necessary for proper UTF-8 encoding
        $tdoc->loadHTML(
            '<html><head id="head"><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>' .
                $html .
            '</html>',
            LIBXML_HTML_NOIMPLIED
        );

        // Go through each created element and move to main doc
        for ($el = $tdoc->getElementById('head')->nextSibling; $el; $el = $el->nextSibling) {
            $parent->appendChild($this->doc->importNode($el, true));
        }

    }
}

