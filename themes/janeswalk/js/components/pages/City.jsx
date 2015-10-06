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
  this._resetSelectElements();
  this._initMenu();
  this._addCreateWalkEvent();
  this._addLinkListeners();
  this._captureHash();
  this._addBlogLink();
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
   * filters
   */
  getFilters: {
    value: function() {
      return [{
        id: 'theme',
        nodes: document.querySelectorAll('.filters select[name="theme"] option'),
        compare: function(node, walk) {
          return !!walk.checkboxes['theme-' + node.value];
        }
      },
      {
        id: 'accessibility',
        nodes: document.querySelectorAll('.filters select[name="accessibility"] option'),
        compare: function(node, walk) {
          return !!walk.checkboxes['accessible-' + node.value];
        }
      },
      {
        id: 'ward',
        nodes: document.querySelectorAll('.filters select[name="ward"] option'),
        compare: function(node, walk) {
          return node.value.indexOf(walk.wards) > -1;
        }
      },
      {
        id: 'initiative',
        nodes: document.querySelectorAll('.filters select[name="initiative"] option'),
        compare: function(node, walk) {
          if (Array.isArray(walk.initiatives)) {
            // See if any of the walk initiatives match this ID
            return walk.initiatives.some(function(walk) {
              return walk.id == node.value;
            });
          } else {
            return false;
          }
        }
      },
      {
        id: 'date',
        nodes: document.querySelectorAll('.filters select[name="date"] option'),
        compare: function(node, walk) {
          var chosenDate = new Date(node.value * 1000);
          if (Array.isArray(walk.time.slots)) {
            return walk.time.slots.filter(function(slot) {
              var date = new Date(slot[0] * 1000);
              return (date.getUTCDay() === chosenDate.getUTCDay() &&
                      date.getUTCMonth() === chosenDate.getUTCMonth() &&
                      date.getUTCFullYear() === chosenDate.getUTCFullYear());
            }).length > 0;
          } else {
            return false;
          }
        }
      }];
    }
  },

  /**
   * _isMobile
   *
   * @protected
   * @var bool
   */
  _isMobile: {
    value: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    writable: false
  },

  /**
   * _initData
   * Until this is Reactified, associate data state directly with DOM
   *
   * @protected
   */
  _initData: {
    value: function(data, cards) {
      return data.map(function(data, i) {
        data.cards = [].filter.call(cards, function(card) {
          if (data.url === card.querySelector('a').href) {
            // See if its date is in our slots
            if (data.time.slots) {
              return data.time.slots.filter(function(slot) {
                return (slot[0] + '000') == card.dataset.timeStart;
              }).length > 0;
            }
          }
        });
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

  _initMenu: {
    value: function() {
      if (this._isMobile) {
        $('a[href=#jw-list]').click();
      } else {
        $('a[href=#jw-cards]').click();
      }
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
      var _this = this;

      // Go through each filter list
      this.getFilters().forEach(function(filter) {
        // Compare all the filter options and see which match this walk
        [].forEach.call(filter.nodes, function(node) {
          var count = 0;
          // Don't check if it's the wildcard match
          if (node.value !== '*') {
            // Loop through all the walks
            _this._data.forEach(function(walk) {
              // Count this in our filter list if it matches a walk
              if (filter.compare(node, walk)) {
                count++;
              }
            });
            // If no walks match this filter, don't bother showing it
            if (count === 0) {
              node.parentElement.removeChild(node);
            } else if (filter.id !== 'date') {
              // Don't show the number of matching dates -- misleading with
              // multi-date walks.
              // Show the matching walks count on the option
              node.textContent += ' (' + count + ')';
            }
          }
        });
      });
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
      var utcTime = Date.now() - (new Date()).getTimezoneOffset() * 60 * 1000;
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
          return a.dataset.timeStart - b.dataset.timeStart;
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
          // Redirect to the CAW you were attempting
          // FIXME: bad approach - should be dispatcher based
          JanesWalk.react.login.props.redirectURL = this.href;
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
      var _this = this;
      var empty = true;
      var filters = this.getFilters();
      var appliedFilters = filters.filter(function(filter) {
        return filter.nodes.length > 0 && filter.nodes[0].parentElement.selectedIndex > 0;
      });

      // Check if we have any filters - if not, show all
      if (appliedFilters.length > 0) {
        // Loop through the walks
        this._data.forEach(function(walk) {
          // Innocent until proven guilty
          var matched = true;
          appliedFilters.forEach(function(filter) {
            var option = filter.nodes[0].parentElement.selectedOptions[0];
            if (filter.compare(option, walk)) {
              matched = true && matched;
            } else {
              matched = false;
            }
          });
          if (matched) {
            walk.cards.forEach(function(card) { card.classList.remove('hidden'); });
            empty = false;
          } else {
            walk.cards.forEach(function(card) { card.classList.add('hidden'); });
          }
        });

        // Empty state
        if (empty) {
          this._element.find('.empty').removeClass('hidden');
        } else {
          this._element.find('.empty').addClass('hidden');
        }
      } else {
        this._data.forEach(function(walk) {
          walk.cards.forEach(function(card) { card.classList.remove('hidden'); });
        });
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
      [].forEach.call(document.querySelectorAll('.walk .tags > li'), function(tooltip) {
        tooltip.addEventListener('click', function(event) {
          var tag = this;
          var themeSelect = document.querySelector('select[name=theme]');
          event.preventDefault();
          // Equivalent to choosing it from the dropdown options
          [].forEach.call(
            themeSelect.querySelectorAll('option'),
            function(el, i) {
              if (el.value === tag.dataset.theme) {
                themeSelect.value = el.value;
                _this._theme = el.value;
                _this._filterCards();
                // Scroll to top of filters
                document.body.scrollTop = document.getElementById('city-details').offsetTop;
              }
            });
        });
      });
    }
  },

  /**
   * Add a link to the blog page
   */
  _addBlogLink: {
    value: function() {
      var blogLink = document.querySelector('#blog a');

      if (blogLink) {
        JanesWalk.event.emit('blogurl.receive', blogLink.href);
      }
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
        _this._setHash();
        _this._filterCards();
      });
    }
  }
});

module.exports = CityPageView;
