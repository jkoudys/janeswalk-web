<?php 
$nh = Loader::helper('navigation');
$im = Loader::helper('image');
$gmap = json_decode($c->getAttribute("gmap"));
$team = json_decode($c->getAttribute('team'));
$this->inc('elements/header.php');  ?>

<body class="walk-page active-walk">
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
    
<div class="container">

<ul class="breadcrumb visible-desktop visible-tablet">
  <?php
  $crumbs = $nh->getTrailToCollection($c);
  krsort($crumbs);
  foreach($crumbs as $crumb) {
  ?>
    <?php
    if( $crumb->getCollectionID() == 1 ) { ?>
      <li><a href="<?php echo $nh->getLinkToCollection($crumb) ?>"><i class="icon-home"></i></a> <span class="divider"><i class="icon-angle-right"></i></span></li>
    <?php } else if ($crumb->getCollectionTypeHandle() != 'country' ) { ?>
      <li><a href="<?php echo $nh->getLinkToCollection($crumb) ?>"><?php echo $crumb->getCollectionName() ?></a><span class="divider"><i class="icon-angle-right"></i></span></li>
    <?php }
  } ?>
  <li class="active"><?php echo $c->getCollectionName() ?></li>
</ul>

    <div class="walk-label">YearRound Walk</div>

    <div class="tag-list">
      <ul class="nav nav-pills">
        <?php 
          $th = Loader::helper('theme');
          foreach($c->getAttribute("theme") as $theme) {
            echo "<li><div class='icon'>".$th->getIcon($theme).'</div> '.$th->getName($theme)."</li>";
          }
         ?>
              
      </ul>
    </div>

<div class="row-fluid walk-header">
  <div class="span9">
    
    <h1 class="walk-title"><?php echo $c->getCollectionName() ?></h1>



  </div>

  <div class="span3 profiles box-sizing">
    <div id="reg-group">
      <?php $scheduled = $c->getAttribute('scheduled');$slots = (Array)$scheduled['slots']; 
      if($scheduled['open']) { ?>
        <h4 class="available-time"><i class="icon-calendar"></i> Open schedule</h4>
      <?php } else if(isset($slots[0]['date'])) {  ?>
        <h4 class="available-time"><i class="icon-calendar"></i> Next available day:<br /><span class="highlight"><?php echo $slots[0]['date']; ?></span></h4>
      <?php } 
      $eid = $c->getAttribute('eventbrite');
      if(!empty($eid)) {
      ?>
      <a href="<?php echo "http://eventbrite.ca/event/" . $eid ?>" id="register-btn" class="btn btn-primary btn-large">Register For This Walk</a>
      <?php } ?>
    </div>
  </div>
</div>


<div class="row-fluid walk-leaders clearfix">
  <div class="span7">
  <?php 
  $teamCount = 0;
  foreach($team as $mem) {
    if(!empty($mem->{'name-first'})) { $teamCount++; }
  }
  if($teamCount > 0) {
    if($teamCount == 1) {
      echo "<h4>Walk Leader: ";
    }
    else {
      echo "<h4>Walk Leaders: ";
    }
    foreach($team as $key=>$mem) {
      echo (empty($mem->{'name-first'}) ? "" : ($key > 0 ? ", " : "") . $mem->{'name-first'} . " " . $mem->{'name-last'});
    }
  } ?>
  </div>
</div>



<div class="hero-unit walk-stops">
  <div class="row-fluid">
    <div class="span12">
      <div class="walk-stops-meta box-sizing">
        <header id="header" class="walk-stops-meta-inner">
          <?php if (isset($slots[0]['duration'])) { ?>
            <h4><i class="icon-time"></i> Duration:</h4>
            <h5>
              Approximately <?php echo $slots[0]['duration'] ?>
            </h5>
          <?php } else { ?>
            <h4><i class="icon-time"></i> Open Schedule</h4>
          <?php } ?>


          <hr>
          <h4><i class="icon-map-marker"></i> Walk Route</h4>
          <h5 class="clickdetails">Click locations to see details</h5>
          <ol>
          <?php
            foreach($gmap->markers as $key=>$marker) {
            echo "<li class='walk-stop' id='".$key."'><h4>".$marker->title . "</h4></li>";
            } ?>
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
  </div>
</div>

