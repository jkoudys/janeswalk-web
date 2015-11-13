<?php
require_once(DIR_BASE . '/models/page_types/City.php');
require_once(DIR_BASE . '/models/page_types/Walk.php');
use \JanesWalk\Models\PageTypes\City;
use \JanesWalk\Models\PageTypes\Walk;

define('IS_PROFILE', 1);
$ui = UserInfo::getByID($u->getUserID());

// Get strings we'll need a few times
$homeCityName = $userHomeCity ? $userHomeCity->getCollectionName() : false;
$walkFormURL = $nh->getCollectionURL($newWalkForm);

// Load the user's 'next step' message for filling out profile
$nextStep = null;
if (!$userHasSetName) {
    $nextStep = ['tab' => 'account', 'message' => t('Set your name')];
} elseif (!$homeCityName) {
    $nextStep = ['tab' => 'account', 'message' => t('Set your home city')];
} /* elseif (!$userPicture) {
    $nextStep = ['tab' => 'picture', 'message' => t('Update your display picture')];
} */ elseif ($userIsCityOrganizer && !$cityHasFullDetails) {
    $nextStep = ['tab' => 'city', 'message' => t('Update your city header, description and photo')];
} elseif (empty($userBlogPosts)) {
    $nextStep = ['tab' => 'dashboard', 'message' => t('Share a story about walking in %s', $homeCityName)];
}

// Resource videos for COs
$resourceVideos = [
    '//player.vimeo.com/video/91185841',
    '//player.vimeo.com/video/91188859',
    '//player.vimeo.com/video/91190408'
];

// Build arrays to avoid control-logic inside the HTML
// TODO: put these all in one json_encode to send to ReactJS view
$getWalkData = function($walk) use ($nh) {
    return [
        'id' => $walk->getCollectionID(),
        'name' => $walk->getCollectionName(),
        'url' => $nh->getCollectionURL($walk),
        'path' => $walk->getCollectionPath(),
        'published' => !($walk->getAttribute('exclude_page_list') === '1')
    ];
};

// Walks owned by this user
$userWalksArr = array_map($getWalkData, (array) $userWalks);

// Walks owned by their city
$cityWalksArr = array_map($getWalkData, (array) $cityWalks);

// User's blog posts
$userBlogPostsArr = array_map(
    function($post) use ($nh) {
        return [
            'id' => $post->getCollectionID(),
            'name' => $post->getCollectionName(),
            'url' => $nh->getCollectionURL($post)
        ];
    },
    (array) $userBlogPosts
);

// Messages for promoting your city
$cityPromoMessages = [
    t('%1$s has %2$s happening this year. Why not make it %3$s? Lead a Jane\'s Walk in %1$s this year!', $homeCityName, t2('%d walk', '%d walks', count($cityWalks)), count($cityWalks) + 1),
    t('Calling all volunteers in %s! We need some help at this year\'s Jane\'s Walk!', $homeCityName)
];

$walkPromoMessages = [
    t('Join me on my walk [WALKNAME] at this year\'s Jane\'s Walk!')
];

$blogPromoMessages = [
];

// Walk Model objects
$walkObjects = array_map(function($walkPage) { return new Walk($walkPage); }, $cityWalks);

?>
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

    window.JanesWalk = window.JanesWalk || {}; window.JanesWalk.cityUsers = <?= json_encode($cityUsers) ?>;
    JanesWalk.event.emit('profile.receive', {city: Object.assign(<?= json_encode(new City($city)) ?>, {walks: <?= json_encode($walkObjects) ?>})});
