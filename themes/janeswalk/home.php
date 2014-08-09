<?php
use \JanesWalk\Helpers\DOMHelper;

defined('C5_EXECUTE') or die(_('Access Denied.'));

$c->domInit();
$c->domLoadAreas(
    array(
        'Intro',
        'Map',
        'Call to Action',
        'Blog Header',
        'Blog',
        'Twitter'
    )
);

$c->domIncludeXsl(substr(__FILE__, 0, -3) . 'xsl');

$c->domRenderTemplate();

