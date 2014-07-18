<?php
$c = Page::getCurrentPage();
$u = new User();
$ui = UserInfo::getByID($u->getUserID());

/* Build menu options depending if currently logged in or not */
if ($u->isRegistered()) {
  $profileMenu = '<li><a href="' . ($this->url('/profile')) . '" class="">' . ($ui->getAttribute('first_name') ? : $u->getUserName()) . '</a></li>'
    . '<li><a href="' . ($this->url('/login', 'logout')) . '" class="">' . t('Logout') . '</a></li>';
} else {
  $profileMenu = '<li><a href="' . ($this->url('/register')) . '" class="">' . tc('Register on a website', 'Join') . '</a></li>'
    . '<li><a href="' . ($this->url('/login')) . '" class="">' . t('Log in') . '</a></li>';
}

?>
<header class="navbar navbar-fixed-top <?= $c->isEditMode() ? 'edit' : '' ?> <?= $_REQUEST['query'] ? 'dropped' : ''?>">
  <div class="container">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
      <i class="fa fa-bars"></i>
    </button>
    <a href="<?= $this->url('') ?>">
      <span class="navbar-brand hide-text logo">
        <?=$SITE?>
      </span>
    </a>
    <nav class="navbar-collapse collapse" role="navigation">
      <?php (new GlobalArea('Left Header'))->display($c); ?>
      <ul class="nav navbar-nav col-md-pull-12">
        <li>
          <a class="search-open"><i class="fa fa-search"></i></a>
          <a class="search-close"><i class="fa fa-search"></i></a>
        </li>
        <?= $profileMenu ?>
        <li>
          <a href="<?= Loader::helper('navigation')->getLinkToCollection(Page::getByPath('/donate')) ?>" id="donate" class="btn btn-primary btn-large donate">Donate</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="navbar-outer">
    <?php (new GlobalArea('Dropdown'))->display($c); ?>
  </div>
</header>
