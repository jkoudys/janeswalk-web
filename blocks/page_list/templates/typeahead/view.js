
$(document).ready(function() {

  /**
   * PageListTypeaheadView
   * 
   * @extends View
   */
  var PageListTypeaheadView = View.extend({

    /**
     * $_input
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    $_input: null,

    /**
     * $_form
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    $_form: null,

    /**
     * $_list
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    $_list: null,

    /**
     * $_searchable
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    $_searchable: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {

      // Element references
      this.$_element = element;
      this.$_input = this.$_element.find('input.typeahead').first();
      this.$_form = this.$_element.find('form').first();
      this.$_list = this.$_element.find('ul').first();
      this.$_searchable = this.$_list.find('li > ul, li');

      // Constructor calls
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

      // Scope
      var _this = this;

      // Filter when text is being typed
      this.$_input.keyup(function() {
        _this._filterTypeahead();
      });

      // Enter key pressed or go button clicked
      this.$_form.submit(
        function(event) {
          event.preventDefault();
          var $chosen = _this.$_element.find('ul>li>ul>li:not(.filtered):first > a');

          // Link found
          if ($chosen.length) {
            var $name = $chosen.text(),
              $link = $chosen.attr('href');
            _this.$_input.val($name);
            window.location.href = $link;
          }
        }
      );
    },

    /**
     * _convertAccents
     * 
     * @protected
     * @param     String str
     * @return    String
     */
    _convertAccents: function(str) {
      return str.replace(
        /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
        function(str,a,c,e,i,n,o,s,u,y,ae) {
          if(a) return 'a'; else if(c) return 'c'; else if(e) return 'e'; else if(i) return 'i'; else if(n) return 'n'; else if(o) return 'o'; else if(s) return 's'; else if(u) return 'u'; else if(y) return 'y'; else if(ae) return 'ae';
        }
      );
    },

    /**
     * _extendJQueryPseudoSelectors
     * 
     * @protected
     * @return    void
     */
    _extendJQueryPseudoSelectors: function() {
      var _this = this;
      jQuery.expr[':'].icontains = function(obj, index, meta, stack) {
        return _this._convertAccents((obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase()).indexOf(_this._convertAccents(meta[3].toLowerCase())) >= 0;
      };
    },

    /**
     * _filterTypeahead
     * 
     * @protected
     * @return    void
     */
    _filterTypeahead: function() {
      var _this = this,
        inputVal = this.$_input.val().replace(/\s+/g,' ');
      this.$_searchable.removeClass('filtered');
      if(inputVal.length > 0) {
        _this.$_searchable.not(':icontains(' + inputVal + ')').addClass('filtered');
      }
    }
  });

  // Create view
  var $typeahead = $('div.ccm-page-list-typeahead').first();
  (new PageListTypeaheadView($typeahead));
});
