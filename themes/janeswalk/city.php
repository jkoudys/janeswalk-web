<?php
defined('C5_EXECUTE') || die(_("Access Denied."));
$c->domIncludeXsl(substr(__FILE__, 0, -3) . 'xsl');

$c->domRenderTemplate();
