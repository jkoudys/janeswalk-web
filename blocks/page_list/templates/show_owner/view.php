<?php
defined('C5_EXECUTE') || die('Access Denied.');
$th = Loader::helper('text');
$av = Loader::helper('concrete/avatar');
$ih = Loader::helper('image');

$doc = new DOMDocument;
$pagesEl = $doc->appendChild($doc->createElement('pages'));

foreach ($pages as $page) {
    $pageEl = $pagesEl->appendChild($doc->createElement('page', $page->getCollectionName()));

    $cities = new PageList();
    $cities->filterByCollectionTypeHandle('city');
    $cities->filterByParentID($page->getCollectionID());
    foreach ($cities->get(1000) as $city) {
        $uid = (int) $city->getCollectionUserID();
        // We don't need to see the admin for every city she default-owns
        if($uid === 175 || $uid === 1) continue;

        $page_owner = UserInfo::getByID($uid);

        $cityEl = $pageEl->appendChild($doc->createElement('city', $city->getCollectionName()));
        $cityEl->setAttribute('href', $nh->getLinkToCollection($city));
        $cityEl->setAttribute('placeholder', 'placeholder' . (ord($page_owner->getUserID()) % 3));

        $avatar = $av->getImagePath($page_owner);
        if ($avatar) {
            $cityEl->setAttribute('background', $avatar);
        }

        $cityEl->setAttribute(
            'fullname',
            trim($page_owner->getAttribute('first_name') . ' ' . $page_owner->getAttribute('last_name'))
        );

        $cityEl->setAttribute('email', $page_owner->getUserEmail());

        // TODO: See if there's a nice XSLT templates way to shorten this,
        // or at least define the icons in the template
        $website = $page_owner->getAttribute('website');
        if ($website) {
            $contact = $cityEl->appendChild($doc->createElement('contact', 'website'));
            $contact->setAttribute('href', $website);
            $contact->setAttribute('icon', 'external-link');
        }
        $facebook = $page_owner->getAttribute('facebook');
        if ($facebook) {
            $contact = $cityEl->appendChild($doc->createElement('contact', 'facebook'));
            $contact->setAttribute('href', 'http://facebook.com/' . $facebook);
            $contact->setAttribute('icon', 'facebook');
        }

        $twitter = $page_owner->getAttribute('twitter');
        if ($twitter) {
            $contact = $cityEl->appendChild($doc->createElement('contact', 'twitter'));
            $contact->setAttribute('href', 'http://twitter.com/' . $twitter);
            $contact->setAttribute('icon', 'twitter');
        }
    }
}

// Load the XSL
$xsl = new XSLTProcessor;
$xsl->importStyleSheet(DOMDocument::load(__DIR__ . '/view.xsl'));

// Apply stylesheet and echo it out.
$xsl->transformToDoc($doc)->saveHTMLFile('php://output');
