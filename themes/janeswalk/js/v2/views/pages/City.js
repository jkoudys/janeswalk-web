
/**
 * CityPageView
 * 
 * @extends PageView
 */
var CityPageView = PageView.extend({

    /**
     * _filters
     * 
     * @protected
     * @var       jQuery|null (default: null)
     */
    _filters: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._filters = this._element.find('div.filters a');
        this._addTagClickEvents();
        this._addCreateWalkEvent();
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
     * _addTagClickEvents
     * 
     * @protected
     * @return    void
     */
    _addTagClickEvents: function() {
        var _this = this;
        this._filters.click(
            function(event) {
                event.preventDefault();
                $(event.target).toggleClass('active');

                // Start filtering if any filters are on
                if (_this._element.find('div.filters a.active').length > 0) {
                    _this._element.find('div.walk').addClass('hidden');
                    _this._element.find('div.filters a.active').each(
                        function(index, anchor) {
                            var tag = $(anchor).attr('data-tag');
                            _this._element.find('div.walk[data-tags*="' + (tag) + '"]').removeClass('hidden');
                        }
                    );
                } else {
                    _this._element.find('div.walk').removeClass('hidden');
                }
            }
        );
    }
});
