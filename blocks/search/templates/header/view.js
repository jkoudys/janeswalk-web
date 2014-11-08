document.addEventListener('DOMContentLoaded', function() {
  var SearchHeaderBlock = React.createClass({displayName: 'SearchHeaderBlock',
    getInitialState: function() {
      return {
        query: '',
        results: [],
        paginator: {current_page: 0, number_of_pages: 0}
      };
    },
    getSearchResults: function() {
      var action = this.props.action;
      var searchForm = this.refs.search;
      $.ajax({
        url: action,
        dataType: 'json',
        data: { query: this.refs.query.state.value, ccm_paging_p: this.state.paginator.current_page + 1 },
        success: function(data) {
          this.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(action, status, err.toString());
        }.bind(this)
      });
    },
    handleSubmit: function(e) {
      e.preventDefault();
      this.getSearchResults();
    },
    handlePageSelect: function(pageID) {
      this.state.paginator.current_page = pageID;
      this.getSearchResults();
    },
    render: function() {
      return (
        React.createElement("form", {onSubmit: this.handleSubmit, ref: "search", action: this.props.action, method: "get", className: "ccm-search-block-form", id: "ccm-search-header"}, 
          React.createElement("input", {name: "search_paths[]", type: "hidden"}), 
          React.createElement("fieldset", {className: "search"}, 
            React.createElement(QueryInput, {ref: "query", placeholder: this.props.placeholder}), 
            React.createElement("button", {type: "submit"}, "Go")
          ), 
          React.createElement(SearchResults, {results: this.state.results, paginator: this.state.paginator, onPageSelect: this.handlePageSelect})
        )
      );
    }
  });

  var QueryInput = React.createClass({displayName: 'QueryInput',
    getInitialState: function() {
      return {value: this.props.value || ''};
    },
    handleChange: function(e) {
      this.setState({value: e.target.value});
    },
    render: function() {
      return (
        React.createElement("input", {type: "text", className: "ccm-search-block-text", placeholder: this.props.placeholder, value: this.state.value, onChange: this.handleChange})
      );
    }
  });

  var SearchResults = React.createClass({displayName: 'SearchResults',
    render: function() {
      var results = this.props.results;

      return (
        React.createElement("div", {id: "searchResults"}, 
          results.map(function(result) {
            return React.createElement(SearchResult, {href: result.url, name: result.name, description: result.description});
          }), 
          React.createElement(SearchPagination, {paginator: this.props.paginator, onPageSelect: this.props.onPageSelect})
        )
      );
    }
  });

  var SearchResult = React.createClass({displayName: 'SearchResult',
    render: function() {
      return (
        React.createElement("a", {href: this.props.href}, 
          React.createElement("div", {className: "searchResult"}, 
            React.createElement("h4", null, this.props.name), 
            React.createElement("p", null, 
              this.props.description
            )
          )
        )
      );
    }
  });

  var SearchPagination = React.createClass({displayName: 'SearchPagination',
    render: function() {
      var pages = [];
      var paginator = this.props.paginator;
      for (var i = 0, classes = ['numbers'], number; i < paginator.number_of_pages; i++) {
        if (i === this.props.paginator.current_page) {
          classes.push('currentPage');
          classes.push('active');
          number = React.createElement("strong", null, i + 1);
        } else {
          number = React.createElement(SearchPageLink, {page: i, onClick: this.props.onPageSelect});
        }
        pages.push(React.createElement("span", {className: classes}, number));
      };

      if (pages.length) {
        return (
          React.createElement("div", {className: "ccm-pagination"}, 
             React.createElement("span", {className: "prev"}, React.createElement("a", null, React.createElement("i", {className: "fa fa-angle-left"}))), 
             pages, 
             React.createElement("span", {className: "next"}, React.createElement("a", null, React.createElement("i", {className: "fa fa-angle-right"})))
          )
        );
      } else {
        return null;
      }
    }
  });

  var SearchPageLink = React.createClass({displayName: 'SearchPageLink',
    getInitialState: function() {
      return {page: -1};
    },
    handleClick: function() {
      this.props.onClick(this.state.page);
    },
    render: function() {
      this.state.page = parseInt(this.props.page);
      return (
        React.createElement("a", {onClick: this.handleClick}, this.state.page + 1)
      );
    }
  });
  var sbf = document.querySelector('.ccm-search-block-form');
  React.renderComponent(React.createElement(SearchHeaderBlock, {action: sbf.dataset.action, placeholder: sbf.dataset.placeholder}), sbf);
});
