<?php  defined('C5_EXECUTE') or die("Access Denied.");
$dh = Loader::helper('concrete/dashboard');
$im = Loader::helper('image');
$this->inc('elements/header.php'); 
$headImage = $c->getAttribute("main_image");
$ui = UserInfo::getByID($c->getCollectionUserID());
?>
	
<body class="blog <?=($dh->canRead()) ? "logged_in" : ""; ?>">
<?php $this->inc('elements/navbar.php'); ?>
	<div id="central">
    <header <?= is_object($headImage) ? "style='background-image:url({$headImage->getURL()})'" : "" ?>>
      <i class="backfade"></i>
      <?php $ai = new Area('Blog Post Header'); $ai->display($c); ?>
      <h1><?=$c->getCollectionName(); ?></h1>
      <p class="description"><?=$c->getCollectionDescription(); ?></p>
      <?php if($ui) { ?><p class="meta"><?= ($first_name = $ui->getAttribute('first_name')) ? ("$first_name {$ui->getAttribute('last_name')}") : $ui->getUserObject()->getUserName()?>, <strong><?= $c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL)?></strong></p>	<?php } ?>
    </header>
		<div id="body">
      <article>
				<?php 
        if (is_object(ComposerPage::getByID($c->getCollectionID()))) { echo "<a href='{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}' style='margin-bottom:1em;display:block'><i class='icon-edit-sign'></i> edit</a>"; }
        $as = new Area('Main'); $as->display($c); ?>
      </article>
      <div class="well" style="clear: both;">
        <div id="disqus_thread"></div>
        <script type="text/javascript">
          /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
          var disqus_shortname = 'janeswalk'; // required: replace example with your forum shortname

          /* * * DON'T EDIT BELOW THIS LINE * * */
          (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>

      </div>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>
