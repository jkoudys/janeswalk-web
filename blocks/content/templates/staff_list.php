<?php
defined('C5_EXECUTE') or die("Access Denied.");
Loader::model('user_list');
$av = Loader::helper('concrete/avatar');

// Filter to show only the staff members, or customize
// by 'custom template' and choose a block name
$ul = new UserList;
$ul->filterByGroup((string) $this->getBlockObject()->getBlockName() ?: 'Staff');
$ul->sortBy('ak_order', 'asc');

/**
 * Build doc with all the 'member's in it, and load the values we'll
 * need to display.
 */
$doc = new DOMDocument;
foreach ($ul->get(100) as $staffMember) {
    $member = $doc->appendChild($doc->createElement('member'));
    $avatar = $av->getImagePath($staffMember);
    if ($avatar) {
        $member->setAttribute('background', $avatar);
    } else {
        $member->setAttribute(
            'placeholder',
            'placeholder' . (ord($staffMember->getUserID()) % 3)
        );
    }
    $member->setAttribute('shortbio', 
        $staffMember->getAttribute('first_name') . ' ' . $staffMember->getAttribute('last_name') . ', ' . ($staffMember->getAttribute('job_title') ?: 'Jane\'s Walk')
    );
    $member->setAttribute('email', $staffMember->getUserEmail());
    $member->setAttribute('bio', $staffMember->getAttribute('bio'));
}

// Load the XSL and apply stylesheet
$xsl = new XSLTProcessor;
$xsl->importStyleSheet(DOMDocument::load(substr(__FILE__, 0, -3) . 'xsl'));
$doc = $xsl->transformToDoc($doc); 

// Load the content into the DOM. Typically a header above the staff list
$content = DOMDocument::loadHTML($controller->getContent(), LIBXML_HTML_NOIMPLIED)->documentElement;
$content = $doc->importNode($content, true);
// insertBefore, as content should come before the staff list
$doc->insertBefore($content, $doc->firstChild);

// Stream out the rendered doc.
// TODO: move to building a whole DOC of site, so return instead of echo
// TODO: Use helpers for all this repeated XSLT code
$doc->saveHTMLFile('php://output');
