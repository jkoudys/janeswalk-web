// TODO: link to the i18n
function t(str) {
  const args = Array.from(arguments);
  return args.shift().replace(/%(s|d)/g, () => args.shift());
}

const Message = (props) => (
  <div className={'alert alert-' + (props.success ? 'info' : 'danger')}>
    {props.msg}{props.error}
  </div>
);

/**
 * The 'login' modal that comes up on standard login, not to be confused
 * with the login page.
 */
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      maintainLogin: false,
      message: {}
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeMaintainLogin = this.handleChangeMaintainLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReset(ev) {
    // Post a reset request to the c5 endpoint for resets
    $.ajax({
      type: 'POST',
      url: CCM_REL + '/login/forgot_password',
      data: {
        uEmail: this.state.email,
        uName: this.state.email,
        format: 'JSON'
      },
      dataType: 'json',
      success: data => this.setState({message: data})
    });
  }

  handleChangeEmail(ev) {
    this.setState({email: ev.target.value});
  }

  handleChangePassword(ev) {
    this.setState({password: ev.target.value});
  }

  handleChangeMaintainLogin(ev) {
    this.setState({maintainLogin: ev.target.value});
  }

  handleSubmit(ev) {
    ev.preventDefault();
    // Post the login to the c5 endpoint for logins
    $.ajax({
      type: 'POST',
      url: CCM_REL + '/login/do_login',
      data: {
        uEmail: this.state.email,
        uName: this.state.email,
        uPassword: this.state.password,
        uMaintainLogin: this.state.maintainLogin,
        format: 'JSON'
      },
      dataType: 'json',
      success: data => {
        this.setState({message: data}, () => {
          if (data.success === 1) {
            if (this.props.redirectURL) {
              window.location.replace(this.props.redirectURL);
            } else {
              window.location.reload();
            }
          }
        });
      }
    });
  }

  render() {
    let message;
    if (Number.isInteger(this.state.message.success)) {
      message = <Message {...this.state.message} />
    }

    return (
      <dialog id="login">
        <div>
          <article>
            <header>
              <h3 className="form-lead">{t('Sign in to %s', 'Jane\'s Walk')}</h3>
            </header>
            <form rel="form" method="post" onSubmit={this.handleSubmit}>
              <section dangerouslySetInnerHTML={{__html: this.props.socialLogin}} />
              <section>
                <h4>{t('or, log-in using your email & password')}</h4>
                <label htmlFor="uEmail">
                  {t('Email')}
                  <input type="text" name="uEmail" id="uEmail" ref="uEmail" value={this.state.email} onChange={this.handleChangeEmail} className="ccm-input-text input-large" />
                </label>
                <label htmlFor="uPassword">{t('Password')}
                  <input type="password" name="uPassword" id="uPassword" value={this.state.password} onChange={this.handleChangePassword} className="ccm-input-text input-large" />
                </label>
                <label>
                  <input type="checkbox" name="uMaintainLogin" checked={this.maintainLogin} onChange={this.handleChangeMaintainLogin} /> {t('Keep me signed in.')}
                </label>
                <a onClick={this.handleReset}>{t('Request a new password')}</a>
              </section>
              <footer>
                {message}
                <a href={CCM_REL + '/register?uEmail=' + this.state.email}>{t('Register for a new account.')}</a>
                <input type="submit" className="btn ccm-input-submit" id="submit" value={t('Go!')} />
              </footer>
            </form>
          </article>
        </div>
      </dialog>
    );
  }
}
