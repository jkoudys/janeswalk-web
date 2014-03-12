<?php defined('C5_EXECUTE') or die(_("Access Denied."));

class ParentPageOwnerPackage extends Package {

  protected $pkgHandle = 'parent_page_owner';
  protected $appVersionRequired = '5.6.1';
  protected $pkgVersion = '1.0';

  public function getPackageDescription() {
    return t("Assign permissions based on if a user owns the parent page");
  }

  public function getPackageName() {
    return t("Parent Page Owner");
  }

  public function install() {
    $pkg = parent::install();
    $cat = PermissionKeyCategory::getByHandle('page');
    $type = PermissionAccessEntityType::add('parent_page_owner', 'Parent Page Owner', $pkg);
    $cat->associateAccessEntityType($type);
  }

  public function uninstall() {
    $type = PermissionAccessEntityType::getByHandle('parent_page_owner');
    $type->delete();
    parent::uninstall();
  }

  public function on_start() {
    Loader::registerAutoload(
      [ 'ParentPageOwnerPermissionAccessEntity' => array('model','permission/access/entity/types/parent_page_owner', 'parent_page_owner') ]
    );
  } 
}

