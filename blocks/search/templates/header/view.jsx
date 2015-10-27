function getSearchResults(action, query, paginator) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', action + '&query=' + query +
           '&ccm_paging_p=' + encodeURIComponent(paginator.current_page + 1));
  xhr.onload = () => JanesWalk.event.emit('search.receive', JSON.parse(xhr.response));
  xhr.send();
}

class SearchHeaderBlock extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      query: '',
      results: [],
      paginator: {current_page: 0, number_of_pages: 0}
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    JanesWalk.event.on('search.receive', data => this.setState(data));
  }

  handleSubmit(e) {
    e.preventDefault();
    getSearchResults(this.props.action, this.state.query, this.state.paginator.current_page + 1);
  }

  handlePageSelect(pageID) {
    getSearchResults(this.props.action, this.state.query, Object.assign(
      {}, this.state.paginator, {current_page: pageID}
    ));
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
        <SearchResults results={this.state.results} paginator={this.state.paginator} onPageSelect={(i) => this.handlePageSelect(i)} />
      </form>
    );
  }
}

const QueryInput = props => (
  <input type="text" className="ccm-search-block-text" {...props} />
);

const SearchResults = props => (
  <div id="searchResults">
    {props.results.map(r => <SearchResult href={r.url} name={r.name} description={r.description} />)};
    <SearchPagination {...props} />
  </div>
);

const SearchResult = ({href, name, description}) => (
  <a href={href}>
    <div className="searchResult">
      <h4>{name}</h4>
      <p>
        {description}
      </p>
    </div>
  </a>
);

const SearchPagination = ({paginator, onPageSelect}) => {
  let Prev, Next;
  const pages = [];
  for (let i = 0, number; i < paginator.number_of_pages; i++) {
    let classes = 'numbers';
    if (i === paginator.current_page) {
      classes += ' currentPage active';
      number = <strong>{i + 1}</strong>;
    } else {
      number = <a onClick={() => onPageSelect(+i)}>{i + 1}</a>;
    }
    pages.push(<span className={classes}>{number}</span>);
  }

  if (paginator.current_page > 0) {
    Prev = <a onClick={() => onPageSelect(paginator.current_page - 1)}><i className="fa fa-arrow-left" /></a>;
  }

  if (paginator.current_page < paginator.number_of_pages - 1) {
    Next = <a onClick={() => onPageSelect(paginator.current_page + 1)}><i className="fa fa-arrow-right" /></a>;
  }

  return (
    <div className="ccm-pagination">
      {Prev}
      {pages}
      {Next}
    </div>
  );
};

/**
 * Render search block once init data ready
 */
JanesWalk.event.on('search.init', function(id, props) {
  const sbf = document.getElementById(id);
  React.render(<SearchHeaderBlock id="id" action={props.action} placeholder={props.placeholder} />, sbf);
});
