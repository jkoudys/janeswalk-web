/* global React $ CCM_REL */

import { t } from 'janeswalk/stores/I18nStore';

const Message = ({ success, msg, error }) => (
  <div className={`alert alert-${success ? 'info' : 'danger'}`}>
    {msg}{error}
  </div>
);

/**
 * The 'login' modal that comes up on standard login, not to be confused
 * with the login page.
 */
export default class Login extends React.Component {
  constructor() {
    super();

    Object.assign(this, {
      state: {
        email: '',
        password: '',
        maintainLogin: false,
        message: {},
      },
      handleReset: () => {
        const body = new FormData();
        body.append('uEmail', this.state.email);
        body.append('uName', this.state.email);
        body.append('format', 'JSON');

        // Post a reset request to the c5 endpoint for resets
        fetch(`${CCM_REL}/login/forgot_password`, {
          method: 'POST',
          credentials: 'include',
          body,
        })
        .then(res => res.json())
        .then(json => this.setState({ message: json }))
        .catch(ex => console.error(`Error resetting password: ${ex.message}`));
      },

      handleChangeEmail: (ev) => {
        this.setState({ email: ev.target.value });
      },

      handleChangePassword: (ev) => {
        this.setState({ password: ev.target.value });
      },

      handleChangeMaintainLogin: (ev) => {
        this.setState({ maintainLogin: ev.target.value });
      },

      handleSubmit: (ev) => {
        ev.preventDefault();
        const body = new FormData();
        body.append('uEmail', this.state.email);
        body.append('uName', this.state.email);
        body.append('uPassword', this.state.password);
        body.append('uMaintainLogin', this.state.maintainLogin);
        body.append('format', 'JSON');

        // Post the login to the c5 endpoint for logins
        fetch(`${CCM_REL}/login/do_login`, {
          method: 'POST',
          credentials: 'include',
          body,
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ message: data }, () => {
              if (data.success === 1) {
                if (this.props.redirectURL) {
                  window.location.replace(this.props.redirectURL);
                } else {
                  window.location.reload();
                }
              }
            });
        })
        .catch(ex => console.error(`Error logging in: ${ex.message}`));
      },
    });
  }

  render() {
    const { socialLogin } = this.props;
    const { email, password } = this.state;

    let message;
    if (Number.isInteger(this.state.message.success)) {
      message = <Message {...this.state.message} />;
    }

    return (
      <dialog id="login">
        <div>
          <article>
            <header>
              <h3 className="form-lead">{t('Sign in to %s', 'Jane\'s Walk')}</h3>
            </header>
            <form rel="form" method="post" onSubmit={this.handleSubmit}>
              <section dangerouslySetInnerHTML={{ __html: socialLogin }} />
              <section>
                <h4>{t('or, log-in using your email & password')}</h4>
                <label htmlFor="uEmail">
                  {t('Email')}
                  <input type="text" name="uEmail" id="uEmail" ref="uEmail" value={email} onChange={this.handleChangeEmail} className="ccm-input-text input-large" />
                </label>
                <label htmlFor="uPassword">{t('Password')}
                  <input type="password" name="uPassword" id="uPassword" value={password} onChange={this.handleChangePassword} className="ccm-input-text input-large" />
                </label>
                <label>
                  <input type="checkbox" name="uMaintainLogin" checked={this.maintainLogin} onChange={this.handleChangeMaintainLogin} /> {t('Keep me signed in.')}
                </label>
                <a onClick={this.handleReset}>{t('Request a new password')}</a>
              </section>
              <footer>
                {message}
                <a href={`${CCM_REL}/register?uEmail=${email}`}>{t('Register for a new account.')}</a>
                <input type="submit" className="btn ccm-input-submit" id="submit" value={t('Go!')} />
              </footer>
            </form>
          </article>
        </div>
      </dialog>
    );
  }
}
