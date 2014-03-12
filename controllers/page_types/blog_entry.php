<?php 
	defined('C5_EXECUTE') or die("Access Denied.");
  class BlogEntryPageTypeController extends Controller {
    public function view() {
      $dh = Loader::helper('concrete/dashboard');
      $im = Loader::helper('image');
      $c = Page::getCurrentPage();
      $ui = UserInfo::getByID($c->getCollectionUserID());

      $this->set('headImage', $im->getThumbnail($c->getAttribute("main_image"), 800, 800));
      $this->set('isLoggedIn', $dh->canRead());
      $this->set('canEdit', is_object(ComposerPage::getByID($c->getCollectionID())));
      $this->set('authorName', ($first_name = $ui->getAttribute('first_name')) ? ("$first_name {$ui->getAttribute('last_name')}") : $ui->getUserObject()->getUserName());
      $this->set('publishDate', $c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL));
    }
  }
