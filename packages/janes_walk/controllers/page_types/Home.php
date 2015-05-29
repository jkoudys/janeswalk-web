<?php
namespace Concrete\Package\JanesWalk\Controllers\PageTypes;

use Concrete\Package\JanesWalk\Controllers\PageController;

class HomePageTypeController extends PageController
{
  public function view()
  {
      parent::view();
      $headImage = $this->c->getAttribute('full_bg');
      if ($headImage) {
          $this->bodyData['bg'] = $headImage->getURL();
      }
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      echo 'xxxxxxxxxxxxxxxxxxxxxxxx';
      $this->bodyData['classes'][] = 'home';
      $this->bodyData['pageViewName'] = 'HomePageView';
      $this->set('bodyData', $this->bodyData);
  }
}
