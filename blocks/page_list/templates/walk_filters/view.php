<?php
defined('C5_EXECUTE') or die('Access Denied.'); ?>
<?php /* tabs to choose between walk display options */ ?>
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
    <div class="filters clearfix">

      <?php if (!empty($wards)): ?>
      <div class="filter clearfix">
        <label for="ward"><?= ($wardName) ?></label>
        <div class="options">
          <select name="ward" id="ward">
            <option value="*">All</option>
            <?php foreach ($wards as $ward): ?>
            <option value="<?= ($ward) ?>"><?= ($ward) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>
      <?php endif; ?>

      <?php if (!empty($themes)) { ?>
      <div class="filter clearfix">
        <label for="theme"><?= t('Theme') ?></label>
        <div class="options">
          <select name="theme" id="theme">
            <option value="*">All</option>
            <?php foreach ($themes as $key => $theme) { ?>
            <option value="<?= $key ?>"><?= ($theme) ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <?php } ?>

      <?php if (!empty($accessibilities)): ?>
      <div class="filter clearfix">
        <label for="accessibility"><?= t('Accessibility') ?></label>
        <div class="options">
          <select name="accessibility" id="accessibility">
            <option value="*">All</option>
            <?php foreach ($accessibilities as $key=>$accessibility) { ?>
            <option value="<?= $key ?>"><?= ($accessibility) ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <?php endif; ?>

      <?php if (!empty($initiatives)): ?>
      <div class="filter clearfix">
        <label for="initiative"><?= t('Initiative') ?></label>
        <div class="options">
          <select name="initiative" id="initiative">
            <option value="*">All</option>
            <?php foreach ($initiatives as $initiative): ?>
            <option value="<?= ($initiative) ?>"><?= ($initiative) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>
      <?php endif; ?>

      <div class="filter clearfix">
        <label for="date"><?= t('Day') ?></label>
        <div class="options">
          <select name="date" id="date">
            <option value="*">All</option>
            <?php foreach ($dates as $date): ?>
            <option value="<?= ($date) ?>"><?= ($date) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

    </div>

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
    <?php $this->controller->renderCards($cards)->saveHTMLFile('php://output') ?>
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

<?php
if ($showRss) {
?>
<div class="ccm-page-list-rss-icon">
  <a href="<?= ($rssUrl) ?>" target="_blank"><i class="fa fa-rss-square"></i></a>
</div>
<link href="<?= (BASE_URL.$rssUrl) ?>" rel="alternate" type="application/rss+xml" title="<?= ($rssTitle) ?>" />
<?php
}
