<?php
defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php');
$this->inc('elements/navbar.php');
?>
<div id="central">
    <div id="sidebar">
        <?php (new Area('Sidebar'))->display($c) ?>
    </div>

    <div id="body">
        <?php (new Area('Main'))->display($c) ?>
    </div>
</div>
<?php  $this->inc('elements/footer.php') ?>
