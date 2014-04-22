<?php
  defined('C5_EXECUTE') or die(_("Access Denied."));
  global $u;
  global $cp;
?>
<?php $this->inc('elements/header.php'); ?>
<body
  class="city-page<?= $dh->canRead() ? ' logged_in' : '' ?>"
  data-pageViewName="CityPageView"
  <?= $fullbg ? "style='background-image:url({$fullbg->getURL()})'" : '' ?>>
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

    <div class="overlay o-donate">
      <div class="o-background">
      </div>
      <div class="o-content">
        <a href="#" class="closeModalCta icon-remove"></a>
        <div class="prompt">
          <div class="messaging">
            <?= ($donateCopy['main']) ?><br />
            <span class="cta"><?= ($donateCopy['cta']) ?></span>
          </div>
          <div class="btnWrapper">
            <a href="#" class="btn btn-primary"><?= t('I\'ve already donated!') ?></a>
          </div>
          <div class="quote" style="background-image: url('<?= ($donateCopy['imagePath']) ?>');"></div>
          <div class="secondary">
            <p>
              <?= t( /* Canadian cities only */
              'We\'re raising money for The Jane\'s Walk School Edition. This program' .
              'encourages young people to take an active role in shaping the places' .
              'and cities where they live.') ?>
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
                "I just donated to Jane's Walk. Text JANE to 45678 to donate $10 now #JanesWalk"
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
          <?= ($donateCopy['main']) ?><br />
          <span class="cta"><?= ($donateCopy['cta']) ?></span>
        </div>
        <!-- <div class="portrait" style="background-image: url('http://i.imgur.com/cMwIR6M.png');"></div> -->
      </div>
    </div>
    
  <div class="container-outter" role="main">
    <div class="intro-city tk-museo-slab">
      <div class="container">
        <div class="city-header">
          <h1>
            <?= t($c->getCollectionName()) ?>
            <?= is_object(ComposerPage::getByID($c->getCollectionID())) ? "<a href='{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}'><i class='icon-edit-sign'></i></a>" : null ?>
          </h1>
          <?php
            (new Area('City Header'))->display($c);
            if (is_object($fullbg)) {
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
            if ($c->getCollectionUserID() > 1):
          ?>
            <section class="city-organizer">
              <?php if($avatar) { ?><a href="<?= $profile_path ?>">
              <div class='u-avatar' style='background-image:url(<?= $avatar ?>)'></div><?php } ?></a>
              <div class="city-organizer-details">
                <h3>
                 <a href="<?= $profile_path ?>"><?= "{$page_owner->getAttribute('first_name')} {$page_owner->getAttribute('last_name')}" ?></a>
                    <?php if($u->getUserID() == $page_owner->getUserID()) { ?><a href="<?= $this->url('/profile/edit')?>"><i class='icon-edit-sign'></i></a><?php } 
                  ?>
                </h3>
                <h4><?= t('City Organizer') ?></h4>
                <div class="btn-toolbar">
                  <a href="mailto:<?= $page_owner->getUserEmail() ?>" class="btn"><i class="icon-envelope-alt"></i></a>
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
            <h2><?= t('Jane’s Walks') ?></h2>
            <h4><?= t('Get out and walk! Explore, learn and share through a Jane’s Walk in %s', $c->getCollectionName()) ?></h4>
            <?php (new Area('City Description'))->display($c); ?>
          </div>
          <div class="menu-flags box-sizing">
            <?php (new Area('City Nav'))->display($c); ?>
          </div>
          <?php (new Area('Sponsors'))->display($c); ?>
        </div>
        <?php } ?>
        <div class="walks-list <?=($show === 'all') ? 'showall' : 'span8' ?>">
