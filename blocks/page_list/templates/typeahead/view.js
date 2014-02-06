function accentFold(inStr) {
  return inStr.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function(str,a,c,e,i,n,o,s,u,y,ae) { if(a) return 'a'; else if(c) return 'c'; else if(e) return 'e'; else if(i) return 'i'; else if(n) return 'n'; else if(o) return 'o'; else if(s) return 's'; else if(u) return 'u'; else if(y) return 'y'; else if(ae) return 'ae'; });
}

$(document).ready(function() {

  /**
   * PageListTypeaheadView
   * 
   * @extends View
   */
  var PageListTypeaheadView = View.extend({

      /**
       * init
       * 
       * @public
       * @param  jQuery element
       * @return void
       */
      init: function(element) {
        this._element = element;
        this._extendJQueryPseudoSelectors();
        this._filterTypeahead();
        this._addEvents();
      },

      /**
       * _addEvents
       * 
       * @protected
       * @return    void
       */
      _addEvents: function() {
        var _this = this;
        this._element.keyup(function() {
          _this._filterTypeahead(this);
        });

        //
        $('.ccm-page-list-typeahead > form').submit(
          function(event) {
            event.preventDefault();
            var $firstchosen = $(
              'ul>li>ul>li:not(.filtered):first > a',
              $(this).parent()
            );

            // 
            if ($firstchosen.length) {
              var $name = $firstchosen.text(),
                $link = $firstchosen.attr('href');
              $('input.typeahead', $(this).parent()).val($name);
              window.location.href = $link;
            }
          }
        );
      },

      /**
       * _filterTypeahead
       * 
       * @protected
       * @return    void
       */
      _filterTypeahead: function() {
        var $inputString = this._element.val().replace(/\s+/g,' '),
          $typeahead = $(
            'li>ul,li',
            this._element.parents('.ccm-page-list-typeahead').first()
          );
        $typeahead.removeClass('filtered');
        if($inputString.length > 0 ) {
          $typeahead.not(':icontains(' + $inputString + ')').addClass('filtered');
        }
      },

      /**
       * _extendJQueryPseudoSelectors
       * 
       * @protected
       * @return    void
       */
      _extendJQueryPseudoSelectors: function() {
        jQuery.expr[':'].icontains = function(obj, index, meta, stack) {
          return accentFold((obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase()).indexOf(accentFold(meta[3].toLowerCase())) >= 0;
        };
      }
  });

  // Create view
  new PageListTypeaheadView($('input.typeahead'));
});
