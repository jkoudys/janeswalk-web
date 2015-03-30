'use strict';

var WalkPublish = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      eventbrite: !!this.props.mirrors.eventbrite
    };
  },

  componentDidMount: function() {
    var _this = this;
    // Bootstrap Modal
    $(this.getDOMNode()).modal();
    // Close the modal when modal closes
    $(this.getDOMNode()).bind('hidden.bs.modal', function() {
      _this.props.close();
    });
  },

  handlePublish: function() {
    this.props.saveWalk({publish: true}, function() {
      // This function's meant for callbacks, so it grabs the URL from the caller's state
      window.location = this.state.url;
    });
  },

  render: function() {
    var i18n = this.props.i18n;
    var t = i18n.translate.bind(i18n);

    // Check city config for which walk mirroring services to expose
    var mirrorWalk;
    if (this.props.city.mirrors.indexOf('eventbrite') !== -1) {
      mirrorWalk = (
        <label className="checkbox">
          <input type="checkbox" checkedLink={this.linkState('eventbrite')} />
          {t('Publish walk to EventBrite')}
        </label>
      );
    }

    return (
      <dialog id="publish-warning">
        <div>
          <article>
            <header>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3>{ t('Okay, You\'re Ready to Publish') }</h3>
            </header>
            <div className="modal-body">
              <p>{ t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.') }</p>
              {mirrorWalk}
            </div>
            <footer>
              <div className="pull-left">
                <a className="walkthrough close" data-dismiss="modal" onClick={this.props.close.bind(this)}> { t('Bring me back to edit') }</a>
              </div>
              <a>
                <button className="btn btn-primary walkthrough" data-step="publish-confirmation" onClick={this.handlePublish}>{ t('Publish') }</button>
              </a>
            </footer>
          </article>
        </div>
      </dialog>
    );
    /*
    return (
      <dialog id="publish-confirmation">
        <header>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h3>Your Walk Has Been Published!</h3>
        </header>
        <div className="modal-body">
          <p>Congratulations! Your walk is now available for all to peruse.</p>
          <h2 className="lead">{t('Don\'t forget to share your walk!')}</h2>
          <label>Your Walk Web Address:</label>
          <input type="text" className="clone js-url-field" value={this.props.url} readOnly />
          <hr />
          <button className="btn facebook"><i className="fa fa-facebook-sign" /> Share on Facebook</button>
          <button className="btn twitter"><i className="fa fa-twitter-sign" /> Share on Twitter</button>
        </div>
        <footer>
          <button className="btn btn-primary walkthrough">Close</button>
        </footer>
      </dialog>
    );
    */
  }
});

module.exports = WalkPublish;
