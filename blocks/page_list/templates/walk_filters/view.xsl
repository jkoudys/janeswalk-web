<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<ul class="nav nav-tabs">
  <li class="active"><a href="#jw-cards" data-toggle="tab">All Walks</a></li>
  <li><a href="#jw-list" data-toggle="tab">List</a></li>
  <li><a href="#jw-map" data-toggle="tab">Map</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <section class="tab-pane active fade in" id="jw-cards">
      <div class="filters clearfix">
          <xsl:apply-templates select="filter" />
    </div>

    <div class="initiatives hidden">
          <xsl:apply-templates select="initiative" />
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
<xsl:template match="filter">
      <div class="filter clearfix">
          <label for="{@type}"><xsl:value-of select="text()" /></label>
        <div class="options">
            <select name="{@type}" id="{@type}">
            <option value="*">All</option>
            <?php foreach ($wards as $ward): ?>
            <option value="<?= ($ward) ?>"><?= ($ward) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>
  </xsl:template>
  <xsl:template match="initiative">
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
  </xsl:template>
