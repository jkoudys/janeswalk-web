<?php
//use JanesWalk\Helpers\DOMHelper;

defined('C5_EXECUTE') or die(_('Access Denied.'));

require_once(DIR_BASE . '/helpers/DOMHelper.php');

$c->initDOM();
DOMHelper::includeXSL($c, substr(__FILE__, 0, -3) . 'xsl');
DOMHelper::outputTemplate($c);

