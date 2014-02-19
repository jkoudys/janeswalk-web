<?php 
  defined('C5_EXECUTE') or die(_("Access Denied."));
  global $u;
  global $cp;
?>
<?php $this->inc('elements/header.php'); ?>
<body class="city-page <?=($dh->canRead()) ? "logged_in" : ""?>" <?= is_object($fullbg) ? "style='background-image:url(" . $fullbg->getURL() . ")'" : "" ?>>
  <?php
    $this->inc('elements/navbar.php');
  ?>
  <div class="container-outter" role="main">
    <div class="intro-city tk-museo-slab">
      <div class="container">
        <div class="city-header">
          <h1>
            <?=$c->getCollectionName()?>
            <?= is_object(ComposerPage::getByID($c->getCollectionID())) ? "<a href='{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}'><i class='icon-edit-sign'></i></a>" : null; ?>
          </h1>
          <?php
            (new Area('City Header'))->display($c);
            if (is_object($fullbg)) {
              $bgPhotoCreditName = $fullbg->getAttribute('background_photo_credit_name');
              $bgPhotoCreditLink = $fullbg->getAttribute('background_photo_credit_link');
              if ($bgPhotoCreditName !== false && $bgPhotoCreditName !== '') {
                ?>
                  <p style="font-size: x-small; color: #fff;">
                    Background photo credit:-
                    <a href="<?= ($bgPhotoCreditLink) ?>" target="_blank"><?= ($bgPhotoCreditName) ?></a>
                  </p>
                <?php
              }
            }
            if ($c->getCollectionUserID() > 1):
          ?>
            <section class="city-organizer">
              <?php if($avatar) { ?><div class='u-avatar' style='background-image:url(<?=$avatar?>)'></div><?php } ?>
              <div class="city-organizer-details">
                <h3>
                  <?=
                    "{$page_owner->getAttribute('first_name')} {$page_owner->getAttribute('last_name')}" .
                    ($u->getUserID() == $page_owner->getUserID() ? " <a href={$this->url('/profile/edit')}><i class='icon-edit-sign'></i></a>":null)
                  ?>
                </h3>
                <h4>City Organizer</h4>
                <div class="btn-toolbar">
                  <a href="mailto:<?=$page_owner->getUserEmail()?>" class="btn"><i class="icon-envelope-alt"></i></a>
                  <?php if($facebook_url) { ?><a href='<?=$facebook_url?>' target='_blank' class='btn'><i class='icon-facebook'></i></a><?php } ?>
                  <?php if($twitter_url) { ?><a href='<?=$twitter_url?>' target='_blank' class='btn'><i class='icon-twitter'></i></a><?php } ?>
                  <?php if($website_url) { ?><a href='<?=$website_url?>' target='_blank' class='btn'><i class='icon-globe'></i></a><?php } ?>
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
          <a href="?" class="see-all">See All Walks</a>
          <?php } else { ?>
          <h3>Featured Walks</h3>
          <a href="?show=all" class="see-all">see all walks</a>
          <a href="<?= $this->url("/walk/form") ?>?parentCID=<?=$c->getCollectionID()?>" class="btn btn-primary create-walk btn-large"><i class="icon-star"></i> Create a Walk</a>
          <?php } ?>
          <div class="row-fluid">
            <?php (new Area('Walk List'))->display($c); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
    if($c->isEditMode() || $blog) {
  ?>
  <div class="intro-city lower blog">
    <div class="container">
      <h2 class="title"><a href="<?=$blog ? $nh->getCollectionURL($blog) : "" ?>">City Blog</a>
        <?php
        if ($blog && (new Permissions($blog))->canAddSubpage()) { ?>
        <a class="add" href="<?=$this->url('/dashboard/composer/write/' . CollectionType::getByHandle("city_blog_entry")->getCollectionTypeID() . '/' . $blog->getCollectionID() )?>" >
          <i class="icon-double-angle-right"></i> post new article</a>
        <?php } ?>
      </h2>
      <?php (new Area('City Blog'))->display($c); ?>
    </div>
  </div>
  <?php } ?>
  <?php $this->inc('elements/footer.php');  ?>
