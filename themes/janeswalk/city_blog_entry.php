<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$parentPage = Page::getByID( $c->getCollectionParentID() );
$this->inc('elements/header.php'); ?>

  <div id="central" class="city blogentry">
    <div id="subheader">
			<div id="adminoptions">[<a href="<?php echo $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()) ?>">edit blog post</a>]</div>
			<?php 
			$as = new Area('Subheader');
			$as->display($c);
			echo "<h1>{$c->getCollectionName()}</h1>";
			?>		
    </div>
		<div id="sidebar">
			<?php $file = $c->getAttribute("city_blog_thumb");
			if (is_object($file)) {
			    $im = Loader::helper('image');
			    $im->output($file);
			}
			$as = new Area('Sidebar');
			$as->display($c);
			?>		
		</div>
		
		<div id="body">	
			<?php 
			echo "<p class='blogdate'>" . t('Posted by %s / %s',
				$c->getVersionObject()->getVersionAuthorUserName(),
				$c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL)) . "</p>";
			echo "<p class='blogdesc'>{$c->getCollectionDescription()}</p>";
			$a = new Area('Main');
			$a->display($c);
			?>
		</div>
	</div>

<?php  $this->inc('elements/footer.php'); ?>
