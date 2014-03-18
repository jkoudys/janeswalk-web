<?php
$c = Page::getCurrentPage();
$u = new User();
$ui = UserInfo::getByID($u->getUserID());
?>

<header class="navbar navbar-fixed-top <?= $c->isEditMode() ? 'edit' : '' ?> <?= $_REQUEST['query'] ? 'dropped' : ''?>">
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
        <?php (new GlobalArea('Left Header'))->display($c); ?>  
      </nav>
      <ul class="nav pull-right visible-desktop">
        <li>
          <a class="search-open"><i class="icon-search"></i></a>
          <a class="search-close"><i class="icon-search"></i></a>
        </li>
        <?php
          if($u->isRegistered()) {
        ?>
          <li><a href="<?= ($this->url('/profile')) ?>" class=""><?= ($ui->getAttribute('first_name') ? : $u->getUserName()) ?></a></li>
          <li><a href="<?= ($this->url('/login', 'logout')) ?>" class="">Logout</a></li>
        <?php
          } else {
        ?>
          <li><a href="<?= ($this->url('/register')) ?>" class="">Join</a></li>
          <li><a href="<?= ($this->url('/login')) ?>" class="">Log in</a></li>
        <?php
          }
        ?>
        <li class="divider-vertical"></li>
        <li>
          <a href="<?= Loader::helper('navigation')->getLinkToCollection(Page::getByPath('/donate')) ?>" id="donate" class="btn btn-primary btn-large donate">Donate</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="navbar-outer">
    <?php (new GlobalArea('Dropdown'))->display($c); ?>  
  </div>
</header>

