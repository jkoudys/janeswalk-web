<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://earth.google.com/kml/2.2" version="1.0">
  <xsl:template match="map">
    <kml>
      <Document>
        <name><xsl:value-of select="name"/> : Jane's Walk</name>
        <Style id="jwhome">
          <IconStyle id="jwIcon">
            <Icon>
              <href>http://maps.google.com/mapfiles/kml/paddle/red-stars.png</href>
            </Icon>
          </IconStyle>
        </Style>
        <xsl:apply-templates select="marker"/>
        <Placemark>
          <LineString>
            <coordinates>
              <xsl:value-of select="route"/>
            </coordinates>
          </LineString>
        </Placemark>
      </Document>
    </kml>
  </xsl:template>
  <xsl:template match="marker[1]">
    <Placemark>
      <xsl:call-template name="marker"/>
      <styleUrl>#jwhome</styleUrl>
    </Placemark>
  </xsl:template>
  <xsl:template match="marker">
    <Placemark>
      <xsl:call-template name="marker"/>
    </Placemark>
  </xsl:template>
  <xsl:template name="marker">
    <name>
      <xsl:value-of select="@name"/>
    </name>
    <description>
      <xsl:value-of select="@description"/>
    </description>
    <Point>
      <coordinates><xsl:value-of select="@lng"/>,<xsl:value-of select="@lat"/></coordinates>
    </Point>
  </xsl:template>
</xsl:stylesheet>
