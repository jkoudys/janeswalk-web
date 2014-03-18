<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$this->inc('elements/header.php'); ?>

<body class="full<?php $dh->canRead() and print ' logged_in'; $c->isEditMode() and print ' c5-edit' ?>" data-pageViewName='PageView'>
  <?php $this->inc('elements/navbar.php'); ?>
  <div id="central" class="no-sidebar">
    <div id="body">	
      <?php (new Area('Main'))->display($c); ?>
    </div>
    <div id="full">	
      <?php (new Area('Full'))->display($c); ?>
    </div>
  </div>
  <?php $this->inc('elements/footer.php'); ?>

