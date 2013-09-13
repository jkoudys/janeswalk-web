<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$page = Page::getCurrentPage();
$av = Loader::helper('concrete/avatar');
$page_owner = UserInfo::getByID($page->getCollectionUserID());
$this->inc('elements/header.php'); ?>
	
	<div id="central" class="no-sidebar">
		
		<div id="body">	
			<section class="tophead">
				<h2><?php echo $page->getCollectionName(); ?> Walks</h2>
				<?php $a = new Area('CityInfo'); $a->display($c); ?>

			</section>
			<section class="tophead">
				<?php $a = new Area('BlogList'); $a->display($c); ?>
			</section>
	<?php if ($page->getCollectionUserID() > 1): ?>
      <section class="city-organizer">
        <h3>Your city organizer:</h3>
        <div class="organizer-bio">
          <p><?php echo $page_owner->getAttribute('fullname') ?><?php echo $page_owner->getAttribute('title') ? ", ". $page_owner->getAttribute('title') : ", City Organizer" ?></p>
          <?php echo $page_owner->getDisplayUserEmail();
          if($page_owner->getAttribute('website_url') ) {
          echo "<p><a href='{$page_owner->getAttribute('website_url')}'>{$page_owner->getAttribute('website_url')}</a></p>";
      }
          echo $av->outputUserAvatar($page_owner);
      ?>
        </div>
      </section>
	<?php endif; 
  $coords = $page->getAttribute('coordinates');
  $coords = explode(",",$coords);
  $coords = $coords[1].",".$coords[0];
  ?>
  <iframe style="padding-bottom:35px;" width="915" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=http:%2F%2Fmaps.google.com%2Fmaps%2Fms%3Fie%3DUTF8%26msa%3D0%26output%3Dkml%26msid%3D206440753512238600495.0004da206afd6ea099554&amp;aq=&amp;sll=11.445228,10.929545&amp;sspn=135.307539,327.65625&amp;ie=UTF8&amp;t=m&amp;ll=<?php echo $coords ?>&amp;spn=0.173844,0.645447&amp;z=11&amp;output=embed"></iframe>
			<?php 
			
			$a = new Area('Main');
			$a->display($c);
			
			?>
		</div>
	</div>
<?php  $this->inc('elements/footer.php'); ?>

