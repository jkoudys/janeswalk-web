<?php
define('DIRNAME_APP', 'concrete5/web/concrete');

require_once __DIR__ . '/autoload.php';

// Startup c5
require_once __DIR__ . '/concrete5/web/env.php';

// Check local routes
if (!C5_ENVIRONMENT_ONLY) {
    require_once __DIR__ . '/router.php';
}
