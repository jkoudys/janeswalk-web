<?php $this->inc('elements/header.php'); ?>
<?php $this->inc('elements/navbar.php'); ?>
<div id="page"></div>
<script>
    JanesWalk.event.emit('walkpage.load', <?= json_encode([
        'walk' => $w,
        'city' => $w->city,
        'canEdit' => (bool) $canEdit,
    ]) ?>);
</script>
<?php $this->inc('elements/footer.php'); ?>
