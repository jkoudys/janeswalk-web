'use strict';
var PageView = require('../Page.jsx');

/**
 * CityPageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var CityPageView = function(element) {
  PageView.call(this, element);
  this._cards = Array.prototype.slice.call(this._element[0].querySelectorAll('.walk'), 0);
  this._data = this._initData(JanesWalk.walks, this._cards);
  this._sortWalkList();
  this._resetSelectElements();
  this._addCreateWalkEvent();
  this._addFilterEvents();
  this._setThemeCounts();
  this._addLinkListeners();
  this._captureHash();
  //this._setupText2DonateInterstitials();
  $('.walks-filters .tag').tooltip();
};
CityPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _accessibility
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _accessibility: {value: null, writable: true},

  /**
   * _cards
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _cards: {value: null, writable: true},

  /**
   * _data
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _data: {value: null, writable: true},

  /**
   * _date
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _date: {value: null, writable: true},

  /**
   * _initiative
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _initiative: {value: null, writable: true},

  /**
   * _theme
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _theme: {value: null, writable: true},

  /**
   * _ward
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _ward: {value: null, writable: true},

  /**
   * _initData
   * Until this is Reactified, associate data state directly with DOM
   *
   * @protected
   */
  _initData: {
    value: function(data, cards) {
      return data.map(function(data, i) {
        data.card = cards[i];
        return data;
      });
    }
  },

  /**
   * _getFacebookDialogDonateObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogDonateObj: {
    value: function() {
      return {
        link: 'http://janeswalk.org',
        // picture: 'http://janeswalk.org',
        name: 'Jane\'s Walk'
      };
    }
  },

  /**
   * _setupText2DonateInterstitials
   * 
   * @protected
   * @return    void
   */
  _setupText2DonateInterstitials: {
    value: function() {
      var enabled = false,
      _this = this,
      isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
      hasSeenDonateInterstitial,
      closeCallback,
      url,
      link;
      // Catfish events
      this._element.find('a.closeCatfishCta').click(function(event) {
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
      });

      // Canadian city check
      if (enabled && isCanadianCity === true) {

        // Modal
        hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null &&
          typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

        // Hasn't yet been seen
        if (hasSeenDonateInterstitial === false) {
          closeCallback = function() {

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
            _this._element.find('.o-shout .icon-twitter').click(function(event) {
              event.preventDefault();
              url = encodeURIComponent(
                'http://janeswalk.org/'
              );
              text = encodeURIComponent(
                $(this).closest('.option').find('.copy').text().trim()
              );
              link = 'https://twitter.com/intent/tweet' +
              '?url=' + (url) +
                '&via=janeswalk' +
                '&text=' + (text);
              window.open(
                link,
                'Twitter Share',
                'width=640, height=320'
              );
            });

            // Twitter button
            _this._element.find('.o-shout .icon-facebook').click(function(event) {
              event.preventDefault();
              var shareObj = _this._getFacebookDialogDonateObj();
              shareObj.description = $(this).closest('.option').find('.copy').text().trim();
              (new FacebookShareDialog(shareObj)).show();
            });
          }
          );
        } else {

          // Catfish
          hasSeenDonateCatfish = jQuery.cookie('hasSeenDonateCatfish') !== null &&
            typeof jQuery.cookie('hasSeenDonateCatfish') !== 'undefined';

          // Hasn't yet been seen
          if (hasSeenDonateCatfish === false) {
            this._element.find('.catfish').removeClass('hidden');
          }
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
  _setThemeCounts: {
    value: function() {
      var _this = this,
      count,
      forEach = Function.prototype.call.bind(Array.prototype.forEach),
      el = this._element[0],
      countFilterMatches = function(option, index) {
        var filterCheck = option.getAttribute('value');

        // Default to checking option property in filter
        var compare_fn = this.compare_fn || function(f, o) { return f && f[o]; };

        if (filterCheck !== '*') {
          count = 0;
          for(var i in _this._data) {
            if(compare_fn(_this._data[i][this.filter], filterCheck)) {
              ++count;
            }
          }
          option.textContent += ' (' + count + ')';
          if (count === 0) {
            option.parentElement.removeChild(option);
          }
        }
      };

      forEach(
        el.querySelectorAll('.filters select[name="theme"] option'),
        countFilterMatches,
        {filter: 'themes'}
      );
      forEach(
        el.querySelectorAll('.filters select[name="accessibility"] option'),
        countFilterMatches,
        {filter: 'accessibilities'}
      );
      forEach(
        el.querySelectorAll('.filters select[name="ward"] option'),
        countFilterMatches,
        {filter: 'wards'}
      );
      forEach(
        el.querySelectorAll('.filters select[name="initiative"] option'),
        countFilterMatches,
        {filter: 'initiatives'}
      );
      forEach(
        el.querySelectorAll('.filters select[name="date"] option'),
        countFilterMatches,
        {
          filter: 'datetimes',
          compare_fn: function compareDate(filter, optionValue) {
            for (var i = 0; i < filter.length; i++) {
              return filter[i].date.indexOf(optionValue) !== -1;
            } 
          } 
        }
      );
    }
  },

  /**
   * _resetSelectElements
   * 
   * @protected
   * @return    void
   */
  _resetSelectElements: {
    value: function() {
      var _this = this;
      this._element.find('.filters select').each(function(index, element) {
        $(element).val('*');
      });
      this._element.find('.initiatives').addClass('hidden');
      this._element.find('.initiative').addClass('hidden');
      this._element.find('#initiative').change(function(event) {
        if ($(this).val() !== '#') {
          _this._element.find('.initiatives').removeClass('hidden');
          _this._element.find(
            '[data-jw-initiative="' + ($(this).val()) + '"]'
          ).removeClass('hidden');
        }
      });
    }
  },

  /**
   * _sortWalkList
   *
   * @protected
   * @return void
   */
  _sortWalkList: {
    value: function() {
      var archiveMessage = document.createElement('div');
      // JW dates are stored timezone-agnostic, e.g. an 0900 walk is at 0900 UTC
      var utcTime = Date.now() - (new Date).getTimezoneOffset() * 60 * 1000;
      archiveMessage.classList.add('statusMessage');
      // TODO: Use translation functions once loaded by ReactJS
      archiveMessage.textContent = 'Ended';

      // List the archived walks as archived
      this._cards.forEach(function(card) {
        var img = card.querySelector('.walkimage');
        var dayOld = (utcTime - Number(card.dataset.timeEnd)) > (24 * 60 * 60 * 1000);
        if (img && dayOld) {
          card.dataset.archived = true;
          img.appendChild(archiveMessage.cloneNode(true));
        }
      });

      // Sort the walks by date, with archived at the end
      this._cards.sort(function(a, b) {
        // If one is archived and the other not, the unarchived comes next
        if (a.dataset.archived  && !b.dataset.archived) {
          return 1;
        } else if (!a.dataset.archived  && b.dataset.archived) {
          return -1;
        } else {
          // If they're both archived or unarchived, sort by date
          return a.dataset.timeEnd - b.dataset.timeEnd;
        }
      });

      // And now, we can re-order it in the DOM
      this._cards.forEach(function(card) {
        // Take it out of its current order, and back in at the end
        card.parentElement.appendChild(card);
      });
    }
  },

  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.create-walk');
      $btn.click(function(event) {
        if (!JanesWalk.user) {
          event.preventDefault();
          $('#login').modal();
        }
      });
    }
  },

  /**
   * _captureHash
   * 
   * @protected
   * @return    void
   */
  _captureHash: {
    value: function() {
      var _this = this;
      if (location.hash !== '') {
        var pieces = location.hash.replace('#', '').split('&');
        var key = '';
        $(pieces).each(function(index, piece) {
          key = '_' + (piece.split('=')[0]);
          _this[key] = piece.split('=')[1];
        });
        this._filterCards();
        this._element.find('select[name="ward"]').val(this._ward);
        this._element.find('select[name="theme"]').val(this._theme);
        this._element.find('select[name="accessibility"]').val(this._accessibility);
        this._element.find('select[name="initiative"]').val(this._initiative);
        this._element.find('select[name="date"]').val(this._date);
      }
    }
  },

  /**
   * _setHash
   * 
   * @protected
   * @return    void
   */
  _setHash: {
    value: function() {
      location.hash = 'ward=' + (this._ward) +
        '&theme=' + (this._theme) +
        '&accessibility=' + (this._accessibility) +
        '&initiative=' + (this._initiative) +
        '&date=' + (this._date);
    }
  },

  /**
   * _filterCards
   * 
   * @protected
   * @return    void
   */
  _filterCards: {
    value: function() {
      var _this = this,
      showing = 0,
      // Returns 'true' if this thing passes through the filter
      filterMatch = function(filter, dataset) {
        return (filter === '*') || (dataset && dataset[filter]);
      },
      filterDate = function(dateList, date) {
        if (date === '*') {
          return true;
        }
        for (var i = 0; i < dateList.length; i++) {
          if (dateList[i].date.indexOf(date) > -1) {
            return true;
          }
        }
        return false;
      };

      // Hide the cards first
      this._cards.forEach(function(card) {
        card.classList.add('hidden');
      });

      // Go through all the cards
      this._data.forEach(function(data, index) {
        // Check if we should show this card
        if (filterMatch(_this._ward, data.wards) && filterMatch(_this._theme, data.themes) && filterMatch(_this._accessibility, data.accessibilities) &&  filterMatch(_this._initiative, data.initiatives) && filterDate(data.datetimes, _this._date)) {
          ++showing;
          data.card.classList.remove("hidden");
        }
      });

      // Empty state
      this._element.find('.empty').addClass('hidden');
      if (showing === 0) {
        this._element.find('.empty').removeClass('hidden');
      }
    }
  },

  /**
   * _addLinkListeners
   * Map the tooltips to the filter action
   *
   * @protected
   * @return void
   */
  _addLinkListeners: {
    value: function() {
      var _this = this;
      Array.prototype.forEach.call(document.querySelectorAll('.walk .tags > li'), function(tooltip) {
        tooltip.addEventListener('click', function(event) {
          var tag = this;
          var themeSelect = document.querySelector('select[name=theme]');
          event.preventDefault();
          // Equivalent to choosing it from the dropdown options
          Array.prototype.forEach.call(
            themeSelect.querySelectorAll('option'),
            function(el, i) {
              if (el.value === tag.dataset.theme) {
                themeSelect.value = el.value;
                _this._theme = el.value;
                _this._filterCards();
              }
            });
        });
      });
    }
  },

  /**
   * _addFilterEvents
   * 
   * @protected
   * @return    void
   */
  _addFilterEvents: {
    value: function() {
      var _this = this;
      this._element.find('.filters select').change(function(event) {
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
      });
    }
  }
});

module.exports = CityPageView;
