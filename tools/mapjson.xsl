<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:str="http://exslt.org/strings" xmlns:kml="http://www.opengis.net/kml/2.2" version="1.0" extension-element-prefixes="str">
  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <!-- Drill down to the <Folder>, which describes the full map -->
  <xsl:template match="kml:kml">
    <xsl:apply-templates select="kml:Folder"/>
  </xsl:template>
  <xsl:template match="kml:kml">
    <xsl:apply-templates select="kml:Document"/>
  </xsl:template>
  <xsl:template match="kml:Document">
    <xsl:apply-templates select="kml:Folder[1]"/>
  </xsl:template>
  <!-- Format json-encoded sets of markers + route as arrays -->
  <xsl:template match="kml:Folder">{"markers":[<xsl:apply-templates select="kml:Placemark[not(.//kml:LineString)]"/>],"route":[<xsl:apply-templates select=".//kml:LineString"/>]}</xsl:template>
  <!-- Output a placemark with title, description, lat, and lng. Comma separated except the last one -->
  <xsl:template match="kml:Placemark">{"title":"<xsl:value-of select="normalize-space(kml:name)"/>","description":"<xsl:call-template name="escapeQuote"><xsl:with-param name="pText" select="kml:description"/></xsl:call-template>",<xsl:call-template name="lnglat"><xsl:with-param name="coordinates" select="str:tokenize(kml:Point/kml:coordinates, ',')"/></xsl:call-template>}<xsl:if test="following-sibling::*">,</xsl:if></xsl:template>
  <!-- Break apart the LineString, which is just a big string, to make lat + lng properties in the route -->
  <xsl:template match="kml:LineString">
    <xsl:for-each select="str:tokenize(kml:coordinates, ' ')">{<xsl:call-template name="lnglat"><xsl:with-param name="coordinates" select="str:tokenize(., ',')"/></xsl:call-template>}<xsl:if test="following-sibling::*">,</xsl:if></xsl:for-each>
  </xsl:template>
  <!-- Converts a <coordinates>123,456,0</coordinates> into "lat":123,"lng":456 -->
  <xsl:template name="lnglat"><xsl:param name="coordinates"/>"lng":<xsl:value-of select="$coordinates[1]"/>,"lat":<xsl:value-of select="$coordinates[2]"/></xsl:template>
  <!-- Escapes double quotes -->
  <xsl:template name="escapeQuote">
    <xsl:param name="pText" select="."/>
    <xsl:if test="string-length($pText) &gt;0">
      <xsl:value-of select="substring-before(concat($pText, '&quot;'), '&quot;')"/>
      <xsl:if test="contains($pText, '&quot;')">
        <xsl:text>\"</xsl:text>
        <xsl:call-template name="escapeQuote">
          <xsl:with-param name="pText" select="substring-after($pText, '&quot;')"/>
        </xsl:call-template>
      </xsl:if>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
