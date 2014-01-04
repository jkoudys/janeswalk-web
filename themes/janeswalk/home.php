<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$nh = Loader::helper('navigation');
$dh = Loader::helper('concrete/dashboard');
$im = Loader::helper('image');
$headImage = $c->getAttribute("full_bg");

global $u; global $cp;
?>
<?php $this->inc('elements/header.php');  ?>

<body class="home <?=($dh->canRead()) ? "logged_in" : ""; ?>" <?= is_object($headImage) ? "style='background-image:url({$headImage->getURL()});background-size:cover;background-position:50%;'" : "" ?>>
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
  <div class="intro full">

  <div class="callouts">
    <blockquote class="homepage-callout2">
      <?php (new Area('Intro'))->display($c); ?>
    </blockquote> 
  </div>

</div>
<!-- end of .intro -->
<div class="overlap" id="getinvolved">
  <ul class="controls">
    <li>
      <a class="showButton">Show Map <br /><i class="icon-chevron-down"></i></a>
      <a class="closeButton" style="display:none">Close Map <br /><i class="icon-chevron-up"></i></a>
    </li>
  </ul>
  <section class="map full">
    <?php (new Area('Map'))->display($c); ?>
  </section>
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
  
</div>
<script>
$(document).ready(function() { 
  $('a[href="http://www.janeswalk.net/early#getinvolved"]').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: $("#getinvolved").offset().top})
    return false;
    });
  });
</script>
<?php $this->inc('elements/footer.php');  ?>
