<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$page = Page::getCurrentPage();
$parentPage = Page::getByID( $page->getCollectionParentID() );
$this->inc('elements/header.php'); ?>
	
	<div id="central" class="no-sidebar">
		
		<div id="body">	
			<h2><?php echo $parentPage->getCollectionName(); ?> Walk Blog</h2>
			<?php 
			
			$a = new Area('Main');
			$a->display($c);
			
			?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

