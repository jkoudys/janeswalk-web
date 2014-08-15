<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" extension-element-prefixes="t" version="1.0">
  <xsl:include href="elements/header.xsl"/>
  <xsl:include href="elements/footer.xsl"/>
  <xsl:include href="elements/navbar.xsl"/>
  <xsl:template match="page">
    <xsl:call-template name="jw-header"/>
    <body class="home {@logged-in}" data-pageViewName="HomePageView" data-backgroundImageUrl="{@background-url}">
      <xsl:call-template name="jw-navbar"/>
      <div class="backgroundImageBanner faded"/>
      <div class="intro full">
        <div class="callouts">
          <blockquote class="homepage-callout2">
            <xsl:apply-templates select="area[@name='Intro']"/>
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
            <xsl:apply-templates select="area[@name='Map']"/>
          </section>
        </xsl:if>
        <section class="calltoaction full">
          <xsl:apply-templates select="area[@name=string('Call to Action')]"/>
        </section>
      </div>
      <section class="blog full">
        <div>
          <section class="walkblog">
            <xsl:apply-templates select="area[@name=string('Blog Header')]"/>
            <xsl:apply-templates select="area[@name='Blog']"/>
          </section>
          <section class="twitter">
            <h3>Twitter</h3>
            <xsl:apply-templates select="area[@name='Twitter']"/>
          </section>
        </div>
      </section>
      <section class="sponsors full">
        <xsl:apply-templates select="area[@name='Sponsors']"/>
      </section>
      <xsl:call-template name="jw-footer"/>
    </body>
  </xsl:template>
</xsl:stylesheet>
