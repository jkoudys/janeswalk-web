<?php
defined('C5_EXECUTE') || die('Access Denied.');
$th = Loader::helper('text');
$av = Loader::helper('concrete/avatar');
$ih = Loader::helper('image');
?>
<?php foreach ($pages as $page): ?>
<h2 class="ccm-page-list-header"><?=$page->getCollectionName();?></h2>
<ul class="ccm-page-list-owners">
<?php
  $cities = new PageList();
  $cities->filterByCollectionTypeHandle('city');
  $cities->filterByParentID($page->getCollectionID());
  foreach ($cities->get(1000) as $city) {
    $page_owner = UserInfo::getByID($city->getCollectionUserID());
    /* User 103 is special-cased as someone we don't want to show details for. May remove once data loaded. */
    if ($page_owner->getUserID() > 1 && $page_owner->getUserID() != 103 && $page_owner->getAttribute('first_name')) {
    ?>
      <section class="city-organizer">
        <h3><a href="<?=$nh->getLinkToCollection($city)?>"><?=$city->getCollectionName()?></a></h3>
        <a href="<?=$nh->getLinkToCollection($city)?>">
          <?php if ($avatar = $av->getImagePath($page_owner)) { ?>
            <div class='u-avatar' style='background-image:url(<?=$avatar?>)'></div>
          <?php } else { ?>
            <div class='u-avatar placeholder<?=ord($page_owner->getUserID()) % 3?>'></div>
          <?php } ?>
        </a>
        <div class="city-organizer-details">
          <?="<h3>{$page_owner->getAttribute('first_name')} {$page_owner->getAttribute('last_name')}</h3><h4>City Organizer</h4>" ?>
          <div class="btn-toolbar">
            <a href="mailto:<?=$page_owner->getUserEmail()?>" class="btn"><i class="fa fa-envelope-square"></i></a>
            <?php if ($website = $page_owner->getAttribute('website')) { ?><a href="<?=$website?>" target="_blank" class="btn"><i class="fa fa-external-link"></i></a><?php } ?>
            <?php if ($facebook = $page_owner->getAttribute('facebook')) { ?><a href="http://facebook.com/<?=$facebook?>" target="_blank" class="btn"><i class="fa fa-facebook"></i></a><?php } ?>
            <?php if ($twitter = $page_owner->getAttribute('twitter')) { ?><a href="http://twitter.com/<?=$twitter?>" target="_blank" class="btn"><i class="fa fa-twitter"></i></a><?php } ?>
          </div>
        </div>
      </section>
    <?php
    }
  }
echo '</ul>';
endforeach; ?>
