<?php
defined('C5_EXECUTE') or die("Access Denied.");
$th = Loader::helper('text');

/**
 * The original pagelist has some funny mixing of echo w/ inline HTML, as well
 * as mixing logic to put out end-tags. This has been very error-prone, so let's
 * just build a DOMDocument instead, to manage the control logic nicely
 */
$doc = new DOMDocument;
$typeahead = $doc->appendChild($doc->createElement('div'));
$typeahead->setAttribute('class', 'ccm-page-list-typeahead');

// The whole <fieldset class="search"> box
$search = $typeahead->appendChild($doc->createElement('form'))->appendChild($doc->createElement('fieldset'));
$search->setAttribute('class', 'search');

// The search field
$inputSearch = $search->appendChild($doc->createElement('input'));
$inputSearch->setAttribute('type', 'text');
$inputSearch->setAttribute('name', 'selected_option');
$inputSearch->setAttribute('class', 'typeahead');
$inputSearch->setAttribute('placeholder', 'Find a Walk in which city?');
$inputSearch->setAttribute('autocomplete', 'off');

// Submit button
$inputSubmit = $search->appendChild($doc->createElement('input'));
$inputSubmit->setAttribute('type', 'submit');
$inputSubmit->setAttribute('value', 'Go');

// The dropdown list of countries/cities
$ul = $search->appendChild($doc->createElement('ul'));

/**
 * @var array[int id, string name] $countryNames
 * We were loading a _lot_ of countries, and it was slowing things down to grab
 * their Page object, and their name, 50k+ times in the sort + building the list.
 */
$countryNames = array();

// Sort city pages based on their country
uasort(
    $pages,
    function ($a,$b)
    {
        // Grab each city's country
        $ap = $a->getCollectionParentID();
        $bp = $b->getCollectionParentID();
        if ($ap === $bp) {
            // If they're in the same country, sort by city name
            return strcmp($a->getCollectionName(), $b->getCollectionName());
        } else {
            // Otherwise, sort into their country
            if(!isset($countryNames[$ap])) $countryNames[$ap] = Page::getByID($ap)->getCollectionName();
            if(!isset($countryNames[$bp])) $countryNames[$bp] = Page::getByID($bp)->getCollectionName();
            return strcmp($countryNames[$ap], $countryNames[$bp]);
        }
    }
);

// Show the country parent list and city pages
$lastCountryID = false;
foreach ($pages as $cityPage) {
    $countryID = Page::getByID($cityPage->getCollectionParentID())->getCollectionID();
    if ($countryID !== $lastCountryID) {
        $li = $ul->appendChild($doc->createElement('li'));
        $li->setAttribute('class', 'country');
        $div = $li->appendChild($doc->createElement('div', $countryNames[$countryID]));
        $div->setAttribute('class', 'name');
        $cityList = $ul->appendChild($doc->createElement('ul'));
        $cityList->setAttribute('class', 'cities');
        $lastCountryID = $countryID;
    }
    $city = $cityList->appendChild($doc->createElement('li'));
    $a = $city->appendChild($doc->createElement('a', $th->entities($cityPage->getCollectionName())));
    $a->setAttribute('href', $nh->getLinkToCollection($cityPage));
}

// Put the add new city option last
$li = $ul->appendChild($doc->createElement('li'));
$li->setAttribute('class', 'hidden aux');
$a = $li->appendChild($doc->createElement('a'));
// FIXME: Don't use a hard-coded URL here; grab it from the Page
$a->setAttribute('href', '/city-organizer-onboarding');
$a->appendChild($doc->createTextNode('Add '));
$span = $a->appendChild($doc->createElement('span'));
$span->setAttribute('rel', 'city.name');
$a->appendChild($doc->createTextNode(' to Jane\'s Walk'));

$doc->saveHTMLFile('php://output');
