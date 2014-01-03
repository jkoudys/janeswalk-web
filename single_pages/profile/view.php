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
    <div>
      <h3>Blogs</h3>
      <ul>
      <?php
      $blogs = new PageList();
      $blogs->filterByCollectionTypeHandle('city_blog');
      $blogs->filterByUserID($u->getUserID());
      $blogs->sortByName();
      foreach($blogs->get() as $blog) { ?>
        <li>
        <form action="<?=$this->url('/dashboard/composer/write/' . CollectionType::getByHandle("city_blog_entry")->getCollectionTypeID() )?>" method="post">
        <label><?=$blog->getCollectionName()?></label>
        <input type="hidden" name="cPublishParentID" value="<?=$blog->getCollectionID()?>">
        <input type="submit"><i class="icon-file-alt"></i> New Article</input>
        </form>
        </li>
      <?php } ?>
      </ul>
    </div>
    <?php $newWalkForm = Page::getByPath("/walk/form"); ?>
    <form class="simple" action="<?= $nh->getCollectionURL($newWalkForm) ?>" method="get" autocomplete="off" style="margin:0">
      <select name="parentCID" onchange="this.form.submit()">
        <option selected="selected">Submit a Walk to a City</option>
        <?php
        $cities = new PageList();
        $cities->filterByCollectionTypeHandle('city');
        $cities->sortByName();
        foreach($cities->get() as $city) {
        ?>
          <option value="<?php echo $city->getCollectionID() ?>"><?php echo $city->getCollectionName() ?></option>
        <?php } ?>
      </select> 
      <input type="submit" value="Go!">
    </form>
    <h3>Your Public Walks</h3>
    <ul class="walks">
      <?php
        $pageEdit = Page::getByID(125);
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        $pl->filterByUserID($u->getUserID());
        $pl->filterByAttribute('exclude_page_list',false);
        foreach($pl->get() as $page) {
          echo "<li><a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()}</a> <a href='{$nh->getCollectionURL($pageEdit)}?load={$page->getCollectionPath()}'><i class='icon-edit' alt='edit'></i></a> <a href='{$nh->getCollectionURL($page)}' class='delete' data-cid='{$page->getCollectionID()}'><i class='icon-remove' alt='unpublish'></i></a></li>";
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
            echo "<li>" . $latest->getCollectionName() . " 
            [ <a href='" . $nh->getCollectionURL($pageEdit) ."?load=" . $nh->getCollectionURL($page) . "?format=json" . "'>edit</a> ]" .
            "</li>";
        }
      } ?>
      </ul>
      <?php
      $a = new Area('Main'); 
			$a->setAttribute('profile', $profile); 
			$a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
			$a->setBlockWrapperEnd('</div>');
			$a->display($c); 
		?>
		
    </div>
	
</div>
