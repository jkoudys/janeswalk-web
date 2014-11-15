<?php
defined('C5_EXECUTE') || die('Access Denied.');
use JanesWalk\Models\PageTypes\City;

// Load helpers
$im = Loader::helper('image');
?>
<ul class="ccm-page-list-city-cards">
<?php
    foreach ($pages as $key => $page) { 
        $city = new City($page);
        // Grab the intro text only
        ob_start();
        (new Area('City Header'))->display($page);
        $content = ob_get_contents();
        ob_end_clean();
        if ($content) {
            try {
                $content = trim(strip_tags($content));
            } catch (Exception $e) {
            }
        }
?>
    <li>
        <figure>
            <a href="<?= $city->url ?>" class="thumbnail placeholder<?= $key % 3 ?>" <?php if ($city->fullbg) { ?> style="background-image:url(<?= $im->getThumbnail($city->fullbg, 640, 640) ?>)" <?php } ?>></a>
            <figcaption>
                <h4><a href="<?= $city->url ?>"><?= (string) $city ?></a></h4>
                <p><?= $content ?></p>
                <h5><?= trim($city->city_organizer->getAttribute('first_name') . ' ' . $city->city_organizer->getAttribute('last_name')) ?></h5>
            </figcaption>
        <?php if ($city->avatar) { ?><div class="tag" style="background-image:url(<?= $city->avatar ?>)"></div><?php } ?>
        </figure>
    </li>
<?php
    }
?>
</ul>
