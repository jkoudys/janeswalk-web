<?php 
/**
*
* Responsible for geocoding the cities to lookup their lat/lng
*/

defined('C5_EXECUTE') or die("Access Denied.");
class DeleteAbandonedWalks extends Job {
  public $jNotUninstallable=0;

  public function getJobName() {
    return t('Delete Abandoned Walks');
  }

  public function getJobDescription() {
    return t('Checks every walk, and moves all walks with a blank title to the trash.');
  }

  public function run() {
    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByName('', true);
    $trash = Page::getByPath(TRASH_PAGE_PATH);
    $pages = $pl->get();
    $pagecount = sizeof($pages);
    foreach($pages as $page) {
      $page->move($trash);
    }
    return "$pagecount " . t2('page','pages',$pagecount) . ' moved to the trash';
  }
}
