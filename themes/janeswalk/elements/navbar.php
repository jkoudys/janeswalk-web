<?php
$c = Page::getCurrentPage();
$u = new User();
$ui = UserInfo::getByID($u->getUserID());

// Array of various states the page can be in
$pageState = [];
if ($c->isEditMode()) $pageState[] = 'edit';
if ($_REQUEST['query']) $pageState[] = 'dropped';

/* Build menu options depending if currently logged in or not */
if ($u->isRegistered()) {
  $profileMenu = '<li><a href="' . ($this->url('/profile')) . '">' . ($ui->getAttribute('first_name') ? : $u->getUserName()) . '</a></li>'
    . '<li><a href="' . ($this->url('/login', 'logout')) . '">' . t('Logout') . '</a></li>';
} else {
  $profileMenu = '<li><a href="' . ($this->url('/register')) . '">' . tc('Register on a website', 'Join') . '</a></li>'
    . '<li><a onclick="$(\'#login\').modal()">' . t('Log in') . '</a></li>';
}

?>
<header class="<?= join($pageState, ' ') ?>">
  <nav role="navigation">
    <a href="<?= $this->url('') ?>" class="logo">
      <span><?= $SITE ?></span>
    </a>
    <?php (new GlobalArea('Left Header'))->display($c); ?>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <a class="search-open"><i class="fa fa-search"></i></a>
        <a class="search-close"><i class="fa fa-search"></i></a>
      </li>
      <?= $profileMenu ?>
      <li>
        <a href="<?= Loader::helper('navigation')->getLinkToCollection(Page::getByPath('/donate')) ?>" id="donate">Donate</a>
      </li>
    </ul>
  </nav>
  <div class="navbar-outer">
    <?php (new GlobalArea('Dropdown'))->display($c); ?>
  </div>
</header>
