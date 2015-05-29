<?php $this->inc('elements/header.php') ?>
<div class="backgroundImageBanner faded"></div>
<?php $this->inc('elements/navbar.php') ?>
<div id="intro">
    <div class="callouts">
        <blockquote>
            <?php (new Area('Intro'))->display($c) ?>
        </blockquote>
    </div>
</div>
<!-- end of .intro -->
<section id="map">
    <?php (new Area('Map'))->display($c) ?>
</section>
<section id="calltoaction">
    <?php (new Area('Call to Action'))->display($c) ?>
    <?php (new Area('Main'))->display($c) ?>
</section>
<section id="blog">
    <section class="walkblog">
        <?php (new Area('Blog Header'))->display($c) ?>
        <?php (new Area('Blog'))->display($c) ?>
    </section>
    <section class="twitter">
        <h3>Twitter</h3>
        <?php (new Area('Twitter'))->display($c) ?>
    </section>
</section>
<section id="sponsors">
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
