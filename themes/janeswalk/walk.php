<?php 
$nh = Loader::helper('navigation');
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
    <!-- <div class="row-fluid profile-inner clearfix">
      <div class="span3">
        <img src="/images/jason-sm.jpg" alt="" class="img-circle">
      </div>
      <div class="span9 bio">
        <h4>Walk Leader: Jason Kucherawy</h4>
        <div class="btn-toolbar">
          <a href="#" class="btn notify"><i class="icon-envelope-alt"></i></a>
        <a class="btn" href=""><i class="icon-facebook"></i></a>
        <a class="btn notify" href="#"><i class="icon-twitter"></i></a>
        </div>
      <small>It can take a village to put together a Jane's Walk. Learn more about the people that make this walk happen.</small>
        
      </div>
      <a class="bottom-bar" href="#walk-leader-bio">More about the Walk Team <i class="icon-chevron-down"></i></a>
    </div> -->
    <div id="reg-group">
      <?php $scheduled = $c->getAttribute('scheduled');
      if($scheduled['open']) { ?>
        <h4 class="available-time"><i class="icon-calendar"></i> Open schedule</h4>
      <?php } else {  ?>
        <h4 class="available-time"><i class="icon-calendar"></i> Next available day:<br /><span class="highlight"><?php $slots = (Array)$scheduled['slots']; echo $slots[0]['date']; ?></span></h4>
      <?php } ?>
      <a href="#register" id="register-btn" class="btn btn-primary btn-large">Register For This Walk</a>
    </div>
  </div>
</div>


