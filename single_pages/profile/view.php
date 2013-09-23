<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
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
    <h3>Your Walks</h3>
    <ul class="walks">
      <?php
        Loader::model('page_list');
        $nh = Loader::helper('navigation');
        $u = new User();
        $pageEdit = Page::getByID(125);
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        $pl->filterByUserID($u->getUserID());
        foreach($pl->get() as $page) {
          echo "<li><a href='" . $nh->getCollectionURL($page) . "'>" . $page->getCollectionName() . "</a>
          [ <a href='" . $nh->getCollectionURL($pageEdit) ."?load=" . $nh->getCollectionURL($page) . "?format=json" . "'>edit</a> ]" .
          "</li>";
        }
      ?>
    </ul>
		
		<?php  
			$a = new Area('Main'); 
			$a->setAttribute('profile', $profile); 
			$a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
			$a->setBlockWrapperEnd('</div>');
			$a->display($c); 
		?>
		
    </div>
	
	<div class="ccm-spacer"></div>
	
</div>
