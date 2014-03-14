<?php  

/**
 * @author Nicola Moretti - info@nicolamoretti.com
 */
defined('C5_EXECUTE') or die(_("Access Denied."));

class SocialLoginBlockController extends BlockController {

	public $pkg = 'social_login';
	protected $btInterfaceWidth = "500";
	protected $btInterfaceHeight = "350";
	protected $btTable='btSocialLogin';
	protected $btCacheBlockRecord = false;
	protected $btCacheBlockOutput = false;
	protected $btCacheBlockOutputOnPost = false;
	protected $btCacheBlockOutputForRegisteredUsers = false;
	protected $btCacheBlockOutputLifetime = 0;
	
	public $owner_id;

	private $config;

	private $session;


	public function getBlockTypeDescription() {
		return t("Enable Multiple Social Login");
	}

	public function getBlockTypeName() {
		return t("Social Login");
	}

	public function getJavaScriptStrings() {
		return array();
	}

	/**
	 * Load some needed models and configuration
	 */
	private function initalize(){
		Loader::model('user');
		Loader::model('userinfo');
		Loader::model('user_list');

		$this->config = new Config();
		$pkg = Package::getByHandle("social_login");
		$this->config->setPackageObject($pkg);

	}

	public function view() {
		$this->initalize();
		$u=new User();

		Loader::model('social_login','social_login');

		//Check association or disassociation form a provider
		if(isset($_GET['provider'])){
			if(isset($_GET['disassociate']))
			{
				$provider = $_GET["provider"];
				SocialLoginModel::disassociate($provider);
			}
			else
			{
				SocialLoginModel::performLogin($this);
			}
		}


		//Check active providers to show links in view
		$av=SocialLoginModel::getStructuredAvailable();
		$providers=array();
		foreach($av as $provider){
			if(SocialLoginModel::providerEnabled($provider['providerID'])){
				$providers[]=$provider;
			}
		}
		$this->set('active_providers',$providers);


	}

	/**
	 * Perform logout (c5 + providers)
	 */
	public function action_logout(){
		Loader::model('social_login','social_login');
		$this->logout_c5();
		SocialLoginModel::performLogout();
		header('Location: '.BASE_URL.'/'.DIR_REL);
	}

	/**
	 * Perform C5 logout
	 */
	private function logout_c5(){
		$this->initalize();

		$u=new User();
		if($u->isLoggedIn()){
			$u->logout();
		}
	}



}
