<?php
$this->inc('elements/header.php');

// Comma separated list of walk leaders
if (count($w->walkLeaders)) {
    $walkLeaders = t2('Walk Leader: ', 'Walk Leaders: ', count($w->walkLeaders));
    $walkLeaders .= implode(
        ', ',
        array_map(
            function ($mem) {
                return trim($mem['name-first'] . ' ' . $mem['name-last']);
            },
            $w->walkLeaders
        )
    );
} else if ($w->team) {
    // If we have no leaders set, show the CO
    $walkLeaders = t('Walk Organizer') . ': ' .
        $w->team[0]['name-first'] . ' ' . $w->team[0]['name-last'];
}

// Options to register
if ((string) $c->getAttribute('show_registration_button') === 'Yes') {
    if (!empty($eid)) {
        $registrationMessage = '<a data-eid="' . $eid . '" href="http://eventbrite.ca/event/' . $eid . '" id="register-btn" class="btn btn-primary btn-large">' .
            t('Register For This Walk') .
            '</a>';
    } else {
        $registrationMessage = t('Registration Not Yet Open');
    }
}

if (!empty($w->time['slots'])) {
    // Use the duration of the next available walk
    $duration = new DateTime('@' . ($w->time['slots'][0][1] - $w->time['slots'][0][0]));
    $hours = (int) $duration->format('H');
    $minutes = (int) $duration->format('i');
    $durationComponents = [];

    if ($hours) {
        $durationComponents[] = t2('%d Hour', '%d Hours', $hours);
    }
    if ($minutes) {
        $durationComponents[] = t2('%d Minute', '%d Minutes', $minutes);
    }

    // Separate which are upcoming, and which are past walks
    $pastSlots = [];
    $futureSlots = array_filter(
        $w->time['slots'],
        function($slot) use (&$pastSlots) {
            // Check that it ends at least yesterday
            if ($slot[1] > (time() - 24 * 60 * 60)) {
                return true;
            } else {
                $pastSlots[] = $slot;
                return false;
            }
        }
    );
}

// Load array of initiatives this walk is part of
$iniAttr = $c->getAttribute('walk_initiatives');
$initiatives = [];
if ($iniAttr) {
    $initiatives = array_map(
        function($init) {
            return $init->value;
        },
        $iniAttr->getOptions()
    );
}
// Default to a festival walk, if no initiative
if (empty($initiatives)) {
    $initiatives = [t('Festival Walk')];
}

