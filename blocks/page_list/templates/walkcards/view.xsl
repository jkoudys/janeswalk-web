<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" xmlns:php="http://php.net/xsl" version="1.0">
  <xsl:template match="Block[@name='page_list'][@template='walkcards']">
    <xsl:apply-templates match="Walk" mode="Card"/>
  </xsl:template>
  <xsl:template match="Walk" mode="Card">
    <div class="md-col-3 walk">
      <a href="{@href}">
        <div class="thumbnail">
          <div class="walkimage placeholder{@cid mod 3}" style="background-image:url({@src})"/>
          <div class="caption">
            <h4>
              <xsl:value-of select="Title"/>
            </h4>
            <ul class="when">
              <xsl:apply-templates select="dateTime"/>
              <li>Meet at: <xsl:value-of select="MeetingPlace"/></li>
            </ul>
            <h6>
              <xsl:apply-templates select="Leader"/>
            </h6>
            <p>
              <xsl:value-of select="ShortDescription"/>
            </p>
          </div>
          <ul class="inline tags">
            <xsl:apply-templates select="Theme"/>
          </ul>
        </div>
      </a>
    </div>
  </xsl:template>
  <xsl:template match="dateTime">
    <li><i class="fa fa-calendar"/><xsl:value-of select="@time"/>, <xsl:value-of select="@date"/></li>
  </xsl:template>
  <xsl:template match="Theme">
    <li class="tag" data-toggle="tooltip" title="" data-original-title="Design">
      <i class="icon-pencil"/>
    </li>
  </xsl:template>
  <xsl:template match="Leader">
    <xsl:if test="position() = 1">Walk led by </xsl:if>
    <xsl:value-of select="."/>
    <xsl:if test="following-sibling::Leader">, </xsl:if>
  </xsl:template>
</xsl:stylesheet>
