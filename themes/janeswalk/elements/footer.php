    <footer role="contentinfo">
        <section class="blurb">
            <h2>Citizen-led walking tours towards community-based city building.</h2>
        </section>
        <nav>
            <section class="sitemap">
                <?php (new GlobalArea('Footer'))->display($c) ?>
            </section>
            <section class="social-icons">
                <a href="http://instagram.com/janeswalk" target="_blank"><i class="fa fa-instagram"></i></a>
                <a href="http://facebook.com/janeswalk" target="_blank"><i class="fa fa-facebook-square"></i></a>
                <a href="http://twitter.com/janeswalk" target="_blank"><i class="fa fa-twitter"></i></a>
            </section>
        </nav>
        <section class="status-copyright">
            <p>Jane's Walk is a project of Tides Canada Initiatives Society, a registered charity.</p>
            <p>Jane's Walk &copy; 2017. All rights reserved.</p>
        </section>
    </footer>
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
    <script src="<?= $this->getThemePath() . (CONCRETE5_ENV === 'dev' ? '/js/janeswalk.js' : '/js/janeswalk.min.js') ?>"></script>
    <?php include DIR_BASE . '/concrete5/web/elements/footer_required.php'; ?>
  </body>
</html>