<div class="row-fluid walk-body">
  <div class="span8">
    
    <div class="clearfix">
      <h3>About This Walk</h3>
      <?php $thumb = $c->getAttribute("thumbnail"); 
      if( $thumb ) {
        echo "<a class='thumb' href='" . $im->getThumbnail($thumb,1024,1024)->src . "' ><img src='" . $im->getThumbnail($thumb,340,720)->src . "' class='pull-right img-polaroid' /></a>";
      } 
      echo $c->getAttribute('longdescription'); ?>
    </div>

    <div class="clearfix walk-team">
      <hr>
      <h3 id="walk-leader-bio">About The Walk Team</h3>

      <?php
      foreach($team as $mem) { 
        if(!empty($mem->{'name-first'})) {
        ?>
      <div class="walk-leader clearfix"> 
        <div class="row-fluid">
          <div class="span3">
            <?php
            switch($mem->type) {
              case "you":
              case "leader":
                echo '<img src="' . $this->getThemePath() . '/img/walk-leader.png" alt="Walk Leader" class="pull-left">';
                echo '</div><div class="span9">';
                echo '<h4><span class="title">Walk Leader:</span><br>' .$mem->{'name-first'} . " " . $mem->{'name-last'} . '</h4>';
                break;
              case "organizer":
                echo '<img src="' . $this->getThemePath() . '/img/walk-organizer.png" alt="Walk Organizer" class="pull-left">';
                echo '</div><div class="span9">';
                echo '<h4><span class="title">Walk Organizer:</span><br>' .$mem->{'name-first'} . " " . $mem->{'name-last'} . '</h4>';
                break;
              case "community":
                echo '<img src="' . $this->getThemePath() . '/img/community-voice.png" alt="Community Voice" class="pull-left">';
                echo '</div><div class="span9">';
                echo '<h4><span class="title">Community Voice:</span><br>' .$mem->{'name-first'} . " " . $mem->{'name-last'} . '</h4>';
                break;
              case "volunteer":
                echo '<img src="' . $this->getThemePath() . '/img/volunteers.png" alt="Volunteer" class="pull-left">';
                echo '</div><div class="span9">';
                echo '<h4><span class="title">Volunteer:</span><br>' .$mem->{'name-first'} . " " . $mem->{'name-last'} . '</h4>';
                break;
              default:
                echo '</div><div class="span9">';
                break;
            }
            ?>

            <div class="btn-toolbar">
              <a class="btn notify">Request a Custom Walk</a>
              <a href="mailto:<?php echo $mem->email ?>" class="btn"><i class="icon-envelope-alt"></i></a>
              <a class="btn notify"><i class="icon-facebook"></i></a>
              <a class="btn notify"><i class="icon-twitter notify"></i></a>
             </div>
           <?php echo $mem->bio ?>
          </div>
        </div>
      </div>
    <?php } } ?>
    </div><!-- About The Walk Leader Section -->

    <hr>

