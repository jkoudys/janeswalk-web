const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default ({filters, remove, changeFilter}) => (
  <div className="filterInputs">
    <ReactCSSTransitionGroup transitionName="fade">
      {filters.map((filter, i) => {
        const cbAndRemove = ev => {
          ev.preventDefault();
          filter.cb(filter.value);
          remove(i);
        };
        const handleChange = ev => changeFilter(i, ev.target.value);
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
              <input type="button" value={'Cancel'} onClick={() => remove(i)} />
            </span>
          </form>
          );
      })}
    </ReactCSSTransitionGroup>
  </div>
);
