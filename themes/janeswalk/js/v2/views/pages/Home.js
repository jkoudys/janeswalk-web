
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
