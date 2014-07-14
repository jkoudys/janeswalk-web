<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
    <footer class="full" role="contentinfo">
      <div class="container">
        <div class="social-icons">
          <a href="http://twitter.com/janeswalk" target="_blank"><i class="fa fa-twitter"></i></a>
          <a href="http://facebook.com/janeswalk" target="_blank"><i class="fa fa-facebook-sign"></i></a>
        </div>
        <div>
          <?php $ah = new GlobalArea('Footer'); $ah->display($c); ?>
        </div>
      </div>
    </footer>
    <div id="progress" style="z-index: -1;"></div>
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
    <script type="text/javascript" src="//use.typekit.net/lxq4ddc.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM&sensor=false"></script>
    <script src="//google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="<?=$this->getThemePath()?>/js/jquery.calendar.js"></script>
    <script src="//cdn.jsdelivr.net/jquery.mcustomscrollbar/2.8.1/jquery.mCustomScrollbar.min.js"></script>
    <script src="<?=$this->getThemePath()?>/js/Eventbrite.jquery.js"></script>  

    <script src="<?= $this->getThemePath() . (CONCRETE5_ENV === 'dev' ? '/js/janeswalk.js' : '/js/janeswalk.min.js') ?>"></script>

    <?php Loader::element('footer_required'); ?>
  </body>
</html>

