<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://concrete5.org/i18n" xmlns:php="http://php.net/xsl" version="1.0">
  <xsl:include href="../walkcards/view.xsl"/>
  <xsl:template match="Block[@name='page_list'][@template='walk_filters']">
    <ul class="nav nav-tabs">
      <li class="active">
        <a href="#jw-cards" data-toggle="tab">All Walks</a>
      </li>
      <li>
        <a href="#jw-list" data-toggle="tab">List</a>
      </li>
      <xsl:if test="Map">
        <li>
          <a href="#jw-map" data-toggle="tab">Map</a>
        </li>
      </xsl:if>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <section class="tab-pane active fade in" id="jw-cards">
        <div class="filters clearfix">
          <xsl:apply-templates select="filter"/>
        </div>
        <div class="initiatives hidden">
          <xsl:apply-templates select="initiative"/>
        </div>
        <div class="empty hidden">
          <xsl:value-of select="php:function('t','No walks found')"/>
          <br/>
          <xsl:value-of select="php:function('t','Try another region or theme')"/>
        </div>
        <xsl:apply-templates select="Walk" mode="Card"/>
      </section>
      <section class="tab-pane fade" id="jw-list">
        <table class="walklist table">
          <thead>
            <tr>
              <xsl:value-of select="php:function('t','Date')"/>
              <xsl:value-of select="php:function('t','Time')"/>
              <xsl:value-of select="php:function('t','Title')"/>
              <xsl:value-of select="php:function('t','Meeting Place')"/>
            </tr>
          </thead>
          <tbody>
            <xsl:apply-templates select="Walk" mode="List"/>
          </tbody>
        </table>
      </section>
      <xsl:apply-templates select="Map"/>
    </div>
  </xsl:template>
  <!-- TODO: showRSS -->
  <xsl:template match="Map">
    <section class="tab-pane fade" id="jw-map">
      <iframe width="100%" height="600px" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?q=select+col2+from+1Yy3SCGdCfmIVjgJLdqthaBlgKmkmIEJDZ3BEmR0p&amp;viz=MAP&amp;h=false&amp;lat={@lat + 0.2}&amp;lng={@lng - 0.6 }&amp;t=1&amp;z=10&amp;l=col2&amp;y=3&amp;tmplt=3&amp;hml=GEOCODABLE"/>
    </section>
  </xsl:template>
  <xsl:template match="filter">
    <div class="filter clearfix">
      <label for="{@type}">
        <xsl:value-of select="text()"/>
      </label>
      <div class="options">
        <select name="{@type}" id="{@type}">
          <option value="*">All</option>
          <xsl:for-each select="ward">
            <option value="{.}">
              <xsl:value-of select="."/>
            </option>
          </xsl:for-each>
        </select>
      </div>
    </div>
  </xsl:template>
  <xsl:template match="initiative">
    <div class="initiative hidden" data-jw-initiative="@name">
      <div class="headline">What is <xsl:value-of select="@name"/>?</div>
      <p>
        <xsl:value-of select="@description"/>
      </p>
      <div class="subheadline">Event dates:</div>
      <ul class="dates">
        <xsl:for-each select="date">
          <li>
            <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </ul>
    </div>
  </xsl:template>
  <xsl:template match="Walk" mode="List">
    <tr data-janeswalk-sort="{position()}">
      <td>
        <xsl:value-of select="date"/>
      </td>
      <td>
        <xsl:value-of select="time"/>
      </td>
      <td>
        <a href="{@href}" target="_blank">
          <xsl:value-of select="Title"/>
        </a>
      </td>
      <td>
        <xsl:value-of select="MeetingPlace"/>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
