<?php
use \JanesWalk\Controllers\Controller;
defined('C5_EXECUTE') || die("Access Denied.");

Loader::controller('/janes_walk');
class HomePageTypeController extends Controller
{
  public function view()
  {
      $headImage = $this->c->getAttribute('full_bg');
      if ($headImage) {
          $this->bodyData['bg'] = $headImage->getURL();
      }
      $this->bodyData['classes'][] = 'home';
      $this->bodyData['pageViewName'] = 'HomePageView';
      $this->set('bodyData', $this->bodyData);
  }
}
