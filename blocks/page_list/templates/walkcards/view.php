<?php 
defined('C5_EXECUTE') or die('Access Denied.');

echo $this->controller->renderCards($cards);

if ($showRss) {
?>
<div class="ccm-page-list-rss-icon">
  <a href="<?= ($rssUrl) ?>" target="_blank"><i class="icon-rss-sign"></i></a>
</div>
<link href="<?= (BASE_URL.$rssUrl) ?>" rel="alternate" type="application/rss+xml" title="<?= ($rssTitle) ?>" />
<?php
}
