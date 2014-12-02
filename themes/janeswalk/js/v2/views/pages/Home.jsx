var PageView = require('../Page.jsx');

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
    this._addCityDropdownEvent();
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
    $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
    $btn.click(
      function(event) {
      event.preventDefault();
      if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
        location.href = $(this).attr('href');
      } else {
        _this._element.find('.overlay').show();
      }
    }
    );
  },

  /**
   * _addCityDropdownEvent
   * 
   * @protected
   * @return    void
   */
  _addCityDropdownEvent: function() {
    var $select = this._element.find('select.pageListSelect');
    $select.change(
      function(event) {
      location.href = $select.val();
    }
    );
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
    image = document.createElement("img");
    image.onload = function() {
      $backgroundImageBanner.css({
        backgroundImage: 'url(' + (backgroundImageUrl) + ')'
      });
      $backgroundImageBanner.removeClass('faded');
    };
    image.src = backgroundImageUrl;
  },

  /**
   * _addCityCalloutCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityCalloutCta: function(cityName, cityPath) {
    React.render(
      document.getElementById('ccm-jw-page-list-typeahead'),
      <h3>See walks in <a href={cityPath}>{cityName}</a>, or:</h3>
    );
  },

  /**
   * _addCityButtonCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityButtonCta: function(cityName, cityPath) {
    React.render(
      this._element.find('.calltoaction ul').first(),
      <li className="cityButtonCta">
        <a href={cityPath} className="btn btn-primary">
          View walks in {cityName}
        </a>
      </li>
    );
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
            _this._addCityCalloutCta(
              obj.city,
              $(cityEl).attr('href')
            );
            _this._addCityButtonCta(
              obj.city,
              $(cityEl).attr('href')
            );
          }
        });
      }
    };
    if (JanesWalk.user === undefined || JanesWalk.user.city === undefined) {
      $.getScript('http://freegeoip.net/json/?callback=freeGeoIpCallback');
    } else {
      _this._addCityCalloutCta(
        JanesWalk.user.city.name,
        JanesWalk.user.city.url
      );
      _this._addCityButtonCta(
        JanesWalk.user.city.name,
        JanesWalk.user.city.url
      );
    }
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

module.exports = HomePageView;
