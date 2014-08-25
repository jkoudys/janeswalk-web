<?php
defined('C5_EXECUTE') || die('Access Denied.');

// TODO: on 5.7 migration, replace with autoloader
require_once('DOMInterface.php');
require_once('XSLInterface.php');

use \DOMDocument;
use \GlobalArea;
use \Area;
use \JanesWalk\Models\DOMInterface;
use \JanesWalk\Models\XSLInterface;

class Page extends Concrete5_Model_Page implements DOMInterface, XSLInterface
{
    protected $doc;
    protected $xsl;
    protected $pageEl;

    const XSLT = 'http://www.w3.org/1999/XSL/Transform';

    public function initDOM(DOMInterface &$parent = null)
    {
        // Create a new doc, unless initialized on an existing doc
        if ($node) {
            $this->doc = $parent->getDOMDocument();
        } else {
            $this->doc = new DOMDocument('1.0', 'UTF-8');
        }

        $dh = Loader::helper('concrete/dashboard');

        $this->doc->preserveWhiteSpace = false;

        // Load profile menu options
        $u = new User();
        $ui = UserInfo::getByID($u->getUserID());

        // Site-wide flag for if you're logged in or not
        $this->pageEl = $this->doc->appendChild($this->doc->createElement('Page'));
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

        // Check for edit mode
        $this->pageEl->setAttribute('isEditMode', $this->isEditMode());

        // Setup a fresh XSL
        $this->setXSLDocument();

        /* Build menu options depending if currently logged in or not */
        $profile = $this->pageEl->appendChild($this->doc->createElement('profile'));
        if ($u->isRegistered()) {
            $mi = $profile->appendChild($this->doc->createElement('menuitem'));
            $mi->setAttribute('href', View::url('/profile'));
            $mi->setAttribute('name', $ui->getAttribute('first_name') ?: $u->getUserName());

            $mi = $profile->appendChild($this->doc->createElement('menuitem'));
            $mi->setAttribute('href', View::url('/login', 'logout'));
            $mi->setAttribute('name', t('Logout'));
        } else {
            $mi = $profile->appendChild($this->doc->createElement('menuitem'));
            $mi->setAttribute('href', View::url('/register'));
            $mi->setAttribute('name', tc('Register on a website', 'Join'));

            $mi = $profile->appendChild($this->doc->createElement('menuitem'));
            $mi->setAttribute('href', View::url('/login'));
            $mi->setAttribute('name', t('Log in'));
        }

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

        // Return the DOMDocument we've made
        return $this->doc;
    }

    public function getDOMDocument()
    {
        return $this->doc;
    }

    public function getDOMNode(DOMDocument &$doc = null)
    {
        if ($doc) {
            return $doc->importNode($this->pageEl);
        } else {
            return $this->pageEl;
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
            $this->xsl = DOMDocument::load(DIR_BASE . '/elements/templates/base.xsl', LIBXML_NOBLANKS);
        }
    }
}

