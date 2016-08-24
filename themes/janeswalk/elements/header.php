<?php
// TODO: Move all script imports to bottom. Block script load order requires React up here
?><!DOCTYPE html>
<html class="no-js">
<head prefix="og: http://ogp.me/ns#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="google-site-verification" content="jrG7QMwIluWHDRaFad1G36OBcuF7TUgz_fqz2-onqKc" />
    <meta property="og:image" content="http://janeswalk.org/themes/janeswalk/img/jwlogo.png" />

    <link rel="stylesheet" type="text/css" href="/concrete/css/jquery.ui.css" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Roboto+Slab:400,300,700|Roboto:400,400italic,300,300italic,500,500italic,700italic,700" rel="stylesheet" type="text/css">
<?php if (Localization::activeLocale() === 'he') { ?>
    <link href='//fonts.googleapis.com/css?family=Alef:400,700&subset=hebrew' rel='stylesheet' type='text/css'>
<?php } ?>
    <link rel="stylesheet" href="<?= $this->getThemePath() ?>/css/main.css">
    <script src="<?= BASE_URL ?>/js/jwglobal.js"></script>
    <script src="//fb.me/react-with-addons-15.0.1<?= CONCRETE5_ENV === 'dev' ? '' : '.min' ?>.js"></script>
    <script src="//fb.me/react-dom-15.0.1<?= CONCRETE5_ENV === 'dev' ? '' : '.min' ?>.js"></script>
<?php
    Loader::element('header_required');
?>
    <script type="text/javascript" src="/js/oldbrowsercheck.js"></script>
    <script type="text/javascript" src="/concrete/js/jquery.ui.js"></script>
    <script type="text/javascript">var CCM_THEME_PATH = '<?= $this->getThemePath() ?>';window.fbAsyncInit = function () {FB.init({appId: '544710848887303', status: true, xfbml: true }); };(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = '//connect.facebook.net/en_US/all.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
</head>
<body
    lang="<?= Localization::activeLocale() ?>"
    class="<?= join((array) $bodyData['classes'], ' ') ?>"
    data-pageViewName="<?= $bodyData['pageViewName'] ?>"
>
    <div id="fb-root"></div>
    <script type="text/javascript">
    </script>
    <?php $this->inc('elements/modals.php'); ?>
