/* global $ CCM_REL */

import { createElement as ce, Component } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';

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
export default Form.create()(class Login extends Component {
  state = {};

  // Simply resolve if no error, else reject with same values
  validFields = (fields) => new Promise((res, rej) => {
    this.props.form.validateFields(fields, (err, values) => (err ? rej : res)(values));
  });

  handleReset = async () => {
    try {
      const { email } = await this.validFields();
      const body = new FormData();
      body.append('uEmail', email);
      body.append('uName', email);
      body.append('format', 'JSON');

      // Post a reset request to the c5 endpoint for resets
      const message = await fetch(`${CCM_REL}/login/forgot_password`, {
        method: 'POST',
        credentials: 'include',
        body,
      })
      .then(res => res.json());

      this.setState({ message });
    } catch (ex) {
      console.error(`Error resetting password: ${ex.message}`);
    }
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { email, password, remember } = await this.validFields();
      const body = new FormData();

      body.append('uEmail', email);
      body.append('uName', email);
      body.append('uPassword', password);
      body.append('uMaintainLogin', remember);
      body.append('format', 'JSON');

      // Post the login to the c5 endpoint for logins
      const message = await fetch(`${CCM_REL}/login/do_login`, {
        method: 'POST',
        credentials: 'include',
        body,
      })
      .then(res => res.json());

      this.setState({ message }, () => {
        if (+message.success === 1) {
          if (this.props.redirectURL) {
            window.location.replace(this.props.redirectURL);
          } else {
            window.location.reload();
          }
        }
      });
    } catch ({ message }) {
      console.error(`Error logging in: ${message}`);
    }
  };

  onCancel = () => this.setState({ visible: false });

  componentWillMount() {
    event.on('login', () => this.setState({ visible: true }));
  }

  render() {
    const {
      props: {
        form: {
          getFieldDecorator,
        },
      },
      state: {
        visible,
        message = {},
      },
      onCancel,
    } = this;

    const { email } = this.props.form.getFieldsValue();

    let notification;
    if (Number.isInteger(message.success)) {
      notification = ce(Message, message);
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
        ce(Form, { method: 'post', onSubmit: this.handleSubmit },
          notification,
          ce(Form.Item, {}, getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: t`Please enter your email` }],
          })(
            ce(Input, {
              prefix: ce(Icon, { type: 'user', style: { fontSize: 13 } }),
              placeholder: 'email',
            }),
          )),
          ce(Form.Item, {}, getFieldDecorator('password', {
            rules: [{ required: true, message: t`Please enter your password` }],
          })(
            ce(Input, {
              prefix: ce(Icon, { type: 'lock', style: { fontSize: 13 } }),
              type: 'password',
              placeholder: 'Password',
            }),
          )),
          ce(Form.Item, {}, getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            ce(Checkbox, {}, t`Keep me signed in.`),
          )),
          ce('a', { style: { float: 'right' }, onClick: this.handleReset }, t`Request a new password`),
          ce(Button, { type: 'primary', htmlType: 'submit', className: 'login-form-button' }, t`Go!`),
          ce('a', { href: `${CCM_REL}/register?uEmail=${email}` }, t`Register for a new account.`),
        )
      )
    );
  }
});
