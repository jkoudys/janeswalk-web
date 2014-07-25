<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="page">
    <h2 class="ccm-page-list-header">
      <xsl:value-of select="text()"/>
    </h2>
    <ul class="ccm-page-list-owners">
      <xsl:apply-templates select="city"/>
    </ul>
  </xsl:template>
  <xsl:template match="city">
    <section class="city-organizer">
      <h3>
        <a href="{@href}">
          <xsl:value-of select="text()"/>
        </a>
      </h3>
      <a href="{@href}">
        <div class="u-avatar {@placeholder}">
          <xsl:apply-templates select="@background"/>
        </div>
      </a>
      <div class="city-organizer-details">
        <h3>
          <xsl:value-of select="@fullname"/>
        </h3>
        <h4>City Organizer</h4>
        <div class="btn-toolbar">
          <a href="mailto:{@email}" class="btn">
            <i class="fa fa-envelope-o"/>
          </a>
          <xsl:apply-templates select="contact"/>
        </div>
      </div>
    </section>
  </xsl:template>
  <xsl:template match="contact">
    <a href="{@href}" class="btn">
      <i class="fa fa-{@icon}"/>
    </a>
  </xsl:template>
  <xsl:template match="@background">
    <xsl:attribute name="style">background-image:url(<xsl:value-of select="@background"/>)</xsl:attribute>
  </xsl:template>
</xsl:stylesheet>
