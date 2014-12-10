'use strict';
var PageView = require('../Page.jsx');

/**
 * HomePageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var HomePageView = function(element) {
  PageView.call(this, element);
  this._addMapToggleEvents();
  this._addBgImage();
  this._addCityDropdownEvent();
  this._addCreateWalkEvent();
};
HomePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {value: function() {
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
  }},

  /**
   * _addCityDropdownEvent
   * 
   * @protected
   * @return    void
   */
  _addCityDropdownEvent: {value: function() {
    var $select = this._element.find('select.pageListSelect');
    $select.change(
      function(event) {
      location.href = $select.val();
    }
    );
  }},

  /**
   * _addBgImage
   * 
   * @protected
   * @return    void
   */
  _addBgImage: {value: function() {
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
  }},

  /**
   * _addCityButtonCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityButtonCta: {value: function(cityName, cityPath) {
    React.render(
      this._element.find('.calltoaction ul').first(),
      <li className="cityButtonCta">
        <a href={cityPath} className="btn btn-primary">
          View walks in {cityName}
        </a>
      </li>
    );
  }},

  /**
   * _addMapToggleEvents
   * 
   * @protected
   * @return    void
   */
  _addMapToggleEvents: {value: function() {
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
  }}
});

module.exports = HomePageView;
