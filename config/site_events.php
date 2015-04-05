<?php
Events::extendPageType('walk', 'on_page_update');

// Setup user when created
Events::extend('on_user_add', '\JanesWalk\Models\Users\WalkLeader', 'setupUserJoinInfo', 'models/users/WalkLeader.php');
