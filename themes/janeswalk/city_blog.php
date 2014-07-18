<?php
defined('C5_EXECUTE') or die("Access Denied.");
$nh = Loader::helper('navigation');
$parentPage = Page::getByID( $c->getCollectionParentID() );
$this->inc('elements/header.php'); ?>
	<div id="central" class="no-sidebar">

		<div id="body">
      <a href='<?=$nh->getCollectionURL($parentPage)?>'>Back to <?=$parentPage->getCollectionName()?> Walks</a>
      <h2>City Blog</h2>
      <h3><?=$parentPage->getCollectionName()?></h3>
      <?php (new Area('Main'))->display($c); ?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>
