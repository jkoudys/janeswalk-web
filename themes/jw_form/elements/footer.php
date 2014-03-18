<?php  defined('C5_EXECUTE') or die("Access Denied."); 
$sitewide_theme = PageTheme::getByHandle('janeswalk');
$theme_path = str_replace('concrete/','',$this->getThemePath()); // TODO. Bad upgrade.
?>
    <div id="progress" style="z-index: -1;"></div>
    <div class="progress-spinner"></div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="//use.typekit.net/lxq4ddc.js"></script>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM&sensor=false"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/wysihtml5/0.3.0/wysihtml5.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.transit/0.9.9/jquery.transit.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.9.3/typeahead.min.js"></script>
    <script src="<?=$sitewide_theme->getThemeUrl()?>/js/v2/extend.js" type="text/javascript"></script>
    <script src="<?=$theme_path;?>/js/libs.js" type="text/javascript"></script>
    <script src="<?=$theme_path;?>/js/gmaps.js" type="text/javascript"></script>
    <script src="<?=$theme_path;?>/js/main.js" type="text/javascript"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  </body>
</html>

