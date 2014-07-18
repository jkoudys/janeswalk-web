<?php
defined('C5_EXECUTE') or die("Access Denied.");
class DashboardComposerWriteController extends Concrete5_Controller_Dashboard_Composer_Write
{
    public function view($ctID = false, $cPublishParentID = false)
    {
        $ct = $this->setCollectionType($ctID);
        $cPublishParent = Page::getByID($cPublishParent);
        if (!is_object($ct)) {
            $ctArray = CollectionType::getComposerPageTypes();
            if (count($ctArray) == 1) {
                $ct = $ctArray[0];
                $this->redirect('/dashboard/composer/write', $ct->getCollectionTypeID());
                exit;
      }
      $this->set('ctArray', $ctArray);
      //$this->redirect('/dashboard/composer');
    } else {
        // create a new page of this type
        $entry = ComposerPage::createDraft($ct);
        if ($cPublishParentID && is_object($cPublishParent)) { $entry->setComposerDraftPublishParentID($cPublishParentID); }
        if (is_object($entry)) {
            $this->redirect('/dashboard/composer/write', 'edit', $entry->getCollectionID());
      } else {
          $this->redirect('/dashboard/composer/drafts');
      }
    }
  }
}
