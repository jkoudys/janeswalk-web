/* global React $ */

// Flux
import { t } from 'janeswalk/stores/I18nStore';

export default class WalkPublish extends React.Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: {
        eventbrite: !!(props.mirrors && props.mirrors.eventbrite),
      },
      handlePublish: () => {
        // This function's meant for callbacks, so it grabs the URL from the caller's state
        this.props.saveWalk({ publish: true }, () => { window.location = this.props.url; });
      },
    });
  }

  componentDidMount() {
    // Bootstrap Modal
    $(React.findDOMNode(this)).modal();

    // Close the modal when modal closes
    $(React.findDOMNode(this)).bind('hidden.bs.modal', () => this.props.close());
  }

  render() {
    const { city, close: closeModal } = this.props;
    // Check city config for which walk mirroring services to expose
    let mirrorWalk;
    if (city.mirrors.indexOf('eventbrite') > -1) {
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
                <a className="walkthrough close" data-dismiss="modal" onClick={closeModal}> { t('Bring me back to edit') }</a>
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
