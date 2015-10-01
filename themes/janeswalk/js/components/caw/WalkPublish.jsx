// Flux
var t = require('../../stores/I18nStore.js').getTranslate();

export default class WalkPublish extends React.Component {
  constructor() {
    super();
    this.state = {
      eventbrite: !!this.props.mirrors.eventbrite
    };
  }

  componentDidMount() {
    // Bootstrap Modal
    $(this.getDOMNode()).modal();

    // Close the modal when modal closes
    $(this.getDOMNode()).bind('hidden.bs.modal', () => this.props.close());
  }

  handlePublish() {
    // This function's meant for callbacks, so it grabs the URL from the caller's state
    this.props.saveWalk({publish: true}, () => window.location = this.state.url);
  }

  render() {
    // Check city config for which walk mirroring services to expose
    let mirrorWalk;
    if (this.props.city.mirrors.indexOf('eventbrite') > -1) {
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
  }
}
Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);
