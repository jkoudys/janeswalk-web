<?php
defined('C5_EXECUTE') || die(_("Access Denied."));
var_dump(Loader::db());
  $this->inc('elements/header.php'); ?>
<body
  class="city-page<?= $isLoggedIn ? ' logged_in' : '' ?>"
  data-pageViewName="CityPageView"
  <?= $city->fullbg ? "style='background-image:url({$city->fullbg})'" : '' ?>>
    <div id="fb-root"></div>
    <script type="text/javascript">
      window.fbAsyncInit = function() {
        FB.init({
          appId: '544710848887303',
          status: true,
          xfbml: true
        });
      };
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = '//connect.facebook.net/en_US/all.js';
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>
  <?php
    $this->inc('elements/navbar.php');
  ?>
    <div class="overlay o-connect">
      <div class="o-background">
      </div>
      <div class="o-content">
        <h1><?= t('Create a walk') ?></h1>
        <a href="<?= ($this->url('/login')) ?>" class="btn btn-primary"><?= t('Log in') ?></a> <?= t('or') ?>
        <a href="<?= ($this->url('/register')) ?>" class="btn btn-primary"><?= t('Join') ?></a>
        <?= tc('Log in or join..', 'to create a walk') ?>
      </div>
    </div>
<?php
  if($isCampaignActive) { ?>
    <div class="overlay o-donate">
      <div class="o-background">
      </div>
      <div class="o-content">
        <a href="#" class="closeModalCta icon-remove"></a>
        <div class="prompt">
          <div class="messaging">
            <?= ($city->donateCopy['main']) ?><br />
            <span class="cta"><?= ($city->donateCopy['cta']) ?></span>
          </div>
          <div class="btnWrapper">
            <a href="#" class="btn btn-primary"><?= t('I\'ve already donated!') ?></a>
          </div>
          <div class="quote" style="background-image: url('<?= ($city->donateCopy['imagePath']) ?>');"></div>
          <div class="secondary">
            <p>
              <?= t( /* Canadian cities only */
                'Jane\'s Walk is a charitable project that relies on ' .
                'donations from people like you to operate. Our small but ' .
                'dedicated team ensures even the smallest contributions go a ' .
                'long way to helping neighbours connect to build strong ' .
                'communities. Donate today.'
              ) ?>
            </p>
            <p><?= t(/* Canadian cities only */ 'Message and data rates may apply. Only available in Canada.') ?></p>
          </div>
          <div class="prompt clearfix" style="display: none;">
            <div class="social clearfix">
              <a href="#" class="icon-twitter"></a>
              <!-- <a href="#" class="icon-facebook"></a> -->
            </div>
            <p>
              <?= t('Already donated? Spread the word') ?>:
            </p>
          </div>
        </div>
        <div class="social hidden">
        </div>
      </div>
    </div>

    <div class="overlay o-shout">
      <div class="o-background">
      </div>
      <div class="o-content">
        <a href="#" class="closeModalCta icon-remove"></a>
          <h1><?= t('Thank you! We couldn\'t do this without you. Spread the word?') ?></h1>
          <div class="options">
            <div class="option">
              <div class="copy">
                <?= t('"I just donated to Jane\'s Walk. Text %1$s to %2$s to donate %3$s now #JanesWalk"', 'JANE', '45678', '$10') ?>
              </div>
              <div class="networks clearfix">
                <a href="#" class="icon-facebook"></a>
                <a href="#" class="icon-twitter"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="catfish c-donate hidden">
      <div class="c-content">
        <a href="#" class="closeCatfishCta icon-remove"></a>
        <!-- <div class="portrait" style="background-image: url('http://i.imgur.com/tsxDZKo.png');"></div> -->
        <div class="block">
          <?= ($city->donateCopy['main']) ?><br />
          <span class="cta"><?= ($city->donateCopy['cta']) ?></span>
        </div>
        <!-- <div class="portrait" style="background-image: url('http://i.imgur.com/cMwIR6M.png');"></div> -->
      </div>
    </div>
<?php } // end campaigns ?>
    
  <div class="container-outter" role="main">
    <div class="intro-city tk-museo-slab">
      <div class="container">
        <div class="city-header">
          <h1>
            <?= t((string) $city) ?>
            <?= $canEdit ? "<a href='{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}'><i class='icon-edit-sign'></i></a>" : null ?>
          </h1>
          <?php
              (new Area('City Header'))->display($c);
  /*
  if ($city->fullbg) {
    // XXX make a new model for credited photos
    // XXX new model for users? full_name getter
              $bgPhotoCreditName = $fullbg->getAttribute('background_photo_credit_name');
              $bgPhotoCreditLink = $fullbg->getAttribute('background_photo_credit_link');
              if ($bgPhotoCreditName !== false && $bgPhotoCreditName !== '') {
                ?>
                  <p style="font-size: x-small; color: #fff;">
                    <?= t('Background photo credit') ?>:
                    <a href="<?= ($bgPhotoCreditLink) ?>" target="_blank"><?= ($bgPhotoCreditName) ?></a>
                  </p>
                <?php
              }
  }
 */
            if ($c->getCollectionUserID() > 1):
          ?>
            <section class="city-organizer">
              <?php if($avatar) { ?><a href="<?= $profile_path ?>">
              <div class='u-avatar' style='background-image:url(<?= $avatar ?>)'></div><?php } ?></a>
              <div class="city-organizer-details">
                <h3>
                 <a href="<?= $city->profile_path ?>"><?= "{$city->city_organizer->getAttribute('first_name')} {$city->city_organizer->getAttribute('last_name')}" ?></a>
                    <?php if($isCityOrganizer) { ?><a href="<?= $this->url('/profile/edit')?>"><i class='icon-edit-sign'></i></a><?php } 
                  ?>
                </h3>
                <h4><?= t('City Organizer') ?></h4>
                <div class="btn-toolbar">
                  <a href="mailto:<?= $city->city_organizer->getUserEmail() ?>" class="btn"><i class="icon-envelope-alt"></i></a>
                  <?php if($city->facebook) { ?><a href='<?=$city->facebook_url?>' target='_blank' class='btn'><i class='icon-facebook'></i></a><?php } ?>
                  <?php if($city->twitter) { ?><a href='<?=$city->twitter_url?>' target='_blank' class='btn'><i class='icon-twitter'></i></a><?php } ?>
                  <?php if($city->website) { ?><a href='<?=$city->website_url?>' target='_blank' class='btn'><i class='icon-globe'></i></a><?php } ?>
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
        <div class="span4 action-items walk-preview">
          <div class="item active">
            <h2><?= t('Jane’s Walks') ?></h2>
            <h4><?= t('Get out and walk! Explore, learn and share through a Jane’s Walk in %s', (string) $city) ?></h4>
            <?php (new Area('City Description'))->display($c); ?>
          </div>
          <div class="menu-flags box-sizing">
            <?php (new Area('City Nav'))->display($c); ?>
          </div>
          <?php (new Area('Sponsors'))->display($c); ?>
        </div>
        <div class="walks-list <?=($show === 'all') ? 'showall' : 'span8' ?>">
