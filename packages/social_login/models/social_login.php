<?php  
defined('C5_EXECUTE') or die("Access Denied.");

class SocialLoginModel extends Model  {
	/**
	 * Retrieve provider settings
	 * @return HibrydAuth valid Configuration
	 */
	private static $debug_mode=false;
	static function getHybridAuthConfiguration(){
		//Check enabled
		$config = new Config();
		$pkg = Package::getByHandle('social_login');
		$config->setPackageObject($pkg);
		$urls=Loader::helper('concrete/urls');
		$ret=array(
			"base_url" => BASE_URL.$urls->getToolsURL('auth','social_login'),
			'providers' => array(),
			'debug_mode'=> SocialLoginModel::$debug_mode,
			'debug_file'=> DIR_FILES_UPLOADED_STANDARD.'/social_login_debug.txt',
		);
		if($ret['debug_mode'])
			touch($ret['debug_file']);
			
		$av=SocialLoginModel::getStructuredAvailable();
		foreach($av as $provider){
			if($config->get('provider_'.$provider['providerID'].'_enabled')){
				$ret['providers'][$provider['providerID']]=array(
					'enabled'=>true,
				);
				if(count($provider['required'])!=0){
					$ret['providers'][$provider['providerID']]['keys']=array();
					foreach($provider['required'] as $req){
						$ret['providers'][$provider['providerID']]['keys'][$req['id']]=$config->get('provider_'.$provider['providerID'].'_keys_'.$req['id']);
					}
				}
			}
			if($provider['providerID']=='Google'){ 
				$ret['providers'][$provider['providerID']]['scope']='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.google.com/m8/feeds/';//Added for social_inviter..Comment if problematic
			}
			/*if($provider['providerID']=='Facebook'){ 
				$ret['providers'][$provider['providerID']]['scope']='email, user_about_me, user_birthday, user_hometown, user_website, offline_access, read_stream, publish_stream, read_friendlists, read_mailbox';//Added for social_inviter..Comment if problematic
			}*/
		}
		return $ret;
	}
	/**
	 * Check if provider has been enabled
	 * @param unknown_type $providerID
	 * @return boolean
	 */
	static function providerEnabled($providerID){
		$config = new Config();
		$pkg = Package::getByHandle('social_login');
		$config->setPackageObject($pkg);
		return $config->get('provider_'.$providerID.'_enabled')==1;
	}
	/**
	 * Get information about a provider
	 * @param providerID
	 * @return provide information
	 */
	static function getProvider($providerID){
		$av=SocialLoginModel::getStructuredAvailable();
		foreach($av as $provider){
			if($provider['providerID']==$providerID)
			return $provider;
		}
	}
	/**
	 * Structure containing info about providers and their required information
	 * @return Information about alla available providers
	 */
	static function getStructuredAvailable(){
		$urls=Loader::helper('concrete/urls');
		return array(
		array(
				'providerID'=>'Google',
				'providerName'=>'Google',
				'required'=>array(
		array(
						'id'=>'id',
						'name'=>'App ID',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Google.html',
				'helpd'=>'
				<p>Callback url: <b>'.BASE_URL.$urls->getToolsURL('auth','social_login').'?hauth.done=Google'.'<b/></p>
				',						
		),
		array(
				'providerID'=>'Yahoo',
				'providerName'=>'Yahoo',
				'required'=>array(),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Yahoo.html',
		),
		array(
				'providerID'=>'AOL',
				'providerName'=>'AOL',
				'required'=>array(),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_AOL.html',
		),
		array(
				'providerID'=>'Facebook',
				'providerName'=>'Facebook',
				'required'=>array(
		array(
						'id'=>'id',
						'name'=>'App ID',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Facebook.html',
		),
		array(
				'providerID'=>'MySpace',
				'providerName'=>'MySpace',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'Consumer Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Consumer Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_MySpace.html',
		),
		array(
				'providerID'=>'Twitter',
				'providerName'=>'Twitter',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'Consumer Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Consumer Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Twitter.html',
				'helpd'=>'
				<p>Callback url: <b>'.BASE_URL.$urls->getToolsURL('auth','social_login').'?hauth.done=Twitter'.'</b></p>
				<p>Please set your application type to "Read, Write and Access direct messages" in Settings Tab.</p>
				',				
		),
		array(
				'providerID'=>'Live',
				'providerName'=>'Windows Live',
				'required'=>array(
		array(
						'id'=>'id',
						'name'=>'Client ID',
		),
		array(
						'id'=>'secret',
						'name'=>'Client Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Live.html',
		),
		array(
				'providerID'=>'LinkedIn',
				'providerName'=>'LinkedIn',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'App ID',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_LinkedIn.html',
		),
		array(
				'providerID'=>'Viadeo',
				'providerName'=>'Viadeo',
				'required'=>array(
		array(
						'id'=>'id',
						'name'=>'App ID',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Viadeo.html',
		),
		array(
				'providerID'=>'Tumblr',
				'providerName'=>'Tumblr',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'Consumer',
		),
		array(
						'id'=>'secret',
						'name'=>'Secret Key',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Tumblr.html',
				'helpd'=>'
				<p>Callback url: <b>'.BASE_URL.$urls->getToolsURL('auth','social_login').'?hauth.done=Tumblr'.'<b/></p>
				',		
		),
		array(
				'providerID'=>'Identica',
				'providerName'=>'Identica',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'App Key',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Identica.html',
		),
		array(
				'providerID'=>'Vimeo',
				'providerName'=>'Vimeo',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'Consumer Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Consumer Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Vimeo.html',
				'helpd'=>'
				<p>Callback url: <b>'.BASE_URL.$urls->getToolsURL('auth','social_login').'?hauth.done=Vimeo'.'<b/></p>
				',						
		),
		array(
				'providerID'=>'Foursquare',
				'providerName'=>'Foursquare',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'Client ID',
		),
		array(
						'id'=>'secret',
						'name'=>'Client Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Foursquare.html',
				'helpd'=>'
				<p>Callback url: <b>'.BASE_URL.$urls->getToolsURL('auth','social_login').'?hauth.done=Foursquare'.'<b/></p>
				',						
		),
		array(
				'providerID'=>'LastFM',
				'providerName'=>'LastFM',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'App ID',
		),
		array(
						'id'=>'secret',
						'name'=>'App Secret',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_LastFM.html',
		),
		array(
				'providerID'=>'Gowalla',
				'providerName'=>'Gowalla',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'API Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Secret Key',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Gowalla.html',
		),
		array(
				'providerID'=>'PayPal',
				'providerName'=>'PayPal',
				'required'=>array(					
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_PayPal.html',
		),
		array(
				'providerID'=>'QQ',
				'providerName'=>'QQ',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'API Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Secret Key',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_WW.html',
		),
		array(
				'providerID'=>'Sina',
				'providerName'=>'Sina',
				'required'=>array(
		array(
						'id'=>'key',
						'name'=>'API Key',
		),
		array(
						'id'=>'secret',
						'name'=>'Secret Key',
		),
		),
				'help'=>'http://hybridauth.sourceforge.net/userguide/IDProvider_info_Sina.html',
		),
			
		);
	}
	/**
	 * Check if Provider is Valid
	 * @param providerID
	 * @return boolean
	 */
	static function validProvider($providerid){
		return SocialLoginModel::providerEnabled($providerid);
	}
	/**
	 * Check if user is "session"-connected to provider
	 * @param providerID
	 * @return boolean
	 */
	static function isConnectedWith($providerid){
		Loader::library('hybridauth/Hybrid/Auth','social_login');
		$config = SocialLoginModel::getHybridAuthConfiguration();

		$hybridauth = new Hybrid_Auth( $config );
		return Hybrid_Auth::isConnectedWith($providerid);
	}
	/**
	 * Check if user is "attribute"-connected to provider
	 * @param providerid
	 * @return boolean
	 */
	static function isAssociatedWith($providerid){
		$u=new User();
		Loader::model('attribute/categories/user');
		$akID=UserAttributeKey::getByHandle('oauth_auths')->getAttributeKeyID();

		if($u->isLoggedIn()){
			$ui = UserInfo::getByID($u->getUserID());
			$att=$ui->getAttribute('oauth_auths');
			$attv=$att->values;
			for ($i=0;$i<count($attv);$i++){
				if($attv[$i]['providerID']==$providerid)
				return true;
			}
		}
		return false;
	}
	/**
	 * Logout from  every provider
	 */
	static function performLogout(){
		Loader::library('hybridauth/Hybrid/Auth','social_login');
		$config = SocialLoginModel::getHybridAuthConfiguration();

		$hybridauth = new Hybrid_Auth( $config );
		$hybridauth->logoutAllProviders();
	}
	/**
	 * Remove "attribute"-relation with a provider
	 * @param providerid
	 */
	static function disassociate($providerid){
		$u=new User();

		$akID=UserAttributeKey::getByHandle('oauth_auths')->getAttributeKeyID();

		if($u->isLoggedIn()){
			$ui = UserInfo::getByID($u->getUserID());
			$att=$ui->getAttribute('oauth_auths');
			$attv=$att->values;
			for ($i=0;$i<count($attv);$i++){
				if($attv[$i]['providerID']==$providerid){
					unset($attv[$i]);
					break;
				}
			}
			$ui->setAttribute('oauth_auths',$attv);
		}

	}
	/**
	 * Perform login
	 * @param BlockController about login block
	 * //TODO: remove everything unrelated to a Model, eg. $_GET
	 */
	static function performLogin($bc){
		//Get configuration
		$co = new Config();
		$pkg = Package::getByHandle("social_login");
		$co->setPackageObject($pkg);

		if( isset( $_GET["provider"] ) && $_GET["provider"] ):
		try{
			$config = SocialLoginModel::getHybridAuthConfiguration();
			Loader::library('hybridauth/Hybrid/Auth','social_login');

			$hybridauth = new Hybrid_Auth( $config );

			$provider = $_GET["provider"];
			if(!SocialLoginModel::validProvider($provider))
			return;

			$adapter = $hybridauth->authenticate( $provider );

			/* Save session
				Hybrid_Auth::getSessionData() should return a serialised array. Hybrid_Auth::restoreSessionData() should take a serialised array as parameter.
				*/

			$user_profile = $adapter->getUserProfile();

			//Check if logged in
			$u=new User();


			$akID=UserAttributeKey::getByHandle('oauth_auths')->getAttributeKeyID();

			if($u->isLoggedIn()){
				$ui = UserInfo::getByID($u->getUserID());
				$att=$ui->getAttribute('oauth_auths');
					
				//Check if is connected with current provider
				$attv=$att->values;
				$exists=false;
				if(!is_array($attv))
				$attv=array();
				foreach($attv as $v){
					if($v['providerID']==$provider&&$v['identifier']==$user_profile->identifier)
					{
						$exists=true;
						break;
					}
				}
				if(!$exists){//If not, add provider
					$attv[]=array(
							'providerID' => $provider,
							'identifier' => $user_profile->identifier,
							'profileUrl' => $user_profile->profileURL,
							'displayName' => $user_profile->displayName,
							'sessionData' => $hybridauth->getSessionData(),
							'mixedData' => print_r($user_profile,true)
					);

					$ui->setAttribute('oauth_auths',$attv);

					//Add email if available now
					if(empty($ui->uEmail)&&!empty($user_profile->email))
					{	$data['uEmail'] = $user_profile->email;
					$ui->update($data);
					}
				}
			}else{
				//Check if user existing
				$db=Loader::db();
				$row=$db->GetRow('SELECT uID FROM atSocialOauthValues,UserAttributeValues WHERE providerID=? AND identifier=? AND atSocialOauthValues.avID=UserAttributeValues.avID AND UserAttributeValues.akID=?',array($provider,$user_profile->identifier,$akID));
					
				if(!empty($row)&&!empty($row['uID'])){
					$u->loginByUserID($row['uID']);
					$currentPage = Page::getCurrentPage();
					Loader::helper('navigation');
					header('Location: '.NavigationHelper::getLinkToCollection($currentPage, true));
					die();
				}else{//If user not existing, register it
						
					//If email not available, ask for it
					if($co->get('sociallogin_requireemail')==1&&empty($user_profile->email)&&empty($_GET['reg_email'])){
						$bc->set('askemail',true);
					}else{
						$email=empty($user_profile->email)?(!empty($_GET['reg_email'])?$_GET['reg_email']:''):$user_profile->email;
						
						$blockregistration=false;
						//If required, check duplicate mail
						if($co->get('sociallogin_nodoubleemail')==1)
						{	$row=$db->GetRow('SELECT uID FROM Users WHERE uEmail=?',array($email));
							if(!empty($row)&&!empty($row['uID'])){
								$bc->set('emailpresent',true);
								if($co->get('sociallogin_requireemail')==1&&empty($user_profile->email))
									$bc->set('askemail',true);
								
								$message=$co->get('sociallogin_nodoubleemailtext');
								Loader::helper('navigation');
								$message=str_replace('%linkpasswordrecovery%',NavigationHelper::getLinkToCollection(Page::getByPath('/login'),true),$message);
								$bc->set('emailpresentmessage',$message);
								$blockregistration=true;
							}
						}
						if(!$blockregistration){
							//Retrieve other information
							$uname=$user_profile->displayName;
							if(empty($uname)){
								$uname=str_replace('@','_',$email);
							}
							if(empty($uname)){
								$uname='user';
							}
							$data['uName'] = SocialLoginModel::findUniqueUsername($uname);
							$data['uPassword'] = SocialLoginModel::getRandomPassword();
							$data['uEmail'] = $email;
							$data['uIsValidated'] = '1';
							$ui = UserInfo::add($data);

							$attv=array(array(
									'providerID' => $provider,
									'identifier' => $user_profile->identifier,
									'profileUrl' => $user_profile->profileURL,
									'displayName' => $user_profile->displayName,
									'sessionData' => $hybridauth->getSessionData(),
									'mixedData' => print_r($user_profile,true)
							));
							$ui->setAttribute('oauth_auths',$attv);
								
							//Registered => send email
							if(!empty($email)){
								$mh = Loader::helper('mail');
								$mh->setSubject($co->get('sociallogin_subscribeemailsubject'));
								$body=$co->get('sociallogin_subscribeemailtext');
								$body=str_replace('%username%',$data['uName'],$body);
								$body=str_replace('%password%',$data['uPassword'],$body);
								$mh->setBody($body);
								$mh->to($data['uEmail'], $data['uName']);
								$mh->from($co->get('sociallogin_subscribeemailsender'));
								$mh->sendMail();
							}
							$u->loginByUserID($ui->uID);
							$currentPage = Page::getCurrentPage();
							Loader::helper('navigation');
							header('Location: '.NavigationHelper::getLinkToCollection($currentPage, true));
							die();
						}
					}

				}
			}
			if(isset($_SESSION['redirectSocialLogin']))
			{
				header('Location: '.$_SESSION['redirectSocialLogin'].'?inviteProvider='.$provider); //TODO check if enough secure
			}
		}
		catch( Exception $e ){  //Used to debug strange behaviours
			// In case we have errors 6 or 7, then we have to use Hybrid_Provider_Adapter::logout() to
			// let hybridauth forget all about the user so we can try to authenticate again.

			// Display the recived error,
			// to know more please refer to Exceptions handling section on the userguide
			if(SocialLoginModel::$debug_mode){
				switch( $e->getCode() ){
				 case 0 : echo "Unspecified error."; break;
				 case 1 : echo "Hybriauth configuration error."; break;
				 case 2 : echo "Provider not properly configured."; break;
				 case 3 : echo "Unknown or disabled provider."; break;
				 case 4 : echo "Missing provider application credentials."; break;
				 case 5 : echo "Authentification failed. "
				 . "The user has canceled the authentication or the provider refused the connection.";
				 break;
				 case 6 : echo "User profile request failed. Most likely the user is not connected "
				 . "to the provider and he should to authenticate again.";
				 $adapter->logout();
				 break;
				 case 7 : echo "User not connected to the provider.";
				 $adapter->logout();
				 break;
					}

				echo "<br /><br /><b>Original error message:</b> " . $e->getMessage();

				echo "<hr /><h3>Trace</h3> <pre>" . $e->getTraceAsString() . "</pre>"; 
			}
		}
		endif;
	}
	/**
	 * Returns a random password
	 * @return string
	 */
	static function getRandomPassword(){
		$chars = "abcdefghijkmnopqrstuvwxyz023456789";
		srand((double)microtime()*1000000);
		$i = 0;
		$pass = '' ;
		while ($i <= 7) {
			$num = rand() % 33;
			$tmp = substr($chars, $num, 1);
			$pass = $pass . $tmp;
			$i++;
		}
		return $pass;
	}

	/**
	 * Search for an unused username starting from a given one
	 * @param Starting username
	 * @return Available username
	 */
	static function findUniqueUsername($startinguname){
		$start=(defined(USER_USERNAME_ALLOW_SPACES)&&USER_USERNAME_ALLOW_SPACES)?$startinguname:str_replace(" ","",$startinguname);
		$start=str_replace("'","",$start);
		$username=$start;
		$num=1;
		while(true){
			$ul=new UserList();
			$ul->filterByUserName($username);
			$row=$ul->get(1);
			if(empty($row)||empty($row[0]->uID)){
				break;
			}
			$username=$start.''.($num++);
		}
		return $username;
	}
	
	static function getProviderAdapter($provider){
		$config = SocialLoginModel::getHybridAuthConfiguration();
		Loader::library('hybridauth/Hybrid/Auth','social_login');

		$hybridauth = new Hybrid_Auth( $config );
		
		if(!SocialLoginModel::validProvider($provider))
		return;

		$adapter = $hybridauth->authenticate( $provider );
		return $adapter;
	}
	
	
	
}