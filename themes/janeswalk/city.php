<?php
defined('C5_EXECUTE') || die(_("Access Denied."));

$doc = $c->domInit();
$c->domLoadAreas(
    array(
        'City Description',
        'City Nav',
        'Sponsors',
        'All Walks List',
        'City Blog'
    )
);

// City name
$ce = $c->domCreateElement('City', (string) $city);

// Build our city organizer info
$co = $c->domCreateElement('CityOrganizer');
$co->setAttribute('href', $city->profile_path);
$co->setAttribute(
    'name',
    $city->city_organizer->getAttribute('first_name') .
    ' ' .
    $city->city_organizer->getAttribute('last_name')
);
$co->setAttribute('email', $city->city_organizer->getUserEmail());
$e = $co->appendChild($doc->createElement('Edit'));
$e->setAttribute('href', $this->url('/profile/edit'));

$contactMethods = [];
if ($city->facebook) $contactMethods[] = ['facebook', $city->facebook_url];
if ($city->twitter) $contactMethods[] = ['twitter', $city->twitter_url];
if ($city->website) $contactMethods[] = ['website', $city->website_url];
foreach ($contactMethods as $cm) {
    $e = $co->appendChild($doc->createElement('ContactMethod'));
    $e->setAttribute('name', $cm[0]);
    $e->setAttribute('href', $cm[1]);
}

// Edit in composer
if ($canEdit) {
    $e = $c->domCreateElement('Edit');
    $e->setAttribute('href', $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()));
}

$c->domIncludeXsl(substr(__FILE__, 0, -3) . 'xsl');

$c->domRenderTemplate();
