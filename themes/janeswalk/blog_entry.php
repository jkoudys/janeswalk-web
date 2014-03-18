<?php  defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php'); 
?>
	
<body class="<?= $pageType ?><?php $isLoggedIn and print " logged_in" ?>">
<?php $this->inc('elements/navbar.php'); ?>
	<div id="central">
    <header <?php $headImage and print "style='background-image:url({$headImage->src})'" ?>>
      <i class="backfade"></i>
      <?php (new Area('Blog Post Header'))->display($c); ?>
      <h1><?= $c->getCollectionName(); ?></h1>
      <p class="description"><?= $c->getCollectionDescription(); ?></p>
      <?php if($ui) { ?><p class="meta"><?= $authorName ?>, <strong><?= $publishDate ?></strong></p><?php } ?>
    </header>
		<div id="body">
      <article>
<?php
if ($canEdit) { ?>
        <a href='<?= $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()) ?>' style='margin-bottom:1em;display:block'><i class='icon-edit-sign'></i> edit</a>
<?php
}
(new Area('Main'))->display($c);
?>
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
