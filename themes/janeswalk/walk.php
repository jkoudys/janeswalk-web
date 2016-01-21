<?php $this->inc('elements/header.php'); ?>
<?php $this->inc('elements/navbar.php'); ?>
<div id="page"></div>
<script>
    JanesWalk.event.emit('walk.receive', {});
</script>
<?php $this->inc('elements/footer.php'); ?>
