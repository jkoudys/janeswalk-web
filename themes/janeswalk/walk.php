<?php $this->inc('elements/header.php'); ?>
<?php $this->inc('elements/navbar.php'); ?>
<div id="page"></div>
<script>
    JanesWalk.event.emit('walkpage.load', {walk: <?= json_encode($w) ?>, city: <?= json_encode($w->city) ?>, canEdit: <?= $canEdit ?>});
</script>
<?php $this->inc('elements/footer.php'); ?>
