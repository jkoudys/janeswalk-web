<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <ul class="nav navbar-nav">
      <xsl:apply-templates select="nav-item"/>
    </ul>
  </xsl:template>
  <xsl:template match="nav-item">
    <li class="{@class}">
      <a href="{@href}" target="{@target}" class="{@class}">
        <xsl:value-of select="@name"/>
      </a>
      <xsl:apply-templates select="submenu"/>
    </li>
  </xsl:template>
  <xsl:template match="submenu">
    <ul>
      <xsl:apply-templates select="nav-item"/>
    </ul>
  </xsl:template>
</xsl:stylesheet>
