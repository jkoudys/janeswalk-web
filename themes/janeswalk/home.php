<?php
  defined('C5_EXECUTE') or die(_('Access Denied.'));
  $dh = Loader::helper('concrete/dashboard');
  $headImage = $c->getAttribute('full_bg');

  $this->inc('elements/header.php');
?>
<div class="overlay o-connect">
    <div class="o-background">
    </div>
    <div class="o-content">
        <h1>Create a walk</h1>
        <a href="<?= $this->url('/login') ?>" class="btn btn-primary">Log in</a> or
        <a href="<?= $this->url('/register') ?>" class="btn btn-primary">Join</a>
        to create a walk
    </div>
</div>

<div class="backgroundImageBanner faded"></div>
<?php $this->inc('elements/navbar.php') ?>
<div class="intro">
    <div class="callouts">
        <blockquote>
            <?php (new Area('Intro'))->display($c); ?>
        </blockquote>
    </div>
</div>
<!-- end of .intro -->
<div class="overlap" id="getinvolved">
    <?php if (!$isMobile) { ?>
    <ul class="controls">
        <li>
        <a href="/map/world" target="_blank" class="showButton">Show Map<br /><i class="fa fa-chevron-down"></i></a>
            <a class="closeButton" style="display:none">Close Map<br /><i class="fa fa-chevron-up"></i></a>
        </li>
    </ul>
    <section class="map">
        <?php (new Area('Map'))->display($c); ?>
    </section>
    <?php } ?>
    <div class="topcontent">
        <section class="calltoaction">
            <?php (new Area('Call to Action'))->display($c) ?>
        </section>
    </div>
</div>
<section class="blog">
    <section class="walkblog">
        <?php (new Area('Blog Header'))->display($c) ?>
        <?php (new Area('Blog'))->display($c) ?>
    </section>
    <section class="twitter">
        <h3>Twitter</h3>
        <?php (new Area('Twitter'))->display($c) ?>
    </section>
</section>
<section class="sponsors">
    <?php (new Area('Sponsors'))->display($c) ?>
</section>
<script type="text/javascript">
    $(document).ready(function () {
        $('a[href="http://www.janeswalk.net/early#getinvolved"]').click(function (event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: $("#getinvolved").offset().top})

            return false;
        });
    });
</script>
<?php $this->inc('elements/footer.php')  ?>
