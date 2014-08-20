<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" xmlns:php="http://php.net/xsl" extension-element-prefixes="t" version="1.0">
  <xsl:include href="elements/header.xsl"/>
  <xsl:include href="elements/footer.xsl"/>
  <xsl:include href="elements/navbar.xsl"/>
  <xsl:template match="page">
    <xsl:call-template name="jw-header"/>
    <body class="home {@logged-in}" data-pageViewName="CityPageView" data-backgroundImageUrl="{@background-url}">
      <div id="fb-root"/>
      <script type="text/javascript">
      window.fbAsyncInit = function () {
        FB.init({
          appId: '544710848887303',
          status: true,
          xfbml: true
        });
      };
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/all.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>
      <xsl:call-template name="jw-navbar"/>
      <div class="container-outter" role="main">
        <div class="intro-city tk-museo-slab">
          <div class="container">
            <div class="city-header">
              <h1>
                <xsl:value-of select="city"/>
                <xsl:apply-templates select="Edit"/>
              </h1>
              <xsl:apply-templates select="php:function('Page::domLoadArea', 'City Header')"/>
              <xsl:apply-templates select="PhotoCredit"/>
              <xsl:apply-templates select="CityOrganizer"/>
            </div>
          </div>
        </div>
      </div>
      <div class="section3 city-city">
        <div class="container">
          <div class="row walk-select">
            <div class="col-md-4 action-items walk-preview fade in">
              <div class="item">
                <h2>Jane’s Walks</h2>
                <h4>Get out and walk! Explore, learn and share through a Jane’s Walk in <xsl:value-of select="City"/></h4>
                <xsl:apply-templates select="php:function('Page::domLoadArea', 'City Description')"/>
              </div>
              <div class="menu-flags box-sizing">
                <xsl:apply-templates select="php:function('Page::domLoadArea', 'City Nav')"/>
              </div>
              <xsl:apply-templates select="php:function('Page::domLoadArea', 'Sponsors')"/>
            </div>
            <div class="walks-list preview col-md-8 fade in">
              <h3>
                <xsl:value-of select="php:function('t','Walks in %s',city)"/>
              </h3>
              <!-- XXX only show if total walks > 1 -->
              <a class="see-all">
                <xsl:value-of select="php:function('t','see all %d walks',count(walk))"/>
              </a>
              <a href="{WalkForm/@href}" class="btn btn-primary create-walk btn-large"><i class="fa fa-star"/> Create a Walk</a>
              <div class="row">
          </div>
            </div>
            <div class="walks-list showall hide fade">
              <div class="row">
                <xsl:apply-templates select="php:function('Page::domLoadArea', 'All Walks List')"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <xsl:call-template name="jw-footer"/>
  </xsl:template>
  <xsl:template match="PhotoCredit">
    <p style="font-size: x-small; color: #fff;">Background photo credit:<a href="{@href}" target="_blank"><xsl:value-of select="@name"/></a></p>
  </xsl:template>
  <xsl:template match="Edit">
    <a href="{@href}">
      <i class="fa fa-pencil-square"/>
    </a>
  </xsl:template>
  <xsl:template match="blog">
    <div class="intro-city lower blog">
      <div class="container">
        <h2 class="title">
          <a href="{@href}">City Blog</a>
          <xsl:apply-templates select="PostArticle"/>
        </h2>
        <xsl:apply-templates select="php:function('Page::domLoadArea', 'City Blog')"/>
      </div>
    </div>
  </xsl:template>
  <xsl:template match="PostArticle">
    <a class="add" href="{@href}"><i class="fa fa-angle-double-right"/> post new article</a>
  </xsl:template>
  <xsl:template match="CityOrganizer">
    <section class="city-organizer">
      <xsl:apply-templates select="Avatar"/>
      <div class="city-organizer-details">
        <h3>
          <a href="{@href}">
            <xsl:value-of select="name"/>
          </a>
          <!-- TODO: make an edit element <?php if ($isCityOrganizer) { ?><a href="<?= $this->url('/profile/edit')?>"><i class='fa fa-pencil-square'></i></a> -->
        </h3>
        <h4>City Organizer</h4>
        <div class="btn-toolbar">
          <a href="mailto:{@email}" class="btn">
            <i class="fa fa-envelope-o"/>
          </a>
          <!-- TODO: this control logic sucks - make a generalized template -->
          <xsl:if test="ContactMethod[name='facebook']">
            <a href="{ContactMethod[name='facebook']/@href}" target="_blank" class="btn">
              <i class="fa fa-facebook"/>
            </a>
          </xsl:if>
          <xsl:if test="ContactMethod[name='twitter']">
            <a href="{ContactMethod[name='twitter']/@href}" target="_blank" class="btn">
              <i class="fa fa-twitter"/>
            </a>
          </xsl:if>
          <xsl:if test="ContactMethod[name='website']">
            <a href="{ContactMethod[name='website']/@href}" target="_blank" class="btn">
              <i class="fa fa-globe"/>
            </a>
          </xsl:if>
        </div>
      </div>
    </section>
  </xsl:template>
  <xsl:template match="Avatar">
    <a href="{@href}">
      <div class="u-avatar" style="background-image:url({@src})"/>
    </a>
  </xsl:template>
</xsl:stylesheet>
