<?php
use Concrete\Core\Legacy\TextHelper;
use Concrete\Core\Legacy\ImageHelper;
use Concrete\Core\Legacy\DateHelper;
use Concrete\Core\Legacy\NavigationHelper;

// Ordered list of common summary for all blogs
function summarize($page) {
    $title = TextHelper::entities($page->getCollectionName());
    $url = NavigationHelper::getLinkToCollection($page);

    $target = $page->getCollectionPointerExternalLink() &&
        $page->openCollectionPointerExternalLinkInNewWindow() ? '_blank' : $page->getAttribute('nav_target');

    $target = empty($target) ? '_self' : $target;

    $date = DateHelper::date(DATE_APP_GENERIC_MDY_FULL, strtotime($page->getCollectionDatePublic()));

    $author = UserInfo::getByID($page->getCollectionUserID())->getAttribute('first_name');

    $mainImage = $page->getAttribute('main_image');

    return [$title, $url, $target, $date, $author, $mainImage];
}

function bigCard($page) {
    list($title, $url, $target, $date, $author, $mainImage) = summarize($page);
    $ih = new ImageHelper();
    $description = TextHelper::entities($controller->truncateSummaries ?
        TextHelper::shorten($description, $controller->truncateChars) :
        $page->getCollectionDescription());

    $summary = '';
    $blocks = $page->getBlocks('Main');
    if ($blocks) {
        $blockInstance = $blocks[0]->getInstance();
        if (method_exists($blockInstance, 'getContent')) {
            $summary .= implode(' ', array_slice(explode(' ', strip_tags($blockInstance->getContent()), 80), 0, -1));
        }
    }

    $banner = is_object($mainImage) ? <<<EOT
<a href="{$url}">
    <img class="BlogIndex__banner" src="{$ih->getThumbnail($mainImage->getPath(), 500, 500, false)->src}">
</a>
EOT
    : '';

    $authorMsg = $author ? ('<h6>by ' . $author . '</h6>') : '';

    return <<<EOT
<div class="BlogIndex__bigcard">
    <figure>
        {$banner}
    </figure>
    <div class="BlogIndex__bigcard__text">
        <h5>{$date}</h5>
        <h3><a href="{$url}" target="{$target}">{$title}</a></h3>
        <p>
            {$description}
        </p>
        <p>
            {$summary}<a href="{$url}" target="{$target}">[...]</a>
        </p>
    </div>
</div>
EOT;
}

function smallCard($page) {
    list($title, $url, $target, $date, $author) = summarize($page);
    return <<<EOT
<div class="BlogIndex__smallcard">
    <h5>${date}</h5>
    <h4><a href="{$url}">{$title}</a></h4>
    <p>
        by {$author}
    </p>
</div>
EOT;
}

function mediumCard($page) {
    list($title, $url, $target, $date, $author, $mainImage) = summarize($page);
    $ih = new ImageHelper();

    $banner = is_object($mainImage) ? <<<EOT
<a
    href="{$url}"
>
    <img class="BlogIndex__banner" src="{$ih->getThumbnail($mainImage->getPath(), 500, 500, false)->src}">
</a>
EOT
    : '';

    return <<<EOT
<div class="BlogIndex__mediumcard">
    <div class="BlogIndex__mediumcard__head">
        {$banner}
    </div>
    <div class="BlogIndex__mediumcard__text">
        <div>
            <h3><a href="{$url}">{$title}</a></h3>
        </div>
        <div>
            <h5>{$date}</h5>
            by {$author}
        </div>
    </div>
</div>
EOT;
} 

function renderEntries(array $entries) {
    return implode('', array_map(function (array $set) {
        $big = implode('', array_map('bigCard', array_slice($set, 0, 1)));
        $small = implode('', array_map('smallCard', array_slice($set, 1, 3)));
        $medium = implode('', array_map('mediumCard', array_slice($set, 4, 1)));
        $foot = '';
        if (count($medium) > 0) $foot = <<<EOT
<div class="BlogIndex__break">
    <blockquote>
        <p>You can't opt out of geography</p>
        <cite>Daniel Rotsztain</cite>
    </blockquote>
    <div class="BlogIndex__article--med">{$medium}</div>
</div>
EOT;

        return <<<EOT
<div class="BlogIndex__articles">
    <div class="BlogIndex__article--main">{$big}</div>
    <div class="BlogIndex__article--sub">{$small}</div>
</div>
{$foot}
EOT;
    }, array_chunk($entries, 5)));
}
?>
<div class="ccm-page-list BlogIndex">
<?= renderEntries((array) $pages) ?>
</div>
