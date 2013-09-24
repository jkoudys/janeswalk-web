<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$im = Loader::helper('image');
$fullbg = $c->getAttribute("full_bg");
$th = Loader::helper('theme');
?>
<!DOCTYPE html>
<html class="js flexbox canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths wf-museoslab-i3-active wf-museoslab-i7-active wf-museoslab-n1-active wf-museoslab-n3-active wf-museoslab-n7-active wf-myriadpro-i4-active wf-myriadpro-i7-active wf-myriadpro-n4-active wf-myriadpro-n7-active wf-active" style=""><!--<![endif]-->
<?php $this->inc('elements/header.php');  ?>
<body class="city-page" <?php if(is_object($fullbg)) {  echo "style='background-image:url(" . $fullbg->getURL() . ")'"; } ?>>
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
    
<div class="intro-city tk-museo-slab">
  <div class="container">
    <div class="city-header">
      <h1>Toronto Walks</h1>
      <p>
        </p><p>Toronto is a city of neighbourhoods and areas with a diverse cultural mix.  There were over <strong>150 walks</strong> during the past festival weekend, and a select set of walks are now available throughout the year.</p>
        </div>
      </div>
    </div>
  </div>


<div class="section3 city-city">
  <div class="container">
  
<div class="row-fluid walk-select">
  <div class="span4 action-items">
    <div class="item active">
      
      <h2>Jane’s Walks</h2>
      <h4>Get out and walk! Explore, learn <br>and share through a Jane’s Walk <br>in Toronto</h4>
      <p>
        Jane’s Walk is a walking conversation that includes community voices and the opportunity to learn about new and often overlooked places within a city.</p>

        <p>Select a walk and make an booking online.   While available dates are displayed for each walk, you can also request a specific date and time. We can even organize a walk specific to your group, for a particular area of the city, or subject of interest.</p>

    </div>
    <div class="item get-involved box-sizing">
      <div class="top clearfix">
        <a href="./city_files/city.html" class="btn btn-primary btn-large notify">Get Involved</a>
        <a href="http://janeswalk.tv/new.html" class="btn btn-primary btn-large">Submit a Walk</a>
      </div>
      <div class="below">
        <a href="http://janeswalk.tv/custom.html" class="btn btn-primary btn-large">Request a Custom Walk</a>
      </div>
    </div>
  </div>
  <div class="span8 walks-list">
    <h3>Featured Walks</h3>
    <a href="./city_files/city.html" class="btn btn-primary btn-large see-all notify"><i class="icon-th"></i> See All Walks</a>
    <div class="row-fluid">
    <?php
        Loader::model('page_list');
        $nh = Loader::helper('navigation');
        $u = new User();
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle("walk");
        foreach($pl->get(3) as $page) {  ?>
        <div class="span4 walk">
          <a href="<?php echo $nh->getCollectionURL($page) ?>">
          <div class="thumbnail">
            <?php if(false) { // placeholder for thumbnail - show if one exists ?>
              <img src="./city_files/be-square-sm.jpg" alt="">
            <?php } ?>
            <div class="caption">
              <h4><?php echo $page->getCollectionName() ?></h4>
              <h6><?php if(false) { echo "Walk led by Jason Kucherawy, Janet Langdon, and Howard Tam"; } // formatted walk leaders name ?></h6>
              <p>
                <?php echo $page->getAttribute('shortdescription') ?>
              </p>
            </div>
            <ul class="inline tags">
              <?php foreach($page->getAttribute("theme") as $theme) { ?>
                <li class="tag" data-toggle="tooltip" title="<?php echo $th->getName($theme); ?>"><?php echo $th->getIcon($theme); ?></li>
              <?php } ?>
            </ul>
          </div>
          </a>
        </div>
        <?php } ?>
    </div>
  </div>
</div>

</div>

</div>

<div class="intro-city lower blog">
	<div class="container">
      <h2 class="title"><a href="./city_files/city.html" class="notify">City Blog</a></h2>
		  <div class="row-fluid">
      <div class="span6">
        <div class="thumbnail">
          <div class="row-fluid">
          <div class="span5">
              <img src="<?php echo $this->getThemePath() ?>/city_files/blogpost4.jpg" alt="">
          </div>
          <div class="span7">
            <div class="caption">
              <a href="<?php echo $this->getThemePath() ?>/city_files/city.html"><h4>Share your Jane’s Walk Photos with the World!</h4> </a>
              <h6>Posted by msfrolick on May 03, 2013</h6>
                <p>
                Would you be interested in sharing your photos taken during Jane’s Walk with the world?</p>
                <p>If so, we’d love to feature them on our website, blog, Facebook page, Twitter, or Flickr page seen by people in over 80 international cities<a href="./city_files/city.html" class="notify">[...]</a> 
              </p> 
            </div>
          </div>
        </div>
         
        </div>

      </div>
      <div class="span6">
        <div class="thumbnail">
          <div class="row-fluid">
          <div class="span5">
              <img src="<?php echo $this->getThemePath() ?>/city_files/blogpost5.jpg" alt="">
          </div>
          <div class="span7">
            <div class="caption">
              <a href="./city_files/city.html"><h4>Getting Crafty</h4></a>
              <h6>Posted by Laura Hache on April 25, 2013</h6>
              <p>
                Jane's Walk weekend is less than two weeks away and our interns and volunteers are hard at work prepping to make this years walks the best yet. Here’s an inside look at our DIY button and flag making session!<a href="./city_files/city.html" class="notify">[...]</a>
              </p>
            </div>
          </div>
        </div>
         
        </div>
        
      </div>

   </div>

	</div>
</div>


<div class="notification festival-weekend">
  <div class="container">
    <div class="row-fluid">
      <h2 class="title">Festival Weekend will take place May 2-4th, 2014.</h2>
      <h4>Start thinking now about leading a walk and check back in 2014 for updates!</h4>
      <i class="close icon-remove icon-large"></i>
    </div>
    <i class="close icon-remove icon-large"></i>
  </div>
</div>
  
  <script src="<?php echo $this->getThemePath() ?>/city_files/js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/infobox.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/js-url.min.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/jquery.cookie.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/jquery.flexslider-min.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/wysihtml5-0.3.0.min.js"></script>


  <script src="<?php echo $this->getThemePath() ?>/city_files/bootstrap-datepicker.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/spin.min.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/bootstrap-wysihtml5.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/jquery.calendar.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/jquery.mCustomScrollbar.concat.min.js"></script>
  <script src="<?php echo $this->getThemePath() ?>/city_files/Eventbrite.jquery.js"></script>  

<?php $this->inc('elements/footer.php');  ?>
