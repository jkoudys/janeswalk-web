'use strict';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function ConnectFilters() {}
ConnectFilters.prototype = Object.create(React.Component.prototype, {
  constructor: {
    value: ConnectFilters
  },

  render: {
    value: function() {
      var _this = this;
      return (
        <div className="filterInputs">
          <ReactCSSTransitionGroup transitionName="fade">
            {this.props.filters.map(function(filter, i) {
              var input = null;
              var cbAndRemove = function(ev) {
                ev.preventDefault();
                filter.cb(filter.value);
                _this.props.remove(i);
              }

              var handleChange = function(ev) {
                _this.props.changeFilter(i, ev.target.value);
              }

              var cancel = function() {
                _this.props.remove(i);
              }

              if (filter.type === 'text') {
                input = <input type="text" placeholder={filter.placeholder} value={filter.text} onChange={handleChange} />;
              } else if (filter.type === 'select') {
                input = (
                  <select selected={filter.value} onChange={handleChange}>
                    {filter.options.map(function(option, i) {
                      return <option key={'option' + i} value={i}>{option.title}</option>
                      })}
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
});

module.exports = ConnectFilters;
