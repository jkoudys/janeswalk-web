
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
;
/**
 * FacebookShareDialog
 * 
 * @extends Class
 */
var FacebookShareDialog = Class.extend({

    /**
     * _shareObj
     * 
     * @protected
     * @var       Object (default: null)
     */
    _shareObj: null,

    /**
     * init
     * 
     * @public
     * @param  Object shareObj
     * @return void
     */
    init: function(shareObj) {
        this._shareObj = shareObj;
        this._shareObj.method = 'feed';
    },

    /**
     * show
     * 
     * @public
     * @param  Function failed
     * @param  Function successful
     * @return void
     */
    show: function(failed, successful) {
        var _this = this;
        FB.ui(
            this._shareObj,
            function(response) {
                if (typeof response !== 'undefined') {
                    if (response === null) {
                        failed && failed();
                    } else {
                        successful && successful();
                    }
                }
            }
        );
    }
});
;
/**
 * View
 * 
 * @extends Class
 */
var View = Class.extend({

    /**
     * _element
     * 
     * @protected
     * @var       jQuery (default: null)
     */
    _element: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._element = element;
    },

    /**
     * getElement
     * 
     * @public
     * @return HTMLFormElement
     */
    getElement: function() {
        return this._element;
    }
});
;
/**
 * ModalView
 * 
 * @extends View
 */
var ModalView = View.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addCloseEvents();
    },

    /**
     * _addCloseEvents
     * 
     * @protected
     * @return    void
     */
    _addCloseEvents: function() {
        var _this = this;
        this._element.find('.closeModalSource').click(
            function(event) {
                event.preventDefault();
                _this.close();
            }
        );
    }
});
;
/**
 * PageView
 * 
 * @extends View
 */
var PageView = View.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addNavEvents();
        this._addOverlayCloseEvent();
    },

    /**
     * _addOverlayCloseEvent
     * 
     * @protected
     * @return    void
     */
    _addOverlayCloseEvent: function() {
        var _this = this;
        this._element.find('.o-background').click(
            function(event) {
                _this._element.find('.overlay').hide();
            }
        );
        this._element.find('a.closeModalCta').click(
            function(event) {
                event.preventDefault();
                _this._element.find('.overlay').hide();
            }
        );
    },

    /**
     * _addNavEvents
     * 
     * @protected
     * @return    void
     */
    _addNavEvents: function() {
        this._element.find('a.search-open').click(
            function() {
                $('html, body').animate(
                    {
                        scrollTop: 0
                    },
                    300
                );
                $('header.navbar').addClass('dropped');
            }
        );
        this._element.find('a.search-close').click(
            function() {
                $('header.navbar').removeClass('dropped');
            }
        );
    },

    /**
     * _makeGaCall
     * 
     * @protected
     * @param     Array call
     * @return    void
     */
    _makeGaCall: function(call) {
        _gaq.push(call);
    },

    /**
     * trackCustomVar
     * 
     * @see    http://www.sitepoint.com/google-analytics-custom-variables/
     * @see    http://online-behavior.com/analytics/custom-variables-segmentation
     * @public
     * @param  String index
     * @param  String name
     * @param  String value
     * @param  String scope (optional)
     * @return void
     */
    trackCustomVar: function(index, name, value, scope) {
        var call = ['_setCustomVar', index, name, value, scope];
        this._makeGaCall(call);
    },

    /**
     * trackEvent
     * 
     * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @public
     * @param  String category The name you supply for the group of objects you want to track.
     * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
     * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
     * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
     * @param  Boolean override (optional)
     * @return void
     */
    trackEvent: function(category, action, optLabel, optValue, override) {
        var call = ['_trackEvent'];
        if (typeof category !== 'undefined') {
            call.push(category);
        }
        if (typeof action !== 'undefined') {
            call.push(action);
        }
        if (typeof optLabel !== 'undefined') {
            call.push(optLabel);
        }
        if (typeof optValue !== 'undefined') {
            call.push(optValue);
        }
        this._makeGaCall(call, override);
    },

    /**
     * trackView
     * 
     * @public
     * @param  String path
     * @return void
     */
    trackView: function(path) {
        var call = ['_trackPageview', path];
        this._makeGaCall(call);
    }
});
;
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
     * @var       NodeList|null (default: null)
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
        this._cards = this._element[0].querySelectorAll(".walk");
        this._previewCards();
        this._data = JanesWalk.walks;
        this._resetSelectElements();
        this._addCreateWalkEvent();
        this._addFilterEvents();
        this._setThemeCounts();
        this._captureHash();
