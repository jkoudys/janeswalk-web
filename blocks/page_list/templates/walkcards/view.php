<?php
defined('C5_EXECUTE') or die('Access Denied.');

// This may be included by other templates which want to render a card with the same content

foreach ($cards as $walk) {
    $link = $nh->getLinkToCollection($walk->getPage());
    $placeholder = 'placeholder' . $walk->getPage()->getCollectionID() % 3;
    if ($walk->thumbnail) {
        $thumbnail = $im->getThumbnail($walk->thumbnail, 340, 720)->src;
    }
    /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
    if ($walk->meetingPlace) {
        $meetingText = Loader::helper('text')->shortText(
            $walk->meetingPlace['title'] ?: $walk->meetingPlace['description']
        );
    }
    if ($walk->walkLeaders) {
        $walkLeaders = implode(
            ', ',
            array_map(
                function ($leader) {
                    return trim($leader['name-first'] . ' ' . $leader['name-last']);
                },
                $walk->walkLeaders
            )
        );
    }
?>
<div class="walk">
    <a href="<?= $link ?>">
        <div class="thumbnail">
            <div class="walkimage <?= $placeholder ?>" style="background-image:url(<?= $thumbnail ?>)"></div>
            <div class="caption">
                <h4><?= Loader::helper('text')->shortText((string) $walk, 45) ?></h4>
                <ul class="when">
                    <?php foreach ($walk->datetimes as $slot) { ?>
                        <li><i class="fa fa-calendar"></i> <?= $slot['time'] . ', ' . $slot['date'] ?></li>
                    <?php } ?>
                    <li><?= t('Meet at %s', $meetingText) ?></li>
                </ul>
                <?php if ($walkLeaders) { ?>
                    <h6><?= t('Walk led by %s', $walkLeaders) ?></h6>
                <?php } ?>
                <p><?= Loader::helper('text')->shortText($walk->shortdescription, 115) ?></p>
            </div>
            <ul class="list-inline tags">
                <?php foreach ($walk->themes as $theme => $set) { ?>
                    <li class="tag" data-toggle="tooltip" data-theme="<?= $theme ?>" title="<?= ThemeHelper::getName($theme) ?>">
                        <?= ThemeHelper::getIcon($theme) ?>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </a>
</div>
<?php
    unset($thumbnail);
    unset($walkLeaders);
}
if ($showRss) {
?>
<div class="ccm-page-list-rss-icon">
    <a href="<?= ($rssUrl) ?>" target="_blank"><i class="fa fa-rss-square"></i></a>
</div>
<link href="<?= (BASE_URL.$rssUrl) ?>" rel="alternate" type="application/rss+xml" title="<?= ($rssTitle) ?>" />
<?php
}
