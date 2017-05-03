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
    <?php // Facebook pixel ?>
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '424289464604214');
    fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=424289464604214&ev=PageView&noscript=1" />
    </noscript>
</head>
<body
    lang="<?= Localization::activeLocale() ?>"
    class="<?= join((array) $bodyData['classes'], ' ') ?>"
    data-pageViewName="<?= $bodyData['pageViewName'] ?>"
>
    <?php // IE warning ?>
    <script type="text/javascript">
    if (navigator.userAgent.indexOf('MSIE') > -1) {
      var message = document.createElement('div');
      message.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; padding: 5px; background: #fff; z-index: 99999999');
      message.innerHTML = '<strong>WARNING:</strong> Internet Explorer may not work on this site. We recommend using <a href="http://mozilla.org/firefox">Firefox</a> or <a href="http://google.com/chrome">Chrome</a> browsers instead';
      document.body.insertBefore(message, document.body.firstChild);
    }
    </script>
    <div id="fb-root"></div>
    <?php include __DIR__ . '/modals.php'; ?>
