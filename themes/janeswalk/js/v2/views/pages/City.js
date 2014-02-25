
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
     * @var       jQuery (default: null)
     */
    _cards: null,

    /**
     * _filters
     * 
     * @protected
     * @var       Object (default: {})
     */
    _filters: {},

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._cards = this._element.find('div.walk');
        this._filters.regions = this._element.find('a[data-filter="region"]');
        this._filters.tags = this._element.find('a[data-filter="tag"]');
        this._addRegionClickEvents();
        this._addTagClickEvents();
    },

    /**
     * _addRegionClickEvents
     * 
     * @protected
     * @return    void
     */
    _addRegionClickEvents: function() {
        var _this = this;
        this._filters.regions.click(
            function(event) {
                event.preventDefault();
                _this._filters.regions.removeClass('active');
                _this._filters.tags.removeClass('active');
                $(event.target).addClass('active');
                var region = $(event.target).attr('data-region');
                _this._cards.addClass('hidden');
                _this._element.find('div.walk[data-regions*="' + (region) + '"]').removeClass('hidden');
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
        this._filters.tags.click(
            function(event) {
                event.preventDefault();
                _this._filters.regions.removeClass('active');
                _this._filters.tags.removeClass('active');
                $(event.target).addClass('active');
                var tag = $(event.target).attr('data-tag');
                _this._cards.addClass('hidden');
                _this._element.find('div.walk[data-tags*="' + (tag) + '"]').removeClass('hidden');
            }
        );
    }
});
