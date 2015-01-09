<?php
defined('C5_EXECUTE') || die('Access Denied.');

// Give the human-readable name, and JS-usable key, for the filters
$filterTuples = [
    [$wardName, 'ward', $wards],
    [t('Theme'), 'theme', $themes],
    [t('Accessibility'), 'accessibility', $accessibilities],
    [t('Initiative'), 'initiative', $initiatives],
    [t('Day'), 'date', $dates]
];

?>
<?php if (count($cards) > 8) { ?>
    <a class="see-all"><?= t2('show only this walk', 'see all %d walks', count($cards)) ?></a>
<?php } ?>
<section class="ccm-block-page-list-walk-filters">
    <div class="walk-preview">
    </div>
    <div class="walk-filters">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#jw-cards" data-toggle="tab">All Walks</a></li>
            <li><a href="#jw-list" data-toggle="tab">List</a></li>
            <?php
            if ($lat && $lng) { ?>
            <li><a href="#jw-map" data-toggle="tab">Map</a></li>
            <?php
            } ?>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <section class="tab-pane active fade in" id="jw-cards">
                <ul class="filters">
<?php
            foreach ($filterTuples as list($name, $key, $data)) {
                if (!empty($data)) {
?>
                    <li>
                        <label><?= $name ?></label>
                        <select name="<?= $key ?>">
                            <option value="*">All</option>
                            <?php foreach ($data as $k => $datum) { ?>
                            <option value="<?= is_string($k) ? $k : $datum ?>"><?= $datum ?></option>
                            <?php } ?>
                        </select>
                    </li>
<?php
                }
            }
?>
                </ul>
                <div class="initiatives hidden">
                    <div class="initiative hidden" data-jw-initiative="Open Streets TO">
                        <div class="headline">What is Open Streets TO?</div>
                        <p>
                            Open Streets TO involves briefly closing Bloor St to vehicle
                            traffic, and opening it to everyone else for fun, safe, and
                            free recreational activities. Open Streets programs take place
                            in cities around the world, usually on Sunday mornings and
                            typically last for about 6 hours. Participants can bike, run,
                            rollerblade, hopscotch, do yoga, skateboard, unicycle... you
                            get the picture.
                        </p>
                        <div class="subheadline">Event dates:</div>
                        <div class="dates">
                            July 27, 2014<br />
                            August 3, 2014<br />
                            August 17, 2014
                        </div>
                    </div>
                    <div class="initiative hidden" data-jw-initiative="100 in 1 Day">
                        <div class="headline">What is 100 In 1 Day?</div>
                        <p>
                            100 in 1 Day is a citizen-driven festival will unite people
                            across the city to make Toronto a better place by creating
                            acts of urban change. These acts, or interventions, have the
                            potential to raise awareness of urban and social issues,
                            inspire ideas, and motivate leaders to consider new approaches
                            to old problems.
                        </p>
                        <div class="subheadline">Event dates:</div>
                        <div class="dates">
                            June 7, 2014
                        </div>
                    </div>
                </div>

                <div class="empty hidden">
                    <?= t('No walks found') ?><br />
                    <?= t('Try another region or theme') ?>
                </div>
                <?php include(__DIR__ . '/../walkcards/view.php'); /* TODO: use a c5 function for loading this */ ?>
            </section>
            <section class="tab-pane fade" id="jw-list">
                <table class="walklist table">
                    <thead>
                        <tr>
                            <th><?= t('Date') ?></th>
                            <th><?= t('Time') ?></th>
                            <th><?= t('Title') ?></th>
                            <th><?= t('Meeting Place') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($walksByDate as $k => $walk) {
                        ?>
                        <tr data-janeswalk-sort="<?= $k ?>">
                            <td><?= $walk->datetimes[0]['date'] ?: '--' ?></td>
                            <td><?= $walk->datetimes[0]['time'] ?: '--' ?></td>
                            <td><a href="<?= $nh->getLinkToCollection($walk->getPage()) ?>" target="_blank" ><?= $walk ?></a></td>
                            <td><?= implode(', ', array_filter((array) $walk->meetingPlace)) ?></td>
                        </tr>
                        <?php
                        }
                        ?>
                    </tbody>
                </table>
            </section>
            <?php
            if ($lat && $lng) { ?>
            <section class="tab-pane fade" id="jw-map">
                <iframe width="100%" height="600px" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?q=select+col2+from+1Yy3SCGdCfmIVjgJLdqthaBlgKmkmIEJDZ3BEmR0p&amp;viz=MAP&amp;h=false&amp;lat=<?= $lat + 0.2 ?>&amp;lng=<?= $lng - 0.6 ?>&amp;t=1&amp;z=10&amp;l=col2&amp;y=3&amp;tmplt=3&amp;hml=GEOCODABLE"></iframe>
            </section>
            <?php
            } ?>
        </div>

        <?php if ($showRss) { ?>
        <div class="ccm-page-list-rss-icon">
            <a href="<?= ($rssUrl) ?>" target="_blank"><i class="fa fa-rss-square"></i></a>
        </div>
        <link href="<?= (BASE_URL.$rssUrl) ?>" rel="alternate" type="application/rss+xml" title="<?= ($rssTitle) ?>" />
        <?php } ?>
    </div>
</section>
