<?php  defined('C5_EXECUTE') or die("Access Denied."); 
$nh = Loader::helper('navigation');
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
    <?php  Loader::element('profile/sidebar', array('profile'=> $profile)); ?>    
    <div id="ccm-profile-body">	
    	<div id="ccm-profile-body-attributes">
    	<div class="ccm-profile-body-item">
        <h1><?php echo $profile->getUserName()?></h1>
        <?php 
        $uaks = UserAttributeKey::getPublicProfileList();
        foreach($uaks as $ua) { ?>
            <div>
                <label><?php echo tc('AttributeKeyName', $ua->getAttributeKeyName())?></label>
                <?php echo $profile->getAttribute($ua, 'displaySanitized', 'display'); ?>
            </div>
        <?php  } ?>		
        </div>
		</div>
    <p>
      <?php $newWalkForm = Page::getByPath("/walk/form"); ?>
      <a href="<?= $nh->getCollectionURL($newWalkForm) ?>" class="btn btn-primary btn-large">[+] Submit a Walk</a>
    </p>
    <h3>Your Public Walks</h3>
    <ul class="walks">
      <?php
        Loader::model('page_list');
        $u = new User();
        $pageEdit = Page::getByID(125);
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        $pl->filterByUserID($u->getUserID());
        $pl->filterByAttribute('exclude_page_list',false);
        foreach($pl->get() as $page) {
          echo "<li><a href='" . $nh->getCollectionURL($page) . "'>" . $page->getCollectionName() . "</a>
          [ <a href='" . $nh->getCollectionURL($pageEdit) ."?load=" . $nh->getCollectionURL($page) . "?format=json" . "'>edit</a> | " .
          "<a href='".$nh->getCollectionURL($page) . "' class='delete' data-cid='" . $page->getCollectionID() . "'>unpublish</a> ]" .
          "</li>";
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
      <?php
        foreach($inprogressPages as $page) {
          $latest = Page::getByID($page->getCollectionID());
            echo "<li>" . $latest->getCollectionName() . " 
            [ <a href='" . $nh->getCollectionURL($pageEdit) ."?load=" . $nh->getCollectionURL($page) . "?format=json" . "'>edit</a> ]" .
            "</li>";
        }
      }
      
      $a = new Area('Main'); 
			$a->setAttribute('profile', $profile); 
			$a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
			$a->setBlockWrapperEnd('</div>');
			$a->display($c); 
		?>
		
    </div>
	
	<div class="ccm-spacer"></div>
	
</div>
