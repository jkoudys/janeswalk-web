<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$th = Loader::helper('text');
$av = Loader::helper('concrete/avatar');
//$ih = Loader::helper('image'); //<--uncomment this line if displaying image attributes (see below)
//Note that $nh (navigation helper) is already loaded for us by the controller (for legacy reasons)
?>
<?php foreach ($pages as $page): ?>
<h2 class="ccm-page-list-header"><?=$page->getCollectionName();?></h2>
<ul class="ccm-page-list-owners">
<?php
  $cities = new PageList();
  $cities->filterByCollectionTypeHandle('city');
  $cities->filterByParentID($page->getCollectionID());
  foreach($cities->get(1000) as $city) {
    $page_owner = UserInfo::getByID($city->getCollectionUserID());
    if($page_owner->getUserID() > 1 && $page_owner->getUserID() != 103 && $page_owner->getAttribute('first_name')) {
    ?>
      <section class="city-organizer">
        <h3><?=$city->getCollectionName()?></h3>
        <?php if($avatar = $av->getImagePath($page_owner)) { echo "<div class='u-avatar' style='background-image:url({$avatar})'></div>"; } 
        else { echo "<div class='u-avatar' style='background-image:url({$this->getThemePath()}/img/walk-organizer.png)'></div>"; } ?>
        <div class="city-organizer-details">
          <?="<h3>{$page_owner->getAttribute('first_name')} {$page_owner->getAttribute('last_name')}</h3><h4>City Organizer</h4>" ?>
          <div class="btn-toolbar">
            <a href="mailto:<?=$page_owner->getUserEmail()?>" class="btn"><i class="icon-envelope-alt"></i></a>
            <?php if($website = $page_owner->getAttribute('website')) { ?><a href="<?=$website?>" target="_blank" class="btn"><i class="icon-external-link"></i></a><?php } ?>
            <?php if($facebook = $page_owner->getAttribute('facebook')) { ?><a href="http://facebook.com/<?=$facebook?>" target="_blank" class="btn"><i class="icon-facebook"></i></a><?php } ?>
            <?php if($twitter = $page_owner->getAttribute('twitter')) { ?><a href="http://twitter.com/<?=$twitter?>" target="_blank" class="btn"><i class="icon-twitter"></i></a><?php } ?>
          </div>
        </div>
      </section>
    <?php
    }
  }
echo '</ul>';
endforeach; ?>

