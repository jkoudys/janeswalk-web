<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$rssUrl = $showRss ? $controller->getRssUrl($b) : '';
$th = Loader::helper('text');
$ih = Loader::helper('image');
$dh = Loader::helper('date');
?>

<div class="ccm-page-list">
  <?php
  foreach ($pages as $page):
    $title = $th->entities($page->getCollectionName());
    $url = $nh->getLinkToCollection($page);
    $target = ($page->getCollectionPointerExternalLink() != '' && $page->openCollectionPointerExternalLinkInNewWindow()) ? '_blank' : $page->getAttribute('nav_target');
    $target = empty($target) ? '_self' : $target;
    $description = $th->entities($controller->truncateSummaries ? $th->shorten($description, $controller->truncateChars) : $page->getCollectionDescription());
    $date = $dh->date(DATE_APP_GENERIC_MDY_FULL, strtotime($page->getCollectionDatePublic()));
    $original_author = UserInfo::getByID($page->getCollectionUserID())->getAttribute('first_name');
    $mainImage = $page->getAttribute("main_image"); ?>

    <div class="col-md-3">
      <div class="thumbnail">
        <?php if(is_object($mainImage)) { ?>
          <a href="<?=$url?>"><img src='<?= $ih->getThumbnail($mainImage->getPath(), 270, 800, false)->src; ?>' alt='' /></a>
        <?php } ?>
        <div class="caption">
          <h5><a href="<?=$url?>" target="<?=$target?>"><?=$title?></a></h5>
          <?= $original_author ? "<h6>Posted by $original_author on $date</h6>" : null ?>
          <p>
          <?php 
          $sxml = new SimpleXMLElement("<html></html>");
          $blocks = $page->getBlocks("Main");
          if($blocks) {
            $article = $blocks[0]->getInstance();
            $article->export($sxml);
            echo $sxml;
          }
          ?>
          <?=$description?>&nbsp;<a href="<?=$url?>" target="<?=$target?>">[...]</a>
          </p>
        </div>
      </div>
    </div>
  <?php endforeach; ?>
</div><!-- end .ccm-page-list -->

