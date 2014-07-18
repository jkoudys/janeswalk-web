<?php
  defined('C5_EXECUTE') or die("Access Denied.");
  $th = Loader::helper('text');
//Note that $nh (navigation helper) is already loaded for us by the controller (for legacy reasons)
?>
<div class="ccm-page-list-typeahead">
  <form>
    <fieldset class="search">
      <input type="text" name="selected_option" class="typeahead" placeholder="Find a Walk in which city?" autocomplete="off" />
      <input type="submit" value="Go" />
      <ul>
        <?php

          // Sort the city pages by the country they're in
          uasort(
            $pages,
            function ($a,$b) {
              return (($ap = $a->getCollectionParentID()) == ($bp = $b->getCollectionParentID()))
                ? strcmp($a->getCollectionName(),$b->getCollectionName())
                : strcmp(Page::getByID($ap)->getCollectionName(),Page::getByID($bp)->getCollectionName());
            }
          );

          // Show the country parent list and city pages
          $lastCountryPage = null;
          foreach ($pages as $cityPage):
            $countryPage = Page::getByID($cityPage->getCollectionParentID())->getCollectionName();
            if ($countryPage !== $lastCountryPage) {
              if ($lastCountryPage !== null) {
                echo '</ul></li>';
              }
              echo '<li class="country"><div class="name">' . ($countryPage) . '</div><ul class="cities">';
              $lastCountryPage = $countryPage;
            }
        ?>
              <li>
                <?php
                  $title = $th->entities($cityPage->getCollectionName());
                  $url = $nh->getLinkToCollection($cityPage);
                ?>
                <a href="<?= ($url) ?>"><?= ($title) ?></a>
              </li>
            <?php
              endforeach;
            ?>
          </ul>
        </li>
        <li class="hidden aux">
          <a href="/city-organizer-onboarding/">Add <span rel="city.name"></span> to Jane's Walk</a>
        </li>
      </ul>
    </fieldset>
  </form>
</div><!-- end .ccm-page-list -->
