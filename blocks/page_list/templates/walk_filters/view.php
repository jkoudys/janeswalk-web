<?php
defined('C5_EXECUTE') || die('Access Denied.');

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
?>
<div id="janeswalk-walk-filters"></div>
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        JanesWalk.event.emit('walks.receive', <?= json_encode($cards) ?>, {filters: <?= json_encode($filters) ?>});
    });
</script>
