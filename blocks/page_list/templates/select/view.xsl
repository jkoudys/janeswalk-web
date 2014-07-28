<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="countries">
    <select class="pageListSelect">
      <xsl:apply-templates select="country">
        <xsl:sort/>
      </xsl:apply-templates>
    </select>
  </xsl:template>
  <xsl:template match="country">
    <optgroup label="{text()}">
      <xsl:apply-templates select="city"/>
    </optgroup>
  </xsl:template>
  <xsl:template match="city">
    <option value="{@href}">
      <xsl:value-of select="text()"/>
    </option>
  </xsl:template>
</xsl:stylesheet>
