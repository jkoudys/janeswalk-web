<?php
    defined('C5_EXECUTE') or die("Access Denied.");
?>
<html>
<?php
    $dh = Loader::helper('concrete/dashboard');
    $pageViewName = $pageViewName ?: 'PageView';
    
    // Classes
    $classes = ['site-page'];
    if ($dh->canRead()) {
        $classes[] = 'logged_in';
    }

    // Background image
    $backgroundImageUrl = '';
    if (is_object($fullbg)) {
        $backgroundImageUrl = $fullbg->getURL();
    }

    $this->inc('elements/header.php');
    $this->inc('elements/navbar.php');
    print $innerContent;
    $this->inc('elements/footer.php');
