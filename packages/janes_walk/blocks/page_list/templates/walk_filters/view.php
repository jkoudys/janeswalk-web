<?php
defined('C5_EXECUTE') || die('Access Denied.');

// Build a list of unique upcoming dates
$uniqueTimes = array_unique(array_map(function($card) { return (int) $card->time['slots'][0][0]; }, $cardsUpcoming));
sort($uniqueTimes);
$uniqueDates = array_map(
    function($time) {
        $dt = DateTime::createFromFormat('U', $time, new DateTimeZone('UTC'));
        return $dt->format('M j, Y');
    },
    $uniqueTimes
);

// Give the human-readable name, and JS-usable key, for the filters
$filterTuples = [
    [$wardName, 'ward', array_combine($wards, $wards)],
    [t('Theme'), 'theme', $themes],
    [t('Accessibility'), 'accessibility', $accessibilities],
    [t('Initiative'), 'initiative', $initiatives],
    [t('Date') . ' <small>(includes repeating dates)</small>', 'date', array_unique(array_combine($uniqueTimes, $uniqueDates))],
];
?>
<section class="ccm-block-page-list-walk-filters">
    <div class="walk-filters">
        <ul class="nav nav-tabs">
            <li><a href="#jw-cards" data-toggle="tab">All Walks</a></li>
            <li><a href="#jw-list" data-toggle="tab">List</a></li>
            <?php
            if ($lat && $lng) { ?>
            <li><a href="#jw-map" data-toggle="tab">Map</a></li>
            <?php
            } ?>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <section class="tab-pane" id="jw-cards">
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
                            <option value="<?= $k ?>"><?= $datum ?></option>
                            <?php } ?>
                        </select>
                    </li>
<?php
                }
            }
?>
                </ul>
                <div class="empty hidden">
                    <h4><?= t('Keep looking.') ?></h4>
                    <p><?= t('We couldn\'t find any walks to match your search. Try setting one of your search options back to "All"') ?></p>
                </div>
                <?php include(__DIR__ . '/../walkcards/view.php'); /* TODO: use a c5 function for loading this */ ?>
            </section>
            <section class="tab-pane" id="jw-list">
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
// Display the list chronologically
foreach ($cardsUpcoming as $k => $walk) {
    if ($walk->time['slots']) {
        $startTime = $walk->time['slots'][0][0];
        $dt = DateTime::createFromFormat('U', $startTime);
                        ?>
                        <tr data-janeswalk-sort="<?= $k ?>">
                            <td data-sort="<?= $startTime ?>"><?= $dt->format('M j, Y') ?></td>
                            <td data-sort="<?= $startTime ?>"><?= $dt->format('h:i A') ?></td>
                            <td><a href="<?= $nh->getLinkToCollection($walk->getPage()) ?>" target="_blank" ><?= $walk ?></a></td>
                            <td><?= implode(', ', array_filter((array) $walk->meetingPlace)) ?></td>
                        </tr>
                        <?php
    }
}
?>
                    </tbody>
                </table>
            </section>
            <?php
            if ($lat && $lng) { ?>
            <section class="tab-pane" id="jw-map">
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
