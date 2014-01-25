<?php 
defined('C5_EXECUTE') or die("Access Denied.");
Loader::model('user_list');
$av = Loader::helper('concrete/avatar');
$ul = new UserList();
$ul->filterByGroup('Staff');
$ul->sortBy('uID');
$content = $controller->getContent();
print $content;
?>
<ul class="ccm-staff-list">
  <?php foreach($ul->get(100) as $staffMember) { ?>  
    <li>
      <?php if($avatar = $av->getImagePath($staffMember)) { ?>
        <div class='u-avatar' style='background-image:url(<?=$avatar?>)'></div> 
      <?php } else { ?>
        <div class='u-avatar placeholder<?=ord($staffMember->getUserID()) % 3?>'></div>
      <?php } ?>
      <div class='ccm-staff-list-details'>
        <h3><?="{$staffMember->getAttribute('first_name')} {$staffMember->getAttribute('last_name')}, " . ($staffMember->getAttribute('job_title') ?: 'Jane\'s Walk');?></h3>
        <a href="mailto:<?=($email = $staffMember->getUserEmail())?>"><?=$email?></a>
        <p class='ccm-staff-list-bio'><?=$staffMember->getAttribute('bio')?></p>
      </div>
    </li>
  <?php } ?>
</ul>
