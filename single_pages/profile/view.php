<?php
use JanesWalk\Models\PageTypes\City;
use JanesWalk\Models\PageTypes\Walk;

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

// The user's details
$profileOwner = [
    'id' => $u->getUserID(),
    'firstName' => $ui->getAttribute('first_name'),
    'lastName' => $ui->getAttribute('last_name'),
    'groups' => array_values($u->getUserGroups()),
    'walks' => $userWalksArr,
];

$announceStack = 'Announcements COs only';
if ($isCO) {
    ob_start();
    $stack = Stack::getByName($announceStack);
    $stack->display();
    $COAnnouncements = ob_get_clean();
}
?>
<script type="text/javascript">
(function() {
    var _user = <?= json_encode($profileOwner) ?>;

    JanesWalk.event.emit('walks.receive', <?= json_encode(array_values($walkData)) ?>);
    JanesWalk.event.emit('users.receive', <?= json_encode($cityUsers) ?>);
    JanesWalk.event.emit('user.receive', _user);
    JanesWalk.event.emit('blogs.receive', <?= json_encode($userBlogPostsArr) ?>);
    JanesWalk.event.emit('city.receive', Object.assign(<?= json_encode($city) ?>, { walks: <?= json_encode($cityWalksArr) ?>}));
    JanesWalk.event.emit('area.receive', { '<?= $announceStack ?>': <?= json_encode($COAnnouncements) ?> });
    JanesWalk.event.emit('profilepage.load', { user: _user });
})();
</script>
<div id="page" class="profile"></div>
