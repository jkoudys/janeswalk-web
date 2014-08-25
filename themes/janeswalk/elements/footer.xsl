<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" xmlns:php="http://php.net/xsl" version="1.0">
  <xsl:template name="jw-footer">
    <footer class="full" role="contentinfo">
      <div class="container">
        <div class="social-icons">
          <a href="http://twitter.com/janeswalk" target="_blank">
            <i class="fa fa-twitter"/>
          </a>
          <a href="http://facebook.com/janeswalk" target="_blank">
            <i class="fa fa-facebook-sign"/>
          </a>
        </div>
        <div>
          <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Footer', 1)"/>
        </div>
      </div>
    </footer>
    <div id="progress" style="z-index: -1;"/>
    <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-29278390-1']);
    _gaq.push(['_trackPageview']);

    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    </script>
    <script type="text/javascript" src="//use.typekit.net/lxq4ddc.js"/>
    <script type="text/javascript">try {Typekit.load();} catch (e) {}</script>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM=false"/>
    <script src="//google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"/>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"/>
    <script src="{$themePath}/js/jquery.calendar.js"/>
    <script src="//cdn.jsdelivr.net/jquery.mcustomscrollbar/2.8.1/jquery.mCustomScrollbar.min.js"/>
    <script src="{$themePath}/js/Eventbrite.jquery.js"/>
    <script src="{$themePath}/js/janeswalk.min.js"/>
    <xsl:apply-templates select="php:function('DOMHelper::includeFragment', 'footer_required')"/>
  </xsl:template>
</xsl:stylesheet>
