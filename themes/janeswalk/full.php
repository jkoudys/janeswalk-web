<?php
defined('C5_EXECUTE') or die("Access Denied.");

$bodyData = [];
$bodyData['classes'][] = 'full';
$this->controller->set('bodyData', $bodyData);
$this->inc('elements/header.php');
$this->inc('elements/navbar.php'); ?>
  <div id="central" class="no-sidebar">
    <div id="body">
      <?php (new Area('Main'))->display($c); ?>
    </div>
    <div id="full">
      <?php (new Area('Full'))->display($c); ?>
    </div>
  </div>
  <?php $this->inc('elements/footer.php'); ?>
