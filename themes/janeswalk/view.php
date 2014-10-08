<?php
    defined('C5_EXECUTE') or die("Access Denied.");
?>
<html>
<?php
    $this->inc('elements/header.php');
    $dh = Loader::helper('concrete/dashboard');
    $pageViewName = $pageViewName ?: 'PageView';
    
    // Classes
    $classes = ['site-page'];
    if ($dh->canRead()) {
        array_push($classes, 'logged_in');
    }

    // Background image
    $backgroundImageUrl = '';
    if (is_object($fullbg)) {
        $backgroundImageUrl = $fullbg->getURL();
    }
?>
    <body class="<?= implode(' ', $classes) ?>"
        style="background-image: url('<?= ($backgroundImageUrl) ?>');"
        data-pageViewName="<?= ($pageViewName) ?>">
<?php
    $this->inc('elements/navbar.php');
    print $innerContent;
    $this->inc('elements/footer.php');
