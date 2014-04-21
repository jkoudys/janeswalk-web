<?php 
defined('C5_EXECUTE') or die('Access Denied.');

// A bit of a hack, but way cleaner than the URL parameter passing that was happening before.
// The 'show all walks' only appears if you have more than 9 walks, so this tells us we must
// be showing all walks.
$cardSize = 'span' . (sizeof($cards) > 9 ? 3 : 4);

// Loop over the walks
foreach($cards as $key => $card) {
  extract($card);
?>
<div class="<?= $cardSize ?> walk">
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
