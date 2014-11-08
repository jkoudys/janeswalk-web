document.addEventListener('DOMContentLoaded', function() {
  var SearchHeaderBlock = React.createClass({
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
        <form onSubmit={this.handleSubmit} ref="search" action={this.props.action} method="get" className="ccm-search-block-form" id="ccm-search-header">
          <input name="search_paths[]" type="hidden" />
          <fieldset className="search">
            <QueryInput ref="query" placeholder={this.props.placeholder} />
            <button type="submit">Go</button>
          </fieldset>
          <SearchResults results={this.state.results} paginator={this.state.paginator} onPageSelect={this.handlePageSelect} />
        </form>
      );
    }
  });

  var QueryInput = React.createClass({
    getInitialState: function() {
      return {value: this.props.value || ''};
    },
    handleChange: function(e) {
      this.setState({value: e.target.value});
    },
    render: function() {
      return (
        <input type="text" className="ccm-search-block-text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
      );
    }
  });

  var SearchResults = React.createClass({
    render: function() {
      var results = this.props.results;

      return (
        <div id="searchResults">
          {results.map(function(result) {
            return <SearchResult href={result.url} name={result.name} description={result.description} />;
          })}
          <SearchPagination paginator={this.props.paginator} onPageSelect={this.props.onPageSelect} />
        </div>
      );
    }
  });

  var SearchResult = React.createClass({
    render: function() {
      return (
        <a href={this.props.href}>
          <div className="searchResult">
            <h4>{this.props.name}</h4>
            <p>
              {this.props.description}
            </p>
          </div>
        </a>
      );
    }
  });

  var SearchPagination = React.createClass({
    render: function() {
      var pages = [];
      var paginator = this.props.paginator;
      for (var i = 0, classes = ['numbers'], number; i < paginator.number_of_pages; i++) {
        if (i === this.props.paginator.current_page) {
          classes.push('currentPage');
          classes.push('active');
          number = <strong>{i + 1}</strong>;
        } else {
          number = <SearchPageLink page={i} onClick={this.props.onPageSelect} />;
        }
        pages.push(<span className={classes}>{number}</span>);
      };

      if (pages.length) {
        return (
          <div className="ccm-pagination">
             {pages}
          </div>
        );
      } else {
        return null;
      }
    }
  });

  var SearchPageLink = React.createClass({
    getInitialState: function() {
      return {page: -1};
    },
    handleClick: function() {
      this.props.onClick(this.state.page);
    },
    render: function() {
      this.state.page = parseInt(this.props.page);
      return (
        <a onClick={this.handleClick}>{this.state.page + 1}</a>
      );
    }
  });
  var sbf = document.querySelector('.ccm-search-block-form');
  React.renderComponent(<SearchHeaderBlock action={sbf.dataset.action} placeholder={sbf.dataset.placeholder} />, sbf);
});
