<?php
$u = new User();
$ui = UserInfo::getByID($u->getUserID());

if ($u) {
    $userInfo = [
      'name' => $u->getUserName(),
      'firstName' => $ui->getAttribute('first_name')
  ];
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
  JanesWalk.event.emit('user.receive', <?= json_encode($userInfo) ?>);
  JanesWalk.event.emit('area.receive', <?= json_encode($LeftHeader) ?>);
  JanesWalk.event.emit('area.receive', <?= json_encode($Dropdown) ?>);
</script>
<span id="navbar"></span>
