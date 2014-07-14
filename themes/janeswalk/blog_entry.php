<?php  defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php'); 
?>
	
<body class="<?= $pageType . ($isLoggedIn ? ' logged_in' : '') ?>">
<?php $this->inc('elements/navbar.php'); ?>
	<div id="central">
    <header <?php $headImage and print "style='background-image:url({$headImage->src})'" ?>>
      <i class="backfade"></i>
      <?php (new Area('Blog Post Header'))->display($c); ?>
      <h1><?= $c->getCollectionName(); ?></h1>
      <p class="description"><?= $c->getCollectionDescription(); ?></p>
      <p class="meta"><?= $authorName ?>, <strong><?= $publishDate ?></strong></p>
    </header>
		<div id="body">
      <article>
<?php
if ($canEdit) { ?>
        <a href='<?= $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()) ?>' style='margin-bottom:1em;display:block'><i class='fa fa-pencil-square'></i> edit</a>
<?php
}
(new Area('Main'))->display($c);
?>
      </article>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>
