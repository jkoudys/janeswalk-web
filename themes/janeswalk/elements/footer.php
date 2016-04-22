<footer role="contentinfo">
    <section class="blurb">
        <h2>Citizen-led walking tours towards community-based city building.</h2>
    </section>
    <nav>
        <section class="sitemap">
            <?php (new GlobalArea('Footer'))->display($c) ?>
        </section>
        <section class="social-icons">
            <a href="http://twitter.com/janeswalk" target="_blank"><i class="fa fa-twitter"></i></a>
            <a href="http://facebook.com/janeswalk" target="_blank"><i class="fa fa-facebook-square"></i></a>
        </section>
    </nav>
    <section class="status-copyright">
        <p>Jane's Walk is a project of Tides Canada Initiatives Society, a registered charity.</p>
        <p>Jane's Walk &copy; 2014. All rights reserved.</p>
    </section>
</footer>
<?php /* <img src="http://tuckermclachlan.com/janeswalk/footer.jpg" style="width: 100%"> */ ?>
    <div id="progress" style="z-index: -1;"></div>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-29278390-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAvsH_wiFHJCuMPPuVifJ7QgaRCStKTdZM&sensor=false&callback=googleMapsLoaded"></script>
    <script src="//google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="<?= $this->getThemePath() . (CONCRETE5_ENV === 'dev' ? '/js/janeswalk.js' : '/js/janeswalk.min.js') ?>"></script>

    <?php Loader::element('footer_required'); ?>
  </body>
</html>
