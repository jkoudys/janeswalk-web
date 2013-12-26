<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
  <footer class="full" role="contentinfo">
    <div class="container">
      <div class="social-icons">
        <a href="http://twitter.com/janeswalk" target="_blank"><i class="icon-twitter"></i></a>
        <a href="http://facebook.com/janeswalk" target="_blank"><i class="icon-facebook-sign"></i></a>
      </div>
      <div>
        <?php $ah = new GlobalArea('Footer'); $ah->display($c); ?>
      </div>
    </div>
  </footer>
  <div id="progress" style="z-index: -1;"></div>
  <?php Loader::element('footer_required'); ?>
</body>
</html>

