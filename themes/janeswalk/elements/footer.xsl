<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template name="jw-footer">
    <footer class="full" role="contentinfo">
      <div class="container">
        <div class="social-icons">
          <a href="http://twitter.com/janeswalk" target="_blank">
            <i class="fa fa-twitter"/>
          </a>
          <a href="http://facebook.com/janeswalk" target="_blank">
            <i class="fa fa-facebook-sign"/>
          </a>
        </div>
        <div>
          <xsl:apply-templates select="area[@name='Footer']"/>
        </div>
      </div>
    </footer>
    <xsl:apply-templates select="element[@name='footer_required']"/>
  </xsl:template>
</xsl:stylesheet>
