/* global React ReactDOM $ */

// Flux
import { translateTag as t } from 'janeswalk/stores/I18nStore';

function getWarnings({ walk: { title, time: { slots = [] }, map: { markers = [] } = {}, thumbnails = [] } }) {
  const warnings = [];

  if (!title) {
    warnings.push({
      message: t`Your Walk Title is empty.`,
    });
  }

  if (!thumbnails.length) {
    warnings.push({
      message: t`You don't have a photo for your Walk.`,
    });
  }

  if (!slots.length) {
    warnings.push({
      message: t`You didn't set at least one time & date.`,
      notes: [
        t`Remember to click 'Add Date' after you make your selection.`,
      ],
    });
  }

  if (!markers.length) {
    warnings.push({
      message: t`You didn't set a first stop on the Walk map.`,
    });
  } else if (!markers[0].title) {
    warnings.push({
      message: t`You didn't give your meeting place a title.`,
    });
  }

  return warnings;
}

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
    $(ReactDOM.findDOMNode(this)).modal();

    // Close the modal when modal closes
    $(ReactDOM.findDOMNode(this)).bind('hidden.bs.modal', () => this.props.close());
  }

  render() {
    const { city, walk, close: closeModal } = this.props;
    // Check city config for which walk mirroring services to expose
    let mirrorWalk;
    const warnings = getWarnings({ walk }).map(({ message, anchor, notes }) => (
      <li>
        {message}
        {notes ? <small><br />{notes}</small> : null}
        {anchor ? <a href={`#${anchor}`} data-dismiss="modal" onClick={closeModal}>{t`Fix it`}</a> : null}
      </li>
    ));

    if (city.mirrors.indexOf('eventbrite') > -1) {
      mirrorWalk = (
        <label className="checkbox">
          <input type="checkbox" checkedLink={this.linkState('eventbrite')} />
          {t`Publish walk to EventBrite`}
        </label>
      );
    }

    return (
      <dialog id="publish-warning">
        <div>
          <article>
            <header>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3>{ t`Okay, You're Ready to Publish` }</h3>
            </header>
            <div className="modal-body">
              {warnings.length ? [
                <h4>{t`Here are a few things to double-check.`}</h4>,
                <ul className="warnings">{warnings}</ul>,
              ] : null}
              <p>{ t`Just one more thing! Once you hit publish your walk will be live on Jane's Walk right away. You can return at any time to make changes.` }</p>
              {mirrorWalk}
            </div>
            <footer>
              <div className="pull-left">
                <a className="walkthrough close" data-dismiss="modal" onClick={closeModal}> { t`Bring me back to edit` }</a>
              </div>
              <a>
                <button className="btn btn-primary walkthrough" data-step="publish-confirmation" onClick={this.handlePublish}>{ t`Publish` }</button>
              </a>
            </footer>
          </article>
        </div>
      </dialog>
    );
  }
}
Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);
