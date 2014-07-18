<?php
use JanesWalk\Controller\Controller;

defined('C5_EXECUTE') || die('Access Denied.');

Loader::controller('/janes_walk');
class BlogEntryPageTypeController extends Controller
{
  public function view()
  {
    parent::view();
    $dh = Loader::helper('concrete/dashboard');
    $im = Loader::helper('image');
    $c = Page::getCurrentPage();
    $ui = UserInfo::getByID($c->getCollectionUserID());

    if ($imAtt = $c->getAttribute('main_image')) {
      $this->set('headImage', $im->getThumbnail($imAtt, 800, 800));
    }
    $this->set('isLoggedIn', $dh->canRead());
    $this->set('canEdit', is_object(ComposerPage::getByID($c->getCollectionID())));
    $this->set('authorName', ($first_name = $ui->getAttribute('first_name')) ? ("$first_name {$ui->getAttribute('last_name')}") : $ui->getUserObject()->getUserName());
    $this->set('publishDate', $c->getCollectionDatePublic(DATE_APP_GENERIC_MDY_FULL));
    $this->set('pageType', 'blog');
  }
}
