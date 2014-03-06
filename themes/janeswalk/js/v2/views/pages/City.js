
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
     * @var       Array|null (default: null)
     */
    _cards: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
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
        this._element.find('div.wards a').click(
            function(event) {
                event.preventDefault();
                $(event.target).toggleClass('active');

                // Start filtering if any filters are on
                if (_this._element.find('div.wards a.active').length > 0) {
                    _this._element.find('div.walk').addClass('hidden');
                    _this._element.find('div.wards a.active').each(
                        function(index, anchor) {
                            var ward = $(anchor).attr('data-jw-ward');
console.log(ward);
                            _this._element.find('div.walk[data-jw-wards*="' + (ward) + '"]').removeClass('hidden');
                        }
                    );
                } else {
                    _this._element.find('div.walk').removeClass('hidden');
                }
            }
        );
    }
});
