<?php
require_once(DIR_BASE . '/models/page_types/City.php');
require_once(DIR_BASE . '/models/page_types/Walk.php');
use \JanesWalk\Models\PageTypes\City;
use \JanesWalk\Models\PageTypes\Walk;

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

function pagesToWalks($walkPage) {
    return new Walk($walkPage);
}

?>
<script type="text/javascript">
    JanesWalk.event.emit('profile.receive', {
        city: Object.assign(
            <?= json_encode(new City($city)) ?>, {
                walks: <?= json_encode(array_map(pagesToWalks, $cityWalks)) ?>,
                users: <?= json_encode($cityUsers) ?>
        }),
        walks: <?= json_encode(array_map(pagesToWalks, $userWalks)) ?>,
        step: <?= $nextStep ?>,
        blog: <?= json_encode($userBlogPostsArr) ?>
    });
</script>
