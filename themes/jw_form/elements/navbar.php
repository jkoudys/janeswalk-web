<?php
$c = Page::getCurrentPage();
$u = new User();
?>

<header class="navbar navbar-fixed-top tk-museo-slab">
    <div class="navbar-inner">
      <div class="container">
        <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="<?php echo DIR_REL ?>">
          <div class="brand hide-text box-sizing">
            <?php echo $SITE ?>
          </div>
        </a>
        <nav class="nav-collapse collapse" role="navigation">
          <?                  
          $ah = new GlobalArea('Header');
          $ah->display($c);                   
          ?>  
          <ul class="nav">
            <li><a href="#" class="notify">About</a></li>
            <li><a href="#" class="notify">Walkability</a></li>
            <li><a href="#" class="notify">Walk Blog</a></li>
            <li><a href="#" class="notify">Team</a></li>
          </ul>
        </nav>
        <ul class="nav pull-right visible-desktop">
          <?php if($u->isRegistered()) { ?>
            <li><a href="<?php echo $this->url('/profile') ?>" class=""><?php echo $u->getUserName(); ?></a></li>
            <li><a href="<?php echo $this->url('/login', 'logout') ?>" class="">Logout</a></li>
          <?php } else { ?>
            <li><a href="<?php echo $this->url('/login') ?>" class="">Log in</a></li>
          <?php } ?>

          <li class="divider-vertical"></li>
          <li>
            <a href="https://www.gifttool.com/donations/Donate?ID=1830&AID=1994" id="donate" class="btn btn-primary btn-large donate">Donate</a>
          </li>
        </ul>
      </div>
    </div>
    <!--Blog Message!-->
<div class="notification coming-soon">
  <div class="container">
    <h2 class="title-sub">Glad you're poking around! We're still working on this section.</h2>
    <i class="close icon-remove icon-large"></i>
  </div>
</div>

<!--General Notification!-->
<div class="notification walk-beta">
  <div class="container">
    <h2 class="title-sub">Glad you're poking around! We're still working on this section.</h2>
    <i class="close icon-remove icon-large"></i>
  </div>
</div>

<!--General Notification!-->
<div class="notification custom-form">
  <div class="container">
    <h2 class="title-sub">This feature isn't live yet, but we're thrilled that you're interested in custom walks.</h2>
    <i class="close icon-remove icon-large"></i>
  </div>
</div>
  </header>

