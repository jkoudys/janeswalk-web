<?php
use Concrete\Core\Legacy\UserHelper;
use Concrete\Core\Legacy\TextHelper;

class RegisterController extends Concrete5_Controller_Register
{
    public function __construct()
    {
        if (!ENABLE_REGISTRATION) {
            $cont = Loader::controller('/page_not_found');
            $cont->view();
            $this->render('/page_not_found');
        }
        parent::__construct();
        Loader::model('user_attributes');

        $u = new User();
        $this->set('u', $u);

        $this->set('displayUserName', (bool) USER_REGISTRATION_WITH_EMAIL_ADDRESS);
    }

    /**
     * Original method is too convoluted to extend, so unfortunately
     * bad things happen if it's not customized like this.
     * TODO: on 5.7 update clean this out.
     */
    public function do_register()
    {
        $registerData['success'] = 0;

        $userHelper = new UserHelper();
        $e = Loader::helper('validation/error');
        $ip = Loader::helper('validation/ip');
        $txt = new TextHelper();
        $vals = Loader::helper('validation/strings');
        $valc = Loader::helper('concrete/validation');

        if (USER_REGISTRATION_WITH_EMAIL_ADDRESS == true) {
            $username = $_POST['uEmail'];
        } else {
            $username = $_POST['uName'];
        }
        $password = $_POST['uPassword'];
        $passwordConfirm = $_POST['uPasswordConfirm'];

        // clean the username
        $username = trim($username);
        $username = preg_replace("/ +/", " ", $username);

        if (!$ip->check()) {
            $e->add($ip->getErrorMessage());
        }

        if (ENABLE_REGISTRATION_CAPTCHA) {
            $captcha = Loader::helper('validation/captcha');
            if (!$captcha->check()) {
                $e->add(t("Incorrect image validation code. Please check the image and re-enter the letters or numbers as necessary."));
            }
        }

        if (!$vals->email($_POST['uEmail'])) {
            $e->add(t('Invalid email address provided.'));
        } elseif (!$valc->isUniqueEmail($_POST['uEmail'])) {
            $e->add(t("The email address %s is already in use. Please choose another.", $_POST['uEmail']));
        }

        if (USER_REGISTRATION_WITH_EMAIL_ADDRESS == false) {
            if (strlen($username) < USER_USERNAME_MINIMUM) {
                $e->add(t('A username must be between at least %s characters long.', USER_USERNAME_MINIMUM));
            }

            if (strlen($username) > USER_USERNAME_MAXIMUM) {
                $e->add(t('A username cannot be more than %s characters long.', USER_USERNAME_MAXIMUM));
            }

            if (strlen($username) >= USER_USERNAME_MINIMUM && !$valc->username($username)) {
                if (USER_USERNAME_ALLOW_SPACES) {
                    $e->add(t('A username may only contain letters, numbers and spaces.'));
                } else {
                    $e->add(t('A username may only contain letters or numbers.'));
                }
            }
            if (!$valc->isUniqueUsername($username)) {
                $e->add(t("The username %s already exists. Please choose another", $username));
            }
        }

        if ($username == USER_SUPER) {
            $e->add(t('Invalid Username'));
        }

        $userHelper->validNewPassword($password, $e);

        if ($password) {
            if ($password != $passwordConfirm) {
                $e->add(t('The two passwords provided do not match.'));
            }
        }

        $aks = UserAttributeKey::getRegistrationList();

        foreach ($aks as $uak) {
            if ($uak->isAttributeKeyRequiredOnRegister()) {
                $e1 = $uak->validateAttributeForm();
                if (!$e1) {
                    $e->add(t('The field "%s" is required', tc('AttributeKeyName', $uak->getAttributeKeyName())));
                } elseif ($e1 instanceof ValidationErrorHelper) {
                    $e->add($e1);
                }
            }
        }

        if (!$e->has()) {
            // do the registration
            $data = $_POST;
            $data['uName'] = $username;
            $data['uPassword'] = $password;
            $data['uPasswordConfirm'] = $passwordConfirm;

            $process = UserInfo::register($data);
            if (is_object($process)) {
                foreach ($aks as $uak) {
                    $uak->saveAttributeForm($process);
                }

                if (REGISTER_NOTIFICATION) { //do we notify someone if a new user is added?
                    $mh = Loader::helper('mail');
                    if (EMAIL_ADDRESS_REGISTER_NOTIFICATION) {
                        $mh->to(EMAIL_ADDRESS_REGISTER_NOTIFICATION);
                    } else {
                        $adminUser = UserInfo::getByID(USER_SUPER_ID);
                        if (is_object($adminUser)) {
                            $mh->to($adminUser->getUserEmail());
                        }
                    }

                    $mh->addParameter('uID', $process->getUserID());
                    $mh->addParameter('user', $process);
                    $mh->addParameter('uName', $process->getUserName());
                    $mh->addParameter('uEmail', $process->getUserEmail());
                    $attribs = UserAttributeKey::getRegistrationList();
                    $attribValues = array();
                    foreach ($attribs as $ak) {
                        $attribValues[] = tc('AttributeKeyName', $ak->getAttributeKeyName()) . ': ' . $process->getAttribute($ak->getAttributeKeyHandle(), 'display');
                    }
                    $mh->addParameter('attribs', $attribValues);

                    if (defined('EMAIL_ADDRESS_REGISTER_NOTIFICATION_FROM')) {
                        $mh->from(EMAIL_ADDRESS_REGISTER_NOTIFICATION_FROM, t('Website Registration Notification'));
                    } else {
                        $adminUser = UserInfo::getByID(USER_SUPER_ID);
                        if (is_object($adminUser)) {
                            $mh->from($adminUser->getUserEmail(), t('Website Registration Notification'));
                        }
                    }
                    if ('manual_approve' === REGISTRATION_TYPE) {
                        $mh->load('user_register_approval_required');
                    } else {
                        $mh->load('user_register');
                    }
                    $mh->sendMail();
                }

                // now we log the user in
                if (USER_REGISTRATION_WITH_EMAIL_ADDRESS) {
                    $u = new User($_POST['uEmail'], $_POST['uPassword']);
                } else {
                    $u = new User($_POST['uName'], $_POST['uPassword']);
                }
                // if this is successful, uID is loaded into session for this user

                $rcID = $this->post('rcID');
                $nh = Loader::helper('validation/numbers');
                if (!$nh->integer($rcID)) {
                    $rcID = 0;
                }

                // now we check whether we need to validate this user's email address
                if (defined("USER_VALIDATE_EMAIL") && USER_VALIDATE_EMAIL) {
                    if (USER_VALIDATE_EMAIL > 0) {
                        $uHash = $process->setupValidation();

                        $mh = Loader::helper('mail');
                        if (defined('EMAIL_ADDRESS_VALIDATE')) {
                            $mh->from(EMAIL_ADDRESS_VALIDATE, t('Validate Email Address'));
                        }
                        $mh->addParameter('uEmail', $_POST['uEmail']);
                        $mh->addParameter('uHash', $uHash);
                        $mh->to($_POST['uEmail']);
                        $mh->load('validate_user_email');
                        $mh->sendMail();

                        //$this->redirect('/register', 'register_success_validate', $rcID);
                        $redirectMethod='register_success_validate';
                        $registerData['msg']= join('<br><br>', $this->getRegisterSuccessValidateMsgs());

                        $u->logout();
                    }
                } elseif (defined('USER_REGISTRATION_APPROVAL_REQUIRED') && USER_REGISTRATION_APPROVAL_REQUIRED) {
                    $ui = UserInfo::getByID($u->getUserID());
                    $ui->deactivate();
                    $redirectMethod='register_pending';
                    $registerData['msg']=$this->getRegisterPendingMsg();
                    $u->logout();
                }

                if (!$u->isError()) {
                    if (!$redirectMethod) {
                        $redirectMethod='register_success';
                        $registerData['msg']=$this->getRegisterSuccessMsg();
                    }
                    $registerData['uID']=intval($u->uID);
                }

                $registerData['success'] = 1;

                if ($_REQUEST['format'] !== 'JSON') {
                    $this->redirect('/register', $redirectMethod, $rcID);
                }
            }
        } else {
            $ip->logSignupRequest();
            if ($ip->signupRequestThreshholdReached()) {
                $ip->createIPBan();
            }
            $this->set('error', $e);
            $registerData['errors'] = $e->getList();
        }

        if ('JSON' === $_REQUEST['format']) {
            echo json_encode($registerData);
            die;
        }
    }

    public function getRegisterSuccessValidateMsgs(): array
    {
        return [
            t('Awesome! Welcome to Jane\'s Walk. We\'re looking forward to seeing what kind of conversation you plan to stir up with your walk.'),
            t('Check your email for a little note from us, and then you\'re all set to sign in.'),
        ];
    }
}
