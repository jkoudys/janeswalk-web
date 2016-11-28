<?php
$v = View::getInstance();

$v->controller->set('bodyData', [
    'classes' => ['blog'],
]);

// Check if they own any other blogs that we can reblog to
if (count($otherBlogsOwned) > 0) {
    $blogTransfer = <<< EOT
<div>
    <a href="reblog/{$otherBlogsOwned[0]->getCollectionID()}">
        <i class="fa fa-retweet"></i> Re-blog on the {$otherBlogsOwned[0]->getCollectionName()}
    </a>
</div>
EOT;
}

if ($canEdit) {
    $editButton = <<< EOT
<div>
    <a
        href="{$v->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}"
        style="margin-bottom:1em;display:block"
    >
        <i class="fa fa-pencil-square"></i> edit
    </a>
</div>
EOT;
}

if ($headImage) {
    $styleAttr = 'style="background-image:url(' . $headImage->src . ')"';
}

// Render the page
$v->inc('elements/header.php');
$v->inc('elements/navbar.php');

?>
<div id="central">
    <header <?= $styleAttr ?>>
        <?php (new Area('Blog Post Header'))->display($c) ?>
        <h1><?= $c->getCollectionName() ?></h1>
        <p class="description"><?= $c->getCollectionDescription() ?></p>
        <p class="meta"><?= $authorName ?>, <strong><?= $publishDate ?></strong></p>
    </header>
    <div id="body">
        <article>
            <?= $editButton ?>
            <?= $blogTransfer ?>
            <?php (new Area('Main'))->display($c); ?>
        </article>
    </div>
</div>
<?php
$v->inc('elements/footer.php');
