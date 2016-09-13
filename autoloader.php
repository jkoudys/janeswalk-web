<?php
namespace {
    // Include composer classes
    require_once __DIR__ . '/vendor/autoload.php';

    // Our autoloader for JanesWalk classes
    // Format: JanesWalk\{TopLevel}\{SubDir}\{SubDir}\{ClassName}
    // Requires: /top_level/sub_dir/sub_dir/ClassName.php
    spl_autoload_register(function (string $class) {
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
}

// Autoloader for concrete5 classes.
// A simple wrapper around many `Loader` etc. type methods, to prepare source for concrete5.7
// FIXME: remove after 5.7 upgrade
namespace Concrete\Core\Legacy {
    \spl_autoload_register(function (string $class) {
        // c5.7 namespaces 5.6 classes as 'legacy', so we'll do that ahead of time
        if ('Concrete\\Core\\Legacy\\' === substr($class, 0, 21)) {
            $short = substr($class, 21);
            if ('PageList' === $short) {
                // Load the old way
                \Loader::model('page_list');
                // Extend into the new namespace
                class PageList extends \PageList {};
            } elseif ('ThemeHelper' === $short) {
                \Loader::helper('theme');
                class ThemeHelper extends \ThemeHelper {};
            }
        }
    });
}