</script>
<?php
/* walk transfer modal */ 
if ($cityOrganizerData) {
?>
<dialog id="walk-transfer">
    <div>
        <article>
            <header>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">Assign walk to user</h4>
            </header>
            <section>
                <table class="users">
                    <?php foreach ($cityUsers as $user) { ?>
                    <tr><td><a data-uid="<?= $user['id'] ?>"><?= trim($user['firstName'] . ' ' . $user['lastName']) ?></a></td></tr>
                    <?php } ?>
                </table>
            </section>
        </article>
    </div>
</dialog>
<?php
}
?>
<main id="profileWrapper" <?= $homeCityName ? ('data-city="' . $homeCityName . '"') : '' ?>>
    <?php if ($userIsViewingSelf === true) { ?>
    <?php if ($userHomeCity) { ?>
    <div class="overlay promoteOverlay cityPromoteOverlay" data-slideshow="city" data-citypath="<?= $userHomeCity->getCollectionPath() ?>" data-cityname="<?= $userHomeCity->getCollectionName() ?>">
        <div class="o-background"></div>
        <div class="o-content">
            <h1><?= tc('Promote CITY_NAME', 'Promote %s', $homeCityName) ?></h1>
            <p><?= t('Use these pre-made messages to spread the word about Jane\'s Walk in %s', $homeCityName) ?></p>
            <div class="options">
                <?php foreach ($cityPromoMessages as $key => $message) { ?>
                <div class="option <?= $key ? 'hidden' : '' ?>">
                    <div class="copy"><?= $message ?></div>
                    <div class="networks">
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-twitter"></a>
                        <a href="#" class="fa fa-envelope"></a>
                    </div>
                </div>
                <?php } ?>
                <div class="nav">
                    <a href="#" class="left fa fa-arrow-left" data-slideshow="city"></a>
                    <a href="#" class="right fa fa-arrow-right" data-slideshow="city"></a>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
    <?php if (!empty($userBlogPosts)) { ?>
    <div class="overlay promoteOverlay blogPostPromoteOverlay" data-slideshow="blogPost">
        <div class="o-background"></div>
        <div class="o-content">
            <h1><?= t('Promote Blog Post') ?></h1>
            <p><?= t('Use these pre-made messages to spread the word about this blog post') ?></p>
            <div class="options">
                <div class="option">
                    <div class="copy">
                        "<?= 'Sample tweet: <span class="objTitle">{obj.title}</span>' ?>"
                    </div>
                    <div class="networks">
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-twitter"></a>
                        <a href="#" class="fa fa-envelope"></a>
                    </div>
                </div>
                <div class="nav">
                    <a href="#" class="left fa fa-arrow-left" data-slideshow="blogPost"></a>
                    <a href="#" class="right fa fa-arrow-right" data-slideshow="blogPost"></a>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
    <div class="steps">
        <div class="visual">
        </div>
        <div class="copy">
            <div class="step">
                <?php if ($nextStep) { ?>
                <a href="#" class="tabLink" data-tab="<?= $nextStep['tab'] ?>"><?= $nextStep['message'] ?></a>
                <?php } else { ?>
                <?= t('You\'re ready for Jane\'s Walk %s!', date('Y')) ?>
                <?php } ?>
            </div>
        </div>
    </div>
    <ul class="nav nav-tabs">
        <li class="active">
            <a href="/index.php/profile/#tab=dashboard" data-tab="dashboard"><?= t('Dashboard') ?></a>
        </li>
        <?php if ($userHomeCity && $userIsCityOrganizer) { ?>
        <li>
            <a href="/index.php/profile/#tab=city" data-tab="city"><?= $homeCityName ?></a>
        </li>
        <li>
            <a href="/index.php/profile/#tab=impact" data-tab="impact"><?= t('Impact Reporting') ?></a>
        </li>
        <?php } ?>
        <li>
            <a href="/index.php/profile/#tab=account" data-tab="account"><?= t('Account') ?></a>
        </li>
        <li>
            <a href="/index.php/profile/#tab=picture" data-tab="picture"><?= t('My Picture') ?></a>
        </li>
        <li>
            <a href="/index.php/profile/#tab=resources" data-tab="resources"><?= t('Resources') ?></a>
        </li>
    </ul>
    <div class="content">
        <?php
        $dashboardClasses = ['block', 'dashboard'];
        if ($userHomeCity) {
            array_push($dashboardClasses, 'threeColumnLayout');
        }
        ?>
        <div id="dashboardBlock" class="<?= implode(' ', $dashboardClasses) ?>" data-tab="dashboard">
            <div class="overlay promoteOverlay walkPromoteOverlay" data-slideshow="walk">
                <div class="o-background"></div>
                <div class="o-content">
                    <h1><?= t('Promote Your Walk') ?></h1>
                    <p><?= t('Use these pre-made messages to spread the word about your walk') ?>:</p>
                    <div class="options">
                        <?php foreach ($walkPromoMessages as $key => $message) { ?>
                        <div class="option <?= $key ? 'hidden' : '' ?>">
                            <div class="copy">
                                "<?= $message ?>"
                            </div>
                            <div class="networks">
                                <a href="#" class="fa fa-facebook"></a>
                                <a href="#" class="fa fa-twitter"></a>
                                <a href="#" class="fa fa-envelope"></a>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <div class="nav">
                        <a href="#" class="left fa fa-arrow-left" data-slideshow="walk"></a>
                        <a href="#" class="right fa fa-arrow-right" data-slideshow="walk"></a>
                    </div>
                </div>
            </div>
            <div class="column walks">
                <div class="headline"><?= t('My Walks') ?></div>
                <a href="<?= $nh->getCollectionURL(Page::getByPath('/walk/form/')) ?>" class="btn btn-primary btn-small"><?= t('Add a walk') ?></a>
                <?php
                $nullcaseClasses = ['nullcase'];
                if (!empty($userWalksArr)) {
                    array_push($nullcaseClasses, 'hidden');
                }
                ?>
                <div class="<?= implode(' ', $nullcaseClasses) ?>">
                    <div class="copy">
                        <?= t('Create your first walk for Jane\'s Walk %s. Just click the button above', date('Y')) ?>
                    </div>
                </div>
                <ul class="<?= empty($userWalksArr) ? 'hidden' : '' ?>">
                    <?php foreach ($userWalksArr as $walk) { ?>
                        <li>
                            <div class="image" style="display: none;">
                                <img src="" />
                            </div>
                            <div class="details">
                                <div class="title">
                                    <?php if (!$walk['published']) { ?>
                                        <span class="label"><?= t('DRAFT') ?></span>
                                    <?php } ?>
                                    <a href="<?= $walk['url'] ?>" title="">
                                        <?= $walk['name'] ?: '(untitled)' ?>
                                    </a>
                                </div>
                                <div class="subactions">
                                    <?php if ($walk['published']) { ?>
                                        <a href="#" class="promote" data-walktitle="<?= addslashes($walk['name']) ?>" data-walkpath="<?= $walk['url'] ?>" data-walkid="<?= $walk['id'] ?>"><?= t('Promote') ?></a>
                                    <?php } ?>
                                    <a href="<?= $walkFormURL ?>?load=<?= $walk['path'] ?>" class="edit"><?= t('Edit') ?></a>
                                    <?php if ($walk['published']) { ?>
                                    <a href="<?= $walk['url'] ?>" class="delete" data-cid="<?= $walk['id'] ?>"><?= t('Unpublish') ?></a>
<?php
                                    }
                                    if ($userIsCityOrganizer) {
                                    ?>
                                    <a href="<?= $walk['url'] ?>" class="transfer hidden" data-cid="<?= $walk['id'] ?>"><?= t('Transfer') ?></a>
                                    <?php } ?>
                                </div>
                            </div>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <?php
            if ($userHomeCity) {
            ?>
            <div class="column city">
                <div class="headline"><?= t('My City\'s Walks') ?></div>
                <a href="<?= $nh->getLinkToCollection($city) ?>" class="btn btn-primary btn-small"><?= t('Visit my city') ?></a>
                <?php
                $nullcaseClasses = ['nullcase'];
                if ($cityHasWalks === true) {
                    $nullcaseClasses[] = 'hidden';
                }
                ?>
                <div class="<?= implode(' ', $nullcaseClasses) ?>">
                    <div class="copy">
                        <?= t('%s doesn\'t have any walks yet. Create the first one now.', $homeCityName) ?>
                    </div>
                </div>
                <ul class="<?= $cityHasWalks ? '' : 'hidden' ?>">
                    <?php foreach ($cityWalksArr as $walk) { ?>
                    <li>
                        <div class="image" style="display: none;">
                            <img src="" />
                        </div>
                        <div class="details">
                            <div class="title">
                                <?php if (!$walk['published']) { ?>
                                    <span class="label"><?= t('DRAFT') ?></span>
                                <?php } ?>
                                <a href="<?= $walk['url'] ?>" title="">
                                    <?= $walk['name'] ?: '(untitled)' ?>
                                </a>
                            </div>
                            <?php if ($userIsCityOrganizer) { ?>
                            <div class="subactions">
                                <?php if ($walk['published']) { ?>
                                    <a href="#" class="promote" data-walktitle="<?= addslashes($walk['name']) ?>" data-walkpath="<?= $walk['url'] ?>" data-walkid="<?= $walk['id'] ?>"><?= t('Promote') ?></a>
                                <?php } ?>
                                <a href="<?= $walkFormURL ?>?load=<?= $walk['path'] ?>" class="edit"><?= t('Edit') ?></a>
                                <?php if ($walk['published']) { ?>
                                    <a href="<?= $walk['url'] ?>" class="delete" data-cid="<?= $walk['id'] ?>"><?= t('Unpublish') ?></a>
                                <?php } ?>
                            </div>
                            <?php } ?>
                        </div>
                    </li>
                    <?php } ?>
                </ul>
            </div>
            <?php
            }
            ?>
            <div class="column blogPosts">
                <div class="headline"><?= t('My Blog Posts') ?></div>
<?php
            $subject = rawurlencode(
                t('I would like to submit a story to the %s blog', $homeCityName)
            );
            $body = rawurlencode(
                t('Please begin writing your story below') . ":\n\n\n"
            );
?>
                <a
                    href="mailto:<?= ($cityOrganizerEmailAddress) ?>?subject=<?= ($subject) ?>&amp;body=<?= ($body) ?>"
                    target="_blank"
                    class="btn btn-primary btn-small"><?= t('Share my story') ?></a>
                <?php
                $nullcaseClasses = ['nullcase'];
                $postListClasses = [];
                if (empty($userBlogPosts)) {
                    array_push($postListClasses, 'hidden');
                } else {
                    array_push($nullcaseClasses, 'hidden');
                }
                ?>
                <div class="<?= implode(' ', $nullcaseClasses) ?>">
                    <div class="copy">
                        <?= t('You haven\'t shared a story on the %s blog yet', $homeCityName) ?>
                    </div>
                </div>
                <ul class="<?= implode(' ', $postListClasses) ?>">
                    <?php foreach ($userBlogPostsArr as $blogPost) { ?>
                    <li>
                        <div class="image" style="display: none;">
                            <img src="" />
                        </div>
                        <div class="details">
                            <div class="title">
                                <a href="<?= $blogPost['url'] ?>" title="">
                                    <?= $blogPost['name'] ?: '(untitled)' ?>
                                </a>
                            </div>
                            <div class="subactions">
                                <a href="#" class="promote" data-blogposttitle="<?= addslashes($blogPost['name']) ?>" data-blogpostpath="<?= $blogPost['url'] ?>" data-blogpostid="<?= $blogPost['id'] ?>"><?= t('Promote') ?></a>
                            </div>
                        </div>
                    </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <?php if ($userHomeCity && $userIsCityOrganizer) { ?>
        <div id="cityBlock" class="block hidden" data-tab="city">
            <div class="main">
                <div class="headline"><?= tc('City details', '%s Details', $homeCityName) ?></div>
                <p>
                    <?= t('Use this page to update the details for the %s Jane\'s Walk page', $homeCityName) ?>
                </p>
                <div class="editables">
                    <div class="column headerInfo">
                        <div class="name"><?= t('Header Info') ?></div>
                        <div class="val">
                            <?php if ($cityHeaderInfoIsEmpty) { ?>
                            <p>
                                <span class="icon fa fa-frown-o"></span>
                                <?= t('You haven\'t filled in %s\'s header info', $homeCityName) ?>
                            </p>
                            <a href="<?= $cityComposerURL ?>" class="btn btn-primary"><?= t('Set header info') ?></a>
                            <?php } else { ?>
                            <p>
                                <span class="icon fa fa-check"></span>
                                <?= $cityHeaderInfo ?>
                                <a href="<?= $cityComposerURL ?>"><?= t('Edit') ?></a>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="column shortDescription">
                        <div class="name"><?= t('Short Description') ?></div>
                        <div class="val">
                            <?php if ($cityDescriptionIsEmpty) { ?>
                            <p>
                                <span class="icon fa fa-frown-o"></span>
                                <?= t('You haven\'t filled in %s\'s short description', $homeCityName) ?>
                            </p>
                            <a href="<?= $cityComposerURL ?>" class="btn btn-primary"><?= t('Set short description') ?></a>
                            <?php } else { ?>
                            <p>
                                <span class="icon fa fa-check"></span>
                                <?= ($cityDescription) ?>
                                <a href="<?= $cityComposerURL ?>"><?= t('Edit') ?></a>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="column backgroundPhoto">
                        <div class="name"><?= t('Background Photo') ?></div>
                        <div class="val">
                            <?php if ($cityBackgroundPhotoIsEmpty) { ?>
                            <p>
                                <span class="icon fa fa-frown-o"></span>
                                <?= t('You haven\'t set %s\'s background photo yet', $homeCityName) ?>
                            </p>
                            <a href="<?= $cityComposerURL ?>" class="btn btn-primary"><?= t('Set background photo') ?></a>
                            <?php } else { ?>
                            <p>
                                <span class="icon fa fa-check"></span>
                                <span class="bgPhoto" style="background-image: url('<?= ($cityBackgroundPhoto) ?>');"></span>
                                <a href="<?= $cityComposerURL ?>"><?= t('Change') ?></a>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                </div>
<?php if ($u->getUserID() === $city->getCollectionUserID()) { ?>
                <div id="remove-co"></div>
                <script>JanesWalk.event.emit('profile.co.receive', <?= json_encode(['cID' => $city->getCollectionID()]) ?>)</script>
<?php } ?>
            </div>
            <div class="footer">
                <p><?= t('Want more people at this year\'s Jane\'s Walk in %s?', $homeCityName) ?></p>
                <a href="#" class="btn btn-primary btn-large promoteBtn" data-cityname="<?= $homeCityName ?>"><?= t('Promote Jane\'s Walk in %s', $homeCityName) ?></a>
            </div>
        </div>
        <?php } ?>
        <div id="impactBlock" class="block hidden" data-tab="impact"></div>
        <div id="accountBlock" class="block hidden" data-tab="account">
            <div class="success">
                <span class="fa fa-check"></span>
                <?= t('Changes Saved') ?>
            </div>
            <form method="post" action="<?= $this->action('edit/save') ?>" enctype="multipart/form-data">
                <?php
                $valt->output('profile_edit');
                $attribs = UserAttributeKey::getEditableInProfileList();
                if (is_array($attribs) && count($attribs)) {
                ?>
                <div class="column details">
                    <div class="headline"><?= t('Details') ?></div>
                    <div class="field">
                        <div class="">
                            <span class="required">*</span><?= $form->label('uEmail', t('Email')) ?>
                        </div>
                        <div class="input">
                            <?= ($form->text('uEmail', $ui->getUserEmail())) ?>
                        </div>
                    </div>
                    <?php if (ENABLE_USER_TIMEZONES) { ?>
                    <div class="field">
                        <div class="">
                            <span class="required">*</span><?= $form->label('uTimezone', t('Time Zone')) ?>
                        </div>
                        <div class="input">
                            <?= (
                                $form->select(
                                    'uTimezone',
                                    $date->getTimezones(),
                                    $ui->getUserTimezone() ? $ui->getUserTimezone() : date_default_timezone_get()
                                )
                            ) ?>
                        </div>
                    </div>
                    <?php
                    }

                    // Loop through all the fields
                    $af = Loader::helper('form/attribute');
                    $af->setAttributeObject($ui);
                    foreach ($attribs as $ak) {
                        echo '<div class="field">',
                            $af->display($ak, $ak->isAttributeKeyRequiredOnProfile()),
                            '</div>';
                    }
                    ?>
                    <div class="btnWrapper">
                        <?= $form->submit('edit/save', t('Save'), [], 'btn-primary btn-large') ?>
                    </div>
                </div>
                <div class="column password">
                    <div class="headline"><?= t('Password') ?></div>
                    <div class="field">
                        <div class="">
                            <?= ($form->label('uPasswordNew', t('New Password'))) ?>
                        </div>
                        <div class="input">
                            <?= ($form->password('uPasswordNew')) ?>
                        </div>
                    </div>
                    <div class="field">
                        <div class="">
                            <?= ($form->label('uPasswordNewConfirm', t('Confirm New Password'))) ?>
                        </div>
                        <div class="input">
                            <?= ($form->password('uPasswordNewConfirm')) ?>
                        </div>
                    </div>
                    <div class="btnWrapper">
                        <?= ($form->submit('save', t('Save'), [], 'btn-primary btn-large')) ?>
                    </div>
                </div>
                <?php
                }
                ?>
            </form>

        </div>
        <div id="pictureBlock" class="block hidden" data-tab="picture">
            <div class="success">
                <span class="fa fa-check"></span>
                <?= t('Changes Saved') ?>
            </div>
            <div class="headline"><?= t('Display Picture') ?></div>
            <div class="column widget">
                <div
                    id="flashContainer"
                    data-width="<?= AVATAR_WIDTH ?>"
                    data-height="<?= AVATAR_HEIGHT ?>"
                    data-imagepath="<?= $av->getImagePath($ui) ?>"
                    data-savepath="<?= $this->url($c->getCollectionPath(), 'save_thumb') ?>"
                    data-flashpath="<?= ASSETS_URL_FLASH ?>/thumbnail_editor_3.swf"></div>
            </div>
            <div class="column tips">
                <p>
                    <?= t('Having a display picture is important for your walks, so people know who you are.') ?>
                    <br /><br />
                    <?= t('Use the app on the left to upload your display picture.') ?>
                </p>
                <?php if ($ui->hasAvatar()) { ?>
                <a href="<?= $this->action('delete') ?>"><?= t('Remove your display picture') ?></a>
                <?php } ?>
            </div>
        </div>
        <div id="resourcesBlock" class="block hidden" data-tab="resources">
            <?php if ($resources['showCityOrganizers'] === true) { ?>
            <div class="cos resourceBlock">
                <div class="headline"><?= t('Connect with fellow city organizers') ?></div>
                <p>
                    <?= t('Got a question?') ?><br />
                    <?= t('Reach out to a fellow City Organizer for help') ?>
                </p>
                <ul>
                    <?php foreach ($cityOrganizerData as $organizerData) { ?>
                    <li>
                        <img src="http://maps.googleapis.com/maps/api/staticmap?center=<?= ($organizerData['cityName']) ?>,Canada&amp;zoom=12&amp;size=400x200&amp;sensor=false" class="map" />
                        <div class="meta">
                            <div class="tag" style="background-image:url(<?= ($organizerData['organizerImagePath']) ?>)"></div>
                            <div class="name"><?= ($organizerData['organizerName']) ?>, <?= $organizerData['cityName'] ?></div>
                            <div class="email">
                                <a href="mailto:<?= ($organizerData['organizerEmail']) ?>"><?= ($organizerData['organizerEmail']) ?></a>
                            </div>
                        </div>
                    </li>
                    <?php } ?>
                </ul>
            </div>
            <?php } ?>
            <?php if ($resources['showGlobalWalks'] === true) { ?>
            <div class="ideas resourceBlock">
                <div class="headline"><?= t('Walks from around the world') ?></div>
                <p>
                    <?= t('Don\'t know what kind of walk to lead?') ?><br />
                    <?= t('Here are some fun ones from around the world') ?>
                </p>
                <ul>
                    <?php foreach ((array) $featuredWalkData as $featuredWalk) { ?>
                    <li>
                        <div class="banner" style="background-image: url('<?= ($featuredWalk['walkImagePath']) ?>');"></div>
                        <div class="meta">
                            <img src="/themes/janeswalk/images/countryFlags/<?= ($featuredWalk['countryName']) ?>.png" class="flag" />
                            <div class="city"><?= ($featuredWalk['cityName']) ?></div>
                            <div class="title">
                                <a href="<?= ($featuredWalk['walkPath']) ?>"><?= ($featuredWalk['walkTitle']) ?></a>
                            </div>
                        </div>
                    </li>
                    <?php } ?>
                </ul>
            </div>
            <?php } ?>
            <?php if ($resources['showTips'] === true) { ?>
            <div class="vimeos resourceBlock">
                <div class="headline"><?= t('Tips on leading a walk') ?></div>
                <p>
                    <?= t('Leading your first or fith walk?') ?><br />
                    <?= t('Here are some tips from the Jane\'s Walk crew') ?>
                </p>
                <ul>
                    <?php foreach ($resourceVideos as $video) { ?>
                    <li>
                        <iframe src="<?= $video ?>" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </li>
                    <?php } ?>
                </ul>
            </div>
            <?php } ?>
            <?php if ($resources['showFiles'] === true): ?>
            <div class="files resourceBlock">
                <div class="headline"><?= t('Files') ?></div>
                <p>
                    <?= t('Want help promoting Jane\'s Walk?') ?><br />
                    <?= t('Use these files to promote Jane\'s Walk in your city') ?>
                </p>
                <ul>
                    <li>
                        <a href="http://www.janeswalk.org/files/5413/9706/2037/2014_CustomPoster_Park.pdf" target="_blank">
                            <img src="/themes/janeswalk/images/pdf.png" />
                            <?= t('Customizable Poster') ?>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.janeswalk.org/files/2613/9713/8802/JanesWalk_Postcard_ChaseGhosts.pdf" target="_blank">
                            <img src="/themes/janeswalk/images/pdf.png" />
                            <?= t('Postcard') ?>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.janeswalk.org/old/index.php/download_file/view/253/299/" target="_blank">
                            <img src="/themes/janeswalk/images/pdf.png" />
                            <?= t('Vector Logo') ?>
                        </a>
                    </li>
                    <li>
                        <a href="http://www.janeswalk.org/files/2513/9999/2114/PressRelease-Generic.pdf" target="_blank">
                            <img src="/themes/janeswalk/images/pdf.png" />
                            <?= t('Generic Press Release') ?>
                        </a>
                    </li>
                </ul>
            </div>
            <?php endif; ?>
        </div>
    </div>
    <?php } else { ?>
    <div id="ccm-profile-wrapper">
        <div id="ccm-profile-body">
            <div id="ccm-profile-body-attributes">
                <div class="ccm-profile-body-item">
                    <h1><?= ($profile->getUserName()) ?></h1>
                    <?php foreach (UserAttributeKey::getPublicProfileList() as $ua) { ?>
                    <div>
                        <label><?= tc('AttributeKeyName', $ua->getAttributeKeyName()) ?></label>
                        <?= ($profile->getAttribute($ua, 'displaySanitized', 'display')) ?>
                    </div>
                    <?php } ?>
                    <div>
                        <label><?= t('Member Since')?></label>
                        <?= date(DATE_APP_GENERIC_MDY_FULL, strtotime($profile->getUserDateAdded('user'))) ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
</main>
