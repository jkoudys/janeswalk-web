<?php
Events::extend('on_user_add', 'SiteEvents', 'addUser', false);
class SiteEvents {
   public static function addUser($ui) {
      $g = Group::getByName('Walk Leaders');
      $ui->getUserObject()->enterGroup($g);
   }
}
?>
