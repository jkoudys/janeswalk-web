<?php  
defined("C5_EXECUTE") or die(_("Access Denied."));

class DashboardsocialloginController extends Controller
{
	public function view()
	{
		$form = Loader::helper('form');
		$urls=Loader::helper('concrete/urls');
		$this->set('urls',$urls);
		Loader::model('social_login','social_login');
		$this->set('form',$form);
		$token = Loader::helper('validation/token');
		$this->set('token',$token);
		
		//Retrieve configuration
		$co = new Config();
		$pkg = Package::getByHandle("social_login");
		$co->setPackageObject($pkg);

		$this->set('co',$co);
		$op=$this->request('op');
		$this->set('op',$op);

		//Add new provider with settings
		if($op=='add_provider'||$op=='edit_provider'||$op=='remove_provider'){
			$provider=SocialLoginModel::getProvider($this->request('provider'));
			$this->set('provider',$provider);
			$confirm=$this->post('confirm');
			$this->set('confirm',$confirm==1);
			if(!empty($confirm)){
				$val = Loader::helper('validation/form');
				$val->setData($_POST);
				$val->addRequiredToken('sociallogin_updateprovider');
				if ($val->test()) {
					if($op!='remove_provider'){
						foreach($provider['required'] as $req){
							$co->save('provider_'.$provider['providerID'].'_keys_'.$req['id'], $this->post('provider_'.$req['id']));
						}
						$co->save('provider_'.$provider['providerID'].'_enabled', 1);
					}else{
						foreach($provider['required'] as $req){
							$co->clear('provider_'.$provider['providerID'].'_keys_'.$req['id']);
						}
						$co->clear('provider_'.$provider['providerID'].'_enabled');
					}
				}
				header('Location: '.View::url('/dashboard/'.SocialLoginPackage::getPackageHandle()));
				die();
			}
		}

		//Active providers
		$av=SocialLoginModel::getStructuredAvailable();
		$providers_enabled=array();
		$providers_disabled=array();
		foreach($av as $provider){
			if(SocialLoginModel::providerEnabled($provider['providerID'])){
				$providers_enabled[]=$provider;
			}else{
				$providers_disabled[]=$provider;
			}
		}
		$this->set('providers',$av);
		$this->set('active_providers',$providers_enabled);
		$this->set('inactive_providers',$providers_disabled);

		//Get configuration
		$subscribeemail_sender=$co->get('sociallogin_subscribeemailsender');
		$subscribeemail_sender=!empty($subscribeemail_sender)?$subscribeemail_sender:'';
		$this->set('subscribeemail_sender',$subscribeemail_sender);
		$subscribeemail_subject=$co->get('sociallogin_subscribeemailsubject');
		$subscribeemail_subject=!empty($subscribeemail_subject)?$subscribeemail_subject:'';
		$this->set('subscribeemail_subject',$subscribeemail_subject);
		$subscribeemail_text=$co->get('sociallogin_subscribeemailtext');
		$subscribeemail_text=!empty($subscribeemail_text)?$subscribeemail_text:'';
		$this->set('subscribeemail_text',$subscribeemail_text);
		$sociallogin_requireemail=$co->get('sociallogin_requireemail');
		$sociallogin_requireemail=!empty($sociallogin_requireemail)?$sociallogin_requireemail:'';
		$this->set('sociallogin_requireemail',$sociallogin_requireemail);
		$sociallogin_requireemailconfirm=$co->get('sociallogin_requireemailconfirm');
		$sociallogin_requireemailconfirm=!empty($sociallogin_requireemailconfirm)?$sociallogin_requireemailconfirm:'';
		$this->set('sociallogin_requireemailconfirm',$sociallogin_requireemailconfirm);
		$sociallogin_nodoubleemail=$co->get('sociallogin_nodoubleemail');
		$sociallogin_nodoubleemail=!empty($sociallogin_nodoubleemail)?$sociallogin_nodoubleemail:'';
		$this->set('sociallogin_nodoubleemail',$sociallogin_nodoubleemail);
		$sociallogin_nodoubleemailtext=$co->get('sociallogin_nodoubleemailtext');
		$sociallogin_nodoubleemailtext=!empty($sociallogin_nodoubleemailtext)?$sociallogin_nodoubleemailtext:'';
		$this->set('sociallogin_nodoubleemailtext',$sociallogin_nodoubleemailtext);

		//Save configuration
		if($op=='configuration'&&isset($_POST['submit'])){
			$val = Loader::helper('validation/form');
			$val->setData($_POST);
			$val->addRequiredToken('sociallogin_changeconfiguration');
			if ($val->test()) {
				$co->save('sociallogin_subscribeemailsender', $this->post('subscribeemail_sender'));
				$co->save('sociallogin_subscribeemailsubject', $this->post('subscribeemail_subject'));
				$co->save('sociallogin_subscribeemailtext', $this->post('subscribeemail_text'));
				$co->save('sociallogin_requireemail', $this->post('sociallogin_requireemail'));
				$co->save('sociallogin_requireemailconfirm', $this->post('sociallogin_requireemailconfirm'));
				$co->save('sociallogin_nodoubleemail', $this->post('sociallogin_nodoubleemail'));
				$co->save('sociallogin_nodoubleemailtext', $this->post('sociallogin_nodoubleemailtext'));
			}
			header('Location: '.View::url('/dashboard/'.SocialLoginPackage::getPackageHandle()));
			die();
		}
	}
}
