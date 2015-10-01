const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class ConnectFilters extends React.Component {
  render() {
    return (
      <div className="filterInputs">
        <ReactCSSTransitionGroup transitionName="fade">
          {this.props.filters.map((filter, i) => {
            const cbAndRemove = ev => {
              ev.preventDefault();
              filter.cb(filter.value);
              this.props.remove(i);
            };
            const handleChange = ev => this.props.changeFilter(i, ev.target.value);
            const cancel = () => this.props.remove(i);
            let input = null;

            if (filter.type === 'text') {
              input = <input type="text" placeholder={filter.placeholder} value={filter.text} onChange={handleChange} />;
            } else if (filter.type === 'select') {
              input = (
                <select selected={filter.value} onChange={handleChange}>
                  {filter.options.map((option, i) => <option key={'option' + i} value={i}>{option.title}</option>)}
                </select>
              );
            }

            // FIXME: these spans are rather silly, but needed to play nice with bootstrap
            return (
              <form className="filter" onSubmit={cbAndRemove}>
                <i className={filter.icon} />
                <span className="input">
                  {input}
                </span>
                <span className="button">
                  <input type="submit" value={'Go'} />
                </span>
                <span className="button">
                  <input type="button" value={'Cancel'} onClick={cancel} />
                </span>
              </form>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