// Build a link to the page's KML
$kmlLink = $nh->getCollectionURL($c) . '?format=kml';
?>
<div id="fb-root"></div>
<script type="text/javascript">
    window.fbAsyncInit = function () {
        FB.init({
            appId: '544710848887303',
            status: true,
            xfbml: true
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/all.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
<?php $this->inc('elements/navbar.php'); ?>
<div class="container-outter" role="main">
    <div class="container">
        <?= $breadcrumb ?>
        <div class="walk-label"><?= implode(', ', $initiatives) ?></div>
        <div class="tag-list">
            <ul class="nav nav-pills">
                <?php foreach ($w->themes as $theme => $status) { ?>
                <li><?= $th->getIcon($theme) ?> <?= t($th->getName($theme)) ?></li>
                <?php } ?>
            </ul>
        </div>
        <div class="walk-header">
            <h1 class="walk-title"><?= $w ?></h1>
            <div class="profiles">
                <div id="reg-group">
                    <?php if ($w->time['open']) { ?>
                    <h4 class="available-time"><i class="fa fa-calendar"></i> <?= t('Open schedule') ?></h4>
                    <?php
                    } elseif (!empty($futureSlots)) {
                    ?>
                    <h4 class="available-time">
                        <i class="fa fa-calendar"></i> <?= t2('Next available day', 'Available dates', count($futureSlots)) ?>:<br />
                        <?php
                        foreach ($futureSlots as $slot) {
                            $start = DateTime::createFromFormat('U', $slot[0]);
                        ?>
                        <span class="highlight"><?= $start->format('F j, Y') ?></span>
                        <span class="divider">|</span>
                        <span class="time"><?= $start->format('h:i A') ?></span>
                        <br />
                        <?php
                        }
                        ?>
                    </h4>
                    <?php } ?>
                    <?= $registrationMessage ?>
                </div>
            </div>
        </div>

        <div class="walk-leaders">
            <h4>
                <?= $walkLeaders ?>
            </h4>
            <?php if ($meeting_place) { ?>
            <h4>
                <?= t('Meeting Place') ?>: <?= $meeting_place['title'] ?>
            </h4>
            <p><?= $meeting_place['description'] ?></p>
            <?php } ?>
        </div>
        <?php if (count((array) $w->map['markers']) + count((array) $w->map['route'])) { ?>
        <div class="walk-stops" style="display:none">
            <div class="walk-stops-meta box-sizing">
                <header id="header" class="walk-stops-meta-inner">
                    <?php if (isset($duration)) { ?>
                    <h4><i class="fa fa-clock-o"></i> <?= t('Duration') ?>:</h4>
                    <h5>
                        <?= t('Approximately') . '  ', join(', ', $durationComponents) ?>
                    </h5>
                    <?php } else { ?>
                    <h4><i class="fa fa-clock"></i> <?= t('Open Schedule') ?></h4>
                    <?php } ?>
                    <hr>
                    <h4><i class="fa fa-map-marker"></i> <?= t('Walk Route') ?></h4>
                    <h5 class="clickdetails"><?= t('Click locations to see details') ?></h5>
                    <ol>
                        <?php foreach ($w->map['markers'] as $key => $marker) { ?>
                        <li class="walk-stop" data-key="<?= $key ?>"><h4><?= $marker['title'] ?></h4></li>
                        <?php } ?>
                    </ol>
                </header>
            </div>
            <div id="map-canvas-wrapper">
                <div id="map-canvas">
                    <div class="infobox-wrapper">
                        <div id="infobox">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php } ?>
        <div class="walk-body">
            <div class="walk-details">
                <div class="walk-about">
                    <h3><?= t('About This Walk') ?></h3>
                    <?php if ($thumb) { ?>
                    <a class="thumb" href="<?= ($im->getThumbnail($thumb, 1024, 1024)->src) ?>">
                        <img src="<?= $im->getThumbnail($thumb, 340, 720)->src ?>" class="pull-right img-polaroid" />
                    </a>
                    <?php } ?>
                    <?= $w->longDescription ?>
                </div>
                <?php if (count($w->map['markers'])) { ?>
                <div class="walk-stops-list">
                    <hr />
                    <h3><?= t('Walk Stops') ?></h3>
                    <?php
                    $path = $_SERVER['REQUEST_URI'];
                    $url = 'http://janeswalk.org' . ($path);
                    ?>
                    <a href="geo:0,0?q=<?= $kmlLink ?>" target="_blank" class="btn btn-primary">
                        View in Maps App
                    </a>
                    <ol>
                        <?php foreach ($w->map['markers'] as $key => $marker) { ?>
                        <li class="walk-stop" id="<?= ($key) ?>">
                            <h4><?= $marker['title'] ?></h4>
                            <p><?= $marker['description'] ?></p>
                        </li>
                        <?php } ?>
                    </ol>
                </div>
                <?php } ?>

                <div class="walk-team">
                    <hr />
                    <h3 id="walk-leader-bio"><?= t('About The Walk Team') ?></h3>
                    <ul class="walk-leaders">
                        <?php foreach ($w->teamPictures as $k => $mem) { ?>
                        <li>
                            <img class="avatar <?= $mem['avatar'] ? '' : 'default' ?>" src="<?= $mem['avatar'] ?: $mem['image'] ?>" alt="<?= $mem['title'] ?>" />
                            <section>
                                <h4>
                                    <span class='title'><?= $mem['title'] ?></span><br /><?= $mem['name-first'] . ' ' . $mem['name-last'] ?>
                                </h4>
                                <div class="btn-toolbar">
                                    <?php  // TODO: Replace all logic to format links with model logic ?>
                                    <?php if ($mem['email']) { ?><a href="mailto:<?= $mem['email'] ?>" target="_blank" class="btn"><i class="fa fa-envelope-o"></i></a><?php } ?>
                                    <?php if ($mem['facebook']) { ?><a href="http://facebook.com/<?= $mem['facebook'] ?>" target="_blank" class="btn"><i class="fa fa-facebook"></i></a><?php } ?>
                                    <?php if ($mem['twitter']) { ?><a href="http://twitter.com/<?= $mem['twitter'] ?>" target="_blank" class="btn"><i class="fa fa-twitter"></i></a><?php } ?>
                                    <?php if ($mem['website']) { ?><a href="http://<?= $mem['website'] ?>" target="_blank" class="btn"><i class="fa fa-globe"></i></a><?php } ?>
                                </div>
                                <p><?= $mem['bio'] ?></p>
                            </section>
                        </li>
                        <?php } ?>
                    </ul>
                </div>

                <div class="walk-downloads">
                    <hr>
                    <h3><?= t('Downloads') ?></h3>
                    <div class="download-list">
                        <?php (new Area('Downloads'))->display($c) ?>
                    </div>
                </div>

                <?php if (!empty($pastSlots)) { ?>
                <div class="walk-past">
                    <strong><?= t('Past Walk Dates') ?>: </strong>
                    <?= implode(', ', array_map(function($slot) { return DateTime::createFromFormat('U', $slot[0])->format('F j, Y'); }, $pastSlots)) ?>
                </div>
                <?php } ?>

                <div class="walk-aux">
                    <hr>
                    <div class="share-print">
                        <a href="javascript:window.print();" class="share notify printLink"><i class="fa fa-print"></i> <?= t('Print this walk') ?></a>
                        <a href="#" class="share notify facebookShareLink"><i class="fa fa-share"></i> <?= t('Share this walk') ?></a>
                    </div>
                </div>
            </div>

            <aside>
                <div class="thumbnail" id="register">
                    <?php
                    if ((string) $c->getAttribute('show_registration_button') === 'Yes') {
                        if (!empty($eid)) {
                    ?>
                    <div class="caption">
                        <h3>
                            <i class="fa fa-calendar"></i>
                            <a href="<?= 'http://eventbrite.ca/event/', $eid ?>"><?= t('Register For This Walk') ?></a>
                            <p class="select-day"></p>
                        </h3>
                    </div>
                    <?php
                    } else {
                    ?>
                    <div class="caption">
                        <h3>
                            <i class="fa fa-calendar"></i>
                            <?= t('Registration Not Open') ?>
                            <p class="select-day"></p>
                        </h3>
                    </div>
                    <?php
                        }
                    }
                    ?>
                    <div class="calendar-wrap box-sizing" style="display:none">
                        <div class="calendar-header">
                            <button id="custom-prev" class="custom-month btn btn-mini btn-primary pull-left"><i class="fa fa-caret-left"></i></button>
                            <span id="custom-month">April</span>, <span id="custom-year">2013</span>
                            <button id="custom-next" class="custom-month btn btn-mini btn-primary pull-right"><i class="fa fa-caret-right"></i></button>
                        </div>
                        <div id="calendar" class="fc-calendar-container"></div>
                    </div>
                    <div class="caption" style="display:none">
                        <div class="date-caption">
                            <div class="request-nowalks"><small>There is no scheduled walk for this day</small></div>
                            <a href="#" class="btn btn-primary request-btn">Request this day</a>
                        </div>
                    </div>
                    <div class="request" style="display:none">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="date-picker">Date</label>
                                <input type="text" value="12-02-2012" id="date-picker">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="request-number">Number of people</label>
                                <input type="text" id="request-number" />
                            </div>
                        </div>
                        <label for="request-body">Add a Note:</label>
                        <textarea name="" id="request-body" cols="30" rows="5"></textarea>
                        <label for="request-email">Your email</label>
                        <input type="text" id="request-email" />
                        <button class="btn btn-primary notify">
                            Request Date
                        </button>
                    </div>
                </div>
                <div class="thumbnail accessibility">
                    <div class="caption">
                        <h4><i class="fa fa-male"></i> <?= t('Accessibility') ?></h4>
                        <ul>
                            <?php foreach ($w->accessible as $accessible => $value) { ?>
                            <li><?= t($th->getName($accessible)) ?></li>
                            <?php } ?>
                        </ul>
                        <?php if ($accessible_info = trim($w->accessibleInfo)) {?>
                        <p id="accessibility notes">
                            <?= t($accessible_info) ?>
                        </p>
                        <?php }
                        if ($public_transit = trim($w->accessibleTransit)) { ?>
                        <h4><i class="fa fa-bus"></i> <?= t('Taking Public Transit') ?></h4>
                        <p id="public transit directions">
                            <?= t($public_transit) ?>
                        </p>
                        <?php }
                        if ($accessible_parking = trim($w->accessibleParking)) {
                        ?>
                        <h4><i class="fa fa-road"></i> <?= t('Parking Availability') ?></h4>
                        <p id="parking availability">
                            <?= t($accessible_parking) ?>
                        </p>
                        <?php }
                        if ($accessible_find = trim($w->accessibleFind)) { ?>
                        <h4><i class="fa fa-flag"></i> <?= t('How to find us') ?></h4>
                        <p>
                            <?= t($accessible_find) ?>
                        </p>
                        <?php
                        } ?>
                    </div>
                </div>
            </aside>
        </div>
        <div class="walk-feedback">
            <hr>
            <h3><i class="fa fa-comments-o"></i> <?= t('Feedback') ?></h3>
            <div class="row">
                <div class="col-md-8">
                    <div class="well">
                        <div id="disqus_thread"></div>
                        <script type="text/javascript">
                            var disqus_shortname = 'janeswalk';
                            (function () {var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);})();
                        </script>
                        <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php $this->inc('elements/footer.php');
