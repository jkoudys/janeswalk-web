<?php
defined('C5_EXECUTE') || die(_("Access Denied."));
$this->inc('elements/header.php');

// Photo credits
if ($city->fullbg) {
    $bgPhotoCreditName = $city->fullbg->getAttribute('background_photo_credit_name');
    $bgPhotoCreditLink = $city->fullbg->getAttribute('background_photo_credit_link');
}

// CO's contact methods
$coContacts = [];
if ($city->facebook) {
    $coContacts[] = ['url' => $city->facebook_url, 'icon' => 'facebook'];
}
if ($city->twitter) {
    $coContacts[] = ['url' => $city->twitter_url, 'icon' => 'twitter'];
}
if ($city->website) {
    $coContacts[] = ['url' => $city->website_url, 'icon' => 'globe'];
}

$this->inc('elements/navbar.php') ?>
<section id="intro-city">
    <div class="city-summary">
        <h1>
            <?= t($city) ?>
            <?php if ($canEdit) { ?><a href="<?= $this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID()) ?>"><i class='fa fa-pencil-square'></i></a><?php } ?>
        </h1>
        <?php (new Area('City Header'))->display($c) ?>
        <?php if ($bgPhotoCreditName && $bgPhotoCreditName) { ?>
        <small>
            <?= t('Background photo credit') ?>:
            <a href="<?= $bgPhotoCreditLink ?>" target="_blank"><?= $bgPhotoCreditName ?></a>
        </small>
        <?php } ?>
        <?php if ($c->getCollectionUserID() > 1) { ?>
        <section class="city-organizer">
            <?php if ($city->avatar) { ?>
            <a href="<?= $city->profile_path ?>"><div class="u-avatar" style='background-image:url(<?= $city->avatar ?>)'></div></a>
            <?php } ?>
            <div class="city-organizer-details">
                <h3>
                    <a href="<?= $city->profile_path ?>"><?= $city->city_organizer->getAttribute('first_name'), ' ', $city->city_organizer->getAttribute('last_name') ?></a>
                    <?php if ($isCityOrganizer) { ?><a href="<?= $this->url('/profile/edit') ?>"><i class='fa fa-pencil-square'></i></a><?php } ?>
                </h3>
                <h4><?= t('City Organizer') ?></h4>
                <div class="btn-toolbar">
                    <a href="mailto:<?= $city->city_organizer->getUserEmail() ?>" class="btn"><i class="fa fa-envelope-o"></i></a>
                    <?php foreach($coContacts as $contact) { ?><a href='<?= $contact['url'] ?>' target="_blank" class="btn"><i class="fa fa-<?= $contact['icon'] ?>"></i></a><?php } ?>
                </div>
            </div>
        </section>
        <?php } ?>
    </div>
</section>
<section id="city-details">
    <div class="description">
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
    <div class="walk-list">
        <a href="<?= $this->url('/walk/form'), '?parentCID=', $c->getCollectionID() ?>" class="create-walk"><i class="fa fa-star"></i> <?= t('Create a Walk') ?></a>
        <h3><?= t('Walks in %s', (string) $city) ?></h3>
        <?php (new Area('All Walks List'))->display($c) ?>
    </div>
</section>
<?php if ($c->isEditMode() || $blog) { ?>
<section id="blog">
    <h2 class="title"><a href="<?= $blog ? $nh->getCollectionURL($blog) : '' ?>"><?= t('City Blog') ?></a>
        <?php if ($blog && (new Permissions($blog))->canAddSubpage()) { ?>
        <a class="add" href="<?= $this->url('/dashboard/composer/write/', CollectionType::getByHandle('city_blog_entry')->getCollectionTypeID(), '/', $blog->getCollectionID()) ?>">
            <i class="fa fa-angle-double-right"></i> <?= t('post new article') ?></a>
        <?php } ?>
    </h2>
    <?php (new Area('City Blog'))->display($c) ?>
</section>
<?php }
$this->inc('elements/footer.php');
