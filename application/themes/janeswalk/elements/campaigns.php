<div class="overlay o-donate">
    <div class="o-background">
    </div>
    <div class="o-content">
        <a href="#" class="closeModalCta fa fa-times"></a>
        <div class="prompt">
            <div class="messaging">
                <?= $city->donateCopy['main'] ?><br />
                <span class="cta"><?= $city->donateCopy['cta'] ?></span>
            </div>
            <div class="btnWrapper">
                <a href="#" class="btn btn-primary"><?= t('I\'ve already donated!') ?></a>
            </div>
            <div class="quote" style="background-image: url('<?= ($city->donateCopy['imagePath']) ?>');"></div>
            <div class="secondary">
                <p>
                    <?= t( /* Canadian cities only */
                        'Jane\'s Walk is a charitable project that relies on ' .
                        'donations from people like you to operate. Our small but ' .
                        'dedicated team ensures even the smallest contributions go a ' .
                        'long way to helping neighbours connect to build strong ' .
                        'communities. Donate today.'
                    ) ?>
                </p>
                <p><?= t(/* Canadian cities only */ 'Message and data rates may apply. Only available in Canada.') ?></p>
            </div>
            <div class="prompt clearfix" style="display: none;">
                <div class="social clearfix">
                    <a href="#" class="fa fa-twitter"></a>
                </div>
                <p>
                    <?= t('Already donated? Spread the word') ?>:
                </p>
            </div>
        </div>
        <div class="social hidden">
        </div>
    </div>
</div>

<div class="overlay o-shout">
    <div class="o-background">
    </div>
    <div class="o-content">
        <a href="#" class="closeModalCta fa fa-times"></a>
        <h1><?= t('Thank you! We couldn\'t do this without you. Spread the word?') ?></h1>
        <div class="options">
            <div class="option">
                <div class="copy">
                    <?= t('"I just donated to Jane\'s Walk. Text %1$s to %2$s to donate %3$s now #JanesWalk"', 'JANE', '45678', '$10') ?>
                </div>
                <div class="networks clearfix">
                    <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div class="catfish c-donate hidden">
    <div class="c-content">
        <a href="#" class="closeCatfishCta fa fa-times"></a>
        <div class="block">
            <?= ($city->donateCopy['main']) ?><br />
            <span class="cta"><?= $city->donateCopy['cta'] ?></span>
        </div>
    </div>
</div>

