<?php    

defined('C5_EXECUTE') or die("Access Denied.");


/* 
	you can override system layouts here  - but we're not going to by default 
	
	For example: if you would like to theme your login page with the Green Salad theme,
	you would uncomment the lines below and change the second argument of setThemeByPath 
	to be the handle of the the Green Salad theme "greensalad" 

*/

$v = View::getInstance();

$v->setThemeByPath('/login', "janeswalk");
$v->setThemeByPath('/page_forbidden', "janeswalk");
$v->setThemeByPath('/register', "janeswalk");
$v->setThemeByPath('/profile', "janeswalk");

Loader::db()->execute('SET GLOBAL sql_mode = \'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION\'');
