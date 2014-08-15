<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template name="jw-navbar">
    <header class="navbar navbar-fixed-top {$isEditMode} {$isSearching}">
      <div class="container">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <i class="fa fa-bars"/>
        </button>
        <a href="/">
          <span class="navbar-brand hide-text logo">Jane's Walk</span>
        </a>
        <nav class="navbar-collapse collapse" role="navigation">
          <xsl:apply-templates select="area[@name='Left Header']"/>
          <ul class="nav navbar-nav col-md-pull-12">
            <li>
              <a class="search-open">
                <i class="fa fa-search"/>
              </a>
              <a class="search-close">
                <i class="fa fa-search"/>
              </a>
            </li>
            <xsl:apply-templates select="profile/menuitem"/>
            <li>
              <a href="{donate/@href}" id="donate" class="btn btn-primary btn-large donate">
                <xsl:value-of select="donate"/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="navbar-outer">
        <xsl:apply-templates select="area[@name='Dropdown']"/>
      </div>
    </header>
    <div class="overlay o-connect">
      <div class="o-background"/>
      <div class="o-content"><h1>Create a walk</h1><a href="{profile/@login}" class="btn btn-primary">Log in</a> or
        <a href="{profile/@register}" class="btn btn-primary">Join</a>
        to create a walk
      </div>
    </div>
  </xsl:template>
  <xsl:template match="menuitem">
    <li>
      <a href="{@href}">
        <xsl:value-of select="@name"/>
      </a>
    </li>
  </xsl:template>
</xsl:stylesheet>
