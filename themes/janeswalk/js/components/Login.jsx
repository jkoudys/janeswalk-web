var Login = React.createClass({
  getInitialState: function() {
    // <?= (isset($uName) ? 'value="' . $uName . '"' : '') ?> 
    return {
      email: '',
      password: '',
      maintainLogin: false,
      message: {}
    };
  },

  handleReset: function(ev) {
    var _this = this;
    $.ajax({
      type: 'POST',
      url: CCM_REL + '/login/forgot_password',
      data: {
        uEmail: this.state.email,
        uName: this.state.email,
        format: 'JSON'
      },
      dataType: 'json',
      success: function(data) {
        _this.setState({message: data});
      }
    });
  },

  handleChangeEmail: function(ev) {
    this.setState({email: ev.target.value});
  },

  handleChangePassword: function(ev) {
    this.setState({password: ev.target.value});
  },

  handleChangeMaintainLogin: function(ev) {
    this.setState({maintainLogin: ev.target.value});
  },

  handleSubmit: function(ev) {
    var _this = this;
    ev.preventDefault();
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
      success: function(data) {
        _this.setState({message: data}, function() {
          if (data.success === 1) {
            if (_this.props.redirectURL) {
              window.location.replace(_this.props.redirectURL);
            } else {
              window.location.reload();
            }
          }
        });
      }
    });
  },

  render: function() {
    // TODO: link to the i18n
    var t = function(str) {
      var args = Array.prototype.slice.call(arguments);
      return args.shift().replace(/%(s|d)/g, function(){
        return args.shift();
      });
    };
    var message = Number.isInteger(this.state.message.success) ? (
      <div className={'alert alert-' + (this.state.message.success ? 'info' : 'danger')}>
          {this.state.message.msg}{this.state.message.error}
      </div>
    ) : null;
    
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
});

module.exports = Login;

