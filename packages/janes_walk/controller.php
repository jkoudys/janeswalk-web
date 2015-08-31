<?php
namespace Concrete\Package\JanesWalk;

use \Concrete\Core\Package\StartingPointPackage;

class Controller extends StartingPointPackage
{
    protected $pkgHandle = 'janes_walk';
    protected $pkgContentProvidesFileThumbnails = true;

    public function getPackageName()
    {
        return t('Jane\'s Walk');
    }

    public function getPackageDescription()
    {
        return t('The primary Jane\'s Walk web application, including Create A Walk');
    }
}
