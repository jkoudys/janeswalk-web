<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$nh = Loader::helper('navigation');
?>
<!DOCTYPE html>
<?php $this->inc('elements/header.php');  ?>
<html class="js flexbox canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths wf-myriadpro-i4-active wf-myriadpro-i7-active wf-myriadpro-n4-active wf-myriadpro-n7-active wf-museoslab-i3-active wf-museoslab-i7-active wf-museoslab-n1-active wf-museoslab-n3-active wf-museoslab-n7-active wf-active" style=""><!--<![endif]--><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <title>Jane's Walk, May 4th and 5th</title>
  <meta name="description" content="Jane’s Walk celebrates the ideas and legacy of urbanist Jane Jacobs by getting people out exploring their neighbourhoods through local-led walking tours.">
  <meta name="viewport" content="width=1024">
  <link rel="stylesheet" href="<?php echo $this->getThemePath()?>/index_files/screen.css">
  <script src="./index_files/analytics.js" style=""></script><script src="./index_files/modernizr-2.6.2.min.js"></script>
<style type="text/css">.tk-museo-slab{font-family:"museo-slab",serif;}.tk-myriad-pro{font-family:"myriad-pro",sans-serif;}</style><link rel="stylesheet" href="http://use.typekit.net/c/e25cc9/museo-slab:i3:i7:n1:n3:n7,myriad-pro:i4:i7:n4:n7.SLT:J:2,QL2:J:2,QL7:J:2,SKB:J:2,VnC:J:2,Xc8:J:2,Xc3:J:2,XcH:J:2,Xc0:J:2/d?3bb2a6e53c9684ffdc9a9bf3135b2a620dfa8c0796a4cb9faa266ad1c0aab20e8bd43258915e59d2ad385a7b4162e36eb54c0d909a598fa08f2d3d3d1a391528d61fd3179dd48fbe794dcc4afe76d9855091c8f205aa4413776649aeab1bc9eb8bc4416261aa7d2fa5fa19c73c148653947ce732994d478fdb019b5033083526c0a1700aa8a527ff8da82a33f587cde3251a4153b15394ae9cb839001c947a"><style type="text/css"></style><script type="text/javascript" charset="UTF-8" src="./index_files/{common,util,stats}.js"></script></head>

<body class="home">
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
  <div class="intro full">

  <div class="callouts">
    <blockquote class="homepage-callout2 tk-museo-slab">
      <p>Jane’s Walk celebrates the ideas and legacy of urbanist Jane Jacobs by getting people out exploring their neighbourhoods through locally led walking tours.</p>
    </blockquote> 

    <div class="navbar_home">
      <form class="input-append" action="http://janeswalk.tv/toronto.html" method="get" autocomplete="off">
        <select class="span3 large" name="URL" onchange="window.location.href=this.form.URL.options[this.form.URL.selectedIndex].value">
          <option selected="selected">Select a City</option>
          <?php
          Loader::model('page_list'); 
          $cities = new PageList();
          $cities->filterByCollectionTypeHandle('city');
          foreach($cities->get() as $city) {
          ?>
            <option value="<?php echo $nh->getCollectionURL($city)?>"><?php echo $city->getCollectionName() ?></option>
          <? } ?>
        </select> 
      </form>
    </div>
  </div>

</div>
<!-- end of .intro -->

<div class="section2">
  
<div class="row-fluid row1">

  <ul class="nav nav-tabs types tk-museo-slab box-sizing">
    <li class=""><a href="#festival" data-toggle="tab">Festival Weekend</a></li>
    <li class="active"><a href="#YearRoundWalks" data-toggle="tab">YearRound Walks</a></li>
    <li class=""><a href="#place-based-storytelling" data-toggle="tab">Walk Stories</a></li>
  </ul>


