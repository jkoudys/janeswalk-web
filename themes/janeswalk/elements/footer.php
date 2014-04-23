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
    <script src="<?=$this->getThemePath()?>/js/js-url.min.js"></script>
    <script src="<?=$this->getThemePath()?>/js/jquery.cookie.js"></script>

    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM&sensor=false"></script>
    <script src="//google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js" async></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/spin.js/1.3.3/spin.min.js"></script>
    <script src="<?=$this->getThemePath()?>/js/jquery.calendar.js"></script>
    <script src="//cdn.jsdelivr.net/jquery.mcustomscrollbar/2.8.1/jquery.mCustomScrollbar.min.js"></script>
    <script src="<?=$this->getThemePath()?>/js/Eventbrite.jquery.js"></script>  

    <?php /* v2 (onassar) */ ?>
    <script src="<?=$this->getThemePath()?>/js/app.js" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/extend.js" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/FacebookShareDialog.js?1" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/View.js?1" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/views/Page.js?1" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/views/pages/Home.js?1" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/views/pages/City.js?1" type="text/javascript"></script>
    <script src="<?=$this->getThemePath()?>/js/v2/views/pages/Walk.js?1" type="text/javascript"></script>

    <?php Loader::element('footer_required'); ?>
  </body>
</html>

