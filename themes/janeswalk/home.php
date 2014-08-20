<?php
defined('C5_EXECUTE') or die(_('Access Denied.'));
$c->domInit();
$c->domIncludeXsl(substr(__FILE__, 0, -3) . 'xsl');
$c->domRenderTemplate();
