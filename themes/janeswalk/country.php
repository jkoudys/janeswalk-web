<?php
$bodyData = [];
$bodyData['classes'][] = 'full';
$this->controller->set('bodyData', [
    'classes' => ['full'],
]);

$this->inc('elements/header.php');
$this->inc('elements/navbar.php'); ?>
  <div id="central" class="no-sidebar">
    <div id="body">
      <?php (new Area('Main'))->display($c) ?>
      <?php (new Area('Full'))->display($c) ?>
    </div>
  </div>
  <?php $this->inc('elements/footer.php') ?>
