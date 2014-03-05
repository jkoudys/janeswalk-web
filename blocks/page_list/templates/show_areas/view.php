<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$th = Loader::helper('text');
$av = Loader::helper('concrete/avatar');
?>
<?php foreach ($pages as $page): ?>
<h2 class="ccm-page-list-header"><?=$page->getCollectionName();?></h2>
<div class="ccm-page-list-area">
<?php
$blocks = $page->getBlocks("Main");
var_dump($blocks);
echo '</div>';
endforeach; ?>

