/* global $ CCM_REL */

import { createElement as ce, Component } from 'react';
import t from 'es2015-i18n-tag';
import { Modal } from 'antd';

const { event } = window.JanesWalk;

const Message = ({ success, msg, error }) => (
  ce('div', { className: `alert alert-${success ? 'info' : 'danger'}` },
    msg,
    error,
  )
);

/**
 * The 'login' modal that comes up on standard login, not to be confused
 * with the login page.
 */
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    maintainLogin: false,
    message: {},
  };

  handleReset = () => {
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
  };

  handleChangeEmail = (ev) => {
    this.setState({ email: ev.target.value });
  };

  handleChangePassword = (ev) => {
    this.setState({ password: ev.target.value });
  };

  handleChangeMaintainLogin = (ev) => {
    this.setState({ maintainLogin: ev.target.value });
  };

  handleSubmit = (ev) => {
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
  };

  onCancel = () => this.setState({ visible: false });

  componentWillMount() {
    event.on('login', () => this.setState({ visible: true }));
  }

  render() {
    const { socialLogin } = this.props;
    const { email, password, visible } = this.state;
    const { onCancel } = this;

    let message;
    if (Number.isInteger(this.state.message.success)) {
      message = ce(Message, this.state.message);
    }

    return (
      ce(Modal, {
        id: 'login',
        visible,
        className: 'Login',
        footer: null,
        title: t`Sign in to ${'Jane\'s Walk'}`,
        onCancel,
        onOk: onCancel,
      },
        ce('form', { rel: 'form', method: 'post', onSubmit: this.handleSubmit },
          ce('section', { dangerouslySetInnerHTML: { __html: socialLogin } }),
          ce('section', {},
            ce('h4', {}, t`'or, log-in using your email & password`),
            ce('label', { htmlFor: 'uEmail' },
              t`Email`,
              ce('input', {
                type: 'text',
                name: 'uEmail',
                id: 'uEmail',
                ref: 'uEmail',
                value: email,
                onChange: this.handleChangeEmail,
                className: 'ccm-input-text input-large',
              }),
            ),
            ce('label', { htmlFor: 'uPassword' }, t`Password`,
              ce('input', {
                type: 'password',
                name: 'uPassword',
                id: 'uPassword',
                value: password,
                onChange: this.handleChangePassword,
                className: 'ccm-input-text input-large',
              }),
            ),
            ce('label', {},
              ce('input', {
                type: 'checkbox',
                name: 'uMaintainLogin',
                checked: this.maintainLogin,
                onChange: this.handleChangeMaintainLogin,
              }),
              ' ', t`Keep me signed in.`,
            ),
            ce('a', { onClick: this.handleReset }, t`Request a new password`),
          ),
          ce('footer', {},
            message,
            ce('a', { href: `${CCM_REL}/register?uEmail=${email}` }, t`Register for a new account.`),
            ce('input', { type: 'submit', className: 'btn ccm-input-submit', id: 'submit', value: t`Go!` }),
          ),
        )
      )
    );
  }
}
