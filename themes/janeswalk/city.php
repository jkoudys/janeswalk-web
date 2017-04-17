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
    <h4>
        <a href="{$BlogLink}">
            {$t('See more stories')} <i class="fa fa-angle-double-right"></i>
        </a>
    </h4>
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
    <div class="city-organizer-details">
        {$COAvatar}
        <h3>
            <a href="{$city->profile_path}">{$city->cityOrganizer->getAttribute('first_name')} {$city->cityOrganizer->getAttribute('last_name')}</a>
            {$COEdit}
        </h3>
        <h4>{$t('City Organizer')}</h4>
        <div class="btn-toolbar">
            <p>contact</p>
            <a href="mailto:{$city->cityOrganizer->getUserEmail()}" class="btn"><i class="fa fa-envelope-o"></i></a>
            {$COContacts}
        </div>
    </div>
</section>
EOT;
}

// Template for JavaScript events
$scripts = '<script>JanesWalk.event.emit("city.receive", ' . json_encode($city) . ')</script>';

include __DIR__ . '/elements/header.php';
include __DIR__ . '/elements/navbar.php';

// Template
echo <<< EOT
<h1 class="cityName">
     {$cityName}
     {$Edit}
      <a href="{$this->url('/walk/form')}?parentCID={$c->getCollectionID()}" class="create-walk-city-header">{$t('Lead a Walk')}</a>
</h1>
<section id="intro-city">
 <div class="city-summary">
     {$intro}
     {$area('City Header')}
     {$BackgroundPhoto}
 </div>
 <section id="city-sidebar">
  <div>
     {$CityOrganizerDetails}
  </div>
   <div class="menu-flags">
     {$area('City Nav')}
   </div>
 </section>
</section>
<section id="city-details">
 <div class="walk-list">
      <div class="item">
          <h3>{$t('Walks in %s', $cityName)}</h3> 
          <a href="/walk/form?parentCID={$c->getCollectionID()}" class="create-walk"><i class="fa fa-star"></i> {$t('Lead a Walk')}!</a>
      </div>
     {$area('All Walks List')}
 </div>
</section>
<section class="sponsors">
    {$area('Sponsors')}
</section>
{$Blog}
{$scripts}
EOT;

include __DIR__ . '/elements/footer.php';