<?php
           if($show === 'all' || $c->isEditMode()) {
?>
            <div class="row-fluid">
              <?php (new Area('All Walks List'))->display($c); ?>
            </div>
<?php
           }
           if($show !== 'all' || $c->isEditMode()) {
?>
            <h3><?= t('Walks in %s', t((string) $city) ) ?></h3>
            <?php if($city->totalWalks > 1) { ?>
            <a href="<?= $city->url, 'walks' ?>" class="see-all"><?= t2('show only this walk', 'see all %d walks', $city->totalWalks)?></a>
            <?php }?>
            <a href="<?= $this->url('/walk/form'), '?parentCID=', $c->getCollectionID() ?>" class="btn btn-primary create-walk btn-large"><i class="icon-star"></i> <?= t('Create a Walk') ?></a>
            <div class="row-fluid">
              <?php (new Area('Walk List'))->display($c); ?>
            </div>
<?php
            }
?>
        </div>
      </div>
    </div>
  </div>
<?php
           if($c->isEditMode() || $blog) {
?>
  <div class="intro-city lower blog">
    <div class="container">
      <h2 class="title"><a href="<?=$blog ? $nh->getCollectionURL($blog) : "" ?>"><?= t('City Blog') ?></a>
<?php
             if ($blog && (new Permissions($blog))->canAddSubpage()) { ?>
        <a class="add" href="<?=$this->url('/dashboard/composer/write/', CollectionType::getByHandle('city_blog_entry')->getCollectionTypeID(), '/', $blog->getCollectionID() )?>" >
        <i class="icon-double-angle-right"></i> <?= t('post new article') ?></a>
        <?php } ?>
      </h2>
      <?php (new Area('City Blog'))->display($c); ?>
    </div>
  </div>
<?php
           }
           $this->inc('elements/footer.php');