//        this._setupText2DonateInterstitials();
        this._addLinkListeners();
    },

    /**
     * _getFacebookDialogDonateObj
     * 
     * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
     * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
     * @protected
     * @return    Object
     */
    _getFacebookDialogDonateObj: function() {
        return {
            link: 'http://janeswalk.org',
            // picture: 'http://janeswalk.org',
            name: 'Jane\'s Walk'
        };
    },

    /**
     * _previewCards
     * Copy a random set of the full walk list into the preview area.
     * Currently hard-codes a maximum preview size of 9 cards.
     *
     * @protected
     * @return void
     */
    _previewCards: function() {
      var shuffledDeck = Array.prototype.slice.call(this._cards).sort( function(){ return 0.5 - Math.random() } ),
          previewNode = document.querySelector(".walks-list.preview div");
      
      for(var i = 0, len = Math.min(shuffledDeck.length, 9); i < len; i++) {
        var card = shuffledDeck[i].cloneNode(true);
        // Egads, bootstrap can suck sometimes..
        card.classList.add("span4");
        card.classList.remove("span3");
        previewNode.appendChild(card);
      }
    },

    /**
     * _addLinkListeners
     * Listen on 'show all' walks
     *
     * @protected
     * @return void
     */
    _addLinkListeners: function() {
      var showAll = document.querySelector("a.see-all");
      if(showAll) {
        showAll.addEventListener("click", function() {
            var previewEls = [this, document.querySelector(".walk-preview.action-items"), document.querySelector(".walks-list.preview div.row-fluid")];
            var fullEl = document.querySelector(".walks-list.showall");
            // Hide this link, the preview walks, and the sidebar
            previewEls.forEach(function(e, i) {
              try { // We don't want some missing selector to break the whole execution
                e.classList.remove("in");
              } catch(e) {
                console.log("Error fading out menu: " + e);
              }
            });
            previewEls.forEach(function(e, i) { e.style.width = 0; e.style.padding = 0; e.style.margin = 0; });
            setTimeout(function() {
              previewEls.forEach(function(e, i) { e.style.display = "none" });
              fullEl.classList.remove("hide");
              fullEl.classList.add("in");
            }, 300);
        });
      }
    },

    /**
     * _setupText2DonateInterstitials
     * 
     * @protected
     * @return    void
     */
    _setupText2DonateInterstitials: function() {
        var enabled = false;
        // Catfish events
        this._element.find('a.closeCatfishCta').click(
            function(event) {
                event.preventDefault();
                _this._element.find('.catfish').hide();

                // Track the closure
                jQuery.cookie(
                    'hasSeenDonateCatfish',
                    '1',
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
        if (enabled && isCanadianCity === true) {

            // Modal
            var hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null
                && typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

            // Hasn't yet been seen
            if (hasSeenDonateInterstitial === false) {
                var closeCallback = function() {

                    // Track the closure
                    jQuery.cookie(
                        'hasSeenDonateInterstitial',
                        '1',
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
                this._element.find('.overlay.o-donate .o-background').click(closeCallback);
                this._element.find('a.closeModalCta').click(closeCallback);

                // Already donated flow
                this._element.find('div.btnWrapper a').click(
                    function(event) {

                        // Track the closure
                        jQuery.cookie(
                            'hasSeenDonateInterstitial',
                            '1',
                            {
                                path: '/',
                                domain: location.host
                            }
                        );

                        // Track the closure
                        jQuery.cookie(
                            'hasSeenDonateCatfish',
                            '1',
                            {
                                path: '/',
                                domain: location.host
                            }
                        );

                        // Shout modal
                        event.preventDefault();
                        _this._element.find('.o-donate').hide();
                        _this._element.find('.o-shout').show();

                        // Twitter button
                        _this._element.find('.o-shout .icon-twitter').click(
                            function(event) {
                                event.preventDefault();
                                var url = encodeURIComponent(
                                        'http://janeswalk.org/'
                                    ),
                                    text = encodeURIComponent(
                                        $(this).closest('.option').find('.copy').text().trim()
                                    );
                                var link = 'https://twitter.com/intent/tweet' +
                                    '?url=' + (url) +
                                    '&via=janeswalk' +
                                    '&text=' + (text);
                                window.open(
                                    link,
                                    'Twitter Share',
                                    'width=640, height=320'
                                );
                            }
                        );

                        // Twitter button
                        _this._element.find('.o-shout .icon-facebook').click(
                            function(event) {
                                event.preventDefault();
                                var shareObj = _this._getFacebookDialogDonateObj();
                                shareObj.description = $(this).closest('.option').find('.copy').text().trim();
                                (new FacebookShareDialog(shareObj)).show();
                            }
                        );
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
      count,
      el = this._element[0];
      var  countFilterMatches = function (option, index) {
        var filterCheck = option.getAttribute("value");
        var compare_fn = this.compare_fn || function(f,o) { return f[o]; };
        if (filterCheck !== "*") {
          count = 0;
          for(var i in _this._data) {
            if(compare_fn(_this._data[i][this.filter], filterCheck)) {
              ++count;
            }
          }
          option.textContent += " (" + count + ")";
          if (count === 0) {
            option.parentElement.removeChild(option);
          }
        }
      };

      Array.prototype.forEach.call(el.querySelectorAll('div.filters select[name="theme"] option'), countFilterMatches, {"filter":"themes"});
      Array.prototype.forEach.call(el.querySelectorAll('div.filters select[name="accessibility"] option'), countFilterMatches, {"filter":"accessibilities"});
      Array.prototype.forEach.call(el.querySelectorAll('div.filters select[name="ward"] option'), countFilterMatches, {"filter":"wards"} );
      Array.prototype.forEach.call(el.querySelectorAll('div.filters select[name="initiative"] option'), countFilterMatches, {"filter":"initiatives"});
      Array.prototype.forEach.call(el.querySelectorAll('div.filters select[name="date"] option'), countFilterMatches, {"filter":"datetimes",
        "compare_fn": function compareDate(filter, optionValue) { for(var i = 0; i < filter.length; i++) { return filter[i].date.indexOf(optionValue) !== -1;} } 
      });
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
        location.hash =
            "ward=" + (this._ward)
            + "&theme=" + (this._theme)
            + "&accessibility=" + (this._accessibility)
            + "&initiative=" + (this._initiative)
            + "&date=" + (this._date);
    },

    /**
     * _filterCards
     * 
     * @protected
     * @return    void
     */
    _filterCards: function() {
        var _this = this,
            showing = 0;

        // Returns 'true' if this thing passes through the filter
        var filterMatch = function(filter, dataset) {
          return (filter === "*") || (dataset && dataset[filter]);
        }

        // Hide the cards first
        for(var i = 0, len = this._cards.length; i < len; i++) {
          this._cards[i].classList.add("hidden");
        }
        this._data.forEach(
          function(data, index) {
            // Check if we should show this card
            if(
              filterMatch(_this._ward, data.wards)
              && filterMatch(_this._theme, data.themes)
              && filterMatch(_this._accessibility, data.accessibilities)
              && filterMatch(_this._initiative, data.initiatives)
              // See if date in filter dropdown is inside the array of dates
              && (function(f, o) {
                if(o === "*") return true;
                for(var i = 0; i < f.length; i++) { return f[i].date.indexOf(o) !== -1;} 
              })(data.datetimes, _this._date)
            ) {
              ++showing;
              _this._cards[index].classList.remove("hidden");
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
;
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
                if (_this._element.find('a[href="/index.php/login/logout/"]').length === 0) {
                    _this._element.find('.overlay').show();
                } else {
                    location.href = $(this).attr('href');
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
     * _addCityCalloutCta
     * 
     * @protected
     * @param     String cityName
     * @param     String cityPath
     * @return    void
     */
    _addCityCalloutCta: function(cityName, cityPath) {
        var $parent = this._element.find('.ccm-page-list-typeahead').first(),
            $wrapper = $('<h3 />'),
            $button = $('<a />');
        $button.attr({
            href: cityPath,
        });
        $button.text(cityName);
        $wrapper.append('See walks in ').append($button).append(', or:');
        $parent.prepend($wrapper);
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
        var $parent = this._element.find('.calltoaction ul').first(),
            $wrapper = $('<li />'),
            $button = $('<a />');
        $wrapper.attr({
            class: 'cityButtonCta'
        });
        $button.attr({
            class: 'btn btn-primary',
            href: cityPath,
        });
        $wrapper.append($button);
        $button.text('View walks in ' + (cityName));
        $parent.prepend($wrapper);
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
                        _this._addCityCalloutCta(obj.city, $(cityEl).attr('href'));
                        _this._addCityButtonCta(obj.city, $(cityEl).attr('href'));
                    }
                });
            }
        };
        if (typeof JanesWalk.user === 'undefined' || typeof JanesWalk.user.city === 'undefined') {
            $.getScript('http://freegeoip.net/json/?callback=freeGeoIpCallback');
        } else {
            _this._addCityCalloutCta(JanesWalk.user.city.name, JanesWalk.user.city.url);
            _this._addCityButtonCta(JanesWalk.user.city.name, JanesWalk.user.city.url);
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
;
/**
 * ProfilePageView
 * 
 * @extends PageView
 */
var ProfilePageView = PageView.extend({

    /**
     * _slideIndexes
     * 
     * @protected
     * @var       Object
     */
    _slideIndexes: {
        blogPost: 0,
        city: 0,
        walk: 0
    },

    /**
     * _currentTab
     * 
     * @protected
     * @var       String|null (default: null)
     */
    _currentTab: null,

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
      try { 
        this._super(element);
        this._showProperStep();
        this._addTabClickEvents();
        this._setupDisplayPictureFlashWidget();
        this._addPictureDeleteEvent();
        this._addPromoteWalkClickEvent();
        this._addPromoteCityClickEvent();
        this._addPromoteBlogPostClickEvent();
        this._setupCityPromoteModalEvents();
        this._setupWalkPromoteModalEvents();
        this._setupBlogPostPromoteModalEvents();
        this._setupPromoteSlideshows();
      } catch(e) {
        console.log("Error initializing profile: " + e);
      }
    },

    /**
     * _addPictureDeleteEvent
     * 
     * @protected
     * @return    void
     */
    _addPictureDeleteEvent: function() {
        this._element.find('a[href="/index.php/profile/delete/"]').click(
            function(event) {
                event.preventDefault();
                $.ajax({
                    type: 'DELETE',
                    url: $(this).attr('href'),
                    success: function() {
                        location.href = '/index.php/profile/#tab=picture&success=1';
                    }
                });
            }
        );
    },

    /**
     * _addPromoteBlogPostClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteBlogPostClickEvent: function() {
        var _this = this,
            $btn = this._element.find('.column.blogPosts .subactions .promote');
        $btn.click(
            function(event) {
                event.preventDefault();
                var blogPostObj = _this._getBlogPostObjById(
                    $(this).data('blogpostid')
                );
                _this._element.find('.blogPostPromoteOverlay .copy').each(
                    function(index, copy) {
                        var $copy = $(copy);
                        $copy.data('blogpostpath', blogPostObj.path);
                        $copy.find('.objTitle').text(blogPostObj.title);
                    }
                );
                _this._element.find('.blogPostPromoteOverlay').show();
            }
        );
    },

    /**
     * _addPromoteCityClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteCityClickEvent: function() {
        var _this = this,
            $btn = this._element.find('#cityBlock .promoteBtn');
        $btn.click(
            function(event) {
                event.preventDefault();
                _this._element.find('.cityPromoteOverlay').show();
            }
        );
    },

    /**
     * _getBlogPostObjById
     * 
     * @protected
     * @param     Number blogPostId
     * @return    void
     */
    _getBlogPostObjById: function(blogPostId) {
        var $link = this._element.find('[data-blogpostid="' + (blogPostId) + '"]');
        return {
            title: $link.first().data('blogposttitle'),
            path: $link.first().data('blogpostpath')
        };
    },

    /**
     * _getWalkObjById
     * 
     * @protected
     * @param     Number walkId
     * @return    void
     */
    _getWalkObjById: function(walkId) {
        var $link = this._element.find('[data-walkid="' + (walkId) + '"]');
        return {
            title: $link.first().data('walktitle'),
            path: $link.first().data('walkpath')
        };
    },

    /**
     * _addPromoteWalkClickEvent
     * 
     * @protected
     * @return    void
     */
    _addPromoteWalkClickEvent: function() {
        var _this = this,
            $btn = this._element.find(
                '.column.city .subactions .promote,' +
                '.column.walks .subactions .promote'
            );
        $btn.click(
            function(event) {
                event.preventDefault();
                var walkObj = _this._getWalkObjById($(this).data('walkid'));
                _this._element.find('.walkPromoteOverlay .copy').each(
                    function(index, copy) {
                        var $copy = $(copy);
                        $copy.data('walkpath', walkObj.path);
                        $copy.find('.objTitle').text(walkObj.title);
                    }
                );
                _this._element.find('.walkPromoteOverlay').show();
            }
        );
    },

    /**
     * _addTabClickEvents
     * 
     * @protected
     * @return    void
     */
    _addTabClickEvents: function() {

        // Nav tabs
        var _this = this;
        this._element.find('ul.nav-tabs li a').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );

        // Stand alone links
        this._element.find('.tabLink').click(
            function(event) {
                event.preventDefault();
                _this._currentTab = $(this).attr('data-tab');
                _this._showCurrentTab();
            }
        );
    },

    /**
     * _setupBlogPostPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupBlogPostPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + ($copy.data('blogpostpath')),
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + ($copy.data('blogpostpath')),
                    'Jane\'s Walk',
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
                    $copy.text().trim()
                );
            }
        );
    },

    /**
     * _setupCityPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupCityPromoteModalEvents: function() {
        var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
            cityName = this._element.find('.cityPromoteOverlay').data('cityname');
        var _this = this;
        this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + (cityPath),
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + (cityPath),
                    'Jane\'s Walk',
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
        this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (cityName),
                    $(this).closest('.option').find('.copy').text().trim()
                );
            }
        );
    },

    /**
     * _setupDisplayPictureFlashWidget
     * 
     * @protected
     * @return    void
     */
    _setupDisplayPictureFlashWidget: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
          bgcolor: '#ffffff',
          wmode: 'transparent',
          quality: 'high' 
        },
        flashvars = {
          width: this._element.find('#flashContainer').attr('data-width'),
          height: this._element.find('#flashContainer').attr('data-height'),
          image: this._element.find('#flashContainer').attr('data-imagepath'),
          save: this._element.find('#flashContainer').attr('data-savepath')
        };
      swfobject.embedSWF(
        this._element.find('#flashContainer').attr('data-flashpath'),
        'flashContainer',
        '500',
        '400',
        '10,0,0,0',
        'includes/expressInstall.swf',
        flashvars,
        params
      );
    },

    /**
     * _showSlide
     * 
     * @protected
     * @param     String slideshowName
     * @return    void
     */
    _showSlide: function(slideshowName) {
        var index = this._slideIndexes[slideshowName],
            $overlay = this._element.find('[data-slideshow="' + (slideshowName) + '"]'),
            $options = $overlay.find('.options .option');
        $options.addClass('hidden');
        $($options[index]).removeClass('hidden');
    },

    /**
     * _setupPromoteSlideshows
     * 
     * @protected
     * @return    void
     */
    _setupPromoteSlideshows: function() {
        var _this = this;
        this._element.find('.promoteOverlay .nav > a.left').click(
            function(event) {
                event.preventDefault();
                var $anchor = $(this),
                    slideshow = $anchor.data('slideshow'),
                    $overlay = $anchor.closest('.promoteOverlay'),
                    numOptions = $overlay.find('.options .option').length,
                    $options = $overlay.find('.options .option');
                if (_this._slideIndexes[slideshow] === 0) {
                    _this._slideIndexes[slideshow] = numOptions - 1;
                } else {
                    --_this._slideIndexes[slideshow];
                }
                _this._showSlide(slideshow);
            }
        );
        this._element.find('.promoteOverlay .nav > a.right').click(
            function(event) {
                event.preventDefault();
                var $anchor = $(this),
                    slideshow = $anchor.data('slideshow'),
                    $overlay = $anchor.closest('.promoteOverlay'),
                    numOptions = $overlay.find('.options .option').length,
                    $options = $overlay.find('.options .option');
                if (_this._slideIndexes[slideshow] === (numOptions - 1)) {
                    _this._slideIndexes[slideshow] = 0;
                } else {
                    ++_this._slideIndexes[slideshow];
                }
                _this._showSlide(slideshow);
                
            }
        );
    },

    /**
     * _setupWalkPromoteModalEvents
     * 
     * @protected
     * @return    void
     */
    _setupWalkPromoteModalEvents: function() {
        var _this = this;
        this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showTwitterShareWindow(
                    'http://janeswalk.org' + ($copy.data('walkpath')),
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showFacebookShareWindow(
                    'http://janeswalk.org' + ($copy.data('walkpath')),
                    'Jane\'s Walk',
                    $copy.text().trim()
                );
            }
        );
        this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(
            function(event) {
                event.preventDefault();
                var $copy = $(this).closest('.option').find('.copy');
                _this._showEmailShareWindow(
                    'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
                    $copy.text().trim()
                );
            }
        );
    },

    /**
     * _showCurrentTab
     * 
     * @protected
     * @return    void
     */
    _showCurrentTab: function() {
        this._element.find('ul.nav-tabs li.active').removeClass('active');
        this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
        this._element.find('div.content div.block').addClass('hidden');
        this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
        location.hash = 'tab=' + (this._currentTab);
    },

    /**
     * _showEmailShareWindow
     * 
     * @protected
     * @param     String subject
     * @param     String body
     * @return    void
     */
    _showEmailShareWindow: function(subject, body) {
        subject = encodeURIComponent(subject);
        body = encodeURIComponent(body);
        var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
        window.open(link);
    },

    /**
     * _showFacebookShareWindow
     * 
     * @protected
     * @param     String link
     * @param     String title
     * @param     String text
     * @return    void
     */
    _showFacebookShareWindow: function(link, title, text) {
        (new FacebookShareDialog({
            link: link,
            name: title,
            description: text
        })).show();
    },

    /**
     * _showProperStep
     * 
     * @protected
     * @return    void
     */
    _showProperStep: function() {
        if (location.hash !== '') {
            var pieces = location.hash.split('&'),
                hash = {},
                again;
            $(pieces).each(
                function(index, piece) {
                    again = piece.split('=');
                    hash[again[0].replace('#', '')] = again[1];
                }
            );
            this._currentTab = hash.tab;
            this._showCurrentTab();
            if (
                typeof hash.success !== 'undefined'
                && parseInt(hash.success) === 1
            ) {
                this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
            }
        }
    },

    /**
     * _showTwitterShareWindow
     * 
     * @protected
     * @param     String link
     * @param     String text
     * @return    void
     */
    _showTwitterShareWindow: function(link, text) {
        link = encodeURIComponent(link);
        text = encodeURIComponent(text);
        if (text.length > 130) {
            text = text.substring(0,130) + '...';
        }
        var link = 'https://twitter.com/intent/tweet' +
            '?url=' + (link) +
            '&via=janeswalk' +
            '&text=' + (text);
        window.open(
            link,
            'Twitter Share',
            'width=640, height=320'
        );
    }
});
;
/**
 * WalkPageView
 * 
 * @extends PageView
 */
var WalkPageView = PageView.extend({

    /**
     * init
     * 
     * @public
     * @param  jQuery element
     * @return void
     */
    init: function(element) {
        this._super(element);
        this._addFacebookDialogEvents();
        this._initializeMap();
    },

    /**
     * _addFacebookDialogEvents
     * 
     * @protected
     * @return    void
     */
    _addFacebookDialogEvents: function() {
        var _this = this;
        this._element.find('.facebookShareLink').click(
            function(event) {
                event.preventDefault();
                _this.trackEvent('Walk', 'share.attempted', 'facebook');
                var shareObj = _this._getFacebookDialogObj();
                (new FacebookShareDialog(shareObj)).show(
                    _this._facebookShareFailed,
                    _this._facebookShareSuccessful
                );
            }
        );
    },

    /**
     * _facebookShareFailed
     * 
     * @protected
     * @return    void
     */
    _facebookShareFailed: function() {
        this.trackEvent('Walk', 'share.failed', 'facebook');
    },

    /**
     * _facebookShareSuccessful
     * 
     * @protected
     * @return    void
     */
    _facebookShareSuccessful: function() {
        this.trackEvent('Walk', 'share.successful', 'facebook');
    },

    /**
     * _getFacebookDialogObj
     * 
     * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
     * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
     * @protected
     * @return    Object
     */
    _getFacebookDialogObj: function() {
        return {
            link: JanesWalk.page.url,
            picture: JanesWalk.page.pictureUrl,
            name: JanesWalk.page.title,
            description: JanesWalk.page.description,
            actions: {
                name: 'View Jane\'s Walks in ' + (JanesWalk.page.city.name),
                link: JanesWalk.page.city.url
            }
        };
    },

    /**
     * _styledMap
     * 
     * @type      StyledMapType
     * @protected
     */
    _styledMap: new google.maps.StyledMapType(
      [{
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#ffffff" }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          { "visibility": "on" },
          { "saturation": -100 }
        ]
      },{
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
          { "saturation": -100 }
        ]
      },{
        "featureType": "landscape.natural",
        "stylers": [
          { "saturation": -100 },
          { "lightness": 36 }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "saturation": 37 }
        ]
      },{
        "featureType": "landscape.man_made",
        "stylers": [
          { "saturation": -100 }
        ]
      }],
      {
        name: "Styled Map"
      }),

    /**
     * _initializeMap
     * 
     * @protected
     * @return    void
     */
    _initializeMap: function() {

      markers = new Array();

      if (typeof zoomLevelset != 'undefined') {
        var zoomLevel = zoomLevelset;
      } else {
        var zoomLevel = 16;
      }

      var mapOptions = {
        zoom: zoomLevel,
        scrollwheel: false,
        zoomControl: true,
        disableDefaultUI: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      var walkPathCoordinates = [];
      for(var rp in JanesWalk.page.gmap.route) { 
        walkPathCoordinates.push( new google.maps.LatLng( JanesWalk.page.gmap.route[rp].lat, JanesWalk.page.gmap.route[rp].lng));
      }

      var walkPath = new google.maps.Polyline({
        path: walkPathCoordinates,
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4 
      });

      walkPath.setMap(map);

      // Style Map

      map.mapTypes.set('map_style', this._styledMap);
      map.setMapTypeId('map_style');

      var mapMarker = '../../../../img/marker.png';
      var infowindow = new google.maps.InfoWindow({maxWidth: 300});

      var infobox = new InfoBox({
        content: document.getElementById("infobox"),
        maxWidth: 150,
        pixelOffset: new google.maps.Size(-3, -25),
        alignBottom: true,
        boxStyle: {
          background: "#fff",
          width: "280px",
          padding: "10px",
          border: "1px solid #eee",
        },
        closeBoxMargin: "-22px -22px 2px -8px",
        closeBoxURL: "../../../../img/map-close.png",
        infoBoxClearance: new google.maps.Size(20, 20)
      });

      for (var i in JanesWalk.page.gmap.markers) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(JanesWalk.page.gmap.markers[i].lat, JanesWalk.page.gmap.markers[i].lng),
          map: map,
          icon: mapMarker,
          id: i
        });

        markers.push(marker);

        var markerContent = '';

        if ($('body').hasClass('create-page')) {
          var markerContent = "<button class='btn pull-right' id='delete-marker'><i class='icon-trash'><i></button>";
        }

        var activeMarker = new google.maps.MarkerImage('../../../../img/marker-active.png');
        var defaultMarker = new google.maps.MarkerImage('../../../../img/marker.png');

        google.maps.event.addListener(marker, 'click', (function(marker, i) {

          return function() {

            for (var e=0; e<markers.length; e++) {
              markers[e].setIcon(defaultMarker);
            }

            map.panTo(marker.getPosition());

            this.setIcon(activeMarker);

            infowindow.setContent("<h4>"+ JanesWalk.page.gmap.markers[i].title +"</h4><p>"+ JanesWalk.page.gmap.markers[i].description +"</p>"+ markerContent);
            infobox.setContent("<h4>"+ JanesWalk.page.gmap.markers[i].title +"</h4><p>"+ JanesWalk.page.gmap.markers[i].description +"</p>"+ markerContent);
            infobox.open(map, marker);

            $('.walk-stop').removeClass('active');
            $('.walk-stops-meta #'+ i ).addClass('active');

            // Scroll to view item in list
            var activePos = $('.active');
            $('.walk-stops-meta').mCustomScrollbar("scrollTo",'.active');

          }
        })(marker, i));

      }
      $('.walk-stops').show();

      // Map Centering
      var bounds = new google.maps.LatLngBounds();
      for (var index in markers) { bounds.extend( markers[index].getPosition() ); }
      for (var index in walkPath.getPath().getArray()) { bounds.extend(walkPath.getPath().getAt(index)); }
      if(markers.length > 0) {
        map.fitBounds(bounds);
      }
      // Zoom out a bit from the centered/zoomed setting
      google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
        var oldZoom = map.getZoom();
        map.setZoom(Math.min(16, oldZoom));
      });

      google.maps.event.addDomListener(document.getElementById('map-canvas'), 'touchstart', function(e){
        map.setOptions({panControl: false, draggable: false});
      });

      // Register Custom "dragend" Event

      google.maps.event.addListener(marker, 'dragend', function() {
        // Get the Current position, where the pointer was dropped
        var point = marker.getPosition();
        // Center the map at given point
        map.panTo(point);
        // Update the textbox
        document.getElementById('txt_latlng').value=point.lat()+", "+point.lng();
      });

      // For all marker adding

      function addmarker(latilongi) {

        var markers = {};

        var lat = map.getCenter().lat();
        var lng = map.getCenter().lng();
        var latlng = new google.maps.LatLng(lat, lng);

        var newMarker = '/images/marker.new.png';

        var marker = new google.maps.Marker({
          position: latlng,
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: map,
          icon: newMarker
        });

        // Events to trigger point deletion

        id = marker.__gm_id;
        markers[id] = marker; 

        google.maps.event.addListener(marker, "rightclick", function (point) { id = this.__gm_id; delMarker(id) });

        var delMarker = function (id) {
          marker = markers[id]; 
          marker.setMap(null);
          marker = null;
        }

        var deleteMarkerButton = function() {
          google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
            google.maps.event.addDomListener(document.getElementById('delete-marker'), 'click', function (point) {
              google.maps.event.trigger(marker, 'rightclick');
            });
          });
        };

        var stopForm = "<input type='text' placeholder='Name of this stop'><br><textarea class='box-sizing' placeholder='Description of this stop'></textarea><br><button class='btn' id='save-marker'>Save Stop</button><button class='btn pull-right' id='delete-marker'><i class='icon-trash'><i></button>";

        infowindow.setContent(stopForm);
        infowindow.open(map, marker);
        deleteMarkerButton();

        google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
          google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
            infowindow.close(map, marker);
          });
        });


        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
          deleteMarkerButton();

          google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
            google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
              infowindow.close(map, marker);
            });
          });

        });

      };

      // Walk map
      google.maps.event.addListenerOnce(infowindow, 'domready', function(){ 
        google.maps.event.addDomListener(document.getElementById('save-marker'), 'click', function (point) {
          infowindow.close(map, marker);
        });
      });

      $('.walk-stop').on('click', function() {
        marker = markers[this.id];
        $('.walk-stop').removeClass('active');
        $(this).addClass('active');
        google.maps.event.trigger(marker, 'click');
      });
    }

});
;// Shims, polyfills, etc.
// dataset
Function.prototype.bind||(Function.prototype.bind=function(e){"use strict";if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),function(){"use strict";var e=Object.prototype,t=e.__defineGetter__,n=e.__defineSetter__,r=e.__lookupGetter__,i=e.__lookupSetter__,s=e.hasOwnProperty;t&&n&&r&&i&&(Object.defineProperty||(Object.defineProperty=function(e,o,u){if(arguments.length<3)throw new TypeError("Arguments not optional");o+="";if(s.call(u,"value")){!r.call(e,o)&&!i.call(e,o)&&(e[o]=u.value);if(s.call(u,"get")||s.call(u,"set"))throw new TypeError("Cannot specify an accessor and a value")}if(!(u.writable&&u.enumerable&&u.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return u.get&&t.call(e,o,u.get),u.set&&n.call(e,o,u.set),e}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(e,t){if(arguments.length<2)throw new TypeError("Arguments not optional.");t+="";var n={configurable:!0,enumerable:!0,writable:!0},o=r.call(e,t),u=i.call(e,t);return s.call(e,t)?!o&&!u?(n.value=e[t],n):(delete n.writable,n.get=n.set=undefined,o&&(n.get=o),u&&(n.set=u),n):n}),Object.defineProperties||(Object.defineProperties=function(e,t){var n;for(n in t)s.call(t,n)&&Object.defineProperty(e,n,t[n])}))}();if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(Element.prototype,"dataset")||!Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var e,t=this,n,r,i,s,o,u=this.attributes,a=u.length,f=function(e){return e.charAt(1).toUpperCase()},l=function(){return this},c=function(e,t){return typeof t!="undefined"?this.setAttribute(e,t):this.removeAttribute(e)};try{(({})).__defineGetter__("test",function(){}),n={}}catch(h){n=document.createElement("div")}for(e=0;e<a;e++){o=u[e];if(o&&o.name&&/^data-\w[\w\-]*$/.test(o.name)){r=o.value,i=o.name,s=i.substr(5).replace(/-./g,f);try{Object.defineProperty(n,s,{enumerable:this.enumerable,get:l.bind(r||""),set:c.bind(t,i)})}catch(p){n[s]=r}}}return n}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}};

