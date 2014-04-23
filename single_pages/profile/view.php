<?php
  defined('C5_EXECUTE') or die('Access Denied.'); 
  define('IS_PROFILE', 1);
  $ui = UserInfo::getByID($u->getUserID());

  // City organizers
  $cityOrganizers = array(
    array(
      'cityName' => 'Toronto',
      'organizerImagePath' => 'https://graph.facebook.com/oliver.nassar/picture',
      'organizerName' => 'Oliver Nassar',
      'organizerEmail' => 'onassar@gmail.com'
    ),
    array(
      'cityName' => 'Montreal',
      'organizerImagePath' => 'https://graph.facebook.com/denisepinto/picture',
      'organizerName' => 'Denise Pinto',
      'organizerEmail' => 'denise.pinto@janeswalk.net'
    ),
    array(
      'cityName' => 'Ottawa',
      'organizerImagePath' => 'https://graph.facebook.com/nadia.halim/picture',
      'organizerName' => 'Nadia Halim',
      'organizerEmail' => 'nadia.halim@janeswalk.net'
    )
  );

  // Featured walks
  $featuredWalks = array(
    array(
      'walkImagePath' => 'http://janeswalk.org/files/cache/a6b8790016aa8ddec5cb764732491c1e_f149.JPG',
      'countryName' => 'Germany',
      'cityName' => 'Berlin',
      'walkTitle' => 'Walking With Titans',
      'walkPath' => '#'
    ),
    array(
      'walkImagePath' => 'http://janeswalk.org/files/cache/1a291ea4c80b712b5a9aed2a1b33534e_f377.jpg',
      'countryName' => 'Canada',
      'cityName' => 'Toronto',
      'walkTitle' => 'Walking With Titans',
      'walkPath' => '#'
    ),
    array(
      'walkImagePath' => 'http://janeswalk.org/files/cache/8aee4e3b283250e0935d1553c7c3ac5a_f663.jpg',
      'countryName' => 'United_States_of_America',
      'cityName' => 'New York',
      'walkTitle' => 'Walking With Titans',
      'walkPath' => '#'
    )
  );

  // Walks
  $pl = new PageList();
  $pl->filterByCollectionTypeHandle('walk');
  $pl->filterByUserID($u->getUserID());
  $pl->filterByAttribute('exclude_page_list', false);
  $walks = $pl->get();
  $hasCreatedWalks = count($walks) !== 0;
  $hasCreatedWalks = false;

  // City organizer
  $cityOrganizerEmailAddress = 'onassar@gmail.com';

  // Blog posts
  $hasPostedBlogPost = true;
  $cityHasBlogSetup = false;
  $hasUpdatedCityPage = false;
  $hasUpdatedDetails = true;
  $hasChosenPicture = true;
  $cityTabViewable = true;
  $cityHasWalks = true;
  $hasChosenHomeCity = isset($home_city);
  $homeCity = false;
  $numberOfWalksInCity = 42;
  if (isset($home_city)) {
    $homeCity = $home_city->getCollectionName();
  }
  $this->addHeaderItem($html->javascript('swfobject.js'));

  // City details
  if ($cityTabViewable === true) {
    $headerInfoIsEmpty = true;
    $shortDescriptionIsEmpty = false;
    $backgroundPhotoIsEmpty = false;
    $headerInfo = 'lambda lambda lambda lambda lambda lambda lambda';
    $shortDescription = 'Jane’s Walk is a walking conversation led ' .
      'by volunteers thatcreates a space for citizens to discuss what '.
      'matters to them while learning more about their city and ...';
    $backgroundPhoto = 'http://janeswalk.org/files/3213/8152/8704/IMG_6280.jpg';
  }

  // Resources
  $resources = array(
    'showCityOrganizers' => true,
    'showGlobalWalks' => true,
    'showTips' => true,
    'showFiles' => true
  );
