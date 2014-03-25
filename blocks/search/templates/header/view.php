<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
<?= $error ?: null ?>
<script>
var JanesWalk = JanesWalk || {};
JanesWalk.search = {
  action: "<?= str_replace('&amp;','&',$this->action('resultsJson')) ?>",
  currentPage: 0,
  numberOfPages: 0,
  init: function() {
    JanesWalk.search.results = document.getElementById("searchResults");
    JanesWalk.search.resultTemplate = JanesWalk.search.results.querySelector("a").cloneNode(true);
    JanesWalk.search.paginatorTemplate = JanesWalk.search.results.querySelector(".ccm-pagination").cloneNode(true);
    // Clear out the results of the templates
    for(;JanesWalk.search.results.lastChild;JanesWalk.search.results.removeChild(JanesWalk.search.results.lastChild));
    JanesWalk.search.results.parentNode.onsubmit = function(evt) {
      JanesWalk.search.query = this.elements["query"].value;
      $.getJSON(JanesWalk.search.action, {"query": JanesWalk.search.query}, JanesWalk.search.updateResults);
      evt.preventDefault();
    }
  },
  updateResults: function(data) {
    var pagination = JanesWalk.search.paginatorTemplate.cloneNode(true);
    for(;JanesWalk.search.results.lastChild;JanesWalk.search.results.removeChild(JanesWalk.search.results.lastChild));
    for(var i = 0; i < data.results.length; i++) {
      var result = JanesWalk.search.resultTemplate.cloneNode(true);
      result.setAttribute("href", data.results[i].url);
      result.querySelector("h4").textContent = data.results[i].name || "";
      result.querySelector("p").innerHTML = data.results[i].description || "";
      JanesWalk.search.results.appendChild(result);
    }
    JanesWalk.search.currentPage = data.paginator.current_page;
    JanesWalk.search.numberOfPages = data.paginator.number_of_pages;
    for(var i = 0; i < data.paginator.number_of_pages; i++) {
      var page = document.createElement("span");
      page.classList.add("numbers");
      if(i === JanesWalk.search.currentPage) {
        var cur = document.createElement("strong");
        page.classList.add("currentPage","active");
        cur.textContent = i + 1;
        page.appendChild(cur);
      }
      else {
        var link = document.createElement("a");
        link.textContent = i + 1;
        link.onclick = function() {
          JanesWalk.search.currentPage = this.textContent;
          $.getJSON(JanesWalk.search.action, {"query": JanesWalk.search.query, "ccm_paging_p": JanesWalk.search.currentPage}, JanesWalk.search.updateResults);
        }
        page.appendChild(link);
      }
      pagination.insertBefore(page, pagination.querySelector(".next"));
    }
    pagination.querySelector(".prev").onclick = function() {
      (JanesWalk.search.currentPage == 0) ||
        $.getJSON(JanesWalk.search.action, {"query": JanesWalk.search.query, "ccm_paging_p": JanesWalk.search.currentPage}, JanesWalk.search.updateResults);
    }
    pagination.querySelector(".next").onclick = function() {
      (JanesWalk.search.currentPage == JanesWalk.search.numberOfPages - 1) ||
        $.getJSON(JanesWalk.search.action, {"query": JanesWalk.search.query, "ccm_paging_p": JanesWalk.search.currentPage + 2}, JanesWalk.search.updateResults);
    }

    JanesWalk.search.results.appendChild(pagination);
  }
};

$(document).ready(JanesWalk.search.init);

</script>
<form action="<?=$this->url( $resultTargetURL )?>" method="get" class="ccm-search-block-form" id="ccm-search-header">
	<?php if(strlen($query)==0){ ?>
	<input name="search_paths[]" type="hidden" value="<?=htmlentities($baseSearchPath, ENT_COMPAT, APP_CHARSET) ?>" />
	<?php  } else if (is_array($_REQUEST['search_paths'])) { 
		foreach($_REQUEST['search_paths'] as $search_path){ ?>
			<input name="search_paths[]" type="hidden" value="<?=htmlentities($search_path, ENT_COMPAT, APP_CHARSET) ?>" />
	<?php   }
	} ?>
  <fieldset class="search">
    <input name="query" type="text" value="<?=htmlentities($query, ENT_COMPAT, APP_CHARSET)?>" class="ccm-search-block-text" placeholder="<?=$title?>" />
    <input name="submit" type="submit" value="<?=$buttonText?>" class="ccm-search-block-submit" />
  </fieldset>
  <div id="searchResults">
    <a>
      <div class="searchResult">
        <h4></h4>
        <p>
        </p>
      </div>
    </a>
    <div class="ccm-pagination">	
       <span class="prev"><a><i class="icon-angle-left"></i></a></span>
       <span class="next"><a><i class="icon-angle-right"></i></a></span>
    </div>
  </div>
</form>
