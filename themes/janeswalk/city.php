<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$im = Loader::helper('image');
$fullbg = $c->getAttribute("full_bg");
$nh = Loader::helper('navigation');
$dh = Loader::helper('concrete/dashboard');
$page_owner = UserInfo::getByID($c->getCollectionUserID());
$av = Loader::helper('concrete/avatar');
$show = $_REQUEST['show'];
global $u; global $cp;
?>
<?php $this->inc('elements/header.php');  ?>
<body class="city-page <?=($dh->canRead()) ? "logged_in" : ""?>" <?= is_object($fullbg) ? "style='background-image:url(" . $fullbg->getURL() . ")'" : "" ?>>
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
    <div class="intro-city tk-museo-slab">
      <div class="container">
        <div class="city-header">
          <h1><?=$c->getCollectionName()?></h1>
          <p>
          </p>
          <p><?=t($c->getAttribute('shortdescription')); ?></p>
          <?php (new Area('City Header'))->display($c); ?>
          <?php if ($c->getCollectionUserID() > 1): ?>
          <section class="city-organizer">
          <?= ($avatar = $av->getImagePath($page_owner)) ? "<div class='u-avatar' style='background-image:url({$avatar})'></div>" : null; ?>
          <div class="city-organizer-details">
            <?="<h3>{$page_owner->getAttribute('first_name')} {$page_owner->getAttribute('last_name')}</h3><h4>City Organizer</h4>" ?>
            <div class="btn-toolbar">
              <a href="mailto:<?=$page_owner->getUserEmail()?>" class="btn"><i class="icon-envelope-alt"></i></a>
              <?= ($facebook = $page_owner->getAttribute('facebook')) ? "<a href='http://facebook.com/$facebook' target='_blank' class='btn'><i class='icon-facebook'></i></a>" : null ?>
              <?= ($twitter = $page_owner->getAttribute('twitter')) ? "<a href='http://twitter.com/" . ltrim($twitter,'@') . "' target='_blank' class='btn'><i class='icon-twitter'></i></a>" : null ?>
              <?= ($website = $page_owner->getAttribute('website')) ? ("<a href='" . (0 === strpos($website,'http') ? $website : "http://$website") . '\' target="_blank" class="btn"><i class="icon-globe"></i></a>') : null ?>
            </div>
          </div>
          </section>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
  <div class="section3 city-city">
    <div class="container">
      <div class="row-fluid walk-select">
        <?php if($show != "all") { ?>
        <div class="span4 action-items">
          <div class="item active">
            <h2>Jane’s Walks</h2>
            <h4>Get out and walk! Explore, learn and share through a Jane’s Walk in <?=$c->getCollectionName()?></h4>
            <?=nl2br($c->getAttribute('longdescription')); ?>
            <?php (new Area('City Description'))->display($c);?>
          </div>
          <div class="menu-flags box-sizing">
            <?php (new Area('City Nav'))->display($c); ?>
          </div>
          <?php (new Area('Sponsors'))->display($c); ?>
        </div>
        <?php } ?>
        <div class="walks-list <?=($show == "all") ? "showall" : "span8" ?>">
          <?php if($show == "all") { ?>
          <h3>All Walks</h3>
          <a href="?" class="see-all">See Featured Walks</a>
          <?php } else { ?>
          <h3>Featured Walks</h3>
          <a href="?show=all" class="see-all">see all walks</a>
          <a href="<?= $nh->getCollectionURL(Page::getByPath("/walk/form")) ?>?parentCID=<?=$c->getCollectionID()?>" class="btn btn-primary create-walk btn-large"><i class="icon-star"></i> Create a Walk</a>
          <?php } ?>
          <div class="row-fluid">
            <?php (new Area('Walk List'))->display($c); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
  $blog = new PageList();
  $blog->filterByCollectionTypeHandle('city_blog');
  $blog->filterByParentID($c->getCollectionID());
  $blog = $blog->get(1)[0];
  if($c->isEditMode() || $blog) { ?>
  <div class="intro-city lower blog">
    <div class="container">
      <h2 class="title"><a href="<?=$blog ? $nh->getCollectionURL($blog) : "" ?>">City Blog</a>
        <?php
        if ($blog && (new Permissions($blog))->canAddSubpage()) { ?>
        <a href="<?=$this->url('/dashboard/composer/write/' . CollectionType::getByHandle("city_blog_entry")->getCollectionTypeID() . '/' . $blog->getCollectionID() )?>" >
          <i class="icon-double-angle-right"></i> post new article</a>
        <?php } ?>
      </h2>
      <?php (new Area('City Blog'))->display($c); ?>
    </div>
  </div>
  <?php } ?>
  <?php $this->inc('elements/footer.php');  ?>
