export default class ItineraryHeader extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editable: false,
      newDescription: null,
      newTitle: null,
    }
  }

  update() {
    const {updateTitle, updateDescription, title, description} = this.props;
    const {editable, newTitle, newDescription} = this.state;

    updateTitle(newTitle || title);
    updateDescription(newDescription || description);

    this.setState({
      editable:!editable,
      newTitle: null,
      newDescription: null,
    })
  }

  cancel() {
    const {editable} = this.state;

    this.setState({
      newTitle: null,
      newDescription: null,
      editable: !editable,
    });
  }

  edit() {
    const {editable} = this.state;

    this.setState({
      editable: !editable,
    });
  }

  render() {
    const {title, description, lists, viewList} = this.props;
    let {editable, newTitle, newDescription} = this.state;

    if (editable){
      return (
        <header className="itineraryHeader">
          <h2>
            <input value={newTitle || title} onChange={ev => this.setState({newTitle:ev.target.value})}></input>
          </h2>
          <h4>
            <textarea value={newDescription || description} onChange={ev => this.setState({newDescription:ev.target.value})}></textarea>
          </h4>
          <span className="update" onClick={ev => this.update()}>Update</span>
          <span className="cancel" onClick={ev => this.cancel()}>Cancel</span>
        </header>
      )
    } else {
      return (
        <header className="itineraryHeader">

          <div className="dropdown">
            <button className="toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="lists">
              <h1 className="walklistTitle">{title}<span className="dropdown-chevron"></span></h1>
            </button>
            <ul className="dropdown-menu" aria-labelledby="lists">
              {lists.map(list => <li key={list.id} onClick={ev => viewList(list.id, ev.target.value)}>{list.title}</li>)}
            </ul>
          </div>
          <h5 className="shareUrl"><a href="">janeswalk.org/TuckerMCL/itinerary</a></h5>
          <h4 className="walklistDescription">
            <textarea required="required" placeholder="Tell people about it! Start typing here to give your list some commentary." onChange={ev => this.setState({newDescription:ev.target.value})}></textarea>
            <span className="update">save</span>
          </h4>
        </header>
      )
    }
  };
};

ItineraryHeader.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  updateTitle: React.PropTypes.func,
  updateDescription: React.PropTypes.func,
};

ItineraryHeader.defaultProps = {
  title: 'My Itinerary',
  description: 'Test',
};
