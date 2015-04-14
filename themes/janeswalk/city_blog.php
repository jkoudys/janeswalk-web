<?php
$nh = Loader::helper('navigation');
$parentPage = Page::getByID($c->getCollectionParentID());
$this->inc('elements/header.php'); ?>
<div id="city-blog" class="no-sidebar">
        <a href="<?= $nh->getCollectionURL($parentPage) ?>">Back to <?= $parentPage->getCollectionName() ?> Walks</a>
        <h2>City Blog</h2>
        <h3><?= $parentPage->getCollectionName() ?></h3>
        <?php (new Area('Main'))->display($c) ?>
</div>
<?php  $this->inc('elements/footer.php') ?>
