/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	    var _Object$getPrototypeO;

	    _classCallCheck(this, SearchHeaderBlock);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchHeaderBlock)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.state = {
	      query: '',
	      results: [],
	      paginator: { current_page: 0, number_of_pages: 0 }
	    };
	    _this.handleSubmit = _this.handleSubmit.bind(_this);

	    JanesWalk.event.on('search.receive', function (data) {
	      return _this.setState(data);
	    });
	    return _this;
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

	      return React.createElement(
	        'form',
	        {
	          onSubmit: this.handleSubmit,
	          action: this.props.action,
	          method: 'get',
	          className: 'ccm-search-block-form',
	          id: 'ccm-search-header' },
	        React.createElement('input', { name: 'search_paths[]', type: 'hidden' }),
	        React.createElement(
	          'fieldset',
	          { className: 'search' },
	          React.createElement(QueryInput, {
	            placeholder: this.props.placeholder,
	            value: this.state.query,
	            onChange: function onChange(e) {
	              return _this2.setState({ query: e.target.value });
	            }
	          }),
	          React.createElement(
	            'button',
	            { type: 'submit' },
	            'Go'
	          )
	        ),
	        React.createElement(SearchResults, { results: this.state.results, paginator: this.state.paginator, onPageSelect: function onPageSelect(i) {
	            return _this2.handlePageSelect(i);
	          } })
	      );
	    }
	  }]);

	  return SearchHeaderBlock;
	})(React.Component);

	var QueryInput = function QueryInput(props) {
	  return React.createElement('input', _extends({ type: 'text', className: 'ccm-search-block-text' }, props));
	};

	var SearchResults = function SearchResults(props) {
	  return React.createElement(
	    'div',
	    { id: 'searchResults' },
	    props.results.map(function (r) {
	      return React.createElement(SearchResult, { href: r.url, name: r.name, description: r.description });
	    }),
	    ';',
	    React.createElement(SearchPagination, props)
	  );
	};

	var SearchResult = function SearchResult(_ref) {
	  var href = _ref.href;
	  var name = _ref.name;
	  var description = _ref.description;
	  return React.createElement(
	    'a',
	    { href: href },
	    React.createElement(
	      'div',
	      { className: 'searchResult' },
	      React.createElement(
	        'h4',
	        null,
	        name
	      ),
	      React.createElement(
	        'p',
	        null,
	        description
	      )
	    )
	  );
	};

	var SearchPagination = function SearchPagination(_ref2) {
	  var paginator = _ref2.paginator;
	  var onPageSelect = _ref2.onPageSelect;

	  var Prev = undefined,
	      Next = undefined;
	  var pages = [];

	  var _loop = function _loop(i, _number) {
	    var classes = 'numbers';
	    if (i === paginator.current_page) {
	      classes += ' currentPage active';
	      _number = React.createElement(
	        'strong',
	        null,
	        i + 1
	      );
	    } else {
	      _number = React.createElement(
	        'a',
	        { onClick: function onClick() {
	            return onPageSelect(+i);
	          } },
	        i + 1
	      );
	    }
	    pages.push(React.createElement(
	      'span',
	      { className: classes },
	      _number
	    ));
	    number = _number;
	  };

	  for (var i = 0, number; i < paginator.number_of_pages; i++) {
	    _loop(i, number);
	  }

	  if (paginator.current_page > 0) {
	    Prev = React.createElement(
	      'a',
	      { onClick: function onClick() {
	          return onPageSelect(paginator.current_page - 1);
	        } },
	      React.createElement('i', { className: 'fa fa-arrow-left' })
	    );
	  }

	  if (paginator.current_page < paginator.number_of_pages - 1) {
	    Next = React.createElement(
	      'a',
	      { onClick: function onClick() {
	          return onPageSelect(paginator.current_page + 1);
	        } },
	      React.createElement('i', { className: 'fa fa-arrow-right' })
	    );
	  }

	  return React.createElement(
	    'div',
	    { className: 'ccm-pagination' },
	    Prev,
	    pages,
	    Next
	  );
	};

	/**
	 * Render search block once init data ready
	 */
	JanesWalk.event.on('search.init', function (id, props) {
	  var sbf = document.getElementById(id);
	  React.render(React.createElement(SearchHeaderBlock, { id: 'id', action: props.action, placeholder: props.placeholder }), sbf);
	});

/***/ }
/******/ ]);