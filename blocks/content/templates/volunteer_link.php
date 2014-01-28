<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$c = Page::getCurrentPage();
$page_owner = UserInfo::getByID($c->getCollectionUserID());
$content = $controller->getContent();
print $content;
?>
<p><a title="Volunteers" href="mailto:<?=$page_owner->getUserEmail()?>">Volunteer in <?=$c->getCollectionName()?>!</a></p>
