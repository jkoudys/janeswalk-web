(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getSearchResults(action, query, paginator) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', action + '&query=' + query + '&ccm_paging_p=' + encodeURIComponent(paginator.current_page + 1));
  xhr.onload = function () {
    return JanesWalk.event.emit('search.receive', JSON.parse(xhr.response));
  };
  xhr.send();
}

var SearchHeaderBlock = (function (_React$Component) {
  _inherits(SearchHeaderBlock, _React$Component);

  function SearchHeaderBlock() {
    var _this = this;

    _classCallCheck(this, SearchHeaderBlock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(SearchHeaderBlock.prototype), 'constructor', this).apply(this, args);
    this.state = {
      query: '',
      results: [],
      paginator: { current_page: 0, number_of_pages: 0 }
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    JanesWalk.event.on('search.receive', function (data) {
      return _this.setState(data);
    });
  }

  _createClass(SearchHeaderBlock, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      getSearchResults(this.props.action, this.state.query, this.state.paginator.current_page + 1);
    }
  }, {
    key: 'handlePageSelect',
    value: function handlePageSelect(pageID) {
      getSearchResults(this.props.action, this.state.query, Object.assign({}, this.state.paginator, { current_page: pageID }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return {
        $$typeof: _typeofReactElement,
        type: 'form',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'input',
            key: null,
            ref: null,
            props: {
              name: 'search_paths[]',
              type: 'hidden'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: QueryInput,
                key: null,
                ref: null,
                props: _defaultProps(QueryInput.defaultProps, {
                  placeholder: this.props.placeholder,
                  value: this.state.query,
                  onChange: function (e) {
                    return _this2.setState({ query: e.target.value });
                  }
                }),
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'button',
                key: null,
                ref: null,
                props: {
                  children: 'Go',
                  type: 'submit'
                },
                _owner: null
              }],
              className: 'search'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: SearchResults,
            key: null,
            ref: null,
            props: _defaultProps(SearchResults.defaultProps, {
              results: this.state.results,
              paginator: this.state.paginator,
              onPageSelect: function (i) {
                return _this2.handlePageSelect(i);
              }
            }),
            _owner: null
          }],
          onSubmit: this.handleSubmit,
          action: this.props.action,
          method: 'get',
          className: 'ccm-search-block-form',
          id: 'ccm-search-header'
        },
        _owner: null
      };
    }
  }]);

  return SearchHeaderBlock;
})(React.Component);

var QueryInput = function QueryInput(props) {
  return React.createElement('input', _extends({ type: 'text', className: 'ccm-search-block-text' }, props));
};

var SearchResults = function SearchResults(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'div',
    key: null,
    ref: null,
    props: {
      children: [props.results.map(function (r) {
        return {
          $$typeof: _typeofReactElement,
          type: SearchResult,
          key: null,
          ref: null,
          props: _defaultProps(SearchResult.defaultProps, {
            href: r.url,
            name: r.name,
            description: r.description
          }),
          _owner: null
        };
      }), ';', React.createElement(SearchPagination, props)],
      id: 'searchResults'
    },
    _owner: null
  };
};

var SearchResult = function SearchResult(_ref) {
  var href = _ref.href;
  var name = _ref.name;
  var description = _ref.description;
  return {
    $$typeof: _typeofReactElement,
    type: 'a',
    key: null,
    ref: null,
    props: {
      children: {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'h4',
            key: null,
            ref: null,
            props: {
              children: name
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'p',
            key: null,
            ref: null,
            props: {
              children: description
            },
            _owner: null
          }],
          className: 'searchResult'
        },
        _owner: null
      },
      href: href
    },
    _owner: null
  };
};

var SearchPagination = function SearchPagination(_ref2) {
  var paginator = _ref2.paginator;
  var onPageSelect = _ref2.onPageSelect;

  var Prev = undefined,
      Next = undefined;
  var pages = [];

  var _loop = function (i, _number) {
    var classes = 'numbers';
    if (i === paginator.current_page) {
      classes += ' currentPage active';
      _number = {
        $$typeof: _typeofReactElement,
        type: 'strong',
        key: null,
        ref: null,
        props: {
          children: i + 1
        },
        _owner: null
      };
    } else {
      _number = {
        $$typeof: _typeofReactElement,
        type: 'a',
        key: null,
        ref: null,
        props: {
          children: i + 1,
          onClick: function () {
            return onPageSelect(+i);
          }
        },
        _owner: null
      };
    }
    pages.push({
      $$typeof: _typeofReactElement,
      type: 'span',
      key: null,
      ref: null,
      props: {
        children: _number,
        className: classes
      },
      _owner: null
    });
    number = _number;
  };

  for (var i = 0, number = undefined; i < paginator.number_of_pages; i++) {
    _loop(i, number);
  }

  if (paginator.current_page > 0) {
    Prev = {
      $$typeof: _typeofReactElement,
      type: 'a',
      key: null,
      ref: null,
      props: {
        children: {
          $$typeof: _typeofReactElement,
          type: 'i',
          key: null,
          ref: null,
          props: {
            className: 'fa fa-arrow-left'
          },
          _owner: null
        },
        onClick: function () {
          return onPageSelect(paginator.current_page - 1);
        }
      },
      _owner: null
    };
  }

  if (paginator.current_page < paginator.number_of_pages - 1) {
    Next = {
      $$typeof: _typeofReactElement,
      type: 'a',
      key: null,
      ref: null,
      props: {
        children: {
          $$typeof: _typeofReactElement,
          type: 'i',
          key: null,
          ref: null,
          props: {
            className: 'fa fa-arrow-right'
          },
          _owner: null
        },
        onClick: function () {
          return onPageSelect(paginator.current_page + 1);
        }
      },
      _owner: null
    };
  }

  return {
    $$typeof: _typeofReactElement,
    type: 'div',
    key: null,
    ref: null,
    props: {
      children: [Prev, pages, Next],
      className: 'ccm-pagination'
    },
    _owner: null
  };
};

/**
 * Render search block once init data ready
 */
JanesWalk.event.on('search.init', function (id, props) {
  var sbf = document.getElementById(id);
  React.render({
    $$typeof: _typeofReactElement,
    type: SearchHeaderBlock,
    key: null,
    ref: null,
    props: _defaultProps(SearchHeaderBlock.defaultProps, {
      id: 'id',
      action: props.action,
      placeholder: props.placeholder
    }),
    _owner: null
  }, sbf);
});


},{}]},{},[1]);
