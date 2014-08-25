<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" xmlns:php="http://php.net/xsl" version="1.0">
  <xsl:include href="elements/header.xsl"/>
  <xsl:include href="elements/footer.xsl"/>
  <xsl:include href="elements/navbar.xsl"/>
  <xsl:template match="Page">
    <xsl:call-template name="jw-header"/>
    <body class="home {@logged-in}" data-pageViewName="HomePageView" data-backgroundImageUrl="{@background-url}">
      <xsl:call-template name="jw-navbar"/>
      <div class="backgroundImageBanner faded"/>
      <div class="intro full">
        <div class="callouts">
          <blockquote class="homepage-callout2">
            <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Intro')"/>
          </blockquote>
        </div>
      </div>
      <!-- end of .intro -->
      <div class="overlap" id="getinvolved">
        <xsl:if test="not($isMobile)">
          <ul class="controls">
            <li>
              <a class="showButton">Show Map <br/><i class="fa fa-chevron-down"/></a>
              <a class="closeButton" style="display:none">Close Map <br/><i class="fa fa-chevron-up"/></a>
            </li>
          </ul>
          <section class="map full">
            <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Map')"/>
          </section>
        </xsl:if>
        <section class="calltoaction full">
          <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Call to Action')"/>
        </section>
      </div>
      <section class="blog full">
        <div>
          <section class="walkblog">
            <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Blog Header')"/>
            <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Blog')"/>
          </section>
          <section class="twitter">
            <h3>Twitter</h3>
            <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Twitter')"/>
          </section>
        </div>
      </section>
      <section class="sponsors full">
        <xsl:apply-templates select="php:function('DOMHelper::includeArea', 'Sponsors')"/>
      </section>
      <xsl:call-template name="jw-footer"/>
    </body>
  </xsl:template>
</xsl:stylesheet>
