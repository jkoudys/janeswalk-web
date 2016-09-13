<?php
/**
 * The original pagelist has some funny mixing of echo w/ inline HTML, as well
 * as mixing logic to put out end-tags. This has been very error-prone, so let's
 * just build a JSON instead, to manage the control logic nicely
 */

$countryList = [];
foreach ($pages as $city) {
    $pcID = (int) $city->getCollectionParentID();
    if (!isset($countryList[$pcID])) {
        $country = Page::getByID($pcID);
        $countryList[$pcID] = [
            'id' => $pcID,
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

// Add as JSON for client data
// TODO: use generalized addToJanesWalk
?>
<script type="text/javascript">window.JanesWalk = window.JanesWalk || {}; window.JanesWalk.countries = <?= json_encode(array_values($countryList)) ?>;</script>
<div id="ccm-jw-page-list-typeahead"></div>
