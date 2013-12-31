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
        <a href="<?= $this->url('') ?>">
          <div class="brand hide-text box-sizing">
            <?=$SITE?>
          </div>
        </a>
        <nav class="nav-collapse collapse" role="navigation">
          <?php
          $ah = new GlobalArea('Left Header');
          $ah->display($c);                   
          ?>  
        </nav>
        <ul class="nav pull-right visible-desktop">
          <?php if($u->isRegistered()) { ?>
            <li><a href="<?=$this->url('/profile') ?>" class=""><?=$u->getUserName(); ?></a></li>
            <li><a href="<?=$this->url('/login', 'logout') ?>" class="">Logout</a></li>
          <?php } else { ?>
            <li><a href="<?=$this->url('/login') ?>" class="">Login</a></li>
          <?php } ?>

          <li class="divider-vertical"></li>
          <li>
            <a href="https://www.gifttool.com/donations/Donate?ID=1830&AID=2738" id="donate" class="btn btn-primary btn-large donate">Donate</a>
          </li>
        </ul>
      </div>
    </div>
  </header>

