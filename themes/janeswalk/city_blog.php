<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$page = Page::getCurrentPage();
$nh = Loader::helper('navigation');
$parentPage = Page::getByID( $page->getCollectionParentID() );
$this->inc('elements/header.php'); ?>
	<div id="central" class="no-sidebar">
		
		<div id="body">	
			<?echo "<a href='{$nh->getCollectionURL($parentPage)}'>Back to {$parentPage->getCollectionName()} Walks</a><h2>{$parentPage->getCollectionName()} Walk Blog</h2>"; 
			$a = new Area('Main');
			$a->display($c);
			
			?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