<div class="row-fluid walk-leaders clearfix">
  <div class="span7">
    <h4>Walk Leaders: Jason Kucherawy, Janet Langdon, and Howard Tam</h4>
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
          <h4><img src="/images/marker.w.png" alt=""> Walk Route</h4>
          <h5 class="clickdetails">Click locations to see details</h5>
          <ol>
            <li class="walk-stop" id="0"><h5>Meeting Place:<br> Lobby of the Marriott Downtown Eaton Centre Hotel (525 Bay Street)</h5></li>
            <li class="walk-stop" id="1"><h5>Old City Hall</h5></li>
            <li class="walk-stop" id="2"><h5>Nathan Phillips Square</h5></li>
            <li class="walk-stop" id="3"><h5>Old Chinatown</h5></li>
            <li class="walk-stop" id="4"><h5>Trinity Square</h5></li>
            <li class="walk-stop" id="5"><h5>Eaton Centre</h5></li>
            <li class="walk-stop" id="6"><h5>Dundas Square</h5></li>
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
      <?php echo $c->getAttribute('longdescription'); ?>
    </div>

    <div class="clearfix walk-team">
      <hr>
      <h3 id="walk-leader-bio">About The Walk Team</h3>


      <div class="walk-leader clearfix"> 
        <div class="row-fluid">
          <div class="span3">
            <img src="/images/jason-lg.jpg" class="pull-left img-circle">
          </div>
          <div class="span9">

            <h4><span class="title">Walk Leader:</span><br> Jason Kucherawy</h4>
            <div class="btn-toolbar">
              <a class="btn notify">Request a Custom Walk</a>
              <a href="mailto:jason@tourguys.ca" class="btn"><i class="icon-envelope-alt"></i></a>
              <a class="btn notify"><i class="icon-facebook"></i></a>
              <a class="btn notify"><i class="icon-twitter notify"></i></a>
             </div>
            <p>As a professional tour guide and downtown resident for more than 15 years, Jason knows what makes Toronto tick and loves to share what he knows.</p>
            <p>Jason's educational background in cultural anthropology, tour guide training, stage experience as a comedian, and his vast and varied interests (including history, culture, politics, craft beer, graffiti art, music, city-building, education, and games) make him a versatile and entertaining walk leader.</p>
          </div>
        </div>
      </div>

      <div class="walk-leader clearfix">
        <div class="row-fluid">
          <div class="span3">
            <img src="/images/janet-lg.jpg" class="pull-left img-circle">
          </div>
          <div class="span9">
            <h4><span class="title">Walk Leader:</span><br> Janet Langdon</h4>
            <div class="btn-toolbar">
              <a class="btn notify">Request a Custom Walk</a>
              <a href="mailto:janetlangdon@gmail.com" class="btn"><i class="icon-envelope-alt"></i></a>
              <a class="btn notify"><i class="icon-facebook"></i></a>
              <a class="btn notify"><i class="icon-twitter"></i></a>
            </div>
            <p>Janet is a third generation Torontonian with a passion for its history and architecture. A graduate of the Local Tour Guide course at George Brown College, she often dons the cloak of an intrepid tour guide for Heritage Toronto, the Toronto Field Naturalists and the Toronto Society of Architects. With her extensive knowledge of Toronto, Janet enjoys sharing insightful and informative commentary.</p>
          </div>   
        </div>
      </div>
      
      <div class="walk-leader clearfix"> 
        <div class="row-fluid">
          <div class="span3">
            <img src="/images/howard-lg.jpg" class="pull-left img-circle">
          </div>
          <div class="span9">
            <h4><span class="title">Walk Leader:</span><br> Howard Tam</h4>
            <div class="btn-toolbar">
              <a class="btn notify">Request a Custom Walk</a>
              <a href="mailto:howard.t.tam@gmail.com" class="btn"><i class="icon-envelope-alt"></i></a>
              <a class="btn notify"><i class="icon-facebook"></i></a>
              <a class="btn notify"><i class="icon-twitter notify"></i></a>
            </div>
            <p>An urban planner and computer engineer by training, Howard has previously spent time studying and travelling in East Asia, worked with the Ontario Ministries of Finance and Infrastructure and has been a student leader as well as an environment and health activist.</p>

            <p>Raised in Toronto, Howard loves his home town and aspires to make it a better place to live. As Urban Innovator and Strategist at the ThinkFresh Group, Howard’s work focuses on seeing social enterprise come to life in urban infrastructure and community projects.</p>
          </div>
        </div>
      </div> 
    </div><!-- About The Walk Leader Section -->

    <hr>

    <div class="walk-supporters">


      <h3>Walk Organizers</h3>
      <h4 class="caption">The team that helped organize and support this walk.</h4>

      <div class="row-fluid individual">
        <div class="span6">
          <div class="row-fluid">
            <div class="span2">
              <img src="/images/peter.jpg" alt="" class="img-circle">
            </div>
            <div class="span6">
              <h4>Peter Foley</h4>
              <h5 class="title">Jane's Walk</h5>
            </div>
          </div>          
        </div>
        <div class="span6">
          <div class="row-fluid">
            <div class="span2">
              <img src="/images/denise.jpg" alt="" class="img-circle">
            </div>
            <div class="span6">
              <h4>Denise Pinto</h4>
              <h5 class="title">Jane's Walk</h5>
            </div>
          </div>          
        </div>
      </div>

      <div class="row-fluid individual">
        <div class="span6">
          <div class="row-fluid">
            <div class="span2">
              <img src="/images/ruthie.jpg" alt="" class="img-circle">
            </div>
            <div class="span6">
              <h4>Ruthie Wellen</h4>
              <h5 class="title">Jane's Walk</h5>
            </div>
          </div>          
        </div>
      </div>
  
    </div><!-- Walk Supporters -->

    <hr>

    <h3>Additional Resources</h3>

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
    </div> <!-- Resources -->

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
        <p class="select-day">Select a day</p>
      </div>
      <div class="calendar-wrap box-sizing">
      
        <div class="calendar-header">
          <button id="custom-prev" class="custom-month btn btn-mini btn-primary pull-left"><i class="icon-caret-left"></i></button>      
          <span id="custom-month">April</span>, <span id="custom-year">2013</span>
          <button id="custom-next" class="custom-month btn btn-mini btn-primary pull-right"><i class="icon-caret-right"></i></button>
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
          <li>Curbs or steps</li>
          <li>Busy sidewalks</li>
          <li>Strollers welcome</li>
        </ul>
        <p id="accessibility notes">
        
        </p>
        <h4><i class="icon-transit"></i> Taking Public Transit</h4>
          <p id="public tranit directions">
            Take the Yonge-University-Spadian Subway to the Dundas Station. Exit the station and walk west to Bay Street and south on the east side of Bay to the Marriott Eaton Centre Hotel
          </p>
        <h4><i class="icon-road"></i> Parking Availability</h4>
          <p id="parking availability">
            There is parking available underground below City Hall. Enter driving south on Bay south of Dundas on the west side of Bay
          </p>

        <h4><i class="icon-flag"></i> How to find us</h4>
        <p>
          The Walk Leaders will be carrying orange flags
        </p>
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
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCAN9glhycnT_BKO557Zm2ncVDFPImMxdY&sensor=false"></script>
  <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
  <script src="/js/lib/js-url.min.js"></script>
  <script src="/js/lib/jquery.cookie.js"></script>
  <script src="/js/lib/jquery.flexslider-min.js"></script>
  <script src="/js/lib/wysihtml5-0.3.0.min.js"></script>
  <script src="/js/lib/bootstrap-datepicker.js"></script>
  <script src="/js/lib/spin.min.js"></script>
  <script src="/js/lib/bootstrap-wysihtml5.js"></script>
  <script src="/js/lib/jquery.calendar.js"></script>
  <script src="/js/lib/jquery.mCustomScrollbar.concat.min.js"></script>
  <script src="/js/lib/Eventbrite.jquery.js"></script>  
  
  
  <script>

    // Location Information

    var locations = [
      ['Lobby of the Marriott Downtown Eaton Centre Hotel', '525 Bay Street', 43.65461478342304,-79.38297986984259, 0],
      ['Old City Hall', 'Discuss the history of Toronto\'s feelings about Old City Hall, its multiple uses and limits as a public gathering point.', 43.652169557153265,-79.38223958015448, 1],
       ['Nathan Phillips Square', 'Learn about the history of plans to replace of Old City Hall and eventual plans for New City Hall and Nathan Phillips Square', 43.6523170498133,-79.38289403915405, 2],
      ['Old Chinatown', 'Explore how redevelopment changes neighbourhoods and the displacement of old Chinatown due to new City Hall and Nathan Phillips Square.', 43.65480108229511,-79.38586592674255, 3],
      ['Trinity Square', 'Examine the poverty and living conditions of residents of "The Ward", how the church came to be built and how the area has always been a retail hub.', 43.654226658916606,-79.38191771507263, 4],
      ['Eaton Centre', 'Engage in the history of this building and discuss interior public space.', 43.65472345783528,-79.3807482719422, 5],
      ['Dundas Square', 'Discuss urban renewal as it relates to this square and how public gathering spaces can be both designed and impromptu. Also consider the use of private land for public use.', 43.65615173183301,-79.38010454177856, 6],   
    ];

    // Drawing Polyline

    var walkPathCoordinates = [
      new google.maps.LatLng(43.65461478342304,-79.38297986984259),
      new google.maps.LatLng(43.65457597108526,-79.38315153121948),
      new google.maps.LatLng(43.652169557153265,-79.38223958015448),
      new google.maps.LatLng(43.65210745487224,-79.3826043605805),
      new google.maps.LatLng(43.65240244013514,-79.3827760219574),
      new google.maps.LatLng(43.652371389123076,-79.38414931297308),
      new google.maps.LatLng(43.652852678006106,-79.38498616218573),
      new google.maps.LatLng(43.6538618195933,-79.38549041748053),
      new google.maps.LatLng(43.655165915912036,-79.38606977462774),
      new google.maps.LatLng(43.655375500179005,-79.38509345054632),
      new google.maps.LatLng(43.65408693348021,-79.3845677375794),
      new google.maps.LatLng(43.6543663840279,-79.38328027725225),
      new google.maps.LatLng(43.65439743400848,-79.38303351402288),
      new google.maps.LatLng(43.65458373355482,-79.38214302062994),
      new google.maps.LatLng(43.65442072148336,-79.38198208808905),
      new google.maps.LatLng(43.654762270077725,-79.38030838966375),
      new google.maps.LatLng(43.65569375637074,-79.38071608543402),
      new google.maps.LatLng(43.65603529772455,-79.3802976608277)
    ];

    // Map Centering

    var mapCenter = new google.maps.LatLng(43.654335, -79.386263);
    
    var EventBriteEmail = "jasmine.frolick@janeswalk.net";
    
  </script>

<?php $this->inc('elements/footer.php');  ?>
