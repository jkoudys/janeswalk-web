<?php  defined('C5_EXECUTE') or die("Access Denied."); 
?>
<script>
  $(document).ready(function() {
    $("a.delete").click(function(event) {
      event.preventDefault();
      var cid = $(this).data("cid");
      var url = $(this).attr("href");
      $.ajax({
        type: "DELETE",
        url: url,
        success: function() { location.reload(); }
      });
    });
  });
</script>
<div id="ccm-profile-wrapper">
  <?php Loader::element('profile/sidebar', array('profile'=> $profile)); ?>    
  <div id="ccm-profile-body">	
    <div id="ccm-profile-body-attributes">
      <div class="ccm-profile-body-item">
        <h1><?=$profile->getUserName()?></h1>
        <a href="<?= ($this->url('/profile/edit')) ?>" target="_self" class="btn btn-primary btn-large" style="margin-bottom: 10px;">Fill out your profile</a>
        <?php 
        foreach(UserAttributeKey::getPublicProfileList() as $ua) { ?>
        <div>
          <label><?=tc('AttributeKeyName', $ua->getAttributeKeyName())?></label>
          <?=$profile->getAttribute($ua, 'displaySanitized', 'display');?>
        </div>
        <?php  } ?>		
      </div>
    </div>
<?php 
          if($isProfileOwner) {
            if($home_city) { ?>
    <h3>
      <a href="<?= $nh->getCollectionURL($newWalkForm) ?>?parentCID=<?= $home_city->getCollectionID() ?>">
        Create a new walk in <?= $home_city->getCollectionName() ?>
      </a>
    </h3>
<?php
            }
            if($isCityOrganizer) {
?>
    <h3>Your <?= t2('City', 'Cities', sizeof($cityWalks)) ?></h3>
<?php
              foreach((array) $cityWalks as $cityWalk) { ?>
    <h4><a href="<?= $nh->getCollectionURL($cityWalk['city']) ?>"><?= $cityWalk['city']->getCollectionName() ?></a></h4>
    <ul class="walks">
<?php
                foreach((array) $cityWalk['walks'] as $page) { ?>
      <li>
        <a href='<?= $nh->getCollectionURL($page) ?>'><?= $page->getCollectionName() ?></a><a href='<?= $nh->getCollectionURL($newWalkForm) ?>?load=<?= $page->getCollectionPath() ?>'>
          <i class='icon-edit' alt='edit'></i>
        </a>
        <a href='<?= $nh->getCollectionURL($page) ?>' class='delete' data-cid='<?= $page->getCollectionID() ?>'>
          <i class='icon-remove' alt='unpublish'></i>
        </a>
      </li>
<?php
                } ?>
    </ul>
<?php
                if($cityWalk['inprogress']) { ?>
      <h4>In-Progress Walks</h4>
<ul>
<?php
                }
              foreach((array)$cityWalk['inprogress'] as $page) { 
                // Need to show the latest version
                $page = Page::getByID( $page->getCollectionID() );

                if($page->getCollectionName()) {?>
      <li>
        <?= $page->getCollectionName() ?>
        <a href='<?= $nh->getCollectionURL($newWalkForm) ?>?load=<?= $page->getCollectionPath() ?>'>
          <i class='icon-edit' alt='edit'></i>
        </a>
      </li>
<?php
                }
              }
            } ?>
    </ul>
<?php
          } ?>
    <h3>Your Public Walks</h3>
    <ul class="walks">
<?php
              foreach($publicWalks as $page) {
?>
      <li>
        <a href='<?= $nh->getCollectionURL($page) ?>'><?= $page->getCollectionName() ?></a><a href='<?= $nh->getCollectionURL($newWalkForm) ?>?load=<?= $page->getCollectionPath() ?>'>
          <i class='icon-edit' alt='edit'></i>
        </a>
        <a href='<?= $nh->getCollectionURL($page) ?>' class='delete' data-cid='<?= $page->getCollectionID() ?>'>
          <i class='icon-remove' alt='unpublish'></i>
        </a>
      </li>
<?php
              }
?>
    </ul>
<?php
            if(count($inProgressWalks) > 0) {
?>
    <h3>In-Progress Walks</h3>
    <ul>
<?php
              foreach($inProgressWalks as $page) {
                $latest = Page::getByID($page->getCollectionID());
?>
      <li><?= $latest->getCollectionName() ?> <a href='<?= $nh->getCollectionURL($newWalkForm) ?>?load=<?= $page->getCollectionPath() ?>'><i class='icon-edit'></i></a></li>
<?php
              } ?>
    </ul>
<?php
            }
          }
    $a = new Area('Main'); 
    $a->setAttribute('profile', $profile); 
    $a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
      $a->setBlockWrapperEnd('</div>');
    $a->display($c); 
    ?>
  </div>
</div>
