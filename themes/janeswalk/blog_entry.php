<?php  defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$im = Loader::helper('image');
$this->inc('elements/header.php'); 
$headImage = $c->getAttribute("main_image");
?>
	
<body class="blog <?php echo ($dh->canRead()) ? "logged_in" : ""; ?>">
<?php $this->inc('elements/navbar.php'); ?>
	<div id="central">
    <header <?php echo isset($headImage) ? 'style="background-image:url('.$headImage->getURL() .')"' : "" ?>>
      <?php  $ai = new Area('Blog Post Header'); $ai->display($c); ?>
      <h1><?php  echo $c->getCollectionName(); ?></h1>
      <p class="description"><?php echo $c->getCollectionDescription(); ?></p>
      <p class="meta"><?php 
        echo t('%s <em>on</em> <strong>%s</strong>',
          $c->getVersionObject()->getVersionAuthorUserName(),
          $c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL));
      ?></p>	
    </header>
		<div id="body">
      <article>
				<?php  $as = new Area('Main'); $as->display($c); ?>
      </article>
		</div>
	</div>

<?php  $this->inc('elements/footer.php'); ?>
