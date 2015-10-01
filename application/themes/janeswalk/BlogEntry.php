<?php
defined('C5_EXECUTE') || die('Access Denied.');
$bodyData = [];
$bodyData['classes'][] = 'blog';
$this->controller->set('bodyData', $bodyData);
/**
 * Content
 */
if ($headImage) {
    $bg = "style=\"background-image:url({$headImage->src})\"";
}

if ($canEdit) {
    $edit = <<< EOT
<a href="{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}" style='margin-bottom:1em;display:block'><i class='fa fa-pencil-square'></i> edit</a>
EOT;
}

/**
 * Components
 */
ob_start();
$this->inc('elements/header.php');
$this->inc('elements/navbar.php');
$Header = ob_get_clean();

ob_start();
$this->inc('elements/footer.php');
$Footer = ob_get_clean();

ob_start();
(new Area('Blog Post Header'))->display($c);
$BlogPostHeader = ob_get_clean();

ob_start();
(new Area('Main'))->display($c);
$Main = ob_get_clean();

echo <<< EOT
{$Header}
<div id="central">
    <header {$bg}>
        {$BlogPostHeader}
        <h1>{$c->getCollectionName()}</h1>
        <p class="description">{$c->getCollectionDescription()}</p>
        <p class="meta">{$authorName}, <strong>{$publishDate}</strong></p>
    </header>
    <div id="body">
        <article>
            {$edit}
            {$Main}
        </article>
    </div>
</div>
{$Footer}
EOT;
