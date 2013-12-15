function accentFold(inStr) {
  return inStr.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function(str,a,c,e,i,n,o,s,u,y,ae) { if(a) return 'a'; else if(c) return 'c'; else if(e) return 'e'; else if(i) return 'i'; else if(n) return 'n'; else if(o) return 'o'; else if(s) return 's'; else if(u) return 'u'; else if(y) return 'y'; else if(ae) return 'ae'; });
}

filterTypeahead = function( typeInput ) {
    $inputString = $(typeInput).val().replace(/\s+/g,' ');
    if($inputString.length > 0 ) {
      $("li>ul,li",$(typeInput).parents(".ccm-page-list-typeahead").first() ).removeClass("filtered").not(":icontains(" + $inputString + ")").addClass("filtered");
    } else { 
      $("li>ul,li",$(typeInput).parents(".ccm-page-list-typeahead").first()).removeClass("filtered");
    }
}

$(document).ready(function() {
  jQuery.expr[':'].icontains = function(obj, index, meta, stack){ return accentFold((obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase()).indexOf(accentFold(meta[3].toLowerCase())) >= 0; };
  filterTypeahead( "input.typeahead" );
  $('input.typeahead').keyup(function() {filterTypeahead( this ); });
  $('.ccm-page-list-typeahead > form').submit( function(e) {
    e.preventDefault();
    $firstchosen = $("ul>li>ul>li:not(.filtered):first > a", $(this).parent());
    if ($firstchosen.length) {
      $name = $firstchosen.text()
      $link = $firstchosen.attr('href')
      $('input.typeahead', $(this).parent() ).val($name);
      window.location.href=$link;
    }
  });
});


