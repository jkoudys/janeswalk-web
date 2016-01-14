<?php
// TODO: Move all script imports to bottom. Block script load order requires React up here
?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head prefix="og: http://ogp.me/ns#">
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="google-site-verification" content="jrG7QMwIluWHDRaFad1G36OBcuF7TUgz_fqz2-onqKc" />

<!--[if lt IE 9]>
     <script src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.min.js"></script>
     <script src="http://cdnjs.cloudflare.com/ajax/libs/css3pie/1.0.0/PIE.min.js"></script>
     <script type="text/javascript" src="<?=$this->getThemePath();?>/js/ie_sux.js"></script>
<![endif]-->
    <link rel="stylesheet" type="text/css" href="/concrete/css/jquery.ui.css" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Roboto+Slab:400,300,700|Roboto:400,400italic,300,300italic,500,500italic,700italic,700" rel="stylesheet" type="text/css">
<?php if (Localization::activeLocale() === 'he') { ?>
    <link href='//fonts.googleapis.com/css?family=Alef:400,700&subset=hebrew' rel='stylesheet' type='text/css'>
<?php } ?>
    <link rel="stylesheet" href="<?= $this->getThemePath() ?>/css/main.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react-with-addons<?= CONCRETE5_ENV === 'dev' ? '' : '.min' ?>.js"></script>
    <script src="<?= BASE_URL ?>/js/jwglobal.js"></script>
<?php
    Loader::element('header_required');
?>
    <script type="text/javascript" src="/concrete/js/jquery.ui.js"></script>
    <script type="text/javascript">var CCM_THEME_PATH = '<?= $this->getThemePath() ?>';window.fbAsyncInit = function () {FB.init({appId: '544710848887303', status: true, xfbml: true }); };(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = '//connect.facebook.net/en_US/all.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
</head>
<body
    lang="<?= Localization::activeLocale() ?>"
    class="<?= join((array) $bodyData['classes'], ' ') ?>"
    data-pageViewName="<?= $bodyData['pageViewName'] ?>"
    style="background-image:url(<?= $bodyData['bg'] ?>)"
>
    <div id="fb-root"></div>
    <script type="text/javascript">
    </script>
    <?php $this->inc('elements/modals.php'); ?>