?>
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
  <div class="wrapper" id="profileWrapper">
    <?php if ($hasChosenHomeCity === true): ?>
      <div class="overlay cityPromoteOverlay">
        <div class="o-background">
        </div>
        <div class="o-content">
          <h1>Promote <?= ($homeCity) ?></h1>
          <p>Use these pre-made messages to spread the word Jane's Walk in <?= ($homeCity) ?></p>
          <div class="options">
            <div class="option">
              <div class="copy">
                "<?= ($homeCity) ?> has <?= ($numberOfWalksInCity) ?> walks happening this year. Why not make it <?= ($numberOfWalksInCity + 1) ?>? Lead a Jane's Walk in <?= ($homeCity) ?> this year!"
              </div>
              <div class="networks clearfix">
                <a href="#" class="icon-facebook"></a>
                <a href="#" class="icon-twitter"></a>
                <a href="#" class="icon-envelope"></a>
              </div>
            </div>
            <div class="option hidden">
              <div class="copy">
                "Calling all volunteers in <?= ($homeCity) ?>! We need some help at this year's Jane's Walk!"
              </div>
              <div class="networks clearfix">
                <a href="#" class="icon-facebook"></a>
                <a href="#" class="icon-twitter"></a>
                <a href="#" class="icon-envelope"></a>
              </div>
            </div>
            <div class="option hidden">
              <div class="copy">
                Option #3 ...
              </div>
              <div class="networks clearfix">
                <a href="#" class="icon-facebook"></a>
                <a href="#" class="icon-twitter"></a>
                <a href="#" class="icon-envelope"></a>
              </div>
            </div>
            <div class="option hidden">
              <div class="copy">
                Option #4 ...
              </div>
              <div class="networks clearfix">
                <a href="#" class="icon-facebook"></a>
                <a href="#" class="icon-twitter"></a>
                <a href="#" class="icon-envelope"></a>
              </div>
            </div>
            <div class="nav">
              <a href="#" class="left icon-arrow-left"></a>
              <a href="#" class="right icon-arrow-right"></a>
            </div>
          </div>
        </div>
      </div>
    <?php endif; ?>
    <!--
      http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar
    -->
    <div class="progressb clearfix" style="display: none;">
      <div class="bar"></div>
      <div class="step step1">
        <div class="number">1</div>
        <div class="copy">Update details</div>
      </div>
      <div class="step step2">
        <div class="number">2</div>
        <div class="copy">Choose display picture</div>
      </div>
      <div class="step step3">
        <div class="number">3</div>
        <div class="copy">Create a walk</div>
      </div>
      <div class="step step4">
        <div class="number">4</div>
        <div class="copy">Update city details</div>
      </div>
      <div class="step step5">
        <div class="number">5</div>
        <div class="copy">Share a story</div>
      </div>
    </div>
    <div class="steps">
      <div class="visual">
      </div>
      <div class="copy">
        <div class="step">
          <?php if($hasUpdatedDetails === false): ?>
            Next Step: <a href="#" class="tabLink" data-tab="account">Update your account details</a>
          <?php elseif($hasChosenPicture === false): ?>
            Next Step: <a href="#" class="tabLink" data-tab="picture">Update your display picture</a>
          <?php elseif($cityTabViewable === true && $hasUpdatedCityPage === false): ?>
            Next Step: <a href="#" class="tabLink" data-tab="city">Update your city details</a>
          <?php elseif($hasPostedBlogPost === false): ?>
            Next Step: <a href="#" class="tabLink" data-tab="dashboard">Share a story about walking in <?= ($homeCity) ?></a>
          <?php else: ?>
            You're ready for Jane's Walk <?= date('Y') ?>!
          <?php endif; ?>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li class="active">
        <a href="/index.php/profile/#tab=dashboard" data-tab="dashboard">Dashboard</a>
      </li>
      <?php if ($cityTabViewable === true): ?>
        <li>
          <a href="/index.php/profile/#tab=city" data-tab="city"><?= ($homeCity) ?></a>
        </li>
      <?php endif; ?>
      <li>
        <a href="/index.php/profile/#tab=account" data-tab="account">Account</a>
      </li>
      <li>
        <a href="/index.php/profile/#tab=picture" data-tab="picture">My Picture</a>
      </li>
      <li>
        <a href="/index.php/profile/#tab=resources" data-tab="resources">Resources</a>
      </li>
    </ul>
    <div class="content">
      <?php
        $dashboardClasses = array('block', 'dashboard', 'clearfix');
        if ($cityTabViewable === true) {
          array_push($dashboardClasses, 'threeColumnLayout');
        }
      ?>
      <div id="dashboardBlock" class="<?= implode(' ', $dashboardClasses) ?>" data-tab="dashboard">
        <div class="overlay walkPromoteOverlay">
          <div class="o-background">
          </div>
          <div class="o-content">
            <h1>Promote Your Walk</h1>
            <p>Use these pre-made messages to spread the word about your walk:</p>
            <div class="options">
              <div class="option">
                <div class="copy">
                  "Join me on my walk Celluloid and Popcorn: The history of Cinema on Roncesvalles at this year's Jane's Walk!"
                </div>
                <div class="networks clearfix">
                  <a href="#" class="icon-facebook"></a>
                  <a href="#" class="icon-twitter"></a>
                  <a href="#" class="icon-envelope"></a>
                </div>
              </div>
              <div class="option hidden">
                <div class="copy">
                  "As churches are being converted into lofts, and the cinemas into stores/coffee shops, our streetscape is ..."
                </div>
                <div class="networks clearfix">
                  <a href="#" class="icon-facebook"></a>
                  <a href="#" class="icon-twitter"></a>
                  <a href="#" class="icon-envelope"></a>
                </div>
              </div>
              <div class="option hidden">
                <div class="copy">
                  Option #3 ...
                </div>
                <div class="networks clearfix">
                  <a href="#" class="icon-facebook"></a>
                  <a href="#" class="icon-twitter"></a>
                  <a href="#" class="icon-envelope"></a>
                </div>
              </div>
              <div class="option hidden">
                <div class="copy">
                  Option #4 ...
                </div>
                <div class="networks clearfix">
                  <a href="#" class="icon-facebook"></a>
                  <a href="#" class="icon-twitter"></a>
                  <a href="#" class="icon-envelope"></a>
                </div>
              </div>
            </div>
            <div class="nav">
              <a href="#" class="left icon-arrow-left"></a>
              <a href="#" class="right icon-arrow-right"></a>
            </div>
          </div>
        </div>
        <div class="column walks">
          <div class="headline">My Walks</div>
          <a href="/walk/form/" class="btn btn-primary btn-small">Add a walk</a>
          <?php
            $nullcaseClasses = array('nullcase');
            if ($hasCreatedWalks === true) {
              array_push($nullcaseClasses, 'hidden');
            }
          ?>
          <div class="<?= implode(' ', $nullcaseClasses) ?>">
            <div class="copy">
              Create your first walk for Jane's Walk <?= date('Y') ?>. Just click the button
              above
            </div>
          </div>
          <?php
            // foreach( as $page) {
            /*
              <li>
                <a href="{$nh->getCollectionURL($page)}">{$page->getCollectionName()}</a>
                <a href="{$nh->getCollectionURL($newWalkForm)}?load={$page->getCollectionPath()}"> <i class="icon-edit" alt="edit"></i></a>
                <a href="{$nh->getCollectionURL($page)}" class="delete" data-cid="{$page->getCollectionID()}"><i class="icon-remove" alt="unpublish"></i></a>
              </li>";
            */
            // }
            $walkListClasses = array();
            if ($hasCreatedWalks === false) {
              array_push($walkListClasses, 'hidden');
            }
          ?>
          <ul class="<?= implode(' ', $walkListClasses) ?>">
            <?php
            // foreach ($walks as $walk):
            ?>
              <li class="odd">
                <div class="image" style="display: none;">
                  <img src="" />
                </div>
                <div class="details">
                  <div class="title">
                    <a href="http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/" title="">
                      Celluloid and Popcorn: The history of Cinema on Roncesvalles
                    </a>
                  </div>
                  <div class="subactions clearfix">
                    <a href="#" class="promote">Promote</a>
                    <a href="http://janeswalk.org/walk/form/?load=/canada/toronto/curb-cuts-and-desire-lines-super-sidewalk-audit" class="edit">Edit</a>
                    <a href="#" class="delete">Unpublish</a>
                  </div>
                </div>
              </li>
            <?php
            // endforeach;
            ?>
            <li class="even">
              <div class="image" style="display: none;">
                <img src="" />
              </div>
              <div class="details">
                <div class="title">
                  <a href="#">
                    <span class="label">DRAFT</span>
                    Celluloid and Popcorn: The history of Cinema on Roncesvalles
                  </a>
                </div>
                <div class="subactions clearfix">
                  <a href="#" class="edit">Edit</a>
                  <!-- <a href="#" class="delete">Delete</a> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <?php
          if ($cityTabViewable === true) {
        ?>
          <div class="column city">
            <div class="headline">My City's Walks</div>
            <?php
              $nullcaseClasses = array('nullcase');
              if ($cityHasWalks === true) {
                array_push($nullcaseClasses, 'hidden');
              }
            ?>
            <div class="<?= implode(' ', $nullcaseClasses) ?>">
              <div class="copy">
                <?= ($homeCity) ?> doesn't have any walks yet. Create the first one now.
              </div>
            </div>
            <?php
              $cityWalkListClasses = array();
              if ($cityHasWalks === false) {
                array_push($cityWalkListClasses, 'hidden');
              }
            ?>
            <ul class="<?= implode(' ', $cityWalkListClasses) ?>">
              <?php
              // foreach ($walks as $walk):
              ?>
                <li class="odd">
                  <div class="image" style="display: none;">
                    <img src="" />
                  </div>
                  <div class="details">
                    <div class="title">
                      <a href="http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/" title="">
                        Celluloid and Popcorn: The history of Cinema on Roncesvalles
                      </a>
                    </div>
                    <div class="subactions clearfix">
                      <a href="#" class="promote">Promote</a>
                      <a href="http://janeswalk.org/walk/form/?load=/canada/toronto/curb-cuts-and-desire-lines-super-sidewalk-audit" class="edit">Edit</a>
                      <a href="#" class="delete">Unpublish</a>
                    </div>
                  </div>
                </li>
              <?php
              // endforeach;
              ?>
              <li class="even">
                <div class="image" style="display: none;">
                  <img src="" />
                </div>
                <div class="details">
                  <div class="title">
                    <a href="#">
                      <span class="label">DRAFT</span>
                      Celluloid and Popcorn: The history of Cinema on Roncesvalles
                    </a>
                  </div>
                  <div class="subactions clearfix">
                    <a href="#" class="edit">Edit</a>
                    <!-- <a href="#" class="delete">Delete</a> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
        <?php
          }
        ?>
        <div class="column posts">
          <div class="headline">My Blog Posts</div>
          <?php
            $subject = rawurlencode(
              'I would like to submit a story to the ' . ($homeCity) . ' blog'
            );
            $body = rawurlencode(
              "Please begin writing your story below: \n\n\n"
            );
          ?>
          <a
            href="mailto:<?= ($cityOrganizerEmailAddress) ?>?subject=<?= ($subject) ?>&amp;body=<?= ($body) ?>"
            target="_blank"
            class="btn btn-primary btn-small">Share your story</a>
          <?php
            $nullcaseClasses = array('nullcase');
            if ($hasPostedBlogPost === true) {
              array_push($nullcaseClasses, 'hidden');
            }
          ?>
          <div class="<?= implode(' ', $nullcaseClasses) ?>">
            <div class="copy">
              You haven't shared a story on the <?= ($homeCity) ?> blog yet
            </div>
          </div>
          <?php
            $postListClasses = array();
            if ($hasPostedBlogPost === false) {
              array_push($postListClasses, 'hidden');
            }
          ?>
          <ul class="<?= implode(' ', $postListClasses) ?>">
              <?php
              // foreach ($walks as $walk):
              ?>
                <li class="odd">
                  <div class="image" style="display: none;">
                    <img src="" />
                  </div>
                  <div class="details">
                    <div class="title">
                      <a href="http://janeswalk.org/canada/toronto/celluloid-and-popcorn-history-cinema-roncesvalles/" title="">
                        Celluloid and Popcorn: The history of Cinema on Roncesvalles
                      </a>
                    </div>
                    <div class="subactions clearfix">
                      <a href="#" class="promote">Promote</a>
                    </div>
                  </div>
                </li>
              <?php
              // endforeach;
              ?>
              <li class="even">
                <div class="image" style="display: none;">
                  <img src="" />
                </div>
                <div class="details">
                  <div class="title">
                    <a href="#">
                      Celluloid and Popcorn: The history of Cinema on Roncesvalles
                    </a>
                  </div>
                    <div class="subactions clearfix">
                      <a href="#" class="promote">Promote</a>
                    </div>
                </div>
              </li>
          </ul>
        </div>
      </div>
      <?php if ($cityTabViewable === true): ?>
        <div id="cityBlock" class="block hidden" data-tab="city">
          <div class="main">
            <div class="headline"><?= ($homeCity) ?> Details</div>
            <p>
              Use this page to update the details for the <?= ($homeCity) ?>
              Jane's Walk page
            </p>
            <div class="editables clearfix">
              <div class="column headerInfo">
                <div class="name">Header Info</div>
                <div class="val">
                  <?php if ($headerInfoIsEmpty === true): ?>
                    <p>
                      <span class="icon icon-frown"></span>
                      You haven't filled in <?= ($homeCity) ?>'s header info
                    </p>
                    <a href="/index.php/dashboard/composer/write/-/edit/144/" class="btn btn-primary">Set header info</a>
                  <?php else: ?>
                    <p>
                      <span class="icon icon-check"></span>
                      <?= ($headerInfo) ?>
                      <a href="/index.php/dashboard/composer/write/-/edit/144/">Edit</a>
                    </p>
                  <?php endif; ?>
                </div>
              </div>
              <div class="column shortDescription">
                <div class="name">Short Description</div>
                <div class="val">
                  <?php if ($shortDescriptionIsEmpty === true): ?>
                    <p>
                      <span class="icon icon-frown"></span>
                      You haven't filled in <?= ($homeCity) ?>'s short description
                    </p>
                    <a href="/index.php/dashboard/composer/write/-/edit/144/" class="btn btn-primary">Set short description</a>
                  <?php else: ?>
                    <p>
                      <span class="icon icon-check"></span>
                      <?= ($shortDescription) ?>
                      <a href="/index.php/dashboard/composer/write/-/edit/144/">Edit</a>
                    </p>
                  <?php endif; ?>
                </div>
              </div>
              <div class="column backgroundPhoto">
                <div class="name">Background Photo</div>
                <div class="val">
                  <?php if ($backgroundPhotoIsEmpty === true): ?>
                    <p>
                      <span class="icon icon-frown"></span>
                      You haven't set <?= ($homeCity) ?>'s background photo yet
                    </p>
                    <a href="/index.php/dashboard/composer/write/-/edit/144/" class="btn btn-primary">Set background photo</a>
                  <?php else: ?>
                    <p>
                      <span class="icon icon-check"></span>
                      <span class="bgPhoto" style="background-image: url('<?= ($backgroundPhoto) ?>');"></span>
                      <a href="/index.php/dashboard/composer/write/-/edit/144/">Change</a>
                    </p>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Want more people at this year's Jane's Walk in <?= ($homeCity) ?>?</p>
            <a href="#" class="btn btn-primary btn-large promoteBtn" data-cityname="<?= ($homeCity) ?>">Promote Jane's Walk in <?= ($homeCity) ?></a>
          </div>
        </div>
      <?php endif; ?>
      <div id="accountBlock" class="block hidden" data-tab="account">
        <div class="success">
          <span class="icon-check"></span>
          Changes Saved
        </div>
        <form method="post" action="<?= ($this->action('save')) ?>" enctype="multipart/form-data" class="clearfix">
          <?php
            $attribs = UserAttributeKey::getEditableInProfileList();
            if(is_array($attribs) && count($attribs)) {
          ?>
            <div class="column details">
              <div class="headline">Details</div>
              <div class="field clearfix">
                <div class="">
                  <span class="required">*</span><?= ($form->label('uEmail', t('Email'))) ?>
                </div>
                <div class="input">
                  <?= ($form->text('uEmail', $ui->getUserEmail())) ?>
                </div>
              </div>
              <?php if(ENABLE_USER_TIMEZONES) { ?>
                <div class="field clearfix">
                  <div class="">
                    <span class="required">*</span><?= ($form->label('uTimezone', t('Time Zone'))) ?>
                  </div>
                  <div class="input">
                    <?= (
                      $form->select(
                        'uTimezone',
                        $date->getTimezones(), 
                        (
                          $ui->getUserTimezone() ? $ui->getUserTimezone() : date_default_timezone_get()
                        )
                      )
                    ) ?>
                  </div>
                </div>
              <?php
                }

                // Loop through all the fields
                $af = Loader::helper('form/attribute');
                $af->setAttributeObject($ui);
                foreach($attribs as $ak) {
                  print '<div class="field clearfix">';
                  print ($af->display($ak, $ak->isAttributeKeyRequiredOnProfile()));
                  print '</div>';
                }
              ?>
              <div class="btnWrapper">
                <?= ($form->submit('save', t('Save'), array(), 'btn-primary btn-large')) ?>
              </div>
            </div>
            <div class="column password">
              <div class="headline">Password</div>
              <div class="field clearfix">
                <div class="">
                  <?= ($form->label('uPasswordNew', t('New Password'))) ?>
                </div>
                <div class="input">
                  <?= ($form->password('uPasswordNew')) ?>
                </div>
              </div>
              <div class="field clearfix">
                <div class="">
                  <?= ($form->label('uPasswordNewConfirm', t('Confirm New Password'))) ?>
                </div>
                <div class="input">
                  <?= ($form->password('uPasswordNewConfirm')) ?>
                </div>
              </div>
              <div class="btnWrapper">
                <?= ($form->submit('save', t('Save'), array(), 'btn-primary btn-large')) ?>
              </div>
            </div>
          <?php
            }
          ?>
        </form>

      </div>
      <div id="pictureBlock" class="block hidden clearfix" data-tab="picture">
        <div class="success">
          <span class="icon-check"></span>
          Changes Saved
        </div>
        <div class="headline">Display Picture</div>
        <div class="column widget">
          <div
            id="flashContainer"
            data-width="<?= (AVATAR_WIDTH) ?>"
            data-height="<?= (AVATAR_HEIGHT) ?>"
            data-imagepath="<?= ($av->getImagePath($ui)) ?>"
            data-savepath="<?= ($this->url($c->getCollectionPath(), 'save_thumb')) ?>"
            data-flashpath="<?= (ASSETS_URL_FLASH) ?>/thumbnail_editor_3.swf"></div>
        </div>
        <div class="column tips">
          <p>
            Having a display picture is important for your walks, so people
            know who you are.<br /><br />
            Use the app on the left to upload your display picture.
          </p>
          <?php if ($ui->hasAvatar()) { ?>
            <a href="<?= ($this->action('delete')) ?>"><?= t('Remove your display picture') ?></a>
          <?php } ?>
        </div>
      </div>
      <div id="resourcesBlock" class="block hidden" data-tab="resources">
        <?php if ($resources['showCityOrganizers'] === true): ?>
          <div class="cos resourceBlock">
            <div class="headline">Connect with fellow city organizers</div>
            <p>
              Got a question?<br />
              Reach out to a fellow City Organizer for help
            </p>
            <ul class="clearfix">
              <?php foreach ($cityOrganizers as $organizer): ?>
                <li>
                  <img src="http://maps.googleapis.com/maps/api/staticmap?center=<?= ($organizer['cityName']) ?>,Canada&amp;zoom=12&amp;size=250x125&amp;sensor=false" class="map" />
                  <img src="<?= ($organizer['organizerImagePath']) ?>" class="display" />
                  <div class="meta">
                    <div class="name"><?= ($organizer['organizerName']) ?></div>
                    <div class="email">
                      <a href="mailto:<?= ($organizer['organizerEmail']) ?>"><?= ($organizer['organizerEmail']) ?></a>
                    </div>
                  </div>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
        <?php if ($resources['showGlobalWalks'] === true): ?>
          <div class="ideas resourceBlock">
            <div class="headline">Walks from around the world</div>
            <p>
              Don't know what kind of walk to lead?<br />
              Here are some fun ones from around the world
            </p>
            <ul class="clearfix">
              <?php foreach ($featuredWalks as $featuredWalk): ?>
                <li>
                  <div class="banner" style="background-image: url('<?= ($featuredWalk['walkImagePath']) ?>');"></div>
                  <img src="/themes/janeswalk/images/countryFlags/<?= ($featuredWalk['countryName']) ?>.png" class="flag" />
                  <div class="meta">
                    <div class="city"><?= ($featuredWalk['cityName']) ?></div>
                    <div class="title">
                      <a href="<?= ($featuredWalk['walkPath']) ?>"><?= ($featuredWalk['walkTitle']) ?></a>
                    </div>
                  </div>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
        <?php if ($resources['showTips'] === true): ?>
          <div class="vimeos resourceBlock">
            <div class="headline">Tips on leading a walk</div>
            <p>
              Leading your first or fith walk?<br />
              Here are some tips from the Jane's Walk crew
            </p>
            <ul class="clearfix">
              <li>
                <iframe src="//player.vimeo.com/video/91185841" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </li>
              <li>
                <iframe src="//player.vimeo.com/video/91188859" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </li>
              <li>
                <iframe src="//player.vimeo.com/video/91190408" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </li>
            </ul>
          </div>
        <?php endif; ?>
        <?php if ($resources['showFiles'] === true): ?>
          <div class="files resourceBlock">
            <div class="headline">Files</div>
            <p>
              Want help promoting Jane's Walk?<br />
              Use these files to promote Jane's Walk in your city
            </p>
            <ul class="clearfix">
              <li>
                <a href="#">
                  <img src="/themes/janeswalk/images/pdf.png" />
                  Announce the Jane's Walk Festival
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/themes/janeswalk/images/pdf.png" />
                  Press Release #1
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/themes/janeswalk/images/pdf.png" />
                  Press Release #2
                </a>
              </li>
            </ul>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