// Converts military to standard time (to convert times returned by Eventbrite API)
function toStandardTime(timeString) {
  timeArray = timeString.split(":");
  var timeOutput;
  var timeSuffix;
   if(timeArray[0]==12) {
    timeOutput = 12;
    timeSuffix = "pm";
  } else if (timeArray[0]>12) {
    timeOutput = (timeArray[0] - 12);
    timeSuffix = "pm";
  }
  else {
    timeOutput = timeArray[0];
    timeSuffix = "am";
  }
  timeOutput = timeOutput + ":" + timeArray[1] + timeSuffix;
  return timeOutput;
}

/* Used to blur everything but the one element we don't want blurred */
function blurPage() { $("body > section, body > header").addClass("blur"); }
function unblurPage() { $("body > section, body > header").removeClass("blur"); }
var _pageView;
$(document).ready(function(){
  /**
  * Views
  * 
  */
  var bodyElement = $('body').first(),
  pageViewName = bodyElement.attr('data-pageViewName');

  // Not page view found
  if (typeof pageViewName === 'undefined') {
    console && console.log('No page view defined.');
  } else {
    _pageView = (new window[pageViewName](bodyElement));
  }

  // Calendar

  var cal = $('#calendar').calendario({
    displayWeekAbbr : true,
    startIn : 0,
    onDayClick : function( $el, $contentEl, dateProperties ) {
      $('.fc-row div').removeClass('selected');
      $el.addClass('selected');
      if( $contentEl.length > 0 ) {
        $('.request-btn, .request-nowalks').hide();
        showEvents( $contentEl, dateProperties );
      } else {
        $('.caption .book').remove();
        $('.caption .request-btn-book').remove();
        $('.request-nowalks, .request-btn').show();
      }
      if ($('body').hasClass('create-page')) {
        $('#selected-day').html(dateProperties.monthname +' '+ dateProperties.day +', '+ dateProperties.year);
      }
    }
  });



  // Populate Calendar with Eventbrite event dates

  if (0 && $('#calendar').length > 0 && $('body').hasClass('active-walk')) {

    Eventbrite({'app_key':"4GLVHQYNUSSUONY3QN"}, function(eb_client){

      var params = {user: EventBriteEmail, event_statuses: "live"};

      eb_client.user_list_events(params,function(response) {

        // var eventsCount = response.events.length;
        // Only display one event for now.

        var eventsCount = 2;

        for (var eventsCounter=0; eventsCounter < eventsCount; eventsCounter++) {

          var eventDateTime = response.events[eventsCounter].event.start_date.split(" ");
          var eventId = response.events[eventsCounter].event.id;
          var eventName = response.events[eventsCounter].event.title;
          var eventDateObject = new Date(eventDateTime[0]);
          var eventTime = eventDateTime[1];

          if (!$.support.transition) {
            var eventDateObject = eventDateTime[0].split(/\s*\-\s*/g);
            var eventMonth = eventDateObject[1];
            var eventDate = eventMonth+"-"+eventDateObject[2]+"-"+eventDateObject[0];
            var param = {};
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
          } else {
            //construct datestring that is palatable to calendario (convert single-digit days/months to two-digits)
            var eventDate = ("0" + (eventDateObject.getMonth()+1)).slice(-2) + "-" + ("0" + (eventDateObject.getDate()+1)).slice(-2) + "-" + eventDateObject.getFullYear();
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
            var param = {};
          }
          param[eventDate] = eventTime;
          cal.setData(param);
          console.log(param);
        }

      });

    });

  }


  if ($('body').hasClass('walk-page') || $('body').hasClass('create-page')) {
    $month = $( '#custom-month' ).html( cal.getMonthName() ),
    $year = $( '#custom-year' ).html( cal.getYear() );
  }

  $('#custom-next').on('click', function() {
    cal.gotoNextMonth(updateMonthYear);
  } );
  $('#custom-prev').on( 'click', function() {
    cal.gotoPreviousMonth(updateMonthYear);
  });

  function updateMonthYear() {        
    $month.html( cal.getMonthName() );
    $year.html( cal.getYear() );
  }


  // Booking toggle

  function showEvents( $contentEl, dateProperties ) {
    $('.caption .book').remove();
    $('.caption .request-btn-book').remove();
    $('.request').slideUp();
    $('.request-btn').removeClass('active');
    //  $('.date-caption').append('<a href="#" class="btn btn-primary btn-large book">Book This Date '+ $contentEl.html() +'</a>');
    $('.date-caption').append($contentEl.html());
  }

  // Hover to Show Time
  $('.fc-content').tooltip({
    trigger: 'hover',
    title: "I'm available"
  });

  $('.tag').tooltip({
    trigger: 'hover',
    placement: 'bottom'
  });

  // Request Button
  $('.date-caption').delegate('.request-btn-book, .request-btn','click', function(event){
    event.preventDefault();
    $(this).toggleClass('active');
    $('.request').slideToggle();
  });

  // Slimscroll
  $('.walk-stops-meta').mCustomScrollbar({theme:'dark'});

  // Add Stop After Overlay
  $('#step-add-button-final').on('click', function(){
    $('#step-add-button').animate({'opacity':'1'});
  });

  // Spin.js Spinner
  $progress = $('#progress');

  $.fn.spin = function (opts) {
    try {
      this.each(function () {
        var $this = $(this),
        data = $this.data();
        if (data.spinner) {
          data.spinner.stop();
          delete data.spinner;
        }
        if (opts !== false) {
          data.spinner = new Spinner($.extend({
            color: '#F16725',
            lines: 11,
            length: 20,
            width: 2,
            radius: 16,
            corners: 1.0,
            rotate: 0,
            trail: 47,
            speed: 1.3,
          }, opts)).spin(this);
        }
      });
      return this;
    }
    catch(e) { console.log(e); }
  };

  $progress.spin();

  window.onload = function() {
    $progress.spin(false).css({'z-index':'-1'});
    $('.city-organizer').slideDown();
  };

  // Notifications
  $('.notification').on('click', function(){
    $(this).removeClass('expanded');
  });

  if ($('body').hasClass('city-page') && festivalWeekendCheck === undefined) {
    setTimeout( function() {
      $('.notification.festival-weekend').addClass('expanded');
    },2000);

    $('.city-page').on('click', function(){
      $('.notification.festival-weekend').removeClass('expanded');
    });
  };

  if ($('body').hasClass('home')) {
    setTimeout( function() {
      $('#prototype').modal('show')
    },2000);
  };

  $('.custom-walk-page .container-outter .notify').on('click', function(event){
    event.preventDefault();
    $('.notification.custom-form').toggleClass('expanded');
  });

  $('body').on('mousedown', function(){
    if ($('.notification').hasClass('expanded')) {
      $('.notification').removeClass('expanded');
    }
  });

  // Smooth Scroll
  $('.bottom-bar').on('click', function(event){
    event.preventDefault();
    $('html, body').animate({ scrollTop: $('#walk-leader-bio').offset().top-80 }, 1000);
  });

  $('#register-btn').on('click', function(event){
    event.preventDefault();
    $('html, body').animate({ scrollTop: $('#register').offset().top-80 }, 1000, function(){
      setTimeout(function(){
        $('#register').addClass('focus');
      }, 100);
    });
  });

  // Construct button to continue reg with Eventbrite reg
  if ($('body').hasClass('reg-confirmation')){
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-riverside-walk')) {
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-riverside?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-congested')) {
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-congested?event_id=' + eventId + '&order_id=' + orderId +'';
  }
});

