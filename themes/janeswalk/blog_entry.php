<?php  defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$im = Loader::helper('image');
$this->inc('elements/header.php'); 
$headImage = $c->getAttribute("main_image");
?>
	
<body class="blog <?=($dh->canRead()) ? "logged_in" : ""; ?>">
<?php $this->inc('elements/navbar.php'); ?>
	<div id="central">
    <header <?= is_object($headImage) ? "style='background-image:url({$headImage->getURL()})'" : "" ?>>
      <i class="backfade"></i>
      <?php $ai = new Area('Blog Post Header'); $ai->display($c); ?>
      <h1><?=$c->getCollectionName(); ?></h1>
      <p class="description"><?=$c->getCollectionDescription(); ?></p>
      <p class="meta"><?="{$c->getVersionObject()->getVersionAuthorUserName()} <em>on</em> <strong>{$c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL)}</strong>"?></p>	
    </header>
		<div id="body">
      <article>
				<?php 
        if (is_object(ComposerPage::getByID($c->getCollectionID()))) { echo "<a href='{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}'<i class='icon-edit-sign'></i> edit</a>"; }
        $as = new Area('Main'); $as->display($c); ?>
      </article>
		</div>
	</div>

<?php  $this->inc('elements/footer.php'); ?>
