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

		_update(){
			 const {updateTitle, updateDescription} = this.props;

				updateTitle(this.refs.title.value);
				updateDescription(this.refs.description.value);
			 this.setState({editable:!this.state.editable})
		}

		render(){
				const {title, description} = this.props;
				let {editable} = this.state;

				if(editable){
						return (
								<header>
										<h2>{title}</h2>
										<h4>{description}</h4>
										<span className="glyphicon glyphicon-pencil" onClick={this.setState({editable:!editable})}> </span>
								</header>
						)
				} else {
						return (
								<header>
									 <h2>
										  <input ref="title" value={title}>{title}</input>
									 </h2>
										<h4>
												<input ref="description" value={description}>{description}</input>
										</h4>
										<span className="glyphicon glyphicon-ok" onClick={this._update}> </span>
										<span className="glyphicon glyphicon-remove" onClick={this.setState({editable:!editable})}> </span>
								</header>
						)
				}
		};
};