<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php'); ?>
<script src="<?php echo $this->getThemePath()?>/js/wiki.js"></script>


	<div id="central" class="central-left">
		<div id="sidebar">
			<?php 
			$as = new Area('Sidebar');
			$as->display($c);
			?>		
		</div>
		
		<div id="body">	
			<h1><?php  echo $c->getCollectionName(); ?></h1>
			<?php 

			$a = new Area('Main');
			$a->display($c);			
			?>
		</div>
		
	</div>

<?php  $this->inc('elements/footer.php'); ?>
