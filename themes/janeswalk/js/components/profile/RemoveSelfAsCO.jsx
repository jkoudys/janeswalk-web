const RemovePrompt = ({close, removeCO}) => (
  <section>
    <p>We're sad to lose you, but we understand that not everyone can stay a City Organizer forever. If you have to go, then we thank you for all the help you've donated to the Jane's Walk project.</p>
    <p>
      <a onClick={removeCO}>I understand, remove me.</a>
    </p>
    <p>
      <a onClick={close}>Keep me as CO for now.</a>
    </p>
  </section>
);

const RemovedScreen = ({close}) => (
  <section>
    <p>Know anyone you think would do a great job as the new City Organizer? Please email Nadia at <a href="mailto:nadia.halim@janeswalk.org">nadia.halim@janeswalk.org</a> and recommend someone!</p>
    <p><a onClick={close}><i className="fa fa-times" />Close</a></p>
  </section>
);

class RemoveSelf extends React.Component {
  componentDidMount() {
    $(React.findDOMNode(this)).modal();
  }

  componentWillUnmount() {
    $(React.findDOMNode(this)).modal('hide');
  }

  render() {
    const {city, closeModal, removeCO, removed} = this.props;
    return (
      <dialog>
        <div>
          <article>
            <header>
              <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Remove me from my role as City Organizer</h4>
            </header>
            {removed ? <RemovedScreen close={closeModal} /> : <RemovePrompt close={closeModal} removeCO={removeCO} />}
          </article>
        </div>
      </dialog>
    );
  }
}

export default class RemoveSelfAsCO extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {modal: false, removed: false};
  }

  handleRemoveCO() {
    const xhr = new XMLHttpRequest();
    const _this = this;
    xhr.open('get', '/profile/removeSelfAsCO/' + this.props.city, true);
    xhr.onload = function() {
      _this.setState({removed: true});
    };
    xhr.send();
  }

  render() {
    let removeModal;
    let removeLink;
    if (this.state.modal) {
      removeModal = <RemoveSelf city={this.props.city} closeModal={() => this.setState({modal: false})} removeCO={() => this.handleRemoveCO()} removed={this.state.removed} />;
    }
    if (!this.state.removed) {
      removeLink = (
        <span>
          If you're no longer able to be a CO this year, then <a onClick={() => this.setState({modal: true})}>click here to remove yourself as City Organizer.</a>
        </span>
      );
    } else {
      removeLink = <span>You have removed yourself as the official City Organizer.</span>;
    }

    return (
      <p>
        {removeLink}
        {removeModal}
      </p>
    );
  }
}