<!--
<div id="ccm-profile-wrapper">
  <?php Loader::element('profile/sidebar', array('profile'=> $profile)); ?>    
  <div id="ccm-profile-body">   
    <div id="ccm-profile-body-attributes">
      <div class="ccm-profile-body-item">
        <h1><?=$profile->getUserName()?></h1>
        <a href="<?= ($this->url('/profile/edit')) ?>" target="_self" class="btn btn-primary btn-large" style="margin-bottom: 10px;">Fill out your profile</a>
        <?php 
        foreach(UserAttributeKey::getPublicProfileList() as $ua) { ?>
        <div>
          <label><?=tc('AttributeKeyName', $ua->getAttributeKeyName())?></label>
          <?=$profile->getAttribute($ua, 'displaySanitized', 'display');?>
        </div>
        <?php  } ?>     
      </div>
    </div>
    <?php if($u->getUserID() == $profile->getUserID()) {
      $newWalkForm = Page::getByPath("/walk/form"); ?>
      <form class="simple" action="<?= $nh->getCollectionURL($newWalkForm) ?>" method="get" autocomplete="off" style="margin:0">
        <fieldset class="dropsubmit">
          <select name="parentCID" onchange="this.form.submit()">
            <option selected="selected">Submit a Walk to a City</option>
            <?php
            $cities = new PageList();
            $cities->filterByCollectionTypeHandle('city');
            $cities->sortByName();
            foreach($cities->get() as $city) {
            ?>
            <option value="<?=$city->getCollectionID()?>"><?=$city->getCollectionName()?></option>
            <?php } ?>
          </select> 
          <input type="submit" value="Go!">
        </fieldset>
      </form>
      <h3>Your Public Walks</h3>
      <ul class="walks">
        <?php
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        $pl->filterByUserID($u->getUserID());
        $pl->filterByAttribute('exclude_page_list',false);
        foreach($pl->get() as $page) {
          echo "<li><a href='{$nh->getCollectionURL($page)}'>{$page->getCollectionName()}</a><a href='{$nh->getCollectionURL($newWalkForm)}?load={$page->getCollectionPath()}'> <i class='icon-edit' alt='edit'></i></a> <a href='{$nh->getCollectionURL($page)}' class='delete' data-cid='{$page->getCollectionID()}'><i class='icon-remove' alt='unpublish'></i></a></li>";
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
          echo "<li>{$latest->getCollectionName()} <a href='{$nh->getCollectionURL($newWalkForm)}?load={$page->getCollectionPath()}'><i class='icon-edit'></i></a></li>";
        } ?>
      </ul>
    <?php } ?>
    <?php }
    $a = new Area('Main'); 
    $a->setAttribute('profile', $profile); 
    $a->setBlockWrapperStart('<div class="ccm-profile-body-item">');
    $a->setBlockWrapperEnd('</div>');
    $a->display($c); 
    ?>
  </div>
</div>
-->
