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
  <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29278390-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

  </script>
  <div id="progress" style="z-index: -1;"></div>
  <?php Loader::element('footer_required'); ?>
</body>
</html>

