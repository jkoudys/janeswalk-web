<?php
defined('C5_EXECUTE') or die("Access Denied.");
$th = Loader::helper('text');

/**
 * The original pagelist has some funny mixing of echo w/ inline HTML, as well
 * as mixing logic to put out end-tags. This has been very error-prone, so let's
 * just build a DOMDocument instead, to manage the control logic nicely
 */
$doc = new DOMDocument;

$countryList = array();
$countries = $doc->appendChild($doc->createElement('countries'));
foreach ($pages as $city) {
    $pcID = (int) $city->getCollectionParentID();
    if (!isset($countryList[$pcID])) {
        $countryList[$pcID] = $countries->appendChild(
            $doc->createElement(
                'country',
                Page::getByID($pcID)->getCollectionName()
            )
        );
    }
    $cityEl = $countryList[$pcID]->appendChild($doc->createElement('city', $city->getCollectionName()));
    $cityEl->setAttribute('href', $nh->getLinkToCollection($city));
}

// Load the XSL
$xsl = new XSLTProcessor;
$xsl->importStyleSheet(DOMDocument::load(__DIR__ . '/view.xsl'));

// Apply stylesheet and echo it out.
$xsl->transformToDoc($doc)->saveHTMLFile('php://output');

