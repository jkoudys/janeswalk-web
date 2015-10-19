function getSearchResults(action, query, paginator) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', action + '?query=' + encodeURIComponent(query) +
           '&ccm_paging_p=' + encodeURIComponent(paginator.current_page + 1));
  xhr.onload = () => JanesWalk.event.emit('search.receive', JSON.parse(xhr.response));
  xhr.send();
}

class SearchHeaderBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      results: [],
      paginator: {current_page: 0, number_of_pages: 0}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);

    JanesWalk.event.on('search.receive', data => this.setState(data));
  }

  handleSubmit(e) {
    e.preventDefault();
    getSearchResults(this.props.action, this.state.query, this.state.paginator.current_page + 1);
  }

  handlePageSelect(pageID) {
    getSearchResults(this.props.action, this.state.query, pageID + 1);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        action={this.props.action}
        method="get"
        className="ccm-search-block-form"
        id="ccm-search-header">
        <input name="search_paths[]" type="hidden" />
        <fieldset className="search">
          <QueryInput
            placeholder={this.props.placeholder}
            value={this.state.query}
            onChange={(e) => this.setState({query: e.target.value})}
          />
          <button type="submit">Go</button>
        </fieldset>
        <SearchResults results={this.state.results} paginator={this.state.paginator} onPageSelect={this.handlePageSelect} />
      </form>
    );
  }
}

const QueryInput = props => (
  <input type="text" className="ccm-search-block-text" {...props} />
);

const SearchResults = props => (
  <div id="searchResults">
    {props.results.map(result => <SearchResult href={result.url} name={result.name} description={result.description} />)};
    <SearchPagination {...props} />
  </div>
);

const SearchResult = props => (
  <a href={props.href}>
    <div className="searchResult">
      <h4>{props.name}</h4>
      <p>
        {props.description}
      </p>
    </div>
  </a>
);

const SearchPagination = props => {
  const pages = [];
  const classes = ['numbers'];
  for (let i = 0, number; i < props.paginator.number_of_pages; i++) {
    if (i === props.paginator.current_page) {
      classes.push('currentPage');
      classes.push('active');
      number = <strong>{i + 1}</strong>;
    } else {
      number = <a onClick={() => this.props.onPageSelect(+i)}>{i + 1}</a>;
    }
    pages.push(<span className={classes}>{number}</span>);
  }

  return (
    <div className="ccm-pagination">
      {pages}
    </div>
  );
};

/**
 * Bind our event listener
 */
JanesWalk.event.on('search.init', function(id, props) {
  const sbf = document.getElementById(id);
  React.render(<SearchHeaderBlock id="id" action={props.action} placeholder={props.placeholder} />, sbf);
});
