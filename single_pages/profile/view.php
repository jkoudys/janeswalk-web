<?php  defined('C5_EXECUTE') or die("Access Denied."); 
$nh = Loader::helper('navigation');
global $u;
Loader::model('page_list'); 
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
