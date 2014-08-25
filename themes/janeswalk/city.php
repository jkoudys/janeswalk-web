<?php
defined('C5_EXECUTE') || die(_("Access Denied."));

DOMHelper::includeXSL($c, substr(__FILE__, 0, -3) . 'xsl');
DOMHelper::outputTemplate($c);
