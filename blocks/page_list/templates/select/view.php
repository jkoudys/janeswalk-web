<?php
defined('C5_EXECUTE') || die('Access Denied.');

/**
 * The original pagelist has some funny mixing of echo w/ inline HTML, as well
 * as mixing logic to put out end-tags. This has been very error-prone, so let's
 * just build an Array instead, so we may migrate to React later
 */
$countryList = [];
foreach ($pages as $city) {
    $pcID = (int) $city->getCollectionParentID();
    if (!isset($countryList[$pcID])) {
        $country = Page::getByID($pcID);
        $countryList[$pcID] = [
            'name' => $country->getCollectionName(),
            'url' => $nh->getLinkToCollection($country),
            'cities' => []
        ];
    }
    $countryList[$pcID]['cities'][] = [
        'id' => $city->getCollectionID(),
        'name' => $city->getCollectionName(),
        'url' => $nh->getLinkToCollection($city)
    ];
}

uasort($countryList, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

// Using uncharacteristically functional-programming as preparation for
// migration to ReactJS
echo (
    '<select class="pageListSelect">' .
        join(array_map(function($country) { return 
            '<optgroup label="' . $country['name'] . '">' .
                join(array_map(function($city) { return
                     '<option value="' . $city['url'] . '">' . $city['name'] .'</option>';
                }, $country['cities'])) .
            '</optgroup>';
        }, $countryList)) .
    '</select>'
);
