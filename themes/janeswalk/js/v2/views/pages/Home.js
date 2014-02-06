
/**
 * HomePageView
 * 
 * @extends PageView
 */
var HomePageView = PageView.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addMapToggleEvents();
        this._addCityLookup();
        this._addBgImage();
    },

    /**
     * _addBgImage
     * 
     * @protected
     * @return    void
     */
    _addBgImage: function() {
        var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
            $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
            image = (new Image());
        image.onload = function() {
            $backgroundImageBanner.css({
                backgroundImage: 'url(' + (backgroundImageUrl) + ')'
            });
            $backgroundImageBanner.removeClass('faded');
        };
        image.src = backgroundImageUrl;
    },

    /**
     * _addCityCta
     * 
     * @protected
     * @param     String cityName
     * @param     String cityPath
     * @return    void
     */
    _addCityCta: function(cityName, cityPath) {
        var $parent = this._element.find('.homepage-callout2').first(),
            $wrapper = $('<div class="cityCtaWrapper" />'),
            $button = $('<a />');
        $button.attr({
            href: cityPath,
            class: 'btn btn-large'
        });
        $button.text('View walks in ' + (cityName));
        $wrapper.append($button);
        $parent.append($wrapper);
    },

    /**
     * _addCityLookup
     * 
     * @protected
     * @return    void
     */
    _addCityLookup: function() {
        var _this = this;
        window.freeGeoIpCallback = function(obj) {
            if (typeof obj !== 'undefined') {
                var $cities = _this._element.find(
                        'div.ccm-page-list-typeahead ul li a'
                    ),
                    $city;
                $cities.each(function(index, cityEl) {
                    if ($(cityEl).text() === obj.city) {
                        _this._addCityCta(obj.city, $(cityEl).attr('href'));
                    }
                });
            }
        };
        $.getScript('http://freegeoip.net/json/?callback=freeGeoIpCallback');
    },

    /**
     * _addMapToggleEvents
     * 
     * @protected
     * @return    void
     */
    _addMapToggleEvents: function() {
        var $showButton = this._element.find('.overlap .controls a.showButton'),
            $closeButton = this._element.find('.overlap .controls a.closeButton');
        $showButton.click(
            function() {
                $('.overlap').addClass('fullmap');
                $(this).fadeOut(
                    400,
                    function() {
                        $closeButton.fadeIn();
                    }
                );
                $('html, body').animate(
                    {
                        scrollTop: $(this).offset().top - 100
                    },
                    800
                );
            }
        );
        $closeButton.click(
            function() {
                $('.overlap').removeClass('fullmap');
                $(this).fadeOut(
                    400,
                    function() {
                        $showButton.fadeIn();
                    }
                );
            }
        );
    }
});
