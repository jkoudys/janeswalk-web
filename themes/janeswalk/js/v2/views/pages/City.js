
/**
 * CityPageView
 * 
 * @extends PageView
 */
var CityPageView = PageView.extend({

    /**
     * _cards
     * 
     * @protected
     * @var       jQuery|null (default: null)
     */
    _cards: null,

    /**
     * _data
     * 
     * @protected
     * @var       Array|null (default: null)
     */
    _data: null,

    /**
     * _initiative
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _initiative: null,

    /**
     * _theme
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _theme: null,

    /**
     * _ward
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _ward: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._cards = this._element.find('.walk');
        this._data = JanesWalkData.walks;
        this._resetSelectElements();
        this._addCreateWalkEvent();
        this._addFilterEvents();
    },

    /**
     * _resetSelectElements
     * 
     * @protected
     * @return    void
     */
    _resetSelectElements: function() {
        this._element.find('div.filters select').each(
            function(index, element) {
                $(element).val('*');
            }
        );
    },

    /**
     * _addCreateWalkEvent
     * 
     * @protected
     * @return    void
     */
    _addCreateWalkEvent: function() {
        var _this = this,
            $btn = this._element.find('.create-walk');
        $btn.click(
            function(event) {
                event.preventDefault();
                if (_this._element.find('a[href="/index.php/login/logout/"]').length === 0) {
                    _this._element.find('.overlay').show();
                } else {
                    location.href = $(this).attr('href');
                }
            }
        );
    },

    /**
     * _filterCards
     * 
     * @protected
     * @return    void
     */
    _filterCards: function() {
        var _this = this,
            show,
            showing = 0;
        this._cards.hide();
        $(this._data).each(
            function(index, data) {
                show = true;

                // wards
                if (
                    jQuery.inArray(_this._ward, data.wards) === -1
                    && _this._ward !== '*'
                ) {
                    show = false
                }

                // themes
                if (
                    jQuery.inArray(_this._theme, data.themes) === -1
                    && _this._theme !== '*'
                ) {
                    show = false
                }

                // initiatives
                if (
                    jQuery.inArray(_this._initiative, data.initiatives) === -1
                    && _this._initiative !== '*'
                ) {
                    show = false
                }

                // toggle
                if (show === true) {
                    ++showing;
                    $(_this._cards[index]).show();
                }
            }
        );

        // Empty state
        this._element.find('.empty').addClass('hidden');
        if (showing === 0) {
            this._element.find('.empty').removeClass('hidden');
        }
    },

    /**
     * _addFilterEvents
     * 
     * @protected
     * @return    void
     */
    _addFilterEvents: function() {
        var _this = this;
        this._element.find('div.filters select').change(
            function(event) {
                event.preventDefault();
                _this._ward = _this._element.find('select[name="ward"]').val();
                _this._theme = _this._element.find('select[name="theme"]').val();
                _this._initiative = _this._element.find('select[name="initiative"]').val();
                _this._filterCards();
            }
        );
    }
});
