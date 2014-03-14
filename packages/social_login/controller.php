<?php  
defined('C5_EXECUTE') or die(_("Access Denied."));

/**
 * Concrete5 Package "Social Login"
 * @author hanicker "Nicola Moretti" http://nicolamoretti.com
 */
class SocialLoginPackage extends Package {

	protected $pkgHandle = 'social_login';
	protected $appVersionRequired = '5.3.0';
	protected $pkgVersion = '1.2';

	public function getPackageDescription() {
		return t("Enables login with facebook, twitter, google, linkedin and many other providers");
	}

	public function getPackageName() {
		return t("Social Login");
	}
	
	public function getPackageHandle(){
		return 'social_login';
	}

	public function on_start() {
		if(isset($_GET['provider'])){

			$html = Loader::helper("html");

			$view = View::getInstance();

			$view->addHeaderItem($html->javascript("jquery.js"));

			$view->addHeaderItem($html->css("jquery.ui.css"));

			$view->addHeaderItem($html->javascript("jquery.ui.js"));
		}

	}		
	
	public function upgrade() {
		parent::upgrade();
		$pkg= Package::getByHandle($this->pkgHandle);

	}

	public function install() {
		$pkg = parent::install();
		Loader::model('single_page');
		Loader::model('attribute/categories/collection');

		// Add admin pages
		Loader::model('single_page');
		$d1 = SinglePage::add('/dashboard/social_login/', $pkg);
		$d1->update(array('cName' => $this->getPackageName(), 'cDescription' =>
		$this->getPackageDescription()));

		// Install blocks
		BlockType::installBlockTypeFromPackage('social_login', $pkg);

		// Install attributes
		Loader::model('attribute/categories/user');
		$ct = AttributeType::add('social_oauth', t('Social OAuth'), $pkg);
		$atext = AttributeType::getByHandle('social_oauth');
		UserAttributeKey::add($atext, array('akHandle' => 'oauth_auths', 'akName' => t('OAuth Authentications'),
		'akIsSearchable' => false, 'uakProfileEdit' => false, 'uakRegisterEdit' => false), $pkg);
		
		// Set default config
		$co = new Config();
		$co->setPackageObject($pkg);
		$co->save('sociallogin_subscribeemailsubject', t('Subscribed to ').SITE);
		$co->save('sociallogin_subscribeemailtext', t('Thanks for subscribing. Your username is %username% and your password is %password%.'));
		$co->save('sociallogin_requireemail', '1');
		$co->save('sociallogin_requireemailconfirm', '0');
		$co->save('sociallogin_nodoubleemail', '1');
		$co->save('sociallogin_nodoubleemailtext', 'Your email is already present in our system. You can <a href="%linkpasswordrecovery%">click here</a> to recover you password.');
	}
}