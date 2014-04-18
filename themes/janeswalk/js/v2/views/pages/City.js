
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
        this._data = JanesWalk.walks;
        this._resetSelectElements();
        this._addCreateWalkEvent();
        this._addFilterEvents();
        this._setThemeCounts();
        this._captureHash();
        this._setupText2DonateInterstitials();
    },

    /**
     * _setupText2DonateInterstitials
     * 
     * @protected
     * @return    void
     */
    _setupText2DonateInterstitials: function() {

        // Catfish events
        this._element.find('a.closeCatfishCta').click(
            function(event) {
                event.preventDefault();
                _this._element.find('.catfish').hide();

                // Track the closure
                jQuery.cookie(
                    'hasSeenDonateCatfish',
                    {
                        path: '/',
                        domain: location.host
                    }
                );
            }
        );

        // Canadian city check
        var isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
            _this = this;
        if (isCanadianCity === true) {

            // Modal
            var hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null
                && typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

            // Hasn't yet been seen
            if (hasSeenDonateInterstitial === false) {
                var closeCallback = function() {

                    // Track the closure
                    jQuery.cookie(
                        'hasSeenDonateInterstitial',
                        {
                            path: '/',
                            domain: location.host
                        }
                    );

                    // Open the catfish
                    _this._element.find('.catfish.c-donate').removeClass(
                        'hidden'
                    );
                };
                this._element.find('.overlay.o-donate').show();
                this._element.find('.o-background').click(closeCallback);
                this._element.find('a.closeModalCta').click(closeCallback);

                // Already donated flow
                this._element.find('div.btnWrapper a').click(
                    function(event) {
                        event.preventDefault();
                        console.log(event);
                    }
                );
            } else {

                // Catfish
                var hasSeenDonateCatfish = jQuery.cookie('hasSeenDonateCatfish') !== null
                    && typeof jQuery.cookie('hasSeenDonateCatfish') !== 'undefined';

                // Hasn't yet been seen
                if (hasSeenDonateCatfish === false) {
                    this._element.find('.catfish').removeClass('hidden');
                }
            }
        }
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
                            if ($.grep(data.datetimes, function(e){ return $(option).attr('value') === e.date; }).length > 0) {
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
        var _this = this;
        this._element.find('.initiatives').addClass('hidden');
        this._element.find('.initiative').addClass('hidden');
        this._element.find('#initiative').change(
            function(event) {
                if ($(this).val() !== '#') {
                    _this._element.find('.initiatives').removeClass('hidden');
                    _this._element.find(
                        '[data-jw-initiative="' + ($(this).val()) + '"]'
                    ).removeClass('hidden');
                }
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
                    _this._element.find('.overlay.o-connect').show();
                } else {
                    location.href = $(this).attr('href');
                }
            }
        );
    },

    /**
     * _captureHash
     * 
     * @protected
     * @return    void
     */
    _captureHash: function() {
        if (location.hash !== '') {
            var _this = this,
                pieces = location.hash.replace('#', '').split('&'),
                key = '';
            $(pieces).each(
                function(index, piece) {
                    key = '_' + (piece.split('=')[0]);
                    _this[key] = piece.split('=')[1];
                }
            );
            this._filterCards();
            this._element.find('select[name="ward"]').val(this._ward);
            this._element.find('select[name="theme"]').val(this._theme);
            this._element.find('select[name="accessibility"]').val(this._accessibility);
            this._element.find('select[name="initiative"]').val(this._initiative);
            this._element.find('select[name="date"]').val(this._date);
        }
    },

    /**
     * _setHash
     * 
     * @protected
     * @return    void
     */
    _setHash: function() {
        var hash = '';
        hash += 'ward=' + (this._ward);
        hash += '&theme=' + (this._theme);
        hash += '&accessibility=' + (this._accessibility);
        hash += '&initiative=' + (this._initiative);
        hash += '&date=' + (this._date);
        location.hash = hash;
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
                    show = false;
                }

                // themes
                if (
                    jQuery.inArray(_this._theme, data.themes) === -1
                    && _this._theme !== '*'
                ) {
                    show = false;
                }

                // accessibilities
                if (
                    jQuery.inArray(_this._accessibility, data.accessibilities) === -1
                    && _this._accessibility !== '*'
                ) {
                    show = false;
                }

                // initiatives
                if (
                    jQuery.inArray(_this._initiative, data.initiatives) === -1
                    && _this._initiative !== '*'
                ) {
                    show = false;
                }

                // dates
                if (
                    $.grep(data.datetimes, function(e){ return _this._date === e.date; }).length === 0
                    && _this._date !== '*'
                ) {
                    show = false;
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
                _this._setHash();
                _this._filterCards();
            }
        );
    }
});