<?php /*    <h3>Additional Resources</h3>

    <div class="resources-list">
      <ul>
        <li>
          <h4><a href="/files/dundas_square.pdf" target="_blank"><i class="icon-file"></i> Dundas Square : Consumption and Intimacy</a></h4> 
          <p> Author: Thomas-Bernard Kenniff. <br>Published in On Site, no.18, 2007.</p>
        </li>

        <li>
          <h4><a href="http://en.wikipedia.org/wiki/Yonge-Dundas_Square" target="_blank"><i class="icon-link"></i> Yonge-Dundas Square on Wikipedia</a></h4> 
          <p>Read about one of the squares we will visit, Yonge-Dundas Square, on Wikipedia.</p>
        </li>

        <li>
          <h4><a href="http://www.thestar.com/business/2013/06/06/ten_years_on_yongedundas_square_a_marketing_hub.html" target="_blank"><i class="icon-link"></i> Ten years on, Yonge-Dundas Square a marketing hub</a></h4>
          <p>Article in the Toronto Star about Yonge-Dundas Square from June 7, 2013.</p>
        </li>
      </ul>
    </div> <!-- Resources --> */ ?>

    <h3>Download This Walk</h3>

    <div class="download-list">
      <ul>
        <li>
          <h4>Audio</h4> 
          <p>Not available for this walk. Audio downloads will be available for select walks in Jane's Walk YearRound. </p>
          <a href="#" class="btn btn-primary notify download"><i class="icon-headphones"></i> Download Audio</a>
        </li>
      </ul>
    </div> <!-- Download -->

    <hr>

    <div class="share-print">
      <a href="#" class="share notify"><i class="icon-print"></i> Print this walk</a>
      <a href="#" class="share notify"><i class="icon-share"></i> Share this walk</a>
    </div>

  </div>


  <aside class="span4">
    <div class="thumbnail" id="register">
      <div class="caption">
        <h3><i class="icon-calendar"></i> Register For This Walk</h3>
        <p class="select-day"><? #Select a day ?>Not yet open</p>
      </div>
      <div class="calendar-wrap box-sizing">
      
        <div class="calendar-header">
          <? # <button id="custom-prev" class="custom-month btn btn-mini btn-primary pull-left"><i class="icon-caret-left"></i></button>      
            # <span id="custom-month">April</span>, <span id="custom-year">2013</span> 
             #<button id="custom-next" class="custom-month btn btn-mini btn-primary pull-right"><i class="icon-caret-right"></i></button> ?>
          <p>Registration will be opening soon for walks in October 2013.<p>
        </div>
          
        <div id="calendar" class="fc-calendar-container"></div>
      </div>
      <div class="caption">
        <div class="date-caption">
          <div class="request-nowalks"><small>There is no scheduled walk for this day</small></div>
          <a href="#" class="btn btn-primary request-btn">Request this day</a>
        </div>
      </div>
      <div class="request">
        <div class="row-fluid">
          <div class="span">
            <label for="date-picker">Date</label>
            <input type="text" value="12-02-2012" id="date-picker">
          </div>
        </div> 
        <div class="row-fluid">
          <div class="span6">
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
      <div class="alert alert-info"><p>While Walks are free and volunteer led, support for Jane's Walk can be recognized through a donation as part of a Walk booking.</p></div>
    </div>

    <div class="thumbnail accessibility">
      <div class="caption">
      <h4><i class="icon-accessible"></i> Accessibility</h4>
        <ul>
          <?php foreach($c->getAttribute("accessible") as $accessible) {
            echo "<li>".$th->getName($accessible)."</li>";
          } ?>
        </ul>
        <p id="accessibility notes">
        
        </p>
        <?php $public_transit = trim($c->getAttribute("accessible_transit"));
        $accessible_parking = trim($c->getAttribute("accessible_parking"));
        $accessible_find = trim($c->getAttribute("accessible_find"));
        if(!empty($public_transit)) { ?>
          <h4><i class="icon-transit"></i> Taking Public Transit</h4>
            <p id="public transit directions">
              <?php echo $public_transit ?>
            </p>
         <? }
          if(!empty($accessible_parking)) {
         ?>
          <h4><i class="icon-road"></i> Parking Availability</h4>
            <p id="parking availability">
              <?php echo $accessible_parking ?>
            </p>
        <? }
          if(!empty($accessible_find)) { ?>
          <h4><i class="icon-flag"></i> How to find us</h4>
          <p>
              <?php echo $accessible_find ?>
          </p>
        <? } ?>
      </div>
    </div><!-- accessibility -->

  </aside>
</div>
  <hr>
<h3><i class="icon-comments-alt"></i> Feedback</h3>
<div class="row-fluid">
  <div class="span8">
    <div class="well">
    <div id="disqus_thread"></div>
    <script type="text/javascript">
      /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
      var disqus_shortname = 'janeswalk'; // required: replace example with your forum shortname

      /* * * DON'T EDIT BELOW THIS LINE * * */
      (function() {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
  
    </div>
  </div>  
</div></div>



  </div> 
  <script>
    <?php 
    echo "var locations=[";
    foreach($gmap->markers as $key=>$marker) {
      echo ($key > 0 ? "," : "") . "['" . htmlspecialchars($marker->title,ENT_QUOTES) . "','" . htmlspecialchars($marker->description,ENT_QUOTES) . "'," . $marker->lat . "," . $marker->lng . "," . $key . "]";
    }
    echo "];";
    ?>

    // Drawing Polyline
    var walkPathCoordinates = [
    <?php
    foreach($gmap->route as $key=>$rp) {
      if(isset($rp->lat) && isset($rp->lng)) echo ($key > 0 ? "," : "") . "new google.maps.LatLng(" . $rp->lat . "," . $rp->lng . ")";
    } ?>
    ];
    var mapCenter = new google.maps.LatLng(43.654335, -79.386263);
    
    var EventBriteEmail = "jasmine.frolick@janeswalk.net";
    $('a.thumb').colorbox({ rel:'group1', onOpen: blurPage, onCleanup: unblurPage, current: "Picture {current} of {total}", previous: "&lt;", next: "&gt;", close:"x", maxHeight:"80%", maxWidth:"80%" });
    
  </script>

<?php $this->inc('elements/footer.php');  ?>
