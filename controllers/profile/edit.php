<?php
class ProfileEditController extends Concrete5_Controller_Profile_Edit
{
    public function save_complete()
    {
        $this->redirect('/profile/', '#tab=account&success=1');
    }
}
