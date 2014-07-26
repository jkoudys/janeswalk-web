<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <ul class="ccm-staff-list">
      <xsl:apply-templates select="member"/>
    </ul>
  </xsl:template>
  <xsl:template match="member">
    <li>
      <div class="u-avatar {@placeholder}">
        <xsl:apply-templates select="@background"/>
      </div>
      <div class="ccm-staff-list-details">
        <h3>
          <xsl:value-of select="@shortbio"/>
        </h3>
        <a href="mailto:{@email}">
          <xsl:value-of select="@email"/>
        </a>
        <p class="ccm-staff-list-bio">
          <xsl:value-of select="@bio"/>
        </p>
      </div>
    </li>
  </xsl:template>
  <xsl:template match="@background">
    <xsl:attribute name="style">background-image:url(<xsl:value-of select="@background"/>)</xsl:attribute>
  </xsl:template>
</xsl:stylesheet>
