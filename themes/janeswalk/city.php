<?php
defined('C5_EXECUTE') || die(_("Access Denied."));
$this->inc('elements/header.php');

// Photo credits
if ($city->fullbg) {
    $bgPhotoCreditName = $city->fullbg->getAttribute('background_photo_credit_name');
    $bgPhotoCreditLink = $city->fullbg->getAttribute('background_photo_credit_link');
}

?>
<div id="fb-root"></div>
<script type="text/javascript">
    window.fbAsyncInit = function () {
        FB.init({
            appId: '544710848887303',
            status: true,
            xfbml: true
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/all.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
<?php $this->inc('elements/navbar.php') ?>
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
<div class="container-outter" role="main">
    <div class="intro-city">
        <div class="container">
            <div class="city-header">
                <h1>
                    <?= t($city) ?>
                    <?php if ($canEdit) { ?><a href="<?= $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()) ?>"><i class='fa fa-pencil-square'></i></a><?php } ?>
                </h1>
                <?php (new Area('City Header'))->display($c) ?>
                <?php if ($bgPhotoCreditName && $bgPhotoCreditName) { ?>
                <p style="font-size: x-small; color: #fff;">
                    <?= t('Background photo credit') ?>:
                    <a href="<?= $bgPhotoCreditLink ?>" target="_blank"><?= $bgPhotoCreditName ?></a>
                </p>
                <?php } ?>
                <?php if ($c->getCollectionUserID() > 1) { ?>
                <section class="city-organizer">
                    <?php if ($avatar) { ?>
                    <a href="<?= $profile_path ?>">
                        <div class="u-avatar" style='background-image:url(<?= $avatar ?>)'></div></a>
                    <?php } ?>
                    <div class="city-organizer-details">
                        <h3>
                            <a href="<?= $city->profile_path ?>"><?= $city->city_organizer->getAttribute('first_name'), ' ', $city->city_organizer->getAttribute('last_name') ?></a>
                            <?php if ($isCityOrganizer) { ?><a href="<?= $this->url('/profile/edit') ?>"><i class='fa fa-pencil-square'></i></a><?php } ?>
                        </h3>
                        <h4><?= t('City Organizer') ?></h4>
                        <div class="btn-toolbar">
                            <a href="mailto:<?= $city->city_organizer->getUserEmail() ?>" class="btn"><i class="fa fa-envelope-o"></i></a>
                            <?php if ($city->facebook) { ?><a href='<?= $city->facebook_url ?>' target='_blank' class='btn'><i class='fa fa-facebook'></i></a><?php } ?>
                            <?php if ($city->twitter) { ?><a href='<?= $city->twitter_url ?>' target='_blank' class='btn'><i class='fa fa-twitter'></i></a><?php } ?>
                            <?php if ($city->website) { ?><a href='<?= $city->website_url ?>' target='_blank' class='btn'><i class='fa fa-globe'></i></a><?php } ?>
                        </div>
                    </div>
                </section>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
<div class="section3 city-city">
    <div class="container">
        <div class="walk-select">
            <div class="action-items walk-preview">
                <div class="item">
                    <h2><?= t('Jane’s Walks') ?></h2>
                    <h4><?= t('Get out and walk! Explore, learn and share through a Jane’s Walk in %s', (string) $city) ?></h4>
                    <?php (new Area('City Description'))->display($c) ?>
                </div>
                <div class="menu-flags">
                    <?php (new Area('City Nav'))->display($c) ?>
                </div>
                <?php (new Area('Sponsors'))->display($c) ?>
            </div>
            <div class="walks-list">
                <a href="<?= $this->url('/walk/form'), '?parentCID=', $c->getCollectionID() ?>" class="create-walk"><i class="fa fa-star"></i> <?= t('Create a Walk') ?></a>
                <h3><?= t('Walks in %s', (string) $city) ?></h3>
                <?php (new Area('All Walks List'))->display($c); ?>
            </div>
        </div>
    </div>
</div>
<?php if ($c->isEditMode() || $blog) { ?>
<div class="intro-city lower blog">
    <div class="container">
        <h2 class="title"><a href="<?= $blog ? $nh->getCollectionURL($blog) : '' ?>"><?= t('City Blog') ?></a>
            <?php if ($blog && (new Permissions($blog))->canAddSubpage()) { ?>
            <a class="add" href="<?= $this->url('/dashboard/composer/write/', CollectionType::getByHandle('city_blog_entry')->getCollectionTypeID(), '/', $blog->getCollectionID()) ?>">
                <i class="fa fa-angle-double-right"></i> <?= t('post new article') ?></a>
            <?php } ?>
        </h2>
        <?php (new Area('City Blog'))->display($c) ?>
    </div>
</div>
<?php }
$this->inc('elements/footer.php');
