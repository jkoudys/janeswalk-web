<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$this->inc('elements/header.php'); ?>
	
<body class="full <?php echo ($dh->canRead()) ? "logged_in" : ""; ?>">
  <?php $this->inc('elements/navbar.php'); ?>
	<div id="central" class="no-sidebar">
		
		<div id="body">	
			<?php 
			
			$a = new Area('Main');
			$a->display($c);
			
			?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

