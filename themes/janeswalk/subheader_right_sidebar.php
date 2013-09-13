<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php'); ?>

  <div id="central">
    <div id="subheader">
			<?php 
			$as = new Area('Subheader');
			$as->display($c);
			?>		
    </div>
		<div id="sidebar">
			<?php 
			$as = new Area('Sidebar');
			$as->display($c);
			?>		
		</div>
		
		<div id="body">	
			<?php 
			$a = new Area('Main');
			$a->display($c);
			?>
		</div>
	</div>

<?php  $this->inc('elements/footer.php'); ?>
