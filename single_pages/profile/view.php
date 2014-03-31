<?php
  defined('C5_EXECUTE') or die('Access Denied.'); 
  define('IS_PROFILE', 1);
  $ui = UserInfo::getByID($u->getUserID());
  $cityTabViewable = false;
  $hasCreatedWalks = false;
  $this->addHeaderItem($html->javascript('swfobject.js'));
?>
  <style type="text/css">
    .wrapper {
      width: 960px;
      margin: 120px auto 60px;
    }
    .wrapper .nav {
      margin: 0;
    }
    .wrapper .content {
      border: solid #ddd;
      border-width: 0 1px 1px;
      padding: 40px;
    }
  </style>
  <div class="wrapper">
    <div class="steps">
      <div class="visual">
      </div>
      <div class="copy">
        <div class="success">
          You're ready for Jane's Walk 2014!
        </div>
        <div class="step hidden">
          Next Step: Share a story about walking in Toronto
        </div>
        <div class="step hidden">
          Next Step: Share a story about walking in Toronto
        </div>
        <div class="step hidden">
          Next Step: Share a story about walking in Toronto
        </div>
        <div class="step hidden">
          Next Step: Share a story about walking in Toronto
        </div>
        <div class="step hidden">
          Next Step: Share a story about walking in Toronto
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li class="active">
        <a href="/index.php/profile/#tab=dashboard" data-tab="dashboard">Dashboard</a>
      </li>
      <?php
        if ($cityTabViewable === true) {
      ?>
        <li class="">
          <a href="/index.php/profile/#tab=city" data-tab="city">City</a>
        </li>
      <?php
        }
      ?>
      <li class="">
        <a href="/index.php/profile/#tab=details" data-tab="details">Details</a>
      </li>
      <li class="">
        <a href="/index.php/profile/#tab=picture" data-tab="picture">Display Picture</a>
      </li>
      <li class="">
        <a href="/index.php/profile/#tab=resources" data-tab="resources">Resources</a>
      </li>
    </ul>
    <div class="content">
      <?php
        $dashboardClasses = array('block', 'dashboard');
        if ($cityTabViewable === true) {
          array_push($dashboardClasses, 'threeColumnLayout');
        }
      ?>
      <div id="dashboardBlock" class="<?= implode(' ', $dashboardClasses) ?>" data-tab="dashboard">
        <div class="column walks">
          <div class="headline">My Walks</div>
          <?php
            $nullcaseClasses = array('nullcase');
            if ($hasCreatedWalks === true) {
              array_push($nullcaseClasses, 'hidden');
            }
          ?>
          <div class="<?= implode(' ', $nullcaseClasses) ?>">
            <div class="copy">
              Explore Toronto at this year's 2014 Jane's Walk Festival
            </div>
            <a href="#" class="cta">Create Your First Walk</a>
          </div>
          <?php
            $walkListClasses = array();
            if ($hasCreatedWalks === false) {
              array_push($walkListClasses, 'hidden');
            }
          ?>
          <ul class="<?= implode(' ', $walkListClasses) ?>">
            <li>
              <div class="image">
                <img src="" />
              </div>
              <div class="title">
                <a href="#" title="">
                  Celluloid and Popcorn: The history of Cinema on Roncesvalles
                </a>
              </div>
              <div class="actions">
                <a href="#" class="promote">Promote</a>
                <a href="#" class="edit">Edit</a>
                <a href="#" class="delete">Delete</a>
              </div>
            </li>
            <li>
              <div class="image">
                <img src="" />
              </div>
              <div class="details">
                <div class="title">
                  <a href="#" title="">
                    <span class="label">DRAFT</span>
                    Celluloid and Popcorn: The history of Cinema on Roncesvalles
                  </a>
                </div>
                <div class="actions">
                  <a href="#" class="edit">Edit</a>
                  <a href="#" class="delete">Delete</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <?php
          if ($cityTabViewable === true) {
        ?>
          <div class="column city">
          <div class="headline">My City</div>
          </div>
        <?php
          }
        ?>
        <div class="column posts">
          <div class="headline">My Blog Posts</div>
        </div>
      </div>
      <div id="cityBlock" class="block hidden" data-tab="city">
      </div>
      <div id="detailsBlock" class="block hidden" data-tab="details">
      </div>
      <div id="pictureBlock" class="block hidden" data-tab="picture">
        <div class="column widget">
          <div id="flashContainer"></div>
        </div>
        <div class="column tips">
          <?php if ($ui->hasAvatar()) { ?>
            <a href="<?= ($this->action('delete')) ?>"><?= t('Remove your user avatar &gt;') ?></a>
          <?php } ?>
        </div>
      </div>
      <div id="resourcesBlock" class="block hidden" data-tab="resources">
      </div>
    </div>
  </div>
<!--
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
    <?php if($u->getUserID() == $profile->getUserID()) {
      $newWalkForm = Page::getByPath("/walk/form"); ?>
      <form class="simple" action="<?= $nh->getCollectionURL($newWalkForm) ?>" method="get" autocomplete="off" style="margin:0">
        <fieldset class="dropsubmit">
          <select name="parentCID" onchange="this.form.submit()">
            <option selected="selected">Submit a Walk to a City</option>
            <?php
            $cities = new PageList();
            $cities->filterByCollectionTypeHandle('city');
            $cities->sortByName();
            foreach($cities->get() as $city) {
            ?>
            <option value="<?=$city->getCollectionID()?>"><?=$city->getCollectionName()?></option>
            <?php } ?>
          </select> 
          <input type="submit" value="Go!">
        </fieldset>
      </form>
      <h3>Your Public Walks</h3>
      <ul class="walks">
        <?php
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        $pl->filterByUserID($u->getUserID());
        $pl->filterByAttribute('exclude_page_list',false);
        foreach($pl->get() as $page) {
          echo "<li><a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()}</a><a href='{$nh->getCollectionURL($newWalkForm)}?load={$page->getCollectionPath()}'> <i class='icon-edit' alt='edit'></i></a> <a href='{$nh->getCollectionURL($page)}' class='delete' data-cid='{$page->getCollectionID()}'><i class='icon-remove' alt='unpublish'></i></a></li>";
        }
        ?>
      </ul>
      <?php
      $pl = new PageList();
      $pl->filterByCollectionTypeHandle("walk");
      $pl->filterByUserID($u->getUserID());
      $pl->filterByAttribute('exclude_page_list',true);
      $inprogressPages = $pl->get();
      if(count($inprogressPages) > 0) {
      ?>
      <h3>In-Progress Walks</h3>
      <ul>
        <?php
        foreach($inprogressPages as $page) {
          $latest = Page::getByID($page->getCollectionID());
          echo "<li>{$latest->getCollectionName()} <a href='{$nh->getCollectionURL($newWalkForm)}?load={$page->getCollectionPath()}'><i class='icon-edit'></i></a></li>";
        } ?>
      </ul>
    <?php } ?>
    <?php }
    $a = new Area('Main'); 
    $a->setAttribute('profile', $profile); 
    $a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
    $a->setBlockWrapperEnd('</div>');
    $a->display($c); 
    ?>
  </div>
</div>
-->
