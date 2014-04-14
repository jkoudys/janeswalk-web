<?php 
defined('C5_EXECUTE') or die('Access Denied.');

// Loop over the walks
foreach($pages as $key => $page) {
  if($key == 9 && $show !== 'all') { // TODO: this sucks.
    break;
  }
  extract($controller->getCardData($page));
?>
<div class="span<?= ($show === 'all' ? '3' : '4') ?> walk">
  <script type="text/javascript">
  JanesWalkData.walks.push({
    wards: <?= ($wards) ?>,
    themes: <?= ($themes) ?>,
    accessibilities: <?= ($accessibilities) ?>,
    initiatives: <?= ($initiatives) ?>,
    datetimes: <?= $datetimes ?>
  });
  </script>
  <a href="<?= ($nh->getCollectionURL($page)) ?>">
    <div class="thumbnail">
      <div class='walkimage <?= $placeholder ?>' <?= $cardBg ? "style='background-image:url($cardBg)'" : '' ?>></div>
      <div class="caption">
        <h4><?= Loader::helper('text')->shortText($page->getCollectionName(), 45) ?></h4>
        <ul class="when">
<?php
  foreach($when as $slot) { ?>
          <li><i class="icon-calendar"></i> <?= $slot ?></li>
<?php 
  }
?>
        </ul>
<?php
if($leaders) { ?>
        <h6>
          Walk led by <?= Loader::helper('text')->shortText($leaders) ?>
        </h6>
<?php 
} ?>
        <p><?= Loader::helper('text')->shortText($page->getAttribute('shortdescription'), 115) ?></p>
      </div>
      <ul class="inline tags">
<?php
foreach($page->getAttribute('theme') as $theme) {
?>
        <li class="tag" data-toggle="tooltip" title="<?=$th->getName($theme);?>"><?=$th->getIcon($theme);?></li>
<?php
}
?>
      </ul>
    </div>
  </a>
</div>
<?php
}
if ($showRss) {
?>
<div class="ccm-page-list-rss-icon">
  <a href="<?= ($rssUrl) ?>" target="_blank"><i class="icon-rss-sign"></i></a>
</div>
<link href="<?= (BASE_URL.$rssUrl) ?>" rel="alternate" type="application/rss+xml" title="<?= ($rssTitle) ?>" />
<?php
}
