<?php 
defined('C5_EXECUTE') or die(_("Access Denied."));
$nh = Loader::helper('navigation');
$dh = Loader::helper('concrete/dashboard');
global $u; global $cp;
?>
<?php $this->inc('elements/header.php');  ?>

<body class="home <?php echo ($dh->canRead()) ? "logged_in" : ""; ?>">
  <?php $this->inc('elements/navbar.php');  ?>
  <div class="container-outter" role="main">
  <div class="intro full">

  <div class="callouts">
    <blockquote class="homepage-callout2 tk-museo-slab">
      <?php $a = new Area('Intro'); $a->display($c); ?>
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
      <div class="linkbox">
        <a href="<?php echo $this->url('/city-organizer-onboarding') ?>">[+] Add Your City</a>
      </div>
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
          <img src="<?php echo $this->getThemePath() ?>/images/holder_feat.png" alt="">
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
          <img src="<?php echo $this->getThemePath() ?>/images/holder_YR.png" alt="">
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
          <img src="<?php echo $this->getThemePath() ?>/images/holder.png" alt="">
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
  <?php $a = new Area('Blog'); $a->display($c); ?>
</div>

</div>
</div>
  
</div>
<?php $this->inc('elements/footer.php');  ?>
