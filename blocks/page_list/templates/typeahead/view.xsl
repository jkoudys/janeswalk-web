<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="countries">
        <div class="ccm-page-list-typeahead">
            <form>
                <fieldset class="search">
                    <input type="text" name="selected_option" class="typeahead" placeholder="Find a Walk in which city?" autocomplete="off" />
                    <input type="submit" value="Go" />
                    <ul>
                        <xsl:for-each select="country">
                            <li class="country">
                                <xsl:value-of select="text()" />
                                <ul class="cities">
                                    <xsl:for-each select="city">
                                        <li>
                                            <a href="{@href}">
                                                <xsl:value-of select="text()" />
                                            </a>
                                        </li>
                                    </xsl:for-each>
                                </ul>
                            </li>
                        </xsl:for-each>
                        <li class="hidden aux">
                            <a href="/city-organizer-onboarding">Add <span rel="city.name" /> to Jane's Walk</a>
                        </li>
                    </ul>
                </fieldset>
            </form>
        </div>
    </xsl:template>
</xsl:stylesheet>
