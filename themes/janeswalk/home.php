<?php 
  defined('C5_EXECUTE') or die(_('Access Denied.'));
  $nh = Loader::helper('navigation');
  $dh = Loader::helper('concrete/dashboard');
  $im = Loader::helper('image');
  $headImage = $c->getAttribute('full_bg');
  global $u;
  global $cp;
/*
    data-backgroundImageUrl="http://janeswalk.org/files/9013/8872/1506/1756edc0b5758011890bc979c01463cf.jpg">
*/
?>
<?php
  $this->inc('elements/header.php');
?>
  <body class="home <?=($dh->canRead()) ? "logged_in" : ""; ?>"
    data-pageViewName="HomePageView"
    data-backgroundImageUrl="<?= ($headImage->getURL()) ?>">

    <div class="overlay o-connect">
      <div class="o-background">
      </div>
      <div class="o-content">
        <h1>Create a walk</h1>
        <a href="<?= ($this->url('/login')) ?>" class="btn btn-primary">Log in</a> or
        <a href="<?= ($this->url('/register')) ?>" class="btn btn-primary">Join</a>
        to create a walk
      </div>
    </div>

    <div class="backgroundImageBanner faded"></div>
    <?php $this->inc('elements/navbar.php'); ?>
    <div class="intro full">
      <div class="callouts">
        <blockquote class="homepage-callout2">
          <?php (new Area('Intro'))->display($c); ?>
        </blockquote> 
      </div>
    </div>
    <!-- end of .intro -->
    <div class="overlap" id="getinvolved">
      <?php if (isset($_SERVER['HTTP_USER_AGENT']) && (bool) strpos($_SERVER['HTTP_USER_AGENT'], 'iPad') === false): ?>
        <ul class="controls">
          <li>
            <a class="showButton">Show Map <br /><i class="icon-chevron-down"></i></a>
            <a class="closeButton" style="display:none">Close Map <br /><i class="icon-chevron-up"></i></a>
          </li>
        </ul>
        <section class="map full">
          <?php (new Area('Map'))->display($c); ?>
        </section>
      <?php endif; ?>
      <section class="calltoaction full">
        <?php (new Area('Call to Action'))->display($c); ?>
      </section>
    </div>
    <section class="blog full">
      <div>
        <section class="walkblog">
          <?php (new Area('Blog Header'))->display($c); ?>
          <?php (new Area('Blog'))->display($c); ?>
        </section>
        <section class="twitter">
          <h3>Twitter</h3>
          <?php (new Area('Twitter'))->display($c); ?>
        </section>
      </div>
    </section>
    <section class="sponsors full">
        <?php (new Area('Sponsors'))->display($c); ?>
    </section>
    <script type="text/javascript">
      $(document).ready(function() { 
        $('a[href="http://www.janeswalk.net/early#getinvolved"]').click(function(event) {
          event.preventDefault();
          $('html, body').animate({scrollTop: $("#getinvolved").offset().top})
            return false;
        });
      });
      </script>
    <?php $this->inc('elements/footer.php');  ?>
