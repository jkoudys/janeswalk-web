<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="countries">
    <div class="ccm-page-list-typeahead">
      <form>
        <fieldset class="search">
          <input type="text" name="selected_option" class="typeahead" placeholder="Find a Walk in which city?" autocomplete="off"/>
          <input type="submit" value="Go"/>
          <ul>
            <xsl:apply-templates select="country">
              <xsl:sort/>
            </xsl:apply-templates>
            <li class="hidden aux">
              <a href="/city-organizer-onboarding">Add <span rel="city.name"/> to Jane's Walk</a>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </xsl:template>
  <xsl:template match="country">
    <li class="country">
      <xsl:value-of select="text()"/>
      <ul class="cities">
        <xsl:apply-templates select="city"/>
      </ul>
    </li>
  </xsl:template>
  <xsl:template match="city">
    <li>
      <a href="{@href}">
        <xsl:value-of select="text()"/>
      </a>
    </li>
  </xsl:template>
</xsl:stylesheet>
