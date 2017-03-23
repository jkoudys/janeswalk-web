<?php
$v = View::getInstance();
$v->addHeaderItem('<script src="' . BASE_URL . '/js/jwglobal.js"></script>');
?>
<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="google-site-verification" content="jrG7QMwIluWHDRaFad1G36OBcuF7TUgz_fqz2-onqKc" />
    <meta property="og:image" content="http://janeswalk.org/themes/janeswalk/img/jwlogo.png" />

    <link rel="stylesheet" type="text/css" href="/concrete5/web/css/jquery.ui.css" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Roboto+Slab:400,300,700|Roboto:400,400italic,300,300italic,500,500italic,700italic,700" rel="stylesheet" type="text/css">
    <?php if (Localization::activeLocale() === 'he') { ?>
        <link href='//fonts.googleapis.com/css?family=Alef:400,700&subset=hebrew' rel='stylesheet' type='text/css'>
    <?php } ?>
    <link rel="stylesheet" href="<?= $this->getThemePath() ?>/css/janeswalk.css">
    <?php include DIR_BASE . '/concrete5/web/elements/header_required.php'; ?> 
    <script type="text/javascript">const CCM_THEME_PATH = '<?= $this->getThemePath() ?>';window.fbAsyncInit = function () {FB.init({appId: '544710848887303', status: true, xfbml: true }); };(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = '//connect.facebook.net/en_US/all.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
</head>
<body
    lang="<?= Localization::activeLocale() ?>"
    class="<?= join((array) $bodyData['classes'], ' ') ?>"
    data-pageViewName="<?= $bodyData['pageViewName'] ?>"
>
    <div id="fb-root"></div>
    <?php include __DIR__ . '/modals.php'; ?>
