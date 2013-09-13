<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$page = Page::getCurrentPage();
$this->inc('elements/header.php'); ?>
	
	<div id="central" class="no-sidebar">
		
		<div id="body">	
			<h2><?php echo $page->getCollectionName(); ?> Walks</h2>
			<?php 
			
			$a = new Area('Main');
			$a->display($c);
			
			?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

