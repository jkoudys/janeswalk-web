<?php
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
