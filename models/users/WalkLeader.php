<?php
/**
 * The User who can lead walks. This is the most general kind of user for JW,
 * since anyone can lead a walk. Typically every human being will be one of
 * these.
 */

namespace JanesWalk\Models\Users;

use \UserInfo;
use \Loader;
use \Group;

class WalkLeader
{
    /**
     * Sets up default info when a user joins
     *
     * @param UserInfo $ui The newly added user
     * @return void
     */
    public function setupUserJoinInfo(UserInfo $ui)
    {
        $e = Loader::helper('validation/error');
        $u = $ui->getUserObject();

        // Register users as Walk Leaders
        try {
            $u->enterGroup(Group::getByName('Walk Leaders'));
        } catch (Exception $ex) {
            $e->add('Error adding user ' . $u->getUserName() . ' to Walk Leaders group.');
        }
    }
}

