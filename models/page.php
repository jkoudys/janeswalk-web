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

        // Background photo
        $headImage = $this->getAttribute('full_bg');
        if ($headImage) {
            $this->pageEl->setAttribute('background-url', $headImage->getURL());
            $bgPhotoCreditName = $headImage->getAttribute('background_photo_credit_name');
            $bgPhotoCreditLink = $headImage->getAttribute('background_photo_credit_link');
            if ($bgPhotoCreditName) {
                $pc = $this->pageEl->appendChild(
                    $this->doc->createElement(
                        'PhotoCredit',
                        $bgPhotoCreditName
                    )
                );
                $pc->setAttribute('href', $bgPhotoCreditLink);
            }
        }

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
        //

        // Return the DOMDocument we've made
        return $this->doc;
    }

    public function domAddToBody(DOMElement $el)
    {
    }

    public function domCreateElement($elName)
    {
        return $this->pageEl->appendChild($this->doc->createElement($elName));
    }

    /**
     * Load Area into the body. Typically run from XSL
     *
     * @param string $areaName The list of areas to load
     * @param bool $global Indicates if we're loading global areas or local
     * @return DOMNode Area element
     */ 
    public static function domLoadArea($areaName, $global = false)
    {
        try {
            // Render and capture the HTML for this area
            ob_start();
            if ($global) {
                (new GlobalArea($areaName))->display(Page::getCurrentPage());
            } else {
                (new Area($areaName))->display(Page::getCurrentPage());
            }
            $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
            ob_end_clean();
            
            return self::domAddHtml($html);
        } catch (\Exception $e) {
            return false;
        }
    }

    // TODO: this is very similar to domLoadAreas - see what can be a new function
    public static function domLoadFragment($name)
    {
        try {
            ob_start();
            Loader::element($name);
            $html = mb_convert_encoding(ob_get_contents(), 'UTF-8');
            ob_end_clean();

            return self::domAddHtml($html, 'fragment');
        } catch (\Exception $e) {
            return false;
        }
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

        $xsl = new XSLTProcessor;
        // Allow translation functions to be used in xsl
        $xsl->registerPHPFunctions(['t','t2','tc','test', 'Page::domLoadArea', 'Page::domLoadFragment']);
        $xsl->setParameter('', 'isEditMode', (bool) $this->isEditMode());
        $xsl->setParameter('', 'isSearching', (bool) $_REQUEST['query']);
        $xsl->setParameter('', 'isMobile', false); // FIXME
        $xsl->setParameter('', 'themePath', $view->getThemePath());
        $xsl->importStyleSheet($this->xsl);

        echo '<!doctype html><html>';
        $xsl->transformToDoc($this->doc)->saveHTMLFile('php://output');
        echo '</html>';
    }

    public function getDomDoc()
    {
        return $this->doc;
    }

    /**
     * Create a DOMNode from parsing the contents of an html string
     *
     * @param string $html The raw HTML
     * @param string $parent The name of the node to create
     * @return DOMNode
     */
    protected static function domAddHtml($html, $parent = 'area')
    {
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
        $retEl = $tdoc->createElement($parent);
        // Go through each created element and move to main doc
        for ($el = $tdoc->getElementById('head')->nextSibling; $el; $el = $next) {
            $next = $el->nextSibling;
            $retEl->appendChild($el);
        }
        
        return $retEl;
    }
}

