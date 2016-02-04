<?php
use \JanesWalk\Models\PageTypes\Walk;
Loader::model('page_types/Walk');

$u = new User();
if ($u->getUserID()) {
    $ui = UserInfo::getByID($u->getUserID());
    $userInfo = [
        'name' => $u->getUserName(),
        'firstName' => $ui->getAttribute('first_name')
    ];
    $itineraries = json_decode($ui->getAttribute('itineraries'), true);
    $walkIDs = [];
    $walks = [];
    foreach ((array) $itineraries as $itinerary) {
        foreach ($itinerary['walks'] as $walkID) {
            $p = Page::getByID($walkID);
            if ($p && !$walks[$walkID]) {
                $walks[$walkID] = new Walk($p);
            }
        }
    }
}

// Capture renderable areas
ob_start();
(new GlobalArea('Left Header'))->display($c);
$LeftHeader = ['Left Header' => ob_get_clean()];

ob_start();
(new GlobalArea('Dropdown'))->display($c);
$Dropdown = ['Dropdown' => ob_get_clean()];

?>
<script>
<?php if ($ui) { ?>
  JanesWalk.event.emit('user.receive', <?= json_encode($userInfo) ?>);
  JanesWalk.event.emit('walks.receive', <?= json_encode(array_values($walks)) ?>);
  JanesWalk.event.emit('itineraries.receive', <?= json_encode((array) $itineraries) ?>);
<?php } ?>
  JanesWalk.event.emit('area.receive', <?= json_encode($LeftHeader) ?>);
  JanesWalk.event.emit('area.receive', <?= json_encode($Dropdown) ?>);
</script>
<span id="navbar"></span>
