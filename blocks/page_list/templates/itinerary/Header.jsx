import React from 'react';

export default class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editable: false,
    }
  }

  getDefaultProps() {
    return {
      title:"My Itinerary",
      description:"View my Jane's Walk Itinerary!"
    }
  }

  propTypes() {
    return {
      title: React.PropTypes.string,
      description: React.PropTypes.string,
      updateTitle: React.PropTypes.func,
      updateDescription: React.PropTypes.func
    }
  }

  _update() {
  	 const {updateTitle, updateDescription} = this.props;
    const {editable} = this.state;

    updateTitle(this.refs.title.value);
    updateDescription(this.refs.description.value);
  	 this.setState({editable:!editable})
  }


  _toggleEdit() {
    this.setState({editable:!this.state.editable});
  }

  render() {
    const {title, description, lists, viewList} = this.props;
    let {editable} = this.state;

    if(editable){
      return (
        <header class="itineraryHeader">
          <h2>
            <input ref="title" value={title}>{title}</input>
          </h2>
          <h4>
            <input ref="description" value={description}>{description}</input>
          </h4>
          <span className="update" onClick={this._update}> </span>
          <span className="cancel" onClick={this._toggleEdit}> </span>
        </header>
      )
    } else {
      return (
        <header>

          <div className="itineraryHeader dropdown">
            <button className="toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="lists">
            	<h2>{title}</h2>
            </button>
            <ul className="dropdown-menu" aria-labelledby="lists">
            	{lists.map(list => <li key={list.id} onClick={(ev)=> viewList(list.id, ev.target.value)}>{list.title}</li>)}
            </ul>
          </div>

          <h4>{description}</h4>
          <span className="edit" onClick={this._toggleEdit}> </span>
        </header>
      )
    }
  };
};