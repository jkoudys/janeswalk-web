<?php
use \JanesWalk\Models\PageTypes\Walk;
Loader::model('page_types/Walk');

$u = new User();
if ($u->getUserID()) {
    $ui = UserInfo::getByID($u->getUserID());
    $userInfo = [
        'id' => $u->getUserID(),
        'name' => $u->getUserName(),
        'firstName' => $ui->getAttribute('first_name'),
        'walks' => []
    ];
    $itJson = $ui->getAttribute('itineraries');
    $itineraries = json_decode($itJson, true);

    // Make sure it's not the old array format
    if (!$itineraries || $itJson[0] === '[') {
        // If there's no itinerary, seed with defaults
        $itineraries = [
            'lists' => [
                [
                    'id' => 1,
                    'title' => 'Favourites',
                    'walks' => [],
                    'description' => ''
                ]
            ],
            'schedule' => (object) []
        ];
    }
    $walkIDs = [];
    $walks = [];
    // Load walks we have either favourited or scheduled
    foreach ((array) $itineraries['lists'] as $list) {
        foreach ($list['walks'] as $walkID) {
            if (!$walks[$walkID]) {
                $p = Page::getByID($walkID);
                if ($p) {
                    $walks[$walkID] = new Walk($p);
                }
            }
        }
    }
    foreach ((array) $itineraries['schedule'] as $walkID => $time) {
        if (!$walks[$walkID]) {
            $p = Page::getByID($walkID);
            if ($p) {
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
  JanesWalk.event.emit('user.receive', <?= json_encode($userInfo) ?>, {current: true});
  JanesWalk.event.emit('walks.receive', <?= json_encode(array_values($walks)) ?>);
  JanesWalk.event.emit('itineraries.receive', <?= json_encode((array) $itineraries) ?>);
<?php } ?>
  JanesWalk.event.emit('area.receive', <?= json_encode($LeftHeader) ?>);
  JanesWalk.event.emit('area.receive', <?= json_encode($Dropdown) ?>);
</script>
<span id="navbar"></span>
