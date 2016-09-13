<?php
  defined('C5_EXECUTE') or die(_('Access Denied.'));
  $dh = Loader::helper('concrete/dashboard');
  $headImage = $c->getAttribute('full_bg');
  include 'elements/header.php';
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
<div id="intro" style="background-image:url('<?= $headImage->getURL() ?>')">
    <div class="callouts">
        <blockquote>
            <?php (new Area('Intro'))->display($c) ?>
        </blockquote>
    </div>
</div>
<?php $this->inc('elements/navbar.php') ?>
<section id="calltoaction">
    <?php (new Area('Call to Action'))->display($c) ?>
    <?php (new Area('Main'))->display($c) ?>
</section>
<section id="sponsors">
    <?php (new Area('Sponsors'))->display($c) ?>
</section>
<?php if (!$isMobile) { ?>
<section id="map">
    <?php (new Area('Map'))->display($c) ?>
</section>
<?php
}
include 'elements/footer.php';
