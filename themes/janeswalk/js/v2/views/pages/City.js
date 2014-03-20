
/**
 * CityPageView
 * 
 * @extends PageView
 */
var CityPageView = PageView.extend({

    /**
     * _accessibility
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _accessibility: null,

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
     * _date
     * 
     * @protected
     * @var       Array|null (default: null)
     */
    _date: null,

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
        this._setThemeCounts();
    },

    /**
     * _setThemeCounts
     * 
     * @protected
     * @return    void
     */
    _setThemeCounts: function() {
        var _this = this,
            count;
        this._element.find('div.filters select[name="theme"] option').each(
            function(index, option) {
                if ($(option).attr('value') !== '*') {
                    count = 0;
                    $(_this._data).each(
                        function(index, data) {
                            if (jQuery.inArray($(option).attr('value'), data.themes) !== -1) {
                                ++count;
                            }
                        }
                    );
                    $(option).text($(option).text() + ' (' + (count) + ')');
                    if (count === 0) {
                        $(option).remove();
                    }
                }
            }
        );
        this._element.find('div.filters select[name="accessibility"] option').each(
            function(index, option) {
                if ($(option).attr('value') !== '*') {
                    count = 0;
                    $(_this._data).each(
                        function(index, data) {
                            if (jQuery.inArray($(option).attr('value'), data.accessibilities) !== -1) {
                                ++count;
                            }
                        }
                    );
                    $(option).text($(option).text() + ' (' + (count) + ')');
                    if (count === 0) {
                        $(option).remove();
                    }
                }
            }
        );
        this._element.find('div.filters select[name="ward"] option').each(
            function(index, option) {
                if ($(option).attr('value') !== '*') {
                    count = 0;
                    $(_this._data).each(
                        function(index, data) {
                            if (jQuery.inArray($(option).attr('value'), data.wards) !== -1) {
                                ++count;
                            }
                        }
                    );
                    $(option).text($(option).text() + ' (' + (count) + ')');
                    if (count === 0) {
                        $(option).remove();
                    }
                }
            }
        );
        this._element.find('div.filters select[name="initiative"] option').each(
            function(index, option) {
                if ($(option).attr('value') !== '*') {
                    count = 0;
                    $(_this._data).each(
                        function(index, data) {
                            if (jQuery.inArray($(option).attr('value'), data.initiatives) !== -1) {
                                ++count;
                            }
                        }
                    );
                    $(option).text($(option).text() + ' (' + (count) + ')');
                    if (count === 0) {
                        $(option).remove();
                    }
                }
            }
        );
        this._element.find('div.filters select[name="date"] option').each(
            function(index, option) {
                if ($(option).attr('value') !== '*') {
                    count = 0;
                    $(_this._data).each(
                        function(index, data) {
                            if (jQuery.inArray($(option).attr('value'), data.dates) !== -1) {
                                ++count;
                            }
                        }
                    );
                    $(option).text($(option).text() + ' (' + (count) + ')');
                    if (count === 0) {
                        $(option).remove();
                    }
                }
            }
        );
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

                // accessibilities
                if (
                    jQuery.inArray(_this._accessibility, data.accessibilities) === -1
                    && _this._accessibility !== '*'
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

                // dates
                if (
                    jQuery.inArray(_this._date, data.dates) === -1
                    && _this._date !== '*'
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
                _this._ward = '*';
                if (_this._element.find('select[name="ward"]').length > 0) {
                    _this._ward = _this._element.find('select[name="ward"]').val();
                }
                _this._theme = '*';
                if (_this._element.find('select[name="theme"]').length > 0) {
                    _this._theme = _this._element.find('select[name="theme"]').val();
                }
                _this._accessibility = '*';
                if (_this._element.find('select[name="accessibility"]').length > 0) {
                    _this._accessibility = _this._element.find('select[name="accessibility"]').val();
                }
                _this._initiative = '*';
                if (_this._element.find('select[name="initiative"]').length > 0) {
                    _this._initiative = _this._element.find('select[name="initiative"]').val();
                }
                _this._date = '*';
                if (_this._element.find('select[name="date"]').length > 0) {
                    _this._date = _this._element.find('select[name="date"]').val();
                }
                _this._filterCards();
            }
        );
    }
});