<?php
           if($show === 'all' || $c->isEditMode()) {
?>
            <h3><?= t('All Walks') ?></h3>
            <!-- <a href="?" class="see-all">See All Walks</a> -->
            <div class="filters clearfix">

              <?php if (!empty($wards)): ?>
                <div class="filter clearfix">
                  <label for="ward"><?= ($wardName) ?></label>
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
                  <label for="theme"><?= t('Theme') ?></label>
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


              <?php if (!empty($accessibilities)): ?>
                <div class="filter clearfix">
                  <label for="accessibility"><?= t('Accessibility') ?></label>
                  <div class="options">
                    <select name="accessibility" id="accessibility">
                      <option value="*">All</option>
                      <?php foreach ($accessibilities as $accessibility): ?>
                        <option value="<?= ($accessibility) ?>"><?= ($accessibility) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
              <?php endif; ?>


              <?php if (!empty($initiatives)): ?>
                <div class="filter clearfix">
                  <label for="initiative"><?= t('Initiative') ?></label>
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


              <div class="filter clearfix">
                <label for="date"><?= t('Day') ?></label>
                <div class="options">
                  <select name="date" id="date">
                    <option value="*">All</option>
                    <?php foreach ($dates as $date): ?>
                      <option value="<?= ($date) ?>"><?= ($date) ?></option>
                    <?php endforeach; ?>
                  </select>
                </div>
              </div>


            </div>

            <div class="initiatives hidden">
              <div class="initiative hidden" data-jw-initiative="Open Streets TO">
                <div class="headline">What is Open Streets TO?</div>
                <p>
                  Open Streets TO involves briefly closing Bloor St to vehicle
                  traffic, and opening it to everyone else for fun, safe, and
                  free recreational activities. Open Streets programs take place
                  in cities around the world, usually on Sunday mornings and
                  typically last for about 6 hours. Participants can bike, run,
                  rollerblade, hopscotch, do yoga, skateboard, unicycle... you
                  get the picture.
                </p>
                <div class="subheadline">Event dates:</div>
                <div class="dates">
                  July 27, 2014<br />
                  August 3, 2014<br />
                  August 17, 2014
                </div>
              </div>
              <div class="initiative hidden" data-jw-initiative="100 In 1 Day">
                <div class="headline">What is 100 In 1 Day?</div>
                <p>
                  100 in 1 Day is a citizen-driven festival will unite people
                  across the city to make Toronto a better place by creating
                  acts of urban change. These acts, or interventions, have the
                  potential to raise awareness of urban and social issues,
                  inspire ideas, and motivate leaders to consider new approaches
                  to old problems.
                </p>
                <div class="subheadline">Event dates:</div>
                <div class="dates">
                  June 7, 2014
                </div>
              </div>
            </div>

            <div class="empty hidden">
              <?= t('No walks found') ?><br />
              <?= t('Try another region or theme') ?>
            </div>

            <div class="row-fluid">
              <?php (new Area('All Walks List'))->display($c); ?>
            </div>
<?php
           }
           if($show !== 'all' || $c->isEditMode()) {
?>
            <h3><?= t('Walks in %s', t($c->getCollectionName()) ) ?></h3>
            <?php if($totalWalks > 9) { ?>
            <a href="<?= $nh->getLinkToCollection($c) . 'walks' ?>" class="see-all"><?= t2('show only this walk', 'see all %d walks', $totalWalks)?></a>
            <?php }?>
            <a href="<?= $this->url("/walk/form") ?>?parentCID=<?= $c->getCollectionID() ?>" class="btn btn-primary create-walk btn-large"><i class="icon-star"></i> <?= t('Create a Walk') ?></a>
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
        <a class="add" href="<?=$this->url('/dashboard/composer/write/' . CollectionType::getByHandle('city_blog_entry')->getCollectionTypeID() . '/' . $blog->getCollectionID() )?>" >
        <i class="icon-double-angle-right"></i> <?= t('post new article') ?></a>
        <?php } ?>
      </h2>
      <?php (new Area('City Blog'))->display($c); ?>
    </div>
  </div>
<?php
            }
            $this->inc('elements/footer.php'); 

