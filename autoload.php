<?php
// Include composer classes
@include_once __DIR__ . '/vendor/autoload.php';

// Our autoloader for JanesWalk classes
// Format: JanesWalk\{TopLevel}\{SubDir}\{SubDir}\{ClassName}
// Requires: /top_level/sub_dir/sub_dir/ClassName.php
spl_autoload_register(function ($class) {
    $target = '';
    $path = explode('\\', $class);
    $nameSpace = array_shift($path);
    if ('JanesWalk' === $nameSpace) {
        require implode('/', array_map(
            function ($str) {
                return strtolower(preg_replace(['/([a-z\d])([A-Z])/', '/([^_])([A-Z][a-z])/'], '$1_$2', $str));
            },
                $path
        )) . '.php';
    }
});

// TODO: Move to appropriate location
// Suppress errors due to using legacy concrete5
set_error_handler(function ($errno, $errstr) {
    return (
        strpos($errstr, 'Declaration of') === 0 ||
        strpos($errstr, 'usort() expects parameter 2 to be a valid callback, non-static method UserAttributeKey::sortListByDisplayOrder() should not be called statically') === 0
    );
}, E_WARNING);
