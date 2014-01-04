<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$this->inc('elements/header.php'); ?>
	
<body class="full <?php echo ($dh->canRead()) ? "logged_in" : ""; ?> <?php echo $c->isEditMode() ? "c5-edit" : "" ?>">
  <?php $this->inc('elements/navbar.php'); ?>
	<div id="central" class="no-sidebar">
		<div id="body">	
			<?php (new Area('Main'))->display($c); ?>
		</div>
		<div id="full">	
			<?php (new Area('Full'))->display($c); ?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

