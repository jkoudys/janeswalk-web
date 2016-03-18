/* global React $ */
import { t } from 'janeswalk/stores/I18nStore';

export default class WalkPreview extends React.Component {
  componentDidMount() {
    const el = React.findDOMNode(this);
    // Bootstrap Modal
    $(el).modal();
    // Close the modal when modal closes
    $(el).bind('hidden.bs.modal', () => this.props.close());
  }

  render() {
    return (
      <dialog id="preview-modal">
        <div>
          <article>
            <header>
              <button type="button" className="close" aria-hidden="true" data-dismiss="modal">&times;</button>
              <h3>{ t('Preview of your Walk') }</h3>
            </header>
            <div className="modal-body">
              <iframe src={this.props.url} frameBorder="0" />
            </div>
          </article>
        </div>
      </dialog>
    );
  }
}
