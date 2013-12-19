<?php 
defined('C5_EXECUTE') or die("Access Denied.");
?>
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
    $description = $page->getCollectionDescription();
    $description = $controller->truncateSummaries ? $th->shorten($description, $controller->truncateChars) : $description;
    $description = $th->entities($description);     
    $date = $dh->date(DATE_APP_GENERIC_MDY_FULL, strtotime($page->getCollectionDatePublic()));
    $original_author = Page::getByID($page->getCollectionID(), 1)->getVersionObject()->getVersionAuthorUserName();
    $mainImage = $page->getAttribute("main_image"); ?>
          
    <div class="span3">
      <div class="thumbnail">
        <?php if(isset($mainImage)) {
          $thumb = $ih->getThumbnail($mainImage, 270, 800, false); ?>
          <img src="<?=$thumb->src ?>" alt="">
        <?php } ?>
        <div class="caption">
          <h5><a href="<?=$url?>" target="<?=$target?>"><?=$title?></a></h5>
          <h6>Posted by <?=$original_author?> on <?=$date?></h6>
          <p>
          <?php 
            $sxml = new SimpleXMLElement("<html></html>");
            $blocks = $page->getBlocks("Main");
            $article = $blocks[0]->getInstance();
            $article->export($sxml);
            echo $sxml;
            ?>
          <?=$page->getCollectionDescription()?>&nbsp;<a href="<?=$url?>" target="<?=$target?>">[...]</a>
          </p>
        </div>
      </div>
    </div>
  <?php endforeach; ?>
</div><!-- end .ccm-page-list -->

