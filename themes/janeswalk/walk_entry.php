<?php  defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php');
$page = Page::getCurrentPage();
$parentPage = Page::getByID( $page->getCollectionParentID() ); 
?>
     <div id="central" class="walk">
	<div id="sidebar">
	<?php 
	$as = new Area('Sidebar');
	$as->display($c);
	echo ($c->getAttribute('meeting_place') ? '<h4>Meeting Place:</h4><p>' . $c->getAttribute('meeting_place') . '</p>' : '') . 
	'<h4>Look for this to find us:</h4><p>';
	$as = new Area('Look for this'); $as->display($c);
	echo '</p>';
	echo ($c->getAttribute('end_location') ? '<h4>End Location:</h4><p>' . $c->getAttribute('end_location') . '</p>' : '') .
	($c->getAttribute('public_transit') ? '<h4>Public Transit Directions:</h4><p>' . $c->getAttribute('public_transit') . '</p>' : '') .
	(($c->getAttribute('accessibility') || $c->getAttribute('accessibility_notes')) ? '<h4>Accessibility:</h4>' : '') .
	($c->getAttribute('accessibility') ? '<p>' . nl2br($c->getAttribute('accessibility')) . '</p>' : '') .
	($c->getAttribute('accessibility_notes') ? '<p>' . $c->getAttribute('accessibility_notes') . '</p>' : '') .
	($c->getAttribute('parking') ? '<h4>Parking Availability:</h4><p>' . $c->getAttribute('parking') . '</p>' : ''); ?>
    </div>
    <div id="body">
      <div class="pageSection citygroup">
	<?php 
	$entry = ComposerPage::getByID($page->getCollectionID() );
	if (is_object($entry)) { ?>
	<div id="adminoptions">[<a href="<?php echo $this->url('/dashboard/composer/write/-/edit/' . $page->getCollectionID()) ?>">edit walk</a>]</div>
	<?php } ?>
        <h4><a href="<?php echo View::URL($parentPage->getCollectionPath() ) ?>"><?php echo $parentPage->getCollectionName() ?></a> Walks</h4>
	<div><?php  $as = new Area('Sub City'); $as->display($c); ?></div>
	<h1><?php  echo $c->getCollectionName(); ?></h1>
        <h4>Guided by: <?php echo $c->getAttribute('guided_by'); ?></h4>
	<?php 
	$eventtime = $c->getAttribute('event_et');
	$walkdate = strtotime($eventtime['start']);
	$datearray = getdate($walkdate);
	$number = $datearray['mday'];
	$ends = array('th','st','nd','rd','th','th','th','th','th','th');
	if (($number %100) >= 11 && ($number%100) <= 13)
	   $abbreviation = 'th';
	else
	  $abbreviation = $ends[$number % 10];
	?>
	<ul class="eventtime">
	  <li>
	    <h2>Date</h2>
	    <p><?php echo strftime("%A, %B %e", $walkdate) . $abbreviation ?></p>
	  </li>
	  <li>
	    <h2>Start Time</h2>
	    <p><?php echo strftime("%l:%M %p", $walkdate) ?></p>
	  </li>
	  <li>
	    <h2>Est. Duration</h2>
	    <p><?php echo $eventtime['hours'] ?></p>
	  </li>
	</ul>
      </div>
	<div class="pageSection">
		<?php  $as = new Area('Main'); $as->display($c); ?>
	</div>
	<?php foreach(preg_split('/\n/', $c->getAttribute('tags')) as $tag) { ?>
		<span class="tag"><?php echo $tag; ?></span>
	<?php } ?>
		<div class="pageSection bio">
			<h4>About your walk leader:</h4>
			<?php  $as = new Area('Biography'); $as->display($c); ?>
		</div>
	</div>
	</div>

<?php  $this->inc('elements/footer.php'); ?>
