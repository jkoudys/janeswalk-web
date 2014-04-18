var _jws = {
  currentPage: 0,
  numberOfPages: 0,
  init: function(a,b,c) {
    _jws.results = document.getElementById("searchResults");
    _jws.resultTemplate = _jws.results.querySelector("a").cloneNode(true);
    _jws.paginatorTemplate = _jws.results.querySelector(".ccm-pagination").cloneNode(true);
    _jws.action = document.getElementById("ccm-search-header").getAttribute("action");
    // Clear out the results of the templates
    for(;_jws.results.lastChild;_jws.results.removeChild(_jws.results.lastChild));
    _jws.results.parentNode.onsubmit = function(evt) {
      _jws.query = this.elements["query"].value;
      $.getJSON(_jws.action, {"query": _jws.query}, _jws.updateResults);
      evt.preventDefault();
    }
  },
  updateResults: function(data) {
    var pagination = _jws.paginatorTemplate.cloneNode(true);
    for(;_jws.results.lastChild;_jws.results.removeChild(_jws.results.lastChild));
    for(var i = 0; i < data.results.length; i++) {
      var result = _jws.resultTemplate.cloneNode(true);
      result.setAttribute("href", data.results[i].url);
      result.querySelector("h4").textContent = data.results[i].name || "";
      result.querySelector("p").innerHTML = data.results[i].description || "";
      _jws.results.appendChild(result);
    }
    _jws.currentPage = data.paginator.current_page;
    _jws.numberOfPages = data.paginator.number_of_pages;
    for(var i = 0; i < data.paginator.number_of_pages; i++) {
      var page = document.createElement("span");
      page.classList.add("numbers");
      if(i === _jws.currentPage) {
        var cur = document.createElement("strong");
        page.classList.add("currentPage","active");
        cur.textContent = i + 1;
        page.appendChild(cur);
      }
      else {
        var link = document.createElement("a");
        link.textContent = i + 1;
        link.onclick = function() {
          _jws.currentPage = this.textContent;
          $.getJSON(_jws.action, {"query": _jws.query, "ccm_paging_p": _jws.currentPage}, _jws.updateResults);
        }
        page.appendChild(link);
      }
      pagination.insertBefore(page, pagination.querySelector(".next"));
    }
    pagination.querySelector(".prev").onclick = function() {
      (_jws.currentPage == 0) ||
        $.getJSON(_jws.action, {"query": _jws.query, "ccm_paging_p": _jws.currentPage}, _jws.updateResults);
    }
    pagination.querySelector(".next").onclick = function() {
      (_jws.currentPage == _jws.numberOfPages - 1) ||
        $.getJSON(_jws.action, {"query": _jws.query, "ccm_paging_p": _jws.currentPage + 2}, _jws.updateResults);
    }

    _jws.results.appendChild(pagination);
  }
};
document.addEventListener( "DOMContentLoaded", _jws.init );
