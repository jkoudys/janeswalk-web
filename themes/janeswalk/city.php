<?php 
  defined('C5_EXECUTE') or die(_("Access Denied."));
  global $u;
  global $cp;
?>
<?php $this->inc('elements/header.php'); ?>
<body
  class="city-page<?php $dh->canRead() and print " logged_in" ?>"
  data-pageViewName="CityPageView"
  <?php $fullbg and print "style='background-image:url({$fullbg->getURL()})'" ?>>
  <?php
    $this->inc('elements/navbar.php');
  ?>

    <div class="overlay o-connect">
      <div class="o-background">
      </div>
      <div class="o-content">
        <h1>Create a walk</h1>
        <a href="<?= ($this->url('/login')) ?>" class="btn btn-primary">Log in</a> or
        <a href="<?= ($this->url('/register')) ?>" class="btn btn-primary">Join</a>
        to create a walk
      </div>
    </div>
    
  <div class="container-outter" role="main">
    <div class="intro-city tk-museo-slab">
      <div class="container">
        <div class="city-header">
          <h1>
            <?= ($c->getCollectionName()) ?>
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
            <?php (new Area('City Description'))->display($c); ?>
          </div>
          <div class="menu-flags box-sizing">
            <?php (new Area('City Nav'))->display($c); ?>
          </div>
          <?php (new Area('Sponsors'))->display($c); ?>
        </div>
        <?php } ?>
        <div class="walks-list <?=($show == "all") ? "showall" : "span8" ?>">
          <?php
            if($show === 'all') {

              // Wards
              $wards = array();
              $wardObjects = $c->getAttribute('city_wards');
              if ($wardObjects !== false) {
                foreach ($wardObjects->getOptions() as $ward) {
                  $val = $ward->value;
                  // $pieces = preg_split('/Ward\ [0-9]+\ /', $val);
                  // $val = array_pop($pieces);
                  $wards[] = $val;
                }
              }
              sort($wards);

              // Themes
              $themeHelper = Loader::helper('theme');
              $themes = $themeHelper->getAll(true);
              sort($themes);

              // Intiatives
              $initiatives = array(
                'Open Streets TO',
                'Walk Toronto',
                '100 in a day',
                'ROM Walks'
              );
              $initiatives = array();
          ?>
            <h3>All Walks</h3>
            <!-- <a href="?" class="see-all">See All Walks</a> -->
            <div class="filters clearfix">

              <?php if (!empty($wards)): ?>
                <div class="filter clearfix">
                  <label for="ward">Region</label>
                  <div class="options">
                    <select name="ward" id="ward">
                      <option value="*">All</option>
                      <?php foreach ($wards as $ward): ?>
                        <option value="<?= ($ward) ?>"><?= ($ward) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
              <?php endif; ?>


              <?php if (!empty($themes)): ?>
                <div class="filter clearfix">
                  <label for="theme">Theme</label>
                  <div class="options">
                    <select name="theme" id="theme">
                      <option value="*">All</option>
                      <?php foreach ($themes as $theme): ?>
                        <option value="<?= ($theme) ?>"><?= ($theme) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
              <?php endif; ?>


              <?php if (!empty($initiatives)): ?>
                <div class="filter clearfix">
                  <label for="initiative">Initiative</label>
                  <div class="options">
                    <select name="initiative" id="initiative">
                      <option value="*">All</option>
                      <?php foreach ($initiatives as $initiative): ?>
                        <option value="<?= ($initiative) ?>"><?= ($initiative) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
              <?php endif; ?>

            </div>
            <div class="empty hidden">
              No walks found<br />
              Try another region or theme
            </div>
          <?php
            } else {
          ?>
            <h3>Featured Walks</h3>
            <a href="?show=all" class="see-all">see all walks</a>
            <a href="<?= $this->url("/walk/form") ?>?parentCID=<?=$c->getCollectionID()?>" class="btn btn-primary create-walk btn-large"><i class="icon-star"></i> Create a Walk</a>
          <?php
            }
          ?>
          <script type="text/javascript">
            var JanesWalkData = {
              walks: []
            };
          </script>
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
