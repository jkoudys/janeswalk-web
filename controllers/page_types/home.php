<?php
use \JanesWalk\Controllers\JanesWalk as Controller;

class HomePageTypeController extends Controller
{
    public function view()
    {
        parent::view();
        $headImage = $this->c->getAttribute('full_bg');
        if ($headImage) {
            $this->bodyData['bg'] = $headImage->getURL();
        }
        $this->bodyData['classes'][] = 'home';
        $this->bodyData['pageViewName'] = 'HomePageView';
        $this->set('bodyData', $this->bodyData);
    }
}