<div class="tab-content box-sizing">
    <div id="festival" class="tab-pane thumbnail">
      <div class="festivalblock  clearfix">
        <div class="row-fluid">
          <div class="festivalcontent span6 pull-left">
          <h3 class="tk-museo-slab">Festival Weekend: <br>May 4th and 5th!</h3>
          <p>Every year we hold a festival where people from all walks of life, in every corner of the world, offer free and open tours of where they live, inviting friends and the wider community to join them in a discussion of what works and what doesn't about the city around them. The walks celebrate the life and legacy of Jane Jacobs, a woman whose writing changed the way our cities are planned by making a case for all of us to "get out and walk"-- seeing lofty city plans from the perspective of our sidewalks. Today, the walks happen in over 100 cities, from Calgary to Calcutta, Sydney to Saskatoon.</p>
        </div>
        <div class="festivalimg span6 pull-right">
          <img src="<?php echo $this->getThemePath() ?>/index_files/holder_feat.png" alt="">
        </div>

        </div>
      </div>
    </div>

    <div id="YearRoundWalks" class="tab-pane thumbnail active">
      <div class="festivalblock clearfix">
        <div class="row-fluid">
          <div class="festivalcontent span6 pull-left">
          <h3 class="tk-museo-slab">YearRound Walks</h3>
          <p>Jane’s Walk can now be enjoyed outside of the festival weekend in May at anytime throughout the year.  If you savour the Jane’s Walk format of a walking conversation, community voices, and the opportunity to learn about new and often overlooked places within a city, the Jane’s Walk YearRound program is for you.  The online booking system can be used to register for select Jane’s Walks or request walks of specific subject or place within the city.  Enjoy the special experience of Jane’s Walk with visitors, your conference, group, or simply your own desire to learn more about your city.</p>
        </div>
        <div class="festivalimg span6 pull-right">
          <img src="<?php echo $this->getThemePath() ?>/index_files/holder_YR.png" alt="">
        </div>
        </div>
      </div>
    </div>

    <div id="place-based-storytelling" class="tab-pane thumbnail">
      <div class="festivalblock clearfix">
        <div class="row-fluid">
          <div class="festivalcontent span6 pull-left">
          <h3 class="tk-museo-slab">Walk Stories</h3>
          <p>Do you have a walk that you would like to share with friends, family or would like to organize a walk for others? The Jane’s Walk – “Walk Stories” online tool allows you to easily create and share a walk story.  Build your own map with places of interest, a route through a neighbourhood or area of the city, and stories about these places.  Encourage others to “get out and walk” to enjoy and learn about the city.  Share through a web browser on your desktop or smartphone or publish for others to view.</p>
        </div>
        <div class="festivalimg span6 pull-right">
          <img src="<?php echo $this->getThemePath() ?>/index_files/holder.png" alt="">
        </div>
        </div>
      </div>
    </div>

</div>
  </div>
</div>


<div class="section3 blog full">
<div class="container">
  <div class="blogtitle">
    <h3>Blog</h3>
  </div>


<div class="row-fluid row2">
      <div class="span3">
        <div class="thumbnail">
          <img src="<?php echo $this->getThemePath() ?>/index_files/blogpost1.jpg" alt="">
          <div class="caption">
            <h5><a href="./index_files/index.html" class="notify">Weekend Retrospective: Hear one Jane’s Walker’s reflections on a walk well talked</a></h5> 
            <h6>Posted by Annie Webber on May 10, 2013</h6>
            <p>
               Carmen Lazarus fills us in on David Teitel’s walk through the Toronto, Ontario neighbourhood where he spent his childhood, shunning the area as a young adult and returning to in 2004<a href="./index_files/index.html" class="notify">[...]</a>
            </p>
          </div>
        </div>
      </div>
      <div class="span3">
        <div class="thumbnail">
          <img src="<?php echo $this->getThemePath() ?>/index_files/blogpost2.jpg" alt="">
          <div class="caption">
            <h5><a href="./index_files/index.html" class="notify">Usha Uthup sets Jane's Walk Calcutta off to a rollicking start!</a></h5>
            <h6>Posted by Iftekhar Ahsan on May 03, 2013</h6>
            <p>
              Fellow Calcutta Lovers,</p>  

            <p>Thanks to Usha Uthup and all the others who joined in to romance Park Street with us this morning on the occasion of the beginning of the first Jane's Walk in India. Calcutta has always shown the way and we hope that this walking festival is taken up in other cities of India as well.<a href="./index_files/index.html" class="notify">[...]</a>
            </p>
          </div>
        </div>
      </div>

      <div class="span3">
        <div class="thumbnail">
          <img src="<?php echo $this->getThemePath() ?>/index_files/blogpost3.jpg" alt="">
          <div class="caption">
            <h5><a href="./index_files/index.html" class="notify">Jane's Walks... Dark Age Delayed?</a></h5>
            <h6>Posted by HiMYSYeD on May 01, 2013</h6>
            <p>
             This was a puzzling realization which haunted me after I completed leading the final of several Jane's Walks last year:</p>

              <p>Dark Age Ahead - The Wizard of Ossington Jane's Walk<a href="./index_files/index.html" class="notify">[...]</a>
            </p>
          </div>
        </div>
      </div>

        <div class="span3">
          <div class="thumbnail">
            <div class="caption">
              <h3>Get Involved</h3>
              <p>
                You are an insatiable explorer with loads of heart, and we really want to talk to you! Jane's Walk is looking for volunteers to join what's been called an "extravaganza of pedestrian urban love." Get involved and find out first-hand what all the fuss is about.
              </p>
              <button class="btn btn-primary notify">
                Get Involved
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
  </div>
  
  </div>
<?php $this->inc('elements/footer.php');  ?>
