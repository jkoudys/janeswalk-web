<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$th = Loader::helper('theme');
$im = Loader::helper('image');
$u = new User();
$rssUrl = $showRss ? $controller->getRssUrl($b) : '';
$show = $_REQUEST['show'];
//Note that $nh (navigation helper) is already loaded for us by the controller (for legacy reasons)

foreach($pages as $key => $page) {
if($key == 9 && $show!="all") { break; }
?>
<div class="span<?=($show == "all") ? "3" : "4" ?> walk">
  <a href="<?=$nh->getCollectionURL($page) ?>">
    <div class="thumbnail">
      <?=($thumb = $page->getAttribute("thumbnail")) ? "<div class='walkimage' style='background-image:url({$im->getThumbnail($thumb,380,720)->src})' ></div>":'';?>
      <div class="caption">
        <h4><?=$page->getCollectionName()?></h4>
        <?php $scheduled = $page->getAttribute('scheduled');$slots = (Array)$scheduled['slots']; 
        if($scheduled['open']) { ?>
          <h6><i class="icon-calendar"></i> Open schedule</h6>
        <?php } else if(isset($slots[0]['date'])) {  ?>
          <h6><i class="icon-calendar"></i> <?="{$slots[0]['time']}, {$slots[0]['date']}"; ?></h6>
        <?php } ?>
        <h6>
          <?php 
          foreach(json_decode($page->getAttribute('team')) as $key=>$mem) {
          echo ($key == 0 ? "Walk led by " : ($key > 0 ? ", " : "")) . "{$mem->{'name-first'}} {$mem->{'name-last'}}";
          } ?>
        </h6>
        <p>
          <?=$page->getAttribute('shortdescription')?>
        </p>
      </div>
      <ul class="inline tags">
        <?php foreach($page->getAttribute('theme') as $theme) { ?>
          <li class="tag" data-toggle="tooltip" title="<?=$th->getName($theme);?>"><?=$th->getIcon($theme);?></li>
        <?php } ?>
      </ul>
    </div>
  </a>
</div>
<?php 
} ?>
<?php  if ($showRss): ?>
  <div class="ccm-page-list-rss-icon">
    <a href="<?=$rssUrl ?>" target="_blank"><i class="icon-rss-sign"></i></a>
  </div>
  <link href="<?=BASE_URL.$rssUrl ?>" rel="alternate" type="application/rss+xml" title="<?=$rssTitle; ?>" />
<?php  endif; ?>

