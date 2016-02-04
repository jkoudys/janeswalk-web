<?php
// Give the human-readable name, and JS-usable key, for the filters
$filters = [];

if (count($themes)) {
    $filters['theme'] = ['name' => t('Theme'), 'data' => $themes];
}
if (count($wards)) {
    $filters['ward'] = ['name' => $wardName, 'data' => array_combine($wards, $wards)];
}
if (count($accessibilities)) {
    $filters['accessibility'] = ['name' => t('Accessibility'), 'data' => $accessibilities];
}
if (count($initiatives)) {
    $filters['initiative'] = ['name' => t('Initiative'), 'data' => $initiatives];
}
if (count($cities) > 1) {
    $filters['city'] = ['name' => t('Cities'), 'data' => $cities];
}
?>
<div id="janeswalk-walk-filters"></div>
<script type="text/javascript">
    JanesWalk.event.emit('filters.receive', <?= json_encode($filters) ?>);
    JanesWalk.event.emit('walks.receive', <?= json_encode($cards) ?>);
</script>
