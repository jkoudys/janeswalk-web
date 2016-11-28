<?php 
/**
*
* Responsible for geocoding the cities to lookup their lat/lng
*/

defined('C5_EXECUTE') || die('Access Denied.');

class DeleteAbandonedWalks extends Job
{
  public $jNotUninstallable = 0;

  public function getJobName(): string
  {
    return t('Delete Abandoned Walks');
  }

  public function getJobDescription(): string
  {
    return t('Checks every walk, and moves all walks with a blank title to the trash.');
  }

  public function run(): string
  {
    $pl = new PageList();
    $pl->filterByCollectionTypeHandle('walk');
    $pl->filterByName('', true);
    $pages = $pl->get();
    $pagecount = count($pages);

    foreach ($pages as $page) {
      $page->moveToTrash();
    }

    return $pagecount. ' ' . t2('page', 'pages', $pagecount) . ' moved to the trash';
  }
}
