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

    debugger;

    updateTitle(newTitle || title);
    updateDescription(newDescription || description);

    this.setState({
      //editable:!editable,
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
          <select className="itinerary-lists" onChange={ev => { viewList(ev.target.value) }}>
            {lists.map(list => <option key={list.id} selected={list.title === title}>{list.title}</option>)}
          </select>
          <h5 className="shareUrl"><a href="">janeswalk.org/TuckerMCL/itinerary</a></h5>
          <h4 className="walklistDescription">
            <textarea required="required" value={newDescription || description} placeholder="Tell people about it! Start typing here to give your list some commentary." onChange={ev => this.setState({newDescription:ev.target.value})}></textarea>
            <span className="update" onClick={ev => this.update()}>save</span>
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
