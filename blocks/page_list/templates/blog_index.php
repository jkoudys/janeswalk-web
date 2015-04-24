<?php
defined('C5_EXECUTE') or die("Access Denied.");
$rssUrl = $showRss ? $controller->getRssUrl($b) : '';
$th = Loader::helper('text');
$ih = Loader::helper('image');
$dh = Loader::helper('date');

?>
<ul class="ccm-page-list ccm-blog-index">
  <?php
  foreach ($pages as $page):
    $title = $th->entities($page->getCollectionName());
    $url = $nh->getLinkToCollection($page);
    $target = ($page->getCollectionPointerExternalLink() != '' && $page->openCollectionPointerExternalLinkInNewWindow()) ? '_blank' : $page->getAttribute('nav_target');
    $target = empty($target) ? '_self' : $target;
    $description = $th->entities($controller->truncateSummaries ? $th->shorten($description, $controller->truncateChars) : $page->getCollectionDescription());
    $date = $dh->date(DATE_APP_GENERIC_MDY_FULL, strtotime($page->getCollectionDatePublic()));
    $original_author = UserInfo::getByID($page->getCollectionUserID())->getAttribute('first_name');
    $mainImage = $page->getAttribute('main_image');
  ?>
    <li>
      <figure>
        <?php if (is_object($mainImage)) { ?>
          <a class="blogimage" href="<?= $url ?>" style="background-image:url(<?= $ih->getThumbnail($mainImage->getPath(), 500, 500, false)->src ?>)" /></a>
        <?php } ?>
        <figcaption>
          <h5><a href="<?= $url ?>" target="<?= $target ?>"><?= $title ?></a></h5>
          <?= $original_author ? ('<h6>Posted by ' . $original_author . ' on ' . $date . '</h6>') : null ?>
          <p>
          <?php
          $sxml = new SimpleXMLElement('<html/>');
          $blocks = $page->getBlocks('Main');
          if ($blocks) {
              $article = $blocks[0]->getInstance();
              $article->export($sxml);
              echo $sxml;
          }
          ?>
          <?= $description ?>&nbsp;<a href="<?= $url ?>" target="<?= $target ?>">[...]</a>
          </p>
        </figcaption>
      </figure>
    </li>
  <?php endforeach; ?>
</ul>
