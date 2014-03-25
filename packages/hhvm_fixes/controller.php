<?php defined('C5_EXECUTE') or die(_("Access Denied."));

class HhvmFixesPackage extends Package {

     protected $pkgHandle = 'hhvm_fixes';
     protected $appVersionRequired = '5.6.1';
     protected $pkgVersion = '1.0';

     public function getPackageDescription() {
          return t("Set of fixes to get pre-5.6.3 concrete5 working with hhvm");
     }

     public function getPackageName() {
          return t("HHVM Fixes");
     }
     
     public function install() {
          $pkg = parent::install();
     
          // install block 
          BlockType::installBlockTypeFromPackage('hhvm_fixes', $pkg); 
     }
     
}

