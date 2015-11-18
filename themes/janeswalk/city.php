<?php
defined('C5_EXECUTE') || die(_('Access Denied.'));

// Translate function
$t = 't';

$area = function($name) use ($c) {
    ob_start();
    (new Area($name))->display($c);
    return ob_get_clean();
};

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

$cityName = t((string) $city);

$intro = nl2br($c->getCollectionDescription());
$longDescription = $c->getAttribute('longdescription');

/**
 * Template Components
 */
// Edit
if ($canEdit) {
    $Edit = <<< EOT
<a href="{$this->url('/dashboard/composer/write/-/edit/' . $c->getCollectionID())}"><i class='fa fa-pencil-square'></i></a>
EOT;
}

if ($c->isEditMode() || $blog) {
    if ($blog) {
        $BlogLink = $nh->getCollectionURL($blog);
    }

    if ($blog && (new Permissions($blog))->canAddSubpage()) {
        $BlogPostButton = <<< EOT
<a class="add" href="{$this->url('/dashboard/composer/write/', CollectionType::getByHandle('city_blog_entry')->getCollectionTypeID(), $blog->getCollectionID())}">
    <i class="fa fa-angle-double-right"></i> {$t('post new article')}
</a>
EOT;
    }

    $Blog = <<< EOT
<section id="blog">
    <h2 class="title"><a href="{$BlogLink}">{$t('City Blog')}</a>
        {$BlogPostButton}
    </h2>
    {$area('City Blog')}
</section>
<script>JanesWalk.event.emit('blog.receive', {"url": "{$BlogLink}"});</script>
EOT;
}

// Background Photo
if ($bgPhotoCreditName && $bgPhotoCreditName) {
    $BackgroundPhoto = <<< EOT
<small>
    {$t('Background photo credit')}
    <a href="{$bgPhotoCreditLink}" target="_blank">{$bgPhotoCreditName}</a>
</small>
EOT;
}

// CO Details
if ($c->getCollectionUserID() > 1) {
    if ($city->avatar) {
        $COAvatar = <<< EOT
<a href="{$city->profile_path}"><div class="u-avatar" style='background-image:url({$city->avatar})'></div></a>
EOT;
    }

    if ($isCityOrganizer) {
        $COEdit = <<< EOT
<a href="{$this->url('/profile/edit')}"><i class='fa fa-pencil-square'></i></a>
EOT;
    }

    $COContacts = array_reduce(
        $coContacts,
        function($p, $contact) {
            return $p . <<< EOT
<a href='{$contact['url']}' target="_blank" class="btn"><i class="fa fa-{$contact['icon']}"></i></a>
EOT;
        }
    );

    $CityOrganizerDetails = <<< EOT
<section class="city-organizer">
    {$COAvatar}
    <div class="city-organizer-details">
        <h3>
            <a href="{$city->profile_path}">{$city->cityOrganizer->getAttribute('first_name')} {$city->cityOrganizer->getAttribute('last_name')}</a>
            {$COEdit}
        </h3>
        <h4>{$t('City Organizer')}</h4>
        <div class="btn-toolbar">
            <a href="mailto:{$city->cityOrganizer->getUserEmail()}" class="btn"><i class="fa fa-envelope-o"></i></a>
            {$COContacts}
        </div>
    </div>
</section>
EOT;
}

$this->inc('elements/header.php');
$this->inc('elements/navbar.php');

// Template
echo <<< EOT
<section id="intro-city">
    <div class="city-summary">
        <h1>
            {$cityName}
            {$Edit}
        </h1>
        {$intro}
        {$area('City Header')}
        {$BackgroundPhoto}
        {$CityOrganizerDetails}
    </div>
</section>
<section id="city-details">
    <div class="description">
        <div class="item">
            <h2>{$t('Jane’s Walks')}</h2>
            <h4>{$t('Get out and walk! Explore, learn and share through a Jane’s Walk in %s', $cityName)}</h4>
            {$longDescription}
            {$area('City Description')}
        </div>
        <div class="menu-flags">
            {$area('City Nav')}
        </div>
        {$area('Sponsors')}
    </div>
    <div class="walk-list">
        <a href="{$this->url('/walk/form')}?parentCID={$c->getCollectionID()}" class="create-walk"><i class="fa fa-star"></i> {$t('Create a Walk')}</a>
        <h3>{$t('Walks in %s', $cityName)}</h3>
        {$area('All Walks List')}
    </div>
</section>
{$Blog}
EOT;

$this->inc('elements/footer.php');
